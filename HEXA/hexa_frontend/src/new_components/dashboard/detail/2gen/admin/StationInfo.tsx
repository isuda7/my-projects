//스테이션 정보

import React, {useEffect, useState} from "react";
import { Button } from "@progress/kendo-react-buttons";
import {Station} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";
import {station_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import {isAdmin} from "@/utils/common.ts";

interface exchangeCount {
  today: number;//금일
  yesterday: number;//전일
  total: number;//전체
}
interface Props {
  station: Station;
  refreshHandler: () => void;
}
export default function StationInfo({station, refreshHandler}: Props) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const role = useAppSelector(roleSelector);
  const [exchangeCount, setExchangeCount] = useState<exchangeCount>();
  const [updateAt, setUpdateAt] = useState(dayjs().format(t("format.date-time-uppercase")));

  const onClickRefresh = () =>{
    refreshHandler();
    getStationSwapCnt();
    setUpdateAt(dayjs().format(t("format.date-time-uppercase")));
  }

  const getStationSwapCnt = async () =>  {
    const result = await DashboardApiService().getStationSwapCnt({'id': station.stationId});
    setExchangeCount((prevState)=>({
      ...prevState,
      today: result?.data?.todaySwapCount || 0,
      yesterday: result?.data?.yesterdaySwapCount || 0,
      total: result?.data?.totalSwapCount || 0,
    }))
    return result.data;
  }

  useEffect(() => {
    if(station){
      getStationSwapCnt();
    }
  }, []);
  const gotoUserDashboard = () => {
    navigate(`/dashboard/2nd/user/${station?.stationId}`)
  }

  return (
    <>
      {/* 스테이션 정보 */}
      <section className="section">
        <div className="title-group" style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, backgroundColor: "#fff" }}>
          <h3 className="t-title">{t("dashboard.station-info")}</h3>
          <div className="title-group__update">
            <span>{t("dashboard.update-at")} {updateAt}</span>
            <Button themeColor={"info"} onClick={onClickRefresh}>
              <i className="icon icon-refresh-thin"></i>
            </Button>
            {isAdmin(role.roleCode) && <Button size={"small"} themeColor={"dark"} onClick={gotoUserDashboard} >사용자 화면 전환</Button>}
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <table className="tbl-base">
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <tbody>
            <tr>
              <th scope="row">{t("dashboard.station-id")}</th>
              <td>{station.stationId}</td>
              <th scope="row">{t("dashboard.station-name")}</th>
              <td>{station.stationName}</td>
              <th scope="row">{t("dashboard.station-qrid")}</th>
              <td>{station.qrId}</td>
              <th scope="row">{t("dashboard.station-gen")}</th>
              <td>{t("dashboard.2nd-generation")}</td>

            </tr>
            <tr>
              <th scope="row">{t("dashboard.station-address")}</th>
              <td colSpan={3}>{station.address}</td>
              <th scope="row">{t("dashboard.station-slot-count")}</th>
              <td>{station.totSlot}</td>
              <th scope="row">{t("dashboard.station-status-label")}</th>
              <td>
                <span className={`mark-${station_status[station.isDisconnect ? 'DISCONNECTION' : station.stationStatus]}`}>{t(`dashboard.bss-status.${station.isDisconnect ? 'DISCONNECTION': station.stationStatus}`)}</span>
                {/* <span className="mark-unable">교환불가</span>
                <span className="mark-error">오류발생</span>
                <span className="mark-lock">전체잠금</span>
                <span className="mark-disconnection">통신단절</span> */}
              </td>
            </tr>
            <tr>
              <th scope="row">{t("dashboard.station-availabel-pw")}(Wh)</th>
              <td>{station.powerCapTypeCode == 'INPUT' ? station?.totalAvailableWh?.toLocaleString() : station.powerCapTypeCode}</td>
              <th scope="row">{t("dashboard.station-disable-pw")}(Wh)</th>
              <td>{station?.totAccumPwr?.toLocaleString()}</td>
              <th scope="row">{t("dashboard.station-total-change-cnt")}</th>
              <td>{station?.totalSwapCnt?.toLocaleString()}</td>
              <th scope="row">{t("dashboard.station-today-change-cnt")}</th>
              <td>{exchangeCount?.today?.toLocaleString()}</td>
            </tr>
            <tr>
              <th scope="row">{t("dashboard.station-note")}</th>
              <td colSpan={5}>{station.note}</td>
              <th scope="row">{t("dashboard.station-visible-app")}</th>
              <td>{station?.isVisibleAtApp ? 'Y' : 'N'}</td>
            </tr>
            </tbody>
          </table>
        </div>

      </section>
    </>
  );
}
