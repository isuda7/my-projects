// HEXAADMSTM2S81 : 스테이션 충전 이력

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
  GridCustomCellProps,
} from "@progress/kendo-react-grid";
import { DropdownFilterCell } from "../../components/guide/dropdownFilterCell";
import { DatePicker } from "@progress/kendo-react-dateinputs";

const sampleProducts = [
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Slot: "1",
    Battery: "1201211012",
    Profile: "10",
    Condition: "일반 충전",
    DateTime: "2024-08-10 12:30:40",
    Time: "3:39:09",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Slot: "1",
    Battery: "1201211012",
    Profile: "9",
    Condition: "일반 충전",
    DateTime: "2024-08-10 12:30:40",
    Time: "3:39:09",
  },
];

export default function HEXAADMSTM2S81() {
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
        <span>스테이션 관리</span>
        <span>스테이션 이력 조회 </span>
        <span>스테이션 충전 이력</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 충전 이력</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <dl>
            <div>
              <dt>충전 시작 기간 </dt>
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
            <Button themeColor={"info"} title="필터 초기화">
              <i className="icon icon-filter"></i>
            </Button>
            <Button themeColor={"info"} title="컬럼 초기화">
              <i className="icon icon-tbl-layout"></i>
            </Button>
            <Button themeColor={"info"} title="컬럼 설정">
              <i className="icon icon-column"></i>
            </Button>
            <Button themeColor={"info"} title="파일 다운로드">
              <i className="icon icon-download"></i>
            </Button>
          </div>
        </div>

        <div>
          <Grid
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
            filterable={true}
          >
            <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

            <Column
              className="txt-center"
              field="Id"
              title="스테이션ID"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="Name"
              title="스테이션명"
              width="140"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Slot"
              title="슬롯 번호"
              width="100"
              filterCell={FunnelFilterCell}
            />
            <Column
              className="txt-left"
              field="Battery"
              title="배터리ID"
              width="130"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Profile"
              title="충전 프로파일 NO"
              width="130"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Condition"
              title="충전 조건"
              width="130"
              filterCell={FunnelFilterCell}
            />
            <Column
              className="txt-left"
              field="DateTime"
              title="충전 시작 일시"
              width="120"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="DateTime"
              title="충전 종료 일시"
              width="120"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-center"
              field="Time"
              title="충전 시간"
              width="120"
              filterable={false}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
