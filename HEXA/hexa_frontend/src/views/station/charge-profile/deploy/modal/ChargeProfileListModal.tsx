/**
 * 충전 프로파일 배포 등록, 상세 > 충전 프로파일 정보 > 충전프로파일 선택 Modal Component
 * URL: /station/charge-profile/deploy/add > 충전 프로파일 정보 > 충전프로파일 선택 Modal
 * URL: /station/charge-profile/deploy/detail > 충전 프로파일 정보 > 충전프로파일 선택 Modal
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
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import CustomMatrixIdsCell from "../../common/CustomMatrixIdsCell"

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationChargeProfileDto } from "@/utils/apiService/type/station/StationChargeProfileDto";


export default function ChargeProfileListModal(props: any) {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const { onClose, setModalSeletedData } = props;
	const gridRef = useRef<{ refetchGrid: () => void, getSeletedDataItems: () => any[] }>(null);

	/**
	 * DateRange Component 초기값, DateRange 컴포넌트의 부모 컴포넌트에서 작성한다
	 */
	const now = new Date();
	const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
		startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0, 0, 0), //시작일자 초기값
		endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59), //종료일자 초기값
		format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
		allFlag: false,
		type: 'date',
		initState: 'week'
	});

	const cellTypeProps = {
		minimumFractionDigits: 3,
		maximumFractionDigits: 3,
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
		},
		{
			field: "current",
			title: `${t("station.ampere")}(C)`, //"전류(C)",
			width: 80,
			align: 'center',
		},
		{
			field: "voltage",
			title:  `${t("station.voltage")}(V)`, //"전압(V)",
			width: 80,
			align: 'center',
		},
		{
			field: "cutoff",
			title:  `${t("station.cutoff_current")}(C)`, //"Cutoff current(C)",
			width: 80,
			align: 'center',
		},
		{
			field: "chargeModeCode",
			title:  t('station.charge_mode'), //`충전 Mode`,
			width: 100,
			filterable: true,
			align: 'center',
			selectData: [],
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: 'col01',
			title: t('station.derating_factor1'), //'Derating Factor 1(전류)',
			children: [
				{
					field: "deratingValue1",
					title: t('station.derating_value'), //`값`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMin1",
					title: t('station.derating_min'), //`최소`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMax1",
					title: t('station.derating_max'), //`최대`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
			]
		},
		{
			field: 'col02',
			title: t('station.derating_factor2'), //'Derating Factor 2(전압)',
			children: [
				{
					field: "deratingValue2",
					title: t('station.derating_value'), //`값`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMin2",
					title: t('station.derating_min'), //`최소`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMax2",
					title: t('station.derating_max'), //`최대`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
			]
		},
		{
			field: "isDefault",
			title: t('station.is_default'), //"기본여부",
			width: 120,
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
			title: t('station.matrix_no'), //"조건 NO",
			width: 120,
			filterable: true,
			align: 'center',
			sortable: false,
			cell: (props: any) => <CustomMatrixIdsCell {...props} />,
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
	])

	const getStationChargeProfileList = async (params: any) => {
		const result: any = await StationApiService().getStationChargeProfileList(params);
		const content = result.data.content;
		content.forEach((v: any) => v.uniqueId = v.id)
		
		return {
			...result.data,
			content,
		}
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationChargeProfileDto>>(
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
			checkKey: "uniqueId",
			queryKey: "chargeProfileModal",
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
			//선택된 데이터가 없습니다.
			showAlert({message: t('common.no_select_results')});
			return;
		}

		if(rows.length > 1) {
			//하나의 데이터만 선택해주세요.
			showAlert({message: t('common.select_one_data')});
			return;
		}

		setModalSeletedData(rows, 'chargeProfile');
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

	return (
		<Dialog title={t('station.charging_profile_selection')} onClose={onClose}> {/* 충전 프로파일 선택 */}
			<div className="dialog-box">
				<DateRange
					setDateRangeProps={setDateRangeProps}
					dateRangeProps={dateRangeProps}
					searchEvent={searchEvent}
				/>
				<GridCommonComponent
					{...gridProps}
					onSearch={getStationChargeProfileList}
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
