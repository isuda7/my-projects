// HEXAADMBTM5S16 : SOH 조회

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
  GridCustomCellProps,
  GridHeaderCellProps,
} from "@progress/kendo-react-grid";
import { DropdownFilterCell } from "../../components/guide/dropdownFilterCell";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import ChartLine from "../../components/ChartLine";

const sampleProducts = [
  {
    DateTime: "2024-08-10 20:08:19",
    CTO: "93.8",
    BMS: "93.7",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    CTO: "93.8",
    BMS: "93.7",
  },
];

// chart
const chartData1 = [
  {
    name: "BMS SOH",
    data: [27, 15, 30, 35, 27, 45, 30, 35],
  },
  {
    name: "CTO SOH",
    data: [10, 5, 10, 15, 20, 25, 30, 15],
  },
];

const chartDataX = [
  "2024-06-05",
  "2024-06-06",
  "2024-06-07",
  "2024-06-08",
  "2024-06-09",
  "2024-06-10",
  "2024-06-11",
  "2024-06-12",
];

export default function HEXAADMBTM5S16() {
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);

  const CategoryFilterCell = (props: any) => (
    <DropdownFilterCell
      {...props}
      // data={categories}
      defaultItem={"전체"}
    />
  );

  const SearchFilterCell = (props: any) => (
    <div className="inner-item type-icon">
      <Input />
      <Button size={"small"} fillMode="flat" className="btn-icon">
        <i className="icon icon-glass"></i>
      </Button>
    </div>
  );

  const FunnelFilterCell = (props: any) => (
    <div className="inner-item type-icon">
      <Input defaultValue={"선택"} />
      <Button size={"small"} fillMode="flat" className="btn-icon">
        <i className="icon icon-funnel"></i>
      </Button>
    </div>
  );

  interface CustomCellProps extends GridCustomCellProps {
    tdProps?: React.TdHTMLAttributes<HTMLTableCellElement> | null;
    children?: React.ReactNode | React.ReactNode[];
  }

  const CustomCellRepresentative = (props: CustomCellProps) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <span className={`type-${props.children}`}> {props.children} </span>
      </td>
    );
  };

  const CustomCellLink = (props: CustomCellProps) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <a href="" className="underline">
          {props.children}
        </a>
      </td>
    );
  };

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

  interface ProductNameHeaderProps extends GridHeaderCellProps {
    children: any;
  }

  const customHeaderCell = (props: ProductNameHeaderProps) => {
    const tit = props.title;
    const words1 = tit?.slice(0, -5);
    const words2 = tit?.slice(-5);
    return (
      <>
        <span className="k-cell-inner">
          <span className="k-link !k-cursor-default">
            <span className="k-column-title">
              {words1}
              <br />
              {words2}
            </span>
          </span>
        </span>
      </>
    );
  };

  // datepicker
  const [value, setValue] = React.useState(new Date());
  const changeDateStart = () => {
    setValue(value);
  };
  const changeDateEnd = () => {
    setValue(value);
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>배터리 관리 </span>
        <span>배터리 주요지표</span>
        <span>SOH 조회</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">SOH 조회</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <dl>
            <div>
              <dt>배터리ID</dt>
              <dd>
                <div className="in-input">
                  <Input className="w300" />
                </div>
              </dd>
            </div>
            <div>
              <dt>기간</dt>
              <dd>
                <span className="period">
                  <Button fillMode="outline" togglable={true}>
                    오늘
                  </Button>
                  <Button fillMode="outline" togglable={true}>
                    1주
                  </Button>
                  <Button fillMode="outline" togglable={true}>
                    1달
                  </Button>
                  <Button fillMode="outline" togglable={true}>
                    1년
                  </Button>
                </span>

                <span className="datepicker">
                  <span className="cell">
                    <DatePicker value={value} onChange={changeDateStart} />
                  </span>
                  ~
                  <span className="cell">
                    <DatePicker value={value} onChange={changeDateEnd} />
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

      <section className="section">
        <div>
          <DropDownList className="w150" defaultValue={"전체"} />
        </div>
        <div className="chart cahart-line" style={{ height: "540px" }}>
          <ChartLine data={chartData1} dataX={chartDataX} unit="%" />
        </div>
      </section>

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

        <div>
          <Grid
            style={{ maxHeight: "600px" }}
            data={sampleProducts}
            skip={page.skip}
            take={page.take}
            total={sampleProducts.length}
            pageable={{
              buttonCount: 10,
              pageSizes: false,
              info: false,
            }}
            scrollable="scrollable"
            filterable={false}
          >
            <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

            <Column
              className="txt-center"
              field="DateTime"
              title="일시"
              width="140"
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-center"
              field="BMS"
              title="BMS SOH(%)"
              width="100"
            />
            <Column
              className="txt-center"
              field="CTO"
              title="CTO SOH(%)"
              width="100"
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
