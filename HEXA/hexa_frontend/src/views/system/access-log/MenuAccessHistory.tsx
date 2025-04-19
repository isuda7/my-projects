/**
 * 메뉴 사용 이력 Component
 * URL: /system/access-log/menu-history
 */

import DateRange, { DateRangeProps } from "@/components/common/DateRange";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces";
import useAlert from "@/hooks/useAlert";
import Header from "@/new_components/common/Header.tsx";
import MenuAccessApiService from "@/utils/apiService/menu/MenuAccessApiService";
import MenuApiService from "@/utils/apiService/system/MenuApiService";
import { AccessHist, AccessHistResponse } from "@/utils/apiService/type/system/accessLog/MenuAccessHistDto";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import * as React from "react";

export default function MenuAccessHistory() {
	console.log('MenuAccessHistory')
  const {t, i18n} = useTranslation();
	const showAlert = useAlert();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);

  const COLUMNS: GridHeader[] = [
		{
			field: "createdAt",
			title: t("access_log.accessAt"),
			cellType: "dateTime",
			width: 140
		},
		{
			field: "userId",
			title: t("user.user_id"),
			width: 120,
			filterable: true
		},
		{
			field: "path",
			title: t("access_log.screen_path"),
			width: 500
		},
		// {
		// 	field: "depth1Menu",
		// 	title: t("access_log.depth1Menu"),
		// 	width: 160,
		// 	searchkey: "depth1MenuId",
    //   filterable: true,
		// 	selectData: [],
		// 	filterType: 'select',
		// 	childFilterFields: ['depth2Menu'],
		// 	onChangeSelect: (e: any) => {
		// 		setDepth1Menu(e.value);
		// 	}
		// },
		// {
		// 	field: "depth2Menu",
		// 	title: t("access_log.depth2Menu"),
    //   width: 160,
		// 	searchkey: "depth2MenuId",
    //   filterable: true,
		// 	selectData: [],
		// 	filterType: 'select',
		// 	childFilterFields: ['depth3Menu'],
		// 	onChangeSelect: (e: any) => {
		// 		setDepth2Menu(e.value);
		// 	}
		// },
		// {
		// 	field: "depth3Menu",
		// 	title: t("access_log.depth3Menu"),
		// 	width: 160,
		// 	searchkey: "depth3MenuId",
    //   filterable: true,
		// 	selectData: [],
		// 	filterType: 'select',
		// },
		{
			field: "menuUrl",
			title: "URL",
			width: 250,
			filterable: true
		},
  ];
	const [columns, setColumns] = useState<GridHeader[]>(COLUMNS);

	const [parentMenu1, setDepth1Menu] = useState<string>();
	const [parentMenu2, setDepth2Menu] = useState<string>();

  const getMenuAccessHistList = async (params: AccessHist) => {
		// console.log("getMenuAccessHistList params", params);
		const result = await MenuAccessApiService().getAccessHistory(params);
		console.log("result data", result.data);
		return result.data;
  }

  const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

	useEffect(() => {
		if(i18n.language == 'ko') {
			columns.forEach(v => {
				if(v.field === 'engPath') v.field = 'path';
			})
		}
		if(i18n.language == 'en') {
			columns.forEach(v => {
				if(v.field === 'path') v.field = 'engPath';
			})
		}
	}, [i18n.language])

	const downloadButton = async (params: AccessHist) => {
		const excelMap = columns.map(v => ({[v.field]: v.title}));
		console.log('excelMap', excelMap);
		params = {
			...params,
			"excelMap": JSON.stringify(excelMap)
		}
		const result = await MenuAccessApiService().accessHistoryDownloadList(params);
	}
	
  const [gridProps, setGridProps] = useState<CommonGridProps<AccessHistResponse>>(
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
			onSearch: getMenuAccessHistList,
			downloadButton,
			queryKey: "MenuAccessHistory",
		},
  );

	const setColumnMenuName = (seletData: any[], field: string) => {
		const newColumn = _.cloneDeep(columns)
		newColumn.forEach(v => {
			if (v.field === field) v.selectData = seletData;
		})
		setColumns(newColumn);
	}

	// useEffect(() => {
	// 	const getDepth1Menu = async () => {
	// 		let menuNames: any[] = [];
	// 		const result = await MenuApiService().getMenuNameByParent('0');
	// 		if(Array.isArray(result.data)){
	// 			// console.log("getManuName", result.data);
	// 			menuNames = result.data.map(v => ({code: v.id, value: v.menuName}))
	// 			await setColumnMenuName(menuNames, 'depth1Menu')
	// 		}
	// 		setDepth1Menu('');
	// 	}
	// 	getDepth1Menu();
	// }, [])

	// useEffect(() => {
	// 	const getDepth2Menu = async (parentMenuId: string) => {
	// 		let menuNames: any[] = [];
	// 		// console.log('parentMenuId', parentMenuId);
	// 		const result = await MenuApiService().getMenuNameByParent(parentMenuId);
	// 		if(Array.isArray(result.data)){
	// 			// console.log("getManuName2", result.data);
	// 			menuNames = result.data.map(v => ({code: v.id, value: v.menuName}))
	// 			await setColumnMenuName(menuNames, 'depth2Menu')
	// 		}
	// 		setDepth2Menu('');
	// 	}
	// 	if(parentMenu1 !== undefined){
	// 		if(!_.isEmpty(parentMenu1)){
	// 			getDepth2Menu(parentMenu1)
	// 		} else {
	// 			// select창 비활성화
	// 		}
	// 	}
	// }, [parentMenu1])

	// useEffect(() => {
	// 	const getDepth3Menu = async (parentMenuId: string) => {
	// 		let menuNames: any[] = [];
	// 		// console.log('parentMenuId', parentMenuId);
	// 		const result = await MenuApiService().getMenuNameByParent(parentMenuId);
	// 		if(Array.isArray(result.data)){
	// 			// console.log("getManuName3", result.data);
	// 			menuNames = result.data.map(v => ({code: v.id, value: v.menuName}))
	// 			await setColumnMenuName(menuNames, 'depth3Menu')
	// 		}
	// 		setDepth2Menu('');
	// 	}
	// 	if(parentMenu2 !== undefined){
	// 		if(!_.isEmpty(parentMenu2)){
	// 			getDepth3Menu(parentMenu2)
	// 		} else {
	// 			// select창 비활성화
	// 		}
	// 	}
	// }, [parentMenu2])

	
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
			{/* 메뉴 사용 이력 */}
			<Header headName={t("access_log.menu_access_history")/* 메뉴 사용 이력 */} />
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
