import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../lib/jwtHelper";
import { error } from "console";

const JWT_SECRET = process.env.JWT_SECRET;

// for extending the Express Request interface and adding UserId to the request object
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// authentication logic
export const authMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // extracting the jwt token
  const token = req.cookies.token;

  // return error if no token is found.
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Authentication required" });
  }

  // decode jwt logic
  try {
    const decoded = verifyJWT(token);
    if (!decoded.success) throw new Error(decoded.error);
    req.userId = decoded.data.userId;
    next();
  } catch (error) {
    res.status(401).json({ succes: false, error: "Invalid or expired token" });
  }
};
