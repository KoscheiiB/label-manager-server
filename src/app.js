import express from 'express';
import setupMiddleware from './middleware/index.js'; // or simply './middleware/index' in CommonJS
import salesReportsRouter from './routes/salesReports.js';
import bandIdRouter from './routes/bandId.js';
import http from 'http';
import './config/index.js';

const app = express();
const port = process.env.PORT || 3001;

setupMiddleware(app);
app.use(salesReportsRouter);
app.use(bandIdRouter);

// Error-handling middleware, defined after all other app.use() and route calls
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  if (!res.headersSent) {
    res.status(500).send('Something broke!');
  }
});


app.get('/', (req, res) => {
  res.send('Hello, welcome to the Label Manager Server!');
});

const httpServer = http.createServer(app);

httpServer.listen(port, '0.0.0.0', () => {
  console.log('Server is up and running on on port ' + port);
});
