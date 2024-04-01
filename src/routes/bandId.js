import express from 'express';
import { getAuthenticatedCredentials } from '../services/bandcampApi.js';

import Bandcamp from '@nutriot/bandcamp-api';
import dotenv from 'dotenv';

// Initialize dotenv to use environment variables
dotenv.config();

const api = new Bandcamp({
  id: process.env.BANDCAMP_CLIENT_ID,
  secret: process.env.BANDCAMP_CLIENT_SECRET,
});

const router = express.Router();

// Route to handle POST requests for fetching band_id
router.post('/api/get-band-id', async (req, res, next) => {
  try {
    const token = await getAuthenticatedCredentials().catch(async () => {
      await refreshAccessToken();
      return accessToken;
    });
    const bands = await api.getMyBands(token);
    res.json(bands);
  } catch (error) {
    res.status(500).send('Failed to fetch band ID. Please try again later.');
    next(error);
  }
});

export default router;
