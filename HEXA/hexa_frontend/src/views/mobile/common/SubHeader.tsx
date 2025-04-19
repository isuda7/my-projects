import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import {station_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";

export default function SubHeader(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { title, status } = props;

  // const status = station?.disconnectionCnt !== 0 ? 'DISCONNECTION' : station.stationStatus;
  // setTitle(t(`dashboard.bss-status.${status}`));
  // setTitleClass(`tit-state-${station_status[status]}`);

  // <h1 className="m-title">
  // GS25 강남점 <span className="tit-state-normal">정상</span>
  // {/* 
  //     <span className="tit-state-normal">정상</span>
  //     <span className="tit-state-disconnection">통신단절</span>
  //     <span className="tit-state-lock">전체잠금</span>
  //     <span className="tit-state-unable">교환불가</span>
  //     <span className="tit-state-error">오류발생</span> 
  //     <span className="tit-state-reset">초기화중</span> 
  //     */}
  // </h1>

  return (
    <header className="m-header">
      <div className="m-prev">
        <Button 
          size={"small"} 
          fillMode="flat"
          onClick={() => navigate(-1)}  
        >
          <span className="sr-only">이전화면으로 이동</span>
        </Button>
      </div>

      <h1 className="m-title">
        {title}
        {
          status && 
          <span className={`tit-state-${station_status[status]}`}>{t(`dashboard.bss-status.${status}`)}</span>
          //<span className={`tit-state-${classNameKey}`}>{statusName}</span>
        }
      </h1>
    </header>
  );
}
