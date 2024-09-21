import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { INVALID_FORMDATA_ERROR, UPLOAD_PATH } from "@/lib/const";
import { getUserByAuthPayloadOrUserName } from "../../auth/util";
import { AuthorizedRequest } from "@/types/api";
import DBConnect from "@/lib/mongo";
import mongoose, { Schema } from "mongoose";
import { IsEmpty } from "@/util";
import { GetUserDirectoryByIdOrName } from "@/util/upload";
import FileDBSchema from "@/schemas/db/file";
import { existsSync } from "fs";

export const handler = async (req: AuthorizedRequest, res: NextResponse) => {
  try {
    await DBConnect();

    const formData = await req.formData();

    const file = formData.get("file") as File;
    const dirId = formData.get("dirId") as string;
    
    if (!file) {
      return NextResponse.json(INVALID_FORMDATA_ERROR, { status: 400 });
    }
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replaceAll(" ", "_");
      const user = await getUserByAuthPayloadOrUserName(req);

      const fileInfo = {
        user: user?.id,
        name: filename,
        size: file.size,
        extention: path.extname(filename),
        type: "file",
        date: Date.now(),
        path: "",
        dirId: dirId ? new mongoose.Types.ObjectId(String(dirId)) : null,
      };
      if (IsEmpty(dirId)) {
        try {
          const userRootDir = await GetUserDirectoryByIdOrName(
            user,
            null,
            String(user.id)
          );
          if (userRootDir) {
            fileInfo.path = `${userRootDir?.path}/${fileInfo.name}`;
            fileInfo.dirId = new mongoose.Types.ObjectId(
              String(userRootDir?._id)
            );
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
            _id: dirId,
            type: "folder",
          });
          if (dir) {
            fileInfo.path = `${dir?.path}/${fileInfo.name}`;
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

      const fullPath = path.join(process.cwd(), fileInfo.path);
      if (existsSync(fullPath))
        return NextResponse.json(
          {
            Message: "File Already Exists",
          },
          { status: 400 }
        );
      try {
        await writeFile(fullPath, buffer);
        await new FileDBSchema(fileInfo).save();
        return NextResponse.json({ Message: "Success", status: 200 });
      } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
      }
    } catch (e) {
      console.log("Error occured ", e);
      return NextResponse.json(INVALID_FORMDATA_ERROR, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json(INVALID_FORMDATA_ERROR, { status: 400 });
  }
};
export { handler as POST };
