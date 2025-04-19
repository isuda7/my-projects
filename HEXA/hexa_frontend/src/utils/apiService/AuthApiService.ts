import createBaseUri from "@/utils/createBaseUri.ts";
import {CheckPwdParams, LoginParams, LoginResponse} from "@/utils/apiService/type/auth/login.type.ts";
import {Menu} from "@/utils/apiService/type/auth/menu.type.ts";
import api from './axios'
import i18n from "@/utils/i18n/i18n.ts";


export interface MenuListResponse {
  data?: Menu[];
}


function AuthApiService() {
  const baseUri = createBaseUri("v1/auth");

  const signin = async (param: LoginParams) => {
    const { data } = await api.post(`${baseUri}/login`, param, {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Accept-Language": i18n.language,
      },
      withCredentials: false,
      responseType: "json"
    })
    return data;
  };

  const checkPwd = async (param: CheckPwdParams) => {
    return await api.post(`${baseUri}/pwd-check`, param).catch(e=> e.response);
  };

  const signOut = async () => {
    const { data } = await api.delete(`${baseUri}/logout`)
    return data;
  }
  const sendOtp = async (params: any) => {
    const { data } = await api.post(`${baseUri}/send-otp`, params)
    return data;
  }

  const checkOtp = async (params: any) => {
    const { data } = await api.post(`${baseUri}/otp-check`, params)
    return data;
  }

  const newPwd = async (params: any) => {
    const { data } = await api.put(`${baseUri}/new-pwd`, params)
    return data;
  }

  return {
    signin,
    checkPwd,
    signOut,
    sendOtp,
    checkOtp,
    newPwd
  };
}

export default AuthApiService;
