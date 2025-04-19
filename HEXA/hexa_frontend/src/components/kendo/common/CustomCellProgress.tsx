import { ProgressBar } from "@progress/kendo-react-progressbars";
import { GridCustomCellProps } from "@progress/kendo-react-grid";

export default function CustomCellProgress(props: GridCustomCellProps) {
  const { dataItem, tdProps } = props;
  const Progress = dataItem.progress;
  return (
    <td {...tdProps}>
      <div className="progress-custom">
        <span className="progress-info">1.Basic Info</span>
        <ProgressBar
          className="progress-bar"
          value={Progress}
          labelVisible={false}
        />
        <span className="progress-txt">{Progress} %</span>
      </div>
    </td>
  );
}
