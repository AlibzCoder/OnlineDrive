import { INTERNAL_ERROR } from "@/lib/const";
import DBConnect from "@/lib/mongo";
import { CreateDirSchema } from "@/schemas/validators/file";
import { AuthorizedRequest, AuthorizedResponse } from "@/types/api";
import vine, { errors } from "@vinejs/vine";
import { NextResponse } from "next/server";
import { getUserByAuthPayloadOrUserName } from "../../auth/util";
import mongoose from "mongoose";
import { IsEmpty } from "@/util";
import { GetUserDirectoryByIdOrName } from "@/util/upload";
import FileDBSchema from "@/schemas/db/file";
import path from "path";
import { existsSync, mkdirSync, writeFile } from "fs";

async function handler(req: AuthorizedRequest, res: AuthorizedResponse) {
  try {
    await DBConnect();
    const body = await req.json();
    const info = {
      name: body.name,
      dirId: body.dirId,
    };
    await vine.validate({ schema: CreateDirSchema, data: info });
    const user = await getUserByAuthPayloadOrUserName(req);
    const dirInfo = {
      user: new mongoose.Types.ObjectId(String(user.id)),
      name: info.name,
      path: "",
      dirId: info.dirId
        ? new mongoose.Types.ObjectId(String(info.dirId))
        : null,
      size: 0,
      type: "folder",
      date: Date.now(),
    };

    if (IsEmpty(info.dirId)) {
      try {
        const userRootDir = await GetUserDirectoryByIdOrName(
          user,
          null,
          String(user.id)
        );
        if (userRootDir) {
          dirInfo.path = `${userRootDir?.path}/${dirInfo.name}`;
          dirInfo.dirId = new mongoose.Types.ObjectId(String(userRootDir?._id));
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
    } else {
      try {
        const dir = await FileDBSchema.findOne({
          user: user.id,
          _id: dirInfo.dirId,
          type: "folder",
        });
        if (dir) {
          dirInfo.path = `${dir?.path}/${dirInfo.name}`;
        } else {
          return NextResponse.json(
            { message: "Couldn't find destination folder" },
            { status: 400 }
          );
        }
      } catch (e) {
        return NextResponse.json(
          { message: "Couldn't find destination folder" },
          { status: 400 }
        );
      }
    }
    const fullPath = path.join(process.cwd(), dirInfo.path);
    if (existsSync(fullPath))
      return NextResponse.json(
        {
          Message: "File Already Exists",
        },
        { status: 400 }
      );
    try {
      const file = await mkdirSync(fullPath);
      const dir = await new FileDBSchema(dirInfo).save();
      return NextResponse.json(dir, { status: 200 });
    } catch (error) {
      console.log("Error occured ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
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
