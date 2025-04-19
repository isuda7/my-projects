import createBaseUri from "../createBaseUri"
import api from "@/utils/apiService/axios.ts";
import { ResponseDataType } from "@/utils/apiService/type/common/responseData.type.ts";
import { Response } from "@/utils/apiService/interface/CommonServiceInserface.ts";
import { NotificationDto, NotificationResponse, NotificationSaveDto } from "./type/notification/NotificationDto";

const NotificationApiService = () => {
  const baseUri = createBaseUri("v1/system/notification");

  const getNotifications = async (params: NotificationDto) => {
    try {
      const response = await api.get<ResponseDataType<NotificationResponse[]>>(`${baseUri}`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch notification list: ${error}`);
    }
  };

  const getNotificationById = async (tsid: number) => {
    try {
      const { data } = await api.get<NotificationResponse>(`${baseUri}/${tsid}`);
      return data.data as NotificationResponse;
    } catch (error) {
      throw new Error(`Failed to fetch notification data: ${error}`);
    }
  };

  const checkDuplication = async (params: NotificationSaveDto) => {
    try {
      const { data } = await api.post<Response<boolean>>(`${baseUri}/duplication-check`, params);
      return data.data;
    } catch (error) {
      throw new Error(`Failed to check duplication: ${error}`);
    }
  };

  const createNotification = async (data: NotificationSaveDto) => {
    try {
      // console.log("createNotification RoleSaveDto", data);
      const response = await api.post<Response<NotificationResponse>>(baseUri, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create notification: ${error}`);
    }
  };

  const updateNotification = async (tsid: number, data: NotificationSaveDto) => {
    try {
      // console.log("updateNotification RoleSaveDto tsid, data", tsid, data);
      const response = await api.put<Response<NotificationResponse>>(`${baseUri}/${tsid}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update notification: ${error}`);
    }
  };

  const downloadList = async (urlParams: NotificationDto) => {
    console.log('urlParams', urlParams);
    try {
      await api.download(`${baseUri}/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  return {
    getNotifications,
    getNotificationById,
    checkDuplication,
    createNotification,
    updateNotification,
    downloadList
  }
}

export default NotificationApiService;