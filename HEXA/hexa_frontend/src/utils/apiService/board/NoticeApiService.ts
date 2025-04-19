import createBaseUri from "@/utils/createBaseUri.ts";
import api from "@/utils/apiService/axios.ts";
import {ResponseDataType} from "@/utils/apiService/type/common/responseData.type.ts";
import {Response} from "@/utils/apiService/interface/CommonServiceInserface.ts";
import { NoticeRequestDto } from "../type/board/NoticeRequestDto";
import { NoticeResponseDto } from "../type/board/NoticeResponseDto";
import { PeriodSearchDto, SearchDto } from "../type/board/NoticeDto";

const NoticeApiService = () => {
    const baseUri = createBaseUri("v1/board/notice");

    const createNotice = async (data: any) => {
        try {
            const response = await api.post<Response<NoticeResponseDto>>(baseUri, data,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              });
            return response.data;
        } catch (error : any) {
            const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
            throw new Error(`Failed to create notice: ${errorMessage}`);
        }
    }

    const getNoticeList = async (params: SearchDto) => {
        try {
            const response = await api.get<ResponseDataType<NoticeResponseDto[]>>(baseUri, params);
            console.log('response', response)
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch notice list: ${error}`);
        }
    };

    const getNoticeById = async (id: bigint)=> {
        try {
            const {data} = await api.get<NoticeResponseDto>(`${baseUri}/${id}`);
            console.log('data - ', data);
            return data.data as NoticeResponseDto;
        } catch (error) {
            throw new Error(`Failed to fetch notice data: ${error}`);
        }
    };

    const updateNotice = async (id: number, data: any) => {
        try {
            const response = await api.put(`${baseUri}/${id}`, data,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              });
            console.log('modifyNoticeInfo response ', response)
            return response.data;
        } catch (error: any) {
            console.log('error', error);
            throw new Error(`Failed to update notice data: ${error?.message}`);
        }
    };

    const getPeriodNotices = async (params: PeriodSearchDto) => {
        try {
            const response = await api.get<ResponseDataType<NoticeResponseDto[]>>(`${baseUri}/user/search`, params);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch notice list: ${error}`);
        }
    }

    const getPopupCount = async () => {
        try {
            const response = await api.get<number>(`${baseUri}/popup-count`);
            console.log('결과: ', response);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch popup-count: ${error}`);
        }
    }

    const fileDownload = async (id : string) => {
        try {
            const repsonse = await api.download(`${baseUri}/download`, {id});
            return repsonse.data;
        } catch (error) {
            throw new Error(`Failed to download file: ${error}`);
        }
    }

    const getNoticePopupList = async () => {
        try {
            const response = await api.get<NoticeResponseDto[]>(`${baseUri}/popup`);
            console.log('response', response)
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch notice list: ${error}`);
        }
    };

    return {
        createNotice,
        getNoticeList,
        getNoticeById,
        updateNotice,
        getPeriodNotices,
        getPopupCount,
        fileDownload,
        getNoticePopupList
    };
};

export default NoticeApiService;