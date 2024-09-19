import { connect, Mongoose } from "mongoose";
import { DB_CREDENTIALS } from "./const";

const DBConnect = (): Promise<Mongoose> => {
  const {
    DB_HOST_NAME,
    DB_ADMIN_NAME,
    DB_APP_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_ADDITIONALL_CONNECTION_STRING,
  } = DB_CREDENTIALS;

  return new Promise(async (res, rej) => {
    try {
      const Client = await connect(
        `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST_NAME}/${DB_ADDITIONALL_CONNECTION_STRING || DB_ADMIN_NAME}`
      );
      if(DB_APP_NAME) Client.connection.useDb(DB_APP_NAME);
      res(Client);
    } catch (e) {
      console.log("Unable To Connect To Database", e);
      rej(e);
    }
  });
};

export default DBConnect;
