import express, { NextFunction, Request, Response } from 'express';
import { login, signup } from '../controller/user';

const router = express.Router();


router.post("/register", signup)
router.post("/login", login)


export default router;