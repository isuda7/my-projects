// HEXAADMERM2S05 : 고장코드 관리

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
    DateTime: "2024-08-10 20:08:19",
    BatteryID: "2023032904119",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    Target: "스테이션",
    Number: "01",
    SlotNum: "30",
    Level: "고장",
    TroubleCode: "ER_BSS_01",
    CodeName: "ERR_CHASSIS_FAN_FAULT",
    Desc: "함체 팬 작동 불량 검출",
    FixMemo: "함체 팬 작동 불량 검출",
    UserID: "superadmin01",
    YN: "Yes",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    BatteryID: "2023032904119",
    ID: "HEXA0224020C1",
    Name: "GS25잠실점",
    Target: "스테이션",
    Number: "01",
    SlotNum: "",
    Level: "고장",
    TroubleCode: "ER_BSS_01",
    CodeName: "ERR_CHASSIS_FAN_FAULT",
    Desc: "BMS 펌웨어 업데이트 실패",
    FixMemo: "BMS 펌웨어 업데이트 실패",
    UserID: "superadmin01",
    YN: "No",
  },
];

export default function HEXAADMERM2S05() {
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

  const CustomCellLink = (props: CustomCellProps) => {
    return (
      <td colSpan={1} {...props.tdProps}>
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

  const CustomCellRepresentative = (props: CustomCellProps) => {
    return (
      <td colSpan={1} {...props.tdProps}>
        <span className={`type-${props.children}`}> {props.children} </span>
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
        <span>고장코드 관리</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">고장코드 관리</h2>
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
          <div className="sort-group__title">
            <span>업데이트 2024-08-05 22:00:10</span>
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
            scrollable="none"
            filterable={true}
          >
            <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

            <Column
              className="txt-left"
              field="Target"
              title="대상"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-center"
              field="Level"
              title="레벨"
              width="90"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-left"
              field="TroubleCode"
              title="고장 코드"
              width="120"
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellLink,
              }}
            />
            <Column
              className="txt-left"
              field="CodeName"
              title="코드명"
              width="180"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="FixMemo"
              title="설명"
              width="200"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="YN"
              title="알림 여부"
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
              width="100"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="UserID"
              title="수정자 ID"
              width="120"
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
              field="UserID"
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
