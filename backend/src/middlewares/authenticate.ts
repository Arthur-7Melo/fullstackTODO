import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { NotFoundError, UnathourizedError } from "../utils/errors/customErrors";
import { User } from "../models/User";

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
};

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnathourizedError('Token ausente ou mal formatado');
    }

    const token = authHeader.split(' ')[1]!;

    let decodedRaw: string | jwt.JwtPayload;
    try {
      decodedRaw = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnathourizedError('Token expirado');
      }
      throw new UnathourizedError('Token inválido');
    }

    if (typeof decodedRaw === 'string' || typeof decodedRaw.id !== 'string') {
      throw new UnathourizedError('Token inválido');
    }

    const { id } = decodedRaw as JwtPayload;
    const user = await User.findById(id).select('-password');

    if (!user) {
      throw new NotFoundError('Usuário não existe');
    }

    (req as any).user = user;
    next();
  } catch (error) {
    next(error);
  }
};