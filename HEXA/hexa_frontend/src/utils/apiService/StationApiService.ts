import api from './axios'
import createBaseUri from "@/utils/createBaseUri.ts";
import { Page } from "@/utils/apiService/type/common/Page.type.ts";
import { StationIdCodeDto, CityInfo, CityDistrictInfo } from "@/utils/apiService/type/station/StationIdCodeDto";
import { StationQrCodeDto } from "@/utils/apiService/type/station/StationQrCodeDto";
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";
import { StationFirmwareDeployDto } from "@/utils/apiService/type/station/StationFirmwareDeployDto";
import { StationDeviceDto } from "@/utils/apiService/type/station/StationDeviceDto";
import { StationInfoDto, StationTargetInfoDto } from "@/utils/apiService/type/station/StationInfoDto";
import { StationConfigDto, StationConfigJobDto, StationConfigStatusDto, StationConfigHistoryDto } from "@/utils/apiService/type/station/StationConfigDto"
import { StationChargeProfileDto, StationChargeHistoryDto } from "@/utils/apiService/type/station/StationChargeProfileDto";
import { ChargeProfileJobDto } from "@/utils/apiService/type/station/ChargeProfileJobDto";
import { ChargeProfileFactorDto } from "@/utils/apiService/type/station/ChargeProfileFactorDto";
import { ChargeProfileMatrixDto } from '@/utils/apiService/type/station/ChargeProfileMatrixDto';
import { ResponseDataType } from "@/utils/apiService/type/common/responseData.type.ts";
import { StationLogDto } from '@/utils/apiService/type/station/StationLogDto';
import {StationCtrlDto, StationCtrlHistoryDto} from "@/utils/apiService/type/station/StationControlDto.ts";
import { StationStatEventDto, StationStatDto, StationFailStatDto, StatDeviceSwapDto } from '@/utils/apiService/type/station/StationStatistics';


