import { TaskType } from "../types";

export const validateTask = (task: TaskType): string[] => {
  const { title, description } = task;
  const errors: string[] = []

  if (title.length < 3 || title.length > 50) 
    errors.push('Title should be at least 3 characters long and max 50 characters long; ');

  if (description.length < 10 || description.length > 1000) 
  errors.push('Description should be at least 10 characters long and max 1000 characters long; ');

  return errors
}