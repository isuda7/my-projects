// HEXAADMSTM2S43 : 스테이션 설정 현황

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
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    Sort: "SOC 높은팩",
    Ranking1: "SOC 높은 순",
    Ranking2: "누적교환횟수 높은 순",
    Ranking3: "SOC 낮은 순",
    Counter1: "20",
    Counter2: "10",
    Counter3: "5",
    Counter4: "4",
    Counter5: "3",
    DateTime: "일요일 00시 00분",
  },
];

export default function HEXAADMSTM2S43() {
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);

  // 툴팁 위치
  const fnHover = (e: any) => {
    const topPosOffset = e.target.getBoundingClientRect();
    const child = e.target.querySelector(".tooltiptext") as HTMLElement;
    child.style.top = topPosOffset.top + 0 + "px";
    child.style.left = topPosOffset.left + topPosOffset.width + 10 + "px";
  };

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

  const CustomCellLink = (props: CustomCellProps) => {
    return (
      <td {...props.tdProps}>
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

  const CustomCellTooltip = (props: any) => {
    const str = props.children;
    const words = str.split(",");
    const wordlist = words.map((item: any, i: any) => <p key={i}>{item}</p>);
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <a href="" className="underline tooltip" onMouseEnter={fnHover}>
          {words.length == 1 ? (
            <span>{words[0]}</span>
          ) : (
            <span>
              {words[0]} 외 {words.length - 1} 건{" "}
            </span>
          )}
          <div className="tooltiptext">{wordlist}</div>
        </a>
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
        <span>스테이션 설정 관리 </span>
        <span>스테이션 설정 현황</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 설정 현황</h2>
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

        {/*
          [css class]
          a태그 언더라인 : '.underline
          Yes: '.type-Yes'
          No : '.type-No' 
         */}
        <div className="grid-row-3">
          <Grid
            style={{ maxHeight: "calc(100vh - 200px)" }}
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
              className="txt-left"
              field="ID"
              title="스테이션 ID"
              width="120"
              locked={true}
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellLink,
              }}
            />
            <Column
              className="txt-center"
              field="Name"
              title="스테이션명"
              width="100"
              locked={true}
              filterCell={SearchFilterCell}
            />
            <Column title="온도 범위(1월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(2월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(3월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(4월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(5월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(6월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(7월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(8월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(9월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(10월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(11월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>
            <Column title="온도 범위(12월)">
              <Column
                className="txt-center"
                field="Counter1"
                title="최저"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="최고"
                width="50"
                filterable={false}
              />
            </Column>

            <Column
              className="txt-left"
              field="Sort"
              title="충전순서"
              width="120"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-center"
              field="Counter1"
              title="배출가능 SOC(%)"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-center"
              field="Counter2"
              title="사용가능 전력량(Wh)"
              width="100"
              filterable={false}
            />

            <Column title="배출우선순위">
              <Column
                className="txt-left"
                field="Ranking1"
                title="1순위"
                width="140"
                filterable={false}
              />
              <Column
                className="txt-left"
                field="Ranking2"
                title="2순위"
                width="140"
                filterable={false}
              />
              <Column
                className="txt-left"
                field="Ranking3"
                title="3순위"
                width="140"
                filterable={false}
              />
            </Column>

            <Column title="번잡도">
              <Column
                className="txt-center"
                field="Counter3"
                title="00-01"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="01-02"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="02-03"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="03-04"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="04-05"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="05-06"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="06-07"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="07-08"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="08-09"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="09-10"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="10-11"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="11-12"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="12-13"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="13-14"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="14-15"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="15-16"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="16-17"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="17-18"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="18-19"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="19-20"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="20-21"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="21-22"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter5"
                title="22-23"
                width="50"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter5"
                title="23-24"
                width="50"
                filterable={false}
              />
            </Column>

            <Column
              className="txt-left"
              field="DateTime"
              title="OS 재부팅 주기"
              width="140"
              filterCell={CategoryFilterCell}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
