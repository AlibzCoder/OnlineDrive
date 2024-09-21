import { IsArray, IsObj } from "@/util";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { Bounce, toast } from "react-toastify";
import { DB_DUPLICATE_KEY_ERR_CODE } from "../const";

export const httpApi = axios.create({
    withCredentials: true
});
export interface ApiErrorData {
  message: string;
}

const interceptorConfig = (config: AxiosRequestConfig) => {
  //any config
  return config;
};
const interceptorCatchError = (error: AxiosError) => {
  //any config
  return Promise.reject(error);
};

const onResponse = (res: AxiosResponse) => {
  return res;
};

const onError = async (err: AxiosError | any) => {
  const responseData = err.response.data;
  const errorMessages : string[] = [];
  if(responseData && responseData?.data?.message) errorMessages.push(responseData?.data?.message); // defined errors
  if(responseData && IsArray(responseData)){ // validation errors
    responseData.forEach((item: object | any)=>{
      if(item?.message) errorMessages.push(item?.message)
    })
  }
  if(responseData && responseData.code === DB_DUPLICATE_KEY_ERR_CODE && IsObj(responseData.keyValue)) { // duplicate value errors
    Object.keys(responseData.keyValue).forEach(item => {
      errorMessages.push(`"${item}" You've entered Already exists, please enter something else`)
    })
  }
  errorMessages.forEach((message)=>{
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  })
  return Promise.reject(err.response || err.toJSON());
};

httpApi.interceptors.response.use(onResponse, onError);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
httpApi.interceptors.request.use(interceptorConfig, interceptorCatchError);

export default httpApi;
