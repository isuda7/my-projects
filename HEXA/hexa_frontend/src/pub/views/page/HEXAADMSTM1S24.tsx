// HEXAADMSTM1S24 : 배포 등록

import * as React from "react";
import { Input, TextArea, Checkbox } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";
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
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";

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

export default function HEXAADMSTM1S24() {
  // datepicker
  const [value, setValue] = React.useState(new Date());
  const changeDateStart = () => {
    setValue(value);
  };

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

  const initialSort: Array<SortDescriptor> = [
    { field: "DateTime", dir: "asc" },
  ];
  const [sort, setSort] = React.useState(initialSort);

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
        <span>펌웨어 및 배포 관리 </span>
        <span>펌웨어 배포 관리 </span>
        <span>배포 등록</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">배포 등록</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">배포 정보</h3>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "90%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="col">
                      배포 일시
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="row flex-gap-1">
                        <div>날짜 선택</div>
                        <div className="datepicker">
                          <span className="cell">
                            <DatePicker
                              value={value}
                              onChange={changeDateStart}
                              format={"yyyy-MM-dd"}
                            />
                          </span>
                        </div>
                        <div className="pl1">시간 선택</div>
                        <div className="w100">
                          <DropDownList defaultValue="시 선택" />
                        </div>
                        <div className="w100">
                          <DropDownList defaultValue="분 선택" />
                        </div>
                        <div className="w100">
                          <Checkbox label="즉시" defaultChecked={true} />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">배포 설명</th>
                    <td>
                      <div className="in-input">
                        <TextArea rows={6} resizable="none" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="section">
              <div className="title-group">
                <h3 className="t-title">펌웨어 정보</h3>
                <div className="type-btns">
                  <Button size={"medium"} className="w80 ml1">
                    선택
                  </Button>
                </div>
              </div>

              <div className="sort-group">
                <div className="sort-group__counter">
                  <span className="total">전체 0</span>
                </div>
                <div className="group-align-right">
                  <Button themeColor={"info"} title="삭제">
                    <i className="icon icon-recyclebin"></i>
                  </Button>
                </div>
              </div>

              <div>
                <Grid
                  style={{ maxHeight: "325px" }}
                  // data={sampleProducts.map((item) => ({
                  //   ...item,
                  //   [SELECTED_FIELD]: selectedState[idGetter(item)],
                  // }))}
                  selectedField={SELECTED_FIELD}
                  skip={page.skip}
                  take={page.take}
                  total={sampleProducts.length}
                  scrollable="scrollable"
                  filterable={true}
                  onSelectionChange={onSelectionChange}
                  onHeaderSelectionChange={onHeaderSelectionChange}
                  sortable={true}
                  sort={sort}
                  onSortChange={(e: GridSortChangeEvent) => {
                    setSort(e.sort);
                  }}
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
                    className="txt-center"
                    field="Division"
                    title="세대구분"
                    width="80"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Firmware"
                    title="펌웨어명"
                    width="120"
                    filterCell={FunnelFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Ver"
                    title="버전"
                    width="80"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="File"
                    title="파일"
                    width="150"
                    filterCell={SearchFilterCell}
                  />
                </Grid>
              </div>
            </section>

            <section className="section">
              <div className="title-group">
                <h3 className="t-title">대상 스테이션</h3>
                <Button size={"medium"} className="w80 ml1">
                  선택
                </Button>
              </div>

              <div className="sort-group">
                <div className="sort-group__counter">
                  <span className="total">전체 0</span>
                </div>
                <div className="group-align-right">
                  <Button themeColor={"info"} title="삭제">
                    <i className="icon icon-recyclebin"></i>
                  </Button>
                </div>
              </div>

              <div>
                <Grid
                  style={{ maxHeight: "780px" }}
                  // data={sampleProducts.map((item) => ({
                  //   ...item,
                  //   [SELECTED_FIELD]: selectedState[idGetter(item)],
                  // }))}
                  selectedField={SELECTED_FIELD}
                  skip={page.skip}
                  take={page.take}
                  total={sampleProducts.length}
                  scrollable="scrollable"
                  filterable={true}
                  onSelectionChange={onSelectionChange}
                  onHeaderSelectionChange={onHeaderSelectionChange}
                  sortable={true}
                  sort={sort}
                  onSortChange={(e: GridSortChangeEvent) => {
                    setSort(e.sort);
                  }}
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
          </FormElement>
        )}
      />

      <div className="btn-group">
        <div className="group-align-right">
          <Button size={"large"} fillMode="outline">
            취소
          </Button>
          <Button size={"large"} themeColor={"primary"}>
            배포
          </Button>
        </div>
      </div>
    </>
  );
}
