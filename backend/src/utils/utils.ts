import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const getEncryptedPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt();
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

const getJWTToken = async (payload: any): Promise<string> => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: "24h",
  });
  return token;
};

export { getJWTToken, getEncryptedPassword };
