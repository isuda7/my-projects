import React, { useImperativeHandle, forwardRef, useCallback, useEffect, useState } from "react";
import {
  getSelectedState,
  Grid,
  GridCellProps,
  GridColumn,
  GridFilterCellProps,
  GridFilterChangeEvent,
  GridHeaderCellProps,
  GridHeaderSelectionChangeEvent,
  GridRowClickEvent,
  GridSelectionChangeEvent,
  GridSortChangeEvent,
  GridNoRecords,
  GridRowProps,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";

import { Button } from "@progress/kendo-react-buttons";
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  filterBy,
  getter,
  SortDescriptor,
  orderBy,
} from "@progress/kendo-data-query";
import {
  StationGridProps,
  GridHeader,
} from "@/components/kendo/grid/interface/GridInterfaces";
import CustomDropDownFilter from "@/components/kendo/grid/CustomDropDownFilter.tsx";
import CustomMultiSelectFilter from "@/components/kendo/grid/CustomMultiSelectFilter.tsx";
import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';
import CustomColumnCell from "@/components/kendo/grid/CustomColumnCell.tsx";
import CustomHeaderCell from "@/components/kendo/grid/CustomHeaderCell.tsx";
import _ from 'lodash';
import { useTranslation } from "react-i18next";

function NonFilterCell() {
  return <div />;
}

