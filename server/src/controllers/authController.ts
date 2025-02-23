import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db } from "../lib/prisma";
import { signUpSchema, signInSchema } from "../validators/authSchema";
import { signJWT } from "../lib/jwtHelper";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { userInfo } from "os";
import { error } from "console";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

export const signup = async (req: Request, res: Response) => {
  try {
    // extracting the required thing from body
    const { email, password, confirmPassword } = req.body;

    //validating presence of email and password.
    if (!email || !password) {
      return res.status(400).json({
        succes: false,
        error: "Please provide an email and password.",
      });
    }

    // validating the payload.
    const parsed = signUpSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    // return error if payload doesn't satisfy required checks
    if (!parsed.success)
      return res
        .status(400)
        .json({ success: false, error: "Please provide valid input data" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Signup Successful",
      userData: { ...user, id: null, password: null }, // return the user without user id
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      // if email is not unique
      return res.status(400).json({
        success: false,
        error: "The email is already in use",
      });
    } else if (err instanceof Error) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;
    const validatedData = signInSchema.safeParse(req.body);

    // return error if payload doesn't satisfy required checks
    if (!validatedData.success) {
      return res
        .status(400)
        .json({ success: false, error: "Provide valid inputs" });
    }

    // checking if user exists
    const user = await db.user.findUnique({
      where: { email },
    });

    // return error if user doesn't exist
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User with this email does not exist!",
      });
    }

    // bcrypt hash validation
    const isValidPassword = await bcrypt.compare(password, user.password);

    // return error if password is invalid
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials!" });
    }

    // generate and send JWT token through cookie
    const token = signJWT(email, user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set to true in production using env(for https)
      sameSite: "lax",
      maxAge: rememberMe ? COOKIE_MAX_AGE : undefined,
    });

    return res
      .status(200)
      .json({ success: true, message: "Signed in successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    // extracting the required thing from body
    const { email, password, confirmPassword } = req.body;

    //validating presence of email and password.
    if (!email || !password) {
      return res.status(400).json({
        succes: false,
        error: "Please provide an email and password.",
      });
    }

    // validating the payload.
    const parsed = signUpSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    // return error if payload doesn't satisfy required checks
    if (!parsed.success)
      return res
        .status(400)
        .json({ success: false, error: "Please provide valid input data" });

    //finding the user first
    const uniqueUser = await db.user.findUnique({
      where: { email },
    });

    if (!uniqueUser) {
      // if user is not found return an error
      return res.status(404).json({ success: false, error: "User Not Found!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // updating the user passwords
    await db.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Your password has been reset" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const signout = (req: Request, res: Response) => {
  // clearing the cookie to signout the user
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Signed out successfully" });
};
