// 	HEXAADMHOM2P05 : 1세대 상세 팝업(관리자)

import React, {useEffect, useState} from "react";

/* Common */
import StationInfo from "@/new_components/dashboard/detail/1gen/admin/StationInfo";
import RecentControlHistory from "@/new_components/dashboard/detail/common/RecentControlHistory";
import BatteryInfo from "@/new_components/dashboard/detail/1gen/admin/BatteryInfo";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {Station, StationSlot} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import {StationCtrlHistoryDto} from "@/utils/apiService/type/station/StationControlDto.ts";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import {getControlHistoryList} from "@/utils/StationControlUtil.ts";
import {BssStatBtryInfo, BssStatInfo} from "@/utils/apiService/type/dashboard/Dashboard1gen.ts";

export default function DashboardStationDetailAdmin() {
  const {t} = useTranslation();
  const {id} = useParams<"id">();
  const [stationSlotList, setStationSlotList] = useState<StationSlot[]>([]);
  const [station, setStation] = useState<Station>();
  const [controlList, setControlList] = useState<StationCtrlHistoryDto[]>();
  const [bssStatInfo, setBssStatInfo] = useState<BssStatInfo>();
  const [batteryList, setBatteryList] = useState<BssStatBtryInfo[]>();

  const getStation = async (stationId: string) => {
    const result = await DashboardApiService().getGenStation(stationId);
    setStation(result.data);
    setStationSlotList(result.data.stationSlots);
  }

  const getControlHistory = async (id: string) => {
    setControlList(await getControlHistoryList(id, 5));
  }

  const getBssStatInfo = async (id: string) => {
    const result = await DashboardApiService().get1StStationByIdBatteryCnt(id);
    setBssStatInfo(result.data);
  }

  const getBssBatteryList = async (id: string) => {
    const result = await DashboardApiService().get1StStationByIdBatteryList(id);
    setBatteryList(result.data);
  }

  const initData = (id: string) => {
    getStation(id);
    getBssStatInfo(id);
    getControlHistory(id);
    getBssBatteryList(id);
  }

  useEffect(() => {
    console.log(id);
    if (id) {
      initData(id);
    }
  }, [id]);

  return (
    <>
      <div className="win-pop-wrap">
        {/* 스테이션 정보 */}
        <StationInfo station={station} bssStatInfo={bssStatInfo} />

        {/* 최근 제어 이력 */}
        <RecentControlHistory controlList={controlList} />

        {/* 배터리 현황 */} {/* 배터리 상태 */}
        <BatteryInfo bssStatInfo={bssStatInfo} batteryList={batteryList}/>
      </div>
    </>
  );
}
