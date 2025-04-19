// 	HEXAADMHOM2P03 : 2세대 상세 팝업(관리자)

import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
} from "@progress/kendo-react-grid";
import {StationSlot} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import {onClickSlotCtrl} from "@/utils/StationControlUtil.ts";
import CONTROL_DATA_ENUM from "@/utils/apiService/type/dashboard/ControlEnum.ts";
import {useTranslation} from "react-i18next";
import {
  CustomCellOnOffState, CustomCellOnOffStateInBat,
  CustomCellOXState
} from "@/new_components/dashboard/detail/common/DashboardColumsCell.tsx";

interface Props {
  stationSlotList: StationSlot[];
}

export default function BatteryInfo({stationSlotList}: Props) {
  console.log(stationSlotList)
  const {t} = useTranslation();
  const CustomCellBtn8 = (props: any) => {
    const slot = props.dataItem;
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="row flex-gap-0.5 flex-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button
            size={"small"}
            themeColor={"dark"}
            className={slot.slotInBat ? props.children : "disabled"}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.WAKE_UP_ON, 'G2')}
          >
            ON
          </Button>
          <Button
            size={"small"}
            fillMode="outline"
            className={slot.slotInBat ? props.children : "disabled"}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.WAKE_UP_OFF, 'G2')}
          >
            OFF
          </Button>
        </div>
      </td>
    );
  };

  const cellRender = (cell: any, props: any) => {
    const {dataItem, field} = props;
    return <td {...cell.props}  colSpan={props.colSpan} >{field == 'slotNum' || dataItem.slotInBat ? cell.props.children : "-"}</td>;
  };
  return (
    <>
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">{t("dashboard.battery-info")}</h3>
        </div>

        <div className="grid-row-2">
          <Grid
            style={{ maxHeight: "900px" }}
            data={stationSlotList}
            scrollable="scrollable"
            cellRender={cellRender}
          >
            <GridNoRecords>{t("common.no_search_results")}</GridNoRecords>

            <Column
              className="txt-center"
              field="slotNum"
              title={t("dashboard.battery-slot-no")}
              width="90"
            />
            <Column
              className="txt-center"
              field="slotBatId"
              title={t("dashboard.battery-id")}
              width="120"
            />
            <Column
              className="txt-left"
              field="slotChgProf"
              title={t("dashboard.battery-charge-profile")}
              width="100"
            />
            <Column
              className="txt-left"
              field="condition"
              title={t("dashboard.battery-charge-profile-condition")}
              width="100"
            />
            <Column
              className="txt-center"
              field="slotInputSwBat"
              title={t("dashboard.battery-input-sensor")}
              width="90"
              cells={{
                data: CustomCellOnOffState
              }}
            />
            <Column
              className="txt-center"
              field="slotInBat"
              title={t("dashboard.battery-input-status")}
              width="90"
              cells={{
                data: CustomCellOXState
              }}
            />
            <Column title={t("dashboard.battery-volt")}>
              <Column
                className="txt-right"
                field="slotBatVolt"
                title={t("dashboard.battery-volt-pack")}
                width="90"
              />
              <Column
                className="txt-right"
                field="slotBatTermVolt"
                title={t("dashboard.battery-volt-pack-term")}
                width="90"
              />
            </Column>

            <Column
              className="txt-right"
              field="slotBatCurr"
              title={t("dashboard.battery-ampher")}
              width="90"
            />

            <Column title={t("dashboard.temperature")+"(℃)"}>
              <Column
                className="txt-right"
                field="slotBatTempMin"
                title={t("dashboard.min")}
                width="90"
              />
              <Column
                className="txt-right"
                field="slotBatTempMax"
                title={t("dashboard.max")}
                width="90"
              />
              <Column
                className="txt-right"
                field="slotBatTempAvg"
                title={t("dashboard.avg")}
                width="90"
              />
            </Column>

            <Column
              className="txt-right"
              field="slotBatSoc"
              title={t("dashboard.soc")}
              width="90"
            />
            <Column
              className="txt-right"
              field="slotBatSoh"
              title={t("dashboard.soh")}
              width="90"
            />
            <Column
              className="txt-center"
              field="slotBatFwVer"
              title={t("dashboard.battery-bms-sw-ver")}
              width="90"
            />
            <Column
              className="txt-center"
              field="slotBatDFET"
              title={t("dashboard.battery-dfet")}
              width="90"
              cells={{
                data: CustomCellOnOffStateInBat
              }}
            />
            <Column
              className="txt-center"
              field="slotBatCFET"
              title={t("dashboard.battery-cfet")}
              width="90"
              cells={{
                data: CustomCellOnOffStateInBat
              }}
            />

            <Column title="Wake-up">
              <Column
                className="txt-center"
                field="slotBatWakSts"
                title={t("dashboard.battery-wakeup-status")}
                width="90"
                cells={{
                  data: CustomCellOXState
                }}
              />
              <Column
                className="txt-center"
                field="BMS"
                title={t("dashboard.battery-bmw-control")}
                width="140"
                cells={{
                  data: CustomCellBtn8,
                }}
              />
            </Column>
          </Grid>
        </div>
      </section>
    </>
  );
}
