import { Router } from "express";
import {
  login,
  resetPassword,
  signout,
  signup,
} from "../controllers/authController";
import { authMiddleWare } from "../middlewares/authMiddleWare";
import { authLimiter } from "../middlewares/rateLimiter";

const authRouter = Router();

authRouter.post("/signup", authLimiter, signup);
authRouter.post("/login", authLimiter, login);
authRouter.post("/reset-password", authLimiter, resetPassword);
authRouter.post("/signout", authMiddleWare, signout);

export default authRouter;
