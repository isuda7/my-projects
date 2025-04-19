/**
 * 펌웨어 배포 관리 - 대기중 스테이션 Modal Component
 * URL: /station/firmware/deploy -> 대상스테이션-대기중 클릭
 */

/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Dialog } from "@progress/kendo-react-dialogs";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import { getFormattedTime } from "@/utils/common";
import _ from 'lodash';

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationTargetInfoDto } from "@/utils/apiService/type/station/StationInfoDto";


export default function StationFirmwareWaitListModal(props: any) {
	const { t } = useTranslation();
	const { onClose, modalProps } = props;

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t("station.station_id"), //"스테이션 ID",
			width: 200,
			filterable: true,
		},
		{
			field: "name",
			title: t("station.station_name"), //"스테이션 명",
			width: 200,
			filterable: true,
		},
	])

	const getStationFirmwareWaitList = async (params: any) => {
		const result = await StationApiService().getStationFirmwareWaitList(params, modalProps.id);
		console.log('result', result)
		return result.data;
	}

	const gridInfoMessage = () => {
		//※ ‘대기중’인 스테이션 목록입니다. 스테이션에서 응답이 없는 상태입니다.
    return <span style={{color: 'red'}}>{`※ ${t('station.wait_station_info_message')}`}</span>
  }

	const downloadButton = async(params: any) => {
		const excelMap = columns.map(v => ({[v.field]: v.title}));

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationFirmwareWait(excelParams, modalProps.id);
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationTargetInfoDto>>(
		{
			gridHeight: 300,
			columnHeader: columns,
			defaultFilter: true,
			sortableGrid: true,
			unsorted: true,
			multipleSorting: true,
			//isReorder: false,
			//isResizable: true,
			girdToolBar: true,
			displayCount: [20, 50, 100],
			queryKey: "stationFirmwareWait",
			gridInfoMessage,
			downloadButton,
		},
	);

	useEffect(() => {

	}, [])

	useEffect(() => {
		setGridProps({
			...gridProps,
			columnHeader: columns,
		})
	}, [columns])

	return (
		<Dialog title={t('station.pending_station_list')} onClose={onClose}> {/* 대기중 스테이션 목록 */}
			<div className="dialog-box pop-m">
				<section className="section">
					{/* 검색 박스 */}
					<div className="search-group">
						<dl className="search-group__txt">
							<div>
								<dt>{`${t('station.ota_id')} : `}</dt> {/* OTA ID */}
								<dd>{modalProps.id}</dd>
							</div>
							<div>
								<dt>{`${t('station.deploy_datetime')} : `}</dt> {/* 배포일시 */}
								<dd>{getFormattedTime(modalProps.deployedAt)}</dd>
							</div>
						</dl>
					</div>
				</section>

				<GridCommonComponent
					{...gridProps}
					onSearch={getStationFirmwareWaitList}
				/>
			</div>
		</Dialog>
	);
}
