import { NextFunction, Response } from "express";
import { UserRequest } from "../types";

export const isGuest = (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    return res.json({message: 'You are already logged-in'})
  }

  next();
}