import {
  Chart as KendoChart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  SeriesStack,
} from "@progress/kendo-react-charts";

type PropsType = {
  seriesType: "bar" | "line" | "area" | "column";
  chartHeight?: string | number;
  seriesColors?: string[];
  stack?: SeriesStack;
  categories: string[];
  series?: {
    name?: string;
    data: number[];
  }[];
  data?: number[];
};
export default function Chart(props: Readonly<PropsType>) {
  const {
    seriesType,
    categories,
    series,
    stack,
    chartHeight,
    seriesColors,
    data,
  } = props;

  return (
    <KendoChart style={{ height: chartHeight }} seriesColors={seriesColors}>
      <ChartLegend position="bottom" orientation="horizontal" />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={categories} startAngle={45} />
      </ChartCategoryAxis>
      {series ? (
        <ChartSeries>
          {series.map((item) => (
            <ChartSeriesItem
              key={item.name}
              type={seriesType}
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
              stack={stack}
            />
          ))}
        </ChartSeries>
      ) : null}
      {data ? (
        <ChartSeries>
          <ChartSeriesItem
            type={seriesType}
            tooltip={{ visible: true }}
            data={data}
            stack={stack}
          />
        </ChartSeries>
      ) : null}
    </KendoChart>
  );
}
Chart.defaultProps = {
  stack: null, // 또는 적절한 기본 스택 설정
  chartHeight: 480,
  seriesColors: [
    "#3f51b5",
    "#2196f3",
    "#43a047",
    "#ffc107",
    "#ff5722",
    "#e91e63",
  ],
};
