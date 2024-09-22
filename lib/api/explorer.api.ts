import httpApi from "@/lib/api";
import { APIRoutes } from "../const";

export const GetFilesByDirectory = (
  dirId: string | null = null
): Promise<File[]> =>
  httpApi
    .get<File[]>(APIRoutes.GetFilesByDirectory, {
      params: {
        dirId: dirId,
      },
    })
    .then(({ data }) => data);

export const CreateNewDirectory = (
  dirName: string,
  parentDirId: string | null
): Promise<any> =>
  httpApi
    .post<any>(APIRoutes.CreateNewDirectory, {
      name: dirName,
      dirId: parentDirId,
    })
    .then(({ data }) => data);

export const UploadFileToDirectory = (formData: FormData): Promise<any> =>
  httpApi<any>({
    method: "post",
    url: APIRoutes.UploadFileToDirectory,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then(({ data }) => data);

export const DeleteFile = (id: string): Promise<any> =>
  httpApi<any>({
    method: "post",
    url: `${APIRoutes.DeleteFile}?id=${id}`,
  }).then(({ data }) => data);
