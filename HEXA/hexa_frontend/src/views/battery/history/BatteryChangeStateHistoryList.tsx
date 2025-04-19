import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {useTranslation} from "react-i18next";
import {
  BatteryChangeStateHistRequestDto,
  BatteryChargeHistRequestDto
} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import BatteryHistApiService from "@/utils/apiService/battery/BatteryHistApiService.ts";
import DateRange, {DateRangeProps} from "@/components/common/DateRange.tsx";

const percentSelectData = [
  {code: '0~10', value: '0~10'},
  {code: '10~20', value: '10~20'},
  {code: '20~30', value: '20~30'},
  {code: '30~40', value: '30~40'},
  {code: '40~50', value: '40~50'},
  {code: '50~60', value: '50~60'},
  {code: '60~70', value: '60~70'},
  {code: '70~80', value: '70~80'},
  {code: '80~90', value: '80~90'},
  {code: '90~', value: '90~100'},
];


export default function BatteryChangeStateHistoryList() {
  const {t} = useTranslation();

  const COLUMNS: GridHeader[] = [

    {
      field: "createdAt",
      title: t("battery.collection_at"),
      cellType: "dateTime",
    },
    {
      field: "type",
      title: t("battery.category"),
      filterable: true,
    },
    {
      field: "btryId",
      title: t("battery.battery_id"),
      filterable: true,
    },
    {
      field: "stationId",
      title: t("station.station_id"),
      filterable: true,
    },
    {
      field: "stationName",
      title: t("station.station_name"),
      filterable: true,
    },
    {
      field: "slotNo",
      title: t("station.slot_no"),
      filterable: true,
    },
    {
      field: "soh",
      title: `${t("battery.soh")} (%)`,
      filterable: true,
      filterType: 'select',
      selectData: percentSelectData,
    },
    {
      field: "soc",
      title: `${t("battery.soc")} (%)`,
      filterable: true,
      filterType: 'select',
      selectData: percentSelectData,
    },
    {
      field: "sohr",
      title: `${t("battery.sohr")} (%)`,
      filterable: true,
      filterType: 'select',
      selectData: percentSelectData,
    },
    {
      field: "totalChangeCnt",
      title: t("battery.accumulated_exchange_count"),
      cellType: "number",
    },
    {
      field: "totalChargeWh",
      title: t("battery.accumulated_charging_amount"),
      cellType: "number",
    },
    {
      field: "totalDischargeWh",
      title: t("battery.accumulated_discharge_amount"),
      cellType: "number",
    },
    {
      field: "usageWh",
      title: t("battery.usage_wh"),
      cellType: "number",
    },
    {
      field: "chargeCycle",
      title: t("battery.charge_cycle"),
      cellType: "number",
    },
  ];
  const showAlert = useAlert();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null)


  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

  const downloadButton = async (params: BatteryChangeStateHistRequestDto) => {
    //다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
    const excelMap = column.map(v => ({[v.field]: v.title}));
    params = {
      ...params,
      'excelMap': JSON.stringify(excelMap)
    }
    await BatteryHistApiService().downloadBatteryChangeStateHist(params);
  }

  const getBatteryChangeStateHistList = async (params: BatteryChangeStateHistRequestDto) => {
    const result = await BatteryHistApiService().getBatteryChangeStateHistList(params);
    return result.data
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<BatteryResponseDto>>(
    {
      gridHeight: 500, //그리드 높이
      columnHeader: column, //column 헤더 설정, 상단 defaultColumn 참고
      defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
      sortableGrid: true, //전체 정렬여부
      unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
      multipleSorting: false, //다중 컬럼 sorting 여부
      isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부
      isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
      // checkKey: "id", //Table의 PK컬럼 필드, default: id
      headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      isFilterResetButton: true, //필터 리셋버튼 생성여부
      isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부
      isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부

      onSearch: getBatteryChangeStateHistList,
      //deleteButton : deleteNotice,
      downloadButton: downloadButton,
      queryKey: "batteryChargeStateHistory",
    },
  );

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


  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: column,
    })
  }, [column])

  return (
    <>
      <div className="contents">
        <div className="content">
          <Header headName={"배터리 상태변화 이력"}/>

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
        </div>
      </div>

    </>
  );
}
