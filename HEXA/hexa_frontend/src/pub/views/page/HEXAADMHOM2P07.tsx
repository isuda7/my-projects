// HEXAADMHOM2P07 : 	[P]스테이션 목록

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
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "2",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "2",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "오류발생",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "통신단절",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "전체잠금",
  },
  {
    generation: "1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    QRID: "C0334",
    City: "서울특별시",
    District: "강남구",
    State: "교환불가",
  },
];

export default function HEXAADMHOM2P07() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
    setVisible(!visible);
  };

  React.useEffect(() => {
    document.body.classList.add("dark");

    return function cleanup() {
      document.body.classList.remove("dark");
    };
  }, []);

  //grid
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);
  const [pageSizeValue, setPageSizeValue] = React.useState();
  const pageChange = (event: any) => {
    const targetEvent = event.targetEvent;
    const take =
      targetEvent.value === "All" ? sampleProducts.length : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };

  const CategoryFilterCell = (props: any) => (
    <DropdownFilterCell
      {...props}
      // data={["테스트", "테스트1", "테스트3"]}
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

  const CustomCellGeneration = (props: any) => (
    <td colSpan={1} className="k-table-td txt-center">
      {/* 
        class='flag-1' 1세대
        class='flag-2' 2세대 
      */}
      <span className={`flag-${props.children}`}>{props.children}세대</span>
    </td>
  );

  const CustomCellState = (props: any) => {
    const str = props.children;
    let style = "";

    switch (str) {
      case "정상":
        style = "mark-normal";
        break;

      case "교환불가":
        style = "mark-unable";
        break;

      case "오류발생":
        style = "mark-error";
        break;

      case "전체잠금":
        style = "mark-lock";
        break;

      case "통신단절":
        style = "mark-disconnection";
        break;
    }
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <span className={style}>{props.children}</span>
      </td>
    );
  };

  const CustomCellLink = (props: any) => {
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
      <div className="dashboard" style={{ background: "#666" }}>
        <br />
        <br />
        <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
          스테이션 목록 팝업 열기
        </Button>

        {/* 스테이션 목록 팝업 */}
        {visible && (
          <Dialog
            title={"스테이션 목록 "}
            onClose={toggleDialog}
            className="pop-dark"
          >
            <div className="dialog-box pop-l">
              <section className="section">
                <div className="sort-group type-dark">
                  <div className="sort-group__counter">
                    <span className="total">
                      전체 <span> 36</span>
                    </span>
                  </div>
                </div>

                <div className="grid-dark">
                  <Grid
                    style={{ height: "610px" }}
                    data={sampleProducts.slice(
                      page.skip,
                      page.take + page.skip
                    )}
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
                    onPageChange={pageChange}
                  >
                    <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

                    <Column
                      className="txt-center"
                      field="generation"
                      title="세대 구분"
                      width="90"
                      filterable={false}
                      cells={{
                        data: CustomCellGeneration,
                      }}
                    />
                    <Column
                      className="txt-left"
                      field="ID"
                      title="스테이션ID"
                      width="120"
                      filterCell={SearchFilterCell}
                      cells={{
                        data: CustomCellLink,
                      }}
                    />
                    <Column
                      className="txt-left"
                      field="Name"
                      title="스테이션명"
                      width="120"
                      filterCell={SearchFilterCell}
                    />
                    <Column
                      className="txt-left"
                      field="QRID"
                      title="QR ID"
                      width="90"
                      filterCell={SearchFilterCell}
                    />
                    <Column
                      className="txt-left"
                      field="City"
                      title="시단위"
                      width="120"
                      filterCell={CategoryFilterCell}
                    />
                    <Column
                      className="txt-left"
                      field="District"
                      title="구단위"
                      width="100"
                      filterCell={CategoryFilterCell}
                    />
                    <Column
                      className="txt-left"
                      field="State"
                      title="상태"
                      width="100"
                      filterable={false}
                      cells={{
                        data: CustomCellState,
                      }}
                    />
                  </Grid>
                </div>
              </section>
            </div>
          </Dialog>
        )}
      </div>
    </>
  );
}
