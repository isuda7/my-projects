import React, { useImperativeHandle, forwardRef, useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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
  GridColumnReorderEvent,
  GridNoRecords,
  GridRowProps,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";

import { Button } from "@progress/kendo-react-buttons";
import {
  CompositeFilterDescriptor,
  //FilterDescriptor,
  getter,
  SortDescriptor,
} from "@progress/kendo-data-query";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { useTranslation } from "react-i18next";
import {
  CommonGridProps,
  GridHeader,
} from "./interface/GridInterfaces.ts";
import { Page } from "@/utils/apiService/type/common/Page.type.ts";
import CustomDropDownFilter from "@/components/kendo/grid/CustomDropDownFilter.tsx";
import CustomMultiSelectFilter from "@/components/kendo/grid/CustomMultiSelectFilter.tsx";
import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';
import CustomColumnCell from "@/components/kendo/grid/CustomColumnCell.tsx";
import ColumnDropBox from "@/components/kendo/grid/ColumnDropBox.tsx";
import CustomHeaderCell from "@/components/kendo/grid/CustomHeaderCell.tsx";
import { PageChangeEvent, Pager } from '@progress/kendo-react-data-tools';
import {flattenMenu, formatNumber} from "@/utils/common.ts";
import useAlert from "@/hooks/useAlert.tsx";
import _ from 'lodash';
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {menuSelector} from "@/store/modules/userStore.ts";
import {Menu} from "@/utils/apiService/type/auth/menu.type.ts";

function NonFilterCell() {
  return <div />;
}

function CommonDataGrid<T>({
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
  buttonCount = 10,
  sortableGrid = false,
  unsorted = false,
  multipleSorting = false,
  defaultFilter = false,
  isResizable = false,
  isReorder = false,
  //gridData = [],
  displayCount = [10],
  gridWidth = "100%",
  gridHeight = 0,
  isChecked = false,
  checkKey = "id",
  rowClick = (props: GridRowClickEvent | T[] | T) => props,
  rowSelectable = false,
  headerSelection = true,
  girdToolBar = false,
  headerGroup,
  addButton,
  addButtonLabel,
  deleteButton,
  uploadButton,
  downloadButton,
  printButton,
  isFilterResetButton = false,
  isGridResetButton = false,
  isColumnSelectShowButton = false,
  onSearch,
  queryKey = "defaultKey",
  searchParams,
  rowStyles,
  pagination = true,
  gridInfoMessage,
  gridClassName='',
  parentShowHideFlag=false,
  initSelected=[],

  externalData, // New prop for external data
  externalLoading, // New prop for external loading state
  externalFetching, // New prop for external fetching state
  externalRefetch, // New prop for external refetch
  buttonList = [],
  checkedDisabled = false
}: Readonly<CommonGridProps<T>>, ref: any) {
  const path = window.location.pathname;
  const menuList = useSelector(menuSelector);

  const flatMenuList = flattenMenu(menuList);
  const thisMenu = flatMenuList.find((menu: Menu) => menu.url === path);
  const menuGrantType = thisMenu?.grantType;

  addButton = menuGrantType?.find((v: any) => v === 'CREATE') ? addButton : undefined;
  uploadButton = menuGrantType?.find((v: any) => v === 'CREATE') ? uploadButton : undefined;
  deleteButton = menuGrantType?.find((v: any) => v === 'DELETE') ? deleteButton : undefined;

  const queryClient = useQueryClient();
  const { t, i18n, ready } = useTranslation();
  const showAlert = useAlert();


  //외부에서 Data를 넘겨받을경우 useQuery는 동작하지않도록 한다
  const [useInternalQuery, setUseInternalQuery] = useState(queryKey === 'defaultKey'? false : true);
  const internalQuery = useQuery<Page<T>, Error>({
    queryKey: [queryKey],
    queryFn: () => {
      const params = getSearchParams();
      return onSearch(params)
    },
    enabled: useInternalQuery, // false면 자동 실행 비활성화
  });

  const [gridData, setGridData] = useState<Page<T>>({
    content: [],
    paging: undefined,
  })

  const [page, setPage] = useState<{ skip: number, take: number }>({
    skip: 0,
    take: displayCount[0]
  });

  const [sort, setSort] = useState<SortDescriptor[]>([]);

  const [prevFilter, setPrevFilter] = useState<CompositeFilterDescriptor | undefined | any>({
    logic: "and",
    filters: []
  });
  const [filter, setFilter] = useState<CompositeFilterDescriptor | undefined>({
    logic: "and",
    filters: []
  });

  //const [height, setHeight] = useState(gridHeight);
  const [selectedState, setSelectedState] = useState<{[id: string]: boolean | number[]}>({});
  const SELECTED_FIELD = "selected";
  const idGetter = getter(checkKey);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [initShowColumns, setInitShowColumns] = useState<boolean>(false);
  const [isShowColumnDropDownOpen, setIsShowColumnDropDownOpen] = useState<boolean>(false);
  const [columns, setColumns] = useState<GridHeader[]>(columnHeader);
  //그리드의 key값을 변경해 순서변경시 그리드 재랜더링을 하기위해 랜덤 숫자 세팅, key + 1씩 하면서 grid의 key값 변경
  const randomNumber = Math.floor(Math.random() * 9000000) + 1000000;
  const [gridKey, setGridKey] = useState<number>(randomNumber)

  useEffect(() => {
    setColumns(columnHeader)
  }, [columnHeader])


  useEffect(() => {
    if(externalData) setGridData(externalData)
    if(internalQuery.data) {
      setGridData(internalQuery.data);
    }
      
  }, [internalQuery.data, externalData])

  const isLoading = useInternalQuery ? internalQuery.isLoading : externalLoading;
  const isFetching = useInternalQuery ? internalQuery.isFetching : externalFetching;

  const refetch = useCallback(() => {
    if (useInternalQuery) {
      internalQuery.refetch();
    } 
    else if (externalRefetch) {
      externalRefetch();
    }
  }, [useInternalQuery, externalRefetch]);

  /**
   * 조회시 보낼 params를 정리해 하나의 object로 합침
   * @returns 
   */
  const getSearchParams = () => {
    const params: any = {};

    //페이징 조건 추가
    if(pagination) {
      params.page = (page.skip / page.take) + 1;
      params.size = page.take;
    }
    
    //필터링 조건 추가
    if (filter && filter?.filters.length > 0) {
      console.log('filter', filter)
      const filters: any[] = filter?.filters;
      for (let i = 0; i < filters.length; i++) {
        if(filters[i].value || typeof filters[i].value === 'boolean') {
          const column = columnHeader.flatMap(v =>
            v.children ? v.children : v
          ).find(col => col.field === filters[i].field);

          const searchKey = column && column.searchkey ? column.searchkey : filters[i].field;
          const searchType = column && column.searchType ? column.searchType : '';

          if (params[searchKey] && searchType == "array") {
            if (Array.isArray(params[searchKey])) {
              params[searchKey].push(filters[i].value);
            } else {
              params[searchKey] = [params[searchKey], filters[i].value];
            }
          } else {
            params[searchKey] = filters[i].value;
          }
        }
      }
    }

    //Sorting 조건 추가
    if (sort && sort.length > 0) {
      const sortParams: any[] = [];
      sort.map(v => sortParams.push(`${v.field},${v.dir}`))
      // const sortParams = sort.map(desc => 
      //   `${desc.field},${desc.dir}`
      // ).join('&sort=');
      params.sort = sortParams;
    }

    //조회조건(Search Box) 조건 추가
    if (searchParams && !searchParams?.allFlag) {
      for (let key in searchParams) {
        if(key === 'allFlag') continue;
        let searchValue = searchParams[key];
        if (isDateObject(searchParams[key])) {
          searchValue = dayjs(searchValue).format('YYYY-MM-DD HH:mm:ss')
        }
        params[key] = searchValue
      }
    }
    setSelectedRow([])
    setSelectedState({})
    return params;
  }

  function isDateObject(value: any) {
    // 값이 Date 객체인지 확인
    return value instanceof Date && !isNaN(value.getTime());
  }

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
    return gridData.content;
  }

  const onDownload = () => {
      const params = getSearchParams();
      console.log('params', params);
      return downloadButton ? downloadButton(params) : null;
  }

  const delMutation = useMutation({
    mutationFn: async (deleteArray) => {
      if(deleteButton) deleteButton(deleteArray)
    },
    onSuccess: (response) => {
      console.log('onSuccess response', response)
      //setOpenModal(false);
      //showNotification({ message: "삭제가 완료되었습니다." })
      refetch();
    },
    onError: (responseError) => {
      console.error(responseError);
    },
  });

  useImperativeHandle(ref, () => ({
    refetchGrid: () => refetch(),
    getSearchParams: () => getSearchParams(),
    getSeletedDataItems: () => getSeletedDataItems(),
    getAllDataItems: () => getAllDataItems()
  }))

  useEffect(() => {
    refetch();
  }, [page, sort]);

  const displayCountChange = (event: DropDownListChangeEvent) => {
    setPage({ skip: 0, take: event.target.value })
  }

  const handlePageChange = (event: PageChangeEvent) => {
    setPage({ skip: event.skip, take: event.take })
  };

  const handleSortChange = (event: GridSortChangeEvent) => {
    //console.log('handleSortChange event', event)
    setSort(event.sort);
  };

  const getProcessFilter = (event: GridFilterChangeEvent) => {
    
    //STEP1. 현재 어떤필드가 변경이된건지 찾음,
    let filterField = '';
    const currentFilters = event.filter.filters;
    currentFilters.forEach((currentFilter: any, index: number) => {
      const prev = prevFilter.filters.find((f: any) => f.field === currentFilter.field);
      if ((prev?.value && prev.value !== currentFilter.value) && !currentFilter.value) {
        filterField = currentFilter.field;
      }
    });
    //STEP2. 해당 필드에 연관된 자식필드 목록이 존재하는지 찾음, 존재하면 값 넣어줌
    let childFilterFields: any = undefined;
    if(filterField) {
      columnHeader.forEach(v => {
        if(v.children) {
          v.children.forEach(w => {
            if(w.field === filterField && w.childFilterFields) childFilterFields = w.childFilterFields; 
          })
        }
        else {
          if(v.field === filterField && v.childFilterFields) childFilterFields = v.childFilterFields; 
        }
      })
    }

    //STEP3. 연관된 자식 필드가 존재한다면 해당 자식필드의 필터값도 제거하고 리턴함
    let processFilters;
    if(childFilterFields) {
      processFilters = currentFilters.filter((v: any) => !childFilterFields.includes(v.field))
    }

    return processFilters;
  }

  const handleFilterChange = (event: GridFilterChangeEvent) => {
    const processFilters = getProcessFilter(event);
    if(processFilters) event.filter.filters = processFilters;
    setFilter(event.filter);
  };

  /**
   * Select Filter의 경우 filter가 변경되는 즉시 재조회(refetch)를 해야하기떄문에 
   * filter가 변경되는 시점에 select필터가 변경되었는지 판단함
   * @param changeFilter 
   * @returns 
   */
  const getSelectFilterChangeFlag = (changeFilter:any[]) => {
    let returnFlag = false;
    //const selectFilterColumns = columns.filter(v => (v.filterType === 'select' || v.filterType === 'multiSelect'))
    const selectFilterColumns = columns.flatMap(v => 
      v.children ? v.children : v
    ).filter(v => v.filterType === 'select' || v.filterType === 'multiSelect');

    selectFilterColumns.map((v,i) => {
      const changeObj = changeFilter?.find(w => w.field === v.field)
      if(changeObj) {
        const prevObj = prevFilter?.filters?.find((x:any) => x.field === v.field)
        if(prevObj?.value !== changeObj?.value) returnFlag = true;
      }
    })
    return returnFlag;
  }

  //select Filter 변경여부 조회, select Filter 변경되면 재조회(refetch)
  useEffect(() => {
    if(getSelectFilterChangeFlag(filter?.filters ?? [])) refetch();
    setPrevFilter(filter)
  }, [filter])

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
  // const determineColumnMenu = (
  //   header: GridHeader,
  // ): React.FunctionComponent<GridColumnMenuProps> | undefined => {
  //   if (
  //     defaultFilter &&
  //     header.filterable &&
  //     header.filterType === "checkbox"
  //   ) {
  //     const fieldValues:any = data?.content;
  //     return (props: GridColumnMenuCheckboxFilterProps | GridColumnMenuProps) =>
  //       CheckBoxFilterCell({ ...props, data: fieldValues });
  //   }
  //   return undefined;
  // };

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
          search();
          // 현재 포커스를 제거합니다.
          (event.target as HTMLInputElement).blur();
        }
      }

      const search = () => {
        refetch();
      }
  
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
            onClick={search}
          >
            <i className="icon icon-glass"></i>
          </Button>
        </div>
      )
    }
    return null;
  }, [columnHeader]);

  const clearFilters = () => {
    setFilter({
      logic: "and",
      filters: []
    });
    setSort([]);
  };

  const resetColumns = () => {
    setInitShowColumns(!initShowColumns);
    setIsShowColumnDropDownOpen(false);
  };

  // const gridStyles = {
  //   transition: "all 200ms ease 0s",
  // };

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
      setSelectedRow([...selectedRow, { ...event.endDataItem, selected: true }]);

      const newSelectedState = getSelectedState({
        event,
        selectedState,
        dataItemKey: checkKey,
      });
      setSelectedState(newSelectedState);

      /** TODO 필요한가 이부분? 분석 필요 */
      rowClick?.(event.dataItems[event.startRowIndex]);
      const filteredColumnHeaders = columnHeader.filter(
        (header) => header.show !== false,
      );

      const cellClick = filteredColumnHeaders[event.startColIndex]?.cellClick;

      if (typeof cellClick === "function") {
        cellClick(event, event.dataItem);
      }
      /** TODO */

    },
    [selectedRow, selectedState],
  );

  const requestDeleteMutate = () => {
    if(selectedRow && selectedRow.length > 0) {
      const deleteArray:any = selectedRow.map(v => v[checkKey as keyof string])
      console.log('deleteArray', deleteArray)
      delMutation.mutate(deleteArray);
    } 
  }

  const onDelete = () => {
    if(selectedRow.length === 0) {
      //선택된 데이터가 없습니다.
      showAlert({message: t('common.no_select_results')})
      return;
    }

    showAlert({
      title: t("common.delete"), //'삭제'
      message: t("common.delete_confirm"), //'삭제하시겠습니까?'
      type: 'confirm',
      onConfirm: requestDeleteMutate,
    })
  }

  const handleColumnReorder = (reorderEvent : GridColumnReorderEvent) => {
    //TODO 필요할지 의문
  }

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

  /* 그리드 사라지면 그리드 캐시데이터 삭제 */
  useEffect(() => {
    return () => queryClient.removeQueries()
  }, [queryClient])

  /**
   * 초기 선택값(initSelected)이 있을경우 화면을 열때, 페이지를 옮길때 자동 selected세팅
   */
  useEffect(() => {
    if((gridData && gridData.content && gridData.content.length > 0) && (initSelected && initSelected.length > 0) && sortableGrid) {
      const content = gridData.content;
      const newSelectedRow: any[] = content.filter((v:any) => initSelected.includes(v[checkKey]))
      if(newSelectedRow.length > 0) {
        setSelectedRow(newSelectedRow)
        const newState: any = {};
        newSelectedRow.forEach((v:any) => (newState[v[checkKey]] = true));
        setSelectedState(newState);
      }
    }
  }, [gridData])

  /**
   * 데이터 존재하지않을때 그리드 화면에 표현해주는 JSX
   * @returns 
   */
  const CustomNoRecords = () => {
    //로딩중
    if(isLoading || isFetching) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      // 검색된 데이터가 없습니다.
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

  const cellRender = (
    tdElement: React.ReactElement | null, 
    cellProps: GridCellProps
  ): React.ReactElement | null => {
    if(tdElement === null) return null; // null 체크 추가

    const isDisabled = checkedDisabled;
    if(isChecked && cellProps.field === SELECTED_FIELD) {
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

  if(!ready) return <></>

  return (
    <section className="section">
      <div style={{ width: gridWidth }}>
        <div>
          {headerGroup}
          {girdToolBar && (
            <div className="sort-group">
              <div className="sort-group__counter">
                <span className="total">
                  {t('grid.total_items', {number: gridData?.paging?.totalElements? formatNumber(gridData?.paging?.totalElements) : 0})}
                  {/* `총 ${gridData?.paging?.totalElements || 0} 건` */}
                </span>
                {
                  pagination && (
                    <span className="sort">
                      <DropDownList
                        style={
                          { minWidth: i18n.language === 'ko'? "150px" : "180px" }
                        }
                        data={displayCount}
                        defaultValue={displayCount && displayCount[0] || 10}
                        onChange={(event) => {
                          displayCountChange(event);
                        }}
                      />
                    </span>
                  )
                }
              </div>
                
                {/* {showUpdateTime && (
                  <span className="date">
                    {t("grid.update-time")} {getCurrentDate()}
                  </span>
                )} */}

              <div className="sort-group__btns">
                {isFilterResetButton && (
                  <Button type="button" themeColor="info" onClick={clearFilters}>
                    <i 
                      className="icon icon-filter" 
                      title={t('common.filter_reset')} //필터 초기화
                    />
                  </Button>
                )}
                {isGridResetButton && (
                  <Button type="button" themeColor="info" title="Reset Table Layout" onClick={resetColumns}>
                    <i 
                      className="icon icon-tbl-layout" 
                      title={t('common.column_reset')} //컬럼 초기화  
                    />
                  </Button>
                )}
                {isColumnSelectShowButton && (
                  <ColumnDropBox
                    list={columns}
                    setList={setColumns}
                    initColumns={initShowColumns}
                    isDropMenuOpen={isShowColumnDropDownOpen}
                    setIsDropMenuOpen={setIsShowColumnDropDownOpen}
                    defaultColumn = {columnHeader}
                    parentShowHideFlag={parentShowHideFlag}
                  />
                )}
                {downloadButton && (
                  <Button 
                  //null | 'base' | 'primary' | 'secondary' | 'tertiary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light' | 'inverse';
                  themeColor="info"
                  //className="k-ml-5 min-w70"
                  onClick={onDownload}
                  type="button"
                  >
                    <i 
                      className="icon icon-download" 
                      title={t('common.excel_download')} //엑셀 다운로드
                    />
                  </Button>
                )}
                {
                  printButton && (
                    <Button 
                      type="button"
                      themeColor={"info"}
                      title={t('common.print_title')} //인쇄하기
                      onClick={printButton}  
                    >
                      <i className="icon icon-print"></i>
                    </Button>
                  )
                }
                {gridInfoMessage && 
                  <div className="sort-group__txt">
                    {typeof gridInfoMessage === 'function'? gridInfoMessage(): gridInfoMessage}
                  </div>
                }
              </div>
              <div className="group-align-right gap0.38">
                {
                  (buttonList && buttonList.length > 0) &&
                    buttonList.map((v, i) => {
                      return (
                        <React.Fragment key={`bottom-button-list-${i}`}>{v}</React.Fragment>
                      )
                    })
                }
                {
                  uploadButton && (
                    <Button
                      size={"medium"}
                      fillMode="outline"
                      themeColor={"light"}
                      className="btn-in-icon"
                      onClick={uploadButton}
                    >
                      {/* 엑셀 업로드  */}
                      {t('common.excel_upload')}
                      <i className="icon icon-excel"></i>
                    </Button>
                  )
                }
                {deleteButton && (
                  <Button
                    size="medium"
                    className="k-ml-5 min-w70"
                    type="button"
                    onClick={onDelete}
                  >
                    {t("grid.delete-button")}
                  </Button>
                )}
                {addButton && (
                  <Button
                    size={"medium"}
                    themeColor={"primary"}
                    className="btn-in-icon"
                    type="button"
                    onClick={addButton}
                  >
                    {addButtonLabel? addButtonLabel : t("grid.add-button")}
                    <i className="icon icon-new-add"></i>
                  </Button>
                )}
              </div>
            </div>
          )}
          <div className={gridClassName? gridClassName : "grid-row-3"}>
          <Grid
            style={{ width: "100%", height: gridHeight }}
            rowRender={rowStyles? rowRender : undefined}
            data={
              isLoading || isFetching
              ? []
              : gridData?.content?.map((item) => ({
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
            filterable={defaultFilter}
            filter={filter}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
            resizable={isResizable}
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

            {isChecked && (
              <GridColumn
                //locked
                reorderable={false}
                resizable={false}
                field={SELECTED_FIELD}
                width={60}
                headerCell={headerSelection && !checkedDisabled ? undefined : NonFilterCell}
                headerSelectionValue={
                  gridData?.content?.findIndex(
                    (item) => !selectedState[idGetter(item)],
                  ) === -1
                }
                filterCell={NonFilterCell}
                orderIndex={0}
                className="txt-center"
              />
            )}
            {generateColumns(columns)}
          </Grid>
          {
            pagination && 
            <Pager
              skip={page.skip}
              take={page.take}
              total={gridData?.paging?.totalElements || 0}
              buttonCount={buttonCount}
              type="numeric"
              previousNext
              onPageChange={handlePageChange}
              info={false}
            />
          }
          </div>
        </div>
      </div>
    </section>
  );
}

export default forwardRef(CommonDataGrid);