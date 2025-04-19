// HEXAADMERM2S02 : 스테이션 고장 이력

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
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    Target: "스테이션",
    Number: "01",
    SlotNum: "",
    Level: "고장",
    TroubleCode: "ER_BSS_01",
    CodeName: "ERR_CHASSIS_FAN_FAULT",
    Desc: "함체 팬 작동 불량 검출",
    State: "발생",
    Fix: "",
    FixMemo: "",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    Target: "스테이션",
    Number: "01",
    SlotNum: "",
    Level: "고장",
    TroubleCode: "ER_BSS_01",
    CodeName: "ERR_CHASSIS_FAN_FAULT",
    Desc: "BMS 펌웨어 업데이트 실패",
    State: "조치완료",
    Fix: "",
    FixMemo: "",
  },
];

export default function HEXAADMERM2S02() {
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

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} {...props.tdProps}>
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
      <td colSpan={1} {...props.tdProps}>
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
        <span>스테이션 고장 및 통신 관리 </span>
        <span>스테이션 고장 이력 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 고장 이력</h2>
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
              <p className="t-title-s mb1">
                조치필요건수 <span className="c-red">10</span>
              </p>
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
                <div className="sort-group__title">
                  <span>업데이트 2024-08-05 22:00:10</span>
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
                    title="발생일시"
                    width="100"
                    filterable={false}
                    cells={{
                      data: CustomCellDateTime,
                    }}
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
                    width="100"
                    filterCell={CategoryFilterCell}
                    cells={{
                      data: CustomCellTextColor,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="Target"
                    title="대상"
                    width="100"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="Number"
                    title="함체번호"
                    width="90"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="SlotNum"
                    title="슬롯번호"
                    width="90"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="Level"
                    title="레벨"
                    width="100"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="TroubleCode"
                    title="고장 코드"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="CodeName"
                    title="코드명"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Desc"
                    title="설명"
                    width="180"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="State"
                    title="상태"
                    width="100"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="DateTime"
                    title="조치일시"
                    width="100"
                    filterable={false}
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="Fix"
                    title="조치등록자"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="FixMemo"
                    title="조치내용"
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
                    title="발생일시"
                    width="120"
                    filterable={false}
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="ID"
                    title="스테이션명"
                    width="130"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Target"
                    title="대상"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Level"
                    title="레벨"
                    width="100"
                    filterCell={CategoryFilterCell}
                    cells={{
                      data: CustomCellTextColor,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="TroubleCode"
                    title="고장코드"
                    width="120"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="CodeName"
                    title="코드명"
                    width="140"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="State"
                    title="상태"
                    width="120"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="FixMemo"
                    title="처리내용"
                    width="140"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="FixMemo"
                    title="처리완료일시"
                    width="90"
                    filterable={false}
                  />
                  <Column
                    className="txt-left"
                    field="Fix"
                    title="처리자"
                    width="120"
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
