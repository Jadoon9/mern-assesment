import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

const signUpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const schema = yup.object({
    username: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(3, "min 3 digit pass")
      .max(6, "max 6 digit pass")
      .required("Password is required"),
  });

  try {
    schema.validateSync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

const taskValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    status: yup.string().oneOf(["low", "high"]).required("Status is required"),
  });

  try {
    schema.validateSync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

export { signUpValidation, taskValidation };
