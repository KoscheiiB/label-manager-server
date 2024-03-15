import express from 'express';
import cors from 'cors';
import router from './Routes/routes';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import path from 'path';

dotenv.config();
const privateKeyPath = path.join('/etc/letsencrypt/live/recordlabelmanager.com', 'privkey.pem');
const certificatePath = path.join('/etc/letsencrypt/live/recordlabelmanager.com', 'fullchain.pem');

// Read the SSL certificate and private key
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');

const credentials = { key: privateKey, cert: certificate };

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || [
    'https://154.56.40.230:3000',
    'https://154.56.40.230:3001',
    'https://154.56.40.230:5432',
    'https://localhost:5173',
    'https://localhost:5432',
    'https://localhost:3001',
    'https://localhost:3000',
    'https://metabase.recordlabelmanager.com',
    'https://recordlabelmanager.com',
  ],
  credentials: false, // Typically, with cookies or auth you'd set this to true
}));

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello, welcome to the Label Manager Server!');
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3001, () => {
  console.log('HTTPS Server is up on port 3001');
});
