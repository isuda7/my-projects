/**
 * 충전 프로파일 조건 NO 리스트 툴팁 셀 Component
 */

import { useTranslation } from "react-i18next";
import { GridCellProps } from "@progress/kendo-react-grid";

// 툴팁 위치
const fnHover = (e: any) => {
  const topPosOffset = e.target.getBoundingClientRect();
  const child = e.target.querySelector(".tooltiptext") as HTMLElement;
  child.style.top = topPosOffset.top + 0 + "px";
  child.style.left = topPosOffset.left + topPosOffset.width + 10 + "px";
};

const CustomTooltipCell = ( props: GridCellProps ) => {
  const { t } = useTranslation();
  const {field = '', dataItem } = props;

  const array = dataItem[field];
  const wordlist = array.map((item: any, i: any) => <p key={i}>{`${item.profileNo} (${item.condition})`}</p>);

  return (
    <a className="underline tooltip" onMouseEnter={fnHover}>
      {
        array? 
        array.length === 1?
        <span>{array[0].profileNo}</span> 
        :
        <span>
          {/* {array[0].profileNo} 외 {array.length - 1} 건*/}
          {t("station.additional_items_count", {
            string: array[0].profileNo,
            index: array.length - 1
          })}
        </span>
        :
        <></>
      }
      <div className="tooltiptext">{wordlist}</div>
    </a>
  );
}

export default CustomTooltipCell;
