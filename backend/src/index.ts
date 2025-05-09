import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './db/db';
import authRouter from './routes/authRouter';
import logger from './utils/logger/logger';
import todoRouter from './routes/todoRouter';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(port, () => {
  logger.info(`Api rodando na porta: ${port}`)
});