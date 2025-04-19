import {useEffect, useRef, useState, MouseEvent} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {NoticeReponse} from "@/utils/apiService/type/auth/Notice.type.ts";
import BatteryApiService from "@/utils/apiService/battery/BatteryApiService.ts";
import {BatteryRequestDto} from "@/utils/apiService/type/battery/BatteryRequestDto.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import _ from "lodash";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {useTranslation} from "react-i18next";
import {
  BatteryRsrvHistRequestDto,
  BatteryUsageHistRequestDto
} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import BatteryHistApiService from "@/utils/apiService/battery/BatteryHistApiService.ts";
import {BatteryRsrvHistResponseDto} from "@/utils/apiService/type/battery/BatteryHistResponseDto.ts";
import DateRange, {DateRangeProps} from "@/components/common/DateRange.tsx";
import * as React from "react";

interface BatteryRsrvHistoryModalProps {
  batteryId: string;
}

export default function BatteryRsrvHistoryModal(props: BatteryRsrvHistoryModalProps) {
  const {t} = useTranslation();


  const COLUMNS: GridHeader[] = [
    {field: "reservationStartedAt", title: t("battery.reservation_datetime"), cellType: "dateTime", width: 130},
    {field: "rsrvId", title: t("battery.reservation_id"), filterable: true, width: 130},
    {field: "vehicleId", title: t("battery.vehicle_id"), filterable: true, width: 180},
    {field: "stationId", title: t("station.station_id"), filterable: true, width: 140},
    {field: "stationName", title: t("station.station_name"), filterable: true, width: 120},
    {field: "reserveStatusName", title: t("battery.reservation_status"), filterable: true, width: 100},
  ];

  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void }>(null);

  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);


  const downloadButton = async (event: MouseEvent) => {
    const params: BatteryRsrvHistRequestDto = {
      page: 1,
      size: 20,
      excelMap: JSON.stringify(column.map(v => ({[v.field]: v.title})))
    };
    await BatteryHistApiService().downloadBatteryRsrvHist(params);
  };

  const getBatteryRsrvHistList = async (params: BatteryRsrvHistRequestDto) => {
    const result = await BatteryHistApiService().getBatteryRsrvHistByBatteryIdList(props.batteryId, params);
    return result.data;
  };

  const [gridProps, setGridProps] = useState<CommonGridProps<BatteryResponseDto>>({
    gridHeight: 400,
    columnHeader: column,
    defaultFilter: true,
    sortableGrid: true,
    unsorted: true,
    multipleSorting: false,
    isReorder: true,
    isResizable: true,
    checkKey: "id",
    headerSelection: true,
    girdToolBar: true,
    displayCount: [20, 50, 100],
    isFilterResetButton: true,
    isGridResetButton: true,
    isColumnSelectShowButton: true,
    onSearch: getBatteryRsrvHistList,
    downloadButton,
    queryKey: "batteryRsrvHistory",
  });

  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: column,
    });
  }, [column]);

  return (
    <>
      <div className="contents">
        <div className="content">
          <div className="dialog-box">
            <section className="section">
              {/* 검색 박스 */}
              <div className="search-group">
                <dl className="search-group__txt">
                  <div>
                    <dt>{t('station.battery_id')} :</dt>
                    <dd>{props.batteryId}</dd>
                  </div>
                </dl>
              </div>
            </section>

            <GridCommonComponent
              {...gridProps}
              ref={gridRef}
            />
          </div>
        </div>
      </div>
    </>
  );
}