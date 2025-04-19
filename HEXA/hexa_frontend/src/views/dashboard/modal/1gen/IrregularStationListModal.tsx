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

export default function IrregularStationListModal() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);
  const [data, setData] = useState();
  const role = useAppSelector(roleSelector);

  const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
    const state = {stationId: dataItem.bssId}
    openDashboardDetail(role, '1', state.stationId);
  }

  const [columns, setColumns] = useState<GridHeader[]>([
    {
      field: "ge",
      title: '세대 구분', //"스테이션 ID",
      width: 90,
      align: 'center',
      cell: (props: GridCustomCellProps) => {
        return (
          <span className={`flag-1`}>{t("battery.first_generation")}</span>
        );
      }
    },

    {
      field: "bssNm",
      title: t("station.station_name"), //"스테이션 명",
      width: 140,
      filterable: true,
      align: 'center',
      cellClick: (e, dataItem) => cellClickFunction(e, dataItem)
    },

    {
      field: "mhrlsTyCd",
      title: t("station.target"),
      width: 100,
      align: "left",
      searchkey: "irrObject",
      filterable: true,
      filterType: "select",
      selectData: [
        {code: "스테이션", value: "스테이션"},
        {code: "슬롯", value: "슬롯"}
      ],
    },
    {
      field: "errKnd",
      title: "레벨", //함체번호,
      width: 90,
      filterable: true,
      filterType: "select",
      align: 'center',
      selectData: [
        {code: "고장", value: "고장"},
        {code: "경고", value: "경고"},
      ],
    },
    {
      field: "errCdNm",
      title: "코드명", //함체번호,
      width: 90,
      filterable: true,
      align: 'center',
    },
    {
      field: "status",
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
      , "status": "발생"
    }

    const result = await IrregularApiService().getBsmsAsList(params);
    setData(result.data);
    return result.data;
  }

  const goto = () =>{
    navigate("/irregular/station/history")
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
