// HEXAADMBTM2S04 : 배터리 교환 및 위치 이력

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
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

const sampleProducts = [
  {
    DateTime: "2024-08-10 20:08:19",
    BatteryID: "2023032904119",
    Location: "배터리교환",
    CarNumber: "KRKGSCD0000071",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    InSlot: "01",
    OutBattery: "20240725100410",
    OutSlot: "02",
    Fail: "",
    Reservation: "ON0000076139",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    BatteryID: "2023032904119",
    Location: "교환실패",
    CarNumber: "KRKGSCD0000071",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    InSlot: "01",
    OutBattery: "20240725100410",
    OutSlot: "02",
    Fail: "Return step. Time Out",
    Reservation: "ON0000076139",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    BatteryID: "2023032904119",
    Location: "중복매핑해제(전기스쿠터)",
    CarNumber: "KRKGSCD0000071",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    InSlot: "01",
    OutBattery: "20240725100410",
    OutSlot: "02",
    Fail: "Return timeout. (The door did not open.)",
    Reservation: "ON0000076139",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    BatteryID: "2023032904119",
    Location: "인증실패",
    CarNumber: "KRKGSCD0000071",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    InSlot: "01",
    OutBattery: "20240725100410",
    OutSlot: "02",
    Fail: "",
    Reservation: "ON0000076139",
  },
];

export default function HEXAADMBTM2S04() {
  //tab
  const [selected, setSelected] = React.useState<number>(0);
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  //grid
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
      <td colSpan={1} className="k-table-td txt-left">
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

  const CustomCellTextColor = (props: any) => {
    const textColor = () => {
      if (props.children === "교환실패") {
        return "c-primary";
      }
      if (props.children === "인증실패") {
        return "c-red";
      }
    };

    return (
      <td colSpan={1} className="k-table-td txt-left">
        <span className={`${textColor()}`}>{props.children}</span>
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
        <span>배터리 관리 </span>
        <span>배터리 교환 및 위치 이력 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">배터리 교환 및 위치 이력</h2>
      </div>

      <div className="tabs">
        <TabStrip selected={selected} onSelect={handleSelect}>
          <TabStripTab title="2세대">
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
                    title="생성일시"
                    width="100"
                    filterable={false}
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="BatteryID"
                    title="배터리ID"
                    width="100"
                    filterCell={SearchFilterCell}
                  />

                  <Column
                    className="txt-left"
                    field="Location"
                    title="위치상태"
                    width="100"
                    filterCell={CategoryFilterCell}
                    cells={{
                      data: CustomCellTextColor,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="CarNumber"
                    title="차대번호"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="ID"
                    title="스테이션ID"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Name"
                    title="스테이션명"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="InSlot"
                    title="반입 슬롯"
                    width="100"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="OutBattery"
                    title="배출 배터리ID"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="OutSlot"
                    title="반출 슬롯"
                    width="100"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Fail"
                    title="실패 이유"
                    width="180"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Reservation"
                    title="예약ID"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                </Grid>
              </div>
            </section>
          </TabStripTab>
          <TabStripTab title="1세대">
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
                    title="생성일시"
                    width="120"
                    filterable={false}
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="BatteryID"
                    title="배터리1ID"
                    width="130"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="BatteryID"
                    title="배터리2ID"
                    width="130"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Location"
                    title="위치상태"
                    width="100"
                    filterCell={CategoryFilterCell}
                    cells={{
                      data: CustomCellTextColor,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="CarNumber"
                    title="차대번호"
                    width="150"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="ID"
                    title="스테이션ID"
                    width="140"
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
                    field="InSlot"
                    title="반입 슬롯1"
                    width="90"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="InSlot"
                    title="반입 슬롯2"
                    width="90"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="OutBattery"
                    title="배출 배터리1ID"
                    width="140"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="OutBattery"
                    title="배출 배터리2ID"
                    width="140"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="OutSlot"
                    title="반출 슬롯1"
                    width="90"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="OutSlot"
                    title="반출 슬롯2"
                    width="90"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Fail"
                    title="실패 이유"
                    width="180"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Reservation"
                    title="예약ID"
                    width="140"
                    filterCell={SearchFilterCell}
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
