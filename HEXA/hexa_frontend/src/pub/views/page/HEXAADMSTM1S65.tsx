// HEXAADMSTM1S65 : 충전 프로파일 조건 설정

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
    No: "5",
    Tem: "10~25",
    SOC: "0~30",
    SOH: "05~100",
    Complicate: "1",
    Mapping: "Yes",
    MappingNo: "C001",
    ID: "superadmin01",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    No: "6",
    Tem: "10~25",
    SOC: "0~30",
    SOH: "05~100",
    Complicate: "1",
    Mapping: "No",
    MappingNo: "C002",
    ID: "superadmin01",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    No: "7",
    Tem: "10~25",
    SOC: "0~30",
    SOH: "05~100",
    Complicate: "1",
    Mapping: "No",
    MappingNo: "매핑없음",
    ID: "superadmin01",
    DateTime: "2024-08-10 12:30:40",
  },
];

export default function HEXAADMSTM1S65() {
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
      <td colSpan={1} className="k-table-td txt-center">
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
        <span>스테이션 관리</span>
        <span>충전 프로파일 및 배포 관리 </span>
        <span>충전 프로파일 조건 설정</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">충전 프로파일 조건 설정</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <p className="t-desc c-red">
          ※ From ~ To 검색으로 숫자만 입력해주시고 두 개 이상을 조합하는
          경우에는 & 조건으로 검색하게 됩니다.
        </p>
        <div className="search-group">
          <dl className="search-group__box">
            <div>
              <dt>온도(℃)</dt>
              <dd>
                <div className="in-input">
                  <Input className="w100" /> ~ <Input className="w100" />
                </div>
              </dd>
            </div>
            <div>
              <dt>SOC(%)</dt>
              <dd>
                <div className="in-input">
                  <Input className="w100" /> ~ <Input className="w100" />
                </div>
              </dd>
            </div>
            <div>
              <dt>SOH(%)</dt>
              <dd>
                <div className="in-input">
                  <Input className="w100" /> ~ <Input className="w100" />
                </div>
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
          <div className="sort-group__txt">
            <span className="c-red">
              ※ Factor를 신규 등록, 수정, 삭제를 하시는 경우에는 충전 프로파일
              조건 설정 화면에서 [업데이트]를 해주셔야 조합 테이블이 변경됩니다.
            </span>
          </div>

          <div className="group-align-right gap0.38">
            <Button
              size={"medium"}
              themeColor={"primary"}
              className="btn-in-icon"
            >
              업데이트
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
              className="txt-center"
              field="No"
              title="조건NO"
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="Tem"
              title="온도(℃)"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-center"
              field="SOC"
              title="SOC(%)"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-center"
              field="SOH"
              title="SOH(%)"
              width="100"
              filterable={false}
            />
            <Column
              className="txt-center"
              field="Complicate"
              title="번잡도"
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-center"
              field="Mapping"
              title="매핑 여부"
              width="100"
              filterCell={CategoryFilterCell}
              cells={{
                data: CustomCellRepresentative,
              }}
            />
            <Column
              className="txt-center"
              field="MappingNo"
              title="매핑 충전프로파일 No"
              width="120"
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-center"
              field="DateTime"
              title="생성일시"
              width="140"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="ID"
              title="생성자 ID"
              width="120"
              filterCell={SearchFilterCell}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
