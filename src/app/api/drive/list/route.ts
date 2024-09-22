import DBConnect from "@/lib/mongo";
import { AuthorizedRequest } from "@/types/api";
import { NextResponse } from "next/server";
import { getUserByAuthPayloadOrUserName } from "../../auth/util";
import { INTERNAL_ERROR } from "@/lib/const";
import { IsEmpty } from "@/util";
import { FileDBDocToJson, GetUserDirectoryByIdOrName } from "@/util/upload";
import mongoose from "mongoose";
import FileDBSchema from "@/schemas/db/file";
import { File } from "@/types/models";

async function handler(req: AuthorizedRequest) {
  try {
    await DBConnect();

    const url = new URL(req.url)
    const dirIdParam = url.searchParams.get("dirId");
    let dirId = dirIdParam ? new mongoose.Types.ObjectId(String(dirIdParam)) : null
    let userRootDir;
    const user = await getUserByAuthPayloadOrUserName(req);
    
    if (IsEmpty(dirId)) {
      try {
        userRootDir = await GetUserDirectoryByIdOrName(
          user,
          null,
          String(user.id)
        );
        if (userRootDir && userRootDir?._id instanceof mongoose.Types.ObjectId) {
          dirId = userRootDir?._id;
        } else {
          return NextResponse.json(
            { message: "Couldn't find user root folder" },
            { status: 500 }
          );
        }
      } catch {
        return NextResponse.json(
          { message: "Couldn't find user root folder" },
          { status: 500 }
        );
      }
    }
    try {
      const dirs = await FileDBSchema.find({
        user: user.id,
        dirId: dirId
      });
      const _dirs: File[] = userRootDir ? [FileDBDocToJson(userRootDir)] : [];
      dirs.forEach((file: File) => {
        _dirs.push(FileDBDocToJson(file));
      });
      return NextResponse.json(_dirs, {status : 200});
    } catch (e) {
      return NextResponse.json(
        { message: "Couldn't find destination folder" },
        { status: 400 }
      );
    }
  } catch (e) {
    return NextResponse.json(INTERNAL_ERROR, { status: 500 });
  }
}
export { handler as GET };