function StationApiService() {
  const baseUri = createBaseUri("v1/station");

  /* 교환기 생산정보 현황 */
  const getStationDeviceList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ResponseDataType<StationDeviceDto[]>>(`${baseUri}/device/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Device List data: ${error}`);
    }
  };

  const downloadExcelStationDevice = async (params: any) => {
    console.log('params', params)
    try {
      await api.download(`${baseUri}/device/excel/download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Download Excel: ${error.data.message}`);
    }
  };

  const getStationDevicePrimary = async (serialNumber: string) => {
    try {
      const { data } = await api.get<StationDeviceDto>(`${baseUri}/device/primary/${serialNumber}`);
      return data;
    }
    catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  };

  const getStationDeviceSearchPrimary = async (urlParams: any) => {
    try {
      const { data } = await api.get<StationDeviceDto>(`${baseUri}/device/search/primary`, urlParams);
      return data;
    }
    catch (error: any) {
      throw new Error(`${error?.data?.message}`);
    }
  };

  /* 교환기 정보 관리 */
  const getStationInfoList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<StationInfoDto[]>(`${baseUri}`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Info List data: ${error}`);
    }
  };

  const downloadExcelStationInfo = async (params: any) => {
    console.log('params', params)
    try {
      await api.download(`${baseUri}/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Download Excel: ${error.data.message}`);
    }
  };

  const excelUploadStationInfo = async (formData: FormData) => {
    const response = await api.post(`${baseUri}/bulk`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response;
  };

  const getStationInfo = async (stationId: any) => {
    try {
      const { data } = await api.get<StationInfoDto>(`${baseUri}/${stationId}`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Info data: ${error}`);
    }
  };

  const getNameDuplicationCheck = async (stationName: string) => {
    try {
      const { data } = await api.get<ResponseDataType<boolean>>(`${baseUri}/name-duplication-check/${stationName}`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to Check Duplication Name : ${error}`);
    }
  };

  const registerStationInfo = async (formData: any) => {
    try {
      const response = await api.post(`${baseUri}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('registerStationInfo response', response)
      return response.data;
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to register Station data: ${error?.message}`);
    }
  };

  const modifyStationInfo = async (data: FormData, id: string) => {
    try {
      const response = await api.put(`${baseUri}/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('registerStationInfo response', response)
      return response.data;
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Modify Station data: ${error?.message}`);
    }
  };

  const deleteStationInfo = async (id: string) => {
    try {
      const response = await api.delete(`${baseUri}/${id}`);
      return response.data;
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Delete Station data: ${error?.message}`);
    }
  };

  const getStationHistoryList = async (urlParams: any, stationId: string) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ResponseDataType<StationInfoDto[]>>(`${baseUri}/${stationId}/map-hist`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station History List data: ${error}`);
    }
  };

  const downloadExcelStationHistory = async (params: any, stationId: string) => {
    console.log('params', params)
    try {
      await api.download(`${baseUri}/${stationId}/map-hist/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Download Excel: ${error.data.message}`);
    }
  };
  
  const getStationConfigHistoryList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<StationConfigHistoryDto[]>(`${baseUri}/config/history/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Config History List data: ${error}`);
    }
  };

  const downloadExcelStationConfigHistory = async (params: any) => {
    console.log('params', params)
    try {
      await api.download(`${baseUri}/config/history/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Download Excel: ${error.data.message}`);
    }
  };

  const getStationTargetInfoList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ResponseDataType<StationTargetInfoDto[]>>(`${baseUri}/search/popup`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Target Info List data: ${error}`);
    }
  };

  /* 교환기 로그 다운로드 */
  const getStationLogList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    const { data } = await api.get<StationLogDto[]>(`${baseUri}/log/download/list`, urlParams);
    return data;
  };

  const requestLogData = async (params: any) => {
    const { data } = await api.post<any>(`${baseUri}/log/request`, params);
    return data;
  };

  const stationLogDownload = async (id: string) => {
    const { data } = await api.download(`${baseUri}/log/download/${id}`);
    return data;
  };

  /* 교환기 코드ID */
  const getStationCodeList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<Page<StationIdCodeDto>>(`${baseUri}/id-code/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Code List data: ${error}`);
    }
  };

  const registStationCodeList = async (data: any) => {
    try {
      const response = await api.post<any>(`${baseUri}/id-code`, data);
      console.log('Register Station Code response', response)
      return response;
    }
    catch (error) {
      throw new Error(`Failed to register Station Code List data: ${error}`);
    }
  };

  const getCityList = async () => {
    try {
      const { data } = await api.get<CityInfo[]>(`${baseUri}/id-code/list/city`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch City List data: ${error}`);
    }
  };

  const getDistrictListByCityCode = async (cityCode: string) => {
    try {
      const { data } = await api.get<CityDistrictInfo[]>(`${baseUri}/id-code/list/${cityCode}`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch district List data: ${error}`);
    }
  };

  const getDistrictList = async () => {
    try {
      const { data } = await api.get<ResponseDataType<any[]>>(`${baseUri}/id-code/list/district-name`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch district list data: ${error}`);
    }
  };

  const excelDownloadIdCode = async (params: any) => {
    try {
      await api.download(`${baseUri}/id-code/excel-download`, params);
    }
    catch (error) {
      throw new Error(`id-code 엑셀 다운로드 실패: ${error}`);
    }
  };

  const excelUploadIdCode = async (formData: FormData) => {
    const response = await api.post(`${baseUri}/id-code/bulk`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response;
  };

  const getStationQrCodeList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ResponseDataType<StationQrCodeDto[]>>(`${baseUri}/qr`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Code List data: ${error}`);
    }
  };

  const registerQrCodeList = async (params: any) => {
    try {
      const response = await api.post(`${baseUri}/qr`, params);
      return response;
    }
    catch (error) {
      throw new Error(`Failed to register QR Code: ${error}`);
    }
  };

  /* 교환기 펌웨어 관리 */
  const getStationFirmwareList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ResponseDataType<StationFirmwareDto[]>>(`${baseUri}/fw/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station firmware List data: ${error}`);
    }
  };

  const downloadExcelStationFirmware = async (params: any) => {
    console.log('params', params)
    try {
      await api.download(`${baseUri}/fw/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Excel Download: ${error.data.message}`);
    }
  };

  const getStationFirmware = async (id: string | number) => {
    try {
      const { data } = await api.get<StationFirmwareDto>(`${baseUri}/fw/${id}`);
      console.log('Station firmware data', data)
      return data.data as StationFirmwareDto;
    } 
    catch (error) {
      throw new Error(`Failed to fetch Station firmware data: ${error}`);
    }
  };

  const registerFirmware = async (formData: FormData) => {
    try {
      const response = await api.post(`${baseUri}/fw`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response;
    }
    catch (error) {
      throw error;
    }
  };

  const modifyFirmware = async (formData: FormData, tsid: string) => {
    try {
      const response = await api.put(`${baseUri}/fw/${tsid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response;
    }
    catch (error) {
      throw new Error(`Failed to modify Station firmware: ${error}`);
    }
  };

  const deleteFirmware = async (tsid: string) => {
    try {
      const response = await api.delete(`${baseUri}/fw/${tsid}`);
      return response;
    }
    catch (error) {
      throw new Error(`Failed to delete Station firmware: ${error}`);
    }
  };

  /* 교환기 펌웨어 배포 관리 */
  const getStationFirmwareDeployList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ResponseDataType<StationFirmwareDeployDto[]>>(`${baseUri}/firmware/deploy/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station firmware deploy List data: ${error}`);
    }
  };

  const downloadExcelStationFirmwareDeploy = async (params: any) => {
    console.log('params', params)
    try {
      await api.download(`${baseUri}/firmware/deploy/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Excel Download: ${error.data.message}`);
    }
  };

  const getStationFirmwareDeploy = async (id: string) => {
    try {
      const { data } = await api.get<StationFirmwareDeployDto>(`${baseUri}/firmware/deploy/${id}`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station firmware deploy data: ${error}`);
    }
  };

  const getStationFirmwareWaitList = async (urlParams: any, id: string) => {

    try {
      const { data } = await api.get<ResponseDataType<StationFirmwareDeployDto[]>>(`${baseUri}/firmware/deploy/${id}/wait-station`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station firmware deploy List data: ${error}`);
    }
  };

  const downloadExcelStationFirmwareWait = async (params: any, id: string) => {
    console.log('params', params)
    try {
      await api.download(`${baseUri}/firmware/deploy/${id}/wait-station/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Excel Download: ${error.data.message}`);
    }
  };

  const registerFirmwareDeploy = async (data: any) => {
    try {
      const response = await api.post(`${baseUri}/firmware/deploy`, data);
      console.log('registerFirmwareDeploy response', response)
      return response.data;
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to register Firmware Deploy data: ${error?.message}`);
    }
  };

  const modifyFirmwareDeploy = async (data: any, id:string) => {
    try {
      const response = await api.put(`${baseUri}/firmware/deploy/${id}`, data);
      console.log('modifyFirmwareDeploy response', response)
      return response.data;
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to modify Firmware Deploy data: ${error?.message}`);
    }
  };

  const retryFirmwareDeploy = async (data: any, id:string) => {
    try {
      const response = await api.post(`${baseUri}/firmware/deploy/${id}/retry`, data);
      console.log('retryFirmwareDeploy response', response)
      return response.data;
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to retry Firmware Deploy data: ${error?.message}`);
    }
  };

  const cancelFirmwareDeploy = async (id: string) => {
    try {
      const response = await api.post(`${baseUri}/firmware/deploy/${id}/cancel`);
      console.log('cancelFirmwareDeploy response', response)
      return response.data;
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Cancel Firmware Deploy data: ${error?.message}`);
    }
  };

  /* 교환기 설정 관리 */
  const getStationConfigMangementList = async (urlParams: any) => {
    try {
      const { data } = await api.get<ResponseDataType<StationConfigJobDto[]>>(`${baseUri}/config/job/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Config Job List data: ${error}`);
    }
  };

  const downloadExcelStationConfigJob = async (params: any) => {
    try {
      await api.download(`${baseUri}/config/job/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Excel Download: ${error.data.message}`);
    }
  };

  const getStationConfigJob = async (id: string) => {
    try {
      const { data } = await api.get<ResponseDataType<StationConfigJobDto>>(`${baseUri}/config/job/${id}`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Config Job data: ${error}`);
    }
  };

  const registerStationConfigManage = async (data: any) => {
    try {
      const response = await api.post(`${baseUri}/config/job`, data);
      console.log('registerStationConfigManage response', response)
      return response.data;
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to register Station Config Job data: ${error?.message}`);
    }
  };

  /* 교환기 초기설정 조회 */
  const getStationConfigInit = async () => {
    try {
      const { data } = await api.get<ResponseDataType<StationConfigDto>>(`${baseUri}/config/init`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Config Init data: ${error}`);
    }
  };

  const registerStationConfigInit = async (data: Record<string, unknown>) => {
    try {
      const response = await api.post(`${baseUri}/config/init`, data);
      console.log('registerStationConfigInit response', response)
      return response.data;
    }
    catch (error) {
      throw new Error(`Failed to register Station Config Init data: ${error}`);
    }
  };

  /* 교환기 설정 현황 */
  const getStationConfigStatusList = async (urlParams: any) => {
    try {
      const { data } = await api.get<ResponseDataType<StationConfigStatusDto[]>>(`${baseUri}/config/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Config Status List data: ${error}`);
    }
  };

  const downloadExcelStationConfigStatus = async (params: any) => {
    try {
      await api.download(`${baseUri}/config/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Excel Download: ${error.data.message}`);
    }
  };

  /* 충전 프로파일 관리 */
  const getStationChargeProfileList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<StationChargeProfileDto[]>(`${baseUri}/charge-profile/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Charge Profile List data: ${error}`);
    }
  };

  const downloadExcelStationChargeProfile= async (params: any) => {
    try {
      await api.download(`${baseUri}/charge-profile/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Download Excel: ${error.data.message}`);
    }
  };
  
  const excelUploadChargeProfile = async (formData: FormData) => {
    const response = await api.post(`${baseUri}/charge-profile/bulk`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response;
  };

  const getStationChargeProfileExistDefault = async () => {
    try {
      const { data } = await api.get<boolean>(`${baseUri}/charge-profile/exist-default`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Charge Profile Exist Default: ${error}`);
    }
  };

  const registerStationChargeProfile = async (data: any) => {
    try {
      const response = await api.post(`${baseUri}/charge-profile`, data);
      console.log('registerStationConfigInit response', response)
      return response.data;
    }
    catch (error) {
      throw new Error(`Failed to register Station Charge Profile data: ${error}`);
    }
  };

  const getStationChargeProfile = async (id: string) => {
    try {
      const { data } = await api.get<ResponseDataType<StationChargeProfileDto>>(`${baseUri}/charge-profile/${id}`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Charge Profile data: ${error}`);
    }
  };

  const modifyStationChargeProfile = async (data: any, id: string) => {
    try {
      const response = await api.put(`${baseUri}/charge-profile/${id}`, data);
      return response.data;
    }
    catch (error) {
      throw new Error(`Failed to Modify Station Charge Profile data: ${error}`);
    }
  };

  const deleteStationChargeProfile = async (id: string) => {
    try {
      const { data } = await api.delete<any>(`${baseUri}/charge-profile/${id}`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to Delete Station Charge Profile data: ${error}`);
    }
  };

  /* 충전 프로파일 Factor 관리 */
  const getChargeProfileFactorList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ChargeProfileFactorDto[]>(`${baseUri}/charge-profile/factor/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Charge Profile Factor List data: ${error}`);
    }
  };

  const downloadExcelChargeProfileFactor = async (params: any) => {
    try {
      await api.download(`${baseUri}/charge-profile/factor/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Download Excel: ${error.data.message}`);
    }
  };

  const registerChargeProfileFactor = async (data: any) => {
    try {
      const response = await api.post(`${baseUri}/charge-profile/factor`, data);
      console.log('registerStationConfigInit response', response)
      return response.data;
    }
    catch (error) {
      throw new Error(`Failed to register Charge Profile data: ${error}`);
    }
  };

  const getChargeProfileFactor = async (id: string) => {
    try {
      const { data } = await api.get<ChargeProfileFactorDto>(`${baseUri}/charge-profile/factor/${id}`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Charge Profile Factor data: ${error}`);
    }
  };

  const modifyChargeProfileFactor = async (data: any, id: string) => {
    try {
      const response = await api.put(`${baseUri}/charge-profile/factor/${id}`, data);
      return response.data;
    }
    catch (error) {
      throw new Error(`Failed to Modify Charge Profile Factor data: ${error}`);
    }
  };

  const deleteChargeProfileFactor = async (id: string) => {
    try {
      const { data } = await api.delete<any>(`${baseUri}/charge-profile/factor/${id}`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to Delete Charge Profile Factor data: ${error}`);
    }
  };

  /* 충전 프로파일 조건설정 */
  const getChargeProfileMatrixList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ChargeProfileMatrixDto[]>(`${baseUri}/charge-profile/matrix/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Charge Profile Matrix List data: ${error}`);
    }
  };

  const downloadExcelChargeProfileMatrix = async (params: any) => {
    try {
      await api.download(`${baseUri}/charge-profile/matrix/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Download Excel: ${error.data.message}`);
    }
  };

  const getChargeProfileMatrixPopupList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ChargeProfileMatrixDto[]>(`${baseUri}/charge-profile/matrix/search/popup`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Charge Profile matrix popup List data: ${error}`);
    }
  };

  const updateChargeProfileMatrix = async () => {
    try {
      const response = await api.post(`${baseUri}/charge-profile/matrix`);
      return response.data;
    }
    catch (error) {
      throw new Error(`Failed to Update Charge Profile Matrix: ${error}`);
    }
  };


  /* 교환기 충전 프로파일 배포 관리 */
  const getStationChargeProfileJobList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ChargeProfileJobDto[]>(`${baseUri}/charge-profile/job/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Charge Profile Job List data: ${error}`);
    }
  };

  const downloadExcelStationChargeProfileJob = async (params: any) => {
    try {
      await api.download(`${baseUri}/charge-profile/job/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Download Excel: ${error.data.message}`);
    }
  };

  const getStationChargeProfileJob = async (id: string) => {
    try {
      const { data } = await api.get<ChargeProfileJobDto>(`${baseUri}/charge-profile/job/${id}`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Charge Profile Job List data: ${error}`);
    }
  };
  
  const registerChargeProfileJob = async (data: any) => {
    try {
      const response = await api.post(`${baseUri}/charge-profile/job`, data);
      return response.data;
    }
    catch (error) {
      throw new Error(`Failed to register Charge Profile Job data: ${error}`);
    }
  };

  const registerChargeProfileJobRetry = async (id: string) => {
    try {
      const response = await api.post(`${baseUri}/charge-profile/job/${id}/retry`);
      return response.data;
    }
    catch (error) {
      throw new Error(`Failed to register Charge Profile Job Retry: ${error}`);
    }
  };

  //대시보드 제어 이력
  const getStationControlHistoryList = async (urlParams: any, options: any) => {
    try {
      const { data } = await api.get<StationCtrlHistoryDto[]>(`${baseUri}/control/search`, urlParams, options);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Control History List data: ${error}`);
    }
  };

  const downloadExcelStationControlHistory = async (params: any) => {
    console.log('params', params)
    try {
      await api.download(`${baseUri}/control/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to download Excel: ${error.data.message}`);
    }
  };

  const downloadExcelStationControlHistoryPopup = async (params: any) => {
    console.log('params', params)
    try {
      await api.download(`${baseUri}/control/excel-download/popup`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to download Excel: ${error.data.message}`);
    }
  };

  const controlStation = async (data: StationCtrlDto, gen: string) => {
    try {
      const response = await api.post(`${baseUri}/control/${gen}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to register Charge Profile Job Retry: ${error}`);
    }
  }

  const controlG2Station = async (data: StationCtrlDto) => {
    try {
      const response = await api.post(`${baseUri}/control/G2`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to register Charge Profile Job Retry: ${error}`);
    }
  }
  const controlG1Station = async (data: StationCtrlDto) => {
    try {
      const response = await api.post(`${baseUri}/control/G1`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to register Charge Profile Job Retry: ${error}`);
    }
  }

  //스테이션 충전 이력
  const getStationChargeHistoryList = async (urlParams: any) => {
    try {
      const { data } = await api.get<StationChargeHistoryDto[]>(`${baseUri}/stat/charge-record/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Charge History List data: ${error}`);
    }
  };

  const downloadExcelStationChargeHistory = async (params: any) => {
    try {
      await api.download(`${baseUri}/stat/charge-record/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to Download Excel: ${error.data.message}`);
    }
  };

  //수집 Data 이력
  const getStationSimpleList = async () => {
    try {
      const { data } = await api.get<{id:string, name: string}[]>(`${baseUri}/simple`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Simple List data: ${error}`);
    }
  };
  
  const getStationStatEventList = async (urlParams: any) => {
    try {
      const { data } = await api.get<StationStatEventDto[]>(`${baseUri}/stat/event/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Stat Event List data: ${error}`);
    }
  };

  const downloadExcelStationStatEvent = async (params: any) => {
    try {
      await api.download(`${baseUri}/stat/event/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to download Excel: ${error.data.message}`);
    }
  };

  //스테이션별 누적 교환횟수
  const getStationStatAccSwapCount = async (urlParams: any) => {
    try {
      const { data } = await api.get<StationStatDto[]>(`${baseUri}/stat/accumulated-swap-count/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Accumulated Swap Count data: ${error}`);
    }
  };

  const downloadExcelStationStatAccSwapCount = async (params: any) => {
    try {
      await api.download(`${baseUri}/stat/accumulated-swap-count/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to download Excel: ${error.data.message}`);
    }
  };

  //함체, 슬롯별 교환횟수
  const getStationStatDeviceSwapCount = async (urlParams: any, deviceType: string) => {
    try {
      const { data } = await api.get<StatDeviceSwapDto[]>(`${baseUri}/stat/device-swap/${deviceType}/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Device Swap Count data: ${error}`);
    }
  };

  const downloadExcelStationStatDeviceSwapCount = async (params: any, deviceType: string) => {
    try {
      await api.download(`${baseUri}/stat/device-swap/${deviceType}/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to download Excel: ${error.data.message}`);
    }
  };

  //스테이션별 누적 교환실패횟수
  const getStationStatAccSwapFailCount = async (urlParams: any) => {
    try {
      const { data } = await api.get<StationFailStatDto[]>(`${baseUri}/stat/accumulated-fail-count/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Accumulated Swap Fail Count data: ${error}`);
    }
  };

  const downloadExcelStationStatAccSwapFailCount = async (params: any) => {
    try {
      await api.download(`${baseUri}/stat/accumulated-fail-count/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to download Excel: ${error.data.message}`);
    }
  };

  //전력사용량 통계
  const getStationUsageWhStat = async (urlParams: any) => {
    try {
      const { data } = await api.get<StationStatDto[]>(`${baseUri}/stat/usage-wh/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Accumulated Swap Count data: ${error}`);
    }
  };

  const downloadExcelStationUsageWhStat = async (params: any) => {
    try {
      await api.download(`${baseUri}/stat/usage-wh/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to download Excel: ${error.data.message}`);
    }
  };

  //스테이션별 예약건수
  const getStationReservationStat = async (urlParams: any) => {
    try {
      const { data } = await api.get<StationStatDto[]>(`${baseUri}/stat/reservation-stat/search`, urlParams);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to fetch Station Accumulated Swap Count data: ${error}`);
    }
  };

  const downloadExcelStationReservationStat = async (params: any) => {
    try {
      await api.download(`${baseUri}/stat/reservation-stat/excel-download`, params);
    }
    catch (error: any) {
      console.log('error', error)
      throw new Error(`Failed to download Excel: ${error.data.message}`);
    }
  };

  return {
    //교환기 생산정보 현황
    getStationDeviceList,
    downloadExcelStationDevice,
    getStationDevicePrimary,
    getStationDeviceSearchPrimary,

    //교환기 정보 관리
    getStationInfoList,
    downloadExcelStationInfo,
    excelUploadStationInfo,
    getStationInfo,
    getNameDuplicationCheck,
    registerStationInfo,
    modifyStationInfo,
    deleteStationInfo,
    getStationHistoryList,
    downloadExcelStationHistory,
    getStationConfigHistoryList,
    downloadExcelStationConfigHistory,
    getStationTargetInfoList,

    //교환기 로그 다운로드
    getStationLogList,
    stationLogDownload,
    requestLogData,

    //교환기 ID 코드 관리
    getStationCodeList,
    registStationCodeList,
    getCityList,
    getDistrictListByCityCode,
    getDistrictList,
    excelDownloadIdCode,
    excelUploadIdCode,

    //교환기 QR 코드 관리
    getStationQrCodeList,
    registerQrCodeList,

    //교환기 펌웨어 관리
    getStationFirmwareList,
    downloadExcelStationFirmware,
    registerFirmware,
    modifyFirmware,
    deleteFirmware,
    getStationFirmware,

    //교환기 펌웨어 배포관리
    getStationFirmwareDeployList,
    downloadExcelStationFirmwareDeploy,
    getStationFirmwareDeploy,
    getStationFirmwareWaitList,
    downloadExcelStationFirmwareWait,
    registerFirmwareDeploy,
    modifyFirmwareDeploy,
    retryFirmwareDeploy,
    cancelFirmwareDeploy,

    //교환기 설정 관리
    getStationConfigMangementList,
    downloadExcelStationConfigJob,
    getStationConfigJob,
    registerStationConfigManage,

    //교환기 초기 설정
    getStationConfigInit,
    registerStationConfigInit,

    //교환기 설정 현황
    getStationConfigStatusList,
    downloadExcelStationConfigStatus,

    //충전 프로파일 관리
    getStationChargeProfileList,
    downloadExcelStationChargeProfile,
    excelUploadChargeProfile,
    getStationChargeProfileExistDefault,
    registerStationChargeProfile,
    getStationChargeProfile,
    modifyStationChargeProfile,
    deleteStationChargeProfile,

    //충전 프로파일 Factor 관리
    getChargeProfileFactorList,
    downloadExcelChargeProfileFactor,
    registerChargeProfileFactor,
    getChargeProfileFactor,
    modifyChargeProfileFactor,
    deleteChargeProfileFactor,

    //충전 프로파일 조건 설정
    getChargeProfileMatrixList,
    downloadExcelChargeProfileMatrix,
    getChargeProfileMatrixPopupList,
    updateChargeProfileMatrix,

    //충전 프로파일 배포 관리
    getStationChargeProfileJobList,
    downloadExcelStationChargeProfileJob,
    getStationChargeProfileJob,
    registerChargeProfileJob,
    registerChargeProfileJobRetry,
    
    //교환기(iot) 컨트롤
    //대시보드 제어이력
    getStationControlHistoryList,
    downloadExcelStationControlHistory,
    downloadExcelStationControlHistoryPopup,
    controlG2Station,
    controlG1Station,
    controlStation,

    //스테이션 충전 이력
    getStationChargeHistoryList,
    downloadExcelStationChargeHistory,

    //스테이션 수집 Data
    getStationSimpleList,
    getStationStatEventList,
    downloadExcelStationStatEvent,

    //스테이션별 누적 교환횟수
    getStationStatAccSwapCount,
    downloadExcelStationStatAccSwapCount,
    //슬롯, 함체 교환 횟수
    getStationStatDeviceSwapCount,
    downloadExcelStationStatDeviceSwapCount,
    //스테이션별 누적 교환실패횟수
    getStationStatAccSwapFailCount,
    downloadExcelStationStatAccSwapFailCount,
    //전력사용량 통계
    getStationUsageWhStat,
    downloadExcelStationUsageWhStat,
    //스테이션별 예약건수
    getStationReservationStat,
    downloadExcelStationReservationStat,
  };
}

export default StationApiService;
