/**
 * 스테이션 Data 수집 이력 조회 Component
 * URL: /station/history/data
 */

/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

/* Common */
import Header from "@/new_components/common/Header";
import DateRange, { DateRangeProps } from "./common/DateRange.tsx";
import Temperature from "./chart/Temperature";
import Humidity from "./chart/Humidity";
import AccumulatedPower from "./chart/AccumulatedPower";
import StationApiService from "@/utils/apiService/StationApiService";
import { getFormattedTime } from "@/utils/common";
import useAlert from "@/hooks/useAlert.tsx";

/* Types */
import { StationStatEventDto } from "@/utils/apiService/type/station/StationStatistics";
import { StationInfoDto } from "@/utils/apiService/type/station/StationInfoDto"; 

interface ChartData {
  xData: string[],
  chartData: {
    name: string,
    data: number[]
  }[]
}

export default function StationHistoryData() {
  const {t, i18n} = useTranslation();
  const showAlert = useAlert();
  /**
	 * DateRange Component 초기값, DateRange 컴포넌트의 부모 컴포넌트에서 작성한다
	 */
	const now = new Date();
	const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
		startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0), //시작일자 초기값
		endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59), //종료일자 초기값
		format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
		allFlag: false,
		type: 'date',
		initState: 'today',
    dropDownList: [],
	});
  const [gridData, setGridData] = useState<StationStatEventDto[]>([])
  const [tempData, setTempData] = useState<ChartData>(); //온도
  const [humidData, setHumidData] = useState<ChartData>(); //습도
  const [accumPwrData, setAccumPwrData] = useState<ChartData>(); //전력량

  const [selected, setSelected] = useState<number>(0); //현재 탭 index
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  //조회
  const searchEvent = async (initValue: any) => {
    //검색기간 1년 validation체크
    if(!checkValidation()) return;

    const params = {
      //TODO: 추후 size와 page는 API 수정후 안보내주는 방향으로 수정
      size: 9999,
      page: 0,

      stationId: dateRangeProps.value || initValue, //HX0104001A1
      startDate: getFormattedTime(dateRangeProps.startDate),
      endDate: getFormattedTime(dateRangeProps.endDate)
    }
    const res: any = await StationApiService().getStationStatEventList(params);
    console.log('res search', res)
    //조회 후 데이터 가공 및 세팅
    setGridData(res.data.content)
    processChartData(res.data.content)
  }

  /**
   * 검색조건 1년 초과인지 판단 유효성검사
   * @returns 
   */
  const checkValidation = () => {
    let result = true;
    const start = dateRangeProps.startDate as Date;
    const end = dateRangeProps.endDate as Date;
    const oneYearLater = new Date(start);
    oneYearLater.setFullYear(start.getFullYear() + 1);

    const oneYearFlag = end >= oneYearLater;

    // 1년 초과 여부 판단
    if(oneYearFlag) {
      //'최대 검색 기간은 1년입니다.'
      showAlert({message: t('station.search_max_year_period_limit')})
      result = false;
    }
    
    return result;
  }

  //데이터 가공 및 세팅
  const processChartData = (list: StationStatEventDto[]) => {
    console.log('processChartData list', list);
    const xData: string[] = [];
    const temp: number[] = [];
    const humid: number[] = [];
    const accumPwr: number[] = [];
    const format = t('format.date-time-uppercase');
    list.forEach(v => {
      xData.push(getFormattedTime(v.eventTime, format));
      temp.push(v.chassTemp)
      humid.push(v.chassHumid)
      accumPwr.push(v.chassAccumPwr)
    })

    setTempData({
      xData,
      chartData: [{
        name: t('station.temperature'), //온도
        data: temp,
      }]
    })
    setHumidData({
      xData,
      chartData: [{
        name: t('station.humidity'), //'습도',
        data: humid,
      }]
    })
    setAccumPwrData({
      xData,
      chartData: [{
        name: t('station.power_usage'), //'전력량',
        data: accumPwr,
      }]
    })
  }

  /**
   * 초기값 조회 및 세팅
   */
  const initState = async() => {
    const res: any = await StationApiService().getStationSimpleList();
    if(Array.isArray(res.data)) {
      const list = res.data.map((v:StationInfoDto) => ({code: v.id, value: v.name}))
      setDateRangeProps((prevState: DateRangeProps) => {
        return {
          ...prevState,
          dropDownList: list,
          value: list[0].code,
        }
      })
      searchEvent(list[0].code)
    }
  }

  /**
   * 초기 데이터 세팅
   */
  useEffect(() => {
    initState()
  }, [])


  return (
    <>
      {/* 스테이션 Data 수집 이력 조회 */}
      <Header headName={t('station.collected_data_history_lookup')} />
      <DateRange 
        setDateRangeProps={setDateRangeProps}
        dateRangeProps={dateRangeProps}
        searchEvent={searchEvent}
      />

      <div className="tabs-chart">
        <TabStrip selected={selected} onSelect={handleSelect}>
          <TabStripTab title={t('station.temperature') /* 온도 */}>
            <Temperature 
              gridData={gridData}
              dateRangeProps={dateRangeProps}
              {...tempData}
            />
          </TabStripTab>
          <TabStripTab title={t('station.humidity') /* 습도 */}>
            <Humidity
              gridData={gridData}
              dateRangeProps={dateRangeProps}
              {...humidData}
            />
          </TabStripTab>
          <TabStripTab title={t('station.power_usage') /* 전력량 */}>
            <AccumulatedPower
              gridData={gridData}
              dateRangeProps={dateRangeProps}
              {...accumPwrData}
            />
          </TabStripTab>
        </TabStrip>
      </div>
    </>
  );
}
