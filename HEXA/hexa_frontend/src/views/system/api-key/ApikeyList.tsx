/** React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import Header from "@/new_components/common/Header.tsx";

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { SearchApikeyDto } from "@/utils/apiService/type/system/apikey/ApikeyRequestDto";
import { ApikeyResponseDto } from "@/utils/apiService/type/system/apikey/ApikeyResponseDto";
import ApikeyApiService from "@/utils/apiService/ApikeyApiService";
import useAlert from "@/hooks/useAlert";


export default function ApikeyList() {
  const { t } = useTranslation();
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);


  const cellClickFunction = (e: any, dataItem: any) => {
    navigate(`/system/api-key/detail`, { state: dataItem.tsid })
  }

  const [columns, setColumns] = useState<GridHeader[]>([

    {
      field: "systemId",
      title: t('api_key.system_id'), // "시스템ID"
      width: 140,
      filterable: true,
      cellClick: cellClickFunction,
    },
    {
      field: "systemName",
      title: t('api_key.system_name'), // "시스템명"
      width: 140,
      filterable: true,
    },
    {
      field: "apikey",
      title: t('api_key.api_key'), // "API Key"
      width: 140,
      filterable: true,
      align: 'center',
    },
    {
      field: "password",
      title: t('common.password'), // "비밀번호"
      width: 140,
      filterable: true,
    },
    {
      field: "updatedAt",
      title: t("common.modification_datetime"), //"수정일시",
      cellType: "dateTime",
      width: 100,
    },
    {
      field: "updatedUserId",
      title: t("common.modifier_id"), //"수정자 ID",
      filterable: true,
      width: 120,
    },
    {
      field: "createdAt",
      title: t("common.registration_datetime"), //"등록일시",
      cellType: "dateTime",
      width: 100,
      align: 'center',
    },
    {
      field: "createdUserId",
      title: t("common.registration_id"), //"등록자 ID",
      filterable: true,
      width: 120,
    },
  ])

  const getApikeyList = async (params: SearchApikeyDto) => {
    const result = await ApikeyApiService().getApikeyList(params);
    console.log("data:", JSON.stringify(result.data, null, 2));
    return result.data;
  }

  const addButton = () => {
    navigate("/system/api-key/add")
  }

  const downloadButton = async (params: SearchApikeyDto) => {
    const excelMap = columns.map(v => ({[v.field]: v.title}));
    console.log('excelMap', excelMap);
    params = {
      ...params,
      "excelMap": JSON.stringify(excelMap)
    }
    const result = await ApikeyApiService().downloadExcel(params);
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<ApikeyResponseDto>>(
    {
      gridHeight: 550,
      columnHeader: columns,
      defaultFilter: true,
      sortableGrid: true,
      unsorted: true,
      multipleSorting: true,
      isReorder: true,
      isResizable: true,
      girdToolBar: true,
      //gridData: [], // Correctly initialized as an empty array of User type
      displayCount: [20, 50, 100],
      isFilterResetButton: true,
      isGridResetButton: true,
      isColumnSelectShowButton: true,
      checkKey: "id",
      queryKey: "notice-list",
      addButton,
      downloadButton,
    },
  );

  const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: columns,
    })
  }, [columns])

  return (
    <>
      {/* API Key 관리 */}
      <Header headName={t('api_key.api_key_management')} />
      <GridCommonComponent
        {...gridProps}
        onSearch={getApikeyList}
        ref={gridRef}
      />
    </>
  );
}
