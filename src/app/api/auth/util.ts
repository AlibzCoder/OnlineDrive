import { INTERNAL_ERROR, USER_NOTFOUND_ERROR } from "@/lib/const";
import UserDBSchema from "@/schemas/db/user";
import { AuthorizedRequest } from "@/types/api";
import { User } from "@/types/models";
import { IsEmpty, IsObj } from "@/util";

export function getUserByAuthPayloadOrUserName(
  request: AuthorizedRequest,
  username: string | null = null,
  formatData: boolean | undefined = true
): Promise<User> {
  return new Promise((res, rej) => {
    const TokenPayload = JSON.parse(
      (request && IsObj(request.headers) && request?.headers
        ? request.headers.get("X-Auth-Payload")
        : "") || `{"username" : ""}`
    );
    if ((!TokenPayload || !TokenPayload?.username) && !username)
      return rej(USER_NOTFOUND_ERROR);
    if (IsEmpty(username) && !IsEmpty(TokenPayload?.username))
      username = TokenPayload?.username;

    UserDBSchema.findOne({ username: username })
      .then((user: User | null) => {
        if (!user) return rej(USER_NOTFOUND_ERROR);
        res(formatData ? UserDBDocToJson(user) : user);
      })
      .catch(() => rej(INTERNAL_ERROR));
  });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UserDBDocToJson(user: any): User {
  if (user?.toJSON) user = user.toJSON();
  const { _id, ...rest } = user;
  delete rest.__v;
  delete rest.password;
  return Object.assign({ id: _id }, rest);
}
