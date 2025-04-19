import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/* Common */
import { led_status } from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";

export default function SlotInfo1Gen(props: any) {
  const {t} = useTranslation()
  const { data } = props;
  const { slotBatId } = data;

  let im: string = data.slotBatSts && led_status[data.slotBatSts] || 'blank';
  /*0	충전완료	충전완료
  1	충전중	현재 충전중
  2	오프라인교체중	교체를 위해 오프라인예약된 배터리
  3	고장	오류발생
  4	빈슬롯	배터리가 없이 빈상태
  5	온라인예약중	온라인으로 예약된 배터리
  6	슬롯잠금	슬롯잠금상태
  */

//   <div className="board-legend">
//   <span className="mark-blank">{t("dashboard.led-status.blank")}</span>
//   <span className="mark-reservation">{t("dashboard.led-status.reservation")}</span>
//   <span className="mark-exchangeable">{t("dashboard.led-status.exchangeable")}</span>
//   <span className="mark-exchanging">{t("dashboard.led-status.exchanging")}</span>
//   <span className="mark-lock">{t("dashboard.led-status.lock")}</span>
//   <span className="mark-charging">{t("dashboard.led-status.charging")}</span>
// </div>

  return (
    <div className="m-box-slot">
      <h3 className="m-t-title">
        {t('station.slot')/* 슬롯  */}
        {data.slotNum}
        <span className={`mark-${im}`}>
          {t(`dashboard.led-status.${im}`)}
        </span>
        {/* <span className="mark-normal">교환가능</span>
        <span className="mark-reservation">예약중</span>
        <span className="mark-charging">충전 중 </span>
        <span className="mark-blank">빈 슬롯 </span>
        <span className="mark-lock">잠금 </span> */}
      </h3>
      <p className="m-t-txt">
        <span>
          <strong>
            {t('dashboard.battery-id')/* 배터리ID  */}
          </strong> {slotBatId && data.slotBatId || '-'}
        </span>
        <span>
          <strong>
            {t('dashboard.battery-pair-id') /* 페어ID  */}
          </strong> {slotBatId && data.btryPairId || '-'}
        </span>
      </p>
      <div className="box-slot">
        <div>
          <div className="cont">{slotBatId && data.slotBatTempAvg || '-'}℃</div>
          <div className="stit">
            {t('dashboard.avg-temp') /* 평균 온도 */}
          </div>
        </div>
        <div>
          <div className="cont">{slotBatId && data.slotBatSoc || '-'}%</div>
          <div className="stit">SOC</div>
        </div>
        <div>
          <div className="cont">{slotBatId && data.slotBatSoh || '-'}%</div>
          <div className="stit">SOH</div>
        </div>
      </div>
    </div>
  );
}
