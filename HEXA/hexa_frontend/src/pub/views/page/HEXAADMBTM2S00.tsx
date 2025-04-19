// HEXAADMBTM2S00 : 배터리 정보 관리

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

const sampleProducts = [
  {
    BetteryID: "2023081808223",
    KSID: "123456789012345678901",
    HWver: "1.0.0",
    BMSver: "1.0.00",
    DateTime: "2024-08-10 12:30:40",
    Sort1: "등록",
    Sort2: "사용대기",
    Name: "GS강남점",
    CarNumber: "KRKGS1CB5PD000532",
    UserID: "superadmin01",
    ID: "superadmin01",
  },
  {
    BetteryID: "2023081808223",
    KSID: "123456789012345678901",
    HWver: "1.0.0",
    BMSver: "1.0.00",
    DateTime: "2024-08-10 12:30:40",
    Sort1: "등록",
    Sort2: "사용대기",
    Name: "GS강남점",
    CarNumber: "KRKGS1CB5PD000532",
    UserID: "superadmin01",
    ID: "superadmin01",
  },
];

export default function HEXAADMBTM2S00() {
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

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

  interface CustomCellProps extends GridCustomCellProps {
    tdProps?: React.TdHTMLAttributes<HTMLTableCellElement> | null;
    children?: React.ReactNode | React.ReactNode[];
  }

  const CustomCellLink = (props: CustomCellProps) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <a href="" className="underline">
          {props.children}
        </a>
      </td>
    );
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span> 배터리 관리 </span>
        <span>배터리 정보 관리</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">배터리 정보 관리</h2>
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

          <div className="group-align-right gap0.38">
            <Button
              size={"medium"}
              fillMode="outline"
              themeColor={"light"}
              className="btn-in-icon"
            >
              엑셀 업로드 <i className="icon icon-excel"></i>
            </Button>
            <Button
              size={"medium"}
              themeColor={"primary"}
              className="btn-in-icon"
            >
              신규등록 <i className="icon icon-new-add"></i>
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
              className="txt-left"
              field="BetteryID"
              title="배터리 ID"
              width="120"
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellLink,
              }}
            />
            <Column
              className="txt-left"
              field="HWver"
              title="HW 버전"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="BMSver"
              title="BMS 버전"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="Sort1"
              title="사용구분1"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-left"
              field="Sort2"
              title="사용구분2"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-left"
              field="Name"
              title="스테이션명"
              width="100"
              filterCell={SearchFilterCell}
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
              field="DateTime"
              title="사용구분 수정일시"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="UserId"
              title="사용구분 수정자ID"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="DateTime"
              title="등록일시"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="Id"
              title="등록자 ID"
              width="100"
              filterCell={SearchFilterCell}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
