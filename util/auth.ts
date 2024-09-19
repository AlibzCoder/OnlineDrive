import { AuthKeys } from "@/enums";
import { NextApiResponse } from "next";
import { IsEmpty, IsObj } from ".";
import { AUTH_SECRETS, INTERNAL_ERROR } from "@/lib/const";
import { serialize } from "cookie";
import { NextRequest } from "next/server";

export const GetClientToken = (req: NextRequest) => {
  if (!req || IsEmpty(req) || !req.headers || IsEmpty(req.headers)) return {};
  /*@ts-ignore */
  const CookieToken = (IsObj(req.cookies) && req?.cookies) ? req?.cookies?.get(AuthKeys.AUTHORIZATION)?.value : null;

  const HeaderToken = IsObj(req.headers)
      ? req?.headers.get(AuthKeys.AUTHORIZATION)
      : null;
  return !IsEmpty(CookieToken)
    ? {
        fromCookie: true,
        fromHeader: false,
        value: CookieToken,
      }
    : !IsEmpty(HeaderToken)
    ? {
        fromCookie: true,
        fromHeader: false,
        value: HeaderToken,
      }
    : {};
};

export const SetClientTokenCookie = (res: NextApiResponse, token: string) => {
  if (IsEmpty(res) || IsEmpty(token)) throw INTERNAL_ERROR;
  const cookie = serialize(AuthKeys.AUTHORIZATION, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: parseInt(AUTH_SECRETS.EXPIRES_IN || "") || 86400,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
};
