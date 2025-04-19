/**
 * 펌웨어 배포 관리 - 펌웨어 컬럼 툴팁 Component
 * URL: /station/firmware/deploy/add
 * URL: /station/firmware/deploy/detail
 */

import { useTranslation } from "react-i18next";
import { GridCellProps } from "@progress/kendo-react-grid";

const CustomFirmwareListCell = ( props: GridCellProps ) => {
  const {t} = useTranslation();

  const {field = '', dataItem } = props;
  const list = dataItem[field];

  // 툴팁 위치
  const fnHover = (e: any) => {
    const topPosOffset = e.target.getBoundingClientRect();
    const child = e.target.querySelector(".tooltiptext") as HTMLElement;
    child.style.top = topPosOffset.top + 0 + "px";
    child.style.left = topPosOffset.left + topPosOffset.width + 10 + "px";
  };

  const wordlist = list.map((item: any, i: any) => <p key={i}>{item.fwTypeName? item.fwTypeName : ''}</p>);
  return (
    <>
      <a className="underline tooltip" onMouseEnter={fnHover}>
        {list.length === 1 ? (
          <span>{list[0].fwTypeName}</span>
        ) : (
          <span>
            {/* {{string}} 외 {{index}} 건 */}
            {
              t('station.additional_items_count', 
              {string: list[0].fwTypeName, index: list.length - 1})
            }
            {/* list[0].fwTypeName} 외 {list.length - 1} 건{" " */}
          </span>
        )}
        <div className="tooltiptext">{wordlist}</div>
      </a>
    </>
  );
}

export default CustomFirmwareListCell;
