/**
 * 충전 프로파일 Factor 관리 Component
 * URL: /station/charge-profile/factor
 */


/* React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { ChargeProfileFactorDto } from "@/utils/apiService/type/station/ChargeProfileFactorDto";

export default function ChargeProfileFactorList() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);
	
	const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
		const state = {id: dataItem.id}
		navigate(`/station/charge-profile/factor/detail`, {state})
	}

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t('station.factor'), //'Factor',
			width: 100,
			filterable: true,
			cellClick: cellClickFunction,
		},
		{
			field: "chargeFactorCode",
			title:  t('station.category'), //'구분',
			width: 100,
			filterable: true,
			selectData: [],
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "minValue",
			title:  t('station.greater_or_equal'), //'이상',
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "maxValue",
			title:  t('station.less_than'), //'미만',
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "congestionLevelCode",
			title: t("station.congestion_level"), //번잡도
			width: 100,
			align: 'center',
			filterable: true,
			selectData: [],
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "updatedAt",
			title: t("common.modification_datetime"), //"수정일시",
			width: 140,
			cellType: 'dateTime',
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

	const getChargeProfileFactorList = async (params: any) => {
		const result = await StationApiService().getChargeProfileFactorList(params);
		return result.data;
	}

	const downloadButton = async (params?: object) => {
		const changeFields = new Map([ // field명 변경할 field 목록
      ["chargeFactorCode", "chargeFactorName"],
      ["congestionLevelCode", "congestionLevel"],
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
    await StationApiService().downloadExcelChargeProfileFactor(excelParams);
	}

	const addButton = () => {
		navigate("/station/charge-profile/factor/add")
	}

	const gridInfoMessage = () => {
		return (
			<span className="c-red">
				{/* ※ Factor를 신규 등록하거나 수정을 하시는 경우에는 충전 프로파일 조건 설정 화면에서 [업데이트]를 해주셔야 조합 테이블이 변경됩니다. */}
				{t('station.factor_grid_info_message')}
			</span>
		)
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<ChargeProfileFactorDto>>(
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
			queryKey: "chargeProfileFactor",
			downloadButton,
			addButton,
			gridInfoMessage,
		},
	);

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//충전팩터구분
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCHGFCT'});
		const factors = res.data;
		//번잡도 범위값
		const res2 = await CodeApiService().getCodesByGroupCode({groupCode:'SMCNFCOG'});
		const conCodes = res2.data;

		setInitColumn([factors, conCodes])
	}


	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'chargeFactorCode') v.selectData = seletData[0];
			if (v.field === 'congestionLevelCode') v.selectData = seletData[1];
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
			{/* 충전 프로파일 Factor 관리 */}
			<Header headName={t('station.charge_profile_factor_management')} />
			<GridCommonComponent
				{...gridProps}
				onSearch={getChargeProfileFactorList}
				ref={gridRef}
			/>
		</>
	);
}
