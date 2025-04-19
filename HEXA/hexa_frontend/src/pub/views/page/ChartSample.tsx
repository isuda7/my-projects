// chart : 테스트

import { useState } from "react";
import { graphic } from "echarts";
import * as echarts from "echarts";
import ECharts from "echarts-for-react";

export default function Test() {
  echarts.registerTheme("myTheme", {
    backgroundColor: "#fff",
    title: {
      textStyle: {
        color: "#ffffff",
      },
    },
    legend: {
      textStyle: {
        color: "#ffffff",
      },
    },
    dataZoom: {
      textStyle: {
        color: "#ffffff",
      },
      borderColor: "#37394a",
    },
  });

  const [options, setOptions] = useState({
    grid: {
      left: 80,
      top: 20,
      right: 100,
      bottom: 60,
    },
    tooltip: {
      trigger: "axis",
      className: "chart-tip",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#666",
          width: 1,
        },
      },
      textStyle: {
        color: "white",
        fontSize: 16,
        fontWeight: 400,
      },
      class: "chart-tip",
      position: "top",
      backgroundColor: "black",
      borderColor: "#444",
      borderWidth: 1,
      formatter: (params: any) => {
        const tipW =
          Math.round(parseInt(params[0].value, 10)).toString() + " Wh";
        const tipTxt = params[0].axisValue + "시 전력량";
        const tip =
          "<span >" + tipTxt + "<br /><strong>" + tipW + "</strong></span>";

        return tip;
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      offset: 20,
      data: [
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
        "2024-08-23 \n 0:00",
      ],
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#72717F",
        fontSize: 12,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#171313",
          width: 2,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#191919",
          width: 1,
        },
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, 0],
      position: "right",
      offset: 20,
      axisLine: {
        show: true,
        lineStyle: {
          type: "solid",
          color: "#171313",
          width: 2,
        },
      },
      axisLabel: {
        color: "gray",
        fontSize: 16,
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#191919",
          width: 1,
        },
      },
    },
    series: [
      {
        name: "Line 1",
        type: "line",
        smooth: true,
        symbolSize: 20,
        emphasis: {
          itemStyle: {
            color: "#ffffff",
            borderColor: "gray",
            borderWidth: 2,
            opacity: 1,
          },
        },
        itemStyle: {
          opacity: 0,
        },
        lineStyle: {
          width: 8,
          type: "solid",
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#fd911b",
            },
            {
              offset: 0.5,
              color: "#ee404f",
            },
            {
              offset: 1,
              color: "#d51a90",
            },
          ]),
          shadowColor: "rgba(0,0,0,.5)",
          shadowBlur: 6,
          shadowOffsetY: 30,
          cap: "round",
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#362014",
            },
            {
              offset: 0.5,
              color: "#391d1a",
            },
            {
              offset: 1,
              color: "#130e10",
            },
          ]),
        },
        data: [
          190000, 300000, 170000, 350000, 3000, 400000, 40000, 280000, 100000,
          480000, 170000, 250000,
        ],
      },
    ],
  });

  return (
    <div className="contents">
      <div className="content">
        <br />
        <div className="chart-test type2">
          <ECharts
            option={options}
            opts={{ renderer: "svg", width: "auto", height: 500 }}
          />
        </div>
      </div>
    </div>
  );
}
