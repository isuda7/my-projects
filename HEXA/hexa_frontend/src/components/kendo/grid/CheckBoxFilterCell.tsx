import {
  GridColumnMenuCheckboxFilter,
  GridColumnMenuCheckboxFilterProps,
} from "@progress/kendo-react-grid";

function CheckBoxFilterCell(
  props: Readonly<GridColumnMenuCheckboxFilterProps>,
) {
  return <GridColumnMenuCheckboxFilter {...props} expanded />;
}

export default CheckBoxFilterCell;
