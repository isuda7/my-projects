/**
 * 펌웨어 관리 Component
 * URL: /station/firmware/management
 */

/* React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import DateRange, { DateRangeProps } from "@/components/common/DateRange.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";

export default function StationFirmwareList() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	/**
	 * DateRange Component 초기값, DateRange 컴포넌트의 부모 컴포넌트에서 작성한다
	 */
	const now = new Date();
	const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
		startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0), //시작일자 초기값
		endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59), //종료일자 초기값
		//format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
		allFlag: false,
		type: 'date',
		initState: 'week'
	});

	
	const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
		const state = {tsid: dataItem.tsid}
		navigate(`/station/firmware/management/detail`, {state})
	}

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "fwGenerationCode",
			title: t("station.generation_type"), //"세대구분",
			width: 80,
			filterable: true,
			selectData: [],
			align: 'center',
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "fwTypeCode",
			title: t("station.firmware_name"), //"펌웨어명",
			width: 140,
			filterable: true,
			selectData: [],
			align: 'center',
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "fwVersion",
			title: t("station.version"), //"버전",
			width: 100,
			filterable: true,
		},
		{
			field: "fwFileName",
			title: t("common.file_name"), //"파일명",
			width: 160,
			cellClick: cellClickFunction,
			filterable: true,
		},
		{
			field: "isUse",
			title: t("station.is_use"), //"사용여부",
			width: 110,
			filterable: true,
			selectData: [
				{code: true, value: 'Y'},
				{code: false, value: 'N'},
			],
			filterType: 'select',
			align: 'center',
			cell: (props: any) => <CustomRepresentativeCell {...props} />,
		},
		{
			field: "updatedAt",
			title: t("common.modification_datetime"), //"수정일시",
			cellType: "dateTime",
			width: 140,
			align: 'center',
		},
		{
			field: "updatedUserId",
			title: t("common.modifier_id"), //"수정자 ID",
			filterable: true,
			width: 120,
		},
		{
			field: "createdAt",
			title: t("common.registration_datetime"), //"등록일시",
			cellType: "dateTime",
			width: 140,
			align: 'center',
		},
		{
			field: "createdUserId",
			title: t("common.registration_id"), //"등록자 ID",
			filterable: true,
			width: 120,
		},
	])

	const getStationFirmwareList = async (params: any) => {
		const result = await StationApiService().getStationFirmwareList(params);
		return result.data;
	}

	const downloadButton = async (params?: object) => {
		const changeFields = new Map([ // field명 변경할 field 목록
      ["fwGenerationCode", "fwGenerationCodeName"],
      ["fwTypeCode", "fwTypeCodeName"],
    ]);
		const excelMap = columns
			.map(v => {
				const newField: any = changeFields.has(v.field)? changeFields.get(v.field) : v.field;
				return {[newField]: v.title }
			}
		)

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationFirmware(excelParams);
	}

	const addButton = () => {
		navigate("/station/firmware/management/add")
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDto>>(
		{
			gridHeight: 400,
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
			checkKey: "tsId",
			queryKey: "stationFirmware",
			downloadButton,
			addButton,
		},
	);

	const searchEvent = () => {
		if (gridRef.current) {
			gridRef.current.refetchGrid();
		}
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
		<>
			{/* 펌웨어 관리 */}
			<Header headName={t('station.firmware_management')} />
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
		</>
	);
}
