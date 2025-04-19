// 	HEXAADMHOM2P05 : 1세대 상세 팝업(관리자)

import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
  GridCustomCellProps,
  GridHeaderCellProps,
} from "@progress/kendo-react-grid";
import { DropdownFilterCell } from "../../components/guide/dropdownFilterCell";

const sampleProducts = [
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "슬롯 10",
    Name: "SLOT 잠금",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "슬롯 01",
    Name: "SLOT 잠금",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "슬롯 01",
    Name: "SLOT 잠금",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "슬롯 01",
    Name: "SLOT 잠금",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "슬롯 01",
    Name: "SLOT 잠금",
    YN: "Y",
  },
];

const sampleProducts2 = [
  {
    SlotNo: "1",
    BatteryID: "2023051300031",
    PairID: "2408230002",
    BatteryState: "정상",
    SOC: "X",
    SOH: "1.0.00",
    Total: "4",
    Today: "0",
    SlotTem: "34",
    PackAvg: "32",
    PackTop: "32",
    PackLowest: "32",
    SlotLock: "잠금",
    SlotClear: "해제",
    SlotPass: "배출",
    SlotOpen: "개방",
    SlotReset: "리셋",
  },
  {
    SlotNo: "2",
    BatteryID: "2023051300031",
    PairID: "2408230002",
    BatteryState: "충전중",
    SOC: "X",
    SOH: "1.0.00",
    Total: "4",
    Today: "0",
    SlotTem: "34",
    PackAvg: "32",
    PackTop: "32",
    PackLowest: "32",
    SlotLock: "잠금",
    SlotClear: "해제",
    SlotPass: "배출",
    SlotOpen: "개방",
    SlotReset: "리셋",
  },

  {
    SlotNo: "3",
    BatteryID: "2023051300031",
    PairID: "2408230002",
    BatteryState: "빈슬롯",
    SOC: "X",
    SOH: "1.0.00",
    Total: "4",
    Today: "0",
    SlotTem: "34",
    PackAvg: "32",
    PackTop: "32",
    PackLowest: "32",
    SlotLock: "잠금",
    SlotClear: "해제",
    SlotPass: "배출",
    SlotOpen: "개방",
    SlotReset: "리셋",
  },

  {
    SlotNo: "4",
    BatteryID: "2023051300031",
    PairID: "2408230002",
    BatteryState: "예약중",
    SOC: "X",
    SOH: "1.0.00",
    Total: "4",
    Today: "0",
    SlotTem: "34",
    PackAvg: "32",
    PackTop: "32",
    PackLowest: "32",
    SlotLock: "잠금",
    SlotClear: "해제",
    SlotPass: "배출",
    SlotOpen: "개방",
    SlotReset: "리셋",
  },

  {
    SlotNo: "5",
    BatteryID: "2023051300031",
    PairID: "2408230002",
    BatteryState: "교환중",
    SOC: "X",
    SOH: "1.0.00",
    Total: "4",
    Today: "0",
    SlotTem: "34",
    PackAvg: "32",
    PackTop: "32",
    PackLowest: "32",
    SlotLock: "잠금",
    SlotClear: "해제",
    SlotPass: "배출",
    SlotOpen: "개방",
    SlotReset: "리셋",
  },

  {
    SlotNo: "6",
    BatteryID: "2023051300031",
    PairID: "2408230002",
    BatteryState: "슬롯잠금",
    SOC: "O",
    SOH: "1.0.00",
    Total: "4",
    Today: "0",
    SlotTem: "34",
    PackAvg: "32",
    PackTop: "32",
    PackLowest: "32",
    SlotLock: "잠금",
    SlotClear: "해제",
    SlotPass: "배출",
    SlotOpen: "개방",
    SlotReset: "리셋",
  },

  {
    SlotNo: "7",
    BatteryID: "2023051300031",
    PairID: "2408230002",
    BatteryState: "정상",
    SOC: "X",
    SOH: "1.0.00",
    Total: "4",
    Today: "0",
    SlotTem: "34",
    PackAvg: "32",
    PackTop: "32",
    PackLowest: "32",
    SlotLock: "잠금",
    SlotClear: "해제",
    SlotPass: "배출",
    SlotOpen: "개방",
    SlotReset: "리셋",
  },

  {
    SlotNo: "8",
    BatteryID: "2023051300031",
    PairID: "2408230002",
    BatteryState: "정상",
    SOC: "X",
    SOH: "1.0.00",
    Total: "4",
    Today: "0",
    SlotTem: "34",
    PackAvg: "32",
    PackTop: "32",
    PackLowest: "32",
    SlotLock: "잠금",
    SlotClear: "해제",
    SlotPass: "배출",
    SlotOpen: "개방",
    SlotReset: "리셋",
  },
];

