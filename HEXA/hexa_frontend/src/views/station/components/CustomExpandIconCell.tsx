import { useEffect, useRef } from "react";
import { GridCellProps } from "@progress/kendo-react-grid";

interface CustomGridCellProps extends GridCellProps {
  onClick?: (arg1: any, arg2: CustomGridCellProps) => void;
}

const CustomExpandIconCell = ( props: CustomGridCellProps ) => {

  const {field = '', dataItem, onClick} = props;

  const renderIcon = () => {
    if (dataItem[field] === true) {
      return <button type="button" className={`type-plus`} onClick={(e) => onClick?.(e, props)}/>
    } 
    else if (dataItem[field] === false) {
      return <button type="button" className={`type-Minus`} onClick={(e) => onClick?.(e, props)}/>
    }
    return null;
  };

  return (
    <>{renderIcon()}</>
  )
}

export default CustomExpandIconCell;
