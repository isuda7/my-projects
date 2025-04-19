import * as React from "react";
import {useEffect, useRef, useState} from "react";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import _ from "lodash";
import Footer from "@/components/common/Footer.tsx";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {useTranslation} from "react-i18next";
import {BatteryUsageHistRequestDto} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import BatteryHistApiService from "@/utils/apiService/battery/BatteryHistApiService.ts";

interface BatteryUsageHistoryModalProps {
  batteryId: string;
}

export default function BatteryUsageHistoryModal(props: BatteryUsageHistoryModalProps) {
  const {t} = useTranslation("translation");

  const COLUMNS: GridHeader[] = [
    {
      field: "createdAt",
      title: t("common.change_datetime"),
      cellType: "dateTime",
      width: 100
    },
    {
      field: "before",
      title: t("battery.before_change"),
      children: [
        {
          field: "beforeUsageType1Name",
          title: t("battery.usage_type1"),
          searchkey: 'beforeUsageType1',
          filterable: true,
          filterType: "select",
          width: "100",
          selectData: [],
          childFilterFields: ['beforeUsageType2Name'],
          onChangeSelect: (e: any) => {
            setBeforeUsageType1(e.value);
          }
        },
        {
          field: "beforeUsageType2Name",
          title: t("battery.usage_type2"),
          searchkey: 'beforeUsageType2',
          width: 100,
          filterable: true,
          filterType: "select",
          selectData: [],
        },
        {
          field: "description",
          title: t("battery.details"),
          filterable: true,
          width: 180,
        },
      ]
    },
    {
      field: "after",
      title: t("battery.after_change"),
      children: [
        {
          field: "usageType1Name",
          title: t("battery.usage_type1"),
          searchkey: 'usageType1',
          filterable: true,
          width: "100",
          filterType: "select",
          selectData: [],
          childFilterFields: ['usageType2Name'],
          onChangeSelect: (e: any) => {
            setUsageType1(e.value);
          }
        },
        {
          field: "usageType2Name",
          title: t("battery.usage_type2"),
          searchkey: 'usageType2',
          width: "100",
          filterable: true,
          filterType: "select",
          selectData: [],
        },
        {
          field: "description",
          width: 180,
          title: t("battery.details"),
          filterable: true,
        },
      ]
    },
    {
      field: "soh",
      title: "SOH",
      width: 100,
      filterable: true,
    },
  ];
  const gridRef = useRef<{ refetchGrid: () => void; }>(null)


  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

  const [usageType1, setUsageType1] = useState<string>('');
  const [beforeUsageType1, setBeforeUsageType1] = useState<string>('');


  const downloadButton = async (params: BatteryUsageHistRequestDto) => {
    //다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
    const excelMap = column.flatMap(v =>
      v.children ? v.children : v
    ).map(v => ({[v.field]: v.title}));
    params = {
      ...params,
      'excelMap': JSON.stringify(excelMap),
      'btryId': props.batteryId
    }

    const result = await BatteryHistApiService().downloadBatteryUsageHist(params);
  }

  const getBatteryUsageHistList = async (params: BatteryUsageHistRequestDto) => {
    const result = await BatteryHistApiService().getBatteryUsageHistByBatteryIdList(props.batteryId, params);
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
      onSearch: getBatteryUsageHistList,
      //deleteButton : deleteNotice,
      downloadButton,
      queryKey: `batteryUsageHistory${props.batteryId}`,
    },
  );
  const setColumnUsageType = (typeData: any[], field: string) => {
    setColumns(prevColumns => {
      const newColumn = _.cloneDeep(prevColumns)
      newColumn.map(v => {
        if (v.field === field) {
          v.selectData = typeData;
        } else if (v?.children) {
          v.children.map(c => {
            if (c.field === field) {
              c.selectData = typeData;
            }
          })
        }
      })
      return newColumn;
    });
  }

  const getUsageType1List = async () => {
    const result = await CodeApiService().getCodesByGroupCode({groupCode: 'BMUT'});

    if (Array.isArray(result.data)) {
      setColumnUsageType(result.data, 'usageType1Name')
      setColumnUsageType(result.data, 'beforeUsageType1Name')
    }
    setUsageType1('');
    setBeforeUsageType1('');
  }
  const getUsageType2List = async (groupCodes: string[], filed: string) => {
    const result = await CodeApiService().getCodesByGroupCodeList({groupCodes: groupCodes});
    if (Array.isArray(result.data)) {
      setColumnUsageType(result.data, filed)
    }

  }

  useEffect(() => {

    getUsageType1List()
  }, [])

  const usagetypelist = ['BMWH', 'BMOEM', 'BMFAC', 'BMSHP', 'BMSVC', 'BMONM', 'BMREP', 'BMDISP'];
  const setUsageTypes2 = (value: string, filed: string) => {
    if (value !== undefined) {
      if (!_.isEmpty(value)) {
        getUsageType2List([`BM${value}`], filed)
      } else {
        getUsageType2List(usagetypelist, filed)
      }

    }
  }
  useEffect(() => {
    setUsageTypes2(usageType1, "usageType2Name")
  }, [usageType1])
  useEffect(() => {
    setUsageTypes2(beforeUsageType1, "beforeUsageType2Name")
  }, [beforeUsageType1])

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
