// HEXAADMSTM2S50 : 충전 프로파일 관리

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
    ProfileNo: "C013",
    Condition: "0.45C Step 충전",
    C: "0.3",
    V: "4.15",
    Cutoff: "0.05",
    CVMode: "CC/CV",
    Value: "0.95",
    Min: "1.0",
    Max: "1.0",
    Representative: "Yes",
    ConditionSet: "1,2,3",
    YN: "Yes",
    Tem: "10~25",
    SOC: "0~30",
    SOH: "95~100",
    Complicated: "1",
    DateTime: "2024-08-10 12:30:40",
    Id: "superadmin01",
  },
  {
    ProfileNo: "C012",
    Condition: "0.45C Step 충전",
    C: "0.3",
    V: "4.15",
    Cutoff: "0.05",
    CVMode: "CC",
    Value: "0.95",
    Min: "1.0",
    Max: "1.0",
    Representative: "Yes",
    ConditionSet: "매핑없음",
    YN: "No",
    Tem: "10~25",
    SOC: "0~30",
    SOH: "95~100",
    Complicated: "1",
    DateTime: "2024-08-10 12:30:40",
    Id: "superadmin01",
  },
  {
    ProfileNo: "C011",
    Condition: "0.45C Step 충전",
    C: "0.3",
    V: "4.15",
    Cutoff: "0.05",
    CVMode: "CP",
    Value: "0.95",
    Min: "1.0",
    Max: "1.0",
    Representative: "Yes",
    ConditionSet: "매핑없음",
    YN: "No",
    Tem: "10~25",
    SOC: "0~30",
    SOH: "95~100",
    Complicated: "1",
    DateTime: "2024-08-10 12:30:40",
    Id: "superadmin01",
  },
];

export default function HEXAADMSTM2S50() {
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
      <td colSpan={1} {...props.tdProps}>
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

  const CustomCellTextColor = (props: any) => {
    const textColor = () => {
      if (props.children === "매핑없음") {
        return "c-red";
      }
    };

    return (
      <td colSpan={1} className="k-table-td txt-left">
        <span className={`${textColor()}`}>{props.children}</span>
      </td>
    );
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>충전 프로파일 및 배포 관리 </span>
        <span>충전 프로파일 관리</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">충전 프로파일 관리</h2>
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

        {/*
          [css class]
          a태그 언더라인 : '.underline
          Yes: '.type-Yes'
          No : '.type-No' 
         */}
        <div className="grid-row-3">
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
              field="ProfileNo"
              title="충전프로파일 NO"
              width="80"
              filterable={false}
            />
            <Column
              className="txt-left"
              field="Condition"
              title="충전조건"
              width="140"
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellLink,
              }}
            />
            <Column
              className="txt-center"
              field="C"
              title="전류(C)"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="V"
              title="전압(V)"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Cutoff"
              title="Cutoff current(C)"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="CVMode"
              title="충전 Mode"
              width="120"
              filterCell={CategoryFilterCell}
            />
            <Column title="Derating Factor 1(전류)">
              <Column
                className="txt-center"
                field="Value"
                title="값"
                width="70"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Min"
                title="최소"
                width="70"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Max"
                title="최대"
                width="70"
                filterable={false}
              />
            </Column>
            <Column title="Derating Factor 2(전압)">
              <Column
                className="txt-center"
                field="Value"
                title="값"
                width="70"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Min"
                title="최소"
                width="70"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Max"
                title="최대"
                width="70"
                filterable={false}
              />
            </Column>

            <Column
              className="txt-center"
              field="Representative"
              title="기본여부"
              width="100"
              filterCell={CategoryFilterCell}
              cells={{
                data: CustomCellRepresentative,
              }}
            />
            <Column
              className="txt-center"
              field="ConditionSet"
              title="조건 NO"
              width="100"
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-center"
              field="YN"
              title="Step 충전여부"
              width="100"
              filterCell={CategoryFilterCell}
              cells={{
                data: CustomCellRepresentative,
              }}
            />
            <Column
              className="txt-left"
              field="DateTime"
              title="수정일시"
              width="120"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="Id"
              title="수정자 ID"
              width="120"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="DateTime"
              title="등록일시"
              width="120"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="Id"
              title="등록자 ID"
              width="120"
              filterCell={SearchFilterCell}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
