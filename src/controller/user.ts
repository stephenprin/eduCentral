import express, { Request, Response } from "express";
import User from "../model/userSchema";
import { StatusCodes } from "http-status-codes";
import { createToken } from "../utils/utility";

export const signup = async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
          password,
          phone,
        confirmPassword,
  
        role,
      } = req.body;
      const UserExist = await User.findOne({ email });
      if (UserExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "User already exist",
        });
      }
  
      const newUser = await User.create({
        name,
        email,
        password,
        confirmPassword,
        phone,
  
      });
  
     
      const token = createToken({
        id: newUser.id,
        email: newUser.email,
      });
  
      res.status(StatusCodes.CREATED).json({
        message: "User created successfully",
        token,
        data: {
          newUser,
        },
      });
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User creation failed",
        err,
      });
    }
  };
  
  export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Please provide email and password",
        });
      }
  
      const user = await User.findOne({ email }).select("+password");
      const correct = await user?.correctPassword(password, user.password);
  
      if (!user || !correct) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Incorrect email or password",
        });
      }
  
      const token = createToken({
        id: user.id,
        email: user.email,
      });
  
      res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      res.status(400).json({
        message: "Login failed",
        error,
      });
    }
  };