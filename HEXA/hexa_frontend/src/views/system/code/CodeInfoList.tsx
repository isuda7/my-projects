/** React */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert";

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { SearchCodes } from "@/utils/apiService/type/system/code/CodeRequestDto.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import { CodeResponseDto } from "@/utils/apiService/type/system/code/CodeResponseDto.ts";
import _ from "lodash";


export default function CodeInfoList() {
  console.log('CodeInfoList');
  const { t } = useTranslation();
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);
  // const [selected, setSelected] = React.useState<number>(0);

  const cellClickFunction = (e: any, dataItem: any) => {
    const state = { code: dataItem.code, groupCode: dataItem.groupCode }
    navigate(`/system/code/common/detail`, { state })
  }

  const yesOrNo = [
    { code: true, value: 'Y' },
    { code: false, value: 'N' }
  ];

  const [columns, setColumns] = useState<GridHeader[]>([

    {
      field: "groupCode",
      title: t('system_code.group_code_id'), // "그룹 코드ID"
      width: 140,
      filterable: true
    },
    {
      field: "gcValue",
      title: t('system_code.group_code_name'), // "그룹 코드명"
      width: 140,
      filterable: true,
      searchkey: "gcValue",
      filterType: "select",
      selectData: [],
      cellTypeProps: {
        array: true
      }
    },
    {
      field: "code",
      title: t('system_code.common_code_id'), // "공통 코드ID"
      width: 140,
      filterable: true,
      cellClick: cellClickFunction,
    },
    {
      field: "value",
      title: t('system_code.common_code_name'), // "공통 코드명"
      width: 140,
      filterable: true,
      searchkey: "value",
      filterType: "select",
      selectData: [],
      cellTypeProps: {
        array: true
      }
    },
    {
      field: "codeEng",
      title: t('system_code.common_code_name_eng'), // "공통 코드명(영문)"
      width: 140,
      filterable: true
    },
    {
      field: "description",
      title: t('common.description'), // "설명"
      width: 140,
      filterable: true
    },
    {
      field: "isUse",
      title: t('station.is_use'), //"사용 여부",
      width: 80,
      filterable: true,
      selectData: yesOrNo,
      align: 'center',
      filterType: 'select',
      cell: (props: any) => <CustomRepresentativeCell {...props} />,
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
    },
    {
      field: "createdUserId",
      title: t("common.registration_id"), //"등록자 ID",
      filterable: true,
      width: 120,
    },
  ])

  const [gcValues, setGcValues] = useState<string>('');
  const [cValues, setCValues] = useState<string>('');

  const setInitColumn = (selectData: any[]) => {

    const newColumn = _.cloneDeep(columns);

    newColumn.forEach(v => {
      if (v.field === 'value') v.selectData = selectData[0];
      if (v.field === 'gcValue') v.selectData = selectData[1];
    })
    setColumns(newColumn);
  }

  const getCodeInfoList = async (params: SearchCodes) => {
    console.log('파라미터: ', params);
    const result = await CodeApiService().getCommonCodes(params);
    console.log("data:", JSON.stringify(result.data, null, 2));

    return result.data;
  }

  const addButton = () => {
    navigate("/system/code/common/add");
  }

  const downloadButton = async (params: SearchCodes) => {
    const excelMap = columns.map(v => ({[v.field]: v.title}));
    console.log('excelMap', excelMap);
    params = {
      ...params,
      "excelMap": JSON.stringify(excelMap)
    }
    const result = await CodeApiService().downloadExcel(params);
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<CodeResponseDto>>(
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
      queryKey: "common-code-list",
      addButton,
      downloadButton
    },
  );

  const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

  useEffect(() => {
    const getCodeValues = async () => {
      console.log('selectBoxData');
      let codeNames: any[] = [];
      let groupCodeNames: any[] = [];
      const res = await CodeApiService().getValues();
      const res2 = await CodeApiService().getGcValues();
      // 
      // 배열 변환
      codeNames = Array.isArray(res.data)
        ? res.data.map(v => ({ code: v.value, value: v.value }))
        : []; // res.data가 배열이 아닌 경우 빈 배열로 처리

      groupCodeNames = Array.isArray(res2.data)
        ? res2.data.map(v => ({ code: v.value, value: v.value }))
        : [];

      console.log('codeNames', codeNames);
      console.log('groupCodeNames', groupCodeNames);

      setCValues('');
      setGcValues('');

      await setInitColumn([codeNames, groupCodeNames]);
    }
    getCodeValues();
  }, []);

  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: columns,
    })
  }, [columns])

  return (
    <>
      {/* 공통 코드 */}
      <Header headName={t('system_code.common_code')} />
      <GridCommonComponent
        {...gridProps}
        onSearch={getCodeInfoList}
        ref={gridRef}
      />
    </>
  );
}