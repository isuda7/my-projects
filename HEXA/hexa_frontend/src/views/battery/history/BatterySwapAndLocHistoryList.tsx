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
import Battery2GenSwapAndLocHistoryList from "@/views/battery/history/Battery2GenSwapAndLocHistoryList.tsx";
import Battery1GenSwapAndLocHistoryList from "@/views/battery/history/Battery1GenSwapAndLocHistoryList.tsx";

const sampleProducts = [
  {
    DateTime: "2024-08-10 20:08:19",
    BatteryID: "2023032904119",
    Location: "배터리교환",
    CarNumber: "KRKGSCD0000071",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    InSlot: "01",
    OutBattery: "20240725100410",
    OutSlot: "02",
    Fail: "",
    Reservation: "ON0000076139",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    BatteryID: "2023032904119",
    Location: "교환실패",
    CarNumber: "KRKGSCD0000071",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    InSlot: "01",
    OutBattery: "20240725100410",
    OutSlot: "02",
    Fail: "Return step. Time Out",
    Reservation: "ON0000076139",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    BatteryID: "2023032904119",
    Location: "중복매핑해제(이륜차)",
    CarNumber: "KRKGSCD0000071",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    InSlot: "01",
    OutBattery: "20240725100410",
    OutSlot: "02",
    Fail: "Return timeout. (The door did not open.)",
    Reservation: "ON0000076139",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    BatteryID: "2023032904119",
    Location: "인증실패",
    CarNumber: "KRKGSCD0000071",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    InSlot: "01",
    OutBattery: "20240725100410",
    OutSlot: "02",
    Fail: "",
    Reservation: "ON0000076139",
  },
];

//grid
const initialDataState = {
  skip: 0,
  take: 10,
};

export default function BatterySwapAndLocHistoryList() {
  //tab
  const [selected, setSelected] = React.useState<number>(0);
  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const {t} = useTranslation();
  const gridRef = useRef<{ refetchGrid: () => void, getSearchParams: () => any[]  }>(null);

  const COLUMNS: GridHeader[] = [
    {field: "createdAt", title: t("battery.creation_datetime"), cellType: "dateTime"},
    {field: "insertBtryId", title: t("battery.battery_id"), filterable: true},
    {
      field: "type",
      title: t("battery.location_status"),
      filterable: true,
      filterType: 'select',
      selectData: [],
      cell: (props: GridCustomCellProps) => {
        const type = props.dataItem.type;
        const typeName = props.dataItem.typeName;
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
    {field: "swapType", title: t("battery.swap_type"), filterable: true},
    {field: "swapId", title: t("battery.swap_id"), filterable: true},
    {field: "rsrvId", title: t("battery.reservation_id"), filterable: true},
    {field: "vehicleId", title: t("battery.vehicle_id"), filterable: true},
    {field: "stationId", title: t("station.station_id"), filterable: true},
    {field: "stationName", title: t("station.station_name"), filterable: true},
    {field: "insertSlotNo"
      , title: t("battery.inbound_slot")
      , filterable: true
      , filterType: 'select'
      , selectData: [
        {code: 1, value: "01"},{code: 2, value: "02"},{code: 3, value: "03"},{code: 4, value: "04"},{code: 5, value: "05"},
        {code: 6, value: "06"},{code: 7, value: "07"},{code: 8, value: "08"},{code: 9, value: "09"},{code: 10, value: "10"},
        {code: 11, value: "11"},{code: 12, value: "12"},{code: 13, value: "13"},{code: 14, value: "14"},{code: 15, value: "15"},
        {code: 16, value: "16"},{code: 17, value: "17"},{code: 18, value: "18"},{code: 19, value: "19"},{code: 20, value: "20"},
        {code: 21, value: "21"},{code: 22, value: "22"},{code: 23, value: "23"},{code: 24, value: "24"},{code: 25, value: "25"},
        {code: 26, value: "26"},{code: 27, value: "27"},{code: 28, value: "28"},{code: 29, value: "29"},{code: 30, value: "30"}
      ]},
    {field: "ejactBtryId", title: t("battery.outbound_battery_id"), filterable: true},
    {field: "ejectSlotNo"
      , title: t("battery.outbound_slot")
      , filterable: true
      , filterType: 'select'
      , selectData:[
        {code: 1, value: "01"},{code: 2, value: "02"},{code: 3, value: "03"},{code: 4, value: "04"},{code: 5, value: "05"},
        {code: 6, value: "06"},{code: 7, value: "07"},{code: 8, value: "08"},{code: 9, value: "09"},{code: 10, value: "10"},
        {code: 11, value: "11"},{code: 12, value: "12"},{code: 13, value: "13"},{code: 14, value: "14"},{code: 15, value: "15"},
        {code: 16, value: "16"},{code: 17, value: "17"},{code: 18, value: "18"},{code: 19, value: "19"},{code: 20, value: "20"},
        {code: 21, value: "21"},{code: 22, value: "22"},{code: 23, value: "23"},{code: 24, value: "24"},{code: 25, value: "25"},
        {code: 26, value: "26"},{code: 27, value: "27"},{code: 28, value: "28"},{code: 29, value: "29"},{code: 30, value: "30"}
      ]},
    {field: "failReason", title: t("battery.failure_reason"), filterable: true},
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

  const getBatterySwapLocHistList = async (params: BatterySwapHistRequestDto) => {
    const result = await BatteryHistApiService().getBatterySwapLocHistList(params);
    return result.data;
  };
  const get1genBatterySwapLocHistList = async (params: BsmsBatterySwapHistRequestDto) => {
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
    queryKey: "batterySwapLocHistory",
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
      <Header headName={"배터리 교환 및 위치 이력"} descrption={""}/>

      <div className="tabs">
        <TabStrip selected={selected} onSelect={handleSelect}>
          <TabStripTab title={t("battery.second_generation")}>
            <Battery2GenSwapAndLocHistoryList />
          </TabStripTab>
          <TabStripTab title={t("battery.first_generation")}>
            <Battery1GenSwapAndLocHistoryList />
          </TabStripTab>
        </TabStrip>
      </div>
      {
        downloadModalOpen &&
        <BatteryInfoExcelDownloadModal
          onClose={onCloseModal}
          setModalData={onExcelDownload}
        />
      }
    </>

  );
}
