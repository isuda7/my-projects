import React from 'react';
import {
  GridColumnMenuWrapper,
  GridHeaderCellProps,
} from "@progress/kendo-react-grid";

function CustomHeaderCell(
  props: Readonly<GridHeaderCellProps>,
  textAlign?: string | undefined,
) {
  const renderMultiLineTitle = (title: string) => {
    return title.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < title.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <>
      <span onClick={props.onClick} className="k-cell-inner">
        <span
          className="k-link !k-cursor-default"
          style={{
            justifyContent: textAlign || 'center',
            cursor: props.columnMenuWrapperProps.sortable
              ? "pointer"
              : "default",
          }}
        >
          <span className="k-column-title">
            {renderMultiLineTitle(props.title || '')}
          </span> {props.children}
        </span>
      </span>
      {/* {props.columnMenuWrapperProps.columnMenu && (
        <GridColumnMenuWrapper {...props.columnMenuWrapperProps} />
      )} */}
    </>
  );
}

export default CustomHeaderCell;
