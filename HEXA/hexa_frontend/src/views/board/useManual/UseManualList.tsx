/** React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert.tsx";

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import Footer from "@/components/common/Footer.tsx";
import { SearchManual } from "@/utils/apiService/type/board/UseManualRequestDto";
import UseManualApiService from "@/utils/apiService/board/UseManualApiService";
import { UseManualResponseDto } from "@/utils/apiService/type/board/UseManualResponseDto";
import { GridCellProps } from "@progress/kendo-react-grid";
import CustomCellFile from "../notice/components/CustomCellFile";
import _ from "lodash";

export default function UseManualList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);


  const cellClickFunction = (e: any, dataItem: any) => {
    navigate(`/board/use-manual/admin/detail`, { state: dataItem.id })
  }

  const downLoadFile = async (dataItem: any) => {
    console.log('downLoadFile')
    const result = await UseManualApiService().fileDownload(dataItem.id);
  }

  const [columns, setColumns] = useState<GridHeader[]>([

    {
      field: "id",
      title: "공지사항 ID",
      hidden: true
    },
    {
      field: "category",
      title: t('common.category'), // "구분"
      width: 100,
      searchkey: 'category',
      filterable: true,
      filterType: "select",
      selectData: [
        { code: "사용자 매뉴얼", value: t('board.user_manual') },
        { code: "운영자 매뉴얼", value: t('board.operator_manual') },
      ],
    },
    {
      field: "title",
      title: t('board.title'), // "제목"
      width: 240,
      filterable: true,
      cellClick: cellClickFunction,
    },
    {
      field: "usFile",
      title: t('board.attached_file'), // "첨부파일"
      width: 240,
      filterable: false,
      cell: (props: any) => <CustomCellFile
                              {...props}
                              onClick = {downLoadFile}
                            />
    },
    {
      field: "updatedAt",
      title: t("common.modification_datetime"), //"수정일시",
      cellType: "dateTime",
      width: 100,
      align: 'center',
    },
    {
      field: "updatedUserId",
      title: t("common.modifier_id"), //"수정자 ID",
      filterable: true,
      width: 100,
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
      width: 100,
    },
  ])

  const getUseManualList = async (params: SearchManual) => {
    const result = await UseManualApiService().getUseManualList(params);
    console.log('데이터: ', result.data);
    return result.data;
  }

  const addButton = () => {
    navigate("/board/use-manual/admin/add")
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<UseManualResponseDto>>(
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
      queryKey: "useManual-list",

      onSearch: getUseManualList,
      addButton
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

  const buttonList = [
    <Button
      type={'button'}
      size={"medium"}
      themeColor={"primary"}
      className="btn-in-icon"
      onClick={() => navigate("/board/use-manual/add")}>
      신규등록
      <i className="icon icon-new-add" />
    </Button>,
  ]

  return (
    <>
      {/* 사용자 매뉴얼 */}
      <Header headName={t('board.user_manual')} />
      <GridCommonComponent
        {...gridProps}
        ref={gridRef}
      />
    </>
  );
}
