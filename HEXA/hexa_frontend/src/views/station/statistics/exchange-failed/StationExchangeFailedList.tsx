/**
 * 스테이션별 누적 교환 실패 횟수 Component
 * URL: /station/statistics/exchange-failed
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
import { StationFailStatDto } from "@/utils/apiService/type/station/StationStatistics";

export default function StationExchangeFailedList() {
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
			field: "col1",
			title: t('station.total_failed'), //'누적 실패',
			locked: true,
			children: [
				{
					field: "authFail",
					title: t('station.authentication_failed'), //'인증 실패',
					width: 100,
					locked: true,
					align: 'center',
				},
				{
					field: "swapFail",
					title: t('station.exchange_failed'), //'교환 실패',
					width: 100,
					locked: true,
					align: 'center',
				},
				{
					field: "total",
					title: t('station.accumulated'), //'누적',
					width: 100,
					locked: true,
					align: 'center',
				},
			]
		},
	]
	const [columns, setColumns] = useState<GridHeader[]>([])

	const getStationStatAccSwapFailCount = async (params: any) => {
		const result = await StationApiService().getStationStatAccSwapFailCount(params);
		const pageData: any = processData(result.data)
		console.log('getStationStatAccSwapFailCount pageData', pageData)
		setColumnData();
		return pageData;
	}

	const downloadButton = async (params?: object) => {

    const excelMap = columns
      .flatMap(v => v.children ? v.children : v)
      .flatMap(v => {
				if(String(v.field).includes('_')) {
					const match: any = String(v.field).split('_');
					let newTitle = '';
					if(dateProps.month) {
						newTitle = match[0] + ' ' + v.title;
					}
					else {
						const monthObj = MONTHS_LIST.find(v => v.value === match[0])
						newTitle = t(`short_date.${monthObj?.shortName}`) + ' ' + v.title;
					}
					return [{ [v.field]: newTitle }];
				}
        return [{ [v.field]: v.title }];
      }
    );

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }

    await StationApiService().downloadExcelStationStatAccSwapFailCount(excelParams);
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationFailStatDto>>(
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
			queryKey: "stationExchangeFailed",
			downloadButton,
			gridClassName: 'grid-row-color',
			parentShowHideFlag: true,
		},
	);

	const padNumber = (num: number): string => num.toString().padStart(2, '0');

	/**
	 * 조회해 온 데이터를 그리드에 표현할수있도록 가공해줌
	 * 월, 일 Object의 데이터를 풀어 새로운 이름으로 새 데이터에 넣어줌
	 * @param data 
	 */
	const processData = (data: any) => {
		console.log('processData data', data)
		const list: StationFailStatDto[] = data.content;
		const content: any = [];
		
		list.forEach((data: StationFailStatDto) => {
			const { stationId, stationName, installedAt, swapFail, authFail, 
							total, isUnused, unusedAt, ...another} = data;
			const obj: any = {
				stationId,
				stationName,
				installedAt,
				swapFail,
				authFail,
				total,
			}

			for(let key in another) {
				obj[`${key}_authFail`] = another[key]['authFail'];
				obj[`${key}_swapFail`] = another[key]['swapFail'];
				obj[`${key}_total`] = another[key]['total'];
				// obj[`authFail${key}`] = another[key]['authFail'];
				// obj[`swapFail${key}`] = another[key]['swapFail'];
				// obj[`total${key}`] = another[key]['total'];
			}
			content.push(obj);
		})
		console.log('processData content', content)
		return {
			content,
			paging: data.paging,
		}
	}

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
					field: `col${monthObj?.value}-${padNumber(i+1)}`,
					title: `${monthIndex}/${i+1}`,
					children: [
						{
							field: `${monthObj?.value}-${padNumber(i+1)}_authFail`,
							title: t('station.authentication_failed'), //인증 실패
							width: 100,
							align: 'center',
							sortable: false,
						},
						{
							field: `${monthObj?.value}-${padNumber(i+1)}_swapFail`,
							title: t('station.exchange_failed'), //교환 실패
							width: 100,
							align: 'center',
							sortable: false,
						},
						{
							field: `${monthObj?.value}-${padNumber(i+1)}_total`,
							title: t('station.subtotal'), //소계
							width: 100,
							align: 'center',
							sortable: false,
						},
					]
				})
			}
		}
		else {
			MONTHS_LIST.forEach((v: any) => {
				newColumn.push({
					field: `col${v.value}`,
					title: t(`short_date.${v.shortName}`),
					children: [
						{
							field: `${v.value}_authFail`,
							title: t('station.authentication_failed'), //인증 실패
							width: 100,
							align: 'center',
							sortable: false,
						},
						{
							field: `${v.value}_swapFail`,
							title: t('station.exchange_failed'), //교환 실패
							width: 100,
							align: 'center',
							sortable: false,
						},
						{
							field: `${v.value}_total`,
							title: t('station.subtotal'), //소계
							width: 100,
							align: 'center',
							sortable: false,
						},
					]
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
			{/* 스테이션별 누적 교환 실패횟수 */}
			<Header headName={t('station.station_total_failure_count_by_device')} />

			<YearMonthSearchBox 
				dateProps={dateProps}
				setDateProps={setDateProps}
				searchEvent={searchEvent}
			/>

			<GridCommonComponent
				{...gridProps}
				onSearch={getStationStatAccSwapFailCount}
				ref={gridRef}
				searchParams={{
					year: dateProps.year,
					month: dateProps.month,
				}}
			/>
		</>
	);
}
