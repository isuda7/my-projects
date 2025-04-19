import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import _ from "lodash";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import {useTranslation} from "react-i18next";
import DateRange, {DateRangeProps} from "@/components/common/DateRange.tsx";
import IrregularApiService from "@/utils/apiService/irregular/IrregularApiService";
import { GridCustomCellProps } from "@progress/kendo-react-grid";
import CodeApiService from "@/utils/apiService/CodeApiService";
import { Disconnection, DisconnectionResponse } from "@/utils/apiService/type/irregular/DisconnectionDto";
import { getFormattedTime } from "@/utils/common";


export default function DisconnectionHist() {
  console.log('DisconnectionHist')
  const {t} = useTranslation();

  const COLUMNS: GridHeader[] = [
	{
	  field: "stationId",
	  title: t("station.station_id"),
		filterable: true,
		width: 120,
		align: "left"
	},
	{
	  field: "stationName",
	  title: t("station.station_name"),
		filterable: true,
		width: 120,
		align: "left"
	},
	{
		field: "statusName",
		title: t("common.status"),
		filterable: true,
		align: "left",
		width: 90,
		filterType: 'select',
		cellType: 'select',
		searchkey: "status",
		selectData: [],
		cell: (props: GridCustomCellProps) => {
			const statusCode = props.dataItem.statusCode;
			const statusName = props.dataItem.statusName;
			// console.log('statusCode',statusCode);
			// console.log('statusName',statusName);
			// console.log(props);
			const textColor = () => {
				if (statusCode === "DC") {
					return "c-red";
				}
			};
			return (
				<span className={`${textColor()}`}>{statusName}</span>
			);
		}
	},
	{
		field: "disconnectedAt",
		title: t("irregular.occurredAt"),
		cellType: "dateTime",
		width: 120,
		align: "center"
	},
	{
		field: "reconnectedAt",
		title: t("irregular.reconnectedAt"),
		cellType: "dateTime",
		width: 120,
		align: "center"
	},
	{
		field: "disconnectedTime",
		title: t("irregular.disconnectionTime"),
		width: 90,
		align: "center"
	}
  ];
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null)

  const [statusName, setStatusName] = useState<string>('');
  const [columns, setColumns] = useState<GridHeader[]>(COLUMNS);

  const setInitData = async () => {
    // 단절 상태
	const res = await CodeApiService().getCodesByGroupCode({groupCode: 'EMDCST'});
    const emdcst = res.data;

    setStatusName('');
    setInitColumn([emdcst]);
  }

  const setInitColumn = (seletData: any[]) => {
    const newColumn = _.cloneDeep(columns);
    newColumn.forEach(v => {
        if (v.field === 'statusName') v.selectData = seletData[0];
    })
    setColumns(newColumn);
}

  useEffect(() => {
	  setInitData()
  }, [])

  const downloadButton = async (params: Disconnection) => {
	//다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
	const excelMap = columns.flatMap(v =>
	  v.children ? v.children : v
	).map(v => ({[v.field]: v.title}));
	console.log('excelMap', excelMap);
	params = {
	  ...params,
	  'excelMap': JSON.stringify(excelMap)
	}
	await IrregularApiService().disconnectionDownloadList(params);
  }

  const getDisconnectionList = async (params: Disconnection) => {
	const result = await IrregularApiService().getDisconnectionList(params);
	return result.data;
  }

	const gridInfoMessage = () => <span>{`${t("grid.update")} ${getFormattedTime(new Date())}`}</span>
		
  const [gridProps, setGridProps] = useState<CommonGridProps<DisconnectionResponse>>(
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
	  onSearch: getDisconnectionList,
	  //deleteButton : deleteNotice,
		gridInfoMessage,
	  downloadButton,
	  queryKey: "disconnectionHistory",
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
	console.log("greidRef", gridRef)
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
		  <Header headName={t("irregular.disconnection_status")}/>

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
