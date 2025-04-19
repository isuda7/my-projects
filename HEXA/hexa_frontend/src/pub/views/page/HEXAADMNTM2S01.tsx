// HEXAADMNTM2S01 : 공지사항

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
import { Link } from "react-router-dom";

const sampleProducts = [
  {
    Notice: {
      Title: "공지사항 제목이 출력됩니다",
      Files: "ssss.png",
      Lock: true,
    },
    Popup: "Yes",
    Period: "2024-08-10 20:08:19 ~ 2024-08-10 20:08:19",
    DateTime: "2024-08-10 20:08:19",
    UserID: "superadmin01",
  },
  {
    Notice: { Title: "공지사항 제목이 출력됩니다", Files: "", Lock: false },
    Popup: "Yes",
    Period: "2024-08-10 20:08:19 ~ 2024-08-10 20:08:19",
    DateTime: "2024-08-10 20:08:19",
    UserID: "superadmin01",
  },
  {
    Notice: {
      Title:
        "공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다",
      Files: "",
      Lock: false,
    },
    Popup: "No",
    Period: "2024-08-10 20:08:19 ~ 2024-08-10 20:08:19",
    DateTime: "2024-08-10 20:08:19",
    UserID: "superadmin01",
  },
  {
    Notice: {
      Title:
        "공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다",
      Files: "sss.png",
      Lock: false,
    },
    Popup: "No",
    Period: "2024-08-10 20:08:19 ~ 2024-08-10 20:08:19",
    DateTime: "2024-08-10 20:08:19",
    UserID: "superadmin01",
  },
];

export default function HEXAADMNTM2S01() {
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

  interface CustomCellProps extends GridCustomCellProps {
    tdProps?: React.TdHTMLAttributes<HTMLTableCellElement> | null;
    children?: React.ReactNode | React.ReactNode[];
  }

  const CustomCellTitle = (props: CustomCellProps) => {
    const LockShow = props.dataItem.Notice.Lock;
    const fileShow = props.dataItem.Notice.Files.length === 0;

    return (
      <td colSpan={1} {...props.tdProps}>
        <Link to="/" className="notice-title">
          {LockShow && <span className="notice-lock">고정</span>}
          <span>{props.dataItem.Notice.Title}</span>
          {!fileShow && <i className="icon ico-files"></i>}
        </Link>
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

  const CustomCellPeriod = (props: any) => {
    return (
      <td colSpan={1} {...props.tdProps}>
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span> ~{" "}
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
        <span>게시판 </span>
        <span>공지사항</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">공지사항</h2>
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
              field="Title"
              title="제목"
              width="240"
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellTitle,
              }}
            />
            <Column
              className="txt-center"
              field="Popup"
              title="팝업 여부"
              width="80"
              filterCell={CategoryFilterCell}
              cells={{
                data: CustomCellRepresentative,
              }}
            />
            <Column
              className="txt-center"
              field="Period"
              title="게시기간"
              width="200"
              filterable={false}
              cells={{
                data: CustomCellPeriod,
              }}
            />
            <Column
              className="txt-center"
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
              width="100"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
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
              width="100"
              filterCell={SearchFilterCell}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
