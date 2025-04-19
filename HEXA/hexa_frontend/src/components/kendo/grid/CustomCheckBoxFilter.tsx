import "@progress/kendo-theme-default/dist/all.css";
import {
  GridColumnMenuCheckboxFilter,
  GridColumnMenuCheckboxFilterProps,
} from "@progress/kendo-react-grid";

function CustomCheckBoxFilter(
  props: Readonly<GridColumnMenuCheckboxFilterProps>,
) {
  return <GridColumnMenuCheckboxFilter {...props} expanded />;
}

export default CustomCheckBoxFilter;
