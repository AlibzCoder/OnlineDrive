
import { JWTPayload } from "jose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { User } from "./models";

export interface AuthorizedResponse extends NextResponse {
  authPayload: JWTPayload | object | any;
}

export interface AuthorizedRequest extends NextRequest {
  authPayload: JWTPayload | object | any;
}

export interface AuthorizedApiResponse extends NextApiResponse {
  authPayload: JWTPayload | object | any;
}
export interface AuthorizedApiRequest extends NextApiRequest {
  authPayload: JWTPayload | object | any;
}

export interface AuthCredentials {
  Authorization?: string;
  refreshToken?: string;
}


export interface ClientLoginRequest {
  username: string;
  password: string;
}
export interface ClientSignUpRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface ClientLoginResponse {
  Authorization: string;
  refreshToken: string;
}
export interface ClientSignUpResponse extends User,ClientLoginResponse {}