
import httpApi from '@/lib/api';
import { APIRoutes } from '../const';
import { ClientLoginRequest, ClientLoginResponse, ClientSignUpRequest, ClientSignUpResponse } from '@/types/api';

export const callLogin = (loginPayload: ClientLoginRequest): Promise<ClientLoginResponse> =>
  httpApi.post<ClientLoginResponse>(APIRoutes.Login, { ...loginPayload }).then(({ data }) => data);

export const callSignUp = (signUpData: ClientSignUpRequest): Promise<ClientSignUpResponse> =>
  httpApi.post<ClientSignUpResponse>(`${APIRoutes.SignUp}?loginAfterCreate=true`, { ...signUpData }).then(({ data }) => data);