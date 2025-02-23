import * as JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const signJWT = (
  email: string,
  userId: string,
  rememberMe?: boolean
) => {
  // signing and returning the jwt
  const signed = JWT.sign({ email, userId }, JWT_SECRET as string, {
    expiresIn: rememberMe ? "30d" : "1d",
  });
  return signed;
};

export const verifyJWT = (token: string): JWT.JwtPayload => {
  // decoding the jwt
  try {
    const decoded = JWT.verify(token, JWT_SECRET as string) as JWT.JwtPayload;
    return { success: true, data: decoded };
  } catch (err) {
    // if the token has expired return the token expired message
    if (err instanceof JWT.TokenExpiredError) {
      return {
        success: false,
        status: 401,
        error: "Session Expired! Please Relogin.",
      };
    } else {
      // else return the unauthorized message.
      return { success: false, status: 401, error: "Unauthorized!" };
    }
  }
};
