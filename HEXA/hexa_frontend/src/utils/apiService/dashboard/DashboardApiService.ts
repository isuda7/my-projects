import createBaseUri from "@/utils/createBaseUri.ts";
import api from "@/utils/apiService/axios.ts";
import {Response} from "@/utils/apiService/interface/CommonServiceInserface.ts";
import {NoticeResponseDto} from "../type/board/NoticeResponseDto";
import {ResponseDataType} from "@/utils/apiService/type/common/responseData.type.ts";
import {DashboardStaionRequestDto, Station} from "@/utils/apiService/type/dashboard/DashboardStation.ts";

const DashboardApiService = () => {
  const baseUri = createBaseUri("v1/dashboard");

  const getStation = async (stationId: any) => {
    try {
      const response = await api.get<any>(baseUri + `/station/${stationId}`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      //throw new Error(`${error?.data?.message}`);
      throw error;
    }
  }

  const getGenStation = async (stationId: string) => {
    try {
      const response = await api.get<any>(baseUri + `/station/gen/${stationId}`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const getStationList = async (params: DashboardStaionRequestDto) => {
    try {
      const response = await api.get<any>(baseUri + `/station`, params, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const getBatteryStat = async () => {
    try {
      const response = await api.get<any>(baseUri + `/stat/battery`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }
  const getIrregularStat = async () => {
    try {
      const response = await api.get<any>(baseUri + `/stat/irregular`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }
  const getRsrvBatteryList = async (params: any) => {
    try {
      const response = await api.get<any>(baseUri + `/battery/rsrv`, params);
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const getLockBatteryList = async (params: any) => {
    try {
      const response = await api.get<any>(baseUri + `/battery/lock`, params);
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const getStationSwapCnt = async (params: any | undefined) => {
    try {
      const response = await api.get<any>(baseUri + `/stat/station/swap-cnt`, params, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const getStationStatusCnt = async () => {
    try {
      const response = await api.get<any>(baseUri + `/station/status-cnt`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }
  const recommendStationBattery = async (stationId: string) => {
    try {
      const response = await api.get<any>(baseUri + `/${stationId}/battery/recommendation`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const getBtryStatCntAndSwapCnt = async () => {
    try {
      const response = await api.get<any>(baseUri + `/btrystat-swap-cnt`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const get1stStationStatusCnt = async () => {
    try {
      const response = await api.get<any>(baseUri + `/station/1st/status-cnt`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const get1StStationByIdBatteryCnt = async (stationId: string) => {
    try {
      const response = await api.get<any>(baseUri + `/station/${stationId}/1st/battery-cnt`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const get1StStationByIdBatteryList = async (stationId: string) => {
    try {
      const response = await api.get<any>(baseUri + `/station/${stationId}/1st/battery`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }
  const getVehicleCount = async () => {
    try {
      const response = await api.get<any>(baseUri + `/vehicle/count`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const get1stAsCount = async () => {
    try {
      const response = await api.get<any>(baseUri + `/as-hist/count`, null, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const searchStationList = async (params: DashboardStaionRequestDto) => {
    try {
      const response = await api.get<any>(baseUri + `/station/search`, params, { showLoading: false });
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const get1stRsrvBatteryList = async (params: any) => {
    try {
      const response = await api.get<any>(baseUri + `/battery/1st/rsrv`, params);
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }

  const get1stLockBatteryList = async (params: any) => {
    try {
      const response = await api.get<any>(baseUri + `/battery/1st/lock`, params);
      return response.data;
    } catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  }


  return {
    getStation,
    getStationList,
    getBatteryStat,
    getIrregularStat,
    getRsrvBatteryList,
    getLockBatteryList,
    getStationSwapCnt,
    getStationStatusCnt,
    recommendStationBattery,
    getGenStation,
    getBtryStatCntAndSwapCnt,
    get1stStationStatusCnt,
    get1StStationByIdBatteryCnt,
    get1StStationByIdBatteryList,
    getVehicleCount,
    get1stAsCount,
    searchStationList,
    get1stRsrvBatteryList,
    get1stLockBatteryList
  };
};

export default DashboardApiService;