// HEXAADMSTM3S44 : 스테이션 초기 설정

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
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

export default function HEXAADMSTM3S44() {
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
        <span>스테이션 초기 설정 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 초기 설정</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            {/* 배출 우선순위 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">배출 우선순위</h3>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "23%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "23%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "24%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">1순위</th>
                    <td>
                      <div className="row flex-gap-0.5">
                        <div className="col-6">
                          <DropDownList defaultValue="SOH" />
                        </div>
                        <div className="col-5">
                          <DropDownList defaultValue="높은 순" />
                        </div>
                      </div>
                    </td>
                    <th scope="row">2순위</th>
                    <td>
                      <div className="row flex-gap-0.5">
                        <div className="col-6">
                          <DropDownList defaultValue="누적교환횟수" />
                        </div>
                        <div className="col-5">
                          <DropDownList defaultValue="높은 순" />
                        </div>
                      </div>
                    </td>
                    <th scope="row">3순위</th>
                    <td>
                      <div className="row flex-gap-0.5">
                        <div className="col-6">
                          <DropDownList defaultValue="SOH" />
                        </div>
                        <div className="col-5">
                          <DropDownList defaultValue="높은 순" />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 번잡도 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">번잡도</h3>
                <div className="title-group__txt">
                  <span className="c-red">
                    ※ 번잡도 숫자가 높을수록 번잡합니다.
                  </span>
                </div>
              </div>

              <div>
                <table className="tbl-base">
                  <thead>
                    <tr>
                      <th>시간대</th>
                      <th>0~1</th>
                      <th>1~2</th>
                      <th>2~3</th>
                      <th>3~4</th>
                      <th>4~5</th>
                      <th>5~6</th>
                      <th>6~7</th>
                      <th>7~8</th>
                      <th>8~9</th>
                      <th>9~10</th>
                      <th>10~11</th>
                      <th>11~12</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>단계</td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="tbl-base">
                  <thead>
                    <tr>
                      <th>시간대</th>
                      <th>12~13</th>
                      <th>13~14</th>
                      <th>14~15</th>
                      <th>15~16</th>
                      <th>16~17</th>
                      <th>17~18</th>
                      <th>18~19</th>
                      <th>19~20</th>
                      <th>20~21</th>
                      <th>21~22</th>
                      <th>22~23</th>
                      <th>23~24</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>단계</td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                      <td>
                        <DropDownList defaultValue="3" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 온도 범위 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">온도 범위</h3>
              </div>
              <div>
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
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
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
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                      <td className="txt-center">
                        <div className="in-input">
                          <Input />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <div className="row mt3">
              <div className="col-4">
                {/* 충전 순서 기준 */}
                <section className="section">
                  <div className="title-group">
                    <h3 className="t-title">충전 순서 기준</h3>
                  </div>
                  <div className="row flex-gap-0.5">
                    <div className="w200">
                      <DropDownList defaultValue="선택" />
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-4">
                {/* 배출가능 SOC(%) */}
                <section className="section">
                  <div className="title-group">
                    <h3 className="t-title">배출가능 SOC(%)</h3>
                  </div>
                  <div className="row flex-gap-0.5">
                    <div className="w200">
                      <div className="in-input">
                        <Input defaultValue="90" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-4">
                {/* OS 재부팅 주기 */}
                <section className="section">
                  <div className="title-group">
                    <h3 className="t-title">OS 재부팅 주기</h3>
                  </div>
                  <div className="row flex-gap-0.5">
                    <div className="w200">
                      <DropDownList defaultValue="선택" />
                    </div>
                    <div className="w110">
                      <DropDownList defaultValue="선택" />
                    </div>
                    <div className="w110">
                      <DropDownList defaultValue="선택" />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </FormElement>
        )}
      />
    </>
  );
}
