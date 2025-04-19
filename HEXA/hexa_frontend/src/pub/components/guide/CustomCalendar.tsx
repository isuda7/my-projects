import {
  MultiViewCalendar,
  MultiViewCalendarProps,
} from "@progress/kendo-react-dateinputs";

export const CustomCalendar = (props: MultiViewCalendarProps) => {
  return <MultiViewCalendar {...props} views={1} />;
};
