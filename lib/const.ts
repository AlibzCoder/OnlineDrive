const {
  DB_HOST_NAME,
  DB_USE_SRV,
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
  UPLOAD_DIR
} = process.env;

export const DB_CREDENTIALS = {
  DB_HOST_NAME: DB_HOST_NAME,
  DB_USE_SRV: parseInt(DB_USE_SRV || '') === 1,
  DB_ADMIN_NAME: DB_ADMIN_NAME,
  DB_APP_NAME: DB_APP_NAME,
  DB_USERNAME: DB_USERNAME,
  DB_PASSWORD: DB_PASSWORD,
  DB_ADDITIONALL_CONNECTION_STRING: DB_ADDITIONALL_CONNECTION_STRING,
  DB_USERS_COLLECTION_NAME: DB_USERS_COLLECTION_NAME,
};

export const UPLOAD_PATH = UPLOAD_DIR || 'upload';

const encoder = new TextEncoder();

export const AUTH_SECRETS = {
  SECRET: encoder.encode(AUTH_SECRET || "41aa67bcdc265334364d6dfd6b3718174fdbfeb15512be98926858aade6e5a82"),
  REFRESH_SECRET: encoder.encode(AUTH_REFRESH_SECRET || "2bbe0767d74c8a314315f02ebdc999e1c9b9e18959a9e53350a3d3dfa2d4c79a"),
  EXPIRES_IN: parseInt(AUTH_EXPIRES_IN || '') || 86400, // 1 day
  REFRESH_EXPIRES_IN: parseInt(AUTH_REFRESH_EXPIRES_IN || '') || 31556926, // 1 year
}

export class ResponseError extends Error {
  message = "";
  code = "";
  responseCode = 0;
  data = {};
  constructor(message: string, code: string, responseCode: number, data = {}) {
    super(message);
    this.code = code;
    this.responseCode = responseCode;
    this.data = {...data, message: message};
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
export const UNAUTHORIZED_ERROR = new ResponseError(
  "Unauthorized",
  "UNAUTHORIZED_ERROR",
  401
);
export const INVALID_FORMDATA_ERROR = new ResponseError(
  "Invalid Form Data",
  "INVALID_FORMDATA_ERROR",
  400
);
export const FILE_NOTFOUND_ERROR = new ResponseError(
  "File Not Found Error",
  "FILE_NOTFOUND_ERROR",
  400
);
export const DB_DUPLICATE_KEY_ERR_CODE = 11000;


export const PageRoutes = {
  HomePage: "/",
  LoginPage: "/login",
  SignUpPage: "/sign-up",
};
export const APIRoutes = {
  Login: "/api/auth/login",
  SignUp: "/api/auth/sign-up",
  GetUserInfo: "/api/user",
  CreateNewDirectory: "/api/drive/create-dir",
  GetFilesByDirectory: "/api/drive/list",
  UploadFileToDirectory: "/api/drive/upload",
  DeleteFile: "/api/drive/remove",
};
export const UnAuthorizedPageRoutes = [PageRoutes.LoginPage, PageRoutes.SignUpPage];
export const UnAuthorizedAPIRoutes = [APIRoutes.Login, APIRoutes.SignUp];


export const extentionsIcons = {
  folder: "fa-folder",
  xlsx: "fa-file-excel",
  docx: "fa-file-word",
  pdf: "fa-file-pdf",
  zip: "fa-file-archive",
  svg: "fa-file-code",
  xml: "fa-file-code",
  mp4: "fa-file-video",
  mkv: "fa-file-video",
  mov: "fa-file-video",
  avi: "fa-file-video",
  mp3: "fa-file-audio",
  m4a: "fa-file-audio",
  wav: "fa-file-audio",
  ogg: "fa-file-audio",
  jpeg: "fa-file-image",
  jpg: "fa-file-image",
  png: "fa-file-image",
  gif: "fa-file-image",
  webp: "fa-file-image",
  ico: "fa-file-image",
  html: "fa-file-code",
  css: "fa-file-code",
  scss: "fa-file-code",
  js: "fa-file-code",
  ts: "fa-file-code",
  jsx: "fa-file-code",
  tsx: "fa-file-code",
  json: "fa-file-code",
  md: "fa-file-code",
  php: "fa-file-code",
  pptx: "fa-file-powerpoint",
  other: "fa-file",
  addNew: "fa-plus",
};