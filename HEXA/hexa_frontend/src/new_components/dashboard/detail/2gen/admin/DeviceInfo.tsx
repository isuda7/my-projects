//함체정보 - (2세대 용)

import React from "react";
import {Button} from "@progress/kendo-react-buttons";
import {Grid, GridColumn as Column, GridNoRecords,} from "@progress/kendo-react-grid";
import {StationChassis} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import CONTROL_DATA_ENUM from "@/utils/apiService/type/dashboard/ControlEnum.ts";
import {onClickChassisCtrl, onClickStationCtrl} from "@/utils/StationControlUtil.ts";
import {useTranslation} from "react-i18next";
import {
  CustomCellDoorState,
  CustomCellOnOffState, CustomCellOXState, CustomCellTextColor, CustomCellXOState
} from "@/new_components/dashboard/detail/common/DashboardColumsCell.tsx";
import {getFormattedTime} from "@/utils/common.ts";


interface Props {
  // station: Station;
  stationChassisList: StationChassis[];
}

export default function DeviceInfo({stationChassisList}: Props) {
  console.log(stationChassisList)
  const {t} = useTranslation();
  const CustomMainboardResetBtn = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        {/* 버튼 비활성화 class='disabeld' */}
        <Button
          size={"small"}
          themeColor={"dark"}
          className={props.children}
          onClick={(event) => onClickChassisCtrl(props.dataItem, CONTROL_DATA_ENUM.MAINBOARD_RESET)}
        >
          {t("dashboard.device.btn.mainboard-reset")}
        </Button>
      </td>
    );
  };

  const CustomAirconStat = (cell: any) => {
    const {tdProps, dataItem} = cell;
    if (cell.dataIndex % stationChassisList.length == 0) {
      return (
        <td rowSpan={stationChassisList.length}  {...tdProps}>{dataItem.chassisAirConStatus == 0 ? 'OFF': 'ON'}</td>
      );
    } else {
      return null;
    }

  };

  const CustomAirconBtn = (props: any) => {
    if (props.dataIndex % stationChassisList.length == 0) {
      return (
        <td rowSpan={stationChassisList.length} colSpan={1} className="k-table-td txt-center">
          {/* {props.children} */}
          {/* 버튼 비활성화 class='disabeld' */}
          <div className="row flex-gap-0.5 flex-center">
            <Button
              size={"small"}
              themeColor={"dark"}
              className={props.children}
              onClick={(event) => onClickChassisCtrl(props.dataItem, CONTROL_DATA_ENUM.AIR_CONDITIONING_ON)}
            >
              {t("dashboard.device.btn.aircon-on")}
            </Button>
            <Button
              size={"small"}
              fillMode="outline"
              className={props.children}
              onClick={(event) => onClickChassisCtrl(props.dataItem, CONTROL_DATA_ENUM.AIR_CONDITIONING_OFF)}
            >
              {t("dashboard.device.btn.aircon-off")}
            </Button>
          </div>
        </td>
      );
    } else {
      return null;
    }

  };

  const CustomFanBtn = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="row flex-gap-0.5 flex-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button
            size={"small"}
            themeColor={"dark"}
            className={props.children == '-1' ? 'disabled' : ''}
            onClick={(event) => onClickChassisCtrl(props.dataItem, CONTROL_DATA_ENUM.CHASSIS_FAN_ON)}
          >
            FAN ON
          </Button>
          <Button
            size={"small"}
            fillMode="outline"
            className={props.children == '-1' ? 'disabled' : ''}
            onClick={(event) => onClickChassisCtrl(props.dataItem, CONTROL_DATA_ENUM.CHASSIS_FAN_OFF)}
          >
            FAN OFF
          </Button>
        </div>
      </td>
    );
  };

  const CustomCellBtn4 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* 버튼 비활성화 class='disabeld' */}
        <div className="row flex-gap-0.5 flex-center">
          <Button
            size={"small"}
            fillMode="outline"
            className={props.children}
            onClick={(event) => onClickChassisCtrl(props.dataItem, CONTROL_DATA_ENUM.CHASSIS_CIRCUIT_BREAKER_OFF)}
          >
            {t("dashboard.device.btn.gate-off")}
          </Button>
        </div>
      </td>
    );
  };
  const CustomMainboardComSts = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* 버튼 비활성화 class='disabeld' */}
        <div className="row flex-gap-0.5 flex-center">
          {t(`dashboard.device.main-bd-com-sts.${props.children}`)}
        </div>
      </td>
    );
  };


  return (
    <>
      {/* 함체 정보 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">{t("dashboard.device.title")}</h3>
        </div>

        <div className="row">
          {/* OS 및 운용 프로그램 */}
          <div className="col-7">
            <div className="title-group mt0">
              <h4 className="t-title-s mr1">{t("dashboard.device.os-title")}</h4>
              <div className="group-align-right gap0.38">
                <Button
                  size={"medium"}
                  onClick={(event) => onClickStationCtrl(stationChassisList[0]?.stationId, CONTROL_DATA_ENUM.PC_SW_REBOOT)}
                >
                  {t("dashboard.device.btn.pc-sw-reboot")}
                </Button>
                <Button
                  size={"medium"}
                  onClick={(event) => onClickStationCtrl(stationChassisList[0]?.stationId, CONTROL_DATA_ENUM.PC_HW_REBOOT)}
                >
                  {t("dashboard.device.btn.pc-hw-reboot")}
                </Button>
              </div>
            </div>

            <table className="tbl-base">
              <colgroup>
                <col style={{width: "30%"}}/>
                <col style={{width: "30%"}}/>
                <col style={{width: "40%"}}/>
              </colgroup>
              <thead>
              <tr>
                <th>{t("dashboard.device.station-cont-program")}</th>
                <th>{t("dashboard.device.last-boot-at")}</th>
                <th>{t("dashboard.device.boot-reason")}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td className="txt-center">{stationChassisList && stationChassisList[0]?.fwVersion}</td>
                <td className="txt-center">{stationChassisList && getFormattedTime(stationChassisList[0]?.bootTime)}</td>
                <td className="txt-center">{stationChassisList && stationChassisList[0]?.bootReason}</td>
              </tr>
              </tbody>
            </table>
          </div>

          {/* 라우터 */}
          <div className="col-5 pl1">
            <div className="title-group mt0">
              <h4 className="t-title-s mr1">{t("dashboard.device.router-title")}</h4>

              <div className="group-align-right">
                <Button
                  size={"medium"}
                  onClick={(event) => onClickStationCtrl(stationChassisList[0]?.stationId, CONTROL_DATA_ENUM.ROUTER_RESET)}
                >
                  {t("dashboard.device.btn.router-reset")}
                </Button>
              </div>
            </div>

            <table className="tbl-base">
              <colgroup>
                <col style={{width: "50%"}}/>
                <col style={{width: "50%"}}/>
              </colgroup>
              <thead>
              <tr>
                <th>{t("dashboard.device.sw-ver")}</th>
                <th>{t("dashboard.device.tel-num")}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td className="txt-center">{stationChassisList && stationChassisList[0]?.routerSwVer}</td>
                <td className="txt-center">{stationChassisList && stationChassisList[0]?.routerNumber}</td>
              </tr>
              </tbody>
            </table>
          </div>

          {/* 내부 시스템 */}
          <div className="col-12">
            <div className="title-group mt0">
              <h4 className="t-title-s mr1">{t("dashboard.device.system-title")}</h4>
            </div>

            <div className="grid-row-2">
              <Grid
                style={{maxHeight: "600px"}}
                data={stationChassisList}
                scrollable="none"
              >
                <GridNoRecords>{t("common.no_search_results")}</GridNoRecords>

                <Column
                  className="txt-center"
                  field="chassisNumber"
                  title={t("dashboard.device.grid-col.chassis-no")}
                  width="90"
                />
                <Column
                  className="txt-center"
                  field="chassisTemperature"
                  title={t("dashboard.device.grid-col.temp")}
                  width="90"
                />
                <Column
                  className="txt-center"
                  field="chassisHumidity"
                  title={t("dashboard.device.grid-col.humi")}
                  width="90"
                />
                <Column
                  className="txt-center"
                  field="chassisCO2"
                  title={t("dashboard.device.grid-col.co2")}
                  width="100"
                />
                <Column
                  className="txt-center"
                  field="floodStatus"
                  title={t("dashboard.device.grid-col.flood-status")}
                  width="90"
                  cells={{
                    data: CustomCellOXState
                  }}
                />
                <Column title={t("dashboard.device.grid-col.mainboard-status")}>
                  <Column
                    className="txt-center"
                    field="fwVersion"
                    title={t("dashboard.device.grid-col.fw-ver")}
                    width="100"
                  />
                  <Column
                    className="txt-center"
                    field="mainBdComSts"
                    title={t("dashboard.device.grid-col.chassis-status")}
                    width="100"
                    cells={{
                      data: CustomMainboardComSts,
                    }}
                  />
                  <Column
                    className="txt-center"
                    field="Reset"
                    title={t("dashboard.device.grid-col.reset")}
                    width="100"
                    cells={{
                      data: CustomMainboardResetBtn,
                    }}
                  />
                </Column>
                <Column
                  className="txt-center"
                  field="chassisDoorStatus"
                  title={t("dashboard.device.grid-col.chassis-door")}
                  width="100"
                  cells={{
                    data: CustomCellDoorState
                  }}
                />
                <Column
                  className="txt-center"
                  field="chassisAccumulatedPower"
                  title={t("dashboard.device.grid-col.chassis-used-power")}
                  width="110"
                />
                <Column title={t("dashboard.device.grid-col.aircon")}>
                  <Column
                    className="txt-center"
                    field="chassisAirConStatus"
                    title={t("dashboard.device.grid-col.aircon-status")}
                    width="100"
                    cells={{data: CustomAirconStat}}
                  />
                  <Column
                    className="txt-center"
                    field="Switch"
                    title={t("dashboard.device.grid-col.aircon-control")}
                    width="120"
                    cells={{
                      data: CustomAirconBtn,
                    }}
                  />
                </Column>
                <Column title={t("dashboard.device.grid-col.fan")}>
                  <Column
                    className="txt-center"
                    field="chassisFanStatus"
                    title={t("dashboard.device.grid-col.fan-status")}
                    width="100"
                    cells={{
                      data: CustomCellTextColor,
                    }}
                  />
                  <Column
                    className="txt-center"
                    field="chassisFanControl"
                    title={t("dashboard.device.grid-col.fan-control")}
                    width="200"
                    cells={{
                      data: CustomFanBtn,
                    }}
                  />
                </Column>
                <Column
                  className="txt-center"
                  field="Gate"
                  title={t("dashboard.device.grid-col.gate-off")}
                  width="100"
                  cells={{
                    data: CustomCellBtn4,
                  }}
                />
              </Grid>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
