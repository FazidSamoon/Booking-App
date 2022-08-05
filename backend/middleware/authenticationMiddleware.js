import Jwt from "jsonwebtoken";
import { unAuthorized } from "../errors/unAuthorized.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unAuthorized("Not authorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = Jwt.verify(token, process.env.JWT_WEB_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    throw new unAuthorized("Not authorized");
  }
};

export const adminProtect = async (req, res, next) => {
  if (req.user.isAdmin !== true || !req.user) {
    throw new unAuthorized("Not authorized");
  }
  next();
};
