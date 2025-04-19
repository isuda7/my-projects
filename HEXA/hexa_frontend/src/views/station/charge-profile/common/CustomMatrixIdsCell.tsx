/**
 * 충전 프로파일 조건 NO 리스트 셀 Component
 */

import { useTranslation } from "react-i18next";
import { GridCellProps } from "@progress/kendo-react-grid";

const CustomMatrixIdsCell = ( props: GridCellProps ) => {
  const { t } = useTranslation();

  const {field = '', dataItem } = props;
  const list = dataItem[field];

  if(list && list.length > 0) {
    return <span>{list.join(',')}</span>
  }
  else {
    //"매핑없음"
    return <span className={`c-red`}>{t('station.no_mapping')}</span>
  }
}

export default CustomMatrixIdsCell;
