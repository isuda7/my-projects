/**
 * 충전 프로파일 관리 Component
 * URL: /station/charge-profile/management
 */

/** React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import CustomMatrixIdsCell from "../common/CustomMatrixIdsCell"
import ChargeProfileExcelUpload from "./modal/ChargeProfileExcelUpload";

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationChargeProfileDto } from "@/utils/apiService/type/station/StationChargeProfileDto";


export default function StationChargeProfileList() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	const cellTypeProps = {
		minimumFractionDigits: 3,
		maximumFractionDigits: 3,
	}

	//모달 open 변수
	const [ modalOpen, setModalOpen ] = useState<boolean>(false)

	
	const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
		const state = {id: dataItem.id}
		navigate(`/station/charge-profile/management/detail`, {state})
	}

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t("station.charge_profile_no"), //"충전 프로파일 No",
			width: 80,
		},
		{
			field: "condition",
			title: t("station.charging_condition"), //"충전 조건",
			width: 140,
			filterable: true,
			cellClick: cellClickFunction,
		},
		{
			field: "current",
			title: `${t("station.ampere")}(C)`, //"전류(C)",
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "voltage",
			title:  `${t("station.voltage")}(V)`, //"전압(V)",
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "cutoff",
			title:  `${t("station.cutoff_current")}(C)`, //"Cutoff current(C)",
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "chargeModeCode",
			title:   `${t("station.charge_mode")}`, //`충전 Mode`,
			width: 120,
			filterable: true,
			align: 'center',
			selectData: [],
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: 'col01',
			title: `${t("station.derating_factor1")}`, //'Derating Factor 1(전류)',
			children: [
				{
					field: "deratingValue1",
					title: `${t("station.derating_value")}`, //`값`,
					width: 70,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMin1",
					title: `${t("station.derating_min")}`, //`최소`,
					width: 70,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMax1",
					title: `${t("station.derating_max")}`, //`최대`,
					width: 70,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
			]
		},
		{
			field: 'col02',
			title: `${t("station.derating_factor2")}`, //'Derating Factor 2(전압)',
			children: [
				{
					field: "deratingValue2",
					title: `${t("station.derating_value")}`, //`값`,
					width: 70,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMin2",
					title: `${t("station.derating_min")}`, //`최소`,
					width: 70,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMax2",
					title: `${t("station.derating_max")}`, //`최대`,
					width: 70,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
			]
		},
		{
			field: "isDefault",
			title: `${t("station.is_default")}`, //"기본여부",
			width: 100,
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
			field: "matrixIds",
			title: `${t("station.matrix_no")}`, //'조건 NO',
			width: 100,
			filterable: true,
			align: 'center',
			sortable: false,
			cell: (props: any) => <CustomMatrixIdsCell {...props} />,
		},
		{
			field: "isStepChg",
			title: `${t("station.is_step_chg")}`, //'Step 충전 여부',
			width: 100,
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
			width: 120,
			align: 'center',
		},
		{
			field: "updatedUserId",
			title: t("common.modifier"), //"수정자 ID",
			filterable: true,
			width: 120,
		},
		{
			field: "createdAt",
			title: t("common.registration_datetime"), //"등록일시",
			cellType: "dateTime",
			width: 120,
			align: 'center',
		},
		{
			field: "createdUserId",
			title: t("common.registration_id"), //"등록자 ID",
			filterable: true,
			width: 120,
		},
	])

	const getStationChargeProfileList = async (params: any) => {
		const result = await StationApiService().getStationChargeProfileList(params);
		return result.data;
	}

	const downloadButton = async (params?: object) => {
		const changeFields = new Map([ // field명 변경할 field 목록
      ["chargeModeCode", "chargeModeName"],
    ]);
		const changeTitles = new Map([ // Title명 변경할 field 목록
			["deratingValue1", `${t('station.derating_factor1')} `],
			["deratingMin1", `${t('station.derating_factor1')} `],
			["deratingMax1", `${t('station.derating_factor1')} `],
			["deratingValue2", `${t('station.derating_factor2')} `],
			["deratingMin2", `${t('station.derating_factor2')} `],
			["deratingMax2", `${t('station.derating_factor2')} `],
		])
		
		const excelMap = columns
			.flatMap(v => v.children ? v.children : v)
			.map(v => {
				const newField: any = changeFields.has(v.field)? changeFields.get(v.field) : v.field;
				const newTitle: any = changeTitles.has(v.field)? changeTitles.get(v.field) + v.title : v.title;
				return {[newField]: newTitle }
			}
		)

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationChargeProfile(excelParams);
	}

	const addButton = () => {
		navigate("/station/charge-profile/management/add")
	}

	const uploadButton = () => {
		setModalOpen(true);
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationChargeProfileDto>>(
		{
			gridHeight: 600,
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
			queryKey: "stationChargeProfile",
			downloadButton,
			uploadButton,
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
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCHGMODE'});
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
			if (v.field === 'chargeModeCode') v.selectData = seletData[0];
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

	/**
	 * 엑셀 업로드 성공시
	 * 저장알림 띄움, 모달 닫음, 그리드 재조회
	 */
	const onModalConfirm = () => {
		showAlert({message: t('common.save_success')})
		setModalOpen(false);
		if(gridRef.current){
      gridRef.current.refetchGrid();
    }
	}

	return (
		<>
			{/* 충전 프로파일 관리 */}
			<Header headName={t('station.charging_profile_management')} />
			<GridCommonComponent
				{...gridProps}
				onSearch={getStationChargeProfileList}
				ref={gridRef}
			/>
			{
				modalOpen && 
				<ChargeProfileExcelUpload
					onClose = {() => setModalOpen(false)}
					onConfirm={onModalConfirm}
				/>
			}
		</>
	);
}
