import rateLimit from "express-rate-limit";
export const authLimiter = rateLimit({
  limit: 50, //  requests per 5 minutes
  message: "Too many requests,please try again later.",
  windowMs: 5 * 60 * 1000, // 5 minutes window
});
