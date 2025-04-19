/* React */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import StationRankingChart from "./chart/StationRankingChart"
import IrregularChart from "./chart/IrregularChart"
import ChartHomePie from "./chart/ChartHomePie"
import { getFormattedTime } from "@/utils/common";
import { MONTHS_LIST } from "@/views/station/constants";
import { AccSwapRank, IrregularCount } from "@/utils/apiService/type/home/Home";

interface ChartData {
  name: string,
  data: number[],
}

const initChartData:ChartData[] = [
  {
    name: '',
    data: []
  }
]

export default function StationHome(props: any) {
  const {t} = useTranslation();
  const navigate = useNavigate()
  const { data, dateArray, irrData } = props;
  const { accumulatedSwapCntRankings=[], operationCount} = data;

  const [rankingData, setRankingData] = useState<AccSwapRank[]>([]) //누적교환건수 순위
  const [operData, setOperData] = useState<{value: number, name: string}[]>([]) //운영현황
  const [irrChartData, setIrrChartData] = useState<ChartData[]>(initChartData);

  useEffect(() => {
    const newRanking = accumulatedSwapCntRankings.map((v:AccSwapRank) => {
      const genCode = v.genCode.substring(1);
      const genName = genCode === '1'? t('home.first_gen_short') : t('home.second_gen_short')
      return {
        ...v,
        genCode,
        genName,
      }
    })
    setRankingData(newRanking)
  }, [accumulatedSwapCntRankings])

  useEffect(() => {
    const newOperData = [
      {value: operationCount?.gen1 || 0, name: t('home.first_gen')},
      {value: operationCount?.gen2 || 0, name: t('home.second_gen')},
    ]
    setOperData(newOperData)
  }, [operationCount])

  useEffect(() => {
    processIrregularData(irrData)
  }, [irrData])

  const processIrregularData = (data: IrregularCount[]) => {
    const gen1List: number[] = [];
    const gen2List: number[] = [];

    const newChartData: ChartData[] = [
      {name: t('home.first_gen'), data: []},
      {name: t('home.second_gen'), data: []},
    ]

    data?.map((v: IrregularCount) => {
      if(v.genCode === 'G1') gen1List.push(v.irregularCount);
      else gen2List.push(v.irregularCount)
    })

    newChartData[0].data = gen1List;
    newChartData[1].data = gen2List;

    setIrrChartData(newChartData);
  }

  const getOperTotal = () => {
    if(operData.length > 0) {
      return operData[0].value + operData[1].value
    }
    return 0;
  }

  //chart : bar1
  const chartData1 = [
    { g: "2세대", name: "GS25 아름다운미소점", value: "65" },
    { g: "2세대", name: "본도시락 문정법조타운점", value: "58" },
    { g: "1세대", name: "하이큐바이크관약점", value: "50" },
    { g: "2세대", name: "GS25 양재강남점", value: "43" },
    { g: "2세대", name: "GS25 신림관악점", value: "20" },
  ];

  //현재 월 판단값
  const month = getFormattedTime(new Date(), 'MM')
  const monthObj = MONTHS_LIST.find(v => v.value === month);

  return (
    <>
      <div className="home-row">
        {/* 스테이션 */}
        <div className="home-box type-title">
          <h2>
            {/* 스테이션 */}
            {t('home.station')}
          </h2>
        </div>

        {/* 누적교환건수 순위 */}
        <div className="home-box type-ranking">
          <h3>
            {t('home.ranking_cumulative_swaps_month', {string : t(`date.${monthObj?.name}`)})}
            {/* n월 누적교환건수 순위 */}
          </h3>
          <Button 
            fillMode="flat" 
            className="btn-arr"
            onClick={() => navigate('/station/statistics/station-exchange')}
          >
            {/* 더보기 */}
            {t('home.more_info')}
          </Button>
          <div className="home-chart-bar1">
            <ul>
              {
                rankingData.map((v: AccSwapRank, i: number) => {
                  if(i<5) {
                    return (
                      <li key={i}>
                        <span className={v.genCode === '1'? "flag-1" : "flag-2"}>{v.genName}</span>
                        <span className="tit">{v.stationName}</span>
                      </li>
                    )
                  }
                })
              }
            </ul>
            <StationRankingChart data={rankingData} />
          </div>
        </div>

        {/* 운영 현황 */}
        <div className="home-box type-situation">
          <h3>
            {/* 운영 현황 */}
            {t('home.status_of_operation')}
          </h3>
          <Button 
            fillMode="flat" 
            className="btn-arr"
            onClick={() => navigate('/dashboard')}
          >
            {/* 더보기 */}
            {t('home.more_info')}
          </Button>
          <div className="home-chart-pie">
            <div className="chart-legend">
              <span className="round-g1">
                {t('home.first_gen') /* 1세대 */}
              </span>
              <span className="round-g2">
                {t('home.second_gen') /* 2세대 */}
              </span>
            </div>
            <div className="chart-total">
              <span className="tit">
                {t('home.total') /* 전체 */}
              </span>
              <span className="con">
                {getOperTotal()}
              </span>
            </div>
            <ChartHomePie data={operData} />
          </div>
        </div>

        {/* 일별 진단 건수 */}
        <div className="home-box type-diagnosis">
          <h3>
            {/* 일별 진단 건수 */}
            {t('home.number_of_daily_diagnosis')}
          </h3>
          <Button 
            fillMode="flat" 
            className="btn-arr"
            onClick={() => navigate('/irregular/station/history')}  
          >
            {/* 더보기 */}
            {t('home.more_info')}
          </Button>
          <div className="home-chart-bar2">
            <IrregularChart data={irrChartData} dataX={dateArray} />
          </div>
        </div>
      </div>
    </>
  );
}
