// HEXAADMSTM3S42 : 스테이션 설정 상세

import * as React from "react";
import { Input, RadioGroup } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
  GridSelectionChangeEvent,
  GridHeaderSelectionChangeEvent,
  getSelectedState,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { DropdownFilterCell } from "../../components/guide/dropdownFilterCell";
import { getter } from "@progress/kendo-react-common";

const sampleProducts = [
  {
    No: "1",
    Division: "2세대",
    Firmware: "BMS 펌웨어",
    Ver: "2.0.6",
    File: "BMS_V2.0.6_20240805_cert3.bin",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    City: "서울특별시",
    District: "강남구",
  },
  {
    No: "2",
    Division: "2세대",
    Firmware: "SW Application",
    Ver: "2",
    File: "APP_V2_20240820_cert3.bin",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    City: "서울특별시",
    District: "강남구",
  },
];

export default function HEXAADMSTM3S42() {
  // grid
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);

  const DATA_ITEM_KEY: string = "No";
  const SELECTED_FIELD: string = "selected";
  const idGetter = getter(DATA_ITEM_KEY);

  const [selectedState, setSelectedState] = React.useState<{
    [id: string]: boolean | number[];
  }>({});

  const onSelectionChange = React.useCallback(
    (event: GridSelectionChangeEvent) => {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
    },
    [selectedState]
  );

  const onHeaderSelectionChange = React.useCallback(
    (event: GridHeaderSelectionChangeEvent) => {
      const checkboxElement: any = event.syntheticEvent.target;
      const checked = checkboxElement.checked;
      const newSelectedState: { [index: string]: any } = {};

      event.dataItems.forEach((item) => {
        newSelectedState[idGetter(item)] = checked;
      });
      setSelectedState(newSelectedState);
    },
    []
  );

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
      <Input defaultValue={"전체"} />
      <Button size={"small"} fillMode="flat" className="btn-icon">
        <i className="icon icon-funnel"></i>
      </Button>
    </div>
  );

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>스테이션 설정 관리 </span>
        <span>스테이션 설정 상세 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 설정 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">제어 정보</h3>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "85%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      제어
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <div className="inner-item mw400">
                          <DropDownList
                            defaultValue="충전 순서 기준"
                            disabled
                          />
                          <Button size={"medium"} className="w80" disabled>
                            조회
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 온도 범위 */}
              <div className="title-group__txt mt1">
                <span className="c-red">
                  ※ 스테이션 온도 범위를 설정합니다.
                </span>
              </div>
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" colSpan={2}>
                      1월
                    </th>
                    <th scope="col" colSpan={2}>
                      2월
                    </th>
                    <th scope="col" colSpan={2}>
                      3월
                    </th>
                    <th scope="col" colSpan={2}>
                      4월
                    </th>
                    <th scope="col" colSpan={2}>
                      5월
                    </th>
                    <th scope="col" colSpan={2}>
                      6월
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "8%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" colSpan={2}>
                      7월
                    </th>
                    <th scope="col" colSpan={2}>
                      8월
                    </th>
                    <th scope="col" colSpan={2}>
                      9월
                    </th>
                    <th scope="col" colSpan={2}>
                      10월
                    </th>
                    <th scope="col" colSpan={2}>
                      11월
                    </th>
                    <th scope="col" colSpan={2}>
                      12월
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                    <th scope="col">최저 온도</th>
                    <th scope="col">최고 온도</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 충전 순서 기준 */}
              <div className="title-group__txt mt1">
                <span className="c-red">
                  ※ 스테이션내 배터리 충전 순서 기준을 설정합니다.
                </span>
              </div>
              <div>
                <table className="tbl-base">
                  <colgroup>
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "85%" }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        우선 순서
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </th>
                      <td>
                        <RadioGroup
                          disabled
                          layout="horizontal"
                          defaultValue={"1"}
                          data={[
                            { label: "SOC 높은팩 우선 충전", value: "1" },
                            { label: "선입선출", value: "2" },
                          ]}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* 배출가능 SOC */}
              <div className="title-group__txt mt1">
                <span className="c-red">※ 배출 가능한 SOC를 설정합니다.</span>
              </div>
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "85%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      SOC(%)
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input w200">
                        <DropDownList defaultValue="100" className="disabled" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 시스템 작업모드 */}
              <div className="title-group__txt mt1">
                <span className="c-red">
                  ※ 스테이션 잠금 상태가 되어 스테이션가 재부팅될 때까지 사용이
                  제한될 수 있습니다.
                </span>
              </div>

              {/* 사용가능 전력량 */}
              <div className="title-group__txt mt1">
                <span className="c-red">
                  ※ 스테이션의 사용가능 전력량을 설정합니다.
                </span>
              </div>
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "85%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      사용가능 전력량(Wh)
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="row flex-gap-0.5">
                        <DropDownList
                          defaultValue="직접입력"
                          className="w200 disabled"
                        />
                        <div className="in-input w200">
                          <Input className="disabled" />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 대상 스테이션 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">대상 스테이션</h3>
                <Button size={"medium"} className="w80 ml1">
                  선택
                </Button>
              </div>

              <div className="sort-group">
                <div className="sort-group__counter">
                  <span className="total">전체 100</span>
                </div>
                <div className="group-align-right">
                  <Button themeColor={"info"}>
                    <i className="icon icon-recyclebin"></i>
                  </Button>
                </div>
              </div>

              <div>
                <Grid
                  style={{ maxHeight: "780px" }}
                  data={sampleProducts.map((item) => ({
                    ...item,
                    [SELECTED_FIELD]: selectedState[idGetter(item)],
                  }))}
                  selectedField={SELECTED_FIELD}
                  skip={page.skip}
                  take={page.take}
                  total={sampleProducts.length}
                  scrollable="scrollable"
                  filterable={true}
                  onSelectionChange={onSelectionChange}
                  onHeaderSelectionChange={onHeaderSelectionChange}
                >
                  <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

                  <Column
                    className="txt-center"
                    field={SELECTED_FIELD}
                    title="선택"
                    filterable={false}
                    width="60"
                  />
                  <Column
                    className="txt-left"
                    field="ID"
                    title="스테이션ID"
                    width="80"
                    filterCell={SearchFilterCell}
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
                    field="City"
                    title="시 단위"
                    width="120"
                    filterCell={FunnelFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="District"
                    title="구 단위"
                    width="120"
                    filterCell={FunnelFilterCell}
                  />
                </Grid>
              </div>
            </section>

            {/* 등록 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">등록 정보</h3>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">등록일시</th>
                    <td>
                      <span className="cell-date">2024-08-20</span>
                      <span className="cell-time">00:18:51</span>
                    </td>
                    <th scope="row">등록자 ID</th>
                    <td>superadmin01</td>
                  </tr>
                  <tr>
                    <th scope="row">수정일시</th>
                    <td>
                      <span className="cell-date">2024-08-20</span>
                      <span className="cell-time">00:18:51</span>
                    </td>
                    <th scope="row">수정자 ID</th>
                    <td>admin003</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </FormElement>
        )}
      />
    </>
  );
}
