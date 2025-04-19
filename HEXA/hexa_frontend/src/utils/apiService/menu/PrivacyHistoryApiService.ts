import createBaseUri from "@/utils/createBaseUri.ts";
import axios from "@/utils/apiService/axios.ts";
import api from "@/utils/apiService/axios.ts";
import { ResponseDataType } from "../type/common/responseData.type";
import { PrivacyHist, PrivacyHistResponse } from "../type/system/accessLog/PrivacyHistoryDto";

function PrivacyHistoryApiService() {
  const baseUri = createBaseUri("v1/system/privacy-history");

  const getPrivacyHistory = async (params: PrivacyHist) => {
    try {
      const response = await api.get<ResponseDataType<PrivacyHistResponse[]>>(baseUri, params);
      // console.log('response', response)
	    return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch privacy access history list: ${error}`);
    }
  }

  const privacyHistoryDownloadList = async (urlParams: PrivacyHist) => {
    try {
      await api.download(`${baseUri}/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  }

  return {
    getPrivacyHistory,
    privacyHistoryDownloadList
  };
}

export default PrivacyHistoryApiService;