import {Button} from "@progress/kendo-react-buttons";
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Station, StationSlot} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import CONTROL_DATA_ENUM from "@/utils/apiService/type/dashboard/ControlEnum.ts";
import {onClickSlotCtrl, onClickStationCtrl} from "@/utils/StationControlUtil.ts";
import {useTranslation} from "react-i18next";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import {RecommendBtry} from "@/views/dashboard/detail/2gen/DashboardStationDetailUser.tsx";
import useAlert from "@/hooks/useAlert.tsx";


interface Props {
    station: Station;
    selectSlotNo: number;
    stationSlotList: StationSlot[];
    setRecommendBtry: React.Dispatch<React.SetStateAction<RecommendBtry[]>>;
}
const StationDetailUserRight = ({station, selectSlotNo, stationSlotList, setRecommendBtry}: Props) => {
    const {t} = useTranslation();
    const [selectSlot, setSelectSlot] = useState<StationSlot>();
    const [recommendActive, setRecommendActive] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);
    const showAlert = useAlert();
    let timer: any;

    const getRecommendBattery = async () => {
        const result = await DashboardApiService().recommendStationBattery(station.stationId);
        const dataArr = result.data as RecommendBtry[];
        // const dataArr = [{'btryId':'0', 'slotNumber': 1}, {'btryId':'0', 'slotNumber': 3}] as RecommendBtry[];
        return dataArr;
    }


    const handleRecommendClick = async () => {
        const data = await getRecommendBattery();
        if(data.length === 0){
            showAlert({message: '현재 추천 가능한 배터리가 없습니다.'});
            return;
        }

        setRecommendBtry(data);
        timer = setTimeout(() => {
            setRecommendActive(false);
            setRecommendBtry([]);
            clearTimeout(timer);
        }, 10000);
    };

    useEffect(() => {
        const setSlotDetail = () =>{
            const stationSlot = stationSlotList.find((stationSlot) => stationSlot.slotNum == selectSlotNo);
            setSelectSlot(stationSlot);
        }
        if(selectSlotNo && stationSlotList){
            setSlotDetail();
        }
    }, [selectSlotNo, stationSlotList]);

    const handleClickOutside = (event: any) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setRecommendActive(false);
            clearTimeout(timer);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    });

    return (
        <div className="pop-layout__right">
            <div className="box type-out">
                <h4>{t("dashboard.recommend-release")}</h4>
                <div className="switch-group" ref={divRef}>
                    <Button
                        disabled={station?.isDisconnect ? true : false}
                        onClick={handleRecommendClick}>
                        {t("dashboard.control-btn.recommend-release-brty")}
                    </Button>
                </div>
            </div>
            {/* 스테이션 제어 */}
            <div className="box type-switch">
                <h4>{t("dashboard.station-control")}</h4>
                <div className="switch-group">
                    <Button
                      className="switch-btn-1"
                      disabled={station?.isDisconnect ? true : false}
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.SLOT_ALL_LOCK, 'G2')}
                    >
                        {t("dashboard.control-btn.all-lock")}
                    </Button>
                    <Button
                      className="switch-btn-2"
                      disabled={station?.isDisconnect ? true : false}
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.SLOT_ALL_UNLOCK, 'G2')}
                    >
                        {t("dashboard.control-btn.all-unlock")}
                    </Button>
                    <Button
                      className="switch-btn-5"
                      disabled={station?.isDisconnect ? true : false}
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.PC_SW_REBOOT, 'G2')}
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
                      disabled={
                        station?.isDisconnect
                        || !selectSlot
                        || selectSlot.slotSts == 'LOCK'
                        || selectSlot.slotSts == '0010'
                        ? true : false
                      }
                      onClick={(event) => onClickSlotCtrl(selectSlot, CONTROL_DATA_ENUM.SLOT_LOCK, 'G2')}
                    >
                        <i className="ico"></i>
                        {t("dashboard.control-btn.lock")}
                    </Button>
                    <Button
                      disabled={
                        station?.isDisconnect
                        || !selectSlot
                        || (selectSlot.slotSts !== 'LOCK' || selectSlot.slotSts !== '0010')
                        ? true : false
                      }
                      onClick={(event) => onClickSlotCtrl(selectSlot, CONTROL_DATA_ENUM.SLOT_UNLOCK, 'G2')}
                    >
                        <i className="ico"></i>
                        {t("dashboard.control-btn.unlock")}
                    </Button>
                    <Button
                      disabled={
                        station?.isDisconnect
                        || !selectSlot
                        || selectSlot.slotLockCmd == 0
                        || selectSlot.slotDoorSts == 1
                        ? true : false
                      }
                      onClick={(event) => onClickSlotCtrl(selectSlot, CONTROL_DATA_ENUM.SLOT_ONE_TIME_AUTH, 'G2')}
                    >
                        <i className="ico"></i>
                        {t("dashboard.control-btn.open")}
                    </Button>
                    <Button
                      disabled={
                        station?.isDisconnect
                        || !selectSlot
                        || !selectSlot.slotInBat
                        || selectSlot.slotDoorSts == 0
                        ? true : false
                      }
                      onClick={(event) => onClickSlotCtrl(selectSlot, CONTROL_DATA_ENUM.SLOT_BATTERY_UNLOCK, 'G2')}
                    >
                        <i className="ico"></i>
                        {t("dashboard.control-btn.release")}
                    </Button>
                    <Button
                      disabled={station?.isDisconnect || !selectSlot ? true : false}
                      onClick={(event) => onClickSlotCtrl(selectSlot, CONTROL_DATA_ENUM.SLOT_RESET, 'G2')}
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
                        <dd>{selectSlot && selectSlot.slotInBat && selectSlot.slotBatId}</dd>
                    </div>
                </dl>
                <div className="info">
                    <dl>
                        <div className="info-v">
                            <dt>{t("dashboard.pack-volt")}</dt>
                            <dd>
                                {selectSlot && selectSlot.slotInBat && selectSlot.slotBatVolt} <span className="unit">V</span>
                            </dd>
                        </div>
                        <div className="info-tem">
                            <dt>{t("dashboard.avg-temp")}</dt>
                            <dd>
                                {selectSlot && selectSlot.slotInBat && selectSlot.slotBatTempAvg} <span className="unit">℃</span>
                            </dd>
                        </div>
                        <div className="info-soc">
                            <dt>SOC</dt>
                            <dd>
                                {selectSlot && selectSlot.slotInBat && selectSlot.slotBatSoc} <span className="unit">%</span>
                            </dd>
                        </div>
                        <div className="info-soh">
                            <dt>SOH</dt>
                            <dd>
                                {selectSlot && selectSlot.slotInBat && selectSlot.slotBatSoh} <span className="unit">%</span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default StationDetailUserRight;