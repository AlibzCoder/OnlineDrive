import * as jwt from "jsonwebtoken";
import { GetClientToken } from "@/util/auth";
import { IsEmpty } from "@/util";
import {
  AUTH_SECRETS,
  INTERNAL_ERROR,
  Routes,
  UnAuthorizedRoutes,
} from "@/lib/const";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isUnProtectedRoute = UnAuthorizedRoutes.includes(path)
  
  const { value: AuthToken } = GetClientToken(req);
  if (!AUTH_SECRETS.SECRET || IsEmpty(AUTH_SECRETS.SECRET)) {
    console.log(INTERNAL_ERROR, "couldn't read auth secret key");
    return NextResponse.redirect(new URL(Routes.LoginPage, req.nextUrl))
  }

  if (AuthToken && !IsEmpty(AuthToken)) {
    jwt.verify(AuthToken, AUTH_SECRETS.SECRET, (err: any, payload: any) => {
      if (err) return NextResponse.redirect(new URL(Routes.LoginPage, req.nextUrl))
      /*@ts-ignore*/
      req["authPayload"] = payload;
      return NextResponse.next();
    });
  }else if(!isUnProtectedRoute){
    return NextResponse.redirect(new URL(Routes.LoginPage, req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}