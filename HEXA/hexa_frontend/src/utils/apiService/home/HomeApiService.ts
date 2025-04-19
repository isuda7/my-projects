import createBaseUri from "@/utils/createBaseUri.ts";
import api from "@/utils/apiService/axios.ts";

/* Types */
import { BatteryStatic, IrregularCount, DisconnectCount } from "@/utils/apiService/type/home/Home.ts";
import { Response } from "../interface/CommonServiceInserface";
import { UserResponseDto } from "../type/user/UserResponseDto";

const HomeApiService = () => {
  const baseUri = createBaseUri("v1/home");
  
  const getHomeRankingData = async () => {
    try {
      const { data } = await api.get<BatteryStatic[]>(baseUri + `/station/home/stat`);
      return data;
    } catch (error: any) {
      console.log('getHomeRankingData error', error)
    }
  }

  const getHomeIrregularCount = async (params: any) => {
    try {
      const { data } = await api.get<IrregularCount[]>(baseUri + `/irregular/count`, params);
      return data;
    } catch (error: any) {
      console.log('getHomeIrregularCount error', error)
    }
  }

  const getBatteryStatistics = async (params: any) => {
    try {
      const { data } = await api.get<BatteryStatic[]>(baseUri + `/battery/swap/count`, params);
      return data;
    } catch (error: any) {
      console.log('getBatteryStatistics error', error)
    }
  }

  const getHomeDisconnectCount = async (params: any) => {
    try {
      const { data } = await api.get<DisconnectCount[]>(baseUri + `/disconnect/count`, params);
      return data;
    } catch (error: any) {
      console.log('getHomeDisconnectCount error', error)
    }
  }

  const checkPhoneIsNull = async () => {
    try {
      const { data } = await api.get<Response<boolean>>(baseUri + `/user/phone/nullCheck`);
      return data.data;
    } catch (error) {
      console.log('checkPhoneisNull error', error)
    }
  }

  const registerPhone = async (phone: string) => {
    console.log(phone);
    try {
      const { data } = await api.put<Response<UserResponseDto>>(baseUri + `/user/phone`, phone);
      return data.data;
    } catch (error) {
      console.log('Fail to register phone number error', error)
    }
  }

  return {
    getHomeRankingData,
    getHomeIrregularCount,
    getBatteryStatistics,
    getHomeDisconnectCount,
    checkPhoneIsNull,
    registerPhone
  };
};

export default HomeApiService;