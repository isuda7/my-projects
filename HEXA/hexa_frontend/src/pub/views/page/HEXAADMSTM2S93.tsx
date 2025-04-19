// HEXAADMSTM2S93 : 전력사용량

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
} from "@progress/kendo-react-grid";
import { DropdownFilterCell } from "../../components/guide/dropdownFilterCell";
import { process } from "@progress/kendo-data-query";

const sampleProducts = [
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "300",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "2,444",
    Mm11: "3,217",
    Mm12: "5,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
  {
    Id: "HX0224020C1",
    Name: "GS25 강남점",
    Date: "2024-08-10",
    YN: "N",
    DateTime: "2024-07-19 20:08:19",
    Accrue: "2,791,286",
    Mm1: "2,933",
    Mm2: "3,782",
    Mm3: "3,264",
    Mm4: "2,444",
    Mm5: "5,884",
    Mm6: "9,227",
    Mm7: "30,535",
    Mm8: "3,217",
    Mm9: "3,782",
    Mm10: "22,444",
    Mm11: "3,217",
    Mm12: "25,884",
  },
];

export default function HEXAADMSTM2S93() {
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

  const CategoryFilterCell = (props: any) => (
    <DropdownFilterCell
      {...props}
      // data={categories}
      defaultItem={"전체"}
    />
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
    const number = props.children.replace(",", "");
    let textColor;
    let textAst;

    if (number < 1000 || number > 50000) {
      textColor = "c-red";
      textAst = true;
    }

    return (
      <td colSpan={1} {...props.tdProps}>
        <span className={textColor}>
          {props.children}
          {textAst ? "*" : ""}
        </span>
      </td>
    );
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>스테이션 통계정보 </span>
        <span>전력사용량</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">전력사용량</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <div className="search-flex">
            <DropDownList className="w200" defaultValue="2024" />
            <DropDownList className="w200" defaultValue={"월 선택"} />
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
              * 정상 범위를 벗어난 전력량 이상 감지한 상태입니다.
            </span>
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
              className="txt-center"
              field="YN"
              title="미사용 여부"
              width="100"
              locked={true}
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-left"
              field="DateTime"
              title="미사용 등록일"
              width="120"
              filterable={false}
              locked={true}
              cells={{
                data: CustomCellDateTime,
              }}
            />

            <Column
              className="txt-right"
              field="Accrue"
              title="전체(Wh)"
              width="100"
              filterable={false}
              locked={true}
            />
            <Column
              className="txt-right"
              field="Mm1"
              title="1월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-right"
              field="Mm2"
              title="2월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-right"
              field="Mm3"
              title="3월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-right"
              field="Mm4"
              title="4월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-right"
              field="Mm5"
              title="5월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />

            <Column
              className="txt-right"
              field="Mm6"
              title="6월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-right"
              field="Mm7"
              title="7월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-right"
              field="Mm8"
              title="8월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-right"
              field="Mm9"
              title="9월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-right"
              field="Mm10"
              title="10월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-right"
              field="Mm11"
              title="11월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-right"
              field="Mm12"
              title="12월"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellTextColor,
              }}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
