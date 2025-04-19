import * as React from "react";
import {MouseEvent, useRef, useState} from "react";
import {GridCustomCellProps,} from "@progress/kendo-react-grid";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {BatterySwapHistRequestDto} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import BatteryHistApiService from "@/utils/apiService/battery/BatteryHistApiService.ts";
import {BatterySwapResponseDto} from "@/utils/apiService/type/battery/BatteryHistResponseDto.ts";
import Footer from "@/components/common/Footer.tsx";
import {useTranslation} from "react-i18next";

interface BatterySwapAndLocHistoryModalProps {
  batteryId: string;
}

export default function BatterySwapAndLocHistoryModal(props: BatterySwapAndLocHistoryModalProps) {
  const {t} = useTranslation();
  const gridRef = useRef<{ refetchGrid: () => void }>(null);

  const COLUMNS: GridHeader[] = [
    {field: "swapAt", title: t("battery.creation_datetime"), cellType: "dateTime", width: 120},
    {
      field: "type",
      title: t("battery.location_status"),
      filterable: true,
      width: 100,
      filterType: 'select',
      cell: (props: GridCustomCellProps) => {
        const type = props.dataItem.type;
        const textColor = () => {
          if (type === "BatterySwap") {
            return "c-primary";
          }
          if (type === "인증실패") {
            return "c-red";
          }
        };
        return (
          <span className={`${textColor()}`}>{type}</span>
        );
      }
    },
    {field: "vehicleId", title: t("battery.vehicle_id"), filterable: true, width: 145},
    {field: "stationId", title: t("station.station_id"), filterable: true, width: 140},
    {field: "stationName", title: t("station.station_name"), filterable: true, width: 120},
    {field: "insertSlotNo", title: t("battery.inbound_slot"), filterable: true, filterType: 'select', width: 140},
    {field: "ejactBtryId", title: t("battery.outbound_battery_id"), filterable: true, width: 140},
    {field: "ejectSlotNo", title: t("battery.outbound_slot"), filterable: true, filterType: 'select', width: 100},
    {field: "failReason", title: t("battery.failure_reason"), filterable: true, width: 200},
    {field: "rsrvId", title: t("battery.reservation_id"), filterable: true, width: 130},
  ];

  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

  const downloadButton = async (event: MouseEvent) => {
    const params: BatterySwapHistRequestDto = {
      page: 1,
      size: 20,
      excelMap: JSON.stringify(column.map(v => ({[v.field]: v.title})))
    };
    await BatteryHistApiService().downloadBatteryRsrvHist(params);
  };

  const getBatterySwapLocHistList = async (params: BatterySwapHistRequestDto) => {
    const result = await BatteryHistApiService().getBatterySwapLocHistByBatteryIdList(props.batteryId, params);
    return result.data;
  };

  const [gridProps, setGridProps] = useState<CommonGridProps<BatterySwapResponseDto>>({
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
    onSearch: getBatterySwapLocHistList,
    downloadButton,
    queryKey: "batterySwapLocHistory",
  });

  const CustomCellTextColor = (props: any) => {
    const textColor = () => {
      if (props.children === "교환실패") {
        return "c-primary";
      }
      if (props.children === "인증실패") {
        return "c-red";
      }
    };

    return (
      <td colSpan={1} className="k-table-td txt-left">
        <span className={`${textColor()}`}>{props.children}</span>
      </td>
    );
  };


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
