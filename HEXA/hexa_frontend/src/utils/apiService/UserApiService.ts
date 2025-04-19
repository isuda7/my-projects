import createBaseUri from "@/utils/createBaseUri.ts";
import { signup, UserReponse } from "@/utils/apiService/type/auth/User.type.ts";
import {
  UserActiveSearchParam,
  UserCreateDto,
  UserSearchParam,
  UserUpdateDto,
} from "@/utils/apiService/type/user/user.type.ts";
import api from "./axios";
import {
  UserEmailDto,
  UserResponseDto,
} from "@/utils/apiService/type/user/UserResponseDto.ts";
import { ResponseDataType } from "@/utils/apiService/type/common/responseData.type.ts";
import { Response } from "@/utils/apiService/interface/CommonServiceInserface.ts";
import { data } from "@/pub/components/guide/sample-data";

const UserApiService = () => {
  const baseUri = createBaseUri("v1/system/user");
  const myPageUri = createBaseUri("v1/my");

  const getUsers = async (params: UserSearchParam) => {
    try {
      const response = await api.get<ResponseDataType<UserResponseDto[]>>(
        `${baseUri}/search`,
        params
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user list: ${error}`);
    }
  };

  const getActiveUsers = async (params: UserActiveSearchParam) => {
    try {
      const response = await api.get<ResponseDataType<UserResponseDto[]>>(
        `${baseUri}/active/search`,
        params
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user list: ${error}`);
    }
  };

  const createUser = async (data: UserCreateDto) => {
    try {
      const response = await api.post<Response<UserResponseDto>>(baseUri, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  };

  const updateUser = async (userId: string, data: UserUpdateDto) => {
    // console.log(userId, data);
    try {
      const response = await api.put<Response<UserResponseDto>>(
        `${baseUri}/${userId}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user data: ${error}`);
    }
  };

  const updatePassword = async (userId: string, password: string) => {
    console.log("update password", password);
    try {
      const response = await api.put(`${myPageUri}/pwd/${userId}`, {
        password: password, // JSON 객체로 패스워드 전송
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user data: ${error}`);
    }
  };

  const getUserById = async (tsid: number) => {
    try {
      const { data } = await api.get<UserResponseDto>(`${baseUri}/${tsid}`);
      return data.data as UserResponseDto;
    } catch (error) {
      throw new Error(`Failed to fetch user data: ${error}`);
    }
  };

  const getUsersByIds = async (ids: string[]) => {
    try {
      const { data } = await api.post<UserEmailDto[]>(
        `${baseUri}/usersInfo`,
        ids
      );
      console.log(data);
      return data.data as UserEmailDto[];
    } catch (error) {
      throw new Error(`Failed to fetch user data: ${error}`);
    }
  };

  const getUserByUserId = async (userId: string) => {
    try {
      const { data } = await api.get<UserResponseDto>(
        `${baseUri}/userId/${userId}`
      );
      return data.data as UserResponseDto;
    } catch (error) {
      throw new Error(`Failed to fetch user data: ${error}`);
    }
  };

  const checkIdDuplication = async (userId: string) => {
    try {
      const { data } = await api.get<Response<boolean>>(
        `${baseUri}/duplication-check/${userId}`
      );
      return data.data;
    } catch (error) {
      throw new Error(`Failed to fetch user data: ${error}`);
    }
  };

  const unlockUser = async (userId: string) => {
    try {
      const response = await api.put<Response<UserResponseDto>>(
        `${baseUri}/unlock/${userId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to unlock user data: ${error}`);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await api.delete(`${baseUri}/${userId}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error}`);
    }
  };

  const downloadList = async (urlParams: UserSearchParam) => {
    console.log("urlParams", urlParams);
    try {
      await api.download(`${baseUri}/excel`, urlParams);
    } catch (error) {
      throw new Error(`엑셀 다운로드 실패: ${error}`);
    }
  };

  const registUser = async (datas: signup) => {
    const { data } = await api.get<UserReponse>(`${baseUri}`);
    return data;
  };
  // const updateUser = async (datas: signup) => {
  // const {data} = await api.put<UserReponse>(`${baseUri}`)
  // return data;
  // };

  return {
    getUsers,
    getActiveUsers,
    getUserById,
    getUsersByIds,
    getUserByUserId,
    checkIdDuplication,
    createUser,
    registUser,
    updateUser,
    updatePassword,
    unlockUser,
    deleteUser,
    downloadList,
  };
};

export default UserApiService;
