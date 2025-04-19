/**
 * 스테이션 충전 이력 Component
 * URL: /station/history/charge
 */

/* React */
import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import DateRange, { DateRangeProps } from "@/components/common/DateRange.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

//Types
import { StationChargeHistoryDto } from "@/utils/apiService/type/station/StationChargeProfileDto";
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";


export default function StationHistoryCharge() {
  const {t} = useTranslation();
	const showAlert = useAlert();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);

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
		initState: 'week',
		labelList: ['충전 시작 기간']
	});

  const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "stationId",
			title: t('station.station_id'), //"스테이션 ID",
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "stationName",
			title: t('station.station_name'), //"스테이션명",
			width: 140,
			filterable: true,
		},
		{
			field: "slotNumber",
			title: t('station.slot_no'), //"슬롯번호",
			width: 100,
			filterable: true,
			selectData: [],
			filterType: 'multiSelect',
			cellType: 'select',
			align: 'center',
		},
		{
			field: "btryId",
			title: t('station.battery_id'), //"배터리ID",
			width: 130,
			filterable: true,
			align: 'center'
		},
		{
			field: "chgProfileNo",
			title: t('station.charge_profile_no'), //"충전 프로파일 NO",
			width: 130,
			filterable: true,
			align: 'center'
		},
		{
			field: "condition",
			title: t('station.charging_condition'), //"충전 조건",
			width: 130,
			filterable: true,
			align: 'center'
		},
		{
			field: "chargeStartTime",
			title: t('station.charging_start_datetime'), //'충전 시작 일시',
			cellType: "dateTime",
			width: 120,
		},
		{
			field: "chargeEndTime",
			title: t('station.charging_end_datetime'), //'충전 종료 일시',
			cellType: "dateTime",
			width: 120,
		},
		{
			field: "chargeDuration",
			title: t('station.charging_duration'), //'충전 시간',
			width: 120,
			align: 'center'
		},
  ])

  const getStationChargeHistoryList = async (params: any) => {
		const result = await StationApiService().getStationChargeHistoryList(params);
		return result.data;
  }

	const downloadButton = async (params?: object) =>  {
		//TODO: 추후 정상 데이터들어올때 해당 함수 정상동작하는지 확인필요
		//현재는 데이터가 너무많아 제대로 확인불가
		const excelMap = columns.map(v => ({[v.field]: v.title }))

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationChargeHistory(excelParams);
  }
	
  const [gridProps, setGridProps] = useState<CommonGridProps<StationChargeHistoryDto>>(
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
			//rowSelectable: true,
			queryKey: "stationCtrlDashboard",
			//isChecked: true,
			downloadButton,
		},
  );

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//슬롯번호
		const res: any = await CodeApiService().getCodesByGroupCode({groupCode:'SMDT'});
		
		//함체코드값 발라낸다
		const	slotList = res.data.filter((v:any) => (v.code !== 'CP' && v.code !== 'C2' && v.code !== 'C3'))

		setInitColumn([slotList])
	}

	const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if(v.field === 'slotNumber') v.selectData = seletData[0];
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
		<>
			{/* 스테이션 충전 이력 */}
			<Header headName={t('station.station_charging_history')} />
			<DateRange
        setDateRangeProps={setDateRangeProps}
        dateRangeProps={dateRangeProps}
        searchEvent={searchEvent}
      />
			<GridCommonComponent
				{...gridProps}
				onSearch={getStationChargeHistoryList}
				ref={gridRef}
				searchParams={{
          startDate: dateRangeProps?.startDate,
          endDate: dateRangeProps?.endDate,
          allFlag: dateRangeProps.allFlag,
        }}
			/>
		</>
  );
}
