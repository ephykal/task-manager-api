import { Request, Response, NextFunction } from "express";
import Joi from "joi";

function createError(message: string, status = 400) {
  const err = new Error(message);
  (err as any).status = status;
  return err;
}

export const validateInputTask = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().optional().trim(),
    status: Joi.string()
      .valid("pending", "in-progress", "completed")
      .default("pending"),
  });

  const { error } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return next(
      createError(`Validation error: ${error.details[0].message}`, 400)
    );
  }

  next();
};

export const validateUpdateTask = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    title: Joi.string().optional().trim(),
    description: Joi.string().optional().trim(),
    status: Joi.string()
      .valid("pending", "in-progress", "completed")
      .required(),
  });

  const { error } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return next(
      createError(`Validation error: ${error.details[0].message}`, 400)
    );
  }

  next();
};
