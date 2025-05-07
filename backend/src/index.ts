import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './db/db';
import authrouter from './routes/authRouter';
import logger from './utils/logger/logger';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use("/api/auth", authrouter);

app.listen(port, () => {
  logger.info(`Api rodando na porta: ${port}`)
});