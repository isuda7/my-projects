// HEXAADMSYM2S01 : 사용자 관리

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
    Auth: "시스템 관리자",
    UserID: "superadmin01",
    UserName: "김엘지",
    Email: "yup123@lgespartner.com",
    PhoneNumber: "010-0000-1234",
    Active: "Yes",
    Lock: "No",
    CreateID: "superadmin01",
    DateTime: "2024-08-10 20:08:19",
  },
  {
    Auth: "시스템 관리자",
    UserID: "superadmin01",
    UserName: "김엘지",
    Email: "yup123@lgespartner.com",
    PhoneNumber: "010-0000-1234",
    Active: "Yes",
    Lock: "No",
    CreateID: "superadmin01",
    DateTime: "2024-08-10 20:08:19",
  },
];

export default function HEXAADMSYM2S01() {
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

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>시스템 관리 </span>
        <span>사용자 관리</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">사용자 관리</h2>
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
              field="Auth"
              title="권한"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-left"
              field="UserID"
              title="사용자ID"
              width="90"
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellLink,
              }}
            />
            <Column
              className="txt-center"
              field="UserName"
              title="이름"
              width="90"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="Email"
              title="이메일 주소"
              width="140"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="PhoneNumber"
              title="휴대폰 번호"
              width="140"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Active"
              title="활성화 여부"
              width="90"
              filterCell={CategoryFilterCell}
              cells={{
                data: CustomCellRepresentative,
              }}
            />
            <Column
              className="txt-center"
              field="Lock"
              title="잠금 여부"
              width="90"
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
              field="CreateID"
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
              field="CreateID"
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
