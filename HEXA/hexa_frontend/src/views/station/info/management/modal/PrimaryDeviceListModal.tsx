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
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";


export default function PrimaryDeviceListModal(props: any) {
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
      field: "modelName",
      title: t("station.category"), //"구분",
			width: 100,
			filterable: true,
		},
		{
      field: "qrId",
      title: t("station.qr_id"), //"QR ID",
			width: 120,
			filterable: true,
		},
		{
			field: "primarySerialNumber",
			title: t("station.case_serial_number"), //"함체 S/N",
			width: 200,
			filterable: true,
		},
		{
			field: "primaryManufacturedAt",
			title: t("station.production_date"), //"생산일",
			cellType: "date",
			width: 120,
		},
	])

	const getStationDeviceSearchPrimary = async (params: any) => {
		const result = await StationApiService().getStationDeviceSearchPrimary(params);
		return result.data;
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDto>>(
		{
			gridHeight: 467,
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
			queryKey: "primaryDevice",
			rowSelectable: true,
			//isChecked: true,
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

		setModalSeletedData(rows);
	}

	useEffect(() => {

	}, [])

	useEffect(() => {
		setGridProps({
			...gridProps,
			columnHeader: columns,
		})
	}, [columns])

	return (
		<Dialog title={t('station.device_select')} onClose={onClose}> {/* 기기 선택 */}
			<div className="dialog-box pop-l">
				<DateRange
					setDateRangeProps={setDateRangeProps}
					dateRangeProps={dateRangeProps}
					searchEvent={searchEvent}
				/>
				<GridCommonComponent
					{...gridProps}
					onSearch={getStationDeviceSearchPrimary}
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
