import * as React from "react";

import {
  Grid,
  GridColumn as Column,
  GridFilterChangeEvent,
  GridSelectionChangeEvent,
  getSelectedState,
  GridHeaderSelectionChangeEvent,
  GridRowClickEvent,
} from "@progress/kendo-react-grid";
import { getter } from "@progress/kendo-react-common";
import { filterBy } from "@progress/kendo-data-query";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { Input } from "@progress/kendo-react-inputs";

import { sampleProducts } from "./sample-products";
import { Product } from "./shared-gd-interfaces";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { DropdownFilterCell } from "../../components/guide/dropdownFilterCell";

const initialFilter: CompositeFilterDescriptor = {
  logic: "and",
  filters: [{ field: "ProductName", operator: "contains", value: "Chef" }],
};

const DATA_ITEM_KEY: string = "No";
const SELECTED_FIELD: string = "selected";
const idGetter = getter(DATA_ITEM_KEY);

const initialDataState = {
  skip: 0,
  take: 10,
};

export default function uiGrid() {
  const [filter, setFilter] = React.useState(initialFilter);

  const [page, setPage] = React.useState(initialDataState);
  const [pageSizeValue, setPageSizeValue] = React.useState();
  const pageChange = (event: any) => {
    const targetEvent = event.targetEvent;
    const take =
      targetEvent.value === "All" ? sampleProducts.length : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };

  const [dataState, setDataState] = React.useState<Product[]>(
    sampleProducts.map((dataItem: Product) =>
      Object.assign({ selected: false }, dataItem)
    )
  );
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

  const handleRowClick = (event: GridRowClickEvent) => {
    console.log("click");
  };

  const handleRowDoubleClick = (event: GridRowClickEvent) => {
    console.log("DoubleClick");
  };

  return (
    <div>
      <h2 className="k-mt-14">Grid</h2>
      <hr className="k-mt-4 k-mb-4" />
      <div className="sort-group">
        <h3>1. Grid - default</h3>
      </div>
      <Grid
        data={filterBy(sampleProducts, filter)
          .slice(page.skip, page.take + page.skip)
          .map((item) => ({
            ...item,
            [SELECTED_FIELD]: selectedState[idGetter(item)],
          }))}
        filterable={true}
        filter={filter}
        onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
        skip={page.skip}
        take={page.take}
        total={sampleProducts.length}
        pageable={{
          buttonCount: 10,
          pageSizes: false,
          info: false,
        }}
        scrollable="scrollable"
        style={{ height: "500px" }}
        onPageChange={pageChange}
        dataItemKey={DATA_ITEM_KEY}
        selectedField={SELECTED_FIELD}
        selectable={{
          enabled: true,
          drag: false,
          cell: false,
          mode: "multiple",
        }}
        onSelectionChange={onSelectionChange}
        onHeaderSelectionChange={onHeaderSelectionChange}
        onRowClick={handleRowClick}
        onRowDoubleClick={handleRowDoubleClick}
      >
        <Column
          className="txt-center"
          field={SELECTED_FIELD}
          filterable={false}
          headerSelectionValue={
            dataState.findIndex((item) => !selectedState[idGetter(item)]) === -1
          }
          width="60"
        />
        <Column
          field="ProductID"
          filterable={false}
          title="ID"
          width="80"
          locked={true}
        />
        <Column
          field="ProductID"
          title="ID"
          width="140"
          filterCell={CategoryFilterCell}
        />
        <Column
          field="ProductID"
          title="ID"
          width="140"
          filterCell={SearchFilterCell}
        />
        <Column
          field="ProductID"
          title="ID"
          width="140"
          filterCell={FunnelFilterCell}
        />
        <Column field="ProductName" title="Product Name" width="160" />
        <Column
          field="FirstOrderedOn"
          filter="date"
          format="{0:d}"
          width="150"
        />
        <Column field="UnitPrice" filter="numeric" format="{0:c}" width="220" />
        <Column field="Discontinued" filter="boolean" width="220" />
      </Grid>

      <br />
      <br />

      <div className="sort-group">
        <h3>2. Grid - row color</h3>
      </div>
      <div className="grid-row-color">
        <Grid
          data={filterBy(sampleProducts, filter)
            .slice(page.skip, page.take + page.skip)
            .map((item) => ({
              ...item,
              [SELECTED_FIELD]: selectedState[idGetter(item)],
            }))}
          filterable={true}
          filter={filter}
          onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
          skip={page.skip}
          take={page.take}
          total={sampleProducts.length}
          pageable={{
            buttonCount: 10,
            pageSizes: false,
            info: false,
          }}
          scrollable="none"
          onPageChange={pageChange}
          dataItemKey={DATA_ITEM_KEY}
          selectedField={SELECTED_FIELD}
          selectable={{
            enabled: true,
            drag: false,
            cell: false,
            mode: "multiple",
          }}
          onSelectionChange={onSelectionChange}
          onHeaderSelectionChange={onHeaderSelectionChange}
        >
          <Column
            className="txt-center"
            field={SELECTED_FIELD}
            filterable={false}
            headerSelectionValue={
              dataState.findIndex((item) => !selectedState[idGetter(item)]) ===
              -1
            }
          />
          <Column field="ProductID" title="ID" filterable={false} width="60" />
          <Column field="ProductName" title="Product Name" />
          <Column field="FirstOrderedOn" filter="date" format="{0:d}" />
          <Column
            field="UnitPrice"
            filter="numeric"
            format="{0:c}"
            width="220"
          />
          <Column field="Discontinued" filter="boolean" />
        </Grid>
      </div>

      <br />
      <br />

      <div className="sort-group">
        <h3>3. Grid - boxline</h3>
      </div>
      <div className="sort-group">
        <div className="sort-group__counter">
          <span className="total">총 1,000 건</span>
          <DropDownList
            style={{ width: "130px" }}
            data={["20", "50", "100"]}
            defaultValue="20"
            dir="rtl"
          />
        </div>
        <div className="sort-group__btns">
          <Button themeColor={"info"}>
            <i className="icon icon-filter" title="Reset all Filter"></i>
          </Button>
          <Button themeColor={"info"} title="Reset Table Layout">
            <i className="icon icon-tbl-layout"></i>
          </Button>
          <Button themeColor={"info"}>
            <i className="icon icon-column" title="Set Column"></i>
          </Button>
          <Button themeColor={"info"}>
            <i className="icon icon-download" title="Set Column"></i>
          </Button>
        </div>
      </div>

      <div className="grid-box-line">
        <Grid
          data={filterBy(sampleProducts, filter)
            .slice(page.skip, page.take + page.skip)
            .map((item) => ({
              ...item,
              [SELECTED_FIELD]: selectedState[idGetter(item)],
            }))}
          skip={page.skip}
          take={page.take}
          total={sampleProducts.length}
          pageable={{
            buttonCount: 10,
            pageSizes: false,
            info: false,
          }}
          scrollable="none"
          sortable={true}
        >
          <Column
            className="txt-center"
            field="ProductID"
            title="ID"
            filterable={false}
            width="60"
          />
          <Column
            className="txt-center"
            field="ProductName"
            title="Product Name"
            filterable={false}
          />
          <Column
            className="txt-center"
            field="FirstOrderedOn"
            filter="date"
            filterable={false}
          />
          <Column
            className="txt-center"
            field="UnitPrice"
            title="11"
            filterable={false}
            width="120"
          />
          <Column
            className="txt-center"
            field="Discontinued"
            title="11"
            filterable={false}
          />
        </Grid>
      </div>

      <br />
      <br />

      <div className="sort-group">
        <h3>4. Grid - row3</h3>
      </div>
      <div className="grid-row-3">
        <Grid
          data={filterBy(sampleProducts, filter)
            .slice(page.skip, page.take + page.skip)
            .map((item) => ({
              ...item,
              [SELECTED_FIELD]: selectedState[idGetter(item)],
            }))}
          filterable={true}
          filter={filter}
          onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
          skip={page.skip}
          take={page.take}
          total={sampleProducts.length}
          pageable={{
            buttonCount: 10,
            pageSizes: false,
            info: false,
          }}
          scrollable="scrollable"
          onPageChange={pageChange}
          dataItemKey={DATA_ITEM_KEY}
          selectedField={SELECTED_FIELD}
          selectable={{
            enabled: true,
            drag: false,
            cell: false,
            mode: "multiple",
          }}
          onSelectionChange={onSelectionChange}
          onHeaderSelectionChange={onHeaderSelectionChange}
        >
          <Column
            className="txt-center"
            field={SELECTED_FIELD}
            filterable={false}
            headerSelectionValue={
              dataState.findIndex((item) => !selectedState[idGetter(item)]) ===
              -1
            }
            width="60"
          />
          <Column field="ProductID" filterable={false} title="ID" width="80" />
          <Column title="group">
            <Column
              field="ProductID"
              title="ID"
              width="140"
              filterable={false}
            />
            <Column
              field="ProductID"
              title="ID"
              width="140"
              filterable={false}
            />
          </Column>

          <Column
            field="ProductID"
            title="ID"
            width="140"
            filterCell={FunnelFilterCell}
          />
          <Column field="ProductName" title="Product Name" width="160" />
          <Column
            field="FirstOrderedOn"
            filter="date"
            format="{0:d}"
            width="150"
          />
          <Column
            field="UnitPrice"
            filter="numeric"
            format="{0:c}"
            width="220"
          />
          <Column field="Discontinued" filter="boolean" width="220" />
        </Grid>
      </div>
    </div>
  );
}
