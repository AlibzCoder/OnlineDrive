import { File } from "@/types/models";
import { Model, model, Schema } from "mongoose";

const FileSchema = new Schema<File>({
  user: {
    type: Schema.ObjectId,
    ref: "user",
  },
  type: {
    type: String,
    enum: ["folder", "file"],
    required: true,
    default : 'file'
  },
  name: {
    type: String,
    required: true
  },
  extention: {
    type: String
  },
  size: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
  },
  path:{
    type: String,
    required: true
  },
  dirId:{
    type: Schema.ObjectId
  }
});

let _model: Model<File>;
try {
  _model = model<File>("file");
} catch (_e) {
  _model = model<File>("file", FileSchema);
}

//checking for existing model
const FileDBSchema = _model;

export default FileDBSchema;
