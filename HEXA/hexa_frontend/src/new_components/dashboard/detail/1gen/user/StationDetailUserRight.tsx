import {Button} from "@progress/kendo-react-buttons";
import * as React from "react";
import {Station, StationSlot} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import {useEffect, useRef, useState} from "react";
import CONTROL_DATA_ENUM from "@/utils/apiService/type/dashboard/ControlEnum_1gen.ts";
import {onClickSlotBoardCtrl, onClickSlotCtrl, onClickStationCtrl} from "@/utils/StationControlUtil.ts";
import {useTranslation} from "react-i18next";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import {RecommendBtry} from "@/views/dashboard/detail/2gen/DashboardStationDetailUser.tsx";
import {showAlert} from "@/store/modules/alertStore.ts";
import useAlert from "@/hooks/useAlert.tsx";


interface Props {
    station: Station;
    selectSlotNo: number;
    stationSlotList: StationSlot[];
}
const StationDetailUserRight = ({station, selectSlotNo, stationSlotList}: Props) => {
    const {t} = useTranslation();
    const [selectSlot, setSelectSlot] = useState<StationSlot>();
    const divRef = useRef<HTMLDivElement>(null);
    const showAlert = useAlert();

    useEffect(() => {
        const setSlotDetail = () =>{
            const stationSlot = stationSlotList.find((stationSlot) => stationSlot.slotNum == selectSlotNo);
            setSelectSlot(stationSlot);
        }
        if(selectSlotNo && stationSlotList){
            setSlotDetail();
        }
    }, [selectSlotNo, stationSlotList]);

    return (
        <div className="pop-layout__right">
            {/* 스테이션 제어 */}
            <div className="box type-switch">
                <h4>{t("dashboard.station-control")}</h4>
                <div className="switch-group">
                    <Button
                      className="switch-btn-1"
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.SLOT_ALL_LOCK, 'G1')}
                    >
                        {t("dashboard.control-btn.all-lock")}
                    </Button>
                    <Button
                      className="switch-btn-2"
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.SLOT_ALL_UNLOCK, 'G1')}
                    >
                        {t("dashboard.control-btn.all-unlock")}
                    </Button>
                    <Button
                      className="switch-btn-3"
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.BSSON, 'G1')}
                    >
                        {t("iot-control-name.BSSON")/*정보 갱신*/}
                    </Button>
                    <Button
                      className="switch-btn-4"
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.AUTHRESET, 'G1')}
                    >
                        {t("iot-control-name.AUTHRESET")/*인증 초기화*/}
                    </Button>
                    <Button
                      className="switch-btn-5"
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.BSSRESET, 'G1')}
                    >
                        {t("dashboard.control-btn.program-restart")}
                    </Button>
                </div>
            </div>

            {/* 슬롯 제어 */}
            <div className="box type-slot">
                <h4>{t("dashboard.slot-control")}</h4>
                <p className="t-txt">{t("dashboard.battery-slot-no")} : {selectSlot && selectSlot.slotNum}</p>
                <div className="slot-group">
                    <Button
                      disabled={!selectSlot || selectSlot.slotSts == '6' ? true : false}
                      onClick={(event) => onClickSlotCtrl(selectSlot, CONTROL_DATA_ENUM.SLOT_DOOR_LOCK, 'G1')}
                    >
                        <i className="ico"></i>
                        {t("dashboard.control-btn.lock")}
                    </Button>
                    <Button
                      disabled={selectSlot && selectSlot.slotSts == '6' ? false : true}
                      onClick={(event) => onClickSlotCtrl(selectSlot, CONTROL_DATA_ENUM.SLOT_DOOR_UNLOCK, 'G1')}
                    >
                        <i className="ico"></i>
                        {t("dashboard.control-btn.unlock")}
                    </Button>
                    <Button
                      disabled={selectSlot && !selectSlot.slotBatId ? false : true}
                      onClick={(event) => onClickSlotCtrl(selectSlot, CONTROL_DATA_ENUM.SLOT_DOOR_OPEN, 'G1')}
                    >
                        <i className="ico"></i>
                        {t("dashboard.control-btn.open")}
                    </Button>
                    <Button
                      disabled={selectSlot && selectSlot.slotBatId ? false : true}
                      onClick={(event) => onClickSlotCtrl(selectSlot, CONTROL_DATA_ENUM.SLOT_BATTERY_UNLOCK, 'G1')}
                    >
                        <i className="ico"></i>
                        {t("dashboard.control-btn.release")}
                    </Button>
                    <Button
                      disabled={selectSlot ? false : true}
                      onClick={(event) => onClickSlotCtrl(selectSlot, CONTROL_DATA_ENUM.SLOT_RESET, 'G1')}
                    >
                        <i className="ico"></i>
                        {t("dashboard.control-btn.reset")}
                    </Button>
                </div>
            </div>

            {/* 배터리 정보 */}
            <div className="box type-battery">
                <h4>{t("dashboard.battery-info")}</h4>
                <dl>
                    <div>
                        <dt>{t("dashboard.battery-id")} :</dt>
                        <dd>{selectSlot?.slotBatId}</dd>
                    </div>
                    <div>
                        <dt>{t("dashboard.battery-pair-id")} :</dt>
                        <dd>{selectSlot?.btryPairId}</dd>
                    </div>
                </dl>
                <div className="info type-g">
                    <dl>
                        <div className="info-state-lock">
                            <dt>{t("dashboard.status")}</dt>
                            <dd>{t("dashboard.led-status.lock")}</dd>
                        </div>
                        <div className="info-tem">
                            <dt>{t("dashboard.avg-temp")}</dt>
                            <dd>
                                {selectSlot && selectSlot.slotBatId && selectSlot.slotBatTempAvg} <span
                              className="unit">℃</span>
                            </dd>
                        </div>
                        <div className="info-soc">
                            <dt>SOC</dt>
                            <dd>
                                {selectSlot && selectSlot.slotBatId && selectSlot.slotBatSoc} <span
                              className="unit">%</span>
                            </dd>
                        </div>
                        <div className="info-soh">
                            <dt>SOH</dt>
                            <dd>
                                {selectSlot && selectSlot.slotBatId && selectSlot.slotBatSoh} <span
                              className="unit">%</span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default StationDetailUserRight;