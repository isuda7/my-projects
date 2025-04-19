import createBaseUri from "@/utils/createBaseUri.ts";
import MOCK_CODE_LIST from "@/utils/apiService/sample/code.json";
import api from "@/utils/apiService/axios.ts";
import {Response} from "@/utils/apiService/interface/CommonServiceInserface.ts";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {SaveCode, SaveGroupCode, SearchCodes, SearchGroupCodes} from "@/utils/apiService/type/system/code/CodeRequestDto.ts";
import {CodeResponseDto, CodeValueDto, GroupCodeResponseDto, GroupCodeValueDto, GroupCommonCodeDto, GroupCommonCodeInfo} from "@/utils/apiService/type/system/code/CodeResponseDto.ts";
import { Search } from "react-router-dom";

type GroupCode = {
  groupCode: string;
}

type GroupCodes = {
  groupCodes: string[];
}
const CodeApiService = () => {
  const baseUri = createBaseUri("v1/system/code");

  const getCodes = async (params: GroupCode) => {
    
    const { data } = MOCK_CODE_LIST[params.groupCode];
    return data;
  };
  const getCodesByGroupCode = async (params: GroupCode) => {

    try {
      const { data } = await api.get<Response<any[]>>(baseUri + `/common/${params.groupCode}`, null, { showLoading: false });
      return data;
    } catch (error) {
      throw new Error(`Failed to create battery: ${error}`);
    }
  };
  const getCodesByGroupCodeList = async (params: GroupCodes) => {

    try {
      const { data } = await api.get<Response<any[]>>(baseUri + `/common/groupCodes`, params);
      return data;
    } catch (error) {
      throw new Error(`Failed to create battery: ${error}`);
    }
  };

  // create 공통 코드
  const createCode = async (data: SaveCode) => {
    try {
      const response = await api.post<Response<CodeResponseDto>>(`${baseUri}/common`, data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message: JSON.stringify(error);
      throw new Error(`Failed to create common-code: ${errorMessage}`);
    }
  }

  // read
  const getCommonCodes = async (params: SearchCodes) => {
    try {
      const response = await api.get<Response<CodeResponseDto[]>>(`${baseUri}/common`, params);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch common-code list: ${error}`);
    }
  }

  const getCommonCodeByCode = async (code: string, groupCode: string) => {
    try {
      const response = await api.get<Response<CodeResponseDto>>(`${baseUri}/common/${code}/${groupCode}`);
      return response.data;
    } catch(error) {
      throw new Error(`Failed to fetch common-code: ${error}`);
    }
  }

  // update 공통 코드
  const updateCommonCode = async (code: string, groupCode: string, data: SaveCode) => {
    try {
      const response = await api.put<Response<CodeResponseDto>>(`${baseUri}/common/${groupCode}/${code}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update common-code: ${error}`);
    }
  }

  // create 그룹코드
  const createGroupCode = async (data: SaveGroupCode) => {
    try {
      const response = await api.post<Response<GroupCodeResponseDto>>(`${baseUri}/group`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create new groupCode: ${error}`);
    }
  }

  // read 그룹코드
  const getGroupCodes = async () => {
    try {
      const response = await api.get<Response<GroupCodeResponseDto[]>>(`${baseUri}/group`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch group-code list: ${error}`);
    }
  }

  // read 그룹코드 - search
  const getGroupCodesSearch = async ( params: SearchGroupCodes ) => {
    try {
      const response = await api.get<Response<GroupCodeResponseDto[]>>(`${baseUri}/group/search`, params)
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch search group-code list: ${error}`)
    }
   }

   // read 그룹코드 by groupCodeId
   const getGroupCodeById = async ( groupCode: string) => {
    try {
      const response = await api.get<Response<GroupCodeResponseDto>>(`${baseUri}/group/${groupCode}`)
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch group-code by group-codeID: ${error}`)
    }
   }

   // update 그룹코드
   const updateGroupCode = async ( groupCode: string, data: SaveGroupCode) => {
    try {
      const response = await api.put<Response<GroupCodeResponseDto>>(`${baseUri}/group/${groupCode}`, data)
    } catch (error) {
      throw new Error(`Failed to update group-code: ${error}`)
    }
   }


  // 공통코드ID 중복체크
  const checkIdDuplication = async (code: string) => {
    try {
        const response = await api.get<Response<boolean>>(`${baseUri}/common/duplication-check/${code}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to check duplication: ${error}`);
    }
  }

  // 그룹코드 ID 중복체크
  const checkGroupIdDuplication = async (groupCode: string) => {
    try {
      const response = await api.get<Response<boolean>>(`${baseUri}/group/duplication-check/${groupCode}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to check duplication: ${error}`);
    }
  }

  // 공통코드명 list 가져오기
  const getValues = async () => {
    try {
      const { data } = await api.get<Response<CodeValueDto[]>>(`${baseUri}/common/values`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to get code-values: ${error}`);
    }
  }

  // 그룹코드 list 가져오기
  const getGcValues = async() => {
    try {
      const {data} = await api.get<Response<GroupCodeValueDto[]>>(`${baseUri}/group/values`);
      return data;
    }
    catch (error) {
      throw new Error(`Failed to get groupCode-values: ${error}`);
    }
  }

  // 공통코드 excel 다운로드
  const downloadExcel = async(urlParams: SearchCodes) => {
    try {
      await api.download(`${baseUri}/common/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  }

  // 그룹코드 excel 다운로드
  const downloadGroupCodeExcel = async(urlParams: SearchGroupCodes) => {
    try {
      await api.download(`${baseUri}/group/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  }

  return {
    getCodes,
    getCodesByGroupCode,
    getCodesByGroupCodeList,
    getCommonCodes,
    createCode,
    getCommonCodeByCode,
    updateCommonCode,
    createGroupCode,
    getGroupCodes,
    getGroupCodesSearch,
    getGroupCodeById,
    updateGroupCode,
    checkIdDuplication,
    checkGroupIdDuplication,
    getValues,
    getGcValues,
    downloadExcel,
    downloadGroupCodeExcel
  };
}

export default CodeApiService;
