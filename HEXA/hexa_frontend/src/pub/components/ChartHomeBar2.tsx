import React from "react";
import { useState } from "react";
import ECharts from "echarts-for-react";

export default function uiChart(prop: any) {
  const color = ["#F6C142", "#65C340"];

  const seriesList = () => {
    const seriesList: any = [];
    const dataList: any = prop.data;

    dataList.map(function (item: any, i: any) {
      const series = {
        name: item.name,
        type: "bar",
        barWidth: 18,
        barGap: "40%",
        label: {
          show: true,
          position: "top",
          fontWeight: "bold",
          color: "#424242",
        },
        color: color[i],
        data: seriesListData(item.data),
      };
      seriesList.push(series);
    });
    return seriesList;
  };

  const seriesListData = (prop: any) => {
    const seriesListData: any = [];
    const dataListData: any = prop;
    dataListData.map(function (item: any, i: any) {
      const itemData = {
        value: item,
        itemStyle: {
          barBorderRadius: [10, 10, 0, 0],
        },
      };
      seriesListData.push(itemData);
    });
    return seriesListData;
  };

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
    },
    xAxis: {
      type: "category",
      boundaryGap: [0, 0],
      data: prop.dataX,
      axisLabel: {
        show: true,
        color: "#A4A4A4",
        fontSize: "14px",
        margin: 12,
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "solid",
          color: "#EAEAEA",
          width: 1,
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#dadada",
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: seriesList(),
  });

  return (
    <>
      <ECharts option={options} />
    </>
  );
}
