// HEXAADMSTM3P59 : 	[P]충전 프로파일 선택 팝업

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
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
import { getter } from "@progress/kendo-react-common";
import { DropdownFilterCell } from "../../components/guide/dropdownFilterCell";
import { DatePicker } from "@progress/kendo-react-dateinputs";

const sampleProducts = [
  {
    No: "1",
    ProfileNo: "CO12",
    Condition: "0.45C Step 충전",
    C: "0.3",
    V: "4.15",
    Cutoff: "0.05",
    Mode: "CC/CV",
    Val: "0.95",
    Min: "1.0",
    Max: "1.0",
    Default: "Yes",
    ConditionNo: "1.3",
    DateTime: "2024-08-10 12:30:40",
    UserId: "superadmin01",
  },
  {
    No: "2",
    ProfileNo: "CO11",
    Condition: "0.45C Step 충전",
    C: "0.3",
    V: "4.15",
    Cutoff: "0.05",
    Mode: "CC/CV",
    Val: "0.95",
    Min: "1.0",
    Max: "1.0",
    Default: "No",
    ConditionNo: "1.3",
    DateTime: "2024-08-10 12:30:40",
    UserId: "superadmin01",
  },
];

export default function HEXAADMSTM3P59() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

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

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} {...props.tdProps}>
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

  const CustomCellLine = (props: any) => {
    const str = props.children;
    var words = str.split(",");
    var tt = words.map((item: any, i: any) => <p key={i}>{item}</p>);
    return (
      <td colSpan={1} className="k-table-td txt-left">
        {tt}
      </td>
    );
  };

  const CustomCellRepresentative = (props: any) => {
    return (
      <td colSpan={1} {...props.tdProps}>
        <span className={`type-${props.children}`}> {props.children} </span>
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
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        충전 프로파일 선택 팝업 열기
      </Button>

      {/* 충전 프로파일 선택 팝업 */}
      {visible && (
        <Dialog title={"충전 프로파일 선택"} onClose={toggleDialog}>
          <div className="dialog-box">
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
                  <Button size={"medium"} fillMode="outline">
                    <i className="icon icon-refresh"></i>
                    초기화
                  </Button>
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
                </div>
              </div>

              <div className="grid-row-3">
                <Grid
                  style={{ height: "467px" }}
                  data={sampleProducts.map((item) => ({
                    ...item,
                    [SELECTED_FIELD]: selectedState[idGetter(item)],
                  }))}
                  selectedField={SELECTED_FIELD}
                  skip={page.skip}
                  take={page.take}
                  total={sampleProducts.length}
                  pageable={{
                    buttonCount: 10,
                    pageSizes: false,
                    info: false,
                  }}
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
                    width="50"
                  />
                  <Column
                    className="txt-left"
                    field="ProfileNo"
                    title="충전프로파일NO"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-left"
                    field="Condition"
                    title="충전 조건"
                    width="120"
                    filterCell={SearchFilterCell}
                  />

                  <Column
                    className="txt-center"
                    field="C"
                    title="전류(C)"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="V"
                    title="전압(V)"
                    width="80"
                    filterable={false}
                  />
                  <Column
                    className="txt-center"
                    field="Cutoff"
                    title="Cutoff current(C)"
                    width="80"
                    filterable={false}
                  />

                  <Column
                    className="txt-center"
                    field="Mode"
                    title="충전Mode"
                    width="100"
                    filterCell={CategoryFilterCell}
                  />

                  <Column title="Derating Factor 1(전류)">
                    <Column
                      className="txt-center"
                      field="Val"
                      title="값"
                      width="80"
                      filterable={false}
                    />
                    <Column
                      className="txt-center"
                      field="Min"
                      title="최소"
                      width="80"
                      filterable={false}
                    />
                    <Column
                      className="txt-center"
                      field="Max"
                      title="최대"
                      width="100"
                      filterable={false}
                    />
                  </Column>
                  <Column title="Derating Factor 2(전압)">
                    <Column
                      className="txt-center"
                      field="Val"
                      title="값"
                      width="80"
                      filterable={false}
                    />
                    <Column
                      className="txt-center"
                      field="Min"
                      title="최소"
                      width="80"
                      filterable={false}
                    />
                    <Column
                      className="txt-center"
                      field="Max"
                      title="최대"
                      width="80"
                      filterable={false}
                    />
                  </Column>

                  <Column
                    className="txt-center"
                    field="Default"
                    title="기본 여부"
                    width="120"
                    filterCell={CategoryFilterCell}
                    cells={{
                      data: CustomCellRepresentative,
                    }}
                  />
                  <Column
                    className="txt-center"
                    field="ConditionNo"
                    title="조건NO"
                    width="120"
                    filterCell={SearchFilterCell}
                  />

                  <Column
                    className="txt-left"
                    field="DateTime"
                    title="수정일시"
                    width="120"
                    filterable={false}
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="UserId"
                    title="수정자 ID"
                    width="120"
                    filterCell={SearchFilterCell}
                  />
                </Grid>
              </div>
            </section>
          </div>
          <DialogActionsBar>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              선택
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
