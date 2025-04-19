import {GridCellProps} from "@progress/kendo-react-grid";
import {getFormattedTime} from "@/utils/common.ts";
import {useTranslation} from "react-i18next";

const CustomPeriodCell = (props: GridCellProps) => {

    const { t } = useTranslation();
    
    const { dataItem } = props;

    const period = () => {
        const postStartDate = dataItem.postStartDate || "";
        const postEndDate = dataItem.postEndDate || "";

        let CellContent;

        if (postStartDate && postEndDate) {
            const sDate = getFormattedTime(postStartDate, t('format.date-uppercase'))
            const sTime = getFormattedTime(postStartDate, t('format.time'))
            const eDate = getFormattedTime(postEndDate, t('format.date-uppercase'))
            const eTime = getFormattedTime(postEndDate, t('format.time'))
            CellContent = (
                <>
                    <span className="cell-date">{sDate}</span>
                    <span className="cell-time">{sTime}</span>
                    <span> ~ </span>
                    <span className="cell-date">{eDate}</span>
                    <span className="cell-time">{eTime}</span>
                </>
            )
        } else {
            CellContent = `${postStartDate} ~ ${postEndDate}`;
        }
        return CellContent
    };

    return (
        <>{period()}</>
    )
}

export default CustomPeriodCell;