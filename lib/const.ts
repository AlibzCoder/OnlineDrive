const {
  DB_HOST_NAME,
  DB_ADMIN_NAME,
  DB_APP_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_ADDITIONALL_CONNECTION_STRING,
  DB_USERS_COLLECTION_NAME,
  AUTH_SECRET,
  AUTH_REFRESH_SECRET,
  AUTH_EXPIRES_IN,
  AUTH_REFRESH_EXPIRES_IN,
} = process.env;

export const DB_CREDENTIALS = {
  DB_HOST_NAME: DB_HOST_NAME,
  DB_ADMIN_NAME: DB_ADMIN_NAME,
  DB_APP_NAME: DB_APP_NAME,
  DB_USERNAME: DB_USERNAME,
  DB_PASSWORD: DB_PASSWORD,
  DB_ADDITIONALL_CONNECTION_STRING: DB_ADDITIONALL_CONNECTION_STRING,
  DB_USERS_COLLECTION_NAME: DB_USERS_COLLECTION_NAME,
};

export const AUTH_SECRETS = {
  SECRET: AUTH_SECRET,
  REFRESH_SECRET: AUTH_REFRESH_SECRET,
  EXPIRES_IN: AUTH_EXPIRES_IN,
  REFRESH_EXPIRES_IN: AUTH_REFRESH_EXPIRES_IN,
};

export class ResponseError extends Error {
  message = "";
  code = "";
  responseCode = 0;
  data = {};
  constructor(message: string, code: string, responseCode: number, data = {}) {
    super(message);
    this.code = code;
    this.responseCode = responseCode;
    this.data = data;
  }
}

export const USER_NOTFOUND_ERROR = new ResponseError(
  "No user with this username exists!",
  "USER_NOT_FOUND",
  404
);
export const INCORRECT_PASSWORD = new ResponseError(
  "Password is incorrect",
  "INCORRECT_PASSWORD",
  400
);
export const INTERNAL_ERROR = new ResponseError(
  "Internal Server",
  "INTERNAL_ERROR",
  500
);

export const Routes = {
  HomePage: "/",
  LoginPage: "/login",
  SignUpPage: "/sign-up",
};
export const UnAuthorizedRoutes = ["/login", "/sign-up"];
