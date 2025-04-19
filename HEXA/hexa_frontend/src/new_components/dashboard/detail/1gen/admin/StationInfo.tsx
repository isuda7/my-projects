// 	HEXAADMHOM2P05 : 1세대 상세 팝업(관리자)

import React from "react";
import {Button} from "@progress/kendo-react-buttons";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import {Station} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import {station_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";
import {isAdmin} from "@/utils/common.ts";
import {BssStatInfo} from "@/utils/apiService/type/dashboard/Dashboard1gen.ts";
import {onClickSlotCtrl, onClickStationCtrl} from "@/utils/StationControlUtil.ts";
import CONTROL_DATA_ENUM from "@/utils/apiService/type/dashboard/ControlEnum_1gen.ts";

interface exchangeCount {
  today: number;//금일
  yesterday: number;//전일
  total: number;//전체
}

interface Props {
  station: Station;
  bssStatInfo: BssStatInfo;
}
export default function StationInfo({station, bssStatInfo}: Props) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const role = useAppSelector(roleSelector);
  // const [exchangeCount, setExchangeCount] = useState<exchangeCount>();

  const gotoUserDashboard = () => {
    navigate(`/dashboard/1st/user/${station?.stationId}`)
  }

  return (
    <>
      {/* 스테이션 정보 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">스테이션 정보</h3>
          {isAdmin(role.roleCode) && <Button size={"small"} themeColor={"dark"} onClick={gotoUserDashboard} >사용자 화면 전환</Button>}
          <div className="group-align-right gap0.38">
            <Button
              size={"medium"}
              onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.BSSRESET, 'G1')}
            >
              제어프로그램 재구동
            </Button>
            <Button
              size={"medium"}
              onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.BSSON, 'G1')}
            >
              정보갱신
            </Button>
            <Button
              size={"medium"}
              onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.SLOT_ALL_LOCK, 'G1')}
            >
              전체 잠금
            </Button>
            <Button
              size={"medium"}
              onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.SLOT_ALL_UNLOCK, 'G1')}
            >
              전체 잠금 해제
            </Button>
            <Button
              size={"medium"}
              onClick={(event) => onClickStationCtrl(station?.stationId, CONTROL_DATA_ENUM.AUTHRESET, 'G1')}
            >
              인증초기화
            </Button>
          </div>

        </div>

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
            <td>{station?.stationId}</td>
            <th scope="row">{t("dashboard.station-name")}</th>
            <td>{station?.stationName}</td>
            <th scope="row">{t("dashboard.station-gen")}</th>
            <td>{t("dashboard.1st-generation")}</td>
            <th scope="row">{t("dashboard.station-visible-app")}</th>
            <td>{station?.isVisibleAtApp ? 'Y' : 'N'}</td>
          </tr>
          <tr>
            <th scope="row">{t("dashboard.station-address")}</th>
            <td colSpan={3}>{station?.address}</td>
            <th scope="row">{t("dashboard.station-slot-count")}</th>
            <td>{station?.totSlot}</td>
            <th scope="row">{t("dashboard.station-status-label")}</th>
            <td>
              <span
                className={`mark-${station_status[station?.isDisconnect ? 'DISCONNECTION' : station?.stationStatus]}`}>{t(`dashboard.bss-status.${station?.isDisconnect ? 'DISCONNECTION' : station?.stationStatus}`)}</span>
              {/* <span className="mark-unable">교환불가</span>
                <span className="mark-error">오류발생</span>
                <span className="mark-lock">전체잠금</span>
                <span className="mark-disconnection">통신단절</span> */}
            </td>
          </tr>
          <tr>
            <th scope="row">동시충전구수</th>
            <td>{station?.simChargeCnt}</td>
            <th scope="row">{t("dashboard.station-disable-pw")}(Wh)</th>
            <td>{station?.totAccumPwr?.toLocaleString()}</td>
            <th scope="row">{t("dashboard.station-total-change-cnt")}</th>
            <td>{bssStatInfo?.btryChngCnt?.toLocaleString()}</td>
            <th scope="row">{t("dashboard.station-today-change-cnt")}</th>
            <td>{bssStatInfo?.todayExchngCnt?.toLocaleString()}</td>
          </tr>
          <tr>
            <th scope="row">{t("dashboard.station-note")}</th>
            <td colSpan={7}>{station?.note}</td>
          </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
