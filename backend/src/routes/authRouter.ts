import express, { Router } from 'express';
import { userDbTest } from '../controllers/authController';

const router = Router();

router.post("/", userDbTest);

export default router;