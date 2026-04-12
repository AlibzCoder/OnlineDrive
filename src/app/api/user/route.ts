import DBConnect from "@/lib/mongo";
import { AuthorizedRequest } from "@/types/api";
import { NextResponse } from "next/server";
import { getUserByAuthPayloadOrUserName } from "../auth/util";

async function handler(req: AuthorizedRequest) {
  try {
    await DBConnect();
    const user = await getUserByAuthPayloadOrUserName(req);
    return NextResponse.json(user, { status: 200 });
  } catch (e: unknown) {
    const err = e as { responseCode?: number };
    return NextResponse.json(e, {
      status: err?.responseCode ? err?.responseCode : 500,
    });
  }
}

export { handler as GET };
