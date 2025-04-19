import { GridCellProps, GridCustomCellProps } from "@progress/kendo-react-grid";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CustomCellTitle = (props: any) => {
  const { t } = useTranslation();
  const { dataItem } = props;

  const isPinned = dataItem.isPinned == 1 ? true : false; 
  const fileShow = dataItem.noticeFileCount > 0 ? true : false;

  const onClick = () => {
    props.onClick(dataItem);
  }

  return (
      <div className="notice-title">
        {isPinned && <span className="notice-lock">{t('board.fixed')}</span>}
        <span onClick={onClick} style={{ textDecoration: 'underline', cursor:'pointer'}}>{ dataItem.title }</span>
        {fileShow && <i className="icon ico-files"></i>}
      </div>
    );
};

export default CustomCellTitle;