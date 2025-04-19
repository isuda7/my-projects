import { useTranslation } from "react-i18next";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import _ from "lodash";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import NotificationApiService from "@/utils/apiService/NotificationApiService";
import { NotificationDto, NotificationResponse } from "@/utils/apiService/type/notification/NotificationDto";
import { array } from "prop-types";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell";
import CodeApiService from "@/utils/apiService/CodeApiService";

export default function NotificationList() {
    console.log('NotificationList');
    const {t} = useTranslation();

    const cellClickFunction = (e:any, dataItem:any) => {
        console.log(dataItem);
        navigate('/system/notification/detail', { state: dataItem.id });
    };

    const COLUMNS: GridHeader[] = [
      {
        field: "type",
        title: t("common.category"),
        width: 120,
        align: "left",
        searchkey: 'type',
        filterable: true,
        filterType: "select",
        cellType: "select",
        selectData: []
      },
      {
        field: "id",
        title: t("notification.id"),
        hidden: true
      },
      {
        field: "condition",
        title: t("notification.condition"),
        width: 100,
        align: "left",
        filterable: true,
      },
      {
        field: "channelCode",
        title: t("notification.channel"),
        width: 90,
        align: "left",
        searchkey: 'channelCode',
        filterable: true,
        filterType: "select",
        cellType: "select",
        selectData: [],
        cellTypeProps: {
          array: true
        }
      },
      {
        field: "name",
        title: t("board.title"),
        width: 200,
        align: "left",
        filterable: true,
        cellClick: cellClickFunction,
        cellTypeProps: {
          link: true,
        },
      },
      {
        field: "receivers",
        title: t("notification.receivers"),
        width: 120,
        align: "left",
        filterable: true
      },
      {
        field: "message",
        title: t("notification.message"),
        width: 300,
        align: "left",
        filterable: true,
      },
      {
        field: "isUse",
        title: t("station.is_use"),
        width: 80,
        filterable: true,
        filterType: "select",
        selectData: [
          {code: true, value: 'Y'},
          {code: false, value: 'N'},
        ],
        align: 'center',
        cell: (props: any) => <CustomRepresentativeCell {...props} />,
      },
      {
        field: "updatedAt",
        title: t("common.modification_datetime"),
        width: 120,
        align: "left",
        cellType: "dateTime", // cellType이 'dateTime'일경우 YYYY-MM-DD HH:mm:ss 형식으로 반환
      },
      {
        field: "updatedUserId",
        title: t("common.modifier_id"),
        width: 120,
        align: "left",
        filterable: true,
      },
      {
        field: "createdAt",
        title: t("common.registration_datetime"),
        width: 120,
        align: "left",
        cellType: "dateTime",
      },
      {
        field: "createdUserId",
        title: t("common.registration_id"),
        width: 120,
        align: "left",
        filterable: true,
      },
    ];
    const showAlert = useAlert();
    const navigate = useNavigate();
    const gridRef = useRef<{ refetchGrid: () => void; }>(null)


    const [columns, setColumns] = useState<GridHeader[]>(COLUMNS);

    const setInitData = async () => {
      // 구분
      const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMNOTI'});
      const smnoti = res.data;
  
      // 발송 종류
      const res2 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMNOTICH'});
      const smnotich = res2.data;
  
      setInitColumn([smnoti, smnotich]);
    }
  
    const setInitColumn = (seletData: any[]) => {
      const newColumn = _.cloneDeep(columns);
      newColumn.forEach(v => {
          if (v.field === 'type') v.selectData = seletData[0];
          if (v.field === 'channelCode') v.selectData = seletData[1];
      })
      setColumns(newColumn);
    }
  
    useEffect(() => {
  
      setInitData()
    }, [])

    const addButton = () => {
        console.log('addButton')
        navigate("/system/notification/add");
    };

    const downloadButton = async (params: NotificationDto) => {
        // 다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
        const excelMap = columns.map(v => ({[v.field]: v.title}));
        console.log('excelMap', excelMap);
        params = {
            ...params,
            "excelMap": JSON.stringify(excelMap)
        }
        const result = await NotificationApiService().downloadList(params);
    }

    const getNotificationList = async (params: NotificationDto) => {
        const result = await NotificationApiService().getNotifications(params);
        console.log("getNotificationList result", result.data);
        return result.data
    }

    const [gridProps, setGridProps] = useState<CommonGridProps<NotificationResponse>>(
      {
        gridHeight: 550, //그리드 높이
        columnHeader: columns, //column 헤더 설정, 상단 defaultColumn 참고
        defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
        sortableGrid: true, //전체 정렬여부
        unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
        multipleSorting: true, //다중 컬럼 sorting 여부
        isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부
        isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
        checkKey: "id", //Table의 PK컬럼 필드, default: id
        //rowSelectable: true, //행 선택 가능 여부
        //isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
        headerSelection: false, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

        //gridData: [], // Correctly initialized as an empty array of User type
        girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
        displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
        isFilterResetButton: true, //필터 리셋버튼 생성여부
        isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부(TODO: 오류 수정중)
        isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부(TODO: 오류 수정중)

        addButton,
        onSearch: getNotificationList,
        downloadButton,
        queryKey: "NotificationList",
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
        <Header headName={t("notification.notification_management")/*알림 관리*/}/>
        <GridCommonComponent
            {...gridProps}
            ref={gridRef}
        />

        </>
    );
}