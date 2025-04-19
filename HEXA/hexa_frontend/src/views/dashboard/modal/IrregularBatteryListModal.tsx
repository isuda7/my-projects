// HEXAADMHOM2P09 : 	[P]진단 배터리  목록

import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {StationFirmwareDto} from "@/utils/apiService/type/station/StationFirmwareDto.ts";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import IrregularApiService from "@/utils/apiService/irregular/IrregularApiService.ts";
import {BatteryDiagnosis} from "@/utils/apiService/type/irregular/BatteryDiagnosisDto.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import _ from "lodash";
import {openDashboardDetail} from "@/utils/common.ts";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import {GridCustomCellProps} from "@progress/kendo-react-grid";
const firstGenerationSlot = [{code: 1, value: "01"},
  {code: 2, value: "02"},
  {code: 3, value: "03"},
  {code: 4, value: "04"},
  {code: 5, value: "05"},
  {code: 6, value: "06"},
  {code: 7, value: "07"},
  {code: 8, value: "08"},
];
const secondGenerationSlot = [{code: 1, value: "01"},
  {code: 2, value: "02"},
  {code: 3, value: "03"},
  {code: 4, value: "04"},
  {code: 5, value: "05"},
  {code: 6, value: "06"},
  {code: 7, value: "07"},
  {code: 8, value: "08"},
  {code: 9, value: "09"},
  {code: 10, value: "10"},
  {code: 11, value: "11"},
  {code: 12, value: "12"},
  {code: 13, value: "13"},
  {code: 14, value: "14"},
  {code: 15, value: "15"},
  {code: 16, value: "16"},
  {code: 17, value: "17"},
  {code: 18, value: "18"},
  {code: 19, value: "19"},
  {code: 20, value: "20"},
  {code: 21, value: "21"},
  {code: 22, value: "22"},
  {code: 23, value: "23"},
  {code: 24, value: "24"},
  {code: 25, value: "25"},
  {code: 26, value: "26"},
  {code: 27, value: "27"},
  {code: 28, value: "28"},
  {code: 29, value: "29"},
  {code: 30, value: "30"},

];
interface Props {
  generation: string;
}
export default function IrregularBatteryListModal({generation}: Props) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);
  const [data, setData] = useState();
  const role = useAppSelector(roleSelector);
  const slotNumList = generation === '1' ? firstGenerationSlot : secondGenerationSlot;

  const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
    const state = {stationId: dataItem.stationId}
    openDashboardDetail(role, generation, state.stationId);
  }

  const [columns, setColumns] = useState<GridHeader[]>([
    {
      field: "generationName",
      title: t('station.generation_type'),
      width: 90,
      align: 'center',
      cell: (props: GridCustomCellProps) => {
        const gen = props.dataItem.generationName;
        return (
            <span className={`flag-${gen?.charAt(0)}`}>{gen}</span>
        );
      }
    },
    {
      field: "batteryId",
      title: t("battery.battery_id"),
      width: 140,
      filterable: true,
      align: 'center',
    },
    {
      field: "stationId",
      title: t("station.station_id"), //"스테이션 ID",
      width: 130,
      filterable: true,
      align: 'center',
      cellClick: (e, dataItem) => cellClickFunction(e, dataItem)
    },
    {
      field: "stationName",
      title: t("station.station_name"), //"스테이션 명",
      width: 140,
      filterable: true,
      align: 'center',
    },
    {
      field: "qrId",
      title: t("station.qr_id"), //"QR ID",
      width: 90,
      filterable: true,
      align: 'center',
    },
    {
      field: "chassisNum",
      title: t("dashboard.device.grid-col.chassis-no"), //,
      filterable: true,
      filterType: "select",
      selectData: generation === '1' ?
          [
            {code: 1, value: "01"},
          ] :
          [
            {code: 1, value: "01"},
            {code: 2, value: "02"},
            {code: 3, value: "03"},
          ],
      width: 90,
      align: "center"
    },
    {
      field: "slotNum",
      title: t('station.slot_no'), //,
      width: 90,
      filterable: true,
      filterType: "select",
      align: 'center',
      selectData: slotNumList,
    },
    {
      field: "irrLevel",
      title: t("irregular.level"), //,
      width: 90,
      filterable: true,
      searchkey: "asType",
      align: 'center',
      filterType: "select",
      selectData: [],
    },
    {
      field: "codeName",
      title: t("irregular.diagnosis_name"), //,
      width: 90,
      filterable: true,
      align: 'center',
    },
    {
      field: "statusName",
      title: t("common.status"), //,
      width: 90,
      align: 'left'
    },
  ]);

  const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDto>>(
    {
      gridHeight: 600,
      columnHeader: columns,
      unsorted: true,
      isReorder: false,
      isResizable: true,
      defaultFilter: true,
      checkKey: "tsId",
      queryKey: "irregularBatteryList",
    },
  );

  const setInitData = async () => {
    // 고장 레벨
    const res2 = await CodeApiService().getCodesByGroupCode({groupCode: 'EMIRLV'});
    const emirlv = res2.data;


    setInitColumn([emirlv]);
  }

  const setInitColumn = (seletData: any[]) => {
    const newColumn = _.cloneDeep(columns);
    newColumn.forEach(v => {
      if (v.field === 'irrLevel') v.selectData = seletData[0];
    })
    setColumns(newColumn);
  }

  useEffect(() => {
    document.body.classList.add("dark");
    setInitData()

    return function cleanup() {
      document.body.classList.remove("dark");
    };
  }, []);


  const getIrregularBatteryList = async (params: BatteryDiagnosis) => {
    params = {
      ...params,
      "status": "OCUR",
      "genCode": `G${generation}`
    }
    const result = await IrregularApiService().getBatteryDiagnosisList(params);
    setData(result.data);
    return result.data;
  }

  const goto = () =>{
    navigate("/irregular/battery/history")
  }


  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: columns,
    })
  }, [columns])

  return (
    <>
      <div className="dialog-box">
        <section className="section">
          <div className="sort-group type-dark">
            <div className="sort-group__counter">
                    <span className="total">
                      {t("grid.total")} <span> {data?.paging?.totalElements || 0}</span>
                    </span>
            </div>
            <div className="group-align-right">
              <Button
                fillMode="flat"
                className="btn-arr-dark"
                onClick={goto}
              >
                배터리 진단 이력
              </Button>
            </div>
          </div>

          <div className="grid-dark">
            <GridCommonComponent
              {...gridProps}
              onSearch={getIrregularBatteryList}
              ref={gridRef}
            />
          </div>
        </section>
      </div>
    </>
  );
}
