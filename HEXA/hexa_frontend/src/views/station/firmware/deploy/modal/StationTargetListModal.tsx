/**
 * 펌웨어 배포 등록, 상세 - 대상 스테이션 - 선택 - 스테이션선택 Modal Component
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
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationIdCodeDto } from "@/utils/apiService/type/station/StationIdCodeDto";
import { StationTargetInfoDto } from "@/utils/apiService/type/station/StationInfoDto";


export default function StationTargetListModal(props: any) {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const { onClose, setModalSeletedData } = props;
	const gridRef = useRef<{ 
		refetchGrid: () => void, 
		getSeletedDataItems: () => any[],
		getAllDataItems: () => any[]
	}>(null);

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t("station.station_id"), //"스테이션 ID",
			width: 100,
			filterable: true,
		},
		{
			field: "name",
			title: t("station.station_name"), //"스테이션 명",
			width: 100,
			filterable: true,
		},
		{
			field: "customerCode",
			title: t("station.customer_category"), //"고객구분",
			width: 100,
			filterable: true,
			selectData: [],
			filterType: 'multiSelect',
			cellType: 'select',
		},
		{
			field: "cityCode",
			title: t("station.city_unit"), //"시 단위",
			width: 110,
			filterable: true,
			selectData: [],
			filterType: 'multiSelect',
			cellType: 'select',
		},
		{
			field: "idCodeTsid",
			title: t("station.district_unit"), //"구 단위",
			width: 100,
			filterable: true,
			selectData: [],
			filterType: 'multiSelect',
			cellType: 'select',
		},
	])

	const getStationTargetInfoList = async (params: any) => {
		const result = await StationApiService().getStationTargetInfoList(params);
		return result.data;
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationTargetInfoDto>>(
		{
			gridHeight: 467,
			columnHeader: columns,
			defaultFilter: true,
			sortableGrid: true,
			unsorted: true,
			multipleSorting: true,
			girdToolBar: true,
			//gridData: [], // Correctly initialized as an empty array of User type
			displayCount: [20, 50, 100],
			// isFilterResetButton: true,
			// isGridResetButton: true,
			// isColumnSelectShowButton: true,
			checkKey: "id",
			queryKey: "stationTargetInfo",
			rowSelectable: true,
			isChecked: true,
		},
	);

	const sendSelectedRows = () => {
		let rows: any[] = [];
		if (gridRef.current) {
			rows = gridRef.current.getSeletedDataItems();
		}

		if(rows.length === 0) {
			// 선택된 데이터가 없습니다.
			showAlert({message: t('common.no_select_results')});
			return;
		}

		setModalSeletedData(rows, 'station');
	}
	
	const sendAllRows = () => {
		let rows: any[] = [];
		if (gridRef.current) {
			rows = gridRef.current.getAllDataItems();
		}

		if(rows.length === 0) {
			// 검색된 데이터가 없습니다.
			showAlert({message: t('common.no_search_results')});
			return;
		}

		setModalSeletedData(rows, 'station');
	}

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//고객구분
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCUST'});
		const smcust = res.data;

		//시 단위
		let citys: any[] = [];
		const res2 = await StationApiService().getCityList();
		if(Array.isArray(res2?.data)) citys = res2?.data?.map(v => ({code: v.cityCode, value: v.cityName}))

		//구 단위
		let districts: any[] = [];
		const resData = await StationApiService().getStationCodeList({page:0, size:9999});
		if(resData.data && Array.isArray(resData?.data?.content)) {
			districts = (resData.data.content as StationIdCodeDto[]).map((v: StationIdCodeDto) => ({code: v.tsid, value: v.districtName}))
		}

		setInitColumn([smcust, citys, districts])
	}

	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'customerCode') v.selectData = seletData[0];
			if (v.field === 'cityCode') v.selectData = seletData[1];
			if (v.field === 'idCodeTsid') v.selectData = seletData[2];
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
		<Dialog title={t('station.select_station')} onClose={onClose}> {/* 스테이션 선택 */}
			<div className="dialog-box pop-l">
				<GridCommonComponent
					{...gridProps}
					onSearch={getStationTargetInfoList}
					ref={gridRef}
				/>
			</div>
			<DialogActionsBar>
				<Button
					type="button"
					size={"medium"} 
					onClick={sendAllRows}
				>
					{/* 전체 선택 */}
					{t('common.all_select')}
				</Button>
				<Button
					type="button"
					size={"medium"}
					themeColor={"primary"}
					onClick={sendSelectedRows}
				>
					{/* 선택 */}
					{t('common.select')}
				</Button>
				<div className="text-desc">
					{/* ※ [전체 선택] 버튼 클릭 시, 조회된 결과가 모두 선택됩니다. */}
					{`※ ${t('common.all_select_info_message')}`}
				</div>
			</DialogActionsBar>
		</Dialog>
	);
}
