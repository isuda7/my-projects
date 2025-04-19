import { useEffect, useState } from "react";
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridFilterChangeEvent,
  GridHeaderCellProps,
  GridPageChangeEvent,
  GridPagerSettings,
  GridRowClickEvent,
  GridSortChangeEvent,
  GridNoRecords,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";

import { Button } from "@progress/kendo-react-buttons";
import {
  CompositeFilterDescriptor,
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
} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import CustomColumnCell from "@/components/kendo/grid/CustomColumnCell.tsx";
import CustomHeaderCell from "@/components/kendo/grid/CustomHeaderCell.tsx";

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
      cell: undefined,
    },
  ],
  buttonCount = 10,
  sortableGrid = false,
  unsorted = false,
  multipleSorting = false,
  defaultFilter = false,
  isResizable = false,
  isReorder = false,
  gridData = [],
  displayCount = [20],
  gridWidth = "100%",
  gridHeight = 0,
  rowClick = (props: GridRowClickEvent | T[] | T) => props,
  girdToolBar = false,
  downloadButton,
  pageChange,
  gridInfoMessage,
  gridClassName='',
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

  const displayCountChange = (event: DropDownListChangeEvent) => {
    setState(createState(0, parseInt(event.target.value, 10)));
  };

  const onDownload = (e: any) => {
    return downloadButton ? downloadButton(e) : null;
  }

  const CustomNoRecords = () => {
    return (
      <>{'검색된 데이터가 없습니다.'}</>
    );
  };

  const generateColumns = (list: any[]) => {
    return list?.map(header => {
      const cellType: string = header?.cellType ?? "none";
      const backgroundcolor: string = header?.backgroundcolor ?? "none";
      const cellComponent = (props: GridCellProps) => {
        return CustomColumnCell(props, header, cellType, backgroundcolor);
      }

      if (header.children && header.children.length > 0) {
        return (
          <GridColumn 
            {...header} 
            key={header?.field}
            headerCell={(props: GridHeaderCellProps) =>
              CustomHeaderCell(props, header.headerTextAlign)
            }
            sortable={false}
          >
            {generateColumns(header.children)}
          </GridColumn>
        )
      }
      else {
        const headerData = {...header};
        if(header?.locked) header.orderIndex = 0;
        return (
          <GridColumn
            {...headerData}
            key={header?.field}
            reorderable={header?.locked? false : isReorder? true : false}
            resizable={header?.locked? false : isResizable? true : false}
            headerCell={(props: GridHeaderCellProps) =>
              CustomHeaderCell(props, header.headerTextAlign)
            }
            cell={cellComponent}
          />
        );
      }
    })
  }

  return (
    <div style={{ width: gridWidth }}>
      <div>
        {girdToolBar && (
          <div className="sort-group">
            <div className="sort-group__counter">
              <span className="total">
                {t('grid.total_items', {number: gridData?.length || 0})}
                {/* `총 ${gridData?.paging?.totalElements || 0} 건` */}
              </span>
              <span className="sort">
                <DropDownList
                  style={{ width: "150px" }}
                  data={displayCount}
                  defaultValue={displayCount && displayCount[0] || 10}
                  onChange={(event) => {
                    displayCountChange(event);
                  }}
                />
              </span>
            </div>

            <div className="sort-group__btns">
              {downloadButton && (
                <Button 
                  themeColor="info"
                  onClick={onDownload}
                  type="button"
                >
                  <i className="icon icon-download" title="excel download"/>
                </Button>
              )}
              {gridInfoMessage && 
                <div className="sort-group__txt">{gridInfoMessage()}</div>
              }
            </div>
          </div>
        )}

        <div className={gridClassName? gridClassName : "grid-row-3"}>
          <Grid
            style={{ width: "100%", height: gridHeight }}
            data={
              state.items?.map((item) => ({
                ...item,
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
            resizable={isResizable}
            reorderable={isReorder}
            onRowClick={(event) => {
              rowClick?.(event);
            }}
          >
            {/* noData 또는 로딩중 영역 */}
            <GridNoRecords>
              <CustomNoRecords />
            </GridNoRecords>

            {generateColumns(columns)}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default GridComponent;
