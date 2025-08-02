import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import Task from "../models/task.model";
import { isValidUUID } from "../utils/validateUUID";

const tasks: Task[] = [];

const listTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result = [...tasks];

    const { status, page = "1", limit = "10" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (
      status &&
      !["pending", "in-progress", "completed"].includes(status as string)
    ) {
      const err = new Error("Invalid status filter");
      (err as any).status = 400;
      throw err;
    }

    if (status) {
      result = result.filter((task) => task.status === status);
    }

    const startIndex = (pageNum - 1) * limitNum;
    const paginated = result.slice(startIndex, startIndex + limitNum);

    res.json({ data: paginated, total: result.length });
  } catch (err: any) {
    console.log("An error occured", err.message);
    next(err);
  }
};

const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      const err = new Error("Invalid task ID format");
      (err as any).status = 400;
      throw err;
    }

    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      const err = new Error("Task not found");
      (err as any).status = 404;
      throw err;
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      const err = new Error("Title is required");
      (err as any).status = 400;
      throw err;
    }

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      const err = new Error("Invalid task ID format");
      (err as any).status = 400;
      throw err;
    }

    const task = tasks.find((t) => t.id === id);
    if (!task) {
      const err = new Error("Task not found");
      (err as any).status = 404;
      throw err;
    }

    const { title, description, status } = req.body;
    if (status && !["pending", "in-progress", "completed"].includes(status)) {
      const err = new Error("Invalid status value");
      (err as any).status = 400;
      throw err;
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.updatedAt = new Date();

    res.json(task);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      const err = new Error("Invalid task ID format");
      (err as any).status = 400;
      throw err;
    }
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      const err = new Error("Task not found");
      (err as any).status = 404;
      throw err;
    }

    tasks.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export { listTasks, getTask, createTask, updateTask, deleteTask };
