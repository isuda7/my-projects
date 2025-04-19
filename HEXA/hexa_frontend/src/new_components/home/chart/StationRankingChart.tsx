import { useEffect, useState } from "react";
import ECharts, {EChartsOption} from "echarts-for-react";
import _ from 'lodash';
import { AccSwapRank } from "@/utils/apiService/type/home/Home";

export default function StationRankingChart(props: any) {

  const { data } = props;

  useEffect(() => {
    const newOptions = _.cloneDeep(options)

    const newData = data.map((v:AccSwapRank, i: number) => {
      const color = i===0? "#EE7630" : "#3360F3"
      return {
        genCode: v.genCode,
        genName: v.genName,
        name: v.stationName,
        value: v.swapCount,
        itemStyle: {
          color,
          barBorderRadius: [0, 5, 5, 0],
        }
      }
    })

    newOptions.series[0].data = newData;
    setOptions(newOptions);
  }, [data])

  const [options, setOptions] = useState<EChartsOption>({
    grid: {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params: any) => {
        console.log('formatter params', params)
        const G = params[0].data.genCode;
        const tipG = params[0].data.genName;
        const tipX = params[0].name;
        const tipV = params[0].value;
        const tip =
          "<div class='tip-ranking'><span class='flag-" +
          G +
          "'>" +
          tipG +
          "</span><span class='tit-txt'>" +
          tipX +
          " </span><span class='tit-val'>" +
          tipV +
          "</span></div>";
        return tip;
      },
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0],
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      boundaryGap: [0, 0],
      data: ["1", "2", "3", "4", "5"],
      axisLabel: {
        show: false,
      },
      inverse: true,
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#b9b9b9",
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: "순위",
        type: "bar",
        barWidth: 20,
        label: {
          show: true,
          position: "right",
        },
        data: [

        ],
      },
    ],
  });

  return (
    <>
      <ECharts option={options} />
    </>
  );
}
