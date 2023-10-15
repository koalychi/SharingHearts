import { Router } from 'express'
import jwt from 'jsonwebtoken';
import { ErrorType, UserRequest } from '../types';
import { authService } from '../services';


export const authController = Router()

authController.post('/register', async (req, res) => {
    try {
        let createdUser = await authService.registerUser(req.body);
        res.status(201).json({ _id: createdUser._id });
    } catch (error) {
        res.status(404).json({ error: (error as ErrorType).message })
    }
});

authController.post('/login', async (req, res) => {
  try {
    const token = await authService.loginUser(req.body);

    if (!process.env.SECRET) throw Error("No SECRET found");
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (!process.env.COOKIE_NAME) throw Error("No COOKIE_NAME found");
      if (err) {
        res.clearCookie(process.env.COOKIE_NAME);
      } else {
        (req as UserRequest).user = decoded;
        res
          .status(200)
          .cookie(process.env.COOKIE_NAME, token, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
          })
          .json({ user: decoded });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error })
  }        
});

authController.get("/logout", (req, res) => {
  if (!process.env.COOKIE_NAME) {
    res.status(500).json({ error: "No COOKIE_NAME found" });
    return;
  }
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ message: "Successfully logged out" });
});

authController.get('/getUser', async (req, res) => {
  const userReq = req as UserRequest
    if (userReq.user) {
        let user = await authService.getUser(userReq.user._id);
        res.status(200).json({ user })
    } else {
        res.status(200).json({message: "Not logged in"})
    }
})
