import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export default function (app) {
  app.use(express.json());
  app.use(morgan('tiny'));
  app.use(cors(
    //   {
    //   origin: process.env.CORS_ORIGIN?.split(',') || [
    //     'https://localhost:5173',
    //     'https://localhost:5432',
    //     'https://localhost:3001',
    //     'https://localhost:3000',
    //     'https://localhost:3002',
    //   ],
    //   credentials: true,
    // }
  ));
  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });
}
