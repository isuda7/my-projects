// 	HEXAADMHOM2P05 : 1세대 상세 팝업(관리자)

import React, {useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import {Grid, GridColumn as Column, GridNoRecords,} from "@progress/kendo-react-grid";
import {BssStatBtryInfo, BssStatInfo} from "@/utils/apiService/type/dashboard/Dashboard1gen.ts";
import {onClickSlotCtrl} from "@/utils/StationControlUtil.ts";
import CONTROL_DATA_ENUM from "@/utils/apiService/type/dashboard/ControlEnum_1gen.ts";
import {useTranslation} from "react-i18next";


interface batteryStatusCount{
  charge_complete: number;
  charging: number;
  reserve: number;
  locked: number;
  error: number;
  exchaging: number;
}
interface props{
  bssStatInfo: BssStatInfo;
  batteryList: BssStatBtryInfo[];
}

export default function BatteryInfo({bssStatInfo, batteryList}: props) {
  const {t} = useTranslation();
  const [statusCount, setStatusCount] = useState<batteryStatusCount>();


  const CustomCell = (props: any) => {
    const slot = props.dataItem;
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <div className="row flex-gap-0.5 flex-center">
          {/* 버튼 비활성화 class='disabeld' */}
          <Button
            size={"small"}
            themeColor={"dark"}
            className={props.children}
            onClick={(event) => onClickSlotCtrl(props.dataItem, CONTROL_DATA_ENUM[props.field], 'G1')}
          >
            {props.title}
          </Button>
        </div>
      </td>
    );
  };

  const CustomCellState = (props: any) => {
    const str = props.children;
    let style = "";

    switch (str) {
      case "0":
        style = "mark-normal";
        break;

      case "1":
        style = "mark-charging";
        break;

      case "4":
        style = "mark-blank";
        break;

      case "5":
        style = "mark-reservation";
        break;

      case "2":
        style = "mark-exchanging";
        break;

      case "6":
        style = "mark-lock";
        break;
    }
    return (
      <td colSpan={1} className="k-table-td txt-center">
        <span className={style}></span>
      </td>
    );
  };

  return (
    <>
      {/* 배터리 현황 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">배터리 현황</h3>
        </div>

        <table className="tbl-base">
          <colgroup>
            <col style={{ width: "16%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "17%" }} />
            <col style={{ width: "17%" }} />
            <col style={{ width: "17%" }} />
            <col style={{ width: "17%" }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">충전완료</th>
              <th scope="col">충전중</th>
              <th scope="col">예약중</th>
              <th scope="col">잠금중</th>
              <th scope="col">오류</th>
              <th scope="col">교환중</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="txt-right">{bssStatInfo?.chrgCmplCnt}</td>
              <td className="txt-right">{bssStatInfo?.chrgIngCnt}</td>
              <td className="txt-right">{bssStatInfo?.resvBtryCnt}</td>
              <td className="txt-right">{bssStatInfo?.lockBtryCnt}</td>
              <td className="txt-right">{bssStatInfo?.errBtryCnt}</td>
              <td className="txt-right">{bssStatInfo?.inexchngBtryCnt}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 배터리 상태 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">배터리 상태</h3>
          <div className="group-align-right flex-gap-1">
            배터리 상태
            <span className="mark-normal">OK</span>
            <span className="mark-charging">충전중</span>
            <span className="mark-blank">빈 슬롯 </span>
            <span className="mark-reservation">예약중 </span>
            <span className="mark-exchanging">교환중 </span>
            <span className="mark-lock">슬롯잠금</span>
          </div>
        </div>

        <div className="grid-row-2">
          <Grid
            style={{ maxHeight: "600px" }}
            data={batteryList}
            filterable={false}
            scrollable="none"
          >
            <GridNoRecords>검색된 데이터가 없습니다.</GridNoRecords>

            <Column
              className="txt-center"
              field="positionNumber"
              title="슬롯번호"
              width="90"
            />
            <Column
              className="txt-center"
              field="slotBatteryId"
              title="배터리ID"
              width="90"
            />
            <Column
              className="txt-center"
              field="btryPairId"
              title="페어ID"
              width="90"
            />
            <Column
              className="txt-center"
              field="slotBatteryStatus"
              title="배터리 상태"
              width="100"
              filterable={false}
              cells={{
                data: CustomCellState,
              }}
            />
            <Column
              className="txt-center"
              field="slotBatterySoc"
              title="SOC"
              width="90"
              filterable={false}
            />
            <Column
              className="txt-center"
              field="slotBatterySoh"
              title="SOH"
              width="90"
              filterable={false}
            />
            <Column title="교환횟수">
              <Column
                className="txt-center"
                field="btryExchngCnt"
                title="누적"
                width="100"
                filterable={false}
              />
              <Column
                className="txt-center"
                field="btryTodayExchngCnt"
                title="금일"
                width="100"
                filterable={false}
              />
            </Column>
            <Column
              className="txt-center"
              field="tprt"
              title="슬롯온도"
              width="90"
              filterable={false}
            />

            <Column title="팩 온도">
              <Column
                className="txt-right"
                field="slotBatteryTemperatureAvg"
                title="평균"
                width="90"
                filterable={false}
              />
              <Column
                className="txt-right"
                field="slotBatteryTemperatureMax"
                title="최고"
                width="90"
                filterable={false}
              />
              <Column
                className="txt-right"
                field="slotBatteryTemperatureMin"
                title="최저"
                width="90"
                filterable={false}
              />
            </Column>
            <Column title="슬롯제어">
              <Column
                className="txt-center"
                field="SLOT_DOOR_LOCK"
                title={t("dashboard.control-btn.lock")}
                width="100"
                filterable={false}
                cells={{
                  data: (props: any) => <CustomCell {...props} title={t("dashboard.control-btn.lock")} />,
                }}
              />
              <Column
                className="txt-center"
                field="SLOT_DOOR_UNLOCK"
                title={t("dashboard.control-btn.unlock")}
                width="100"
                filterable={false}
                cells={{
                  data: (props: any) => <CustomCell {...props} title={t("dashboard.control-btn.unlock")} />,
                }}
              />
              <Column
                className="txt-center"
                field="SLOT_BATTERY_UNLOCK"
                title={t("dashboard.control-btn.release")}
                width="100"
                filterable={false}
                cells={{
                  data: (props: any) => <CustomCell {...props} title={t("dashboard.control-btn.release")} />,
                }}
              />
              <Column
                className="txt-center"
                field="SLOT_DOOR_OPEN"
                title={t("dashboard.control-btn.open")}
                width="100"
                filterable={false}
                cells={{
                  data: (props: any) => <CustomCell {...props} title={t("dashboard.control-btn.open")} />,
                }}
              />
              <Column
                className="txt-center"
                field="SLOT_RESET"
                title={t("dashboard.control-btn.reset")}
                width="100"
                filterable={false}
                cells={{
                  data: (props: any) => <CustomCell {...props} title={t("dashboard.control-btn.reset")} />,
                }}
              />
            </Column>
          </Grid>
        </div>
      </section>
    </>
  );
}
