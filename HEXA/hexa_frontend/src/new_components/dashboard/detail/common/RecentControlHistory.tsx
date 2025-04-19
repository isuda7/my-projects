//최근 제어 이력

import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
} from "@progress/kendo-react-grid";
import {StationCtrlHistoryDto} from "@/utils/apiService/type/station/StationControlDto.ts";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const sampleProducts = [
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "함체 전체",
    Name: "냉난방기 ON",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "함체 01",
    Name: "메인보드 리셋",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "슬롯 02",
    Name: "개방",
    YN: "Y",
  },
  {
    DateTime: "2024-08-10 20:08:19",
    Target: "슬롯 02",
    Name: "강제 배출",
    YN: "Y",
  },
];
interface Props {
  controlList: StationCtrlHistoryDto[]
}

export default function RecentControlHistory({controlList}: Props) {

  const {t} = useTranslation();
  const navigate = useNavigate();

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <span className="cell-date">{dayjs(props.children).format(t("format.date-uppercase"))}</span>
        <span className="cell-time">{dayjs(props.children).format(t("format.time"))}</span>
      </td>
    );
  };

  const gotoControlHistory = () => {
    navigate("/station/history/dashboard");
  }

  return (
    <>
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">{t("dashboard.control-history.latest-history")}</h3>
          <div className="group-align-right">
            <Button fillMode="flat" className="btn-arr" onClick={gotoControlHistory}>
              {t("dashboard.control-history.btn-more")}
            </Button>
          </div>
        </div>

        <div className="grid-box-line">
          <Grid
            style={{ maxHeight: "600px" }}
            data={controlList}
            scrollable="none"
          >
            <GridNoRecords>{t("common.no_search_results")}</GridNoRecords>

            <Column
              className="txt-left"
              field="controlledAt"
              title={t("dashboard.control-history.control-at")}
              width="140"
              cells={{
                data: CustomCellDateTime,
              }}
            />
            <Column
              className="txt-left"
              field="controlTargetName"
              title={t("dashboard.control-history.target")}
              width="140"
            />
            <Column
              className="txt-left"
              field="controlCommandName"
              title={t("dashboard.control-history.command-name")}
              width="200"
            />
            <Column
              className="txt-center"
              field="statusName"
              title={t("dashboard.control-history.is-succeed")}
              width="100"
            />
          </Grid>
        </div>
      </section>
    </>
  );
}
