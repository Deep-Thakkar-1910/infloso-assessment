import express, { Response, Express, Request, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
//dotenv configration
import { config } from "dotenv";
import authRouter from "./routes/authRoute";
import { authMiddleWare } from "./middlewares/authMiddleWare";
import { dashboardData } from "./controllers/dashBoardController";
config();

const app: Express = express();

const PORT = process.env.PORT || 8080;

// for parsing json and encoded urls
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // for cookie parsing
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// health check
app.get("/healthcheck", (_: Request, res: Response) => {
  res.status(200).json({ message: "Server is Healthy" });
});

// dashboard data route
app.get("/api/dashboard-data", authMiddleWare, dashboardData);

//auth routes
app.use("/api/auth", authRouter);

// global catch that returns 404 not found for paths other than above mentioned api routes
app.all("*", (_: Request, res: Response) => {
  return res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
