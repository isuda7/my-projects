// HEXAADMSTM2P26 : 	[P]스테이션 선택

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
    Division: "GS25",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    DateTime: "2024-08-10 20:08:19",
    City: "서울특별시",
    District: "강남구",
  },
  {
    No: "2",
    Division: "GS25",
    ID: "HX0224020C1",
    Name: "GS25 강남점",
    DateTime: "2024-08-10 20:08:19",
    City: "서울특별시",
    District: "강남구",
  },
];

export default function HEXAADMSTM2P26() {
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

  const FunnelFilterCell = (props: any) => (
    <div className="inner-item type-icon">
      <Input defaultValue={"전체"} />
      <Button size={"small"} fillMode="flat" className="btn-icon">
        <i className="icon icon-funnel"></i>
      </Button>
    </div>
  );

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
        스테이션 선택 팝업 열기
      </Button>

      {/* 스테이션 선택 팝업 */}
      {visible && (
        <Dialog title={"스테이션 선택"} onClose={toggleDialog}>
          <div className="dialog-box pop-l">
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
              </div>

              <div>
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
                    width="60"
                  />
                  <Column
                    className="txt-left"
                    field="ID"
                    title="스테이션ID"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Name"
                    title="스테이션명"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="Division"
                    title="고객구분"
                    width="100"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="City"
                    title="시 단위"
                    width="100"
                    filterCell={FunnelFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="District"
                    title="구 단위"
                    width="100"
                    filterCell={FunnelFilterCell}
                  />
                </Grid>
              </div>
            </section>
          </div>
          <DialogActionsBar>
            <Button size={"medium"} onClick={toggleDialog}>
              전체 선택
            </Button>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              선택
            </Button>
            <div className="text-desc">
              ※ [전체 선택] 버튼 클릭 시, 조회된 결과가 모두 선택됩니다.
            </div>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
