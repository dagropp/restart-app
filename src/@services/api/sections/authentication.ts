import { LoginPayload, LoginResponse, ValidateResponse } from '@services/api';
import { getUrl } from '@services/api/utils';
import { http } from '@services/http.service';

const login = (payload: LoginPayload): Promise<LoginResponse> =>
  http.post(getUrl('login'), payload);

const validate = (): Promise<LoginResponse> => http.post(getUrl('validate'));

const logout = (): Promise<ValidateResponse> => http.post(getUrl('logout'));

export const authentication = { logout, login, validate };
