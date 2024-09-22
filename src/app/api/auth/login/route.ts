import {
  INCORRECT_PASSWORD,
  INTERNAL_ERROR,
  USER_NOTFOUND_ERROR,
} from "@/lib/const";
import DBConnect from "@/lib/mongo";
import { LoginSchema } from "@/schemas/validators/auth";
import { AuthorizedRequest } from "@/types/api";
import { cleanString } from "@/util";
import {
  compareHashedPassword,
  GenerateAuthCredentials,
  SetClientAuthCookie,
} from "@/util/auth";
import vine, { errors } from "@vinejs/vine";
import { NextResponse } from "next/server";
import { getUserByAuthPayloadOrUserName } from "../util";

async function handler(req: AuthorizedRequest) {
  try {
    await DBConnect();
    const body = await req.json();
    const loginData = {
      username: cleanString(body?.username),
      password: cleanString(body?.password, true),
    };
    await vine.validate({ schema: LoginSchema, data: loginData });
    try {
      const user = await getUserByAuthPayloadOrUserName(
        req,
        loginData.username,
        false
      );
      console.log(loginData.password, user);
      const isMatch = compareHashedPassword(loginData.password, user.password);
      if (isMatch) {
        const authCredentials = await GenerateAuthCredentials({
          _id: user._id,
          username: user.username,
        });
        const response = NextResponse.json(authCredentials, { status: 200 });
        SetClientAuthCookie(response, authCredentials);
        return response;
      } else {
        return NextResponse.json(INCORRECT_PASSWORD, { status: 400 });
      }
    } catch (e: typeof USER_NOTFOUND_ERROR | typeof INTERNAL_ERROR | any) {
      return NextResponse.json(e, {
        status: e?.responseCode ? e?.responseCode : 500,
      });
    }
  } catch (e) {
    if (e instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(e.messages, { status: 400 });
    } else {
      return NextResponse.json(INTERNAL_ERROR, { status: 500 });
    }
  }
}

export { handler as POST };
