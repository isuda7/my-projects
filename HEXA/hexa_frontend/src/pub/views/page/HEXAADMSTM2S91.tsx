// 	HEXAADMSTM2S91 : 함체,슬롯별 교환횟수

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
} from "@progress/kendo-react-grid";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

const sampleProducts = [
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "3",
    Mm7: "5",
    Mm8: "1",
    Mm9: "3",
    Mm10: "5",
    Mm11: "2",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "3",
    Mm7: "5",
    Mm8: "1",
    Mm9: "3",
    Mm10: "5",
    Mm11: "2",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "3",
    Mm7: "5",
    Mm8: "1",
    Mm9: "3",
    Mm10: "5",
    Mm11: "2",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "3",
    Mm7: "5",
    Mm8: "1",
    Mm9: "3",
    Mm10: "5",
    Mm11: "2",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "3",
    Mm7: "5",
    Mm8: "1",
    Mm9: "3",
    Mm10: "5",
    Mm11: "2",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "3",
    Mm7: "5",
    Mm8: "1",
    Mm9: "3",
    Mm10: "5",
    Mm11: "2",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "5",
    Mm2: "1",
    Mm3: "2",
    Mm4: "-",
    Mm5: "-",
    Mm6: "-",
    Mm7: "-",
    Mm8: "-",
    Mm9: "-",
    Mm10: "-",
    Mm11: "-",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "-",
    Mm7: "-",
    Mm8: "-",
    Mm9: "-",
    Mm10: "-",
    Mm11: "-",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "-",
    Mm7: "-",
    Mm8: "-",
    Mm9: "-",
    Mm10: "-",
    Mm11: "-",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "-",
    Mm7: "-",
    Mm8: "-",
    Mm9: "-",
    Mm10: "-",
    Mm11: "-",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "-",
    Mm7: "-",
    Mm8: "-",
    Mm9: "-",
    Mm10: "-",
    Mm11: "-",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "-",
    Mm7: "-",
    Mm8: "-",
    Mm9: "-",
    Mm10: "-",
    Mm11: "-",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "-",
    Mm7: "-",
    Mm8: "-",
    Mm9: "-",
    Mm10: "-",
    Mm11: "-",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "-",
    Mm7: "-",
    Mm8: "-",
    Mm9: "-",
    Mm10: "-",
    Mm11: "-",
    Mm12: "-",
  },
  {
    SN: "123466126510",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    Accrue: "27",
    Mm1: "-",
    Mm2: "-",
    Mm3: "-",
    Mm4: "-",
    Mm5: "-",
    Mm6: "-",
    Mm7: "-",
    Mm8: "-",
    Mm9: "-",
    Mm10: "-",
    Mm11: "-",
    Mm12: "-",
  },
];

export default function HEXAADMSTM2S91() {
  // tab
  const [selected, setSelected] = React.useState<number>(0);
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  // grid
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);

  const SearchFilterCell = (props: any) => (
    <div className="inner-item type-icon">
      <Input />
      <Button size={"small"} fillMode="flat" className="btn-icon">
        <i className="icon icon-glass"></i>
      </Button>
    </div>
  );

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>스테이션 통계정보 </span>
        <span>함체,슬롯별 교환횟수 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">함체,슬롯별 교환횟수 </h2>
      </div>

      <div className="tabs">
        <TabStrip selected={selected} onSelect={handleSelect}>
          <TabStripTab title="함체">
            <section className="section">
              {/* 검색 박스 */}
              <div className="search-group">
                <div className="search-flex">
                  <DropDownList className="w200" defaultValue="2024" />
                  <DropDownList className="w200" defaultValue="월 선택" />
                </div>
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
                    ※ 현재 연결된 스테이션가 없는 경우, 스테이션명이 출력되지
                    않습니다.
                  </span>
                </div>
              </div>

              <div className="grid-row-color">
                <Grid
                  style={{ maxHeight: "calc(100vh - 380px)" }}
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
                    field="SN"
                    title="함체 S/N"
                    width="140"
                    filterCell={SearchFilterCell}
                    locked={true}
                  />
                  <Column
                    className="txt-center"
                    field="Date"
                    title="생산일"
                    width="120"
                    filterable={false}
                    locked={true}
                  />
                  <Column
                    className="txt-left"
                    field="Name"
                    title="스테이션명"
                    width="140"
                    filterCell={SearchFilterCell}
                    locked={true}
                  />
                  <Column
                    className="txt-center"
                    field="Accrue"
                    title="누적"
                    width="100"
                    filterable={false}
                    locked={true}
                  />
                  <Column
                    className="txt-center"
                    field="Mm1"
                    title="1월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm2"
                    title="2월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm3"
                    title="3월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm4"
                    title="4월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm5"
                    title="5월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm6"
                    title="6월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm7"
                    title="7월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm8"
                    title="8월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm9"
                    title="9월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm10"
                    title="10월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm11"
                    title="11월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm12"
                    title="12월"
                    width="80"
                    filterable={false}
                  />
                </Grid>
              </div>
            </section>
          </TabStripTab>
          <TabStripTab title="슬롯">
            <section className="section">
              {/* 검색 박스 */}
              <div className="search-group">
                <div className="search-flex">
                  <DropDownList className="w200" defaultValue="2024" />
                  <DropDownList className="w200" defaultValue="월 선택" />
                </div>
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
                    ※ 현재 연결된 스테이션가 없는 경우, 스테이션명이 출력되지
                    않습니다.
                  </span>
                </div>
              </div>

              <div className="grid-row-color">
                <Grid
                  style={{ maxHeight: "calc(100vh - 380px)" }}
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
                    field="SN"
                    title="슬롯 S/N"
                    width="140"
                    filterCell={SearchFilterCell}
                    locked={true}
                  />
                  <Column
                    className="txt-center"
                    field="Date"
                    title="생산일"
                    width="120"
                    filterable={false}
                    locked={true}
                  />
                  <Column
                    className="txt-left"
                    field="Name"
                    title="스테이션명"
                    width="140"
                    filterCell={SearchFilterCell}
                    locked={true}
                  />
                  <Column
                    className="txt-center"
                    field="Accrue"
                    title="누적"
                    width="100"
                    filterable={false}
                    locked={true}
                  />
                  <Column
                    className="txt-center"
                    field="Mm1"
                    title="1월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm2"
                    title="2월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm3"
                    title="3월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm4"
                    title="4월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm5"
                    title="5월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm6"
                    title="6월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm7"
                    title="7월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm8"
                    title="8월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm9"
                    title="9월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm10"
                    title="10월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm11"
                    title="11월"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Mm12"
                    title="12월"
                    width="80"
                    filterable={false}
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
