// HEXAADMBTM5S16 : SOH 조회

import * as React from "react";
import {Button} from "@progress/kendo-react-buttons";
import {Input} from "@progress/kendo-react-inputs";
import {DropDownList, DropDownListChangeEvent} from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridCustomCellProps,
  GridHeaderCellProps,
  GridNoRecords,
} from "@progress/kendo-react-grid";
import {DatePicker} from "@progress/kendo-react-dateinputs";
import ChartLine from "@/pub/components/ChartLine";
import DateRange, {DateRangeProps} from "@/components/common/DateRange.tsx";
import {useEffect, useRef, useState} from "react";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {useTranslation} from "react-i18next";
import {
  BatterySohStatRequestDto,
  BatteryStatRequestDto
} from "@/utils/apiService/type/battery/BatteryStatRequestDto.ts";
import BatteryStatApiService from "@/utils/apiService/battery/BatteryStatApiService.ts";
import Header from "@/new_components/common/Header.tsx";
import SearchBox, {SearchBoxProps} from "@/new_components/battery/SearchBox.tsx";
import useAlert from "@/hooks/useAlert.tsx";

const getDates = (year: number, month: number) => {
  const dates = [];

  for (let day = 1; day <= 31; day++) {
    dates.push(new Date(year, month, day + 1).toISOString().split('T')[0]);
  }

  return dates;
};

export default function BatterySohSearch() {
  const {t} = useTranslation();
  const showAlert = useAlert();
  const COLUMNS: GridHeader[] = [
    {
      field: "statDate",
      title: t("battery.datetime"),
      cellType: "date",
    },
    {
      field: "bmsSohe",
      title: `${t("battery.bms_sohe")}(%)`,
    },
    {
      field: "ctoSohe",
      title: `${t("battery.cto_sohe")}(%)`,
    },

  ];

  const gridRef = useRef<{ refetchGrid: () => void; }>(null);
  const [chartX, setChartX] = useState<string[]>(getDates(new Date().getFullYear(), new Date().getMonth()));
  const [chartData, setChartData] = useState<any[]>([]);
  const [bmsData, setBmsData] = useState<any[]>([]);
  const [ctoData, setCtoData] = useState<any[]>([]);
  const [type, setType] = useState<string>("ALL");
  const [showChart, setShowChart] = useState<boolean>(false);

  const getBatteryStateSohList = async (param: BatterySohStatRequestDto) => {
    if (!param.btryId && searchBoxProps.btryId === '') {
      return false;
    }
    const requestParams = {
      ...param,
      btryId: searchBoxProps.btryId
    }
    setShowChart(false);
    const result = await BatteryStatApiService().getBatterySohStat(requestParams);
    const data = result.data;
    const statDates = data.content.map(item => item.statDate);
    setChartX(statDates);
    setBmsData(data.content.map(item => item.bmsSohe))
    setCtoData(data.content.map(item => item.ctoSohe))
    setChartData([
      {
        name: "BMS SOH",
        data: data.content.map(item => item.bmsSohe),
      },
      {
        name: "CTO SOH",
        data: data.content.map(item => item.ctoSohe),
      },
    ])
    return data;
  }


  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

  const [gridProps, setGridProps] = useState<CommonGridProps<any>>(
    {
      gridHeight: 600, //그리드 높이
      columnHeader: column, //column 헤더 설정, 상단 defaultColumn 참고
      sortableGrid: true, //전체 정렬여부
      unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
      multipleSorting: false, //다중 컬럼 sorting 여부
      isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부
      isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
      checkKey: "id", //Table의 PK컬럼 필드, default: id
      //rowSelectable: true, //행 선택 가능 여부
      //isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
      headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      onSearch: getBatteryStateSohList,
      // downloadButton,
      queryKey: "batterySOHSearch",
    },
  );
  const [searchBoxProps, setSearchBoxProps] = useState<SearchBoxProps>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)), //시작일자 초기값
    endDate: new Date(), //종료일자 초기값
    format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
    allFlag: false,
    type: 'date',
    initState: 'week',
    btryId: '',
  });

  const searchEvent = () => {
    if (searchBoxProps.btryId === '') {

      showAlert({message: "배터리ID를 입력해주세요."});
      return;
    }
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

  useEffect(() => {
    setShowChart(true);
  }, [chartData]);

  useEffect(() => {
    const cData = [];
    if (type == 'BMS') {
      cData.push({
        name: "BMS SOH",
        data: bmsData,
      });

    } else if (type == 'CTO') {
      cData.push({
        name: "CTO SOH",
        data: ctoData,
      });
    } else {
      cData.push({
        name: "BMS SOH",
        data: bmsData,
      });
      cData.push({
        name: "CTO SOH",
        data: ctoData,
      });
    }
    setChartData(cData)
    setShowChart(true);
  }, [bmsData, ctoData, type]);

  const searchType = [
    {'code': 'ALL', 'value': '전체'},
    {'code': 'BMS', 'value': 'BMS'},
    {'code': 'CTO', 'value': 'CTO'}
  ];

  const handleDropDownList = (e: DropDownListChangeEvent) => {
    setShowChart(false);
    setType(e.value.code);
  }

  return (
    <>
      <Header headName={"SOH 조회"}/>

      <SearchBox
        setSearchBoxProps={setSearchBoxProps}
        searchProps={searchBoxProps}
        searchEvent={searchEvent}
      />

      <section className="section">
        <DropDownList
          className="w150"
          onChange={handleDropDownList}
          data={searchType}
          textField="value"
          dataItemKey="code"
          defaultValue={searchType[0]}
        />
        <div className="chart" style={{height: "540px"}}>
          {(showChart && chartData.length > 0) && (<ChartLine data={chartData} dataX={chartX} unit="%"/>)}
        </div>
      </section>

      <section className="section">
        <div>
          <GridCommonComponent
            {...gridProps}
            ref={gridRef}
            searchParams={{
              startAt: searchBoxProps?.startDate,
              endAt: searchBoxProps?.endDate,
              allFlag: searchBoxProps.allFlag,
              btryId: searchBoxProps.btryId,
            }}
          />
        </div>
      </section>
    </>);
}
