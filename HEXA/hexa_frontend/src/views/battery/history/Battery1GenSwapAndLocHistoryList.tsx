// HEXAADMBTM2S04 : 배터리 교환 및 위치 이력

import * as React from "react";
import {MouseEvent, useEffect, useRef, useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import {Grid, GridColumn as Column, GridCustomCellProps, GridNoRecords,} from "@progress/kendo-react-grid";

import {DatePicker} from "@progress/kendo-react-dateinputs";
import {TabStrip, TabStripSelectEventArguments, TabStripTab,} from "@progress/kendo-react-layout";
import Header from "@/new_components/common/Header.tsx";
import DateRange, {DateRangeProps} from "@/components/common/DateRange.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {
  BatterySwapHistExcelDto,
  BatterySwapHistRequestDto,
  BatteryUsageHistRequestDto
} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import BatteryHistApiService from "@/utils/apiService/battery/BatteryHistApiService.ts";
import {BatterySwapResponseDto} from "@/utils/apiService/type/battery/BatteryHistResponseDto.ts";
import {useTranslation} from "react-i18next";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import _ from "lodash";
import BatteryInfoExcelDownloadModal from "@/views/battery/modal/ExcelDownloadModal.tsx";
import {BsmsBatterySwapHistRequestDto} from "@/utils/apiService/type/battery/BsmsBatteryHistRequestDto.ts";

//grid
const initialDataState = {
  skip: 0,
  take: 10,
};

