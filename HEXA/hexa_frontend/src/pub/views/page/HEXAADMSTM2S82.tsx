// HEXAADMSTM2S82 : 스테이션 Data 수집 이력 조회

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import ChartLine from "../../components/ChartLine";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

const sampleProducts = [
  {
    DateTime: "2024-08-10 12:30:40",
    Number: "27",
    Humidity: "80",
    Wh: "2,315",
  },
  {
    DateTime: "2024-08-10 12:30:40",
    Number: "26",
    Humidity: "80",
    Wh: "2,315",
  },
  {
    DateTime: "2024-08-10 12:30:40",
    Number: "25",
    Humidity: "80",
    Wh: "2,315",
  },
];

export default function HEXAADMSTM2S82() {
  const [selected, setSelected] = React.useState<number>(0);

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  // datepicker
  const [value, setValue] = React.useState(new Date());
  const changeDateStart = () => {
    setValue(value);
  };
  const changeDateEnd = () => {
    setValue(value);
  };

  // chart
  const chartData1 = [
    {
      name: "온도",
      data: [27, 26, 27, 28, 29, 30, 25, 26, 27, 28, 29, 30],
    },
  ];
  const chartData2 = [
    {
      name: "습도",
      data: [20, 30, 50, 60, 80, 70, 60, 50, 40, 30, 50, 60],
    },
  ];
  const chartData3 = [
    {
      name: "전력량",
      data: [
        190000, 300000, 170000, 350000, 300000, 400000, 300000, 280000, 100000,
        480000, 170000, 250000,
      ],
    },
  ];

  const chartDataX = [
    "2024-06-05 20:08:19",
    "2024-06-06 20:08:19",
    "2024-06-07 20:08:19",
    "2024-06-08 20:08:19",
    "2024-06-09 20:08:19",
    "2024-06-10 20:08:19",
    "2024-06-11 20:08:19",
    "2024-06-12 20:08:19",
    "2024-06-13 20:08:19",
    "2024-06-14 20:08:19",
    "2024-06-15 20:08:19",
    "2024-06-16 20:08:19",
  ];

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>스테이션 이력 조회 </span>
        <span>스테이션 Data 수집 이력 조회 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 Data 수집 이력 조회</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <dl>
            <div>
              <dt>스테이션 명</dt>
              <dd>
                <DropDownList
                  style={{ width: "200px" }}
                  defaultValue="GS25 강남점"
                />
              </dd>
            </div>
            <div>
              <dt>기간 </dt>
              <dd>
                <span className="period">
                  <Button fillMode="outline" togglable={true}>
                    오늘
                  </Button>
                  <Button fillMode="outline" togglable={true} selected>
                    1주
                  </Button>
                  <Button fillMode="outline" togglable={true}>
                    1달
                  </Button>
                  <Button fillMode="outline" togglable={true}>
                    전체
                  </Button>
                </span>

                <span className="datepicker">
                  <span className="cell">
                    <DatePicker
                      value={value}
                      onChange={changeDateStart}
                      format={"yyyy-MM-dd"}
                    />
                  </span>
                  ~
                  <span className="cell">
                    <DatePicker
                      value={value}
                      onChange={changeDateEnd}
                      format={"yyyy-MM-dd"}
                    />
                  </span>
                </span>
              </dd>
            </div>
          </dl>
          <div className="group-align-right">
            <Button size={"medium"} themeColor={"dark"}>
              <i className="icon icon-search"></i>
              검색
            </Button>
          </div>
        </div>
      </section>

      <div className="tabs-chart">
        <TabStrip selected={selected} onSelect={handleSelect}>
          <TabStripTab title="온도">
            <div className="tab-chart-box">
              <div className="chart">
                <ChartLine
                  data={chartData1}
                  dataX={chartDataX}
                  label={true}
                  color={0}
                  unit="°C"
                />
              </div>
            </div>

            <section className="section">
              <div className="sort-group">
                <div className="sort-group__counter">
                  <span className="total">전체 100</span>
                  <DropDownList
                    style={{ width: "130px" }}
                    data={["20", "50", "100"]}
                    defaultValue="20"
                    dir="rtl"
                  />
                </div>
                <div className="sort-group__btns">
                  <Button themeColor={"info"} title="파일 다운로드">
                    <i className="icon icon-download"></i>
                  </Button>
                </div>
                <div className="sort-group__txt">
                  <span className="c-red">
                    ※ 다운로드 시, 전체 데이터가 다운로드됩니다.
                  </span>
                </div>
              </div>

              <div className="grid-box-line">
                <Grid data={sampleProducts} scrollable="none" sortable={true}>
                  <Column
                    className="txt-center"
                    field="DateTime"
                    title="일시"
                    width="300"
                  />
                  <Column
                    className="txt-center"
                    field="Number"
                    title="온도(°C)"
                    width="300"
                  />
                </Grid>
              </div>
            </section>
          </TabStripTab>
          <TabStripTab title="습도">
            <div className="tab-chart-box">
              <div className="chart">
                <ChartLine
                  data={chartData2}
                  dataX={chartDataX}
                  color={1}
                  unit="%"
                />
              </div>
            </div>
            <section className="section">
              <div className="sort-group">
                <div className="sort-group__counter">
                  <span className="total">전체 100</span>
                  <DropDownList
                    style={{ width: "130px" }}
                    data={["20", "50", "100"]}
                    defaultValue="20"
                    dir="rtl"
                  />
                </div>
                <div className="sort-group__btns">
                  <Button themeColor={"info"} title="파일 다운로드">
                    <i className="icon icon-download"></i>
                  </Button>
                </div>
                <div className="sort-group__txt">
                  <span className="c-red">
                    ※ 다운로드 시, 전체 데이터가 다운로드됩니다.
                  </span>
                </div>
              </div>

              <div className="grid-box-line">
                <Grid data={sampleProducts} scrollable="none" sortable={true}>
                  <Column
                    className="txt-center"
                    field="DateTime"
                    title="일시"
                    width="300"
                  />
                  <Column
                    className="txt-center"
                    field="Humidity"
                    title="습도(%)"
                    width="300"
                  />
                </Grid>
              </div>
            </section>
          </TabStripTab>
          <TabStripTab title="전력량">
            <div className="tab-chart-box">
              <div className="chart">
                <ChartLine
                  data={chartData3}
                  dataX={chartDataX}
                  color={2}
                  unit="Wh"
                />
              </div>
            </div>
            <section className="section">
              <div className="sort-group">
                <div className="sort-group__counter">
                  <span className="total">전체 100</span>
                  <DropDownList
                    style={{ width: "130px" }}
                    data={["20", "50", "100"]}
                    defaultValue="20"
                    dir="rtl"
                  />
                </div>
                <div className="sort-group__btns">
                  <Button themeColor={"info"} title="파일 다운로드">
                    <i className="icon icon-download"></i>
                  </Button>
                </div>
                <div className="sort-group__txt">
                  <span className="c-red">
                    ※ 다운로드 시, 전체 데이터가 다운로드됩니다.
                  </span>
                </div>
              </div>

              <div className="grid-box-line">
                <Grid data={sampleProducts} scrollable="none" sortable={true}>
                  <Column
                    className="txt-center"
                    field="DateTime"
                    title="일시"
                    width="300"
                  />
                  <Column
                    className="txt-center"
                    field="Wh"
                    title="전력량(Wh)"
                    width="300"
                  />
                </Grid>
              </div>
            </section>
          </TabStripTab>
        </TabStrip>
      </div>
    </>
  );
}
