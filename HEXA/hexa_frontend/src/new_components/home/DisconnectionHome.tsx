/* React */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import DisconnectChart from "./chart/DisconnectChart";

/* Types */
import { DisconnectCount } from "@/utils/apiService/type/home/Home";

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

export default function DisconnectionHome(props: any) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const { data, dateArray } = props;

  const [chartData, setChartData] = useState<ChartData[]>(initChartData);

  useEffect(() => {
    console.log('useEffect data', data)
    processData(data)
  }, [data])

  const processData = (data: DisconnectCount[]) => {
    console.log('processData data', data);
    const gen1List: number[] = [];
    const gen2List: number[] = [];
    const newChartData: ChartData[] = [
      {name: t('home.first_gen'), data: []},
      {name: t('home.second_gen'), data: []},
    ]
    data.map((v: DisconnectCount) => {
      if(v.genCode === 'G1') gen1List.push(v.disconnectCount);
      else gen2List.push(v.disconnectCount)
    })
    newChartData[0].data = gen1List;
    newChartData[1].data = gen2List;

    setChartData(newChartData);
  }

  return (
    <>
      {/* 통신단절 건수 */}
      <div className="home-box type-disconnection">
        <h2>
          {/* 통신단절 건수 */}
          {t('home.network_disconnection_count')}
        </h2>
        <Button 
          fillMode="flat" 
          className="btn-arr"
          onClick={() => navigate('/irregular/disruption')}  
        >
          {/* 더보기 */}
          {t('home.more_info')}
        </Button>

        <div className="home-chart-bar5">
          <DisconnectChart data={chartData} dataX={dateArray} />
        </div>
      </div>
    </>
  );
}
