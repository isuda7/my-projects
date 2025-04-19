import createBaseUri from "../createBaseUri";
import api from "./axios";
import { Response } from "./interface/CommonServiceInserface";
import { ResponseDataType } from "./type/common/responseData.type";
import { SaveApikeyDto, SearchApikeyDto } from "./type/system/apikey/ApikeyRequestDto";
import { ApikeyResponseDto } from "./type/system/apikey/ApikeyResponseDto";

const ApikeyApiService = () => {
  const baseUri = createBaseUri("v1/system/api-key");

  const createApikey = async (data: any) => {
    try {
      const response = await api.post<Response<ApikeyResponseDto>>(baseUri, data);
      return response.data;
    }
    catch (error : any) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      throw new Error(`Failed to create api-key: ${errorMessage}`);
    }
  }

  const getApikeyList = async (params: SearchApikeyDto) => {
    try {
      const response = await api.get<ResponseDataType<ApikeyResponseDto[]>>(`${baseUri}/search`, params);
      return response.data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Api-key Info List data: ${error}`);
    }
  };

  const getApikeyById = async (tsid: number) => {
    try {
      const { data } = await api.get<ApikeyResponseDto>(`${baseUri}/${tsid}`);
      return data.data as ApikeyResponseDto;
    }
    catch (error) {
      throw new Error(`Failed to fetch Api-key Info data: ${error}`);
    }
  };

  const updateApikey = async (tsid: string, data: any) => {
    try {
      const response = await api.put<Response<ApikeyResponseDto>>(`${baseUri}/${tsid}`, data);
      return response.data;
    }
    catch (error : any) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      throw new Error(`Failed to update api-key: ${errorMessage}`);
    }
  }

  const deleteApikey = async (tsid: string) => {
    try {
      const response = await api.delete(`${baseUri}/${tsid}`);
      return response.data;
    }
    catch (error : any) {
      console.log('error', error);
      throw new Error(`Failed to Delete Apikey data: ${error?.message}`);
    }
  }

  const downloadExcel = async (urlParams: SearchApikeyDto) => {
    try {
      await api.download(`${baseUri}/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  }

  return {
    createApikey,
    getApikeyList,
    getApikeyById,
    updateApikey,
    deleteApikey,
    downloadExcel
  };

};

export default ApikeyApiService;