import {MouseEvent, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {useTranslation} from "react-i18next";
import {BatteryRsrvHistRequestDto} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import BatteryHistApiService from "@/utils/apiService/battery/BatteryHistApiService.ts";
import DateRange, {DateRangeProps} from "@/components/common/DateRange.tsx";
import ExcelDownloadModal from "../modal/ExcelDownloadModal";

export default function BatteryRsrvHistoryList() {
  const {t} = useTranslation();

  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);

  const COLUMNS: GridHeader[] = [
    {field: "reservationStartedAt", title: t("battery.reservation_datetime"), cellType: "dateTime"},
    {field: "btryId", title: t("battery.battery_id"), filterable: true},
    {field: "rsrvId", title: t("battery.reservation_id"), filterable: true},
    {field: "vehicleId", title: t("battery.vehicle_id"), filterable: true},
    {field: "stationId", title: t("station.station_id"), filterable: true},
    {field: "stationName", title: t("station.station_name"), filterable: true},
    {field: "reserveStatusName", title: t("battery.reservation_status"), filterable: true},
  ];

  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void, getSearchParams: () => any[]  }>(null);

  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

  const downloadButton = () => {
    setDownloadModalOpen(true);
  }

  const onExcelDownload = async (downloadReason: any) => {
    let params = gridRef?.current ? gridRef.current.getSearchParams() : [];

    const excelMap = column.flatMap(v =>
        v.children ? v.children : v
    ).map(v => ({[v.field]: v.title}));

    params = {
      ...params,
      'excelMap': JSON.stringify(excelMap)
    }
    await BatteryHistApiService().downloadBatteryRsrvHist(downloadReason, params);
    setDownloadModalOpen(false);
  };

  const getBatteryRsrvHistList = async (params: BatteryRsrvHistRequestDto) => {
    const result = await BatteryHistApiService().getBatteryRsrvHistList(params);
    return result.data;
  };

  const [gridProps, setGridProps] = useState<CommonGridProps<BatteryResponseDto>>({
    gridHeight: 500,
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

  const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)), //시작일자 초기값
    endDate: new Date(), //종료일자 초기값
    format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
    allFlag: false,
    type: 'date',
    initState: 'week'
  });

  const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

  const onCloseModal = () => {
    setDownloadModalOpen(false);
  }

  const initRsrvStatusCode = () =>{
    // SMRSV
  }

  return (
    <>
      <div className="contents">
        <div className="content">
          <Header headName={"배터리 예약 이력"}/>

          <DateRange
            setDateRangeProps={setDateRangeProps}
            dateRangeProps={dateRangeProps}
            searchEvent={searchEvent}
          />

          <GridCommonComponent
            {...gridProps}
            ref={gridRef}
            searchParams={{
              startAt: dateRangeProps?.startDate,
              endAt: dateRangeProps?.endDate,
              allFlag: dateRangeProps.allFlag,
            }}
          />
        </div>
      </div>
      {
        downloadModalOpen &&
        <ExcelDownloadModal
          onClose={onCloseModal}
          setModalData={onExcelDownload}
        />
      }
    </>
  );
}