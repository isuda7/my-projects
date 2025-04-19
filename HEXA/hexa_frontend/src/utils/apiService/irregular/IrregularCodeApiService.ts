import {Response} from '../interface/CommonServiceInserface.ts';
import {ResponseDataType} from "@/utils/apiService/type/common/responseData.type.ts";

import createBaseUri from "@/utils/createBaseUri.ts";
import api from "@/utils/apiService/axios.ts";
import { Irregular, IrregularResponseDto } from '../type/irregular/IrregularDto.ts';
import { IrregularCode, IrregularCodeResponseDto, IrregularCodeSaveDto } from '../type/irregular/IrregularCodeDto.ts';

const IrregularCodeApiService = () => {
  const baseUri = createBaseUri("v1/irregular/code");

  const getIrregularCodeList = async (params: IrregularCode) => {
	try {
	  const response = await api.get<ResponseDataType<IrregularCodeResponseDto[]>>(baseUri + '/search', params);
	  console.log('response', response)
	  return response.data;
	} catch (error) {
	  throw new Error(`Failed to fetch irregular code list: ${error}`);
	}
  };

  const getIrregularCodeById = async (irregularCodeId: string) => {
	try {
	  const {data} = await api.get<IrregularCodeResponseDto>(`${baseUri}/${irregularCodeId}`);
	  return data.data as IrregularCodeResponseDto;
	} catch (error) {
	  throw new Error(`Failed to fetch irregular code data: ${error}`);
	}
  };

  const createIrregularCode = async (data: IrregularCodeSaveDto) => {
    try {
        const response = await api.post<Response<IrregularCodeResponseDto>>(baseUri, data);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to create irregular code: ${error}`)
    }
  };

  const updateIrregularCode = async (id: number, data: IrregularCodeSaveDto) => {
    try {
        const response = await api.put<Response<IrregularCodeResponseDto>>(`${baseUri}/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update irregular code: ${error}`)
    }
  };

  const checkIrregularCodeDuplication = async (code: string) => {
    try {
        const {data} = await api.get<Response<boolean>>(`${baseUri}/duplication-check/${code}`);
        return data.data;
    } catch (error) {
        throw new Error(`Failed to check duplication: ${error}`);
    }
  };

  const deleteIrregularCode = async (irregularCodeId: string) => {
    try {
        const response = await api.delete(`${baseUri}/${irregularCodeId}`);
        return response;
    } catch (error) {
        throw new Error(`Failed to delete irregular code: ${error}`);
    }
  };

  const downloadList = async (urlParams: IrregularCode) => {
	console.log('urlParams', urlParams)
	try {
	  await api.download(`${baseUri}/excel`, urlParams);
	} catch (error) {
	  throw new Error(`엑셀 다운로드 실패: ${error}`);
	}
  };

  const excelUpload = async (formData: FormData) => {
    try {
        const response = await api.post(`${baseUri}/bulk`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        return response;
      }
      catch (error) {
        throw new Error(`irregular code 엑셀 업로드 실패: ${error}`);
      }
  };

  return {
	getIrregularCodeList,
	getIrregularCodeById,
    createIrregularCode,
    updateIrregularCode,
    checkIrregularCodeDuplication,
    deleteIrregularCode,
	downloadList,
    excelUpload
  };
};

export default IrregularCodeApiService;