import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";

import "hammerjs";

type Props = {
  series?: {
    category: string;
    value: number | string;
  }[];
  seriesColors?: string[];
};
export default function ChartPie(props: Props) {
  const { series, seriesColors } = props;
  return (
    <Chart seriesColors={seriesColors} style={{ height: 250 }}>
      <ChartLegend position="bottom" />
      <ChartSeries>
        <ChartSeriesItem
          type="pie"
          data={series}
          field="value"
          categoryField="category"
        />
      </ChartSeries>
    </Chart>
  );
}
ChartPie.defaultProps = {
  series: [
    { category: "0-14", value: 0.2545 },
    { category: "15-24", value: 0.1552 },
    { category: "25-54", value: 0.4059 },
    { category: "55-64", value: 0.0911 },
    { category: "65+", value: 0.0933 },
  ],
  seriesColors: [
    "#3f51b5",
    "#2196f3",
    "#43a047",
    "#ffc107",
    "#ff5722",
    "#e91e63",
  ],
};
