// HEXAADMSTM2S99 : 생산정보 현황

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
  GridCustomCellProps,
} from "@progress/kendo-react-grid";

const sampleProducts = [
  {
    Icon: "plus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "Yes",
    No: "1",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "2",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "plus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "Yes",
    No: "3",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "4",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "plus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "Yes",
    No: "5",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "6",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "plus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "Yes",
    No: "7",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "8",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "plus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "Yes",
    No: "9",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "10",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "11",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "12",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "13",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "14",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "15",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    Icon: "Minus",
    Division: "KOOROO-10",
    QRID: "C0034",
    Representative: "No",
    No: "16",
    SN: "123466126510",
    Generation: "1세대",
    Ver: 1.0,
    Date: "2024-08-04",
    DateTime: "2024-08-10 12:30:40",
  },
];

export default function HEXAADMSTM2S99() {
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);

  interface CustomCellProps extends GridCustomCellProps {
    tdProps?: React.TdHTMLAttributes<HTMLTableCellElement> | null;
    children?: React.ReactNode | React.ReactNode[];
  }

  const CustomCellIcon = (props: CustomCellProps) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <button type="button" className={`type-${props.children}`}></button>
      </td>
    );
  };

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

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>스테이션 정보 관리 </span>
        <span>생산정보 현황</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">생산정보 현황</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <div className="search-flex">
            <DropDownList
              className="w200"
              data={["함체 S/N", "슬롯 S/N"]}
              defaultValue={["함체 S/N"]}
            />
            <Input className="w500" />
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
          <div className="sort-group__txt">업데이트 2024-08-05 22:00:10</div>
        </div>

        {/*
          [css class]
          테이블 row 배경 색 : #FDFBF1 
          Yes: '.type-Yes'
          No : '.type-No' 
          +  : '.type-plus'
          -  : '.type-Minus' 
        */}
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
          >
            <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>
            <Column
              className="txt-center"
              field="Icon"
              title=" "
              width="60"
              cells={{
                data: CustomCellIcon,
              }}
            />
            <Column
              className="txt-center"
              field="Division"
              title="모델명"
              width="140"
            />
            <Column
              className="txt-center"
              field="QRID"
              title="QR ID"
              width="90"
            />
            <Column className="txt-center" title="함체">
              <Column
                className="txt-center"
                field="Representative"
                title="대표여부"
                width="80"
                cells={{
                  data: CustomCellRepresentative,
                }}
              />
              <Column
                className="txt-center"
                field="No"
                title="순번"
                width="60"
              />
              <Column
                className="txt-center"
                field="SN"
                title="함체 S/N"
                width="150"
              />
              <Column
                className="txt-center"
                field="Generation"
                title="세대구분"
                width="100"
              />
              <Column
                className="txt-center"
                field="Ver"
                title="HW버전"
                width="100"
              />
              <Column
                className="txt-center"
                field="Date"
                title="생산일"
                width="120"
              />
              <Column
                className="txt-center"
                field="DateTime"
                title="교체일시"
                width="180"
                cells={{
                  data: CustomCellDateTime,
                }}
              />
            </Column>
            <Column className="txt-center" title="슬롯">
              <Column
                className="txt-center"
                field="No"
                title="번호"
                width="60"
              />
              <Column
                className="txt-center"
                field="SN"
                title="S/N"
                width="150"
              />
              <Column
                className="txt-center"
                field="Ver"
                title="HW버전"
                width="100"
              />
              <Column
                className="txt-center"
                field="Date"
                title="생산일"
                width="120"
              />
              <Column
                className="txt-center"
                field="DateTime"
                title="교체일시"
                width="180"
                cells={{
                  data: CustomCellDateTime,
                }}
              />
            </Column>
          </Grid>
        </div>
      </section>
    </>
  );
}
