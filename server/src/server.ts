import express, { Request, Response, Express } from "express";
import cookieParser from "cookie-parser";

const app: Express = express();

const PORT = process.env.PORT || 8080;

// for parsing json and encoded urls
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// health check
app.get("/healthcheck", (_, res: Response) => {
  res.status(200).json({ message: "Server is Healthy" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
