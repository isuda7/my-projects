import React from "react";
import { useState } from "react";
import ECharts from "echarts-for-react";

export default function uiChart(prop: any) {
  const [options, setOptions] = useState({
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
        const tipG = params[0].data.g;
        const tipX = params[0].name;
        const tipV = params[0].value;
        const G = tipG.substr(0, 1);
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
          {
            g: prop.data[0].g,
            name: prop.data[0].name,
            value: prop.data[0].value,
            itemStyle: {
              color: "#EE7630",
              barBorderRadius: [0, 5, 5, 0],
            },
          },
          {
            g: prop.data[1].g,
            name: prop.data[1].name,
            value: prop.data[1].value,
            itemStyle: {
              color: "#3360F3",
              barBorderRadius: [0, 5, 5, 0],
            },
          },
          {
            g: prop.data[2].g,
            name: prop.data[2].name,
            value: prop.data[2].value,
            itemStyle: {
              color: "#3360F3",
              barBorderRadius: [0, 5, 5, 0],
            },
          },
          {
            g: prop.data[3].g,
            name: prop.data[3].name,
            value: prop.data[3].value,
            itemStyle: {
              color: "#3360F3",
              barBorderRadius: [0, 5, 5, 0],
            },
          },
          {
            g: prop.data[4].g,
            name: prop.data[4].name,
            value: prop.data[4].value,
            itemStyle: {
              color: "#3360F3",
              barBorderRadius: [0, 5, 5, 0],
            },
          },
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
