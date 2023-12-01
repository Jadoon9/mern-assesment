import { signUp, login } from "./user.controller";
import {
  addTask,
  getTaskById,
  getAllTask,
  updateTask,
  deleteTask,
} from "./task.controller";

export const User = {
  signUp,
  login,
};

export const Task = {
  addTask,
  getTaskById,
  getAllTask,
  updateTask,
  deleteTask,
};
