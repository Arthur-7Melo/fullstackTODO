import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './db/db';
import authRouter from './routes/authRouter';
import logger from './utils/logger/logger';
import todoRouter from './routes/todoRouter';
import cors from 'cors';

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Cache-Control',
    'Pragma'
  ],
  exposedHeaders: ['Authorization'],
  credentials: true,
  maxAge: 86400
}));
app.use("/api/auth", authRouter);
app.use("/api/v1/todos", todoRouter);

app.listen(port, () => {
  logger.info(`Api rodando na porta: ${port}`)
});