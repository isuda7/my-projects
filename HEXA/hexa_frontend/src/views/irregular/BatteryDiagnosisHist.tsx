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
import { BatteryDiagnosis, BatteryDiagnosisRequest, BatteryDiagnosisResponse } from "@/utils/apiService/type/irregular/BatteryDiagnosisDto";
import IrregularApiService from "@/utils/apiService/irregular/IrregularApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import { getFormattedTime } from "@/utils/common";


export default function BatteryDiagnosisHist() {
  const {t} = useTranslation();

  const COLUMNS: GridHeader[] = [
	{
	  field: "createdAt",
	  title: t("irregular.occurredAt"),
	  cellType: "dateTime",
		width: 100,
    align: "left"
	},
	{
	  field: "genCode",
	  title: t("battery.generation_type"),
		// searchkey: "genCode",
	  filterable: true,
    filterType: "select",
		cellType: "select",
    selectData: [],
		width: 80,
    align: "center",
	},
	{
	  field: "batteryId",
	  title: t("battery.battery_id"),
		filterable: true,
		width: 120,
		align: "left"
	},
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
		width: 100,
		align: "left"
	},
	{
		field: "chassisNum",
		title: t("dashboard.device.grid-col.chassis-no"),
		filterable: true,
    filterType: "select",
    selectData: [
			{code: 1, value: "01"},
			{code: 2, value: "02"},
			{code: 3, value: "03"},
		],
		width: 90,
		align: "center"
	},
	{
		field: "slotNum",
		title: t("station.slot_no"),
		filterable: true,
    filterType: "select",
    selectData: [
			{code: 1, value: "01"},{code: 2, value: "02"},{code: 3, value: "03"},{code: 4, value: "04"},{code: 5, value: "05"},
			{code: 6, value: "06"},{code: 7, value: "07"},{code: 8, value: "08"},{code: 9, value: "09"},{code: 10, value: "10"},
			{code: 11, value: "11"},{code: 12, value: "12"},{code: 13, value: "13"},{code: 14, value: "14"},{code: 15, value: "15"},
			{code: 16, value: "16"},{code: 17, value: "17"},{code: 18, value: "18"},{code: 19, value: "19"},{code: 20, value: "20"},
			{code: 21, value: "21"},{code: 22, value: "22"},{code: 23, value: "23"},{code: 24, value: "24"},{code: 25, value: "25"},
			{code: 26, value: "26"},{code: 27, value: "27"},{code: 28, value: "28"},{code: 29, value: "29"},{code: 30, value: "30"}
		],
		width: 80,
		align: "center"
	},
	{
		field: "code",
		title: t("irregular.diagnosis_code"),
		filterable: true,
		width: 90,
		align: "left"
	},
	{
		field: "codeName",
		title: t("irregular.diagnosis_name"),
		filterable: true,
		width: 140,
		align: "left"
	},
	{
		field: "codeLevel",
		title: t("irregular.level"),
		// searchkey: "codeLevel",
	  filterable: true,
    filterType: "select",
		cellType: "select",
    selectData: [],
		width: 90,
		align: "center"
	},
	{
		field: "status",
		title: t("common.status"),
		// searchkey: "status",
	  filterable: true,
    filterType: "select",
		cellType: "select",
    selectData: [],
		width: 90,
		align: "left"
	},
	{
		field: "handledAt",
		title: t("irregular.handledAt"),
		cellType: "dateTime",
		width: 100,
		align: "left"
	},
	{
		field: "handleDetail",
		title: t("irregular.handleDetail"),
		filterable: true,
		width: 140,
		align: "left"
	}
  ];
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null)

  const [count, setCount] = useState<any>(0);
  const [columns, setColumns] = useState<GridHeader[]>(COLUMNS);

	const setInitData = async () => {
    // 세대 구분
		const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMGEN'});
		const smgen = res.data;

    // 고장 레벨
    const res2 = await CodeApiService().getCodesByGroupCode({groupCode: 'EMIRLV'});
    const emirlv = res2.data;

    // 고장 상태
    const res3 = await CodeApiService().getCodesByGroupCode({groupCode: 'EMIRST'});
    const emirst = res3.data;

    setInitColumn([smgen, emirlv, emirst]);
  }

  const setInitColumn = (seletData: any[]) => {
    const newColumn = _.cloneDeep(columns);
    newColumn.forEach(v => {
        if (v.field === 'genCode') v.selectData = seletData[0];
        if (v.field === 'codeLevel') v.selectData = seletData[1];
        if (v.field === 'status') v.selectData = seletData[2];
    })
    setColumns(newColumn);
	}

  useEffect(() => {
	  setInitData();
  }, [])

  const downloadButton = async (params: BatteryDiagnosis) => {
	//다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
	const excelMap = columns.flatMap(v =>
	  v.children ? v.children : v
	).map(v => ({[v.field]: v.title}));
	params = {
	  ...params,
	  'excelMap': JSON.stringify(excelMap)
	}
	await IrregularApiService().diagnosisDownloadList(params);
  }

  const getBatteryDiagnosisList = async (params: BatteryDiagnosis) => {
		const result = await IrregularApiService().getBatteryDiagnosisList(params);
		// 조치필요건수
		const count = await IrregularApiService().getCountNotHandledBattery(params);
		// console.log(count.data);
		setCount(count.data);

		return result.data;
	}
	
	const gridInfoMessage = () => <span>{`${t("grid.update")} ${getFormattedTime(new Date())}`}</span>

  const [gridProps, setGridProps] = useState<CommonGridProps<BatteryDiagnosisResponse>>(
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
	  onSearch: getBatteryDiagnosisList,
	  //deleteButton : deleteNotice,
		gridInfoMessage,
	  downloadButton,
	  queryKey: "batteryDiagnosisHistory",
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
		  <Header headName={t("irregular.battery_diagnosis_history")}/>

		  <DateRange
			setDateRangeProps={setDateRangeProps}
			dateRangeProps={dateRangeProps}
			searchEvent={searchEvent}
		  />
        <section className="section">
					<p className="t-title-s mb1">
					{t("irregular.action_needed_number")} <span className="c-red">{ count.toLocaleString() }</span>
					</p>
        </section>
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
