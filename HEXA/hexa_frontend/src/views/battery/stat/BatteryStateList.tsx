// HEXAADMBTM2S12 : 배터리 평균값 조회

import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import {Input} from "@progress/kendo-react-inputs";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import {useTranslation} from "react-i18next";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import useAlert from "@/hooks/useAlert.tsx";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import Header from "@/new_components/common/Header.tsx";
import {BatteryChangeStateHistRequestDto} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import BatteryHistApiService from "@/utils/apiService/battery/BatteryHistApiService.ts";
import BatteryStatApiService from "@/utils/apiService/battery/BatteryStatApiService.ts";
import {BatteryStatRequestDto} from "@/utils/apiService/type/battery/BatteryStatRequestDto.ts";
import {
  BatteryStatAvgResponseDto,
  BatteryStatResponseDto
} from "@/utils/apiService/type/battery/BatteryStatResponseDto.ts";




export default function BatteryStateList() {
  const {t} = useTranslation();

  const searchType = [
    {'code': 'totalChargeCnt', 'value': t("battery.total_charging_count")},
    {'code': 'totalChargeWh', 'value': t("battery.ccumulated_charge_energy")}
  ]
  const initParams =
    {
      searchType: searchType[0].code,
      startValue: 0,
      endValue: 100000000000
    }

  const COLUMNS: GridHeader[] = [

    {
      field: "btryId",
      title: t("battery.battery_id"),
      width: 130,
    },
    {
      field: "createdAt",
      title: t("battery.cto_collection_at"),
      width: 140,
      cellType: "dateTime",
    },
    {
      field: "ctoSohe",
      title: `${t("battery.cto_sohe")}(%)`,
      width: 100
    },
    {
      field: "stationId",
      title: `${t("battery.collection_at")}`,
      width: 140,
      cellType: "dateTime",
    },
    {
      field: "bmsSohe",
      title: `${t("battery.bms_sohe")}(%)`,
      width: 100,
    },
    {
      field: "sohr",
      title: `${t("battery.sohr")}(%)`,
      width: 100,
    },
    {
      field: "totalChargeWh",
      title: `${t("battery.accumulated_charge_energy")}(Wh)`,
      width: 100,
    },
    {
      field: "totalDischargeWh",
      title: `${t("battery.accumulated_discharge_energy")}(Wh)`,
      width: 140,
    },
    {
      field: "totalChargeCnt",
      title: `${t("battery.total_charging_count")}`,
      width: 140,
    },
    {
      field: "totalRechargeCnt",
      title: `${t("battery.accumulated_recharge_count")}`,
      width: 100,

    },
    {
      field: "cycleCnt",
      title: t("battery.cycle_count"),
      width: 100,
    },

  ];
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void, getSearchParams: () => any[] }>(null)
  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);
  const [params, setParams] = useState<BatteryStatRequestDto>(initParams);
  const [avgData, setAvgData] = useState<BatteryStatAvgResponseDto>();


  const downloadButton = async (param: BatteryStatRequestDto) => {
    //다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
    const excelMap = column.map(v => ({[v.field]: v.title}));
    // params = {
    //   ...params,
    //   'excelMap': JSON.stringify(excelMap)
    // }
    // await BatteryStatApiService().getBatteryStatList(param);
  }

  const getBatteryStateList = async (param: BatteryStatRequestDto) => {
    const result = await BatteryStatApiService().getBatteryStatList(param);
    return result.data
  }

  const getBatteryAverageMonthly = async (param: BatteryStatRequestDto) => {
    const response = await BatteryStatApiService().getBatteryAverageStat(param)
    setAvgData(response.data)
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<any>>(
    {
      gridHeight: 600, //그리드 높이
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
      searchParams: params,
      onSearch: getBatteryStateList,
      downloadButton,
      queryKey: "battery-statistics-average",
    },
  );

  const handleSearch = () => {
    setGridProps((prevProps) => ({
      ...prevProps,
      searchParams: params,
    }));
  }

  useEffect(() => {

    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
    getBatteryAverageMonthly(params);
  }, [gridProps]);

  return (
    <>
      <Header headName={"배터리 평균값 조회"}/>
      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <div className="search-flex">
            <DropDownList
              className="w200"
              data={searchType}
              textField="value"
              dataItemKey="code"
              defaultValue={searchType[0]}
              onChange={(e) => setParams({...params, searchType: e.value.code})}
            />
            <Input
              className="w200"
              type={"number"}
              onChange={(e) => setParams({...params, startValue: e.value})}
            />
            <span>~</span>
            <Input
              className="w200"
              type={"number"}
              onChange={(e) => setParams({...params, endValue: e.value})}
            />
          </div>

          <div className="group-align-right">
            <Button size={"medium"} themeColor={"dark"} onClick={handleSearch}>
              <i className="icon icon-search"></i>
              {t('common.search')}
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <table className="tbl-base">
          <colgroup>
            <col style={{width: "12%"}}/>
            <col style={{width: "11%"}}/>
            <col style={{width: "11%"}}/>
            <col style={{width: "11%"}}/>
            <col style={{width: "11%"}}/>
            <col style={{width: "11%"}}/>
            <col style={{width: "11%"}}/>
            <col style={{width: "11%"}}/>
            <col style={{width: "11%"}}/>
          </colgroup>
          <tbody>
          <tr>
            <th scope="col" rowSpan={2} className="txt-center">
              평균
            </th>
            <th scope="col" className="txt-center">
              {t("battery.cto_sohe")}(%)
            </th>
            <th scope="col" className="txt-center">
              {t("battery.bms_sohe")}(%)
            </th>
            <th scope="col" className="txt-center">
              {t("battery.sohr")}(%)
            </th>
            <th scope="col" className="txt-center">
              {t("battery.accumulated_charge_energy")}(Wh)
            </th>
            <th scope="col" className="txt-center">
              {t("battery.accumulated_discharge_energy")}(Wh)
            </th>
            <th scope="col" className="txt-center">
              {t("battery.total_charging_count")}
            </th>
            <th scope="col" className="txt-center">
              {t("battery.accumulated_recharge_count")}
            </th>
            <th scope="col" className="txt-center">
              {t("battery.cycle_count")}
            </th>
          </tr>
          <tr>
            <td className="txt-right">{avgData && avgData.avgCtoSohe}</td>
            <td className="txt-right">{avgData && avgData.avgBmsSohe}</td>
            <td className="txt-right">{avgData && avgData.avgSohr}</td>
            <td className="txt-right">{avgData && avgData.avgTotalChargeWh}</td>
            <td className="txt-right">{avgData && avgData.avgTotalDischargeWh}</td>
            <td className="txt-right">{avgData && avgData.avgTotalChargeCnt}</td>
            <td className="txt-right">{avgData && avgData.avgTotalRechargeCnt}</td>
            <td className="txt-right">{avgData && avgData.avgCycleCnt}</td>
          </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <GridCommonComponent
          {...gridProps}
          ref={gridRef}
        />
      </section>
    </>
  );
}
