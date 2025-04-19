import DateRange, {DateRangeProps} from "@/components/common/DateRange.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces";
import CodeApiService from "@/utils/apiService/CodeApiService";
import IrregularApiService from "@/utils/apiService/irregular/IrregularApiService";
import { BsmsAsHistRequestDto, BsmsAsHistResponseDto } from "@/utils/apiService/type/irregular/IrregularDto";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/new_components/common/Header.tsx";
import {useNavigate} from "react-router-dom";

export default function IrregularBsmsHist() {
  console.log('IrregularBsmsHist')
  const { t } = useTranslation();
  const gridRef = useRef<{ refetchGrid: () => void }>(null);
  const [selected, setSelected] = React.useState<number>(0);

  const [columns, setColumns] = useState<GridHeader[]>([
    {
      field: "occrrncDthms",
      title: t("irregular.occurredAt"),
      width: 100,
      align: "left",
      cellType: "dateTime",
    },
    {
      field: "bssNm",
      title: t("station.station_name"),
      filterable: true,
      align: "left",
      width: 100
    },
    {
      field: "mhrlsTyCd",
      title: t("station.target"),
      width: 100,
      align: "left",
      filterable: true,
      filterType: "select",
      selectData: [
        {code: "스테이션", value: "스테이션"},
        {code: "슬롯", value: "슬롯"}
      ],
    },
    {
      field: "errKnd",
      title: t("irregular.level"),
      width: 100,
      align: "center",
      filterable: true,
      filterType: "select",
      selectData: [
        {code: "고장", value: "고장"},
        {code: "경고", value: "경고"},
      ],
    },
    {
      field: "recptnDefectTyCd",
      title: t("irregular.irregular_code"),
      width: 100,
      align: "left",
      filterable: true,
    },
    {
      field: "errCdNm",
      title: t("irregular.codeName"),
      width: 100,
      align: "left",
      filterable: true,
    },
    {
      field: "status",
      title: t("common.status"),
      width: 100,
      align: "left",
      filterable: true,
      filterType: "select",
      selectData: [
        {code: "발생", value: "발생"},
        {code: "조치완료", value: "조치완료"},
      ],
    },
    {
      field: "processCn",
      title: t("irregular.handleDetail"),
      width: 100,
      align: "left",
      filterable: true,
    },
    {
      field: "processDthms",
      title: t("irregular.handledAt"),
      width: 100,
      align: "left",
      cellType: "dateTime", // cellType이 'dateTime'일경우 YYYY-MM-DD HH:mm:ss 형식으로 반환
    },
    {
      field: "asChargerId",
      title: t("irregular.handledUserId"),
      width: 100,
      align: "left",
      filterable: true,
    }

  ])


  const downloadButton = async (params: BsmsAsHistRequestDto) => {
    // 다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
    const excelMap = columns.map(v => ({ [v.field]: v.title }));
    console.log('excelMap', excelMap);
    params = {
      ...params,
      "excelMap": JSON.stringify(excelMap)
    }
    const result = await IrregularApiService().bsmsAsDownloadList(params);
  }

  const getBsmsAsList = async (params: BsmsAsHistRequestDto) => {
    console.log('params', params);
    const result = await IrregularApiService().getBsmsAsList(params);
    console.log('result.data', result.data);
    // setCount();
    return result.data
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<BsmsAsHistResponseDto>>(
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
      rowSelectable: false, //행 선택 가능 여부
      isChecked: false, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
      headerSelection: false, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      isFilterResetButton: true, //필터 리셋버튼 생성여부
      isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부(TODO: 오류 수정중)
      isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부(TODO: 오류 수정중)

      onSearch: getBsmsAsList,
      //deleteButton : deleteNotice,
      downloadButton,
      queryKey: "getBsmsAsList",
    },
  );

  const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)), //시작일자 초기값
    endDate: new Date(), //종료일자 초기값
    format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
    allFlag: false,
    type: 'date',
    initState: 'week',
    resetEnable: false
  });

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
  
    </>
    );


}