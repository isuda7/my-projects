/** React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import Header from "@/new_components/common/Header.tsx";

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import CustomPeriodCell from "./components/CustomPeriodCell";
import { SearchDto } from "@/utils/apiService/type/board/NoticeDto";
import NoticeApiService from "@/utils/apiService/board/NoticeApiService";
import { NoticeResponseDto } from "@/utils/apiService/type/board/NoticeResponseDto";
import CustomCellTitle from "./components/CustomCellTitle";


export default function NoticeList() {
  const { t } = useTranslation();
  // const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);


  const cellClickFunction = (dataItem: any) => {
    navigate(`/board/notice/detail` , {state: {id: dataItem.id}})
  }

  const [columns, setColumns] = useState<GridHeader[]>([

    {
      field: "id",
      title: "공지사항 ID",
      hidden: true
    },
    {
      field: "title",
      title: t('board.title'), // "제목"
      width: 240,
      filterable: true,
      cell: (props: any) => <CustomCellTitle 
                              {...props} 
                              onClick={cellClickFunction} 
                            />,
    },
    {
      field: "showPopup",
      title: t('board.popup_status'), // "팝업 여부"
      width: 80,
      filterable: true,
      selectData: [
        { code: true, value: 'Y' },
        { code: false, value: 'N' },
      ],
      filterType: 'select',
      align: 'center',
      cell: (props: any) => <CustomRepresentativeCell {...props} />,
    },
    {
      field: "postStartDate",
      title: t('board.posting_period'), // "게시기간"
      width: 200,
      cell: (props: any) => <CustomPeriodCell {...props} />,
      align: 'center',
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
    }
  ])

  const getNoticeList = async (params: SearchDto) => {
    const result = await NoticeApiService().getNoticeList(params);
    return result.data;
  }

  const addButton = () => {
    navigate("/board/notice/admin/add")
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<NoticeResponseDto>>(
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
        {/* 공지사항 */}
        <Header headName={t('board.notice')}/>
        <GridCommonComponent
          {...gridProps}
          onSearch={getNoticeList}
          ref={gridRef}
        />
      </>
    );
  }
