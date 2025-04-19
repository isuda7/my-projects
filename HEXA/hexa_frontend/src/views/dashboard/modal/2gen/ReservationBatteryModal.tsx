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
import {Button} from "@progress/kendo-react-buttons";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import {openDashboardDetail} from "@/utils/common.ts";
import {GridCustomCellProps} from "@progress/kendo-react-grid";

interface Props {

}

export default function ReservationBatteryModal() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);
	const [data, setData] = useState();
	const role = useAppSelector(roleSelector);


	const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
		const state = {stationId: dataItem.stationId}
		openDashboardDetail(role, '2', state.stationId);
	}

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "generation",
			title: t('station.generation_type'), //"스테이션 ID",
			width: 90,
			align: 'center',
			cell: (props: GridCustomCellProps) => {
				return (
					<span className={`flag-2`}>{t("battery.second_generation")}</span>
				);
			}
		},
		{
			field: "btryId",
			title: t("battery.battery_id"),
			width: 140,
			filterable: true,
			align: 'center',
		},
		{
			field: "rsrvId",
			title: t("battery.reservation_id"),
			width: 140,
			filterable: true,
			align: 'center',
		},
		{
			field: "vehicleId",
			title: t("battery.vehicle_id"),
			width: 200,
			filterable: true,
			align: 'center',
		},
		{
			field: "stationId",
			title: t("station.station_id"), //"스테이션 ID",
			width: 140,
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
			field: "reserveStatusName",
			title: t("common.status"), //"스테이션상태",
			width: 90,
		},

	])

	const getReservationBatList = async (params: any) => {

		const result = await DashboardApiService().getRsrvBatteryList(params);
		setData(result.data);
		return result.data;
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDto>>(
		{
			gridHeight: 610,
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
	}, [columns]);

	const gotoBatReserve = () =>{
		navigate("/battery/reserv-history")
	}

	return (
		<>

			<div className="dialog-box">
				<section className="section">
					<div className="sort-group type-dark">
						<div className="sort-group__counter">
							<span className="total">
								{t("grid.total")} <span> {data?.paging?.totalElements || 0}</span>
							</span>
						</div>
						<div className="group-align-right">
							<Button
								fillMode="flat"
								className="btn-arr-dark"
								onClick={gotoBatReserve}
							>
								배터리 예약 이력
							</Button>
						</div>
					</div>
					<div className="grid-dark">
						<GridCommonComponent
							{...gridProps}
							onSearch={getReservationBatList}
							ref={gridRef}
						/>
					</div>
				</section>
			</div>
		</>
);
}
