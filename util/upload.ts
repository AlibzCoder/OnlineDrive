import { UPLOAD_PATH } from "@/lib/const";
import FileDBSchema from "@/schemas/db/file";
import { File, User } from "@/types/models";
import { existsSync, mkdirSync } from "fs";
import mongoose, { Schema } from "mongoose";
import path from "path";

export function GetUserRootFolderPath(user: User) {
  return path.join(process.cwd(), `/${UPLOAD_PATH}/` + user._id);
}

export async function CreateUserRootFolder(user: User) {
  return new Promise(async (res, rej) => {
    const userRootPath = GetUserRootFolderPath(user);
    if (existsSync(userRootPath)) res(true);
    try {
      const file = mkdirSync(userRootPath, { recursive: true });
      const fileInfo = {
        user: user?._id,
        name: String(user?._id),
        path: `/${UPLOAD_PATH}/${String(user?._id)}`,
        dirId: null,
        size: 0,
        type: "folder",
        date: Date.now(),
      };
      await new FileDBSchema(fileInfo).save();
      res(file);
    } catch (e) {
      rej(e);
    }
  });
}
export function GetUserDirectoryByIdOrName(
  user: User,
  id: string | null,
  name: string | null
) {

  return FileDBSchema.findOne({
    user: user.id,
    type: "folder",
    ...(id ? { _id: new mongoose.Types.ObjectId(String(id)) } : {}),
    ...(name ? { name: name } : {}),
  });
}

export function FileDBDocToJson(file: File | any) {
  if(file?.toJSON) file = file.toJSON();
  const { _id, __v, ...UserExcludedFields } = file;
  return Object.assign({ id: _id }, UserExcludedFields);
}