export default function HEXAADMHOM2P05() {
  // grid
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

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

  const CustomCellBtn1 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <Button size={"small"} themeColor={"dark"}>
          {props.children}
        </Button>
      </td>
    );
  };

  const CustomCellState = (props: any) => {
    const str = props.children;
    let style = "";

    switch (str) {
      case "정상":
        style = "mark-normal";
        break;

      case "충전중":
        style = "mark-charging";
        break;

      case "빈슬롯":
        style = "mark-blank";
        break;

      case "예약중":
        style = "mark-reservation";
        break;

      case "교환중":
        style = "mark-exchanging";
        break;

      case "슬롯잠금":
        style = "mark-lock";
        break;
    }
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <span className={style}></span>
      </td>
    );
  };

  return (
    <>
      <div className="win-pop-wrap">
        {/* 스테이션 정보 */}
        <section className="section">
          {/* 2025-03-20 수정 (1.상단 틀고정) */}
          <div className="title-group__sticky">
            <div className="title-group">
              <h3 className="t-title">스테이션 정보</h3>
              {/* 2025-03-19 수정 (5.업데이트 및 버튼 추가) */}
              <div className="title-group__update">
                <span className="refresh-txt">업데이트 일시 <span>2025-03-11 16:31:52</span></span>
                <Button themeColor={"info"} title="새로고침">
                  <i className="icon icon-refresh-thin"></i>
                </Button>
                <Button size={"medium"} themeColor={"dark"}>
                  사용자 화면 전환
                </Button>
              </div>

              <div className="group-align-right gap0.38">
                <Button size={"medium"}>제어프로그램 재구동</Button>
                <Button size={"medium"}>정보갱신</Button>
                <Button size={"medium"}>전체 잠금 </Button>
                <Button size={"medium"}>전체 잠금 해제</Button>
                <Button size={"medium"}>인증초기화</Button>
              </div>
            </div>
          </div>
          <table className="tbl-base">
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">스테이션 ID</th>
                <td>0218B04C1</td>
                <th scope="row">스테이션명</th>
                <td>GS25 강남점</td>
                <th scope="row">세대 구분 </th>
                <td>2세대</td>
                <th scope="row">APP 노출여부 </th>
                <td>Y</td>
              </tr>
              <tr>
                <th scope="row">주소</th>
                <td colSpan={3}>서울특별시 강남구 강남대로 382 </td>
                <th scope="row">슬롯 개수</th>
                <td>30</td>
                <th scope="row">스테이션 상태 </th>
                <td>
                  <span className="mark-reset">초기화중</span>
                  {/*
                  <span className="mark-normal">정상</span>
                  <span className="mark-unable">교환불가</span>
                  <span className="mark-error">오류발생</span>
                  <span className="mark-lock">전체잠금</span>
                  <span className="mark-disconnection">통신단절</span> */}
                </td>
              </tr>
              <tr>
                <th scope="row">동시충전구수</th>
                <td>6</td>
                <th scope="row">누적전력량(kWh)</th>
                <td>1,625,205</td>
                <th scope="row">누적 교환횟수</th>
                <td>1,600</td>
                <th scope="row">금일 교환횟수 </th>
                <td>0</td>
              </tr>
              <tr>
                <th scope="row">비고</th>
                <td colSpan={7}>2024-11-10 스테이션 철거 예정</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 최근 제어 이력 */}
        <section className="section">
          <div className="title-group">
            <h3 className="t-title">최근 제어 이력</h3>
            <div className="title-group__txt">
              <span className="c-red">
                ※ 1세대인 경우, 제어 이력은 HEXA에서 제어한 이력만 조회됩니다.
              </span>
            </div>
            <div className="group-align-right">
              <Button fillMode="flat" className="btn-arr">
                더보기
              </Button>
            </div>
          </div>

          <div className="grid-box-line">
            <Grid
              style={{ maxHeight: "600px" }}
              data={sampleProducts}
              scrollable="none"
            >
              <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

              <Column
                className="txt-left"
                field="DateTime"
                title="제어일시"
                width="140"
                cells={{
                  data: CustomCellDateTime,
                }}
              />
              <Column
                className="txt-left"
                field="Target"
                title="대상"
                width="140"
              />
              <Column
                className="txt-left"
                field="Name"
                title="제어명"
                width="200"
              />
              <Column
                className="txt-center"
                field="YN"
                title="성공여부"
                width="100"
              />
            </Grid>
          </div>
        </section>

        {/* 배터리 현황 */}
        <section className="section">
          <div className="title-group">
            <h3 className="t-title">배터리 현황</h3>
          </div>

          <table className="tbl-base">
            <colgroup>
              <col style={{ width: "16%" }} />
              <col style={{ width: "16%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "17%" }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">충전완료</th>
                <th scope="col">충전중</th>
                <th scope="col">예약중</th>
                <th scope="col">잠금중</th>
                <th scope="col">오류</th>
                <th scope="col">교환중</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="txt-right">6</td>
                <td className="txt-right">0</td>
                <td className="txt-right">6</td>
                <td className="txt-right">0</td>
                <td className="txt-right">6</td>
                <td className="txt-right">0</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 배터리 상태 */}
        <section className="section">
          <div className="title-group">
            <h3 className="t-title">배터리 상태</h3>
            <div className="group-align-right flex-gap-1">
              배터리 상태
              <span className="mark-normal">OK</span>
              <span className="mark-charging">충전중</span>
              <span className="mark-blank">빈 슬롯 </span>
              <span className="mark-reservation">예약중 </span>
              <span className="mark-exchanging">교환중 </span>
              <span className="mark-lock">슬롯잠금</span>
            </div>
          </div>

          <div className="grid-row-2">
            <Grid
              style={{ maxHeight: "500px" }}
              data={sampleProducts2}
              filterable={false}
              scrollable="scrollable" // 2025-03-19 수정 (5.헤더고정 속성처리)
            >
              <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

              <Column
                className="txt-center"
                field="SlotNo"
                title="슬롯번호"
                width="90"
              />
              <Column
                className="txt-center"
                field="BatteryID"
                title="배터리ID"
                width="90"
              />
              <Column
                className="txt-center"
                field="PairID"
                title="페어ID"
                width="90"
              />
              <Column
                className="txt-center"
                field="BatteryState"
                title="배터리 상태"
                width="100"
                filterable={false}
                cells={{
                  data: CustomCellState,
                }}
              />
              <Column
                className="txt-center"
                field="SOC"
                title="SOC"
                width="90"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="SOH"
                title="SOH"
                width="90"
                filterable={false}
              />
              <Column title="교환횟수">
                <Column
                  className="txt-center"
                  field="Total"
                  title="누적"
                  width="100"
                  filterable={false}
                />
                <Column
                  className="txt-center"
                  field="Today"
                  title="금일"
                  width="100"
                  filterable={false}
                />
              </Column>
              <Column
                className="txt-center"
                field="SlotTem"
                title="슬롯온도"
                width="90"
                filterable={false}
              />

              <Column title="팩 온도">
                <Column
                  className="txt-right"
                  field="PackAvg"
                  title="평균"
                  width="90"
                  filterable={false}
                />
                <Column
                  className="txt-right"
                  field="PackTop"
                  title="최고"
                  width="90"
                  filterable={false}
                />
                <Column
                  className="txt-right"
                  field="PackLowest"
                  title="최저"
                  width="90"
                  filterable={false}
                />
              </Column>
              <Column title="슬롯제어">
                <Column
                  className="txt-center"
                  field="SlotLock"
                  title="잠금"
                  width="100"
                  filterable={false}
                  cells={{
                    data: CustomCellBtn1,
                  }}
                />
                <Column
                  className="txt-center"
                  field="SlotClear"
                  title="잠금해제"
                  width="100"
                  filterable={false}
                  cells={{
                    data: CustomCellBtn1,
                  }}
                />
                <Column
                  className="txt-center"
                  field="SlotPass"
                  title="강제배출"
                  width="100"
                  filterable={false}
                  cells={{
                    data: CustomCellBtn1,
                  }}
                />
                <Column
                  className="txt-center"
                  field="SlotOpen"
                  title="개방"
                  width="100"
                  filterable={false}
                  cells={{
                    data: CustomCellBtn1,
                  }}
                />
                <Column
                  className="txt-center"
                  field="SlotReset"
                  title="리셋"
                  width="100"
                  filterable={false}
                  cells={{
                    data: CustomCellBtn1,
                  }}
                />
              </Column>
            </Grid>
          </div>
        </section>
      </div>
    </>
  );
}