export default function Battery1GenSwapAndLocHistoryList() {
  //tab
  const [selected, setSelected] = React.useState<number>(0);
  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const {t} = useTranslation();
  const gridRef = useRef<{ refetchGrid: () => void, getSearchParams: () => any[]  }>(null);

  const COLUMNS: GridHeader[] = [
    {field: "registDate", title: t("battery.creation_datetime"), cellType: "dateTime"},
    {field: "btryId", title: t("battery.battery_id1"), filterable: true},
    {field: "btryPairId", title: t("battery.battery_id2"), filterable: true},
    {
      field: "funcCd",
      title: t("battery.location_status"),
      filterable: true,
      filterType: 'select',
      selectData: [],
      cell: (props: GridCustomCellProps) => {
        const type = props.dataItem.funcCd;
        const typeName = props.dataItem?.typeName;
        const textColor = () => {
          if (type === "SWAP") {
            return "c-primary";
          }
          if (type === "AUTHFAIL") {
            return "c-red";
          }
        };
        return (
          <span className={`${textColor()}`}>{typeName}</span>
        );
      }
    },
    {field: "bikeId", title: t("battery.vehicle_id"), filterable: true},
    {field: "bssId", title: t("station.station_id"), filterable: true},
    {field: "bssNm", title: t("station.station_name"), filterable: true},
    {field: "bssInBtrySlot1Loc"
      , title: t("battery.inbound_slot1")
      , filterable: true
      , filterType: 'select'
      , selectData: [
        {code: 1, value: "01"},{code: 2, value: "02"},{code: 3, value: "03"},{code: 4, value: "04"},{code: 5, value: "05"},
        {code: 6, value: "06"},{code: 7, value: "07"},{code: 8, value: "08"}
      ]},
    {field: "bssInBtrySlot2Loc"
      , title: t("battery.inbound_slot2")
      , filterable: true
      , filterType: 'select'
      , selectData: [
        {code: 1, value: "01"},{code: 2, value: "02"},{code: 3, value: "03"},{code: 4, value: "04"},{code: 5, value: "05"},
        {code: 6, value: "06"},{code: 7, value: "07"},{code: 8, value: "08"}
      ]},
    {field: "bssOutBtry1Id", title: t("battery.outbound_battery_id1"), filterable: true},
    {field: "bssOutBtry2Id", title: t("battery.outbound_battery_id2"), filterable: true},
    {field: "bssOutBtrySlot1Id"
      , title: t("battery.outbound_slot1")
      , filterable: true
      , filterType: 'select'
      , selectData: [
        {code: 1, value: "01"},{code: 2, value: "02"},{code: 3, value: "03"},{code: 4, value: "04"},{code: 5, value: "05"},
        {code: 6, value: "06"},{code: 7, value: "07"},{code: 8, value: "08"}
      ]},
    {field: "bssOutBtrySlot2Id"
      , title: t("battery.outbound_slot2")
      , filterable: true
      , filterType: 'select'
      , selectData: [
        {code: 1, value: "01"},{code: 2, value: "02"},{code: 3, value: "03"},{code: 4, value: "04"},{code: 5, value: "05"},
        {code: 6, value: "06"},{code: 7, value: "07"},{code: 8, value: "08"}
      ]},
    {field: "chngFailReasonCd", title: t("battery.failure_reason"), filterable: true},
    {field: "rsrvId", title: t("battery.reservation_id"), filterable: true},

  ];

  const [columns, setColumns] = useState<GridHeader[]>(COLUMNS);

  const onExcelDownload = async(downloadReason: string) => {
    if(gridRef.current){
      let params = gridRef.current.getSearchParams()
      const excelMap = columns.flatMap(v =>
        v.children ? v.children : v
      ).map(v => ({[v.field]: v.title}));
      params = {
        ...params,
        'excelMap': JSON.stringify(excelMap),
        downloadReason
      }
      await BatteryHistApiService().downloadBatterySwapLocHist(params);
      setDownloadModalOpen(false);
    }
  }

  const downloadButton = async () => {
    setDownloadModalOpen(true);
  };

  const getBatterySwapLocHistList = async (params: BsmsBatterySwapHistRequestDto) => {
    const result = await BatteryHistApiService().get1genBatterySwapLocHistList(params);
    return result.data;
  };

  const [gridProps, setGridProps] = useState<CommonGridProps<BatterySwapResponseDto>>({
    gridHeight: 500,
    columnHeader: columns,
    defaultFilter: true,
    sortableGrid: true,
    unsorted: true,
    multipleSorting: false,
    isReorder: true,
    isResizable: true,
    checkKey: "id",
    headerSelection: true,
    girdToolBar: true,
    displayCount: [20, 50, 100],
    isFilterResetButton: true,
    isGridResetButton: true,
    isColumnSelectShowButton: true,
    onSearch: getBatterySwapLocHistList,
    downloadButton,
    queryKey: "battery1GenSwapLocHistory",
  });

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  const setInitColumn = (seletData: any[]) => {
    const newColumn = _.cloneDeep(columns);
    newColumn.forEach(v => {
      console.log(v.field)

      if (v.field === 'type'){ v.selectData = seletData[0]; console.log(seletData[0]); } ;
    })
    setColumns(newColumn);
  }

  const setInitData = async () => {
    const result = await CodeApiService().getCodesByGroupCode({groupCode: 'BMLS'});
    setInitColumn([result.data]);
  }


  const [page, setPage] = React.useState(initialDataState);


  // datepicker
  const [value, setValue] = React.useState(new Date());
  const changeDateStart = () => {
    setValue(value);
  };
  const changeDateEnd = () => {
    setValue(value);
  };

  const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)), //시작일자 초기값
    endDate: new Date(), //종료일자 초기값
    format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
    allFlag: false,
    type: 'date',
    initState: 'week'
  });

  const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

  const onCloseModal = () => {
    setDownloadModalOpen(false);
  }

  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: columns,
    })
  }, [columns])

  useEffect(() => {
    setInitData();
  }, []);

  return (
    <>

      <DateRange
          setDateRangeProps={setDateRangeProps}
          dateRangeProps={dateRangeProps}
          searchEvent={searchEvent}
      />

      <GridCommonComponent
          {...gridProps}
          ref={gridRef}
          searchParams={{
            startAt: dateRangeProps?.startDate,
            endAt: dateRangeProps?.endDate,
            allFlag: dateRangeProps.allFlag,
          }}
      />
    </>

  );
}
