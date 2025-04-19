import createBaseUri from "@/utils/createBaseUri.ts";
import axios from "@/utils/apiService/axios.ts";
import { AccessHist, AccessHistResponse } from "../type/system/accessLog/MenuAccessHistDto";
import api from "@/utils/apiService/axios.ts";
import { ResponseDataType } from "../type/common/responseData.type";


export interface MenuAccessRequestDto {
  pageUrl: string;
}


function MenuAccessApiService() {
  const baseUri = createBaseUri("v1/system/access-history");

  const accessLog = async (data: MenuAccessRequestDto) => {
    const response = await axios.post(`${baseUri}`, data, { showLoading: false });
    console.log('accessLog',response);
  }

  const getAccessHistory = async (params: AccessHist) => {
    try {
      const response = await api.get<ResponseDataType<AccessHistResponse[]>>(`${baseUri}/search`, params);
      // console.log('response', response)
	    return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch menu access history list: ${error}`);
    }
  };

  const accessHistoryDownloadList = async (urlParams: AccessHist) => {
    try {
      await api.download(`${baseUri}/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };


  return {
    accessLog,
    getAccessHistory,
    accessHistoryDownloadList
  };
}

export default MenuAccessApiService;
