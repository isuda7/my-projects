import {ResponseDataType} from "@/utils/apiService/type/common/responseData.type.ts";
import createBaseUri from "@/utils/createBaseUri.ts";
import api from "@/utils/apiService/axios.ts";
import {
  BatteryChangeStateHistRequestDto,
  BatteryChargeHistRequestDto,
  BatteryRsrvHistRequestDto,
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
import {
  BatteryAvgStatRequestDto, BatteryChargeStatRequestDto, BatteryMonthlyStatRequestDto, BatterySohStatRequestDto,
  BatteryStatRequestDto
} from "@/utils/apiService/type/battery/BatteryStatRequestDto.ts";
import {
  BatteryStatAvgResponseDto,
  BatteryStatResponseDto
} from "@/utils/apiService/type/battery/BatteryStatResponseDto.ts";

const BatteryHistApiService = () => {
  const baseUri = createBaseUri("v1/battery/stat");

  const getBatteryStatList = async (params: BatteryStatRequestDto) => {
    try {
      const {data} = await api.get<BatteryStatResponseDto[]>(baseUri, params);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const getBatteryAverageStat = async (params: BatteryAvgStatRequestDto) => {
    try {
      const {data} = await api.get<BatteryStatAvgResponseDto>(baseUri + "/average", params);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const getBatteryMonthlyStat = async (params: BatteryMonthlyStatRequestDto) => {
    try {
      const {data} = await api.get(baseUri + "/monthly", params);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const getBatterySohStat = async (params: BatterySohStatRequestDto) => {
    try {
      const {data} = await api.get(baseUri + "/soh", params);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };

  const downloadBatteryUsageHist = async (urlParams: BatteryUsageHistRequestDto) => {
    try {
      await api.download(`${baseUri}/usage/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  const getBatteryChargeStat = async (params: BatteryChargeStatRequestDto) => {
    try {
      const {data} = await api.get(baseUri + "/charge", params);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch battery list: ${error}`);
    }
  };


  return {
    getBatteryStatList,
    getBatteryAverageStat,
    getBatteryMonthlyStat,
    getBatterySohStat,
    getBatteryChargeStat

  };
};

export default BatteryHistApiService;