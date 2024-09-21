import { Document, ObjectId } from "mongoose";

export interface User extends Document {
  id?: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  password: string;
  date?: string | Date;
}

export interface File extends Document {
  id?: number;
  user: ObjectId,
  type: "folder" | "file";
  name: string;
  extention: string;
  path: string
  dirId: ObjectId,
  size?: string;
  date?: string | Date;
}