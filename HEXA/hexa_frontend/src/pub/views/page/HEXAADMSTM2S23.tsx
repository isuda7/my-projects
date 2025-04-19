// HEXAADMSTM2S23 : 펌웨어 배포 관리

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
import { DatePicker } from "@progress/kendo-react-dateinputs";

const sampleProducts = [
  {
    OTAID: "OTA12345678",
    Complete: "미완료",
    Firmware: "BMS, NFC, 충전기",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
  {
    OTAID: "OTA12345678",
    Complete: "완료",
    Firmware: "NFC",
    Counter1: "100",
    Counter2: "10",
    Counter3: "-",
    Counter4: "80",
    Counter5: "10",
    DateTime: "2024-08-10 12:30:40",
    ID: "superadmin01",
  },
];

export default function HEXAADMSTM2S23() {
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);

  // 툴팁 위치
  const fnHover = (e: any) => {
    const topPosOffset = e.target.getBoundingClientRect();
    const child = e.target.querySelector(".tooltiptext") as HTMLElement;
    child.style.top = topPosOffset.top + 0 + "px";
    child.style.left = topPosOffset.left + topPosOffset.width + 10 + "px";
  };

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

  const CustomCellLink = (props: CustomCellProps) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <a href="" className="underline">
          {props.children}
        </a>
      </td>
    );
  };

  const CustomCellLink2 = (props: CustomCellProps) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
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

  const CustomCellTooltip = (props: any) => {
    const str = props.children;
    const words = str.split(",");
    const wordlist = words.map((item: any, i: any) => <p key={i}>{item}</p>);
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <a href="" className="underline tooltip" onMouseEnter={fnHover}>
          {words.length == 1 ? (
            <span>{words[0]}</span>
          ) : (
            <span>
              {words[0]} 외 {words.length - 1} 건{" "}
            </span>
          )}
          <div className="tooltiptext">{wordlist}</div>
        </a>
      </td>
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
        <span>스테이션 관리</span>
        <span>펌웨어 및 배포 관리 </span>
        <span>펌웨어 배포 관리</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">펌웨어 배포 관리</h2>
      </div>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <dl>
            <div>
              <dt>기간</dt>
              <dd>
                <span className="period">
                  <Button fillMode="outline" togglable={true}>
                    오늘
                  </Button>
                  <Button fillMode="outline" togglable={true} selected>
                    1주
                  </Button>
                  <Button fillMode="outline" togglable={true}>
                    1달
                  </Button>
                  <Button fillMode="outline" togglable={true}>
                    전체
                  </Button>
                </span>

                <span className="datepicker">
                  <span className="cell">
                    <DatePicker
                      value={value}
                      onChange={changeDateStart}
                      format={"yyyy-MM-dd"}
                    />
                  </span>
                  ~
                  <span className="cell">
                    <DatePicker
                      value={value}
                      onChange={changeDateEnd}
                      format={"yyyy-MM-dd"}
                    />
                  </span>
                </span>
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
          <div className="sort-group__txt">
            <span className="c-red">
              ※ 펌웨어 배포 수정은 예약시간 30분전까지만 가능하며, 배포 완료 후,
              실패한 경우 상세화면에서 다시 재배포할 수 있습니다.
            </span>
          </div>
          <div className="group-align-right gap0.38">
            <Button
              size={"medium"}
              themeColor={"primary"}
              className="btn-in-icon"
            >
              신규 배포 <i className="icon icon-new-add"></i>
            </Button>
          </div>
        </div>

        {/*
          [css class]
          a태그 언더라인 : '.underline
          Yes: '.type-Yes'
          No : '.type-No' 
         */}
        <div className="grid-row-3">
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
              field="OTAID"
              title="OTA ID"
              width="120"
              filterCell={SearchFilterCell}
              cells={{
                data: CustomCellLink,
              }}
            />
            <Column
              className="txt-center"
              field="Complete"
              title="완료여부"
              width="90"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-center"
              field="Firmware"
              title="펌웨어"
              width="120"
              filterable={false}
              cells={{
                data: CustomCellTooltip,
              }}
            />

            <Column title="대상 스테이션">
              <Column
                className="txt-center"
                field="Counter1"
                title="전체"
                width="60"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter2"
                title="대기중"
                width="60"
                filterable={false}
                cells={{
                  data: CustomCellLink2,
                }}
              />
              <Column
                className="txt-center"
                field="Counter3"
                title="배포중"
                width="60"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter4"
                title="성공"
                width="60"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="Counter5"
                title="실패"
                width="60"
                filterable={false}
              />
            </Column>

            <Column
              className="txt-center"
              field="DateTime"
              title="배포 일시"
              width="140"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-center"
              field="DateTime"
              title="수정일시"
              width="140"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="ID"
              title="수정자 ID"
              width="120"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-center"
              field="DateTime"
              title="등록일시"
              width="140"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="ID"
              title="등록자 ID"
              width="120"
              filterCell={SearchFilterCell}
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
