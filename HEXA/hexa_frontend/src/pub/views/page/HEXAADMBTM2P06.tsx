// HEXAADMBTM2P06 : 	[P]사용 변경 이력

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
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
    DateTime: "2024-08-10 20:08:19",
    BeforeDivision1: "서비스",
    BeforeDivision2: "전기스쿠터",
    BeforeDetail: "KRKGS1CB5PD000532",
    AfterDivision1: "서비스",
    AfterDivision2: "스테이션",
    AfterDetail: "GS25 강남점",
    SOH: "99.2",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    BeforeDivision1: "서비스",
    BeforeDivision2: "전기스쿠터",
    BeforeDetail: "KRKGS1CB5PD000532",
    AfterDivision1: "서비스",
    AfterDivision2: "스테이션",
    AfterDetail: "GS25 강남점",
    SOH: "99.2",
  },
];

export default function HEXAADMBTM2P06() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

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

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
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
      <td colSpan={1} className="k-table-td txt-left">
        <span className={`${textColor()}`}>{props.children}</span>
      </td>
    );
  };

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        사용 변경 이력 열기
      </Button>

      {/* 사용 변경 이력 팝업 */}
      {visible && (
        <Dialog title={"사용 변경  이력"} onClose={toggleDialog}>
          <div className="dialog-box">
            <section className="section">
              {/* 검색 박스 */}
              <div className="search-group">
                <dl className="search-group__txt">
                  <div>
                    <dt>배터리ID :</dt>
                    <dd>2024060410028</dd>
                  </div>
                </dl>
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

              <div className="grid-row-3">
                <Grid
                  style={{ height: "550px" }}
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
                    title="변경일시"
                    width="120"
                    filterable={false}
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />

                  <Column title="변경 전">
                    <Column
                      className="txt-left"
                      field="BeforeDivision1"
                      title="사용구분1"
                      width="100"
                      filterCell={CategoryFilterCell}
                    />
                    <Column
                      className="txt-left"
                      field="BeforeDivision2"
                      title="사용구분2"
                      width="100"
                      filterCell={CategoryFilterCell}
                    />
                    <Column
                      className="txt-left"
                      field="BeforeDetail"
                      title="상세"
                      width="180"
                      filterCell={SearchFilterCell}
                    />
                  </Column>

                  <Column title="변경 후">
                    <Column
                      className="txt-left"
                      field="AfterDivision1"
                      title="사용구분1"
                      width="100"
                      filterCell={CategoryFilterCell}
                    />
                    <Column
                      className="txt-left"
                      field="AfterDivision2"
                      title="사용구분2"
                      width="100"
                      filterCell={CategoryFilterCell}
                    />
                    <Column
                      className="txt-left"
                      field="AfterDetail"
                      title="상세"
                      width="180"
                      filterCell={SearchFilterCell}
                    />
                  </Column>

                  <Column
                    className="txt-left"
                    field="SOH"
                    title="SOH(%)"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                </Grid>
              </div>
            </section>
          </div>
        </Dialog>
      )}
    </>
  );
}
