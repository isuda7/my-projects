import * as React from "react";
import {StationChassis, StationSlot} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {led_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";
import {RecommendBtry} from "@/views/dashboard/detail/2gen/DashboardStationDetailUser.tsx";

interface Props {
  stationChassisList: StationChassis[];
  stationSlotList: StationSlot[];
  setSelectSlotNo: React.Dispatch<React.SetStateAction<number>>;
  recommendBtry: RecommendBtry[];
  selectSlotNo: number;
}

const StationDetailUserCenter = ({stationChassisList, stationSlotList, setSelectSlotNo, selectSlotNo, recommendBtry}: Props) => {
  const {t} = useTranslation();

  const onClickSlot = (event: React.MouseEvent<HTMLDivElement>, slot: StationSlot) =>{
    const target = event.currentTarget as HTMLElement;

    document.querySelectorAll('.box-slot').forEach(el => el.classList.remove('is-active'));
    target.classList.add("is-active");

    setSelectSlotNo(slot.slotNum)
  }

  const slotHtml = (slot: StationSlot, index: number, chassisIndex: number) => {
    const endIndex = chassisIndex * 10 + 9;
    const startIndex = chassisIndex * 10;
    const im = led_status[slot.slotLedSts];

    let className = im ? `box-slot ${slot.slotInBat ? 'on' : 'off'}-` + im : 'box-slot';

    if(recommendBtry.find(recommend=>recommend.slotNumber == slot.slotNum)){
      className += ' is-recommend';
    }
    if(slot.slotNum == selectSlotNo){
      className += ' is-active';
    }

    if (startIndex <= index && endIndex >= index) {
      if(slot.slotInBat){
        return <div key={slot.slotNum} className={className} onClick={(event) => onClickSlot(event, slot)}>
          <span>SOC {slot.slotBatSoc}%</span>
          <span>SOH {slot.slotBatSoh}%</span>
        </div>

      }else {
        return <div key={slot.slotNum} className={className} onClick={(event) => onClickSlot(event, slot)} ></div>
      }

    }
    return null;
  }

  useEffect(() => {

  }, [recommendBtry]);

  return (
    <div className="pop-layout__center">
      {/* 스테이션 */}
      <div className="box type-main">
        {stationChassisList &&
          stationChassisList.map((stationChassis: any, chassisIndex: number) => (

            <div key={stationChassis.chassisNumber} className="board">
              <div className="board-header">
                {/* 온도 */}
                <div className="box-graph type-tem">
                  <div className="graph">
                    <svg viewBox="-2 -2 40 40" className="circle-svg">
                      <path
                        className="around"
                        strokeDasharray="100, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      ></path>

                      {/* 퍼센트 표시: strokeDasharray 앞자리 변경  */}
                      <path
                        className="percent"
                        strokeDasharray={`${stationChassis.chassisTemperature},100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      ></path>
                    </svg>
                  </div>
                  <div className="stit">{t("dashboard.temperature")}</div>
                  <div className="cont">
                    {stationChassis.chassisTemperature}<span>℃</span>
                  </div>
                </div>

                {/* 습도 */}
                <div className="box-graph type-hu">
                  <div className="graph">
                    <svg viewBox="-2 -2 40 40" className="circle-svg">
                      <path
                        className="around"
                        strokeDasharray="100, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      ></path>

                      {/* 퍼센트 표시: strokeDasharray 앞자리 변경  */}
                      <path
                        className="percent"
                        strokeDasharray={`${stationChassis.chassisHumidity},100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      ></path>
                    </svg>
                  </div>
                  <div className="stit">{t("dashboard.humid")}</div>
                  <div className="cont">
                    {stationChassis.chassisHumidity}<span>%</span>
                  </div>
                </div>

                {/* 이산화탄소 */}
                <div className="box-graph type-co2">
                  <div className="graph">
                    <svg viewBox="-2 -2 40 40" className="circle-svg">
                      <path
                        className="around"
                        strokeDasharray="100, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      ></path>

                      {/* 퍼센트 표시: strokeDasharray 앞자리 변경  */}
                      <path
                        className="percent"
                        strokeDasharray={`${stationChassis.chassisCO2 / 32000 * 100}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      ></path>
                    </svg>
                  </div>
                  <div className="stit">{t("dashboard.co2")}</div>
                  <div className="cont">
                    {stationChassis.chassisCO2}<span>ppm</span>
                  </div>
                </div>
              </div>

              <div className="board-body">
                {/*
                        on-reservation 예약중
                        on-exchangeable 교환가능
                        on-lock 잠금
                        on-charging 충전 중
                        on-exchanging 교환중
                        is-active 활성화
                      */}
                {/*슬롯*/}
                {stationSlotList.map((stationSlotList: any, slotIndex: number) => (
                  slotHtml(stationSlotList, slotIndex, chassisIndex)

                ))}
                <div className="box-state">
                  <dl>
                    <div>
                      <dt>{t("dashboard.flood")} :</dt>
                      <dd>{stationChassis.floodStatus ? 'O': 'X'}</dd>
                    </div>
                    <div>
                      <dt>{t("dashboard.door")} :</dt>
                      <dd>{stationChassis.chassisDoorStatus == 0 ? 'CLOSE': 'OPEN'}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}


        {/* 범례 */}
        <div className="board-legend">
          <span className="mark-blank">{t("dashboard.led-status.blank")}</span>
          <span className="mark-reservation">{t("dashboard.led-status.reservation")}</span>
          <span className="mark-exchangeable">{t("dashboard.led-status.exchangeable")}</span>
          <span className="mark-exchanging">{t("dashboard.led-status.exchanging")}</span>
          <span className="mark-lock">{t("dashboard.led-status.lock")}</span>
          <span className="mark-updating">{t("dashboard.led-status.updating")}</span>
          <span className="mark-charging">{t("dashboard.led-status.charging")}</span>
        </div>
      </div>
    </div>
  )
}

export default StationDetailUserCenter;