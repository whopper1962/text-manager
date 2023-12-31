import { JwtPayload } from "@/types/auths";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const authenticationCheck = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { token } = request.cookies;

    if (!token) throw new Error();

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) throw new Error();

    const loggingInUser = verify(token, jwtSecretKey) as JwtPayload;

    request.loggingInUserId = loggingInUser.id;
    next();
  } catch {
    request.loggingInUserId = "";
    response.clearCookie("token");
    return response.status(401).send("Authentication Failed");
  }
};
