import React, { useImperativeHandle, forwardRef, useCallback, useEffect, useState } from "react";
import {
  Grid,
  GridCellProps,
  GridColumn,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";
import { useTranslation } from "react-i18next";
import {
  CommonGridProps,
  GridHeader,
} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import CustomColumnCell from "@/components/kendo/grid/CustomColumnCell.tsx";
import useAlert from "@/hooks/useAlert.tsx";
import _ from 'lodash';


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
  gridData = [],
}: Readonly<CommonGridProps<T>>, ref: any) {
  const { t } = useTranslation("translation");
  const showAlert = useAlert();

  const [columns, setColumns] = useState([])

  useEffect(() => {
    console.log('columnHeader', columnHeader)
    setColumns(columnHeader)
  }, [columnHeader])
  

  useEffect(() => {
    console.log('columns', columns)
  }, [columns])

  useEffect(() => {
    setColumns(columnHeader)
  }, [])

  const generateColumns = (list: any[]) => {
    return list?.map(header => {
      // const cellComponent = (props: GridCellProps) => {
      //   return CustomColumnCell(props, header, cellType, backgroundcolor);
      // }

      if (header.children && header.children.length > 0) {
        return (
          <GridColumn 
            {...header} 
            key={header?.field}
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
          />
        );
      }
    })
  }

  return (
    <Grid
      style={{ width: "100%", height: 400 }}
      resizable = {true}
      data={gridData}
      // detail={DetailComponent}
      // expandField="expanded"
      // onExpandChange={expandChange}
    >
      {/* {generateColumns(columns)} */}
      {
        columns?.map((v, i) => {
          return (
            <GridColumn
              key = {i}
              {...v}
              
            />
          )
        })
      }
    </Grid>
  );
}

export default forwardRef(CommonDataGrid);