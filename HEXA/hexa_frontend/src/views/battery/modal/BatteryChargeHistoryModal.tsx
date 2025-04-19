import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import Footer from "@/components/common/Footer.tsx";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {useTranslation} from "react-i18next";
import {BatteryChargeHistRequestDto} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import BatteryHistApiService from "@/utils/apiService/battery/BatteryHistApiService.ts";
import {BatteryChrgHistResponseDto} from "@/utils/apiService/type/battery/BatteryHistResponseDto.ts";

interface BatteryUsageHistoryModalProps {
  batteryId: string;
}

export default function BatteryChargeHistoryModal(props: BatteryUsageHistoryModalProps) {
  const {t} = useTranslation();

  const cellClickFunction = (e: any, dataItem: any) => {
    navigate(`./${dataItem.id}`);
  };

  const COLUMNS: GridHeader[] = [
    {
      field: "btryId",
      title: t("battery.category"),
      filterable: true,
      width: 120
    },
    {
      field: "profileId",
      title: t("battery.profile_id"),
      filterable: true,
      width: 120
    },

    {
      field: "chargeStartTime",
      title: t("battery.charging_start_datetime"),
      cellType: "dateTime",
      width: 130

    },
    {
      field: "chargeEndTime",
      title: t("battery.charging_end_datetime"),
      cellType: "dateTime",
      width: 130

    },
    {
      field: "chargeTime",
      title: t("battery.charging_duration"),
      cellType: "time",
      width: 100
    },
    {
      field: "totalReChargeCount",
      title: t("battery.recharge_accumulated_count"),
      width: 130
    },
    {
      field: "totalNormalChargeCount",
      title: t("battery.normal_charge_accumulated_count"),
      width: 130
    },
    {
      field: "totalChargeCount",
      title: t("battery.total_charging_count"),
      width: 130
    },
  ];
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);
  const [data, setData] = useState<BatteryChrgHistResponseDto[]>([]);


  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

  const downloadButton = async (params: BatteryChargeHistRequestDto) => {
    //다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
    const excelMap = column.map(v => ({[v.field]: v.title}));
    params = {
      ...params,
      'excelMap': JSON.stringify(excelMap)
    }
    const result = await BatteryHistApiService().downloadBatteryChargeHist(params);
  }

  const getBatteryChargeHistList = async (params: BatteryChargeHistRequestDto) => {
    const result = await BatteryHistApiService().getBatteryChargeHistByBatteryIdList(props.batteryId, params);
    setData(result.data.content);
    return result.data
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<BatteryResponseDto>>(
    {
      gridHeight: 400, //그리드 높이
      columnHeader: column, //column 헤더 설정, 상단 defaultColumn 참고
      defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
      sortableGrid: true, //전체 정렬여부
      unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
      multipleSorting: false, //다중 컬럼 sorting 여부
      isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부
      isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
      checkKey: "id", //Table의 PK컬럼 필드, default: id
      //rowSelectable: true, //행 선택 가능 여부
      //isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
      headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      isFilterResetButton: true, //필터 리셋버튼 생성여부
      isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부(TODO: 오류 수정중)
      isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부(TODO: 오류 수정중)

      onSearch: getBatteryChargeHistList,
      //deleteButton : deleteNotice,
      downloadButton: downloadButton,
      queryKey: "batteryChargeHistory",
    },
  );


  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: column,
    })
  }, [column])

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
                    <dt>{t("battery.battery_id")} :</dt>
                    <dd>{props.batteryId}</dd>
                  </div>
                  <div>
                    <dt>{t("battery.total_charging_count")} :</dt>
                    <dd>{data.length > 0 ? data[0].totalChargeCount : 0}</dd>
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
