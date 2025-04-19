// HEXAADMBTM2S09 : 배터리 상태변화 이력

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

const sampleProducts = [
  {
    DateTime: "2024-08-10 20:08:19",
    Division: "반입",
    BatteryID: "2023081808223",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    SlotNumber: "01",
    SOH: "97.1",
    SOHR: "97.1",
    Counter: "0",
    Charging: "0",
    Discharge: "0",
    KWH: "0",
    Cycle: "0",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Division: "배출",
    BatteryID: "2023081808223",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    SlotNumber: "01",
    SOH: "97.1",
    SOHR: "97.1",
    Counter: "69",
    Charging: "5,781",
    Discharge: "5,000",
    KWH: "1,200",
    Cycle: "2",
  },
];

export default function HEXAADMBTM2S09() {
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
        <span>배터리 상태변화 이력</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">배터리 상태변화 이력</h2>
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
            filterable={true}
          >
            <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

            <Column
              className="txt-left"
              field="DateTime"
              title="수집 일시"
              width="140"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-center"
              field="Division"
              title="구분"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-left"
              field="BatteryID"
              title="배터리ID"
              width="120"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="ID"
              title="스테이션ID"
              width="120"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="Name"
              title="스테이션명"
              width="120"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="SlotNumber"
              title="슬롯번호"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-right"
              field="SOH"
              title="SOH(%)"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-right"
              field="SOH"
              title="SOC (%)"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-right"
              field="SOHR"
              title="SOHR(%)"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-right"
              field="Counter"
              title="누적교환횟수"
              width="90"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Charging"
              title="누적충전 에너지(kWh)"
              width="90"
              filterable={false}
              headerCell={customHeaderCell}
            />
            <Column
              className="txt-right"
              field="Discharge"
              title="누적방전 에너지(kWh)"
              width="90"
              filterable={false}
              headerCell={customHeaderCell}
            />
            <Column
              className="txt-right"
              field="KWH"
              title="사용전력량(kWh)"
              width="90"
              filterable={false}
              headerCell={customHeaderCell}
            />
            <Column
              className="txt-right"
              field="Cycle"
              title="충전 Cycle"
              width="90"
              filterable={false}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
