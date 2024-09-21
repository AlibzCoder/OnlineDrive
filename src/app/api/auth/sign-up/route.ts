import { INTERNAL_ERROR } from "@/lib/const";
import DBConnect from "@/lib/mongo";
import UserDBSchema from "@/schemas/db/user";
import { RegisterSchema } from "@/schemas/validators/auth";
import { AuthorizedRequest } from "@/types/api";
import { cleanString } from "@/util";
import {
  GenerateAuthCredentials,
  HashPassword,
  SetClientAuthCookie
} from "@/util/auth";
import vine, { errors } from "@vinejs/vine";
import { NextResponse } from "next/server";
import { UserDBDocToJson } from "../util";
import { CreateUserRootFolder } from "@/util/upload";

async function handler(req: AuthorizedRequest) {
  try {
    await DBConnect();
    const body = await req.json();
    const newUser = {
      username: cleanString(body?.username),
      password: cleanString(body?.password, true),
      firstName: cleanString(body?.firstName),
      lastName: cleanString(body?.lastName),
      email: cleanString(body?.email),
      fullName: "",
    };
    newUser.fullName = `${newUser.firstName} ${newUser.lastName}`;
    await vine.validate({ schema: RegisterSchema, data: newUser });
    newUser.password = HashPassword(newUser.password);
    try {
      const user = await new UserDBSchema(newUser).save();
      const result = UserDBDocToJson(user);
      await CreateUserRootFolder(user);
      const loginAfterCreate = req.nextUrl.searchParams.get("loginAfterCreate");
      if (loginAfterCreate) {
        const authCredentials = await GenerateAuthCredentials({
          _id: result.id,
          username: result.username,
        });
        const response = NextResponse.json(authCredentials, {status: 200});
        SetClientAuthCookie(response, authCredentials)
        return response;
      } else {
        return NextResponse.json(result, { status: 200 });
      }
    } catch (e) {
      return NextResponse.json(e, { status: 400 });
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
