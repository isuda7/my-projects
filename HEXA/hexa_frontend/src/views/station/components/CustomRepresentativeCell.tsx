import { useEffect, useRef } from "react";
import { GridCellProps } from "@progress/kendo-react-grid";

const CustomRepresentativeCell = ( props: GridCellProps ) => {

  const {field = '', dataItem } = props;
  const value = dataItem[field] === true? 'Yes' : 'No';

  const renderIcon = () => {
    return <span className={`type-${value}`}> {value} </span>
  };

  return (
    <>{renderIcon()}</>
  )
}

export default CustomRepresentativeCell;
