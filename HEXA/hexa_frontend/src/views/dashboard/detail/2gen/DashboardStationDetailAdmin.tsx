// 	HEXAADMHOM2P03 : 2세대 상세 팝업(관리자)

import * as React from "react";
import {useEffect, useState} from "react";

/* Kendo UI */
import {TabStrip, TabStripSelectEventArguments, TabStripTab,} from "@progress/kendo-react-layout";

/* Common */
import StationInfo from "@/new_components/dashboard/detail/2gen/admin/StationInfo";
import RecentControlHistory from "@/new_components/dashboard/detail/common/RecentControlHistory";
import DeviceInfo from "@/new_components/dashboard/detail/2gen/admin/DeviceInfo";
import SlotBoardInfo from "@/new_components/dashboard/detail/2gen/admin/SlotBoardInfo";
import BatteryInfo from "@/new_components/dashboard/detail/2gen/admin/BatteryInfo";
import {useParams} from "react-router-dom";
import {
  Station,
  StationChassis,
  StationSlot,
  StationSlotBoardDto
} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import {StationCtrlHistoryDto} from "@/utils/apiService/type/station/StationControlDto.ts";
import {getControlHistoryList, onClickStationCtrl} from "@/utils/StationControlUtil.ts";
import {Button} from "@progress/kendo-react-buttons";
import CONTROL_DATA_ENUM from "@/utils/apiService/type/dashboard/ControlEnum.ts";
import {useTranslation} from "react-i18next";

export default function DashboardStationDetailAdmin() {

  const {t} = useTranslation();
  const [selected, setSelected] = React.useState<number>(0);
  const {id} = useParams<"id">();
  const [stationSlotList, setStationSlotList] = useState<StationSlot[]>([]);
  const [stationChassisList, setStationChassisList] = useState<StationChassis[]>();
  const [stationSlotBoardList, setStationSlotBoardList] = useState<StationSlotBoardDto[]>([]);
  const [station, setStation] = useState<Station>();
  const [selectSlotNo, setSelectSlotNo] = useState<number>(0);
  const [controlList, setControlList] = useState<StationCtrlHistoryDto[]>();


  const getStation = async (stationId: string) => {
    const result = await DashboardApiService().getStation(stationId);
    setStation(result.data);
    setStationChassisList(result.data.stationChassis);
    setStationSlotList(result.data.stationSlots);
    setStationSlotBoardList(result.data.slotBoards)
  }

  useEffect(() => {
    console.log(id);
    if (id) {
      initData(id);
    }
  }, [id]);

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  const onClickRefresh = () => {
    console.log("onClickRefresh")
    if (id) {
      initData(id);
    }
  }

  const initData = (id: string) => {
    getStation(id);
    getControlHistory(id);
  }

  const getControlHistory = async (id: string) => {
    setControlList(await getControlHistoryList(id, 5));
  }

  return (
    <>
      <div className="win-pop-wrap">

        {/* 스테이션 정보 */}
        {station && <StationInfo station={station} refreshHandler={onClickRefresh}/>}

        {/* 최근 제어 이력 */}
        {controlList && <RecentControlHistory controlList={controlList} /> }

        {/* 함체 정보 */}
        {stationChassisList && <DeviceInfo stationChassisList={stationChassisList} />}

        <div className="tabs mt3">
          <TabStrip selected={selected} onSelect={handleSelect}>
            <TabStripTab title={t("dashboard.slot-board.title")}>
              <section className="section">
                <div className="title-group">
                  <h3 className="t-title">{t("dashboard.slot-board.title")}</h3>
                  <div className="group-align-right gap0.38">
                    <Button
                      size={"medium"}
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.SLOT_BOARD_ALL_RESET, 'G2')}
                    >
                      {t("dashboard.slot-board.btn.all-reset")}
                    </Button>
                    <Button
                      size={"medium"}
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.SLOT_ALL_LOCK, 'G2')}
                    >
                      {t("dashboard.slot-board.btn.all-slot-lock")}
                    </Button>
                    <Button
                      size={"medium"}
                      onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.SLOT_ALL_UNLOCK, 'G2')}
                    >
                      {t("dashboard.slot-board.btn.all-slot-unlock")}
                    </Button>
                  </div>
                </div>
              <SlotBoardInfo stationSlotBoardList={stationSlotBoardList} />
              </section>
            </TabStripTab>
            <TabStripTab title={t("dashboard.battery-info")}>
              <BatteryInfo stationSlotList={stationSlotList} />
            </TabStripTab>
          </TabStrip>
        </div>
      </div>
    </>
  );
}
