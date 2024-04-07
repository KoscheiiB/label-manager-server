// Importing necessary libraries
import Bandcamp from '@nutriot/bandcamp-api';
import dotenv from 'dotenv';

// Initialize dotenv to use environment variables
dotenv.config();

const api = new Bandcamp({
  id: process.env.BANDCAMP_CLIENT_ID,
  secret: process.env.BANDCAMP_CLIENT_SECRET,
});

// LINK

let accessToken;
let refreshToken;

// Utility function to get authenticated API credentials
async function getAuthenticatedCredentials() {
  if (!accessToken || !refreshToken) {
    try {
      const credentials = await api.getClientCredentials();
      console.log('Credentials Response:', credentials);

      if (credentials.error) {
        if (credentials.message === 'client ' + process.env.BANDCAMP_CLIENT_ID + ' has multiple active grants') {
          console.log('Multiple active grants detected, attempting to refresh token.');
          return await refreshAccessToken(refreshToken);
        } else {
          throw new Error(credentials.message);
        }
      }

      accessToken = credentials.access_token;
      refreshToken = credentials.refresh_token;
      return accessToken;
    } catch (error) {
      throw new Error('Failed to obtain credentials: ' + error.message);
    }
  }
  return accessToken;
}

// Utility function to refresh the access token
async function refreshAccessToken(token) {
  try {
    const response = await api.refreshToken(token);
    accessToken = response.access_token;
    refreshToken = response.refresh_token;
    return accessToken;
  } catch (error) {
    // Clear tokens if refresh fails to prevent reuse of invalid tokens
    accessToken = '';
    refreshToken = '';
    throw new Error('Failed to refresh access token: ' + error.message);
  }
}

async function fetchSalesReportsInChunks({ bandId, start, end, accessToken, memberBandId }) {
  const oneYear = 1000 * 60 * 60 * 24 * 365;
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const tasks = [];

  for (let currentTime = startTime; currentTime < endTime; currentTime += oneYear) {
    const nextTime = Math.min(currentTime + oneYear, endTime);
    const currentStart = new Date(currentTime).toISOString().split('T')[0];
    const currentEnd = new Date(nextTime).toISOString().split('T')[0];

    const params = {
      band_id: bandId,
      start_time: currentStart,
      end_time: currentEnd,
      ...(memberBandId && { member_band_id: memberBandId }), // Include if provided
    };

    tasks.push(
      api.getSalesReport(accessToken, params)
        .then(report => report)
        .catch(error => {
          console.error(`Error fetching report from ${currentStart} to ${currentEnd}: ${error.message}`);
          return null;
        }));
  }

  const results = await Promise.allSettled(tasks);
  const salesReports = results.flatMap(result => result.status === 'fulfilled' && result.value ? [result.value] : []);
  return salesReports;
}

export { getAuthenticatedCredentials, refreshAccessToken, fetchSalesReportsInChunks };
