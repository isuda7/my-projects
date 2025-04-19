import createBaseUri from "@/utils/createBaseUri.ts";
import { LoginHist, LoginHistResponse } from "../type/system/accessLog/LoginHistDto";
import api from "../axios";
import { ResponseDataType } from "../type/common/responseData.type";

function LoginAccessApiService() {
  const baseUri = createBaseUri("v1/system/login-history");

  const getLoginHistory = async (params: LoginHist) => {
    try {
      const response = await api.get<ResponseDataType<LoginHistResponse[]>>(baseUri, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch login history list: ${error}`);
    }
  };

  const loginHistoryDownloadList = async (urlParams: LoginHist) => {
    try {
      await api.download(`${baseUri}/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  return {
    getLoginHistory,
    loginHistoryDownloadList
  };
}

export default LoginAccessApiService;