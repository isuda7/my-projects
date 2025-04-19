/** React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import Header from "@/new_components/common/Header.tsx";

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { PeriodSearchDto} from "@/utils/apiService/type/board/NoticeDto";
import NoticeApiService from "@/utils/apiService/board/NoticeApiService";
import { NoticeResponseDto } from "@/utils/apiService/type/board/NoticeResponseDto";
import CustomCellTitle from "./components/CustomCellTitle";


export default function UserNoticeList() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const gridRef = useRef<{ refetchGrid: () => void; }>(null);


    const cellClickFunction = (dataItem: any) => {
      console.log('id: ', dataItem.id);
        navigate(`/board/notice/detail`, {state: {id: dataItem.id}})
    }

    const [columns, setColumns] = useState<GridHeader[]>([

        {
            field: "id",
            title: "공지사항 ID",
            hidden: true
        },
        {
            field: "title",
            title: t('board.title'), // 제목
            width: 1000,
            filterable: true,
            cell: (props: any) => <CustomCellTitle {...props} onClick={cellClickFunction} />,
        },
        {
            field: "createdAt",
            title: t("common.registration_datetime"), //"등록일시",
            cellType: "dateTime",
            width: 180,
            align: 'center',
        },
    ])

    const getNoticeList = async (params: PeriodSearchDto) => {
        const result = await NoticeApiService().getPeriodNotices(params);
        console.log("data:", JSON.stringify(result.data, null, 2));
        return result.data;
    }

    const [gridProps, setGridProps] = useState<CommonGridProps<NoticeResponseDto>>(
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
            queryKey: "notice-user-list",
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
