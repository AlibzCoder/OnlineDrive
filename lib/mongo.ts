import mongoose, { connect, Connection, Mongoose } from "mongoose";
import { DB_CREDENTIALS } from "./const";
import { IsArray } from "@/util";

const DBConnect = (): Promise<Mongoose> => {
  const {
    DB_HOST_NAME,
    DB_USE_SRV,
    DB_ADMIN_NAME,
    DB_APP_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_ADDITIONALL_CONNECTION_STRING,
  } = DB_CREDENTIALS;

  return new Promise(async (res, rej) => {
    if (mongoose.connection?.readyState) res(mongoose);
    try {
      const connectionURI = `mongodb${
        DB_USE_SRV ? "+srv" : ""
      }://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST_NAME}/${
        DB_ADDITIONALL_CONNECTION_STRING || DB_ADMIN_NAME
      }`;
      const Client = await connect(connectionURI);
      if (DB_APP_NAME) Client.connection.useDb(DB_APP_NAME);
      res(Client);
    } catch (e) {
      console.log("Unable To Connect To Database", e);
      rej(e);
    }
  });
};

export default DBConnect;
