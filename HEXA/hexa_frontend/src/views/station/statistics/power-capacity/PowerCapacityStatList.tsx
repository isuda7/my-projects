/**
 * 스테이션별 전력사용량 Component
 * URL: /station/statistics/power-capacity
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
import { getFormattedTime, formatNumber } from "@/utils/common";

/* Types */
import { MONTHS_LIST } from "@/views/station/constants"
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationStatDto } from "@/utils/apiService/type/station/StationStatistics";

export default function PowerCapacityStatList() {
	const { t, i18n } = useTranslation();
	const showAlert = useAlert();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	const [dateProps, setDateProps] = useState<any>({
		year: Number(getFormattedTime(new Date(), 'YYYY')),
		month: null,
	})

	const CustomTextColorCell = (props: any) => {
		const value = props.dataItem[props.field]
		if(!value && value !== 0) return <>-</>
		let textColor;
		let textAst;

		if (value < 1000 || value > 50000) {
			textColor = "c-red";
			textAst = true;
		}

		return (
			<span className={textColor}>
				{formatNumber(value)}
				{textAst ? "*" : ""}
			</span>
		);
	};

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
			field: "isUnused",
			title: t('station.is_unused'), //'미사용여부',
			width: 100,
			align: 'center',
			filterable: true,
			filterType: 'select',
			selectData: [
				{code: true, value: 'Y'},
				{code: false, value: 'N'},
			],
			locked: true,
		},
		{
			field: "unusedAt",
			title: t('station.unused_registration_date'), //'미사용 등록일',
			width: 120,
			cellType: 'dateTime',
			locked: true,
		},
		{
			field: "total",
			title: `${t('station.all')}(Wh)`, //'전체(Wh)',
			width: 100,
			align: 'right',
			cellType: 'number',
			locked: true,
		},
	]
	const [columns, setColumns] = useState<GridHeader[]>([])

	const getStationUsageWhStat = async (params: any) => {
		const result: any = await StationApiService().getStationUsageWhStat(params);
		const content = processData(result.data.content)
		setInfoMessage(content)
		setColumnData();

		return {
			...result.data,
			content,
		};
	}

	const processData = (list: any[]) => {
		const processList = [...list];
		const current = new Date();
		const curYear = getFormattedTime(current, 'YYYY');
		const curMonth = getFormattedTime(current, 'MM');
		const curDay = getFormattedTime(current, 'DD');

		/**
		 * 년 검색시
		 * 현재년도=검색년도 + 현재월이 12월이 아닐때
		 * 현재 월 이후의 월값들 모두 null처리
		 * 월 검색시
		 * 현재년도=검색년도 + 검색월>=현재월
		 * 검색월이 현재월보다 크다면 모든 데이터 null처리
		 * 검색월=현재월이라면 현재일 이후의 검색값들 모두 null처리
		 */

		//현재년도 검색일때
		if(Number(dateProps.year) === Number(curYear)) {
			processList.forEach((data: StationStatDto) => {
				//월, 일자를 제외한 나머지 항목 분리
				const { installedAt, isUnused, stationId, stationName, unusedAt, total, ...another} = data;

				//현재 월 검색일경우
				if(dateProps.month !== null && Number(curMonth) === Number(dateProps.month)) {
					for(let key in another) {
						const keyArr = key.split('-');
						if(Number(keyArr[1]) > Number(curDay)) {
							data[key] = null;
						}
					}
				}
				//현재 월 이후의 월 검색일경우
				else if(dateProps.month !== null && Number(curMonth) < Number(dateProps.month)) {
					for(let key in another) {
						data[key] = null;
					}
				}
				//연도 전체검색이며 현재월이 12월이 아닐경우
				else if(dateProps.month === null && curMonth !== '12') {
					for(let key in another) {
						if(Number(key) > Number(curMonth)) {
							data[key] = null;
						}
					}
				}
			})
		}
		//console.log('processList', processList)
		return processList
	}

	/**
	 * 조회한 데이터에 이상 데이터가 존재할경우 그리드 info message를 보여줌
	 */
	const setInfoMessage = (list: StationStatDto[]) => {
		let errorFlag = false;

		for(let i=0; i<list.length; i++) {
			const {installedAt, isUnused, stationId, stationName, total, unusedAt, ...valueObj } = list[i];
			console.log('valueObj', valueObj)
			for(let key in valueObj) {
				if(valueObj[key] !== null && (valueObj[key] < 1000 || valueObj[key] > 5000)) {
					errorFlag = true;
					break;
				}
			}
		}

		let gridInfoMessage;
		if(errorFlag) {
			gridInfoMessage = 
				<span className="c-red">
					{/* * 정상 범위를 벗어난 전력량 이상 감지한 상태입니다. */}
					{`* ${t('station.out_of_normal_power_usage_range')}`}
				</span>
		}

		setGridProps({
			...gridProps,
			gridInfoMessage,
		})
	}

	const downloadButton = async (params?: object) => {
		const excelMap = columns.map(v => ({[v.field]: v.title }))

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationUsageWhStat(excelParams);
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
			queryKey: "stationPowerCapacity",
			downloadButton,
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
				// showAlert({message: '월 정보가 없습니다.'})
				showAlert({message: t('station.no_mapping_month_alert')})
				return;
			}

			const date = new Date(dateProps.year, monthIndex, 0);
			const totalDate = date.getDate();

			for(let i=0; i<totalDate; i++) {
				newColumn.push({
					field: `${monthObj?.value}-${padNumber(i+1)}`,
					title: `${monthIndex}/${i+1}`,
					width: 80,
					align: 'center',
					cell: (props: any) =>  <CustomTextColorCell {...props} />,
					sortable: false,
				})
			}
		}
		else {
			MONTHS_LIST.forEach(v => {
				newColumn.push({
					field: v.value,
					title: t(`short_date.${v.shortName}`),
					width: 100,
					align: 'center',
					cell: (props: any) =>  <CustomTextColorCell {...props} />,
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
			{/* 전력사용량 */}
			<Header headName={t('station.power_usage_by_station')} />

			<YearMonthSearchBox 
				dateProps={dateProps}
				setDateProps={setDateProps}
				searchEvent={searchEvent}
			/>

			<GridCommonComponent
				{...gridProps}
				onSearch={getStationUsageWhStat}
				ref={gridRef}
				searchParams={{
					year: dateProps.year,
					month: dateProps.month,
				}}
			/>
		</>
	);
}
