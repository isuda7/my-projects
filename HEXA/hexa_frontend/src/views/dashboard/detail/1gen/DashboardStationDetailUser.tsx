// 	HEXAADMHOM2P06 : 1세대 상세 팝업(일반 사용자)

import * as React from "react";
import {useEffect, useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import StationDetailUserLeft from "@/new_components/dashboard/detail/1gen/user/StationDetailUserLeft.tsx";
import StationDetailUserCenter from "@/new_components/dashboard/detail/1gen/user/StationDetailUserCenter.tsx";
import StationDetailUserRight from "@/new_components/dashboard/detail/1gen/user/StationDetailUserRight.tsx";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import {Station, StationSlot} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import dayjs from "dayjs";
import {StationCtrlHistoryDto} from "@/utils/apiService/type/station/StationControlDto.ts";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import {getControlHistoryList} from "@/utils/StationControlUtil.ts";
import {station_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";
import {isAdmin} from "@/utils/common.ts";
import {BssStatInfo} from "@/utils/apiService/type/dashboard/Dashboard1gen.ts";

export default function DashboardStationDetailUser() {
  const {t} = useTranslation();
  const {id} = useParams<"id">();
  const navigate = useNavigate();
  const role = useAppSelector(roleSelector);
  const [stationSlotList, setStationSlotList] = useState<StationSlot[]>([]);
  const [station, setStation] = useState<Station>();
  const [selectSlotNo, setSelectSlotNo] = useState<number>(0);
  const [updateAt, setUpdateAt] = useState(dayjs().format(t("format.date-time-uppercase")));
  const [controlList, setControlList] = useState<StationCtrlHistoryDto[]>([]);
  const [title, setTitle] = useState<string>();
  const [titleClass, setTitleClass] = useState<string>();
  const [bssStatInfo, setBssStatInfo] = useState<BssStatInfo>();


  //click
  const [active, setActive] = React.useState(true);
  const clickSlot = () => {
    setActive(!active);
  };

  const getControlHistory = async (id: string) => {
    setControlList(await getControlHistoryList(id, 4));
  }

  const getBssStatInfo = async (id: string) => {
    const result = await DashboardApiService().get1StStationByIdBatteryCnt(id);
    setBssStatInfo(result.data);
  }

  useEffect(() => {
    const getStation = async (stationId: string) => {
      const result = await DashboardApiService().getGenStation(stationId);
      setStation(result.data);
      setStationSlotList(result.data.stationSlots);
    }
    if (id) {
      getStation(id);
      getControlHistory(id);
      getBssStatInfo(id);
    }
  }, [id]);

  const gotoAdminDashboard = () => {
    navigate(`/dashboard/1st/admin/${station?.stationId}`)
  }

  useEffect(() => {
    if(station){
      const status = station?.isDisconnect ? 'DISCONNECTION' : station?.stationStatus;
      setTitle(t(`dashboard.bss-status.${status}`));
      setTitleClass(`tit-state-${station_status[status]}`);
    }
  }, [station]);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-pop">
          <div className="dashboard-pop__head">
            <div className="dashboard-pop__head__left">
              {isAdmin(role.roleCode) &&
                <Button size={"small"} themeColor={"info"} onClick={gotoAdminDashboard}>관리자 화면 전환</Button>
              }
            </div>
            <h2 className="pop-title">
              <span className="stit-ico">{station?.qrId}</span>
              <span>{station?.stationName}</span>
            </h2>
            <div className="tit-pos">
              <span className={titleClass}>{title}</span>
            </div>
            <div className="t-update">{t("dashboard.update-at")} {updateAt}</div>
          </div>
          <div className="dashboard-pop__body">
            <div className="pop-layout">
              {station &&
                <StationDetailUserLeft
                  station={station}
                  bssStatInfo={bssStatInfo}
                  controlList={controlList}
                />
              }
              <StationDetailUserCenter
                stationSlotList={stationSlotList}
                setSelectSlotNo={setSelectSlotNo}
              />
              <StationDetailUserRight
                station={station}
                selectSlotNo={selectSlotNo}
                stationSlotList={stationSlotList}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
