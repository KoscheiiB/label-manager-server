import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
global.fetch = fetch;
