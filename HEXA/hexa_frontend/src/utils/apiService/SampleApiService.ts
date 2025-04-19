import createBaseUri from "@/utils/createBaseUri.ts";
import {NoticeReponse} from "@/utils/apiService/type/auth/Notice.type.ts";
import {ResponseDataType} from "@/utils/apiService/type/common/responseData.type.ts";
import api from './axios'
import { faker } from "@faker-js/faker";


function SampleApiService() {
  const baseUri = createBaseUri("v1/board/notice");

  const getFakeData = async () => {
    try {
      const data = [];
      let currentHousingSerialNumber;

      for (let i = 1; i <= 100; i++) {
        // name과 slotNumber를 기준으로 값 설정
        let nameType;
        let groupSize;
        let startIndex;

        // i의 범위에 따라 nameType과 groupSize 설정
        if (i <= 30) {
          nameType = "KOOROO-10";
          groupSize = 10;
          startIndex = 1; // KOOROO-10의 시작 인덱스
        } else if (i <= 70) {
          nameType = "KOOROO-20";
          groupSize = 10;
          startIndex = 31; // KOOROO-20의 시작 인덱스
        } else {
          nameType = "KOOROO-30";
          groupSize = 10;
          startIndex = 71; // KOOROO-30의 시작 인덱스
        }

        // i를 기준으로 slotNumber 계산 (해당 그룹의 시작 인덱스에서 빼고 % groupSize)
        const slotNumber = ((i - startIndex) % groupSize) + 1;

        // 그룹 사이즈에 맞춰 새로운 housingSerialNumber 생성
        if (slotNumber === 1) {
          currentHousingSerialNumber = faker.number.int({ min: 100000000000, max: 999999999999 }).toString();
        }
    
        data.push({
          expanded: nameType === 'KOOROO-10'? undefined : true,
          name: nameType,
          isUnused: false,
          positionNum: 1,
          housingSerialNumber: currentHousingSerialNumber,
          genCode: "2",
          housingFirmVer: "1.0.00",
          createdAt: "20240824",
          updatedAt: faker.date.past().toISOString(),
          slotNumber: slotNumber,
          serialNumber: `20240610000${slotNumber}`,
          hwVersion: "1.0",
          manufacturedAt: faker.date.future().toISOString().slice(0, 10).replace(/-/g, ""),
          assembledAt: faker.date.future().toISOString().slice(0, 19).replace(/-/g, "").replace(/:/g, "")
        });
      }
      
      return {
        content: data,
        paging: {
          totalElements: 100,
        }
      };
    } 
    catch (error) {
      throw new Error(`Failed to fetch Notice data: ${error}`);
    }
  };

  const getNoticeAll = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ResponseDataType<NoticeReponse[]>>(`${baseUri}`, urlParams);
      return data;
    } 
    catch (error) {
      throw new Error(`Failed to fetch Notice data: ${error}`);
    }
  };

  const getNoticeList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      const { data } = await api.get<ResponseDataType<NoticeReponse[]>>(`${baseUri}/search`, urlParams);
      return data;
    } 
    catch (error) {
      throw new Error(`Failed to fetch Notice data: ${error}`);
    }
  };

  const getNotice = async (id: string | number) => {
    console.log('getNotice id', id)
    try {
      const { data } = await api.get<NoticeReponse>(`${baseUri}/${id}`);
      console.log('getNotice data', data)
      return data.data;
    } 
    catch (error) {
      throw new Error(`Failed to fetch Notice data: ${error}`);
    }
  };

  const registNotice = async (data: any) => {
    try {
      const response = await api.post<any>(`${baseUri}`, data);
      console.log('registNotice response', response)
      return response;
    } 
    catch (error) {
      throw new Error(`Failed to register Notice data: ${error}`);
    }
  };

  const modifyNotice = async (data: any) => {
    try {
      const response = await api.put<any>(`${baseUri}/${data.id}`, data);
      console.log('modifyNotice response', response)
      return response;
    } 
    catch (error) {
      throw new Error(`Failed to modify Notice data: ${error}`);
    }
  };

  const deleteNotice = async (data: any[]) => {
    try {
      const response = await api.delete(`${baseUri}`, data)
      console.log('delete response', response)
      return response;
    } 
    catch (error) {
      throw new Error(`Failed to delete Notice data: ${error}`);
    }
  };

  const downloadNoticeList = async (urlParams: any) => {
    console.log('urlParams', urlParams)
    try {
      await api.download(`${baseUri}/excel-download`, urlParams);
    } 
    catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  return {
	  getNoticeAll,
    getNoticeList,
    getNotice,
    registNotice,
    modifyNotice,
    deleteNotice,
	  downloadNoticeList,
    getFakeData,
  };
}

export default SampleApiService;
