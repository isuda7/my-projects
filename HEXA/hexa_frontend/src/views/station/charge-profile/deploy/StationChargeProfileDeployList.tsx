/**
 * 충전 프로파일 배포 관리 Component
 * URL: /station/charge-profile/deploy
 */

/** React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import CustomTooltipCell from "../common/CustomTooltipCell";


/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { ChargeProfileJobDto } from "@/utils/apiService/type/station/ChargeProfileJobDto";


export default function StationChargeProfileDeployList() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
		const state = {id: dataItem.ctaId}
		navigate(`/station/charge-profile/deploy/detail`, {state})
	}

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "ctaId",
			title: t("station.cta_id"), //"CTA ID",
			width: 120,
			filterable: true,
			cellClick: cellClickFunction,
		},
		{
			field: "profileNos",
			title: t('station.charge_profile_no'), //"충전 프로파일NO",
			width: 120,
			filterable: true,
			align: 'center',
			sortable: false,
			cell: (props: any) => <CustomTooltipCell {...props} />,
		},
		{
			field: "col01",
			title: t("station.target_station"), //"대상 스테이션",
			children: [
				{
					field: "stationCount",
					title: t("station.all"), //"전체",
					width: 60,
					align: 'center',
				},
				{
					field: "waitingCount",
					title: t("station.waiting"), //"대기중",
					width: 60,
					align: 'center',
				},
				{
					field: "progressCount",
					title: t("station.deploying"), //"배포중",
					width: 60,
					align: 'center',
				},
				{
					field: "successCount",
					title: t("station.success"), //"성공",
					width: 60,
					align: 'center',
				},
				{
					field: "failCount",
					title: t("station.failed"), //"실패",
					width: 60,
					align: 'center',
				},
			]
		},
		{
			field: "deployAt",
			title: t("station.deploy_datetime"), //"배포일시",
			cellType: "dateTime",
			width: 140,
			align: 'center',
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
			width: 100,
		},
	])

	const getStationChargeProfileJobList = async (params: any) => {
		const result = await StationApiService().getStationChargeProfileJobList(params);
		return result.data;
	}

	const downloadButton = async (params?: object) => {

		const excelMap = columns
			.flatMap(v => v.children ? v.children : v)
			.map(v => ({[v.field]: v.title }))

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationChargeProfileJob(excelParams);
	}

	const addButton = () => {
		navigate("/station/charge-profile/deploy/add")
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<ChargeProfileJobDto>>(
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
			queryKey: "chargeProfileDeploy",
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
		//충전 프로파일 고속 충전 조건
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCHGCON'});
		const codes = res.data;
		setInitColumn([codes])
	}


	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'chargeConditionCode') v.selectData = seletData[0];
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
			{/* 충전 프로파일 배포 관리 */}
			<Header headName={t('station.charging_profile_deployment')} />
			<GridCommonComponent
				{...gridProps}
				onSearch={getStationChargeProfileJobList}
				ref={gridRef}
			/>
		</>
	);
}
