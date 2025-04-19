/**
 * 스테이션 로그 다운로드 Component
 * URL: /station/info/log
 */

/* React */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import LogSearchBox, { DateRangeProps } from "./components/LogSearchBox.tsx";
import StationSelectGrid from "../../components/StationSelectGrid.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';
import { getFormattedTime } from "@/utils/common.ts";

/* Types */
import { StationGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationLogDto } from "@/utils/apiService/type/station/StationLogDto";

export default function StationLogDownload() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);
	const [data, setData] = useState<any[]>([])

	/**
	 * DateRange Component 초기값, DateRange 컴포넌트의 부모 컴포넌트에서 작성한다
	 */
	const now = new Date();
	const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
		startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0), //시작일자 초기값
		endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59), //종료일자 초기값
		initState: 'today',
		stationId: '',
	});

	const CustomCellButton = (e: any) => {
		const data = e.dataItem;
		if(data.isCompleted) {
			return (
				<Button 
					themeColor={"info"}
					onClick={() => confirmDownload(e.dataItem)}
				>
					<i className="icon icon-download"></i>
				</Button>
			);
		}
		else {
			<></>
		}
  };

	const confirmDownload = (data: any) => {
		showAlert({
			title: t('common.download'), //다운로드',
			message: t('common.download_confirm'), //'다운로드 하시겠습니까?',
			type: 'confirm',
			onConfirm: () => StationLogDownload(data.id),
		})
	}

	const StationLogDownload = async (id: string) => {
		try {
			await StationApiService().stationLogDownload(id);
		} 
		catch (error: any) {
			if(error.data && error.data.message) {
				showAlert({message: error.data.message});
			}
			else {
				showAlert({message: '네트워크 에러'});
			}
		}
	}

	const columns = [
		{
			field: "requestedAt",
			title: t("station.request_datetime"), //"요청일시",
			width: 140,
			cellType: 'dateTime'
		},
		{
			field: "generationName",
			title: t("station.generation_type"), //"세대구분",
			width: 140,
			align: 'center',
		},
		{
			field: "stationId",
			title: t("station.station_id"), //"스테이션ID",
			width: 140,
		},
		{
			field: "stationName",
			title: t("station.station_name"), //"스테이션명",
			width: 140,
			align: 'center',
		},
		{
			field: "logFileName",
			title: t("station.log_filename"), //"로그 파일명",
			width: 140,
		},
		{
			field: "download",
			title: t("common.download"), //"다운로드",
			width: 140,
			align: 'center',
			sortable: false,
			cell: (e: any) => CustomCellButton(e)
		},
	]

	/**
	 * 스테이션 ID로 목록 조회
	 * @returns 
	 */
	const getStationLogList = async () => {
		if(!checkValidation(dateRangeProps)) return false;

		const params = { stationId : dateRangeProps.stationId } ;
		try {
			const result = await StationApiService().getStationLogList(params);
			console.log('result', result)
			if(Array.isArray(result.data)) setData(result.data)
		} 
		catch (error: any) {
			showAlert({message: error.data.message})
		}
	}

	/**
	 * 로그요청, 성공시 스테이션ID 목록 조회
	 */
	const requestLogDataConfirm = async () => {
		if(!checkValidation(dateRangeProps, 'request')) return false;

		const requestData = {
			id: dateRangeProps.stationId,
			startDate: getFormattedTime(dateRangeProps.startDate, 'YYYYMMDD'),
			endDate: getFormattedTime(dateRangeProps.endDate, 'YYYYMMDD'),
		}

		showAlert({
			title: t('station.log_request'), //'로그 요청',
			message: t('station.log_request_confirm'), //'로그 요청 하시겠습니까?',
			type: 'confirm',
			onConfirm: () => requestLogData(requestData)
		})
	}

	const requestLogData = async (data: any) => {
		try {
			const result = await StationApiService().requestLogData(data);
			console.log('requestLogData result', result)
			getStationLogList();
		} 
		catch (error: any) {
			showAlert({message: error.data.message})	
		}
	}

	/**
	 * 유효성 검사
	 * @param props 
	 * @param flag 
	 * @returns 
	 */
	const checkValidation = (props: DateRangeProps, flag?: string) => {
		const result = true;
		if(!props.stationId) {
			//스테이션ID 을(를) 입력해 주세요.
			showAlert({message: t('common.input_required', {string: t('station.station_id')})})
			return false;
		}
		
		if(flag === 'request') {
			const start = props.startDate as Date;
			const end = props.endDate as Date;

			const yearDiff = end.getFullYear() - start.getFullYear();
			const monthDiff = end.getMonth() - start.getMonth();

			if(yearDiff > 0 || monthDiff > 1 || 
				(yearDiff === 0 && monthDiff === 1 && end.getDate() >= start.getDate())) {
				//로그 요청 최대 기간은 1달입니다. 다시 선택해주세요
				showAlert({message: t('station.log_request_alert')})
				return false;
			}
		}
		return result;
	}

	const [gridProps, setGridProps] = useState<StationGridProps<StationLogDto>>(
		{
			maxHeight: 490,
			columnHeader: columns,
			sortableGrid: true,
			unsorted: true,
			multipleSorting: true,
			nonCheck: true,
		},
	);

	return (
		<>
			{/* 스테이션 로그 다운로드 */}
			<Header headName={t('station.station_log_download')} />
			<LogSearchBox
				setDateRangeProps={setDateRangeProps}
				dateRangeProps={dateRangeProps}
				searchEvent={getStationLogList}
				requestLog={requestLogDataConfirm}
			/>
			<StationSelectGrid
				{...gridProps}
				columnHeader={columns}
				gridData={data}
				ref={gridRef}
			/>
		</>
	);
}
