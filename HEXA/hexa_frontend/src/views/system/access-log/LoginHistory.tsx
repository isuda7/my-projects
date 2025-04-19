/**
 * 로그인 이력 Component
 * URL: /system/access-log/login-history
 */

import DateRange, { DateRangeProps } from "@/components/common/DateRange";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces";
import useAlert from "@/hooks/useAlert";
import Header from "@/new_components/common/Header.tsx";
import LoginAccessApiService from "@/utils/apiService/system/LoginAccessApiService";
import { LoginHist, LoginHistResponse } from "@/utils/apiService/type/system/accessLog/LoginHistDto";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LoginHistory() {
  const {t} = useTranslation();
	const showAlert = useAlert();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);

  const COLUMNS: GridHeader[] = [
		{
			field: "loginUserId",
			title: t("user.user_id"),
			width: 100,
			filterable: true
		},
		{
			field: "ipAddress",
			title: t("access_log.ip_address"),
			width: 120,
			filterable: true
		},
		{
			field: "userAgent",
			title: "User Agent",
			width: 400,
			align: 'center',
      filterable: true
		},
		{
			field: "loginAt",
			title: t("access_log.loginAt"),
      width: 120,
      align: 'center',
			cellType: "dateTime",
		},
		{
			field: "logoutAt",
			title: t("access_log.logoutAt"),
			width: 120,
      align: 'center',
			cellType: "dateTime",
		},
		{
			field: "accessTime",
			title: t("access_log.accessTime"),
			width: 100,
			align: 'center'
		},
  ];
	const [columns, setColumns] = useState<GridHeader[]>(COLUMNS);

  const getLoginHistoryList = async (params: LoginHist) => {
		const result = await LoginAccessApiService().getLoginHistory(params);
		return result.data;
  }

  const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }
	
	const downloadButton = async (params: LoginHist) => {
		const excelMap = columns.map(v => ({[v.field]: v.title}));
		console.log('excelMap', excelMap);
		params = {
			...params,
			"excelMap": JSON.stringify(excelMap)
		}
		const result = await LoginAccessApiService().loginHistoryDownloadList(params);
	}

  const [gridProps, setGridProps] = useState<CommonGridProps<LoginHistResponse>>(
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
			onSearch: getLoginHistoryList,
			downloadButton,
			queryKey: "LoginHistory",
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

	useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: columns,
    })
  }, [columns])

  return (
		<>
			{/* 로그인 이력 */}
			<Header headName={t("access_log.login_history")/*로그인 이력*/} />
			<DateRange
        setDateRangeProps={setDateRangeProps}
        dateRangeProps={dateRangeProps}
        searchEvent={searchEvent}
      />
			<GridCommonComponent
				{...gridProps}
				// onSearch={}
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
