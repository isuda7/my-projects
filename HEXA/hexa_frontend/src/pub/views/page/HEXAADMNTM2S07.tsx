// HEXAADMNTM2S07 : 공지사항

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
import { Link } from "react-router-dom";

const sampleProducts = [
  {
    Notice: {
      Title: "공지사항 제목이 출력됩니다",
      Files: "ssss.png",
      Lock: true,
    },
    DateTime: "2024-08-10 20:08:19",
  },
  {
    Notice: { Title: "공지사항 제목이 출력됩니다", Files: "", Lock: false },
    DateTime: "2024-08-10 20:08:19",
  },
  {
    Notice: {
      Title:
        "공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다",
      Files: "",
      Lock: false,
    },
    DateTime: "2024-08-10 20:08:19",
  },
  {
    Notice: {
      Title:
        "공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다 공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다공지사항 제목이 출력됩니다",
      Files: "sss.png",
      Lock: false,
    },
    DateTime: "2024-08-10 20:08:19",
  },
];

export default function HEXAADMNTM2S07() {
  //grid
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);

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
              width="1000"
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellTitle,
              }}
            />
            <Column
              className="txt-center"
              field="DateTime"
              title="등록일시"
              width="180"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
