// HEXAADMSTM2S10 : 스테이션 QR코드

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
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
import { DropdownFilterCell } from "../../components/guide/dropdownFilterCell";
import { getter } from "@progress/kendo-react-common";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

const sampleProducts = [
  {
    No: "1",
    QRID: "C4023",
    Id: "superadmin01",
    Name: "GS25 강남점",
    City: "서울특별시",
    District: "강남구",
    QRCode: "imgs-qr.png",
    DateTime: "2024-08-10 12:30:40",
  },
  {
    No: "2",
    QRID: "C4023",
    Id: "superadmin01",
    Name: "GS25 강남점",
    City: "서울특별시",
    District: "강남구",
    QRCode: "imgs-qr.png",
    DateTime: "2024-08-11 12:30:40",
  },
];

export default function HEXAADMSTM2S10() {
  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);

  const CategoryFilterCell = (props: any) => (
    <DropdownFilterCell
      {...props}
      // data={categories}
      defaultItem={"선택"}
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

  const CustomCellQR = (props: any) => (
    <td colSpan={1} className="k-table-td txt-center">
      <img
        src={`/images/${props.children}`}
        alt="QR Code"
        width={30}
        height={30}
      />
    </td>
  );

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
  };

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

  // alert qr 생성
  const [visible, setVisible] = React.useState(false);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>스테이션 코드 관리 </span>
        <span>스테이션 QR코드 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 QR코드</h2>
      </div>

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
            <Button themeColor={"info"} title="인쇄하기">
              <i className="icon icon-print"></i>
            </Button>
          </div>
          <div className="group-align-right gap0.38">
            <Button
              size={"medium"}
              themeColor={"primary"}
              className="btn-in-icon"
              onClick={toggleDialog}
            >
              신규 생성 <i className="icon icon-new-add"></i>
            </Button>
          </div>
        </div>

        <div>
          <Grid
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
              field="QRID"
              title="QR ID"
              width="90"
              filterCell={SearchFilterCell}
            />
            <Column
              className="txt-left"
              field="Id"
              title="스테이션ID"
              width="120"
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
              width="100"
              filterCell={CategoryFilterCell}
            />
            <Column
              className="txt-left"
              field="QRCode"
              title="QR코드"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellQR,
              }}
            />
            <Column
              className="txt-center"
              field="DateTime"
              title="생성일시"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="Id"
              title="생성자 ID"
              width="100"
              filterCell={SearchFilterCell}
            />
          </Grid>
        </div>
      </section>

      {visible && (
        <Dialog>
          <Button
            size={"medium"}
            onClick={toggleDialog}
            fillMode="flat"
            className="btn-dialog-actions"
          ></Button>

          <div className="dialog-box pop-s">
            <p className="txt-left mt1">생성할 QR코드 개수를 입력하세요.</p>

            <div className="in-input">
              <Input />
            </div>
          </div>

          <DialogActionsBar>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              확인
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
