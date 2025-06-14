import { LoginPayload, LoginResponse, ValidateResponse } from '@services/api';
import { getUrl } from '@services/api/utils.ts';
import { http } from '@services/http.service.ts';

const login = (payload: LoginPayload): Promise<LoginResponse> =>
  http.post(getUrl('login'), payload);

const validate = (): Promise<ValidateResponse> => http.post(getUrl('validate'));

const logout = (): Promise<ValidateResponse> => http.post(getUrl('logout'));

export const authentication = { logout, login, validate };
