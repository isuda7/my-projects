import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import _ from "lodash";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {useTranslation} from "react-i18next";
import {BatteryUsageHistRequestDto} from "@/utils/apiService/type/battery/BatteryHistRequestDto.ts";
import BatteryHistApiService from "@/utils/apiService/battery/BatteryHistApiService.ts";
import DateRange, {DateRangeProps} from "@/components/common/DateRange.tsx";
import BatteryInfoExcelDownloadModal from "../modal/ExcelDownloadModal";


export default function BatteryUsageHistoryList() {
  const {t} = useTranslation();

  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);

  const COLUMNS: GridHeader[] = [
    {
      field: "createdAt",
      title: t("common.change_datetime"),
      cellType: "dateTime",
    },
    {
      field: "btryId",
      title: t("battery.battery_id"),
      filterable: true,
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
          width: 120,
          filterable: true,
          filterType: "select",
          selectData: [],
        },
        {
          field: "beforeDescription",
          title: t("battery.details"),
          filterable: true,
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
          width: 120,
          filterable: true,
          filterType: "select",
          selectData: [],
        },
        {
          field: "description",
          title: t("battery.details"),
          filterable: true,
        },
      ]
    },
    {
      field: "soh",
      title: "SOH",
      filterable: true,
    },
  ];
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void, getSearchParams: () => any[]  }>(null)


  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

  const [usageType1, setUsageType1] = useState<string>('');
  const [beforeUsageType1, setBeforeUsageType1] = useState<string>('');

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
    await BatteryHistApiService().downloadBatteryUsageHist(downloadReason, params);
    setDownloadModalOpen(false);
  }

  const getBatteryUsageHistList = async (params: BatteryUsageHistRequestDto) => {
    const result = await BatteryHistApiService().getBatteryUsageHistList(params);
    return result.data;
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<BatteryResponseDto>>(
    {
      gridHeight: 500, //그리드 높이
      columnHeader: column, //column 헤더 설정, 상단 defaultColumn 참고
      defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
      sortableGrid: true, //전체 정렬여부
      unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
      multipleSorting: false, //다중 컬럼 sorting 여부
      isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부
      isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
      checkKey: "id", //Table의 PK컬럼 필드, default: id
      headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      isFilterResetButton: true, //필터 리셋버튼 생성여부
      isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부
      isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부
      onSearch: getBatteryUsageHistList,
      downloadButton,
      queryKey: "batteryUsageHistory",
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
    // const result = await CodeApiService().getCodesByGroupCode({groupCode: `BM${usageType1}`});
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
          <Header headName={"배터리 사용 변경 이력"}/>

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
        <BatteryInfoExcelDownloadModal
          onClose={onCloseModal}
          setModalData={onExcelDownload}
        />
      }
    </>
  );
}
