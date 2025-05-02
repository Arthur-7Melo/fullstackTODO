import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './db/db';
import authrouter from './routes/authRouter';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use("/api/auth", authrouter);

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
});