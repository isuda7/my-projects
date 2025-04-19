/**
 * 충전 프로파일 관리 등록, 상세 > 조건Matrix 선택 모달 Component
 * URL: /station/charge-profile/management/add > 조건Matrix 선택
 * URL: /station/charge-profile/management/detail > 조건Matrix 선택
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
import { ChargeProfileMatrixDto } from "@/utils/apiService/type/station/ChargeProfileMatrixDto";


export default function ChargeProfileMatrixModal(props: any) {
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
			field: "id",
			title: t('station.matrix_no'), //조건NO',
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "temperature",
			title: `${t('station.temperature')}(℃)`, //'온도(℃)',
			width: 150,
			align: 'center',
			sortable: false,
		},
		{
			field: "soc",
			title: `${t('common.SOC')}(%)`, //'SOC(%)',
			width: 150,
			align: 'center',
			sortable: false,
		},
		{
			field: "soh",
			title:  `${t('common.SOH')}(%)`, //'SOH(%)',
			width: 150,
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
			field: "createdAt",
			title: t('common.creation_datetime'), //'생성일시',
			cellType: "dateTime",
		},
	])

	const getChargeProfileMatrixPopupList = async (params: any) => {
		const result: any = await StationApiService().getChargeProfileMatrixPopupList(params);
		const process = [...result.data.content];
		process.forEach(v => {
			v.uniqueId = v.id;
		})
		result.data.content = process;
		return result.data;
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<ChargeProfileMatrixDto>>(
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
			checkKey: 'uniqueId',
			queryKey: "chargeProfileMatrixPopup",
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
			//'선택된 데이터가 없습니다.'
			showAlert({message: t('common.no_select_results')});
			return;
		}

		setModalSeletedData(rows);
	}

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//번잡도
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCNFCOG'});
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

	return (
		<Dialog title={t('station.condition_config')} onClose={onClose}> {/* 조건 설정 */}
			<div className="dialog-box pop-l">
				<DateRange
					setDateRangeProps={setDateRangeProps}
					dateRangeProps={dateRangeProps}
					searchEvent={searchEvent}
				/>
				<GridCommonComponent
					{...gridProps}
					onSearch={getChargeProfileMatrixPopupList}
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
