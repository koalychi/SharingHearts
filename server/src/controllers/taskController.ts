import { taskService, userService } from "../services/";
import { Router } from "express";
import { ErrorType, UserRequest } from "../types";
import { validateTask } from "../utils";

export const taskController = Router();

taskController.get("/", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const tasks = await taskService.getAll(+ (page ?? 1), + (limit ?? 5));
    console.log(tasks);
    res.status(200).json({ tasks: tasks.docs });
  } catch (err) {
    res.status(500).json({ message: (err as ErrorType).message });
  }
});

taskController.post("/create", async (req, res) => {
  try {
    let errors = validateTask(req.body);
    if (errors.length >= 1) throw { message: [errors] };
    const task = await taskService.create(
      req.body,
      (req as UserRequest).user._id
    );
    res.status(201).json({ taskId: task._id });
  } catch (err) {
    res.status(500).json({ error: (err as ErrorType).message });
  }
});

taskController.patch("/edit/:id", async (req, res) => {
  try {
    let user = await userService.getUserById(
      (req as unknown as UserRequest).user._id
    );
    let task = await taskService.findById(req.params.id);
    if (user?._id.toString() !== task?.owner_Id.toString()) {
      res.status(403).json({ error: "Access denied!" });
    }

    const errors = validateTask(req.body);
    if (errors.length >= 1) throw { message: [errors] };

    await taskService.edit(req.params.id, req.body);
    res.status(201).json({ message: "Updated!" });
  } catch (err) {
    res.status(500).json({ error: (err as ErrorType).message });
  }
});

taskController.get("/:id", async (req, res) => {
  try {
    const task = await taskService.findById(req.params.id);
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ error: (err as ErrorType).message });
  }
});
