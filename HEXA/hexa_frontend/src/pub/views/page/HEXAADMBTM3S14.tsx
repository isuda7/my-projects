// HEXAADMBTM3S14 : 배터리별 월변화량

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
  GridCustomCellProps,
  GridHeaderCellProps,
} from "@progress/kendo-react-grid";
import { DropdownFilterCell } from "../../components/guide/dropdownFilterCell";
import { DatePicker } from "@progress/kendo-react-dateinputs";

const sampleProducts = [
  {
    Title: "BMS SOHE(%)",
    W1: "93.8",
    W2: "98",
    W3: "",
    W4: "",
    W5: "",
    Total: "4.2",
  },
  {
    Title: "CTO SOHE(%)",
    W1: "85",
    W2: "92",
    W3: "",
    W4: "",
    W5: "",
    Total: "7",
  },
  {
    Title: "SOHR(%)",
    W1: "98",
    W2: "85",
    W3: "",
    W4: "",
    W5: "",
    Total: "7",
  },
  {
    Title: "누적 충전 에너지(kWh)",
    W1: "30",
    W2: "66",
    W3: "",
    W4: "",
    W5: "",
    Total: "7",
  },
  {
    Title: "누적 방전 에너지(kWh)",
    W1: "50",
    W2: "75",
    W3: "",
    W4: "",
    W5: "",
    Total: "7",
  },
  {
    Title: "누적 충전 횟수",
    W1: "20",
    W2: "25",
    W3: "",
    W4: "",
    W5: "",
    Total: "7",
  },
  {
    Title: "누적 재충전 횟수",
    W1: "13",
    W2: "20",
    W3: "",
    W4: "",
    W5: "",
    Total: "7",
  },
  {
    Title: "Cycle 횟수",
    W1: "1",
    W2: "1",
    W3: "",
    W4: "",
    W5: "",
    Total: "7",
  },
];

export default function HEXAADMBTM3S14() {
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

  interface ProductNameHeaderProps extends GridHeaderCellProps {
    children: any;
  }

  const customHeaderCell = (props: ProductNameHeaderProps) => {
    const tit = props.title;
    const words1 = tit?.slice(0, -5);
    const words2 = tit?.slice(-5);
    return (
      <>
        <span className="k-cell-inner">
          <span className="k-link !k-cursor-default">
            <span className="k-column-title">
              {words1}
              <br />
              {words2}
            </span>
          </span>
        </span>
      </>
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
        <span>배터리 관리 </span>
        <span>배터리 주요지표</span>
        <span>배터리별 월변화량</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">배터리별 월변화량</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <dl className="search-group__box">
            <div>
              <dt>배터리ID :</dt>
              <dd>
                <div className="in-input">
                  <Input id="phoneNumber" className="w300" />
                </div>
              </dd>
            </div>
            <div>
              <dt>조회 월 :</dt>
              <dd>
                <div>
                  <DropDownList
                    style={{ width: "100px" }}
                    defaultValue="2004"
                  />
                </div>
              </dd>
              <dd>
                <DropDownList style={{ width: "100px" }} defaultValue="10월" />
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
          <div className="sort-group__btns">
            <Button themeColor={"info"} title="파일 다운로드">
              <i className="icon icon-download"></i>
            </Button>
          </div>
        </div>

        <div>
          <Grid
            style={{ maxHeight: "600px" }}
            data={sampleProducts}
            scrollable="none"
            filterable={false}
          >
            <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

            <Column className="txt-left" field="Title" title=" " width="140" />
            <Column
              className="txt-right"
              field="W1"
              title="1주차(10/1~10/7)"
              width="140"
            />
            <Column
              className="txt-right"
              field="W2"
              title="2주차(10/8~10/14)"
              width="140"
            />
            <Column
              className="txt-right"
              field="W3"
              title="3주차(10/15~10/21)"
              width="140"
            />
            <Column
              className="txt-right"
              field="W4"
              title="4주차(10/22~10/28)"
              width="140"
            />
            <Column
              className="txt-right"
              field="W5"
              title="5주차(10/29~10/31)"
              width="140"
            />
            <Column
              className="txt-right"
              field="Total"
              title="월 변화량"
              width="140"
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
