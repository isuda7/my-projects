// HEXAADMSTM2S80 : 대시보드 제어 이력

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
    Generation: "1세대",
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Target: "함체1(대표)",
    Control: "메인보드 리셋",
    Representative: "Yes",
    DateTime: "2024-08-10 12:30:40",
    UserId: "superadmin01",
  },
  {
    Generation: "1세대",
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Target: "함체1(대표)",
    Control: "메인보드 리셋",
    Representative: "No",
    DateTime: "2024-08-10 12:30:40",
    UserId: "superadmin01",
  },
];

export default function HEXAADMSTM2S80() {
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
        <span>대시보드 제어 이력</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">대시보드 제어 이력</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <dl>
            <div>
              <dt>기간</dt>
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
          <div className="sort-group__txt">
            <span className="c-red">
              ※ 1세대인 경우, 제어 이력은 HEXA에서 제어한 이력만 조회됩니다.
              <br />※ 1세대인 경우, 성공여부는 서버에서 스테이션에 제어 전달
              성공여부입니다.
            </span>
          </div>
        </div>

        {/*
          [css class]
          a태그 언더라인 : '.underline
          Yes: '.type-Yes'
          No : '.type-No' 
         */}
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
              field="Generation"
              title="세대구분"
              width="80"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-center"
              field="Id"
              title="스테이션ID"
              width="80"
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
              className="txt-left"
              field="Target"
              title="제어 대상"
              width="100"
              filterCell={FunnelFilterCell}
            />
            <Column
              className="txt-left"
              field="Control"
              title="제어명"
              width="160"
              filterCell={FunnelFilterCell}
            />
            <Column
              className="txt-center"
              field="Representative"
              title="성공여부"
              width="110"
              filterCell={CategoryFilterCell}
              cells={{
                data: CustomCellRepresentative,
              }}
            />
            <Column
              className="txt-center"
              field="DateTime"
              title="제어일시"
              width="140"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="UserId"
              title="제어자 ID"
              width="120"
              filterCell={SearchFilterCell}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
