import { INTERNAL_ERROR, USER_NOTFOUND_ERROR } from "@/lib/const";
import DBConnect from "@/lib/mongo";
import { AuthorizedRequest } from "@/types/api";
import { NextResponse } from "next/server";
import { getUserByAuthPayloadOrUserName } from "../auth/util";

async function handler(req: AuthorizedRequest) {
  try {
    await DBConnect();
    const user = await getUserByAuthPayloadOrUserName(req);
    return NextResponse.json(user, { status: 200 });
  } catch (e: typeof USER_NOTFOUND_ERROR | typeof INTERNAL_ERROR | any) {
    return NextResponse.json(e, {
      status: e?.responseCode ? e?.responseCode : 500,
    });
  }
}

export { handler as GET };
