import {
  GRID_COL_INDEX_ATTRIBUTE,
  GridCellProps,
} from "@progress/kendo-react-grid";
import styled from "styled-components";
import { GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { getFormattedTime, formatNumber, formatPhoneNumber } from "@/utils/common"
import { useTranslation } from "react-i18next";

function CustomColumnCell(
  event: GridCellProps,
  column: GridHeader,
  cellType: string,
  backgroundcolor: string,
) {
  const { t } = useTranslation();
  const { field, dataItem, isSelected, columnIndex, style, className } = event;
  if (!field) return null;

  const rowSpanColumn = column?.isRowSpan? column : undefined;
  
  const dataValue = dataItem[field];
  let displayValue: any;

  if (typeof dataValue === "boolean") {
    displayValue = dataValue ? "Y" : "N";
    if(column.cellTypeProps) displayValue = dataValue ? column.cellTypeProps.trueValue : column.cellTypeProps.falseValue; //TODO : 추후 방식 변경할지 체크
  } else {
    displayValue = dataValue;
  }
  
  if(cellType === 'date') {
    const format = t('format.date-uppercase');
    displayValue = getFormattedTime(displayValue, format)
  }
  else if(cellType === 'number') {
    displayValue = formatNumber(Number(displayValue), column?.cellTypeProps)
  }
  else if(cellType === 'select') {
    if(column?.selectData) {
      displayValue = column?.selectData?.find(v => v.code === displayValue)?.value || displayValue;
    }
  }
  else if(cellType === 'phone') {
    displayValue = formatPhoneNumber(displayValue);
  }

  /**
   * 조건에따른 className 추가
   */
  const defaultClassName = 'k-table-td'
  let customClassName = className? defaultClassName + ' ' + className : defaultClassName;
  if(isSelected) customClassName += " k-state-selected";

  //column에 cellClick값이 있을경우 link 자동으로 넣어줌
  let cellTypeProps = {};
  if(column?.cellTypeProps) {
    cellTypeProps = column?.cellTypeProps
  }
  else if(column?.cellClick) {
    cellTypeProps = { link: true }
  }

  const cellProps = {
    className: customClassName,
    'aria-selected': isSelected,
    [GRID_COL_INDEX_ATTRIBUTE]: columnIndex,
    onClick: (e: React.MouseEvent) => {
      column?.cellClick?.(e, dataItem);
    },
    textalign: column?.align ?? "left",
    cellType,
    backgroundcolor,
    //locked: column?.locked,
    style,
    cellTypeProps,
  };

  let CellContent = undefined;
  if (column?.cell) {
    CellContent = typeof column.cell === 'function'
    ? column.cell(event)
    : column.cell
  }

  if(cellType === 'dateTime') {
    if(displayValue) {
      const date = getFormattedTime(displayValue, t('format.date-uppercase'))
      const time = getFormattedTime(displayValue, t('format.time'))
      CellContent = (
        <>
          <span className="cell-date">{date}</span>
          <span className="cell-time">{time}</span>
        </>
      )
    }
    else {
      CellContent = (<>{getFormattedTime(displayValue)}</>)
    }
  }

  if (field === rowSpanColumn?.field) {
    if (dataItem[`${rowSpanColumn?.field}RowSpan`]) {
      return (
        <StyledTd
          {...cellProps}
          rowSpan={dataItem[`${rowSpanColumn?.field}RowSpan`]}
        >
          {CellContent? CellContent : typeof displayValue !== 'object'? displayValue : <></>}
        </StyledTd>
      );
    }
    return null;
  }

  // if (column?.cell) {
  //   const CellContent = typeof column.cell === 'function'
  //   ? column.cell(event)
  //   : column.cell
  //   return (
  //     <StyledTd {...cellProps}>
  //       {CellContent}
  //     </StyledTd>
  //   )
  // }

  return (
    field && (
      <StyledTd {...cellProps}> 
        {CellContent? CellContent : typeof displayValue !== 'object'? displayValue : <></>}
      </StyledTd>
    )
  );
}

export default CustomColumnCell;

const StyledTd = styled.td.withConfig({
  //td의 속성으로 넘어가는 몇몇값들을 막아줌
  shouldForwardProp: (prop) => prop !== 'cellType' && prop !== 'cellTypeProps',
})<{
  textalign: string;
  cellType: string;
  backgroundcolor: string;
  cellTypeProps?: any;
}>`
  text-align: ${(props) => props.textalign} !important;
  text-decoration: ${(props) =>
    props.cellTypeProps?.link? "underline" : "none"};
  background-color: ${(props) => props.backgroundcolor};
  cursor: ${(props) => (props.cellTypeProps?.link? "pointer" : "default")};
  `;
  // white-space: nowrap; /* Prevent text wrapping if needed */
  // overflow: hidden; /* Ensure no content overflows the cell */
  // /* Add this if you want to force fixed layout */
  // width: 100%;
