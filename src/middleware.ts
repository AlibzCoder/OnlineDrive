import { IsEmpty } from "@/util";
import {
  AUTH_SECRETS,
  INTERNAL_ERROR,
  PageRoutes,
  UNAUTHORIZED_ERROR,
  UnAuthorizedAPIRoutes,
  UnAuthorizedPageRoutes,
} from "@/lib/const";
import { NextResponse } from "next/server";
import { AuthorizedRequest, AuthorizedResponse } from "@/types/api";
import {
  GetClientAuthCookie,
  isAuthenticatedRequest,
  ResponseWithNewAuthCredentials,
} from "@/util/auth";

export async function middleware(
  req: AuthorizedRequest,
  res: AuthorizedResponse
) {
  const path = req.nextUrl.pathname;
  const isUnProtectedRoute =
    UnAuthorizedAPIRoutes.includes(path) ||
    UnAuthorizedPageRoutes.includes(path);

  const { Authorization, refreshToken } = GetClientAuthCookie(req);

  if (!AUTH_SECRETS.SECRET || IsEmpty(AUTH_SECRETS.SECRET)) {
    console.log(INTERNAL_ERROR, "couldn't read auth secret key");
    return NextResponse.redirect(new URL(PageRoutes.LoginPage, req.nextUrl));
  }
  if (Authorization && !IsEmpty(Authorization)) {
    try {
      const response =
        isUnProtectedRoute && !path.startsWith("/api")
          ? NextResponse.redirect(new URL(PageRoutes.HomePage, req.nextUrl))
          : NextResponse.next();
      const AuthenticatedPayload = await isAuthenticatedRequest(req);
      if (!AuthenticatedPayload) {
        try {
          await ResponseWithNewAuthCredentials(response, refreshToken || "");
          return response;
        } catch (_e) {
          if (path.startsWith("/api")) {
            return NextResponse.json(UNAUTHORIZED_ERROR, { status: 401 });
          } else {
            return NextResponse.redirect(
              new URL(PageRoutes.LoginPage, req.nextUrl)
            );
          }
        }
      } else {
        response.headers.set(
          "X-Auth-Payload",
          JSON.stringify(AuthenticatedPayload)
        );
      }
      return response;
    } catch (e) {
      console.log(e, "couldn't read auth secret key");
    }
  } else if (!isUnProtectedRoute) {
    if (path.startsWith("/api")) {
      return NextResponse.json(UNAUTHORIZED_ERROR, { status: 401 });
    } else {
      return NextResponse.redirect(new URL(PageRoutes.LoginPage, req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"]
};
