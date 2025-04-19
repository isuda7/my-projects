import createBaseUri from "@/utils/createBaseUri.ts";
import api from "@/utils/apiService/axios.ts";
import { ResponseDataType } from "@/utils/apiService/type/common/responseData.type.ts";
import { Response } from "@/utils/apiService/interface/CommonServiceInserface.ts";
import { ManualIdDto, SearchManual, SearchUsingManual, UseManualRequestDto } from "../type/board/UseManualRequestDto";
import { UseManualResponseDto } from "../type/board/UseManualResponseDto";

const UseManualApiService = () => {
  const baseUri = createBaseUri("v1/board/use-manual");

  const createUseManual = async (data: any) => {
    console.log('데이터:', data);
    try {
      const response = await api.post<Response<UseManualResponseDto>>(baseUri, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
      throw new Error(`Failed to create common-code: ${errorMessage}`);
    }
  }

  const getUseManualList = async (params: SearchManual) => {
    try {
      const response = await api.get<ResponseDataType<UseManualResponseDto[]>>(baseUri, params);
      console.log('response', response)
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch use-manual list: ${error}`);
    }
  };

  const getUseManualById = async (id: number) => {
    try {
      const { data } = await api.get<UseManualResponseDto>(`${baseUri}/${id}`);
      return data.data as UseManualResponseDto;
    } catch (error) {
      throw new Error(`Failed to fetch use-manual data: ${error}`);
    }
  };

  const updateUseManual = async (id: bigint, data: any) => {
    try {
      const response = await api.put<Response<UseManualResponseDto>>(`${baseUri}/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error: any) {
      console.log('error', error);
      throw new Error(`Failed to update use-manual data: ${error?.message}`);
    }
  };

  const deleteUseManual = async (id: number) => {
    try {
      const response = await api.delete(`${baseUri}/${id}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete use-manual: ${error}`);
    }
  };

  const getUsingManual = async (params: SearchUsingManual) => {
    try {
      const response = await api.get(`${baseUri}/user/search`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch use-manual: ${error}`);
    }
  };

  const fileDownload = async (manualId: string) => {
    try {
      // console.log('manualId', manualId);
      const response = await api.download(`${baseUri}/download`, { manualId }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to download file: ${error}`);
    }
  };

  const getCategoryList = async () => {
    try {
      const { data } = await api.get<Response<any[]>>(`${baseUri}/category`);
      return data;
    } catch(error) {
      throw new Error(`Failed to get List : ${error}`);
    }
  };

  return {
    createUseManual,
    getUseManualList,
    getUseManualById,
    updateUseManual,
    deleteUseManual,
    getUsingManual,
    fileDownload,
    getCategoryList
  };
};

export default UseManualApiService;