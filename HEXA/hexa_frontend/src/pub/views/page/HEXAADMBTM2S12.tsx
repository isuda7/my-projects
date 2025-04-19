// HEXAADMBTM2S12 : 배터리 평균값 조회

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
    BatteryID: "2023081808223",
    DateTime: "2024-08-10 20:08:19",
    CTO: "93.8",
    BMS: "93.7",
    SOHR: "85",
    Charge: "5,781",
    Discharge: "5,000",
    Counter1: "69",
    Counter2: "13",
    Counter3: "1",
  },
  {
    BatteryID: "2023081808223",
    DateTime: "2024-08-10 20:08:19",
    CTO: "93.8",
    BMS: "93.7",
    SOHR: "85",
    Charge: "5,781",
    Discharge: "5,000",
    Counter1: "69",
    Counter2: "13",
    Counter3: "1",
  },
];

export default function HEXAADMBTM2S12() {
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
      </div>

      <div className="head-group">
        <h2 className="t-header">배터리 평균값 조회</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <div className="search-flex">
            <DropDownList className="w200" defaultValue="누적 충전 횟수" />
            <Input className="w200" />
            <span>~</span>
            <Input className="w200" />
          </div>

          <div className="group-align-right">
            <Button size={"medium"} themeColor={"dark"}>
              <i className="icon icon-search"></i>
              검색
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <table className="tbl-base">
          <colgroup>
            <col style={{ width: "12%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "11%" }} />
          </colgroup>
          <tbody>
            <tr>
              <th scope="col" rowSpan={2} className="txt-center">
                평균
              </th>
              <th scope="col" className="txt-center">
                CTO SOHE(%)
              </th>
              <th scope="col" className="txt-center">
                BMS SOHE(%)
              </th>
              <th scope="col" className="txt-center">
                SOHR(%)
              </th>
              <th scope="col" className="txt-center">
                누적 충전 에너지(kWh)
              </th>
              <th scope="col" className="txt-center">
                누적 방전 에너지(kWh)
              </th>
              <th scope="col" className="txt-center">
                누적 충전 횟수
              </th>
              <th scope="col" className="txt-center">
                누적 재충전 횟수
              </th>
              <th scope="col" className="txt-center">
                Cycle 횟수
              </th>
            </tr>
            <tr>
              <td className="txt-right">93.8</td>
              <td className="txt-right">93.7</td>
              <td className="txt-right">85</td>
              <td className="txt-right">5,781</td>
              <td className="txt-right">5,000</td>
              <td className="txt-right">69</td>
              <td className="txt-right">13</td>
              <td className="txt-right">1</td>
            </tr>
          </tbody>
        </table>
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
            <Button themeColor={"info"} title="파일 다운로드">
              <i className="icon icon-download"></i>
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
            scrollable="scrollable"
            filterable={false}
          >
            <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

            <Column
              className="txt-left"
              field="BatteryID"
              title="배터리ID"
              width="130"
            />
            <Column
              className="txt-left"
              field="DateTime"
              title="CTO 수집일시"
              width="140"
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-right"
              field="CTO"
              title="CTO SOHE(%)"
              width="100"
            />
            <Column
              className="txt-left"
              field="DateTime"
              title="수집일시"
              width="140"
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-right"
              field="BMS"
              title="BMS SOHE(%)"
              width="100"
            />
            <Column
              className="txt-right"
              field="SOHR"
              title="SOHR(%)"
              width="100"
            />
            <Column
              className="txt-right"
              field="Charge"
              title="누적 충전 에너지(kWh)"
              width="140"
            />
            <Column
              className="txt-right"
              field="Discharge"
              title="누적 방전 에너지(kWh)"
              width="140"
            />
            <Column
              className="txt-right"
              field="Counter1"
              title="누적 충전 횟수"
              width="100"
            />
            <Column
              className="txt-right"
              field="Counter2"
              title="누적 재충전 횟수"
              width="100"
            />
            <Column
              className="txt-right"
              field="Counter3"
              title="Cycle 횟수"
              width="100"
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
