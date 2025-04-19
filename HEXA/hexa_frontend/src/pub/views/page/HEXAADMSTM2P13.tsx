// HEXAADMSTM2P13 : 	[P]기기 변경 이력

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
    Division: "함체 변경",
    Target: "함체2",
    SN: "123466126510",
  },
  {
    DateTime: "2024-08-04 20:08:19",
    Division: "슬롯 변경",
    Target: "슬롯10",
    SN: "123466126510",
  },
];

export default function HEXAADMSTM2P13() {
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
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        기기 변경 이력 팝업 열기
      </Button>

      {/* 기기 변경 이력 팝업 */}
      {visible && (
        <Dialog title={"기기 변경 이력"} onClose={toggleDialog}>
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
                    className="txt-left"
                    field="DateTime"
                    title="변경일시"
                    width="140"
                    filterable={false}
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="Division"
                    title="이력 구분"
                    width="120"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Target"
                    title="대상"
                    width="120"
                    filterCell={FunnelFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="SN"
                    title="이전 S/N"
                    width="120"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="SN"
                    title="이후 S/N"
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
