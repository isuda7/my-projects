/**
 * 스테이션 정보 관리 Component
 * URL: /station/info/management
 */

/* React */
import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

/* Kendo UI */
/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";

/* Types */
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {StationFirmwareDto} from "@/utils/apiService/type/station/StationFirmwareDto";
import {StationIdCodeDto} from "@/utils/apiService/type/station/StationIdCodeDto";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import {openDashboardDetail} from "@/utils/common.ts";
import {GridCustomCellProps} from "@progress/kendo-react-grid";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService.ts";
import {station_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";

interface Props {
  generation: string;
  status: string;
}

export default function StationListModal({generation, status}: Props) {
  const {t} = useTranslation();
  const showAlert = useAlert();
  const navigate = useNavigate();
  const role = useAppSelector(roleSelector);
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);
  const [data, setData] = useState();

  const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
    const state = {id: dataItem.id}
    // window.open(`/station/info/management/detail/${state.id}`, '_blank');
    openDashboardDetail(role, generation, state.id);

  }

  const [columns, setColumns] = useState<GridHeader[]>([
    {
      field: "generation",
      title: t('station.generation_type'), //"스테이션 ID",
      width: 120,
      align: 'center',
      cell: (props: GridCustomCellProps) => {
        return (
          <span className={`flag-${props.dataItem.generation}`}>{props.dataItem.generation}세대</span>
        );
      }
    },
    {
      field: "stationId",
      title: t("station.station_id"), //"스테이션 ID",
      width: 120,
      filterable: true,
      align: 'center',
      cellClick: (e, dataItem) => cellClickFunction(e, dataItem)
    },
    {
      field: "stationName",
      title: t("station.station_name"), //"스테이션 명",
      width: 100,
      filterable: true,
      align: 'center',
    },
    {
      field: "qrId",
      title: t("station.qr_id"), //"QR ID",
      width: 100,
      filterable: true,
      align: 'center',
    },

    {
      field: "cityName",
      title: t("station.city_unit"), //"시 단위",
      width: 110,
      filterable: true,
      selectData: [],
      filterType: 'multiSelect',
      cellType: 'select',
    },
    {
      field: "districtName",
      title: t("station.district_unit"), //"구 단위",
      width: 100,
      filterable: true,
      selectData: [],
      filterType: 'multiSelect',
      cellType: 'select',
      align: 'center',
    },

    {
      field: "stationStatus",
      title: t("station.station_status"), //"스테이션상태",
      width: 100,
      filterType: 'select',
      cellType: 'select',
      cell: (props: GridCustomCellProps) => {

        const str = props.dataItem.isDisconnect ? 'DISCONNECTION' : props.dataItem.stationStatus;
        let style = `mark-${station_status[str]}`;

        return (
          <span className={style}>{t(`dashboard.bss-status.${str}`)}</span>
        );
      }
    },

  ])

  const getStationInfoList = async (params: any) => {
    const requestParams = {
      ...params,
      "generation": generation,
      "stationStatus": status
    }
    const result = await DashboardApiService().searchStationList(requestParams);
    setData(result.data);
    return result.data;
  }

  const gridInfoMessage = () =>
    <span className="c-red">
			{/* ※ 스테이션내에서 펌웨어 버전이 상이한 상태입니다. */}
      {t("station.station_firmware_version_alert")}
		</span>

  const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDto>>(
    {
      gridHeight: 600,
      columnHeader: columns,
      unsorted: true,
      isReorder: false,
      isResizable: true,
      defaultFilter: true,
      checkKey: "tsId",
      queryKey: "stationInfoModal",
      gridInfoMessage,
    },
  );

  const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

  /**
   * Select Data 전체 호출 및 세팅
   * @returns
   */
  const setInitData = async () => {

    //시코드 호출
    let citys: any[] = [];
    const res2 = await StationApiService().getCityList();
    if (Array.isArray(res2?.data)) citys = res2?.data?.map(v => ({code: v.cityCode, value: v.cityName}))

    //구 코드
    let districts: any[] = [];
    const resData = await StationApiService().getStationCodeList({page: 0, size: 9999});
    if (resData.data && Array.isArray(resData?.data?.content)) {
      districts = (resData.data.content as StationIdCodeDto[]).map((v: StationIdCodeDto) => ({
        code: v.districtCode,
        value: v.districtName
      }))
    }

    //스테이션 상태(SMSTA)
    const res5 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMSTA'});
    const smsta = res5.data;

    setInitColumn([citys, districts, smsta])
  }


  /**
   * 초기 조회한 SelectData를 세팅
   * @param seletData
   */
  const setInitColumn = (seletData: any[]) => {
    const newColumn = _.cloneDeep(columns);
    newColumn.forEach(v => {
      if (v.field === 'cityCode') v.selectData = seletData[0];
      if (v.field === 'districtCode') v.selectData = seletData[1];
      if (v.field === 'statusCode') v.selectData = seletData[2];
    })
    setColumns(newColumn);
  }

  useEffect(() => {
    setInitData();
    document.body.classList.add("dark");

    return function cleanup() {
      document.body.classList.remove("dark");
    };
  }, [])

  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: columns,
    })
  }, [columns])


  return (
    <>

      <div className="dialog-box pop-l">
        <section className="section">
          <div className="sort-group type-dark">
            <div className="sort-group__counter">
                    <span className="total">
                      {t("grid.total")} <span> {data?.paging?.totalElements || 0}</span>
                    </span>
            </div>
          </div>
          <div className="grid-dark">
            <GridCommonComponent
              {...gridProps}
              onSearch={getStationInfoList}
              ref={gridRef}
            />
          </div>
        </section>
      </div>
    </>
  );
}
