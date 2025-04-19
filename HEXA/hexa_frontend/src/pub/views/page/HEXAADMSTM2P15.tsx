// HEXAADMSTM2P15 : 	[P]설정 변경 이력

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
    Division: "온도 범위",
    Before: "7월 최고 25, 7월 최저 20,8월 최고 30",
    After: "7월 최고 30, 7월 최저 25,8월 최고 35",
    Representative: "Yes",
    ID: "superadmin01",
  },
  {
    DateTime: "2024-08-04 20:08:19",
    Division: "충전 순서 기준",
    Before: "선입선출",
    After: "SOC 높은팩",
    Representative: "No",
    ID: "superadmin01",
  },
];

export default function HEXAADMSTM2P15() {
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
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

  const CustomCellLine = (props: any) => {
    const str = props.children;
    var words = str.split(",");
    var tt = words.map((item: any, i: any) => <p key={i}>{item}</p>);
    return (
      <td colSpan={1} className="k-table-td txt-left">
        {tt}
      </td>
    );
  };

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        설정 변경 이력 팝업 열기
      </Button>

      {/* 설정 변경 이력 팝업 */}
      {visible && (
        <Dialog title={"설정 변경 이력"} onClose={toggleDialog}>
          <div className="dialog-box pop-l">
            <section className="section">
              {/* 검색 박스 */}
              <div className="search-group">
                <dl className="search-group__txt">
                  <div>
                    <dt>스테이션ID :</dt>
                    <dd>HX0224020C1</dd>
                  </div>
                  <div>
                    <dt>스테이션명 :</dt>
                    <dd>GS25 강남점</dd>
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
                  scrollable="none"
                  filterable={true}
                >
                  <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

                  <Column
                    className="txt-center"
                    field="DateTime"
                    title="제어일시"
                    width="140"
                    filterable={false}
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="Division"
                    title="제어"
                    width="120"
                    filterCell={FunnelFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Before"
                    title="변경 전"
                    width="120"
                    filterable={false}
                    cells={{
                      data: CustomCellLine,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="After"
                    title="변경 후"
                    width="120"
                    filterable={false}
                    cells={{
                      data: CustomCellLine,
                    }}
                  />
                  <Column
                    className="txt-center"
                    field="Representative"
                    title="성공 여부"
                    width="120"
                    filterCell={CategoryFilterCell}
                    cells={{
                      data: CustomCellRepresentative,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="ID"
                    title="제어자 ID"
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
