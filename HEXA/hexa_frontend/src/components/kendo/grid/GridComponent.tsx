import React, { useCallback, useEffect, useState } from "react";
import {
  getSelectedState,
  Grid,
  GridCellProps,
  GridColumn,
  GridColumnMenuCheckboxFilterProps,
  GridColumnMenuProps,
  GridFilterCellProps,
  GridFilterChangeEvent,
  GridHeaderCellProps,
  GridHeaderSelectionChangeEvent,
  GridPageChangeEvent,
  GridPagerSettings,
  GridRowClickEvent,
  GridSelectionChangeEvent,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";

import { Button } from "@progress/kendo-react-buttons";
import {
  CompositeFilterDescriptor,
  filterBy,
  getter,
  orderBy,
  SortDescriptor,
} from "@progress/kendo-data-query";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { useTranslation } from "react-i18next";
import {
  AppState,
  CommonGridProps,
  GridHeader,
  ItemType,
} from "./interface/GridInterfaces.ts";
import CustomDropDownFilter from "@/components/kendo/grid/CustomDropDownFilter.tsx";
import CheckBoxFilterCell from "@/components/kendo/grid/CheckBoxFilterCell.tsx";
import CustomColumnCell from "@/components/kendo/grid/CustomColumnCell.tsx";
import ColumnDropBox from "@/components/kendo/grid/ColumnDropBox.tsx";
import { getCurrentDate } from "@/utils/common.ts";
import CustomHeaderCell from "@/components/kendo/grid/CustomHeaderCell.tsx";

function NonFilterCell() {
  return <div />;
}

function GridComponent<T>({
  columnHeader = [
    {
      field: "fieldName",
      title: "titleName",
      width: 50,
      filterType: "filterTypeName",
      filterable: false,
      align: "alignName",
      cellType: "cellTypeName",
      show: true,
      isRowSpan: false,
      cell: null,
    },
  ],
  buttonCount = 5,
  sortableGrid = false,
  unsorted = false,
  multipleSorting = false,
  defaultFilter = false,
  // isResizable = false,
  isReorder = false,
  gridData = [],
  displayCount = [0],
  gridWidth = "100%",
  gridHeight = 0,
  isChecked = false,
  checkKey = "name",
  rowClick = (props: GridRowClickEvent | T[] | T) => props,
  rowSelectable = false,
  girdToolBar = false,
  headerGroup,
  addButton,
  deleteButton,
  downloadButton,
  showUpdateTime = true,
  isFilterResetButton = false,
  isGridResetButton = false,
  isColumnSelectShowButton = false,
  pageChange,
}: Readonly<CommonGridProps<T>>) {
  // const gridRef = useRef<Grid | null | undefined>();
  const { t } = useTranslation("translation");
  const [sort, setSort] = useState<Array<SortDescriptor>>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | undefined>(
    undefined,
  );
  const [columns, setColumns] = useState<GridHeader[]>(() =>
    columnHeader.map((item) => ({
      ...item,
      show: item.show ?? true,
    })),
  );
  const createState = (skip: number, take: number): AppState => {
    const pagerSettings: GridPagerSettings = {
      buttonCount,
      info: false,
      type: "numeric",
      pageSizes: false,
      previousNext: true,
    };

    const gridDataArray = gridData as T[];

    return {
      items: gridDataArray?.slice(
        skip,
        take === 0 ? gridDataArray?.length : skip + take,
      ) as object[],
      total: gridDataArray?.length,
      skip,
      take,
      pageSize: take,
      pageable: take === 0 ? false : pagerSettings,
    };
  };

  const [state, setState] = useState<AppState>(createState(0, displayCount[0]));
  const [height, setHeight] = useState(gridHeight);
  const [selectedState, setSelectedState] = useState<{
    [id: string]: boolean | number[];
  }>({});
  const SELECTED_FIELD = "selected";
  const idGetter = getter(checkKey);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [initShowColumns, setInitShowColumns] = useState<boolean>(false);
  const [isShowColumnDropDownOpen, setIsShowColumnDropDownOpen] =
    useState<boolean>(false);

  const pageChangeEvent = (event: GridPageChangeEvent) => {
    pageChange?.(event);
    setState(createState(event.page.skip, event.page.take));
  };

  const sortChange = (event: GridSortChangeEvent) => {
    if (gridData != null) {
      const sortedData = orderBy(gridData as object[], event.sort);
      setState({
        ...state,
        items: sortedData,
      });
    }
    setSort(event.sort);
  };

  useEffect(() => {
    setState(createState(0, displayCount[0]));
  }, [gridData]);

  useEffect(() => {
    setHeight(gridHeight);
  }, [gridHeight]);

  const clearFilters = () => {
    setFilter(undefined);
    setSort([]);
  };

  const resetColumns = () => {
    // gridRef.current._columns = gridRef.current._columns?.map((column) => ({
    //   ...column,
    //   orderIndex: columnHeader.indexOf(column.field),
    // }));

    setInitShowColumns(!initShowColumns);
    setIsShowColumnDropDownOpen(false);
  };

  const gridStyles = {
    transition: "all 200ms ease 0s",
  };

  const onCheckBoxSelectionChangeHandle = useCallback(
    (event: GridSelectionChangeEvent) => {
      const checkboxElement = event.syntheticEvent?.target as HTMLInputElement;
      const checked = checkboxElement?.checked;
      let filterData;

      if (!checked) {
        filterData = selectedRow.filter(
          (key: string) =>
            key[checkKey as keyof string] !== event?.dataItem[checkKey],
        );

        setSelectedRow(filterData);
      } else {
        setSelectedRow([
          ...selectedRow,
          { ...event.dataItem, selected: checked },
        ]);
      }

      const newSelectedState = getSelectedState({
        event,
        selectedState,
        dataItemKey: checkKey,
      });
      setSelectedState(newSelectedState);
    },
    [selectedRow, selectedState],
  );

  const onSelectionChangeHandle = useCallback(
    (event: GridSelectionChangeEvent) => {
      setSelectedRow([...selectedRow, { ...event.dataItem, selected: true }]);

      const newSelectedState = getSelectedState({
        event,
        selectedState,
        dataItemKey: checkKey,
      });
      setSelectedState(newSelectedState);
      rowClick?.(event.dataItems[event.startRowIndex]);
      const filteredColumnHeaders = columnHeader.filter(
        (header) => header.show !== false,
      );

      const cellClick = filteredColumnHeaders[event.startColIndex]?.cellClick;

      if (typeof cellClick === "function") {
        cellClick(event, event.dataItem);
      }
    },
    [selectedRow, selectedState],
  );

  const onHeaderSelectionChange = useCallback(
    (event: GridHeaderSelectionChangeEvent) => {
      const { checked } = event.syntheticEvent?.target as HTMLInputElement;
      const newSelectedState: { [key: string]: boolean } = {};
      event.dataItems.forEach((item: T) => {
        newSelectedState[idGetter(item)] = checked;
      });

      const checkedAllData: string[] = [];

      if (!checked) {
        setSelectedRow([]);
      } else {
        event.dataItems.forEach((item) => {
          checkedAllData.push({ ...item, selected: true });
        });
        setSelectedRow(checkedAllData);
      }

      setSelectedState(checked ? newSelectedState : {});
    },
    [idGetter],
  );

  const determineColumnMenu = (
    header: GridHeader,
  ): React.FunctionComponent<GridColumnMenuProps> | undefined => {
    if (
      defaultFilter &&
      header.filterable &&
      header.filterType === "checkbox"
    ) {
      const fieldValues = state?.items;
      return (props: GridColumnMenuCheckboxFilterProps | GridColumnMenuProps) =>
        CheckBoxFilterCell({ ...props, data: fieldValues });
    }
    return undefined;
  };

  const displayCountChange = (event: DropDownListChangeEvent) => {
    setState(createState(0, parseInt(event.target.value, 10)));
  };

  const filterCellCallback = useCallback(
    (gridFilterCellProps: GridFilterCellProps) => {
      type ActualType = number | string;
      if (defaultFilter) {
        const column = columns.find(
          (value) => value.field === gridFilterCellProps.field,
        );

        if (column?.filterable && column.filterType === "select") {
          // Assuming state.items is of type ItemType<ActualType>[], use a type assertion if needed
          const items = state.items as ItemType<ActualType>[];

          const uniqueValues = Array.from(
            new Set(items.map((item) => String(item[column.field]))),
          );
          const onChangeHandler = (event: {
            value: string;
            operator: string;
            syntheticEvent: Event;
          }) => {
            console.log(event);
          };
          return (
            <CustomDropDownFilter
              {...gridFilterCellProps}
              data={uniqueValues}
              defaultItem="ALL"
              field={column.field}
              onChange={onChangeHandler}
            />
          );
        }
      }
      return null;
    },
    [state.items, columnHeader],
  );

  return (
    <div style={{ width: gridWidth }}>
      <div>
        {headerGroup}
        {girdToolBar && (
          <div className="sort-group k-w-full">
            <div>
              <span className="total">
                Total {(gridData as object[])?.length}
              </span>
              <span className="sort">
                <DropDownList
                  style={{ width: "80px" }}
                  data={displayCount}
                  defaultValue="10"
                  onChange={(event) => {
                    displayCountChange(event);
                  }}
                />
              </span>
              {showUpdateTime && (
                <span className="date">
                  {t("grid.update-time")} {getCurrentDate()}
                </span>
              )}
              {deleteButton && (
                <Button
                  size="medium"
                  className="k-ml-5 min-w70"
                  type="button"
                  onClick={deleteButton}
                >
                  {t("grid.delete-button")}
                </Button>
              )}
            </div>

            <div className="group-align-right">
              {isFilterResetButton && (
                <Button themeColor="info" onClick={clearFilters}>
                  <i className="icon icon-filter" />
                </Button>
              )}
              {isGridResetButton && (
                <Button themeColor="info" onClick={resetColumns}>
                  <i className="icon icon-tbl-layout" />
                </Button>
              )}
              {isColumnSelectShowButton && (
                <ColumnDropBox
                  list={columns}
                  setList={setColumns}
                  initCulmns={initShowColumns}
                  isDropMenuOpen={isShowColumnDropDownOpen}
                  setIsDropMenuOpen={setIsShowColumnDropDownOpen}
                />
              )}
              {downloadButton && (
                <Button themeColor="info">
                  <i className="icon icon-download" />
                </Button>
              )}
              {addButton && (
                <Button
                  size="medium"
                  themeColor="light"
                  className="k-ml-5 min-w70"
                  onClick={addButton}
                >
                  + {t("grid.add-button")}
                </Button>
              )}
            </div>
          </div>
        )}
        <div>
          <Grid
            // ref={gridRef}
            style={{ width: "100%", height, ...gridStyles }}
            data={
              filter
                ? filterBy(
                    state.items?.map((item) => ({
                      ...item,
                      [SELECTED_FIELD]: selectedState[idGetter(item)],
                    })),
                    filter,
                  )
                : state.items?.map((item) => ({
                    ...item,
                    [SELECTED_FIELD]: selectedState[idGetter(item)],
                  }))
            }
            onPageChange={pageChangeEvent}
            total={state.total}
            skip={state.skip}
            pageable={state.pageable}
            pageSize={state.pageSize}
            sortable={
              !sortableGrid
                ? false
                : {
                    allowUnsort: unsorted,
                    mode: multipleSorting ? "multiple" : "single",
                  }
            }
            sort={sort}
            onSortChange={sortChange}
            onFilterChange={(event: GridFilterChangeEvent) =>
              setFilter(event.filter)
            }
            filterable={defaultFilter}
            filter={filter}
            // resizable={isResizable}
            resizable={false}
            dataItemKey={checkKey}
            selectedField={SELECTED_FIELD}
            onSelectionChange={(event: GridSelectionChangeEvent) => {
              if (isChecked) {
                onCheckBoxSelectionChangeHandle(event);
              } else {
                onSelectionChangeHandle(event);
              }
            }}
            onHeaderSelectionChange={(event) => onHeaderSelectionChange(event)}
            selectable={{
              enabled: isChecked ? false : rowSelectable,
              drag: false,
              cell: false,
              mode: isChecked ? "multiple" : "single",
            }}
            reorderable={isReorder}
            onRowClick={(event) => {
              rowClick?.(event);
            }}
            // onColumnReorder={(e) => {
            //   if (isChecked) {
            //     e.columns.forEach((column) => {
            //       if (column.id === e.columnId) {
            //         if (column.orderIndex === 0) {
            //           // @ts-expect-error
            //           const newColumns = gridRef.current?._columns?.map(
            //             (column: { field: GridHeader }) => ({
            //               ...column,
            //               orderIndex: columnHeader.indexOf(column.field),
            //             }),
            //           );
            //           if (gridRef.current) {
            //             // @ts-expect-error
            //             gridRef.current._columns = newColumns;
            //           }
            //         }
            //       }
            //     });
            //   }
            // }}
          >
            {isChecked && (
              <GridColumn
                locked
                reorderable={false}
                resizable={false}
                field={SELECTED_FIELD}
                width={50}
                headerSelectionValue={
                  state.items?.findIndex(
                    (item) => !selectedState[idGetter(item)],
                  ) === -1
                }
                filterCell={NonFilterCell}
              />
            )}
            {columns?.map((header) => {
              if (header?.show) {
                const cellType: string = header?.cellType ?? "none";
                const backGroundColor: string =
                  header?.backGroundColor ?? "none";
                const cellComponent = (props: GridCellProps) =>
                  CustomColumnCell(props, columns, cellType, backGroundColor);

                if (header?.filterable) {
                  if (header?.filterType === "select") {
                    return (
                      <GridColumn
                        {...header}
                        key={header?.field}
                        headerCell={(props: GridHeaderCellProps) =>
                          CustomHeaderCell(props, header.headerTextAlign)
                        }
                        cell={cellComponent}
                        filterCell={filterCellCallback}
                      />
                    );
                  }
                  return (
                    <GridColumn
                      {...header}
                      key={header?.field}
                      headerCell={(props: GridHeaderCellProps) =>
                        CustomHeaderCell(props, header.headerTextAlign)
                      }
                      cell={cellComponent}
                      filterable={false}
                      columnMenu={determineColumnMenu(header)}
                    />
                  );
                }
                return (
                  <GridColumn
                    {...header}
                    key={header?.field}
                    headerCell={(props: GridHeaderCellProps) =>
                      CustomHeaderCell(props, header.headerTextAlign)
                    }
                    cell={cellComponent}
                    columnMenu={determineColumnMenu(header)}
                  />
                );
              }
              return <div key={header?.field} />;
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default GridComponent;
