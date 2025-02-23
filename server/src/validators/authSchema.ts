import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "User Name is required"),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(
    (obj) => obj.password === obj.confirmPassword,
    "Passwords do not match"
  );

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean().optional(),
});
