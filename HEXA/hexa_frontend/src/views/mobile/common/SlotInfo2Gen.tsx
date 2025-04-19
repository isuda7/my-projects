import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/* Common */
import { led_status } from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";

export default function SlotInfo2Gen(props: any) {
  const {t} = useTranslation()
  const { data } = props;
  const { slotInBat } = data;

  let im: string = data.slotLedSts && led_status[data.slotLedSts] || 'blank';

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
        <strong>
          {t('dashboard.battery-id')/* 배터리ID  */}
        </strong> {slotInBat && data.slotBatId || '-'}
      </p>
      <div className="box-slot">
        <div>
          <div className="cont">{slotInBat && data.slotBatVolt || '-'}V</div>
          <div className="stit">
            {t('dashboard.pack-volt') /* 팩 전압 */}
          </div>
        </div>
        <div>
          <div className="cont">{slotInBat && data.slotBatTempAvg || '-'}℃</div>
          <div className="stit">
            {t('dashboard.avg-temp') /* 평균 온도 */}
          </div>
        </div>
        <div>
          <div className="cont">{slotInBat && data.slotBatSoc || '-'}%</div>
          <div className="stit">SOC</div>
        </div>
        <div>
          <div className="cont">{slotInBat && data.slotBatSoh || '-'}%</div>
          <div className="stit">SOH</div>
        </div>
      </div>
    </div>
  );
}
