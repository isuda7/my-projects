import {ResponseDataType} from "@/utils/apiService/type/common/responseData.type.ts";
import createBaseUri from "@/utils/createBaseUri.ts";
import api from "@/utils/apiService/axios.ts";
import {
  BatteryChangeStateHistRequestDto,
  BatteryChargeHistRequestDto,
  BatteryRsrvHistRequestDto, BatterySwapHistExcelDto,
  BatterySwapHistRequestDto,
  BatteryUsageHistRequestDto
} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import {
  BatteryChangeStateHistResponseDto,
  BatteryChrgHistResponseDto,
  BatteryRsrvHistResponseDto,
  BatterySwapResponseDto,
  BatteryUsageHistResponseDto
} from "@/utils/apiService/type/battery/BatteryHistResponseDto.ts";
import {BsmsBatterySwapHistRequestDto} from "@/utils/apiService/type/battery/BsmsBatteryHistRequestDto.ts";

const BatteryHistApiService = () => {
  const baseUri = createBaseUri("v1/battery/history");

  const getBatteryUsageHistList = async (params: BatteryUsageHistRequestDto) => {
    try {
      const {data} = await api.get<BatteryUsageHistResponseDto[]>(baseUri + "/usage", params);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const downloadBatteryUsageHist = async (downloadReason: string, urlParams: BatteryUsageHistRequestDto) => {
    const requestBody = {
      ...urlParams,
      downloadReason,
    };
    try {
      await api.download(`${baseUri}/usage/excel`, requestBody);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  const getBatterySwapLocHistList = async (params: BatterySwapHistRequestDto) => {
    try {
      const {data} = await api.get<BatterySwapResponseDto[]>(baseUri + "/swap-location", params);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const get1genBatterySwapLocHistList = async (params: BsmsBatterySwapHistRequestDto) => {
    try {
      const {data} = await api.get<BsmsBatterySwapHistRequestDto[]>(baseUri + "/gen1/swap-location", params);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const downloadBatterySwapLocHist = async (params: BatterySwapHistExcelDto) => {

    try {
      await api.download(`${baseUri}/swap-location/excel`, params);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  const getBatteryRsrvHistList = async (params: BatteryRsrvHistRequestDto) => {
    try {
      const {data} = await api.get<BatteryRsrvHistResponseDto[]>(baseUri + "/reservation", params);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const downloadBatteryRsrvHist = async (downloadReason: string, urlParams: BatteryRsrvHistRequestDto) => {
    const requestBody = {
      ...urlParams,
      downloadReason,
    };
    try {
      await api.download(`${baseUri}/reservation/excel`, requestBody);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  const getBatteryChargeHistList = async (params: BatteryChargeHistRequestDto) => {
    try {
      const {data} = await api.get<BatteryChrgHistResponseDto[]>(baseUri + "/charge", params);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const downloadBatteryChargeHist = async (urlParams: BatteryChargeHistRequestDto) => {
    try {
      await api.download(`${baseUri}/charge/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  const getBatteryChangeStateHistList = async (params: BatteryChangeStateHistRequestDto) => {
    try {
      const response = await api.get<BatteryChangeStateHistResponseDto[]>(baseUri + "/change-state", params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const downloadBatteryChangeStateHist = async (urlParams: BatteryChangeStateHistRequestDto) => {
    try {
      await api.download(`${baseUri}/change-state/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };


  const getBatteryUsageHistByBatteryIdList = async (batteryId: string, params: BatteryUsageHistRequestDto) => {
    try {
      const response = await api.get<BatteryUsageHistResponseDto[]>(baseUri + "/usage/batteryId/" + batteryId, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const getBatterySwapLocHistByBatteryIdList = async (batteryId: string, params: BatterySwapHistRequestDto) => {
    try {
      const response = await api.get<BatterySwapResponseDto[]>(baseUri + "/swap-location/batteryId/" + batteryId, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const getBatteryRsrvHistByBatteryIdList = async (batteryId: string, params: BatteryRsrvHistRequestDto) => {
    try {
      const response = await api.get<BatteryRsrvHistResponseDto[]>(baseUri + "/reservation/batteryId/" + batteryId, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const getBatteryChargeHistByBatteryIdList = async (batteryId: string, params: BatteryChargeHistRequestDto) => {
    try {
      const response = await api.get<BatteryChrgHistResponseDto[]>(baseUri + "/charge/batteryId/" + batteryId, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };


  return {
    getBatteryUsageHistList,
    downloadBatteryUsageHist,
    getBatterySwapLocHistList,
    get1genBatterySwapLocHistList,
    getBatteryRsrvHistList,
    getBatteryChargeHistList,
    downloadBatteryChargeHist,
    getBatteryUsageHistByBatteryIdList,
    getBatterySwapLocHistByBatteryIdList,
    getBatteryRsrvHistByBatteryIdList,
    getBatteryChargeHistByBatteryIdList,
    downloadBatteryRsrvHist,
    getBatteryChangeStateHistList,
    downloadBatteryChangeStateHist,
    downloadBatterySwapLocHist
  };
};

export default BatteryHistApiService;