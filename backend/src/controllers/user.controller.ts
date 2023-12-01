import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import StatusCodes from "http-status-codes";
import { HTTPError, HTTPResponse } from "../utils/response";
import { getJWTToken, getEncryptedPassword } from "../utils/utils";

export const signUp = async (req, res) => {
  const { email, password } = req.body;
  let response, error;
  let user = await User.findOne({ email });
  if (user) {
    error = new HTTPError("Email Already registered!", StatusCodes.CONFLICT);
    return res.status(StatusCodes.CONFLICT).json(error);
  }
  user = new User({
    ...req.body,
  });
  user.password = await getEncryptedPassword(password);
  await user.save();
  user.password = undefined;
  const token = await getJWTToken({ _id: user["_id"] });
  response = new HTTPResponse("Signed up successfully", { user, token });
  return res.status(StatusCodes.CREATED).json(response);
};

export const login = async (req, res) => {
  const { password, email } = req.body;
  let error;
  const user = await User.findOne({ email });
  if (!user) {
    error = new HTTPError("Invalid email", StatusCodes.NOT_FOUND);
    return res.status(StatusCodes.NOT_FOUND).json(error);
  }
  const passwordMatch = await bcryptjs.compare(password, user.password);
  if (!passwordMatch) {
    error = new HTTPError("Invalid password", StatusCodes.CONFLICT);
    return res.status(StatusCodes.CONFLICT).json(error);
  }
  user.password = undefined;
  const token = await getJWTToken({ _id: user["_id"] });
  let response = new HTTPResponse("Login successfull", { user, token });
  return res.status(StatusCodes.OK).json(response);
};
