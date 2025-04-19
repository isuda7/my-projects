// HEXAADMSTM2S00 : 스테이션 정보 관리

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
    Id: "HX0224020C1",
    QRID: "C0034",
    Icon: "plus",
    Division: "-",
    Representative: "Yes",
    No: "1",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
    Number: "10",
  },
  {
    Id: "HX0224012C2",
    QRID: "C0034",
    Icon: "Minus",
    Division: "-",
    Representative: "No",
    No: "1",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
    Number: "2",
  },
];

export default function HEXAADMSTM2S00() {
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);

  const CategoryFilterCell = (props: any) => (
    <DropdownFilterCell
      {...props}
      // data={categories}
      defaultItem={"선택"}
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
      <td colSpan={1} className="k-table-td txt-center">
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

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>스테이션 정보 관리 </span>
        <span>스테이션 정보 관리</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 정보 관리</h2>
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
          <div className="sort-group__txt">
            <span className="c-red">
              ※ 스테이션내에서 펌웨어 버전이 상이한 상태입니다.
            </span>
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
              field="Id"
              title="스테이션 ID"
              width="120"
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellLink,
              }}
            />
            <Column
              className="txt-center"
              field="Division"
              title="스테이션 명"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="QRID"
              title="QR ID"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="고객구분"
              width="100"
              filterCell={FunnelFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="시 단위"
              width="100"
              filterCell={FunnelFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="구 단위"
              width="100"
              filterCell={FunnelFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="슬롯개수"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-center"
              field="Representative"
              title="App 노출여부"
              width="110"
              filterCell={CategoryFilterCell}
              cells={{
                data: CustomCellRepresentative,
              }}
            />
            <Column
              className="txt-center"
              field="Division"
              title="스테이션상태"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="설치일"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-center"
              field="Division"
              title="미사용 등록일"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-center"
              field="Division"
              title="SW App"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="슬롯 펌웨어"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="충전기 펌웨어"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="NFC 펌웨어"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="BMS 펌웨어"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="함체 펌웨어"
              width="100"
              filterCell={SearchFilterCell}
            />

            <Column
              className="txt-center"
              field="Number"
              title="충전 프로파일 No개수"
              width="100"
              filterable={false}
            />

            <Column
              className="txt-center"
              field="Division"
              title="수정일시"
              width="140"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-center"
              field="Division"
              title="수정자 ID"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Division"
              title="등록일시D"
              width="140"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-center"
              field="Division"
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
