import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {useTranslation} from "react-i18next";
import {BatteryChargeHistRequestDto} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import BatteryHistApiService from "@/utils/apiService/battery/BatteryHistApiService.ts";
import DateRange, {DateRangeProps} from "@/components/common/DateRange.tsx";
import {GridCustomCellProps} from "@progress/kendo-react-grid";
import * as React from "react";


export default function BatteryChargeHistoryList() {
  const {t} = useTranslation();

  const COLUMNS: GridHeader[] = [
    {
      field: "btryId",
      title: t("battery.battery_id"),
      filterable: true,
    },
    {
      field: "chargeType",
      title: t("battery.category"),
      filterable: true,
      filterType: 'select',
      selectData: [
        {code: '0', value: "일반 충전"},
        {code: '1', value: "재충전"}
      ],
      cell: (props: GridCustomCellProps) => {
        const chargeType = props.dataItem.chargeType;
        const chargeTypeName = chargeType == '0' ? '일반 충전' : '재충전';
        return (
          <span>{chargeTypeName}</span>
        );
      }
    },
    {
      field: "recoProfileId",
      title: t("battery.server_profile_id"),
      filterable: true,
    },
    {
      field: "recoChargeConditionCode",
      title: t("battery.server_charging_condition"),
      filterable: true,
    },
    {
      field: "profileId",
      title: t("battery.station_profile_id"),
      filterable: true,
      cell: (props: GridCustomCellProps) => {
        const recoProfileId = props.dataItem.recoProfileId;
        const profileId = props.dataItem.profileId;
        const textColor = () => {
          if (recoProfileId !== profileId) {
            return "c-red";
          }
          return '';
        };
        return (
          <span className={`${textColor()}`}>{profileId}</span>
        );
      }
    },
    {
      field: "chargeConditionCode",
      title: t("battery.station_charging_condition"),
      filterable: true,
    },
    {
      field: "chargeStartTime",
      title: t("battery.charging_start_datetime"),
      cellType: "dateTime",

    },
    {
      field: "chargeEndTime",
      title: t("battery.charging_end_datetime"),
      cellType: "dateTime",

    },
    {
      field: "chargeTime",
      title: t("battery.charging_duration"),
      cellType: "time",
    },
    {
      field: "totalReChargeCount",
      title: t("battery.recharge_accumulated_count"),
    },
    {
      field: "totalNormalChargeCount",
      title: t("battery.normal_charge_accumulated_count"),
    },
    {
      field: "totalChargeCount",
      title: t("battery.total_charging_count"),
    },
  ];
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null)


  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

  const downloadButton = async (params: BatteryChargeHistRequestDto) => {
    //다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
    const excelMap = column.map(v => ({[v.field]: v.title}));
    params = {
      ...params,
      'excelMap': JSON.stringify(excelMap)
    }
    await BatteryHistApiService().downloadBatteryChargeHist(params);
  }

  const getBatteryChargeHistList = async (params: BatteryChargeHistRequestDto) => {
    const result = await BatteryHistApiService().getBatteryChargeHistList(params);
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
      checkKey: "id", //Table의 PK컬럼 필드, default: id
      headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      isFilterResetButton: true, //필터 리셋버튼 생성여부
      isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부
      isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부

      onSearch: getBatteryChargeHistList,
      //deleteButton : deleteNotice,
      downloadButton: downloadButton,
      queryKey: "batteryChargeHistory",
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
          <Header headName={t("battery.battery_charging_history")}/>

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
