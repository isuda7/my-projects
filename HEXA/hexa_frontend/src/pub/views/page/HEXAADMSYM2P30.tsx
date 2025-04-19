// HEXAADMSYM2P30 : 	[P]수신자 선택

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
    Auth: "시스템 관리자",
    UserID: "admin04123",
    Name: "김엘지",
    Email: "yup111@lgespartner.com",
    PhoneNumber: "010-000-1234",
  },
  {
    No: "2",
    Auth: "시스템 관리자",
    UserID: "admin04123",
    Name: "김엘지",
    Email: "yup111@lgespartner.com",
    PhoneNumber: "010-000-1234",
  },
];

export default function HEXAADMSYM2P30() {
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
  const CustomCellLink = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <a href="" className="underline">
          {props.children}
        </a>
      </td>
    );
  };

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        수신자 선택 팝업 열기
      </Button>

      {/* 수신자 선택 팝업 */}
      {visible && (
        <Dialog title={"수신자 선택"} onClose={toggleDialog}>
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
                  style={{ height: "550px" }}
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
                    width="40"
                  />
                  <Column
                    className="txt-left"
                    field="Auth"
                    title="권한"
                    width="120"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="UserID"
                    title="사용자ID"
                    width="80"
                    filterCell={SearchFilterCell}
                    cells={{
                      data: CustomCellLink,
                    }}
                  />
                  <Column
                    className="txt-center"
                    field="Name"
                    title="이름"
                    width="80"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="Email"
                    title="이메일 주소"
                    width="140"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="PhoneNumber"
                    title="휴대폰 번호"
                    width="100"
                    filterCell={SearchFilterCell}
                  />
                </Grid>
              </div>
            </section>
          </div>
          <DialogActionsBar>
            <Button size={"medium"}>전체 선택</Button>
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
