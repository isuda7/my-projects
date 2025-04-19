import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ECharts from "echarts-for-react";
import _ from "lodash";

export default function BatteryFailedChart(props: any) {
  const {t} = useTranslation();
  const { data, dataX } = props;
  
  const names = [
    t('home.first_gen_swap_fail'), //'1세대 교환실패', 
    t('home.first_gen_auth_fail'), //'1세대 인증실패', 
    t('home.second_gen_swap_fail'), //'2세대 교환실패', 
    t('home.second_gen_auth_fail'), //'2세대 인증실패'
  ]
  const color = ["#F6C142", "#FFF6DB", "#65C340", "#E5EFDB"];

  const seriesList = () => {
    const seriesList: any = [];
    const dataList: any = [
      data?.dataA || [],
      data?.dataB || [],
      data?.dataC || [],
      data?.dataD || [],
    ]

    dataList.map(function (item: any, i: any) {
      const series = {
        name: names[i],
        type: "bar",
        barWidth: 10,
        barGap: "90%",
        label: {
          show: true,
          position: "top",
          fontWeight: "bold",
          color: "#424242",
        },
        color: color[i],
        data: seriesListData(item),
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

  useEffect(() => {
    const newSerise = seriesList();
    setOptions((prevState) => {
      return {
        ...prevState,
        series: newSerise,
      }
    })
  }, [data])

  useEffect(() => {
    const newXData = dataX.map((v: any) => v.name);
    const newXAxis = _.cloneDeep(options.xAxis)
    newXAxis.data = newXData;
    setOptions((prevState) => {
      return {
        ...prevState,
        xAxis: newXAxis,
      }
    })
  }, [dataX])

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
      data: [],
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
      boundaryGap: [0, 0.1],
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
