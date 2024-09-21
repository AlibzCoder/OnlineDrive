
import { User } from "@/types/models";
import { Model, model, models, Schema } from "mongoose"

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  fullName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let _model : Model<User>;
try{
  _model = model<User>("user");
}catch(_e){
  _model = model<User>("user", UserSchema);
}

//checking for existing model
const UserDBSchema = _model;

export default UserDBSchema