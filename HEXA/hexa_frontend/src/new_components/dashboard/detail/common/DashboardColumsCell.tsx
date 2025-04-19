import React from "react";

const CustomCellTextColor = (props: any) => {
  const textColor = () => {
    if (props.children === "-1") {
      return "c-red";
    }
  };
  const text = () => {
    let text = "";
    switch (props.children) {
      case "-1":
        text = "Fail";
        break;
      case "0":
        text = "OFF";
        break;
      case "1":
        text = "ON";
        break;
    }
    return text;
  };

  return (
    <td colSpan={1} className="k-table-td txt-center">
      <span className={`${textColor()}`}>{text()}</span>
    </td>
  );
};

const CustomCellOnOffState = (props: any) => {
  return (
    <td colSpan={1} className="k-table-td txt-center">
      <span>{props.children == 0 ? 'OFF' : 'ON'}</span>
    </td>
  );
};
const CustomCellOnOffStateInBat = (props: any) => {
  console.log('aaaaaaaaaa',props)
  return (
      <td colSpan={1} className="k-table-td txt-center">
        <span>{props.dataItem.slotInBat ? (props.children == 0 ? 'OFF' : 'ON') : '-'}</span>
      </td>
  );
};

const CustomCellComState = (props: any) => {
  return (
    <td colSpan={1} className="k-table-td txt-center">
      <span>{props.children == 0 ? 'Offline' : 'Online'}</span>
    </td>
  );
};
const CustomCellDoorState = (props: any) => {
  return (
    <td colSpan={1} className="k-table-td txt-center">
      <span>{props.children == 0 ? 'Close' : 'Open'}</span>
    </td>
  );
};

const CustomCellOXState = (props: any) => {
  return (
    <td colSpan={1} className="k-table-td txt-center">
      <span>{props.children == 0 ? 'X' : 'O'}</span>
    </td>
  );
};
const CustomCellXOState = (props: any) => {
  return (
      <td colSpan={1} className="k-table-td txt-center">
        <span>{props.children == 0 ? 'O' : 'X'}</span>
      </td>
  );
};

export {
  CustomCellTextColor,
  CustomCellOnOffState,
  CustomCellComState,
  CustomCellDoorState,
  CustomCellOXState,
  CustomCellXOState,
  CustomCellOnOffStateInBat


}