/** React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import Header from "@/new_components/common/Header.tsx";

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { SearchUsingManual } from "@/utils/apiService/type/board/UseManualRequestDto";
import UseManualApiService from "@/utils/apiService/board/UseManualApiService";
import { UseManualResponseDto } from "@/utils/apiService/type/board/UseManualResponseDto";
import CustomCellFile from "../notice/components/CustomCellFile";
import useAlert from "@/hooks/useAlert";

export default function UserUseManualList() {
    const { t } = useTranslation();
    // const showAlert = useAlert();
    const navigate = useNavigate();
    const showAlert = useAlert();
    const gridRef = useRef<{ refetchGrid: () => void; }>(null);

    const downloadFile = async (dataItem: any) => {
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
            field: "title",
            title: t('board.title'), // "제목"
            width: 500,
            filterable: true,
        },
        {
            field: "usFile",
            title: t('board.attached_file'), // "첨부파일"
            width: 350,
            filterable: false,
            cell: (props: any) => <CustomCellFile
                              {...props}
                              onClick = {downloadFile}
                            />
        },
        {
            field: "createdAt",
            title: t("common.registration_datetime"), //"등록일시",
            cellType: "dateTime",
            width: 200,
            filterable: false,
            align: 'center',
        }
    ])

    const getUseManualList = async (params: SearchUsingManual) => {
        const result = await UseManualApiService().getUsingManual(params);
        console.log("data:", JSON.stringify(result.data, null, 2));
        return result.data;
    }

    const [gridProps, setGridProps] = useState<CommonGridProps<UseManualResponseDto>>(
        {
            gridHeight: 550,
            columnHeader: columns,
            defaultFilter: true,
            sortableGrid: true,
            unsorted: true,
            multipleSorting: true,
            isReorder: false,
            isResizable: true,
            girdToolBar: true,
            //gridData: [], // Correctly initialized as an empty array of User type
            displayCount: [20, 50, 100],
            // isFilterResetButton: true,
            // isGridResetButton: true,
            // isColumnSelectShowButton: true,
            checkKey: "id",
            queryKey: "useManual-list",

            onSearch: getUseManualList
        },
    );

    useEffect(() => {
        setGridProps({
            ...gridProps,
            columnHeader: columns,
        })
    }, [columns])

    return (
      <>
        <Header headName={t('board.user_manual')}/>
        <GridCommonComponent
          {...gridProps}
          ref={gridRef}
        />
      </>
    );
}
