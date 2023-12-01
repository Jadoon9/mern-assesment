import { StatusCodes } from "http-status-codes";
import { HTTPError } from "./response";
import { Request, Response, NextFunction } from "express";

const catchAsyncErrors =
  (action: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await action(req, res, next);
    } catch (error) {
      console.log("catchAsyncErrors ==>", error);
      const err = new HTTPError(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      );
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  };

const validationCatches =
  (
    validation: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await validation(req, res, next);
    } catch (error) {
      console.log("validationCatches errors==>", error.errors);
      const err = new HTTPError(
        "Validations failed",
        StatusCodes.BAD_REQUEST,
        error.errors
      );
      res.status(StatusCodes.BAD_REQUEST).json(err);
    }
  };

export { catchAsyncErrors, validationCatches };
