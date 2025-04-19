import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ECharts from "echarts-for-react";
import _ from 'lodash';

export default function BatterySuccessChart(props: any) {
  const {t} = useTranslation();
  const { data, dataX } = props;
  const arrA = data?.dataA || [];
  const arrB = data?.dataB || [];
  const arrT: any = [];
  
  arrA.map((x: number, y: number) => {
    const t = x + arrB[y];
    arrT.push(t);
  });
  
  useEffect(() => {
    const newSeries = _.cloneDeep(options.series);
    newSeries.forEach((v: any, i: number) => {
      if(i === 0) { //합계
        v.data = seriesListData(arrT)
      }
      else if(i === 1) {
        v.data = arrA;
      }
      else if(i === 2) {
        v.data = arrB;
      }
    })
    setOptions((prevState) => {
      return {
        ...prevState,
        series: newSeries,
      }
    })
  }, [data])


  const seriesListData = (arrT: any) => {
    const seriesListData: any = [];
    arrT.map(function (item: any, i: any) {
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
    series: [
      {
        name: t('home.sum'), //"합계",
        type: "bar",
        barWidth: 24,
        label: {
          show: true,
          position: "top",
          fontWeight: "bold",
          color: "#424242",
        },
        color: "#D9D9D9",
        data: seriesListData(arrT),
      },
      {
        name: t('home.first_gen'), //"1세대",
        type: "line",
        symbolSize: 6,
        label: {
          show: true,
          position: "right",
          offset: [11, 9],
          color: "#fff",
          align: "center",
          verticalAlign: "bottom",
          fontWeight: "bold",
          borderRadius: 12,
          width: 30,
          height: 16,
          backgroundColor: "#F6C142",
          padding: [0, 0, 2, 0],
        },
        color: "#F6C142",
        data: arrA,
      },
      {
        name: t('home.second_gen'), //"2세대",
        type: "line",
        symbolSize: 6,
        label: {
          show: true,
          position: "right",
          offset: [11, 9],
          color: "#fff",
          align: "center",
          verticalAlign: "bottom",
          fontWeight: "bold",
          borderRadius: 12,
          width: 30,
          height: 16,
          backgroundColor: "#028C51",
          padding: [0, 0, 2, 0],
        },
        color: "#65C340",
        data: arrB,
      },
    ],
  });

  return (
    <>
      <ECharts option={options} />
    </>
  );
}
