import { PrismaClient } from "@prisma/client";

// declaring global prisma instance for preventing new connections on hot reload
declare global {
  var db: PrismaClient | undefined;
}

// exporting db
export const db = globalThis.db || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.db = db;

export default db;
