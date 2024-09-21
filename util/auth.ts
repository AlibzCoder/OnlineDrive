import { AuthKeys } from "@/enums";
import { IsEmpty, IsObj } from ".";
import {
  AUTH_SECRETS,
  INTERNAL_ERROR,
  ResponseError
} from "@/lib/const";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";
import { scryptSync, randomBytes } from "crypto";
import {
  AuthCredentials,
  AuthorizedRequest,
} from "@/types/api";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

export const isAuthenticatedRequest = (
  req: AuthorizedRequest
): Promise<JWTPayload | ResponseError | any> => {
  return new Promise(async (res, rej) => {
    const { Authorization } = GetClientAuthCookie(req);
    if (!AUTH_SECRETS.SECRET || IsEmpty(AUTH_SECRETS.SECRET))
      return rej(INTERNAL_ERROR);
    let token = `${Authorization}`;
    try {
      if (token.startsWith("Bearer")) {
        token = token.replace("Bearer ", "");
      }

      const { payload } = await jwtVerify(token, AUTH_SECRETS.SECRET);

      if (payload?._id) {
        res(payload);
      } else {
        res(null);
      }
    } catch (_err) {
      res(_err);
    }
  });
};

export const ResponseWithNewAuthCredentials = (
  response: NextResponse,
  refreshToken: string
) => {
  return new Promise(async (res, rej) => {
    try {
      const authCredentials = await RefreshAuthCredentials(refreshToken);
      SetClientAuthCookie(response, authCredentials);
      res(response);
    } catch (e) {
      rej(e);
    }
  });
};

export const GetClientAuthCookie = (req: NextRequest): AuthCredentials => {
  if (!req || IsEmpty(req) || !req.cookies || IsEmpty(req.cookies)) return {};

  const CookieToken =
    IsObj(req.cookies) && req?.cookies
      ? req?.cookies?.get(AuthKeys.AUTH_COOKIE)?.value
      : null;
  if (!IsEmpty(CookieToken)) {
    try {
      const parsedCookie: AuthCredentials = JSON.parse(CookieToken || "{}");
      return parsedCookie;
    } catch (_e) {}
  }

  return {};
};

export const SetClientAuthCookie = (
  res: NextResponse<any>,
  authCredentials: AuthCredentials
) => {
  if (!res || IsEmpty(authCredentials) || !IsObj(authCredentials))
    throw INTERNAL_ERROR;

  const cookie = serialize(
    AuthKeys.AUTH_COOKIE,
    JSON.stringify(authCredentials),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: AUTH_SECRETS.REFRESH_EXPIRES_IN,
      path: "/",
    }
  );
  res.headers.set("Set-Cookie", cookie);
};

export function HashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64);
  return `${hash.toString("hex")}.${salt}`;
}
export function compareHashedPassword(password: string, hash: string) {
  if (
    typeof password !== "string" ||
    password.length === 0 ||
    typeof hash !== "string" ||
    hash.length === 0
  )
    return false;
  const [hashedPassword, salt] = hash.split(".");
  const key1 = scryptSync(password, salt, 64);
  return key1.toString("hex") === hashedPassword ? true : false;
}

export const GenerateAuthCredentials = (
  payload: object | any
): Promise<AuthCredentials> => {
  return new Promise(async (res, rej) => {
    try {
      const { EXPIRES_IN, SECRET, REFRESH_EXPIRES_IN, REFRESH_SECRET } =
        AUTH_SECRETS;

      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime(Math.floor(Date.now() / 1000) + EXPIRES_IN)
        .sign(SECRET);
      const refreshToken = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime(Math.floor(Date.now() / 1000) + REFRESH_EXPIRES_IN)
        .sign(REFRESH_SECRET);
      res({
        Authorization: token,
        refreshToken: refreshToken,
      });
    } catch (e) {
      rej(e);
    }
  });
};
export const RefreshAuthCredentials = (
  refreshToken: string | any
): Promise<AuthCredentials> => {
  return new Promise(async (res, rej) => {
    try {
      const { REFRESH_SECRET } = AUTH_SECRETS;
      if (!REFRESH_SECRET || IsEmpty(REFRESH_SECRET))
        return rej(INTERNAL_ERROR);
      let token = `${refreshToken}`;
      try {
        if (token.startsWith("Bearer")) {
          token = token.replace("Bearer ", "");
        }
        const { payload } = await jwtVerify(token, REFRESH_SECRET);

        if (!IsEmpty(payload) && IsObj(payload)) {
          try {
            const authCredentials = await GenerateAuthCredentials(payload);
            res(authCredentials);
          } catch (e) {
            rej(e);
          }
        } else {
          rej(new Error("Invalid Refresh Token"));
        }
      } catch (_err) {
        rej(_err);
      }
    } catch (e) {
      rej(e);
    }
  });
};
