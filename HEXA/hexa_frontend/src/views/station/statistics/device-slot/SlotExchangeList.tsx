/**
 * 함체, 슬롯별 교환횟수 > 슬롯 Component
 * URL: /station/statistics/device-slot > 슬롯 탭
 */

/* React */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import YearMonthSearchBox from "@/views/station/components/YearMonthSearchBox";
import { getFormattedTime } from "@/utils/common";
import _ from 'lodash';

/* Types */
import { MONTHS_LIST } from "@/views/station/constants"
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StatDeviceSwapDto } from "@/utils/apiService/type/station/StationStatistics";

export default function SlotExchangeList() {
	const { t, i18n } = useTranslation();
	const showAlert = useAlert();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	const [dateProps, setDateProps] = useState<any>({
		year: Number(getFormattedTime(new Date(), 'YYYY')),
		month: null,
	})

	const defaultColums: GridHeader[] = [
		{
			field: "serialNumber",
			title: t('station.slot_serial_number'), //'슬롯 S/N',
			width: 140,
			filterable: true,
			locked: true,
		},
		{
			field: "manufacturedAt",
			title: t('station.production_date'), //'생산일',
			width: 120,
			cellType: 'date',
			align: 'center',
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
			field: "total",
			title: t('station.accumulated'), //'누적',
			width: 100,
			align: 'center',
			locked: true,
		},
	]
	const [columns, setColumns] = useState<GridHeader[]>([])

	const getStationStatDeviceSwapCount = async (params: any) => {
		const result = await StationApiService().getStationStatDeviceSwapCount(params, 'slt');
		setColumnData();
		return result.data;
	}

	const downloadButton = async (params?: object) => {
		const excelMap = columns.map(v => ({[v.field]: v.title }))

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationStatDeviceSwapCount(excelParams, 'slt');
	}

	const gridInfoMessage = () => {
    return (
      <span className="c-red">
				{`※${t('station.no_connection_station_info_message')}`}
        {/* ※ 현재 연결된 스테이션이 없는 경우, 스테이션명이 출력되지 않습니다. */}
      </span>
    )
  }

	const [gridProps, setGridProps] = useState<CommonGridProps<StatDeviceSwapDto>>(
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
			queryKey: "stationExchangeStatic",
			downloadButton,
			gridInfoMessage,
			gridClassName: 'grid-row-color',
		},
	);

	const padNumber = (num: number): string => num.toString().padStart(2, '0');

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
					field: `${monthObj?.value}-${padNumber(i+1)}`,
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
			{/* 슬롯별 교환횟수 */}
			<YearMonthSearchBox 
				dateProps={dateProps}
				setDateProps={setDateProps}
				searchEvent={searchEvent}
			/>

			<GridCommonComponent
				{...gridProps}
				onSearch={getStationStatDeviceSwapCount}
				ref={gridRef}
				searchParams={{
					year: dateProps.year,
					month: dateProps.month,
				}}
			/>
		</>
	);
}
