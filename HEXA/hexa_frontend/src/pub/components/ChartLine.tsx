import { useEffect, useState } from "react";
import { graphic } from "echarts";
import ECharts from "echarts-for-react";
import _ from 'lodash'

export default function uiChartLine(prop: any) {
  const color = ["#34BE83", "#5F9EF1", "#F8732C"];
  const bgcolor1 = ["#D3F6E9", "#BEDCFF", "#FEE8DD"];
  const bgcolor2 = ["#ffffff", "#ffffff", "#FFF9F5"];
  const dateList = prop.dataX;
  const label = prop.label === true ? true : false;
  const labelpointer = label === true ? 1 : 0;

  let colorType = 0;

  const colorSet = (i: number) => {
    if (prop.color !== undefined) {
      colorType = prop.color;
      return color[colorType];
    } else {
      return color[i];
    }
  };
  const colorBgSet1 = (i: number) => {
    if (prop.color !== undefined) {
      colorType = prop.color;
      return bgcolor1[colorType];
    } else {
      return bgcolor1[i];
    }
  };
  const colorBgSet2 = (i: number) => {
    if (prop.color !== undefined) {
      colorType = prop.color;
      return bgcolor2[colorType];
    } else {
      return bgcolor2[i];
    }
  };

  const seriesList = () => {
    const seriesList: any = [];
    const dataList: any = prop.data;

    if(!dataList) return false;

    dataList.map(function (item: any, i: any) {
      const series = {
        name: item.name,
        type: "line",
        label: {
          show: label,
          position: "top",
          color: colorSet(i),
          fontWeight: "bold",
          fontSize: 14,
        },
        smooth: false,
        symbolSize: 10,
        color: colorSet(i),
        emphasis: {
          itemStyle: {
            color: "#fff",
            borderColor: colorSet(i),
            borderWidth: 5,
            opacity: 1,
          },
        },
        itemStyle: {
          opacity: labelpointer,
        },
        lineStyle: {
          width: 3,
          type: "solid",
          color: colorSet(i),
          cap: "round",
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorBgSet1(i),
            },
            {
              offset: 1,
              color: colorBgSet2(i),
            },
          ]),
        },
        data: item.data,
      };
      seriesList.push(series);
    });
    return seriesList;
  };

  // chart
  const [options, setOptions] = useState({
    grid: {
      left: 120,
      top: 20,
      right: 40,
      bottom: 120,
    },
    tooltip: {
      trigger: "axis",
      className: "chart-tip",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#999",
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
      backgroundColor: "white",
      borderColor: "#fff",
      borderWidth: 1,
      formatter: (params: any) => {
        const tipX = params[0].name;
        const tipUnit = prop.unit;
        let tipCont: any = "";

        params.map((item: any, i: any) => {
          const valNum = item.value.toLocaleString();
          let txt = "";
          txt =
            "<span class='val' style='color:" +
            colorSet(i) +
            "'><span>" +
            item.seriesName +
            "</span><span>" +
            valNum +
            tipUnit +
            "</span></span>";
          tipCont += txt;
        });

        const tip =
          "<span class='con'>" + tipX + "</span>" + tipCont + "</div>";

        return tip;
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      offset: 30,
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#72717F",
        fontSize: 14,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#171313",
          width: 1,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#eeeeee",
          width: 2,
        },
      },
      data: dateList,
    },
    yAxis: {
      type: "value",
      boundaryGap: ["0", "100%"],
      position: "left",
      offset: 20,
      axisLine: {
        show: false,
        lineStyle: {
          type: "solid",
          color: "#171313",
          width: 0,
        },
      },
      axisLabel: {
        formatter: "{value} " + prop.unit,
        color: "gray",
        fontSize: 14,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#fff",
          width: 2,
        },
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 50,
      },
      {
        start: 0,
        end: 50,
      },
      {
        backgroundColor: "rgba(255, 255, 255, 1)",
        fillerColor: "rgba(245, 245, 245, 0.3)",
        borderColor: "rgba(255, 255, 255, 1)",
        dataBackground: {
          lineStyle: {
            color: "#999",
          },
          areaStyle: {
            color: "#ccc",
          },
        },
        selectedDataBackground: {
          lineStyle: {
            color: "#999",
          },
          areaStyle: {
            color: "#ccc",
          },
        },
        handleStyle: {
          borderColor: "#999",
        },
        moveHandleStyle: {
          color: "#fff",
        },
        emphasis: {
          handleStyle: {
            borderColor: "#999",
          },
          moveHandleStyle: {
            color: "#fff",
          },
        },
      },
    ],
    series: seriesList() || undefined,
  });

  useEffect(() => {
    setOptions((prevState) => {
      return {
        ...prevState,
        series: seriesList(),
      }
    })
  }, [prop.data])

  useEffect(() => {
    const xAxis = _.cloneDeep(options.xAxis);
    xAxis.data = prop.dataX;
    setOptions((prevState) => {
      return {
        ...prevState,
        xAxis,
      }
    })
  }, [prop.dataX])

  return (
    <>
      <ECharts 
        option={options} 
        opts={{ renderer: "svg", height: 500 }} 
      />
    </>
  );
}
