import DBConnect from "@/lib/mongo";
import { AuthorizedRequest } from "@/types/api";
import { NextResponse } from "next/server";
import { getUserByAuthPayloadOrUserName } from "../../auth/util";
import { INTERNAL_ERROR } from "@/lib/const";
import { IsEmpty } from "@/util";
import FileDBSchema from "@/schemas/db/file";
import path from "path";
import { rmSync, unlinkSync } from "fs";
import mongoose from "mongoose";

async function handler(req: AuthorizedRequest) {
  try {
    await DBConnect();

    const url = new URL(req.url)
    const fileId = url.searchParams.get("id");
    const user = await getUserByAuthPayloadOrUserName(req);
    
    if (IsEmpty(fileId)) {
      return NextResponse.json(
        { message: "Couldn't find the File" },
        { status: 400 }
      );
    }
    try {
      const file = await FileDBSchema.findOne({
        user: user.id,
        _id: new mongoose.Types.ObjectId(String(fileId)) 
      });
      if(file){
        const filePath = path.join(process.cwd(), file.path);
        try{
          if(file.type === "file"){
            await unlinkSync(filePath)
          }else{
            await rmSync(filePath, { recursive: true, force: true });
            await FileDBSchema.deleteMany({
              user: user.id,
              dirId: file._id
            });
          }
          await FileDBSchema.deleteOne({_id: file._id})
          return NextResponse.json({message : 'removed successfully'}, {status : 200});
        }catch(e){
          return NextResponse.json(INTERNAL_ERROR, { status: 500 });
        }
      }else{
        return NextResponse.json(
          { message: "Couldn't find the File" },
          { status: 400 }
        );
      }
    } catch (e) {
      return NextResponse.json(
        { message: "Couldn't find the File" },
        { status: 400 }
      );
    }
  } catch (e) {
    return NextResponse.json(INTERNAL_ERROR, { status: 500 });
  }
}
export { handler as POST };
