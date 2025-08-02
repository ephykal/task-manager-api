import express from "express";
import {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import {
  validateInputTask,
  validateUpdateTask,
} from "../utils/inputValidation";

const router = express.Router();

router.get("", listTasks);
router.get("/:id", getTask);
router.post("/", validateInputTask, createTask);
router.put("/:id", validateUpdateTask, updateTask);
router.delete("/:id", deleteTask);

export default router;
