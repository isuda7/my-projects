/**
 * 스테이션 정보 관리 Component
 * URL: /station/info/management
 */

/* React */
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

/* Kendo UI */
/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import useAlert from "@/hooks/useAlert.tsx";

/* Types */
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {StationFirmwareDto} from "@/utils/apiService/type/station/StationFirmwareDto.ts";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import {openDashboardDetail} from "@/utils/common.ts";

interface Props {
	generation: string;
}

export default function LockedBatteryModal({generation}: Props) {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const role = useAppSelector(roleSelector);
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);
	const [data, setData] = useState();


	const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
		const state = {stationId: dataItem.stationId}
		// window.open(`/station/info/management/detail/${state.id}`, '_blank')
		openDashboardDetail(role, '2', state.stationId);
	}

	const [columns, setColumns] = useState<GridHeader[]>([

		{
			field: `${generation == '2' ? 'btryId' : 'slotBatteryId' }`,
			title: t("battery.battery_id"),
			width: 140,
			filterable: true,
			align: 'center',
		},
		{
			field: "stationId",
			title: t("station.station_id"), //"스테이션 ID",
			width: 120,
			filterable: true,
			align: 'center',
			cellClick: (e, dataItem) => cellClickFunction(e, dataItem)
		},
		{
			field: "stationName",
			title: t("station.station_name"), //"스테이션 명",
			width: 140,
			filterable: true,
			align: 'center',
		},
		{
			field: "qrId",
			title: t("station.qr_id"), //"QR ID",
			width: 90,
			filterable: true,
			align: 'center',
		},
		{
			field: "positionNumber",
			title: t("station.slot_no"),
			width: 110,
			filterable: true,
			selectData: [
				{code: 1, value: "01"},{code: 2, value: "02"},{code: 3, value: "03"},{code: 4, value: "04"},{code: 5, value: "05"},
				{code: 6, value: "06"},{code: 7, value: "07"},{code: 8, value: "08"},{code: 9, value: "09"},{code: 10, value: "10"},
				{code: 11, value: "11"},{code: 12, value: "12"},{code: 13, value: "13"},{code: 14, value: "14"},{code: 15, value: "15"},
				{code: 16, value: "16"},{code: 17, value: "17"},{code: 18, value: "18"},{code: 19, value: "19"},{code: 20, value: "20"},
				{code: 21, value: "21"},{code: 22, value: "22"},{code: 23, value: "23"},{code: 24, value: "24"},{code: 25, value: "25"},
				{code: 26, value: "26"},{code: 27, value: "27"},{code: 28, value: "28"},{code: 29, value: "29"},{code: 30, value: "30"}
			],
			filterType: 'multiSelect',
			cellType: 'select',
		},
		{
			field: "statusCode",
			title: t("common.status"), //"스테이션상태",
			width: 90,
		},

	])

	const getLockedBatList = async (params: any) => {
		const result = generation == '2' ?
			await DashboardApiService().getLockBatteryList(params)
			: await DashboardApiService().get1stLockBatteryList(params);
		setData(result.data);
		return result.data;
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDto>>(
		{
			gridHeight: 600,
			columnHeader: columns,
			unsorted: true,
			isReorder: false,
			isResizable: true,
			defaultFilter: true,
			// checkKey: "tsId",
			queryKey: "getReservationBatList",
		},
	);

	const searchEvent = () => {
		if (gridRef.current) {
			gridRef.current.refetchGrid();
		}
	}


	useEffect(() => {
		document.body.classList.add("dark");

		return function cleanup() {
			document.body.classList.remove("dark");
		};
	}, [])

	useEffect(() => {
		setGridProps({
			...gridProps,
			columnHeader: columns,
		})
	}, [columns])



	return (
		<>

			<div className="dialog-box pop-l">
				<section className="section">
					<div className="sort-group type-dark">
						<div className="sort-group__counter">
                    <span className="total">
                      {t("grid.total")} <span> {data?.paging?.totalElements || 0}</span>
                    </span>
						</div>
					</div>
					<div className="grid-dark">
						<GridCommonComponent
							{...gridProps}
							onSearch={getLockedBatList}
							ref={gridRef}
						/>
					</div>
				</section>
			</div>
		</>
);
}
