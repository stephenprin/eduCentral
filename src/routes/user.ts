import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();


router.post("/register", signup)
router.post("/login", login)