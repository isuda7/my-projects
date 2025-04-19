// HEXAADMHOM2P08 : 	[P]진단 스테이션 목록 - 2세대

import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import {Input} from "@progress/kendo-react-inputs";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {StationFirmwareDto} from "@/utils/apiService/type/station/StationFirmwareDto.ts";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import IrregularApiService from "@/utils/apiService/irregular/IrregularApiService.ts";
import {openDashboardDetail} from "@/utils/common.ts";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import {GridCustomCellProps} from "@progress/kendo-react-grid";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import _ from "lodash";

export default function IrregularStationListModal() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);
  const [data, setData] = useState();
  const [irrTarget, setIrrTarget] = useState<string>('');
  const [irrLevel, setIrrLevel] = useState<string>('');
  const role = useAppSelector(roleSelector);

  const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
    const state = {stationId: dataItem.stationId}
    console.log('state', state);
    console.log('dataItem', dataItem);
    openDashboardDetail(role, '2', state.stationId);
  }

  const [columns, setColumns] = useState<GridHeader[]>([
    {
      field: "ge",
      title: '세대 구분', //"스테이션 ID",
      width: 90,
      align: 'center',
      cell: (props: GridCustomCellProps) => {
        return (
          <span className={`flag-2`}>{t("battery.second_generation")}</span>
        );
      }
    },
    {
      field: "stationId",
      title: t("station.station_id"), //"스테이션 ID",
      width: 140,
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
      field: "irrObject",
      title: t("대상"),
      width: 100,
      align: "left",
      searchkey: "irrObject",
      filterable: true,
      filterType: "select",
      selectData: [],
    },
    {
      field: "chassisNum",
      title: "함체번호", //함체번호,
      width: 90,
      filterable: true,
      align: 'center',
    },
    {
      field: "slotNum",
      title: "슬롯번호", //함체번호,
      width: 90,
      filterable: true,
      filterType: "select",
      selectData: [
        {code: 1, value: "01"},
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
      ],
      align: 'center',
    },
    {
      field: "irrLevel",
      title: "레벨", //함체번호,
      width: 90,
      filterable: true,
      filterType: "select",
      selectData: [],
      align: 'center',
    },
    {
      field: "codeName",
      title: "코드명", //함체번호,
      width: 90,
      filterable: true,
      align: 'center',
    },
    {
      field: "statusName",
      title: "상태", //함체번호,
      width: 90,
      align: 'center',
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
      queryKey: "irregularStationList",
    },
  );

  React.useEffect(() => {
    document.body.classList.add("dark");

    return function cleanup() {
      document.body.classList.remove("dark");
    };
  }, []);

  const getIrregularList = async (params: any) => {
    params = {
      ...params
      , "status": "OCUR"
    }

    const result = await IrregularApiService().getIrregularList(params);
    setData(result.data);
    return result.data;
  }

  const goto = () =>{
    navigate("/irregular/station/history")
  }

  const setInitData = async () => {
    // 고장 대상
    const res = await CodeApiService().getCodesByGroupCode({ groupCode: 'EMIROJ' });
    const emiroj = res.data;

    // 고장 레벨
    const res2 = await CodeApiService().getCodesByGroupCode({ groupCode: 'EMIRLV' });
    const emirlv = res2.data;


    setIrrTarget('');
    setIrrLevel('');
    setInitColumn([emiroj, emirlv]);
  }

  const setInitColumn = (seletData: any[]) => {
    const newColumn = _.cloneDeep(columns);
    newColumn.forEach(v => {
      if (v.field === 'irrObject') v.selectData = seletData[0];
      if (v.field === 'irrLevel') v.selectData = seletData[1];
    })
    setColumns(newColumn);
  }

  useEffect(() => {

    setInitData()
  }, [])

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
                {t("irregular.station_irregular_history")}
              </Button>
            </div>
          </div>

          <div className="grid-dark">
            <GridCommonComponent
              {...gridProps}
              onSearch={getIrregularList}
              ref={gridRef}
            />
          </div>
        </section>
      </div>
    </>
  );
}
