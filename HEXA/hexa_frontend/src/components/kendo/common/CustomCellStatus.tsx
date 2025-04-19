import { GridCustomCellProps } from "@progress/kendo-react-grid";

export default function CustomCellStatus(props: GridCustomCellProps) {
  const { children, tdProps } = props;
  return (
    <td {...tdProps}>
      <span className={`round color-${children}`} />
      {children}
    </td>
  );
}
