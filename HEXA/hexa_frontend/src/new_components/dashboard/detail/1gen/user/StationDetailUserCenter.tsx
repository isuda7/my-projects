import * as React from "react";
import {StationChassis, StationSlot} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {led_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";
import {RecommendBtry} from "@/views/dashboard/detail/2gen/DashboardStationDetailUser.tsx";

interface Props {
  stationSlotList: StationSlot[];
  setSelectSlotNo: React.Dispatch<React.SetStateAction<number>>;
}

const StationDetailUserCenter = ({stationSlotList, setSelectSlotNo}: Props) => {
  const {t} = useTranslation();

  const onClickSlot = (event: React.MouseEvent<HTMLDivElement>, slot: StationSlot) => {
    const target = event.currentTarget as HTMLElement;

    document.querySelectorAll('.box-slot').forEach(el => el.classList.remove('is-active'));
    target.classList.add("is-active");

    setSelectSlotNo(slot.slotNum)
  }

  const slotHtml = (slot: StationSlot, index: number) => {
    let isSamePair = false;
    if(index % 2 == 0){
      isSamePair = slot.btryPairId == stationSlotList[index + 1].btryPairId;
    }else{
      isSamePair = slot.btryPairId == stationSlotList[index - 1].btryPairId;
    }

    //slotBatSts
    const im = slot.slotBatSts && led_status[slot.slotBatSts];
/*0	충전완료	충전완료
1	충전중	현재 충전중
2	오프라인교체중	교체를 위해 오프라인예약된 배터리
3	고장	오류발생
4	빈슬롯	배터리가 없이 빈상태
5	온라인예약중	온라인으로 예약된 배터리
6	슬롯잠금	슬롯잠금상태
*/
    let className = `box-slot on-${im}`;

    // ${recommendActive ? "is-recommend" : ""}
    if (slot.slotBatId) {
      return <div key={slot.slotNum} className={className} onClick={(event) => onClickSlot(event, slot)}>
        <span>SOC {slot.slotBatSoc}%</span>
        <span>SOH {slot.slotBatSoh}%</span>
        <div className="tip-box">
          <span>페어 ID</span>
          <span className={isSamePair ? '' : 'c-primary'}>{slot.btryPairId}{isSamePair}</span>
        </div>
      </div>

    } else {
      return <div key={slot.slotNum} className="box-slot off-blank" onClick={(event) => onClickSlot(event, slot)}></div>
    }
  }

  return (
    <div className="pop-layout__center">
      {/* 스테이션 */}
      <div className="box type-main">
        <div className="board-g">
          <div className="board-body">
            {stationSlotList.map((stationSlotList: any, slotIndex: number) => (
              slotHtml(stationSlotList, slotIndex)

            ))}
            {/*<div className="box-slot on-reservation is-active">*/}
            {/*  <span>SOC 47.3%</span>*/}
            {/*  <span>SOH 47.3%</span>*/}
            {/*  <div className="tip-box">*/}
            {/*    <span>페어 ID</span>*/}
            {/*    <span>2410021210</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>


        {/* 범례 */}
        <div className="board-legend">
          <span className="mark-blank">{t("dashboard.led-status.blank")}</span>
          <span className="mark-reservation">{t("dashboard.led-status.reservation")}</span>
          <span className="mark-exchangeable">{t("dashboard.led-status.exchangeable")}</span>
          <span className="mark-exchanging">{t("dashboard.led-status.exchanging")}</span>
          <span className="mark-lock">{t("dashboard.led-status.lock")}</span>
          <span className="mark-charging">{t("dashboard.led-status.charging")}</span>
        </div>
      </div>
    </div>
  )
}

export default StationDetailUserCenter;