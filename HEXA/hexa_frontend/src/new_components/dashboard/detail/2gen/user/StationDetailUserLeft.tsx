import {Button} from "@progress/kendo-react-buttons";
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import * as React from "react";
import {Station} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import {StationCtrlHistoryDto} from "@/utils/apiService/type/station/StationControlDto.ts";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import {useEffect, useState} from "react";
import {getFormattedTime} from "@/utils/common.ts";
import {useNavigate} from "react-router-dom";

interface exchangeCount {
  today: number;//금일
  yesterday: number;//전일
  total: number;//전체
}


interface Props {
  stationId: string;
  station: Station;
  controlList: StationCtrlHistoryDto[]
}


const StationDetailUserLeft = ({station, controlList}: Props) => {
  const {t} = useTranslation();
  const [exchangeCount, setExchangeCount] = useState<exchangeCount>();

  const navigate = useNavigate();

  const CustomCellControlDate = (props: any) => (
    <td {...props.tdProps}>
      {dayjs(props.children).format(t("format.date-time-uppercase"))}
    </td>
  );


  const CustomCellColor = (props: any) => (
    <td {...props.tdProps} colSpan={1}>
      <span className="c-primary">{props.children}</span>
    </td>
  );

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
  const gotoControlHistory = () => {
    navigate("/station/history/dashboard");
  }

  const onClickRefresh = () => {

  }

  useEffect(() => {
    getStationSwapCnt();
  }, []);

  return (
    <div className="pop-layout__left">
      {/* 기본 정보 */}
      <div className="box type-info">
        <h4>{t("dashboard.basic-info")}</h4>
        <dl>
          <div>
            <dt>{t("dashboard.station-name")} :</dt>
            <dd>{station.stationName}</dd>
          </div>
          <div>
            <dt>{t("dashboard.station-id")} :</dt>
            <dd>{station.stationId}</dd>
          </div>
          <div>
            <dt>{t("dashboard.station-address")} :</dt>
            <dd>{(station?.cityName ?? "") + " " + (station?.districtName ?? "") + " " + station.address}</dd>
          </div>
          <div>
            <dt>{t("dashboard.station-gen")} :</dt>
            <dd>
              <span className="flag-2">{t("dashboard.2nd-generation")}</span>
            </dd>
          </div>
          <div>
            <dt>{t("dashboard.station-install-at")} :</dt>
            <dd>{station && getFormattedTime(station?.installedAt)}</dd>
          </div>
          <div>
            <dt>{t("dashboard.station-visible-app")} :</dt>
            <dd>{station.isVisibleAtApp ? 'Y' : 'N'}</dd>
          </div>
          <div>
            <dt>{t("dashboard.station-note")} :</dt>
            <dd>{station.note}</dd>
          </div>
        </dl>
      </div>

      {/* 교환횟수 */}
      <div className="box type-counter">
        <h4>{t("dashboard.change-count")}</h4>
        <dl>
        <div>
            <dt>{t("dashboard.today")}</dt>
            <dd>{exchangeCount?.today}</dd>
          </div>
          <div>
            <dt>{t("dashboard.yesterday")}</dt>
            <dd>{exchangeCount?.yesterday}</dd>
          </div>
          <div>
            <dt>{t("dashboard.allday")}</dt>
            <dd>{exchangeCount?.total}</dd>
          </div>
        </dl>
      </div>

      {/* 최근 제어 이력 */}
      <div className="box type-list">
        <h4>{t("dashboard.control-history.latest-history")}</h4>
        {/*<Button themeColor={"info"} onClick={onClickRefresh}>*/}
        {/*  <i className="icon icon-refresh-thin"></i>*/}
        {/*</Button>*/}
        <Button
          themeColor={"info"}
          className="btn-more"
          title={t("dashboard.control-history.btn-latest-history-more")}
          onClick={gotoControlHistory}
        >
          <i className="icon icon-arr-right"></i>
        </Button>

        <div className="grid-dark">
          <Grid data={controlList} scrollable="none">
            <Column
              field="controlledAt"
              title={t("dashboard.control-history.control-at")}
              width="82"
              cells={{
                data: CustomCellControlDate
              }}
            />
            <Column
              field="controlTargetName"
              title={t("dashboard.control-history.target")}
              width="65"/>
            <Column
              field="controlCommandName"
              title={t("dashboard.control-history.command-name")}
              width="75"/>
            <Column
              className="txt-center"
              field="statusName"
              title={t("dashboard.control-history.is-succeed")}
              width="45"
              cells={{
                data: CustomCellColor,
              }}
            />
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default StationDetailUserLeft;