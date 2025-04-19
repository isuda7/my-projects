import { useEffect, useState } from "react";
import ECharts, {EChartsOption} from "echarts-for-react";
import _ from 'lodash';

export default function uiChart(props: any) {
  const color = ["#F5B113", "#2BBE7F"];

  const { data } = props;
  
  useEffect(() => {
    if(data) {
      const newOptions = _.cloneDeep(options)
      newOptions.series[0].data = data;

      setOptions(newOptions)
    }
  }, [data])

  const [options, setOptions] = useState<EChartsOption>({
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["45%", "70%"],
        data: [],
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
