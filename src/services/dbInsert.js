import Surreal from 'surrealdb.js';
import { getAuthenticatedCredentials, fetchSalesReportsInChunks } from './bandcampApi.js';

const db = new Surreal();

// Function to convert date strings to ISO 8601 format
const convertDateToISO8601 = (dateString) => {
  // Convert date string to ISO 8601 format, accounting for null values
  return dateString ? new Date(dateString).toISOString() : null;
};

// Function to preprocess sales report data
const preprocessSalesReports = (salesReports) => {
  return salesReports.map(report => {
    for (const key in report) {
      // Convert 'date' and 'ship_date' fields to ISO 8601 format
      if (report[key].date) {
        report[key].date = convertDateToISO8601(report[key].date);
      }
      if (report[key].ship_date) {
        report[key].ship_date = convertDateToISO8601(report[key].ship_date);
      }
    }
    return report;
  });
};

async function insertDataIntoSurrealDB() {
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
    const bandId = '3460825363';
    const start = '2022-01-01';
    const end = '2022-01-05';

    // Fetch sales reports in chunks
    let salesReports = await fetchSalesReportsInChunks({
      bandId,
      start,
      end,
      accessToken,
    });

    // Preprocess sales reports to convert date fields to ISO 8601 format
    salesReports = preprocessSalesReports(salesReports);

    // Iterate over preprocessed salesReports and insert each entry into SurrealDB
    for (const report of salesReports) {
      for (const key in report) {
        await db.insert('sales_reports', {
          id: key,
          ...report[key],
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

insertDataIntoSurrealDB();
