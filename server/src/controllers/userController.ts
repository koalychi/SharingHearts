import { Router } from 'express';

import { userService } from '../services';
import { ErrorType } from '../types';

export const userController = Router();

userController.patch('/edit-profile/:id', async (req, res) => {
    try {
      await userService.edit(req.params.id, req.body);
      res.status(201).json({ message: "Updated!" });
    } catch (err) {
      res.status(404).json({ error: (err as ErrorType).message });
    }
})

userController.get('/getUserById/:id', async (req, res) => {
    try {
        let user = await userService.getUserById(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error });
    }
})

