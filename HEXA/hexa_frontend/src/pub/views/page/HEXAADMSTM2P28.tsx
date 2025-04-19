// HEXAADMSTM2P28 : 	[P]대기중 스테이션 목록 팝업

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
    ID: "HX0224020C1",
    Name: "GS25 강남점",
  },
  {
    ID: "HX0224020C1",
    Name: "GS25 강남점",
  },
];

export default function HEXAADMSTM2P28() {
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
        대기중 스테이션 목록 팝업 열기
      </Button>

      {/* 대기중 스테이션 목록 팝업 */}
      {visible && (
        <Dialog title={"대기중 스테이션 목록"} onClose={toggleDialog}>
          <div className="dialog-box pop-m">
            <section className="section">
              {/* 검색 박스 */}
              <div className="search-group">
                <dl className="search-group__txt">
                  <div>
                    <dt>OTA ID :</dt>
                    <dd>OTA12345678</dd>
                  </div>
                  <div>
                    <dt>배포일시 :</dt>
                    <dd>2024-07-19 20:08:19</dd>
                  </div>
                </dl>
              </div>
            </section>

            <section className="section">
              <div className="sort-group">
                <div className="sort-group__counter">
                  <span className="total">전체 100</span>
                </div>
                <div className="sort-group__btns">
                  <Button themeColor={"info"} title="파일 다운로드">
                    <i className="icon icon-download"></i>
                  </Button>
                </div>
                <div className="sort-group__txt">
                  <span className="c-red">
                    ※ ‘대기중’인 스테이션 목록입니다. 스테이션에서 응답이 없는
                    상태입니다.
                  </span>
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
                    field="ID"
                    title="스테이션ID"
                    width="200"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Name"
                    title="스테이션명"
                    width="200"
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
