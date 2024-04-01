import express from 'express';
import { body, validationResult } from 'express-validator';
import { fetchSalesReportsInChunks, getAuthenticatedCredentials, refreshAccessToken } from '../services/bandcampApi.js';
import Bandcamp from '@nutriot/bandcamp-api';
import dotenv from 'dotenv';

// Initialize dotenv to use environment variables
dotenv.config();

const api = new Bandcamp({
  id: process.env.BANDCAMP_CLIENT_ID,
  secret: process.env.BANDCAMP_CLIENT_SECRET,
});

const router = express.Router();

router.post('/api/sales-report', [
  body('band_id').isNumeric().withMessage('Band ID must be numeric')
    .isLength({ min: 10, max: 10 }).withMessage('Band ID must be 10 characters long'),
  body('member_band_id').optional().isNumeric().withMessage('Member Band ID must be numeric')
    .isLength({ min: 10, max: 10 }).withMessage('Member Band ID must be 10 characters long'),
  body('start_time').isISO8601().withMessage('Start time must be a valid ISO 8601 date'),
  body('end_time').optional().isISO8601().withMessage('End time must be a valid ISO 8601 date'),
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { band_id, start_time, end_time, member_band_id, format, version } = req.body;

  // Check if start_time is after end_time, considering end_time is optional
  if (end_time && new Date(start_time) > new Date(end_time)) {
    return res.status(400).json({ errors: [{ msg: "Start time must be before end time." }] });
  }

  try {
    const accessToken = await getAuthenticatedCredentials();
    const salesReports = await fetchSalesReportsInChunks({
      bandId: band_id,
      start: start_time,
      end: end_time,
      accessToken,
      memberBandId: member_band_id,
    });

    if (salesReports.length === 0) {
      return res.status(404).json({ message: "No sales reports found for the specified period." });
    }
    res.json(salesReports);
  } catch (error) {
    console.error(`${error.message}`);
    next(error); // Pass to the next error handling middleware
  }
});


export default router;
