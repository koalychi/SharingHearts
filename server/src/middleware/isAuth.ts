import { NextFunction, Response } from "express";
import { UserRequest } from "../types";

export const isAuth = (req: UserRequest, res: Response, next: NextFunction) => {
  if(!req.user) {
      return res.status(401).json({message: 'You should sign in first!'})
  }
  next();
}