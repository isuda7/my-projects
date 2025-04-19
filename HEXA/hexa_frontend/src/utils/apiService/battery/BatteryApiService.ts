import {Response} from '../interface/CommonServiceInserface.ts';
import {ResponseDataType} from "@/utils/apiService/type/common/responseData.type.ts";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {
  BatteryCreateDto,
  BatteryRequestDto, BatteryUpdateDto,
  BatteryUsageStatusChangeDto
} from "@/utils/apiService/type/battery/BatteryRequestDto.ts";
import createBaseUri from "@/utils/createBaseUri.ts";
import api from "@/utils/apiService/axios.ts";

const BatteryApiService = () => {
  const baseUri = createBaseUri("v1/battery");

  const createBattery = async (data: BatteryCreateDto) => {
    try {
      const response = await api.post<Response<BatteryResponseDto>>(baseUri, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create battery: ${error}`);
    }
  }


  const getBatteryList = async (params: BatteryRequestDto) => {
    try {
      const response = await api.get<ResponseDataType<BatteryResponseDto[]>>(baseUri + '/search', params);
      console.log('response', response)
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const getBatteryById = async (batteryId: string) => {
    try {
      const {data} = await api.get<BatteryResponseDto>(`${baseUri}/${batteryId}`);
      return data.data as BatteryResponseDto;
    } catch (error) {
      throw new Error(`Failed to fetch battery data: ${error}`);
    }
  };

  const updateBattery = async (batteryId: string, data: BatteryUpdateDto) => {
    try {
      const response = await api.put<Response<BatteryResponseDto>>(`${baseUri}/${batteryId}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update battery data: ${error}`);
    }
  };

  const deleteBattery = async (batteryId: string) => {
    try {
      const response = await api.delete(`${baseUri}/${batteryId}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete battery: ${error}`);
    }
  };

  const downloadList = async (downloadReason: string, urlParams: BatteryRequestDto) => {
    const requestBody = {
      ...urlParams,
      downloadReason,
    };
    console.log('requestBody', requestBody)
    try {
      await api.download(`${baseUri}/excel`, requestBody);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  const createBulkBattery = async (data: FormData) => {
    try {
      const response = await api.post<Response<BatteryResponseDto>>(`${baseUri}/bulk`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create battery: ${error}`);
    }
  }

  return {
    createBattery,
    getBatteryList,
    getBatteryById,
    updateBattery,
    deleteBattery,
    downloadList,
    createBulkBattery
  };
};

export default BatteryApiService;