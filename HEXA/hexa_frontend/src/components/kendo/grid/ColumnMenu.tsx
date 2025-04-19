import {
  GridColumnMenuFilter,
  GridColumnMenuProps,
  GridColumnMenuSort,
} from "@progress/kendo-react-grid";

function ColumnMenu(props: Readonly<GridColumnMenuProps>) {
  return (
    <div>
      <GridColumnMenuSort {...props} />
      <GridColumnMenuFilter {...props} expanded />
    </div>
  );
}

export default ColumnMenu;
