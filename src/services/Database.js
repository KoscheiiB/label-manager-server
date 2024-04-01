import Surreal from 'surrealdb.js';
// Import the required functions from bandcampAPI.js
import { getAuthenticatedCredentials, fetchSalesReportsInChunks } from './bandcampApi.js';

const db = new Surreal();

async function main() {
  try {
    // Connect to the database
    await db.connect('http://surrealdb:8000/rpc', {
      namespace: 'label_manager_ns',
      database: 'ttr_sales_db',
      auth: {
        namespace: 'label_manager_ns',
        database: 'ttr_sales_db',
        username: 'root',
        password: 'root',
      },
    });
    console.log('Successfully connected to SurrealDB and signed in.');

    // Obtain the authenticated credentials
    const accessToken = await getAuthenticatedCredentials();

    // Define your bandId, start, and end dates for the sales report
    const bandId = '3460825363'; // Replace 'YOUR_BAND_ID' with your actual band ID
    const start = '2022-01-01'; // Replace 'START_DATE' with the actual start date
    const end = '2022-01-05'; // Replace 'END_DATE' with the actual end date

    // Fetch sales reports in chunks
    const salesReports = await fetchSalesReportsInChunks({
      bandId,
      start,
      end,
      accessToken,
    });

    // Iterate over salesReports and insert each entry into SurrealDB
    for (const report of salesReports) {
      for (const key in report) {
        await db.insert('sales_data', {
          id: key,
          ...report[key], // Spread operator to insert each sale as a separate entry
        }).then(() => {
          console.log(`Sales report for transaction ID ${key} inserted successfully.`);
        }).catch(e => {
          console.error(`Error inserting sales report for transaction ID ${key}:`, e);
        });
      }
    }

    // Close the database connection
    await db.close();
    console.log('Database connection closed.');

  } catch (e) {
    console.error('ERROR', e);
  }
}

main();
