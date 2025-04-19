import React from "react";
import { useState } from "react";
import ECharts from "echarts-for-react";

export default function uiChart(prop: any) {
  const color = ["#F5B113", "#2BBE7F"];

  const [options, setOptions] = useState({
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["45%", "70%"],
        data: prop.data,
        color: color,
        label: {
          formatter: "{c}",
          color: "inherit",
          fontSize: "16px",
          fontWeight: "bold",
        },
        labelLine: {
          lineStyle: {
            color: "#ABABAB",
          },
        },
      },
    ],
  });

  return (
    <>
      <ECharts option={options} />
    </>
  );
}
