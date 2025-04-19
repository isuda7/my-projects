import {Response} from '../interface/CommonServiceInserface.ts';
import {ResponseDataType} from "@/utils/apiService/type/common/responseData.type.ts";

import createBaseUri from "@/utils/createBaseUri.ts";
import api from "@/utils/apiService/axios.ts";
import { BsmsAsHistRequestDto, BsmsAsHistResponseDto, Irregular, IrregularResponseDto } from '../type/irregular/IrregularDto.ts';
import { BatteryDiagnosis, BatteryDiagnosisRequest, BatteryDiagnosisResponse } from '../type/irregular/BatteryDiagnosisDto.ts';
import { Disconnection, DisconnectionResponse } from '../type/irregular/DisconnectionDto.ts';

const IrregularApiService = () => {
  const baseUri = createBaseUri("v1/irregular");

  // 교환기 고장 이력
  const getIrregularList = async (params: Irregular) => {
	try {
	  const response = await api.get<ResponseDataType<IrregularResponseDto[]>>(baseUri + '/station/history', params);
	  console.log('response', response)
	  return response.data;
	} catch (error) {
	  throw new Error(`Failed to fetch irregular list: ${error}`);
	}
  };

	const getCountNotHandledStaion = async (params: Irregular) => {
		try {
			const response = await api.get<ResponseDataType<number>>(baseUri + '/station/history/notHandled', params);
			console.log('count', response.data);
			return response.data;
		} catch (error) {
			throw new Error(`Failed to fetch number of not handled station irregular list: ${error}`);
		}
	}

  const getIrregularById = async (irregularId: string) => {
	try {
	  const {data} = await api.get<IrregularResponseDto>(`${baseUri}/${irregularId}`);
	  return data.data as IrregularResponseDto;
	} catch (error) {
	  throw new Error(`Failed to fetch irregular data: ${error}`);
	}
  };

  const irregularDownloadList = async (urlParams: Irregular) => {
	console.log('urlParams', urlParams)
	try {
	  await api.download(`${baseUri}/station/history/excel`, urlParams);
	} catch (error) {
	  throw new Error(`엑셀 다운로드 실패: ${error}`);
	}
  };  

	// 1세대 고장 이력
  const getBsmsAsList = async (params: BsmsAsHistRequestDto) => {
		try {
			const response = await api.get<ResponseDataType<BsmsAsHistResponseDto[]>>(baseUri + '/genOne/history', params);
			console.log('response', response)
			return response.data;
		} catch (error) {
			throw new Error(`Failed to fetch irregular list: ${error}`);
		}
	};
	
 	// 1세대 고장 이력 다운로드
	const bsmsAsDownloadList = async (urlParams: BsmsAsHistRequestDto) => {
		console.log('urlParams', urlParams)
		try {
			await api.download(`${baseUri}/genOne/history/excel`, urlParams);
		} catch (error) {
			throw new Error(`엑셀 다운로드 실패: ${error}`);
		}
	};  

  // 배터리 진단 이력
  const getBatteryDiagnosisList = async (params: BatteryDiagnosis) => {
		console.log('params', params)
	try {
	  const response = await api.get<ResponseDataType<BatteryDiagnosisResponse[]>>(baseUri + '/battery/history', params);
	  console.log('response', response)
	  return response.data;
	} catch (error) {
	  throw new Error(`Failed to fetch Battery diagnos list: ${error}`);
	}
  };

	const getCountNotHandledBattery = async (params: BatteryDiagnosisRequest) => {
		try {
			const response = await api.get<ResponseDataType<number>>(baseUri + '/battery/history/notHandled', params);
			console.log('count', response.data);
			return response.data;
		} catch (error) {
			throw new Error(`Failed to fetch number of not handled Battery diagnosis list: ${error}`);
		}
	}

  const diagnosisDownloadList = async (urlParams: BatteryDiagnosis) => {
	console.log('urlParams', urlParams)
	try {
	  await api.download(`${baseUri}/battery/history/excel`, urlParams);
	} catch (error) {
	  throw new Error(`엑셀 다운로드 실패: ${error}`);
	}
  };

  // 통신단절 현황
  const getDisconnectionList = async (params: Disconnection) => {
	try {
	  const response = await api.get<ResponseDataType<DisconnectionResponse[]>>(baseUri + '/disruption', params);
	  console.log('response.data', response.data)
	  return response.data;
	} catch (error) {
	  throw new Error(`Failed to fetch disconnection list: ${error}`);
	}
  };

  const disconnectionDownloadList = async (urlParams: Disconnection) => {
	console.log('urlParams', urlParams)
	try {
	  await api.download(`${baseUri}/disruption/excel`, urlParams);
	} catch (error) {
	  throw new Error(`엑셀 다운로드 실패: ${error}`);
	}
  };


  return {
	getIrregularList,
	getCountNotHandledStaion,
	getIrregularById,
	getBsmsAsList,
	bsmsAsDownloadList,
	irregularDownloadList,
	getBatteryDiagnosisList,
	getCountNotHandledBattery,
	diagnosisDownloadList,
	getDisconnectionList,
	disconnectionDownloadList
  };
};

export default IrregularApiService;