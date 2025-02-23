import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { db } from "../lib/prisma";

export const dashboardData = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      return res.status(404).json({ success: false, error: "User Not Found" });

    return res
      .status(200)
      .json({ success: true, user: { ...user, id: null, password: null } });
  } catch (err) {
    if (err instanceof Error || err instanceof PrismaClientKnownRequestError)
      return res
        .status(500)
        .json({ succes: false, error: "Internal server error." });
  }
};
