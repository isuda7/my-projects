import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import BatteryApiService from "@/utils/apiService/battery/BatteryApiService.ts";
import {BatteryRequestDto} from "@/utils/apiService/type/battery/BatteryRequestDto.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import _ from "lodash";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import {useTranslation} from "react-i18next";
import ExcelDownloadModal from "./modal/ExcelDownloadModal";
import {useMutation} from "@tanstack/react-query";
import {UploadFileInfo} from "@progress/kendo-react-upload";
import BatteryInfoExcelUpload from "@/views/battery/modal/BatteryInfoExcelUpload.tsx";


export default function BatteryInfoList() {
  const {t} = useTranslation();

  const cellClickFunction = (e: any, dataItem: any) => {
    navigate('/battery/info/detail', {state: dataItem.id});
  };

  const COLUMNS: GridHeader[] = [
    {
      field: "id",
      title: t("battery.battery_id"),
      filterable: true,
      width: "120",
      cellClick: cellClickFunction,
      cellTypeProps: {
        link: true,
      },
    },
    {
      field: "hwVersion",
      title: t("battery.hw_version"),
      width: 100,
      filterable: true,
    },
    {
      field: "bmsVersion",
      title: t("battery.bms_version"),
      width: 100,
      filterable: true,
    },
    // {
    //   field: "versionReleasedAt",
    //   title: t("battery.bms_update_datetime"),
    //   width:"120",
    //   cellType: "dateTime"
    // },
    {
      field: "usageType1Name",
      title: t("battery.usage_type1"),
      width: 100,
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
      width: 100,
      searchkey: 'usageType2',
      filterable: true,
      filterType: "select"
    },
    {
      field: "stationId",
      title: t("station.station_id"),
      width: 100,
      hidden: true,
    },
    {
      field: "stationName",
      title: t("station.station_name"),
      width: 100,
      filterable: true,
    },
    {
      field: "vehicleId",
      title: t("battery.vehicle_id"),
      width: 100,
      filterable: true,
    },
    {
      field: "updatedAt",
      title: t("common.change_datetime"),
      width: 100,
      align: "left",
      cellType: "dateTime", //cellType이 'dateTime'일경우 YYYY-MM-DD HH:mm:ss 형식으로 반환
    },
    {
      field: "updatedUserId",
      title: t("common.modifier_id"),
      width: 100,
      filterable: true,
    },
    {
      field: "createdAt",
      title: t("common.registration_datetime"),
      width: 100,
      align: "left",
      cellType: "dateTime",
    },
    {
      field: "createdUserId",
      title: t("common.registration_id"),
      width: 100,
      filterable: true,
    },
  ];

  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void, getSearchParams: () => any[]  }>(null)

  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);

  const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

  const [usageType1, setUsageType1] = useState<String>();

  const addButton = () => {
    navigate("/battery/info/add");
  };

  const downloadButton = () => {
    setDownloadModalOpen(true);
  }
  const uploadButton = () => {
    setUploadModalOpen(true);
  }

  const onExcelDownload = async (downloadReason: any) => {
    let params = gridRef?.current ? gridRef.current.getSearchParams() : [];
    const excelMap = column.filter((col: any) => col.field !== "stationId").map(v => ({[v.field]: v.title}));
    params = {
      ...params,
      'excelMap': JSON.stringify(excelMap)
    }
    await BatteryApiService().downloadList(downloadReason, params);
    setDownloadModalOpen(false);
  }

  const getBatteryList = async (params: BatteryRequestDto) => {
    const result = await BatteryApiService().getBatteryList(params);
    return result.data
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

      addButton,
      onSearch: getBatteryList,
      //deleteButton : deleteNotice,
      downloadButton,
      uploadButton,
      queryKey: "batteryInfo",
    },
  );
  const setColumnUsageType = (typeData: any[], field: string) => {
    const newColumn = _.cloneDeep(column)
    newColumn.map(v => {
      if (v.field === field) v.selectData = typeData;
    })
    setColumns(newColumn);
  }


  useEffect(() => {
    const getUsageType1List = async () => {
      const result = await CodeApiService().getCodesByGroupCode({groupCode: 'BMUT'});
      if (Array.isArray(result.data)) {
        await setColumnUsageType(result.data, 'usageType1Name')
      }
      setUsageType1('');
    }
    getUsageType1List()
  }, [])

  useEffect(() => {
    const usagetypelist = ['BMWH', 'BMOEM', 'BMFAC', 'BMSHP', 'BMSVC', 'BMONM', 'BMREP', 'BMDISP'];

    const getUsageType2List = async (groupCodes: string[]) => {
      const result = await CodeApiService().getCodesByGroupCodeList({groupCodes: groupCodes});
      if (Array.isArray(result.data)) {
        setColumnUsageType(result.data, 'usageType2Name');
      }
    }
    if (usageType1 !== undefined) {
      if (!_.isEmpty(usageType1)) {
        getUsageType2List([`BM${usageType1}`])
      } else {
        getUsageType2List(usagetypelist)
      }
    }
  }, [usageType1])

  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: column,
    })
  }, [column])

  const onCloseModal = () => {
		setDownloadModalOpen(false);
	}

  const bulkUploadCompleteHandle = () => {
    if(gridRef.current){
      gridRef.current.refetchGrid();
    }
  }

  return (
    <>
      <div className="contents">
        <div className="content">
          <Header headName={"배터리 정보 관리"}/>
          <GridCommonComponent
            {...gridProps}
            ref={gridRef}
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
      {uploadModalOpen &&
        <BatteryInfoExcelUpload
          setUploadModalOpen={setUploadModalOpen}
          completeHandle={bulkUploadCompleteHandle}
        />
      }
    </>
  );
}
