/**
 * 스테이션별 예약 건수
 * URL: /station/statistics/reservation
 */

/* React */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import YearMonthSearchBox from "@/views/station/components/YearMonthSearchBox";
import _ from 'lodash';
import { getFormattedTime } from "@/utils/common";

/* Types */
import { MONTHS_LIST } from "@/views/station/constants"
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationStatDto } from "@/utils/apiService/type/station/StationStatistics";

export default function StationReservationList() {
	const { t, i18n } = useTranslation();
	const showAlert = useAlert();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	const [dateProps, setDateProps] = useState<any>({
		year: Number(getFormattedTime(new Date(), 'YYYY')),
		month: null,
	})

	const defaultColums: GridHeader[] = [
		{
			field: "stationId",
			title: t('station.station_id'), //'스테이션ID',
			width: 140,
			filterable: true,
			locked: true,
		},
		{
			field: "stationName",
			title: t('station.station_name'), //'스테이션명',
			width: 140,
			filterable: true,
			locked: true,
		},
		{
			field: "installedAt",
			title: t('station.installation_date'), //'설치일',
			width: 120,
			cellType: 'date',
			locked: true,
		},
		{
			field: "total",
			title: t('station.accumulated'), //'누적',
			width: 100,
			align: 'center',
			locked: true,
		},
	]
	const [columns, setColumns] = useState<GridHeader[]>([])

	const getStationReservationStat = async (params: any) => {
		const result = await StationApiService().getStationReservationStat(params);
		setColumnData();
		return result.data;
	}

	const downloadButton = async (params?: object) => {
		const excelMap = columns.map(v => ({[v.field]: v.title }))

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationReservationStat(excelParams);
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationStatDto>>(
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
			displayCount: [20, 50, 100],
			isFilterResetButton: true,
			isGridResetButton: true,
			isColumnSelectShowButton: true,
			queryKey: "stationReservationStatic",
			downloadButton,
			gridClassName: 'grid-row-color',
		},
	);

	const formatNumber = (num: number): string => num.toString().padStart(2, '0');

	/**
	 * 컬럼 월 세팅
	 * @param seletData 
	 */
	const setColumnData = () => {
		const newColumn = _.cloneDeep(defaultColums);

		if(dateProps.month) {
			const monthObj = MONTHS_LIST.find((v:any) => Number(v.value) === dateProps.month)
			const monthIndex = Number(monthObj?.value)
			if(monthIndex === -1) {
				//throw new Error('월 정보가 존재하지 않음');
				showAlert({message: t('station.no_mapping_month_alert')})
				return;
			}

			const date = new Date(dateProps.year, monthIndex, 0);
			const totalDate = date.getDate();
			console.log('totalDate', totalDate);

			for(let i=0; i<totalDate; i++) {
				
				newColumn.push({
					field: `${monthObj?.value}-${formatNumber(i+1)}`,
					title: `${monthIndex}/${i+1}`,
					width: 80,
					align: 'center',
					sortable: false,
				})
			}
		}
		else {
			MONTHS_LIST.forEach((v: any) => {
				newColumn.push({
					field: v.value,
					title: t(`short_date.${v.shortName}`),
					width: 80,
					align: 'center',
					sortable: false,
				})
			})
		}
		setColumns(newColumn)
	}

	useEffect(() => {
		setColumnData();
	}, [])

	useEffect(() => {
		setGridProps({
			...gridProps,
			columnHeader: columns,
			downloadButton,
		})
	}, [columns])

  const searchEvent = () => {
		if (gridRef.current) {
			gridRef.current.refetchGrid();
		}
	}

	return (
		<>
			{/* 스테이션별 예약건수 */}
			<Header headName={t('station.station_reservation_count_by_device')} />

			<YearMonthSearchBox 
				dateProps={dateProps}
				setDateProps={setDateProps}
				searchEvent={searchEvent}
			/>

			<GridCommonComponent
				{...gridProps}
				onSearch={getStationReservationStat}
				ref={gridRef}
				searchParams={{
					year: dateProps.year,
					month: dateProps.month,
				}}
			/>
		</>
	);
}
