import jwt, { VerifyErrors } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { UserRequest, UserType } from "../types";

export const auth = (req: UserRequest, res: Response, next: NextFunction) => {
    if (!process.env.COOKIE_NAME || !process.env.SECRET) {
      next();
      return;
    }
    let token = req.cookies[process.env.COOKIE_NAME];
    if (token) {
      jwt.verify(token, process.env.SECRET, (err: VerifyErrors | null, decoded: UserType) => {
        if (err && process.env.COOKIE_NAME) {
          res.clearCookie(process.env.COOKIE_NAME);
        } else {
          req.user = decoded;
        }
      });
    }
    next();
  };
