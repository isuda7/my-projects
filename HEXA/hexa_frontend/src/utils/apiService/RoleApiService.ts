import createBaseUri from "@/utils/createBaseUri.ts";
import { RoleDetailDto, RoleEngNameDto, RoleNameDto, RoleResponseDto, RoleSaveDto, RoleSearchParam } from "@/utils/apiService/type/role/RoleDto.ts";
import api from "@/utils/apiService/axios.ts";
import { ResponseDataType } from "@/utils/apiService/type/common/responseData.type.ts";
import { Response } from "@/utils/apiService/interface/CommonServiceInserface.ts";
import { Grant } from "@/utils/apiService/type/role/GrantDto.ts";

const RoleApiService = () => {
  const baseUri = createBaseUri("v1/system/role");

  const getRoles = async (params: RoleSearchParam) => {
    try {
      const response = await api.get<ResponseDataType<RoleResponseDto[]>>(`${baseUri}/search`, params);
      console.log('response', response);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch role list: ${error}`);
    }
  };

  const isRoleUse = async (tsid: string) => {
    try {
      const { data } = await api.get<Response<boolean>>(`${baseUri}/isUse/${tsid}`);
      // console.log(data.data);
      return data.data;
    } catch (error) {
      throw new Error(`Failed to fetch role list: ${error}`);
    }
  }

  const getGrants = async () => {
    try {
      const response = await api.get<ResponseDataType<Grant[]>>(`${baseUri}/grants`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch grant list: ${error}`);
    }
  }

  const getGrantsWithMenuTree = async () => {
    try {
      const response = await api.get<ResponseDataType<Grant[]>>(`${baseUri}/grantsWithMenuTree`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch grant list: ${error}`);
    }
  }

  const getRoleNames = async () => {
    try {
      const { data } = await api.get<Response<RoleNameDto[]>>(`${baseUri}/name`);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch role name: ${error}`);
    }
  }

  const getUsingRoleNames = async () => {
    try {
      const { data } = await api.get<Response<RoleNameDto[]>>(`${baseUri}/usingName`);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch role name: ${error}`);
    }
  }

  const getRoleEngNames = async () => {
    try {
      const { data } = await api.get<Response<RoleEngNameDto[]>>(`${baseUri}/engName`);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch role eng name: ${error}`);
    }
  }

  const createRole = async (data: RoleSaveDto) => {
    try {
      // console.log("createRole RoleSaveDto", data);
      const response = await api.post<Response<RoleResponseDto>>(baseUri, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create role: ${error}`);
    }
  };

  const updateRole = async (tsid: number, data: RoleSaveDto) => {
    try {
      // console.log("updateRole RoleSaveDto", data);
      const response = await api.put<Response<RoleResponseDto>>(`${baseUri}/${tsid}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update role data: ${error}`);
    }
  };

  const getRoleById = async (tsid: number) => {
    try {
      const { data } = await api.get<RoleDetailDto>(`${baseUri}/${tsid}`);
      // console.log(data.data);
      return data.data as RoleDetailDto;
    } catch (error) {
      throw new Error(`Failed to fetch role data: ${error}`);
    }
  };

  const getRoleByRoleName = async (roleName: string) => {
    try {
      const { data } = await api.get<RoleResponseDto>(`${baseUri}/name/${roleName}`);
      return data.data as RoleResponseDto;
    } catch (error) {
      throw new Error(`Failed to fetch role data: ${error}`);
    }
  };

  const checkRoleCodeDuplication = async (roleCode: string) => {
    try {
      const { data } = await api.get<Response<boolean>>(`${baseUri}/duplication-check/${roleCode}`);
      return data.data;
    } catch (error) {
      throw new Error(`Failed to check duplication: ${error}`);
    }
  };

  const downloadList = async (urlParams: RoleSearchParam) => {
    console.log('urlParams', urlParams);
    try {
      await api.download(`${baseUri}/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  return {
    getRoles,
    isRoleUse,
    getGrants,
    getGrantsWithMenuTree,
    createRole,
    updateRole,
    getRoleById,
    getRoleByRoleName,
    checkRoleCodeDuplication,
    downloadList,
    getRoleNames,
    getUsingRoleNames,
    getRoleEngNames
  };

}

export default RoleApiService;