/**
 * 펌웨어 배포 등록, 상세 - 펌웨어 정보 - 선택 - 펌웨어선택 Modal Component
 * URL: /station/firmware/deploy/add
 * URL: /station/firmware/deploy/detail
 */

/** React */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

/* Common */
import DateRange, { DateRangeProps } from "@/components/common/DateRange.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";


export default function StationFirmwareListModal(props: any) {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const { onClose, setModalSeletedData } = props;
	const gridRef = useRef<{ refetchGrid: () => void, getSeletedDataItems: () => any[] }>(null);

	/**
	 * DateRange Component 초기값, DateRange 컴포넌트의 부모 컴포넌트에서 작성한다
	 */
	const now = new Date();
	const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
		startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0), //시작일자 초기값
		endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59), //종료일자 초기값
		format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
		allFlag: false,
		type: 'date',
		initState: 'week'
	});

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "fwGenerationCode",
			title: t('station.generation_type'), //"세대구분",
			width: 100,
			filterable: true,
			selectData: [],
			align: 'center',
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "fwTypeCode",
			title: t('station.firmware_name'), //"펌웨어명",
			width: 200,
			filterable: true,
			selectData: [],
			align: 'center',
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "fwVersion",
			title: t('station.version'), //"버전",
			width: 100,
			filterable: true,
		},
		{
			field: "fwFileName",
			title: t('common.file_name'), //"파일명",
			width: 200,
			filterable: true,
		},
		{
			field: "createdAt",
			title: t('common.registration_datetime'), //"등록일시",
			cellType: "dateTime",
		},
	])

	const getStationFirmwareList = async (params: any) => {
		const result = await StationApiService().getStationFirmwareList(params);
		return result.data;
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDto>>(
		{
			gridHeight: 300,
			columnHeader: columns,
			defaultFilter: true,
			sortableGrid: true,
			unsorted: true,
			multipleSorting: true,
			isReorder: true,
			isResizable: true,
			girdToolBar: true,
			//gridData: [], // Correctly initialized as an empty array of User type
			displayCount: [20, 50, 100],
			isFilterResetButton: true,
			isGridResetButton: true,
			isColumnSelectShowButton: true,
			checkKey: "tsid",
			queryKey: "stationFirmware",
			rowSelectable: true,
			isChecked: true,
		},
	);

	const searchEvent = () => {
		if (gridRef.current) {
			gridRef.current.refetchGrid();
		}
	}

	const sendSelectedRows = () => {
		let rows: any[] = [];
		if (gridRef.current) {
			rows = gridRef.current.getSeletedDataItems();
		}

		if(rows.length === 0) {
			showAlert({message: '선택된 데이터가 없습니다.'});
			return;
		}

		setModalSeletedData(rows, 'firmware');
	}

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//세대구분(1세대, 2세대)
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMGEN'});
		const generationCodes = res.data;
		//펌웨어명(슬롯 펌웨어, 충전기 펌웨어 등 ...)
		const res2 = await CodeApiService().getCodesByGroupCode({groupCode:'SMFWT'});
		const fwTypeCodes = res2.data;

		setInitColumn([generationCodes, fwTypeCodes])
	}

	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'fwGenerationCode') v.selectData = seletData[0];
			if (v.field === 'fwTypeCode') v.selectData = seletData[1];
		})
		setColumns(newColumn);
	}

	useEffect(() => {
		setInitData();
	}, [])

	useEffect(() => {
		setGridProps({
			...gridProps,
			columnHeader: columns,
		})
	}, [columns])

	return (
		<Dialog title={t('station.select_firmware')} onClose={onClose}> {/* 펌웨어 선택 */}
			<div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
				<DateRange
					setDateRangeProps={setDateRangeProps}
					dateRangeProps={dateRangeProps}
					searchEvent={searchEvent}
				/>
				<GridCommonComponent
					{...gridProps}
					onSearch={getStationFirmwareList}
					ref={gridRef}
					searchParams={{
						createdAtStart: dateRangeProps?.startDate,
						createdAtEnd: dateRangeProps?.endDate,
						allFlag: dateRangeProps.allFlag,
					}}
				/>
			</div>
			<DialogActionsBar>
				<Button onClick={sendSelectedRows}>
					{/* 선택 */}
					{t('common.select')}
				</Button>
			</DialogActionsBar>
		</Dialog>
	);
}
