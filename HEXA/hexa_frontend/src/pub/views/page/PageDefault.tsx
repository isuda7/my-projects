// PageDefault : 기본 페이지

import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridNoRecords } from "@progress/kendo-react-grid";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import Sliderflip from "../../components/guide/SliderFlip.tsx";

export default function PageDefault() {
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
        <span>마이 페이지</span>
      </div>

      <div className="head-group">
        <div>
          <h2 className="t-header">마이 페이지</h2>
        </div>
      </div>

      <div className="search-group">
        <dl>
          <div>
            <dt>기간선택</dt>
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
                <Button fillMode="outline" togglable={true} selected>
                  전체
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

      <div className="sort-group">
        <div className="sort-group__counter">
          <span className="total">총 1,000 건</span>
          <DropDownList
            style={{ width: "130px" }}
            data={["20", "50", "100"]}
            defaultValue="20"
            dir="rtl"
          />
        </div>
        <div className="sort-group__btns">
          <Button themeColor={"info"} title="필터 초기화">
            <i className="icon icon-filter"></i>
          </Button>
          <Button themeColor={"info"} title="컬럼 초기화">
            <i className="icon icon-tbl-layout"></i>
          </Button>
          <Button themeColor={"info"} title="컬럼 설정">
            <i className="icon icon-column"></i>
          </Button>
        </div>
      </div>

      <div>
        <Grid
          style={{ width: "100%" }}
          pageable={{
            buttonCount: 10,
            pageSizes: false,
            info: false,
          }}
          scrollable="none"
        >
          <GridNoRecords>There is no data available</GridNoRecords>
        </Grid>
      </div>
    </>
  );
}
