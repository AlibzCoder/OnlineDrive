import { AxiosRequestConfig } from "axios";
import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { User } from "@/types/models";
import { APIRoutes } from "../const";

const ApiEndPoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getUserInfo: builder.query<User, void>({
    query: (): AxiosRequestConfig => ({
      url: APIRoutes.GetUserInfo,
      method: "GET",
    }),
  })
});
export default ApiEndPoints;
