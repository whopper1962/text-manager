import { Request } from "express";

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type JwtPayload = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};
