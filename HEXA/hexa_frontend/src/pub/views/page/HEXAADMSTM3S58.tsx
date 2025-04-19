// HEXAADMSTM3S58 : 충전 프로파일 배포 상세

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
    ProfileNo: "C012",
    Condition: "0.45C Step 충전",
    C: "0.3",
    V: "4.15",
    Cutoff: "0.05",
    CVMode: "CC/CV",
    Val: "0.95",
    Min: "1.0",
    Max: "1.0",
    Default: "Yes",
    ConditionNo: "1,3",
    DateTime: "2024-08-10 12:30:40",
    UserId: "HX0224020C1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    City: "서울특별시",
    District: "강남구",
    Status: "실패",
  },
  {
    No: "2",
    ProfileNo: "C011",
    Condition: "0.45C 4.15V 충전",
    C: "0.3",
    V: "4.15",
    Cutoff: "0.05",
    CVMode: "CC",
    Val: "0.95",
    Min: "1.0",
    Max: "1.0",
    Default: "Yes",
    ConditionNo: "2",
    DateTime: "2024-08-10 12:30:40",
    UserId: "HX0224020C1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    City: "서울특별시",
    District: "강남구",
    Status: "성공",
  },
  {
    No: "3",
    ProfileNo: "C010",
    Condition: "0.45C 4.15V 충전",
    C: "0.3",
    V: "4.15",
    Cutoff: "0.05",
    CVMode: "CC",
    Val: "0.95",
    Min: "1.0",
    Max: "1.0",
    Default: "Yes",
    ConditionNo: "매핑없음",
    DateTime: "2024-08-10 12:30:40",
    UserId: "HX0224020C1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    City: "서울특별시",
    District: "강남구",
    Status: "성공",
  },
  {
    No: "4",
    ProfileNo: "C009",
    Condition: "0.45C 4.15V 충전",
    C: "0.3",
    V: "4.15",
    Cutoff: "0.05",
    CVMode: "CC",
    Val: "0.95",
    Min: "1.0",
    Max: "1.0",
    Default: "Yes",
    ConditionNo: "1",
    DateTime: "2024-08-10 12:30:40",
    UserId: "HX0224020C1",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    City: "서울특별시",
    District: "강남구",
    Status: "성공",
  },
];

export default function HEXAADMSTM3S58() {
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

  const CustomCellRepresentative = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <span className={`type-${props.children}`}> {props.children} </span>
      </td>
    );
  };

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

  const CustomCellTextColor = (props: any) => {
    const textColor = () => {
      if (props.children === "매핑없음") {
        return "c-red";
      }
    };

    return (
      <td colSpan={1} className="k-table-td txt-left">
        <span className={`${textColor()}`}>{props.children}</span>
      </td>
    );
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>충전 프로파일 및 배포 관리 </span>
        <span>충전 프로파일 배포 관리 </span>
        <span>충전 프로파일 배포 상세</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">충전 프로파일 배포 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">충전 프로파일 정보</h3>
                <div className="type-btns">
                  <Button size={"medium"} className="w80 ml1" disabled>
                    선택
                  </Button>
                </div>
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

              <div className="grid-row-2">
                <Grid
                  style={{ maxHeight: "325px" }}
                  data={sampleProducts.map((item) => ({
                    ...item,
                    [SELECTED_FIELD]: selectedState[idGetter(item)],
                  }))}
                  selectedField={SELECTED_FIELD}
                  skip={page.skip}
                  take={page.take}
                  total={sampleProducts.length}
                  scrollable="scrollable"
                  filterable={false}
                  onSelectionChange={onSelectionChange}
                  onHeaderSelectionChange={onHeaderSelectionChange}
                >
                  <GridNoRecords> </GridNoRecords>

                  <Column
                    className="txt-center"
                    field={SELECTED_FIELD}
                    title="선택"
                    filterable={false}
                    width="60"
                  />
                  <Column
                    className="txt-center"
                    field="ProfileNo"
                    title="충전프로파일 NO"
                    width="80"
                  />
                  <Column
                    className="txt-left"
                    field="Condition"
                    title="충전 조건"
                    width="120"
                  />
                  <Column
                    className="txt-center"
                    field="C"
                    title="전류(C)"
                    width="80"
                  />
                  <Column
                    className="txt-center"
                    field="V"
                    title="전압(V)"
                    width="80"
                  />
                  <Column
                    className="txt-center"
                    field="Cutoff"
                    title="Cutoff current(C)"
                    width="100"
                  />
                  <Column
                    className="txt-center"
                    field="CVMode"
                    title="충전 Mode"
                    width="140"
                  />
                  <Column
                    className="txt-center"
                    title="Derating Factor 1(전류)"
                    width="100"
                  >
                    <Column
                      className="txt-center"
                      field="Val"
                      title="값"
                      width="100"
                    />
                    <Column
                      className="txt-center"
                      field="Min"
                      title="최소"
                      width="100"
                    />
                    <Column
                      className="txt-center"
                      field="Max"
                      title="최대"
                      width="100"
                    />
                  </Column>

                  <Column
                    className="txt-center"
                    title="Derating Factor 2(전압)"
                    width="100"
                  >
                    <Column
                      className="txt-center"
                      field="Val"
                      title="값"
                      width="100"
                    />
                    <Column
                      className="txt-center"
                      field="Min"
                      title="최소"
                      width="100"
                    />
                    <Column
                      className="txt-center"
                      field="Max"
                      title="최대"
                      width="100"
                    />
                  </Column>

                  <Column
                    className="txt-center"
                    field="Default"
                    title="기본 여부"
                    width="100"
                    cells={{
                      data: CustomCellRepresentative,
                    }}
                  />
                  <Column
                    className="txt-center"
                    field="ConditionNo"
                    title="조건NO"
                    width="100"
                    cells={{
                      data: CustomCellTextColor,
                    }}
                  />

                  <Column
                    className="txt-center"
                    field="DateTime"
                    title="수정일시"
                    width="140"
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="UserId"
                    title="수정자 ID"
                    width="120"
                  />
                </Grid>
              </div>
            </section>

            <section className="section">
              <div className="title-group">
                <h3 className="t-title">대상 스테이션</h3>
                <Button size={"medium"} className="w80 ml1" disabled>
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
                  <Column
                    className="txt-left"
                    field="Status"
                    title="배포 상태"
                    width="100"
                    filterable={false}
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

      <div className="btn-group">
        <div className="group-align-right">
          <Button size={"large"} fillMode="outline">
            취소
          </Button>
          <Button size={"large"} themeColor={"primary"}>
            재배포
          </Button>
        </div>
      </div>
    </>
  );
}
