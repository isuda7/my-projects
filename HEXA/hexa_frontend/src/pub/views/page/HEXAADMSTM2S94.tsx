// HEXAADMSTM2S94 : 스테이션별 예약건수

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
} from "@progress/kendo-react-grid";

const sampleProducts = [
  {
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
    Id: "HX0224020C1",
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
export default function HEXAADMSTM2S94() {
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
        <span>스테이션별 예약건수</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션별 예약건수</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <div className="search-flex">
            <DropDownList className="w200" defaultValue="2024" />
            <DropDownList className="w200" defaultValue="7월" />
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
        </div>

        <div className="grid-row-color">
          <Grid
            style={{ maxHeight: "calc(100vh - 300px)" }}
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
              field="Id"
              title="스테이션ID"
              width="140"
              filterCell={SearchFilterCell}
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
              field="Date"
              title="설치일"
              width="120"
              filterable={false}
              locked={true}
            />
            <Column
              className="txt-right"
              field="Accrue"
              title="누적"
              width="100"
              filterable={false}
              locked={true}
            />
            <Column
              className="txt-right"
              field="Mm1"
              title="7/1"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm2"
              title="7/2"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm3"
              title="7/3"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm4"
              title="7/4"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm5"
              title="7/5"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm6"
              title="7/6"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm7"
              title="7/7"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm8"
              title="7/8"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm9"
              title="7/9"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm10"
              title="7/10"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm11"
              title="7/11"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/12"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/13"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/14"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/15"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/16"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/17"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/18"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/19"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/20"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/21"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/22"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/23"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/24"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/25"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/26"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/27"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/28"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/29"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/30"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="7/31"
              width="100"
              filterable={false}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
