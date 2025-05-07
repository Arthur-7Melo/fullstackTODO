import mongoose from 'mongoose';
import logger from '../utils/logger/logger';
import { getErrorMessage } from '../utils/errors/customErrors';

export const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    logger.info("Conectado ao mongoDB");
  } catch(error) {
    logger.error(`Erro ao conectar com o mongoDB: ${getErrorMessage(error)}`)
    process.exit(1);
  }
};