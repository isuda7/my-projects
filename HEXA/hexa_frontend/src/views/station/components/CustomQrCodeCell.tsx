import { useEffect, useRef } from "react";
import { GridCellProps } from "@progress/kendo-react-grid";

const CustomQrCodeCell = ( props: GridCellProps ) => {

  const {field = '', dataItem } = props;
  const value = dataItem[field];

  const renderIcon = () => {
    return (
      <img
        src={`data:image/png;base64,${value}`}
        alt="QR Code"
        width={30}
        height={30}
      />
    )
  };

  return (
    <>{renderIcon()}</>
  )
}

export default CustomQrCodeCell;
