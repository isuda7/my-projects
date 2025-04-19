import { useTranslation } from "react-i18next";
import { getFormattedTime } from "@/utils/common";


export default function BasicDateTime(props: any) {
  const { t } = useTranslation();
  const { value } = props;

  if(!value) return null;

  const date = getFormattedTime(value, t('format.date-uppercase'))
  const time = getFormattedTime(value, t('format.time'))

	return (
		<>
      <span className="cell-date">{date}</span>
      <span className="cell-time">{time}</span>
		</>
	);
}
