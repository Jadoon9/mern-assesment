import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../utils/response";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { StatusCodes } from "http-status-codes";

const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const header = req.header("Authorization");
  if (!header) {
    console.log(header);

    const error = new HTTPError("Token is missing", StatusCodes.UNAUTHORIZED);
    return res.status(StatusCodes.UNAUTHORIZED).json(error);
  }
  try {
    const token = header.split(" ");
    const decoded: any = jwt.verify(token[1], process.env.JWT_SECRET as string);
    req.user = await User.findById(decoded["_id"]).select("-password");
    next();
  } catch (err: any) {
    const error = new HTTPError(
      "Token is expired",
      StatusCodes.UNAUTHORIZED,
      err
    );
    return res.status(StatusCodes.UNAUTHORIZED).json(error);
  }
};

export { authToken };
