//슬롯 보드 및 슬롯 정보

import React, {useEffect, useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import {Grid, GridColumn as Column, GridNoRecords,} from "@progress/kendo-react-grid";
import {StationSlotBoardDto} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import CONTROL_DATA_ENUM from "@/utils/apiService/type/dashboard/ControlEnum.ts";
import {onClickSlotBoardCtrl, onClickSlotCtrl} from "@/utils/StationControlUtil.ts";
import {useTranslation} from "react-i18next";
import {led_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";
import {
  CustomCellComState, CustomCellDoorState,
  CustomCellOnOffState, CustomCellTextColor
} from "@/new_components/dashboard/detail/common/DashboardColumsCell.tsx";

interface Props {
  stationSlotBoardList: StationSlotBoardDto[]
}

export default function SlotBoardInfo({stationSlotBoardList}: Props) {
  const {t} = useTranslation();
  const [gridData, setGridData] = useState<any>([]);

  const getGirdData = () => {
    const data: any[] = [];
    stationSlotBoardList.forEach(v => {
      const { slots, ...rest } = v;
      const slotLength = slots.length;
      slots.sort(function (a, b){
        return a.slotNum - b.slotNum;
      }).forEach((slot, index) => {
        let json = {
          ...rest,
          ...slot
        };
        if(index % slotLength == 0){
          json.rowSpan = slotLength;
        }
        data.push(json);
      });
    })
    return data;
  }

  const CustomCellBtn5 = (props: any) => {
    if(props.dataItem.rowSpan){
      return (
        <td rowSpan={props.dataItem.rowSpan} colSpan={1} className="k-table-td txt-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button
            size={"small"}
            themeColor={"dark"}
            className={props.children}
            onClick={(event) => onClickSlotBoardCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_BOARD_RESET, 'G2')}
          >
            {t("dashboard.slot-board.btn.slot-board-reset")}
          </Button>
        </td>
      );
    }else{
      return null;
    }

  };

  const CustomCellBtn6 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        {/* 버튼 비활성화 class='disabeld' */}
        <Button
          size={"small"}
          themeColor={"dark"}
          className={props.children}
          onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_CHARGER_RESET, 'G2')}
        >
          {t("dashboard.slot-board.btn.charger-reset")}
        </Button>
      </td>
    );
  };

  const CustomCellBtn7 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        {/* 버튼 비활성화 class='disabeld' */}
        <Button
          size={"small"}
          fillMode="outline"
          className={props.children}
          onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_CHARGER_OFF, 'G2')}
        >
          {t("dashboard.slot-board.btn.charger-off")}
        </Button>
      </td>
    );
  };

  const CustomSlotBtn = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="row flex-gap-0.5 flex-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button
            size={"small"}
            themeColor={"dark"}
            className={props.children}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_LOCK, 'G2')}
          >
            ON
          </Button>
          <Button
            size={"small"}
            fillMode="outline"
            className={props.children}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_UNLOCK, 'G2')}
          >
            OFF
          </Button>
        </div>
      </td>
    );
  };
  const CustomBatteryBtn = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="row flex-gap-0.5 flex-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button
            size={"small"}
            themeColor={"dark"}
            className={props.children}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_BATTERY_LOCK, 'G2')}
          >
            ON
          </Button>
          <Button
            size={"small"}
            fillMode="outline"
            className={props.children}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_BATTERY_UNLOCK, 'G2')}
          >
            OFF
          </Button>
        </div>
      </td>
    );
  };
  const CustomFanBtn = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="row flex-gap-0.5 flex-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button
            size={"small"}
            themeColor={"dark"}
            className={props.children}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_FAN_ON, 'G2')}
          >
            ON
          </Button>
          <Button
            size={"small"}
            fillMode="outline"
            className={props.children}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_FAN_OFF, 'G2')}
          >
            OFF
          </Button>
        </div>
      </td>
    );
  };

  const CustomCellBtn9 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        {/* {props.children} */}
        {/* 버튼 비활성화 class='disabeld' */}
        <Button
          size={"small"}
          themeColor={"dark"}
          className={props.children}
          onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_ONE_TIME_AUTH, 'G2')}
        >
          {t("dashboard.slot-board.btn.certified")}
        </Button>
      </td>
    );
  };

  const CustomCellBtn10 = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="row flex-gap-0.5 flex-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button
            size={"small"}
            themeColor={"dark"}
            className={props.children}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_DOOR_OPEN, 'G2')}
          >
            Open
          </Button>
          <Button
            size={"small"}
            fillMode="outline"
            className={props.children}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM.SLOT_DOOR_CLOSE, 'G2')}
          >
            Close
          </Button>
        </div>
      </td>
    );
  };

  const CustomCellState = (props: any) => {
    const str = props.children;
    let style = `mark-${led_status[str]}`;

    return (
      <td colSpan={1} className="k-table-td txt-center">
        <span className={style}></span>
      </td>
    );
  };


  const CustomCellSlotSeq = (props: any) => {
    const str = props.children;
    console.log(str);
    return (
        <td colSpan={1} className="k-table-td txt-center">
          <span >{t(`dashboard.slot-board.slot-seq.${str}`)}</span>
        </td>
    );
  }

  useEffect(() => {
    const data: any[] = getGirdData();
    setGridData(data);
  }, [stationSlotBoardList]);

  const rowSpanHeaders = ['slotBoardNumber','fwVersion','serialNumber','Switch', 'comStatus'];

  const cellRender = (cell: any, props: any) => {
    const {dataItem, field} = props;
    if (rowSpanHeaders.find(headers => headers == field)) {
      if (dataItem.rowSpan) {
        return <td {...cell.props} rowSpan={dataItem.rowSpan} >{cell.props.children}</td>;
      } else {
        return null;
      }
    }
    return <td {...cell.props}  colSpan={props.colSpan} >{cell.props.children}</td>;
  };


  return (
    <>
      <div className="grid-row-2">
        <Grid
          style={{maxHeight: "900px"}}
          data={gridData}
          scrollable="scrollable"
          cellRender={cellRender}
        >
          <GridNoRecords>{t("common.no_search_results")}</GridNoRecords>

          <Column
            className="txt-center"
            field="slotBoardNumber"
            title={t("dashboard.slot-board.grid-column.no")}
            width="90"
            locked={true}
          />
          <Column
            className="txt-center"
            field="fwVersion"
            title={t("dashboard.slot-board.grid-column.fw-ver")}
            width="90"
          />
          <Column
            className="txt-center"
            field="comStatus"
            title={t("dashboard.slot-board.grid-column.com-status")}
            width="90"
            cells={{
              data: CustomCellComState,
            }}
          />
          <Column
            className="txt-center"
            field="Switch"
            title={t("dashboard.slot-board.grid-column.control")}
            width="140"
            cells={{
              data: CustomCellBtn5,
            }}
          />
          <Column
            className="txt-center"
            field="slotNum"
            title={t("dashboard.slot-board.grid-column.slot-no")}
            width="90"
            locked={true}
          />
          <Column title={t("dashboard.slot-board.grid-column.nfc-board")}>
            <Column
              className="txt-center"
              field="nfcFwVersion"
              title={t("dashboard.slot-board.grid-column.slot-fw-ver")}
              width="100"
            />
            <Column
              className="txt-center"
              field="slotComNfcSts"
              title={t("dashboard.slot-board.grid-column.slot-nfc-com-status")}
              width="100"
              cells={{
                data: CustomCellComState,
              }}
            />
          </Column>
          <Column title={t("dashboard.slot-board.grid-column.charger")}>
            <Column
              className="txt-center"
              field="chargerBoardStatus"
              title={t("dashboard.slot-board.grid-column.charger-status")}
              width="100"
              cells={{
                data: CustomCellOnOffState,
              }}
            />
            <Column
              className="txt-center"
              field="chargerFwVersion"
              title={t("dashboard.slot-board.grid-column.charger-fw-ver")}
              width="100"
            />
            <Column
              className="txt-center"
              field="slotComChgerSts"
              title={t("dashboard.slot-board.grid-column.charger-com-status")}
              width="100"
              cells={{
                data: CustomCellComState,
              }}
            />
            <Column
              className="txt-center"
              field="ChargerSwitch"
              title={t("dashboard.slot-board.grid-column.charger-control")}
              width="120"
              cells={{
                data: CustomCellBtn6,
              }}
            />
            <Column
              className="txt-center"
              field="ChargerOff"
              title={t("dashboard.slot-board.grid-column.charger-off")}
              width="120"
              cells={{
                data: CustomCellBtn7,
              }}
            />
          </Column>

          <Column
            className="txt-center"
            field="slotLedSts"
            title={t("dashboard.slot-board.grid-column.led-status")}
            width="100"
            cells={{
              data: CustomCellState,
            }}
          />
          <Column
            className="txt-center"
            field="slotSeq"
            title={t("dashboard.slot-board.grid-column.sequence-status")}
            width="110"
          />
          <Column title={t("dashboard.slot-board.grid-column.slot-door")}>
            <Column
              className="txt-center"
              field="slotTopSenOfDoorSts"
              title={t("dashboard.slot-board.grid-column.door-top-sensor")}
              width="100"
              cells={{
                data: CustomCellOnOffState,
              }}
            />
            <Column
              className="txt-center"
              field="slotBotSenOfDoorSts"
              title={t("dashboard.slot-board.grid-column.door-bottom-sensor")}
              width="100"
              cells={{
                data: CustomCellOnOffState,
              }}
            />
            <Column
              className="txt-center"
              field="slotDoorSts"
              title={t("dashboard.slot-board.grid-column.door-status")}
              width="100"
              cells={{
                data: CustomCellDoorState,
              }}
            />
            <Column
                className="txt-center"
                field="Gate"
                title={t("dashboard.slot-board.grid-column.slot-door-control")}
                width="140"
                cells={{
                  data: CustomCellBtn10,
                }}
            />

          </Column>

          <Column title={t("dashboard.slot-board.grid-column.battery-lock")}>
            <Column
              className="txt-center"
              field="slotLockSts1"
              title={t("dashboard.slot-board.grid-column.battery-lock-status1")}
              width="100"
              cells={{
                data: CustomCellOnOffState,
              }}
            />
            <Column
              className="txt-center"
              field="slotLockSts2"
              title={t("dashboard.slot-board.grid-column.battery-lock-status2")}
              width="100"
              cells={{
                data: CustomCellOnOffState,
              }}
            />
            <Column
              className="txt-center"
              field="BatteryLock"
              title={t("dashboard.slot-board.grid-column.battery-lock-control")}
              width="140"
              cells={{
                data: CustomBatteryBtn,
              }}
            />
          </Column>

          <Column title={t("dashboard.slot-board.grid-column.fan")}>
            <Column
              className="txt-center"
              field="slotFanSts"
              title={t("dashboard.slot-board.grid-column.fan-status")}
              width="100"
              cells={{
                data: CustomCellTextColor,
              }}
            />
            <Column
              className="txt-center"
              field="FanSwitch"
              title={t("dashboard.slot-board.grid-column.fan-control")}
              width="140"
              cells={{
                data: CustomFanBtn,
              }}
            />
          </Column>

          <Column
            className="txt-center"
            field="Certified"
            title={t("dashboard.slot-board.grid-column.certified")}
            width="140"
            cells={{
              data: CustomCellBtn9,
            }}
          />
          <Column
              className="txt-center"
              field="SlotSwitch"
              title={t("dashboard.slot-board.grid-column.slot-lock-control")}
              width="140"
              cells={{
                data: CustomSlotBtn,
              }}
          />

        </Grid>
      </div>

    </>
  );
}