function StationSelectGrid<T>({
  columnHeader = [
    {
      field: "fieldName",
      title: "titleName",
      // searchkey: "testField",
      // searchType: "array",
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
  sortableGrid = false,
  unsorted = false,
  multipleSorting = false,
  defaultFilter = false,
  isResizable = false,
  isReorder = false,
  checkKey = "id",
  rowClick = (props: GridRowClickEvent | T[] | T) => props,
  headerSelection = true,
  rowStyles,
  gridData = [],
  maxHeight = 300,
  checkedDisabled = false,
  nonCheck = false,
}: Readonly<StationGridProps<T>>, ref: any) {
  const {t} = useTranslation();
  const [list , setList] = useState<any[]>(gridData as T[]);
  useEffect(() => {
    if(Array.isArray(gridData)) setList(gridData)
  }, [gridData])

  const [sort, setSort] = useState<SortDescriptor[]>([]);

  const [filter, setFilter] = useState<CompositeFilterDescriptor | undefined>({
    logic: "and",
    filters: []
  });

  //const [height, setHeight] = useState(gridHeight);
  const [selectedState, setSelectedState] = useState<{[id: string]: boolean | number[]}>({});
  const SELECTED_FIELD = "selected";
  const idGetter = getter(checkKey);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [columns, setColumns] = useState<GridHeader[]>(columnHeader);
  //그리드의 key값을 변경해 순서변경시 그리드 재랜더링을 하기위해 랜덤 숫자 세팅, key + 1씩 하면서 grid의 key값 변경
  const randomNumber = Math.floor(Math.random() * 9000000) + 1000000;
  const [gridKey, setGridKey] = useState<number>(randomNumber)

  useEffect(() => {
    setColumns(columnHeader)
  }, [columnHeader])

  /**
   * 현재 선택된 DataItems 반환
   * @returns 
   */
  const getSeletedDataItems = () => {
    let resultArray: any[] = [];
    resultArray = _.cloneDeep(selectedRow);
    return resultArray;
  }

  /**
   * 모든 DataItems 반환
   * @returns 
   */
  const getAllDataItems = () => {
    return list;
  }

  useImperativeHandle(ref, () => ({
    getSeletedDataItems: () => getSeletedDataItems(),
    getAllDataItems: () => getAllDataItems()
  }))

  const handleSortChange = (event: GridSortChangeEvent) => {
    if (gridData != null) {
      const sortedData = orderBy(gridData as object[], event.sort);
      setList(sortedData);
    }
    setSort(event.sort);
  };

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

  /**
   * AS_IS 컬럼 체크박스 필터(수정예정)
   * @param header 
   * @returns 
   */
  const findColumnByField = useCallback((field: string | undefined, list: GridHeader[]) => {
    const stack =[...list]; // 처음에 모든 스택에 넣음

    while (field && stack.length > 0) {
      const column = stack.pop(); // 스택에서 하나씩 꺼내서 처리

      if (column?.field === field) {
        return column; // 일치하는 필드를 찾으면 반환
      }

      // children이 있으면 스택에 추가
      if (column?.children) {
        stack.push(...column.children);
      }
    }

    return undefined; // 일치하는 컬럼을 찾지 못한 경우 null 반환
}, []);

  const filterCellCallback = useCallback((filterProps: GridFilterCellProps) => {
    const column:any = findColumnByField(filterProps.field, columnHeader)
    if (column?.filterable && column.filterType === "select") {
      return (
        <CustomDropDownFilter
          {...filterProps}
          data={column?.selectData || []}
          defaultItem="ALL"
          field={column.field}
          onChange={(e) => {
            if (column?.onChangeSelect) {
              column.onChangeSelect(e);
            }
            filterProps.onChange({
              value: e.value,
              operator: 'contains',
              syntheticEvent: e.syntheticEvent as any
            })
          }}
        />
      );
    }
    else if (column?.filterable && column.filterType === "multiSelect") {
      return (
        <CustomMultiSelectFilter
          value = {filterProps.value}
          data={column?.selectData || []}
          // defaultItem="ALL"
          // field={column.field}
          onChange={(e, values) => filterProps.onChange({
            value: values,
            operator: 'contains',
            syntheticEvent: e,
          })}
        />
      );
    }
    else if(column?.filterable) {
      const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
          //search();
          // 현재 포커스를 제거합니다.
          (event.target as HTMLInputElement).blur();
        }
      }

      // const search = () => {
      //   refetch();
      // }
  
      return (
        <div className="inner-item type-icon">
          <Input
            value={filterProps.value}
            onChange={(e: InputChangeEvent) => filterProps.onChange({
              value: e.target.value,
              operator: 'contains',
              syntheticEvent: e.syntheticEvent
            })}
            onKeyDown={onKeyDown}
          />
          <Button
            type="button"
            size={"small"} 
            fillMode="flat" 
            className="btn-icon"
            onClick={undefined}
          >
            <i className="icon icon-glass"></i>
          </Button>
        </div>
      )
    }
    return null;
  }, [columnHeader]);


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

  useEffect(() => {
    console.log('selectedState', selectedState)
  }, [selectedState])

  const rowRender = useCallback((
    trElement: React.ReactElement,
    props: GridRowProps
  ): React.ReactElement => {
    let customRowStyle;

    if(typeof rowStyles === 'function') {
      customRowStyle = rowStyles?.(props);
    }
    else if(typeof rowStyles === 'object') {
      customRowStyle = rowStyles;
    }

    return React.cloneElement(trElement, {
      style: { ...trElement.props.style, ...customRowStyle }
    });
  }, [gridData]);

  useEffect(() => {
    setGridKey(gridKey + 1)
  }, [columns])

  const CustomNoRecords = () => {
    return (
      // <>{'검색된 데이터가 없습니다.'}</>
      <>{t('common.no_search_results')}</>
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
            filterCell={defaultFilter? filterCellCallback : undefined}
          />
        );
      }
    })
  }

  // 커스텀 필터 함수
  const customFilterBy = (data: Record<string, any>[], filter: CompositeFilterDescriptor): Record<string, any>[] => {
    if (!filter) return data;

    return data.filter(item => 
      filter.filters.every(f => {
        const { field, value } = f as FilterDescriptor;
        if (Array.isArray(value) && typeof field === 'string') {
          return value.includes(item[field]);
        }
        // 기본 KendoReact filterBy 함수 사용
        return filterBy([item], {
          logic: 'and',
          filters: [f]
        } as CompositeFilterDescriptor).length > 0;
      })
    );
  };

  useEffect(() => {
    setSelectedRow([])
    setSelectedState({})
  }, [list])

  const cellRender = (
    tdElement: React.ReactElement | null, 
    cellProps: GridCellProps
  ): React.ReactElement | null => {
    if(tdElement === null) return null; // null 체크 추가

    const isDisabled = checkedDisabled;
    if(cellProps.field === SELECTED_FIELD) {
      return React.cloneElement(tdElement, {
        children: React.cloneElement(tdElement.props.children, {
          children: React.cloneElement(tdElement.props.children.props.children, {
          disabled: isDisabled,
          }),
        }),
      });
    }
    return tdElement;
  };

  return (
    <div>
      <Grid
        style={{ maxHeight }}
        rowRender={rowStyles? rowRender : undefined}
        data={
          filter
          ? customFilterBy(
              list?.map((item: any) => ({
                ...item,
                [SELECTED_FIELD]: selectedState[idGetter(item)],
              })),
              filter,
            )
          : list?.map((item) => ({
              ...item,
              [SELECTED_FIELD]: selectedState[idGetter(item)],
            }))
        }
        sortable={
          !sortableGrid
            ? false
            : {
              allowUnsort: unsorted,
              mode: multipleSorting ? "multiple" : "single",
            }
        }
        sort={sort}
        onSortChange={handleSortChange}
        filterable={defaultFilter}
        filter={filter}
        onFilterChange={(event: GridFilterChangeEvent) =>
          setFilter(event.filter)
        }
        resizable={isResizable}
        dataItemKey={checkKey}
        selectedField={SELECTED_FIELD}
        onSelectionChange={onCheckBoxSelectionChangeHandle}
        onHeaderSelectionChange={(event) => onHeaderSelectionChange(event)}
        selectable={{
          enabled: false,
          drag: false,
          cell: false,
          mode: "multiple",
        }}
        reorderable={isReorder}
        //onColumnReorder={isReorder? handleColumnReorder : undefined}
        onRowClick={(event) => {
          rowClick?.(event);
        }}
        key={gridKey}
        cellRender={cellRender}
      >
        {/* noData 또는 로딩중 영역 */}
        <GridNoRecords>
          <CustomNoRecords />
        </GridNoRecords>

        {!nonCheck && 
          <GridColumn
            reorderable={false}
            resizable={false}
            field={SELECTED_FIELD}
            width={60}
            headerCell={headerSelection && !checkedDisabled ? undefined : NonFilterCell}
            headerSelectionValue={
              list?.findIndex(
                (item) => !selectedState[idGetter(item)],
              ) === -1
            }
            filterCell={NonFilterCell}
            orderIndex={0}
            className="txt-center"
          />
        }
        {generateColumns(columns)}
      </Grid>
    </div>
  );
}

export default forwardRef(StationSelectGrid);