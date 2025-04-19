/**
 * 충전 프로파일 조건 설정 Component
 * URL: /station/charge-profile/matrix
 */

/* React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';
import MatrixSearchBox from "./components/MatrixSearchBox";

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { ChargeProfileMatrixDto } from "@/utils/apiService/type/station/ChargeProfileMatrixDto";

export default function ChargeProfileMatrixList() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	const [ searchParams, setSearchParams] = useState<any>({
		tempMin: '',
		tempMax: '',
		socMin: '',
		socMax: '',
		sohMin: '',
		sohMax: '',
	})

	const updateMatrix = useMutation({
		mutationFn: async () => {
			return StationApiService().updateChargeProfileMatrix()
		},
		onSuccess: (response: any) => {
			//저장되었습니다.
			showAlert({message: t('common.save_success')})
			searchEvent();
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});

	const CustomMappingCell = (props: any) => {
		const value = props.dataItem[props.field];
		if(value) {
			return <span>{value}</span>
		}
		else {
			return <span className={`c-red`}>{'매핑없음'}</span>
		}
	}

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t('station.matrix_no'), //'조건NO',
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "temperature",
			title:  `${t('station.temperature')}(℃)`, //'온도(℃)',
			width: 100,
			align: 'center',
			sortable: false,
		},
		{
			field: "soc",
			title: `${t('common.SOC')}(%)`, //'SOC(%)',
			width: 100,
			align: 'center',
			sortable: false,
		},
		{
			field: "soh",
			title: `${t('common.SOH')}(%)`, //'SOH(%)',
			width: 100,
			align: 'center',
			sortable: false,
		},
		{
			field: "congestionLevelCode", 
			title: t('station.congestion_level'), //'번잡도',
			width: 100,
			filterable: true,
			selectData: [],
			align: 'center',
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "isMapped",
			title: t('station.is_mapped'), //'매핑 여부',
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
			field: "chgProfId",
			title: t('station.mapping_profile_no'), //'매핑 충전프로파일 No',
			filterable: true,
			align: 'center',
			width: 120,
			cell: (props: any) => <CustomMappingCell {...props} />,
		},
		{
			field: "createdAt",
			title: t('common.creation_datetime'), //'생성일시',
			cellType: "dateTime",
			width: 140,
			align: 'center',
		},
		{
			field: "createdUserId",
			title: t('common.creation_id'), //'생성자 ID',
			filterable: true,
			width: 120,
		},
	])

	const getChargeProfileMatrixList = async (params: any) => {
		const result = await StationApiService().getChargeProfileMatrixList(params);
		return result.data;
	}

	const downloadButton = async (params?: object) => {
		const changeFields = new Map([ // field명 변경할 field 목록
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
    await StationApiService().downloadExcelChargeProfileMatrix(excelParams);
	}

	const gridInfoMessage = () => {
		return (
			<span className="c-red">
				{/* ※ Factor를 신규 등록, 수정, 삭제를 하시는 경우에는 충전 프로파일 조건 설정 화면에서 [업데이트]를 해주셔야 조합 테이블이 변경됩니다. */}
				{t('station.factor_grid_info_message')}
			</span>
		)
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<ChargeProfileMatrixDto>>(
		{
			gridHeight: 500,
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
			queryKey: "chargeProfileMatrix",
			downloadButton,
			gridInfoMessage,
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
		//번잡도
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCNFCOG'});
		const conCodes = res.data;

		setInitColumn([conCodes])
	}


	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'congestionLevelCode') v.selectData = seletData[0];
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

	const onUpdateMatrix = () => {
		// const message = `충전 프로파일 조합 테이블을 업데이트 하시겠습니까?\n
		// 기존 설정된 테이블 정보가 모두 업데이트가 되어 매핑정보가 리셋됩니다.\n
		// 업데이트가 완료되면 충전 프로파일을 다시 매핑해주세요.`
		showAlert({
			message: t('station.matrix_update_confirm'),
			type: 'confirm',
			onConfirm: () => updateMatrix.mutate(),
		})
	}

	const buttonList = [
		<Button
			type={'button'}
			size={"medium"}
			themeColor={"primary"}
			className="btn-in-icon"
			onClick={onUpdateMatrix}
		>
			{t('station.update') /* 업데이트  */}
		</Button>,
	]

	return (
		<>
			{/* 충전 프로파일 조건 설정 */}
			<Header headName={t('station.charge_profile_matrix')} />
			<MatrixSearchBox
				setSearchParams={setSearchParams}
				searchParams={searchParams}
				searchEvent={searchEvent}
			/>
			<GridCommonComponent
				{...gridProps}
				onSearch={getChargeProfileMatrixList}
				ref={gridRef}
				buttonList={buttonList}
				searchParams={searchParams}
			/>
		</>
	);
}
