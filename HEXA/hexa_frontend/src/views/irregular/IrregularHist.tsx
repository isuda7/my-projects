import { useEffect, useRef, useState } from "react";
import * as React from "react";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import _ from "lodash";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import { useTranslation } from "react-i18next";
import { any } from "prop-types";
import IrregularApiService from "@/utils/apiService/irregular/IrregularApiService";
import { Irregular, IrregularResponseDto } from "@/utils/apiService/type/irregular/IrregularDto";
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from "@progress/kendo-react-layout";
import DateRange, { DateRangeProps } from "@/components/common/DateRange";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Grid, GridColumn as Column, GridCustomCellProps, GridNoRecords, } from "@progress/kendo-react-grid";
import CodeApiService from "@/utils/apiService/CodeApiService";
import { getFormattedTime } from "@/utils/common";
import dayjs from "dayjs";
import { DropdownFilterCell } from "@/pub/components/guide/dropdownFilterCell";
import { Input } from "@progress/kendo-react-inputs";
import IrregularBsmsHist from "./IrregularBsmsHist";

const initialDataState = {
  skip: 0,
  take: 10,
};

export default function IrregularHist() {
  console.log('IrregularHist')
  const { t } = useTranslation();
  const gridRef = useRef<{ refetchGrid: () => void }>(null);
  const [selected, setSelected] = React.useState<number>(0);

  const [columns, setColumns] = useState<GridHeader[]>([
    {
      field: "createdAt",
      title: t("irregular.occurredAt"),
      width: 100,
      align: "left",
      cellType: "dateTime",
    },
    {
      field: "stationId",
      title: t("station.station_id"),
      filterable: true,
      align: "left",
      width: 120
    },
    {
      field: "stationName",
      title: t("station.station_name"),
      filterable: true,
      align: "left",
      width: 100
    },
    {
      field: "irrObject",
      title: t("station.target"),
      width: 100,
      align: "left",
      searchkey: "irrObject",
      filterable: true,
      filterType: "select",
      cellType: "select",
      selectData: [],
    },
    {
      field: "chassisNum",
      title: t("dashboard.device.grid-col.chassis-no"),
      width: 90,
      align: "center",
      filterable: true,
      filterType: "select",
      selectData: [
        {code: 1, value: "01"},
        {code: 2, value: "02"},
        {code: 3, value: "03"},
      ],
    },
    {
      field: "slotNum",
      title: t("station.slot_no"),
      width: 90,
      align: "center",
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
    },
    {
      field: "asType",
      title: t("irregular.level"),
      width: 100,
      align: "center",
      searchkey: "asType",
      filterable: true,
      filterType: "select",
      cellType: "select",
      selectData: [],
    },
    {
      field: "code",
      title: t("irregular.irregular_code"),
      width: 100,
      align: "left",
      filterable: true,
    },
    {
      field: "codeName",
      title: t("irregular.codeName"),
      width: 100,
      align: "left",
      filterable: true,
    },
    {
      field: "description",
      title: t("common.description"),
      width: 180,
      align: "left",
      filterable: true,
    },
    {
      field: "status",
      title: t("common.status"),
      width: 100,
      align: "left",
      searchkey: "status",
      filterable: true,
      filterType: "select",
      cellType: "select",
      selectData: [],
    },
    {
      field: "handledAt",
      title: t("irregular.handledAt"),
      width: 100,
      align: "left",
      cellType: "dateTime", // cellType이 'dateTime'일경우 YYYY-MM-DD HH:mm:ss 형식으로 반환
    },
    {
      field: "handledUserId",
      title: t("irregular.handledUserId"),
      width: 100,
      align: "left",
      filterable: true,
    },
    {
      field: "handleDetail",
      title: t("irregular.handleDetail"),
      width: 100,
      align: "left",
      filterable: true,
    },

  ])

  const [count, setCount] = useState<any>(0);
  const [irrTarget, setIrrTarget] = useState<string>('');
  const [irrLevel, setIrrLevel] = useState<string>('');
  const [statusName, setStatusName] = useState<string>('');
  const [chassisNumber, setChassisNumber] = useState<string>('');
  const [slotNumber, setSlotNumber] = useState<string>('');

  const setInitData = async () => {
    // 고장 대상
    const res = await CodeApiService().getCodesByGroupCode({ groupCode: 'EMIROJ' });
    const emiroj = res.data.filter((item: any) => item.code !== "BTR"); // 배터리 제외

    // 고장 레벨
    const res2 = await CodeApiService().getCodesByGroupCode({ groupCode: 'EMIRLV' });
    const emirlv = res2.data;

    // 고장 상태
    const res3 = await CodeApiService().getCodesByGroupCode({ groupCode: 'EMIRST' });
    const emirst = res3.data;

    setIrrTarget('');
    setIrrLevel('');
    setStatusName('');
    setInitColumn([emiroj, emirlv, emirst]);
  }

  const setInitColumn = (seletData: any[]) => {
    const newColumn = _.cloneDeep(columns);
    newColumn.forEach(v => {
      if (v.field === 'irrObject') v.selectData = seletData[0];
      if (v.field === 'asType') v.selectData = seletData[1];
      if (v.field === 'status') v.selectData = seletData[2];
    })
    setColumns(newColumn);
  }

  useEffect(() => {

    setInitData()
  }, [])


  const downloadButton = async (params: Irregular) => {
    // 다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
    const excelMap = columns.map(v => ({ [v.field]: v.title }));
    console.log('excelMap', excelMap);
    params = {
      ...params,
      "excelMap": JSON.stringify(excelMap)
    }
    const result = await IrregularApiService().irregularDownloadList(params);
  }

  const getIrregularHistList = async (params: Irregular) => {
    console.log('params', params);
    const result = await IrregularApiService().getIrregularList(params);
    console.log('result.data', result.data);

    const count_result = await IrregularApiService().getCountNotHandledStaion(params);
    setCount(count_result.data);
    // setCount();
    return result.data
  }

  // const gridInfoMessage = () =>
  //   <div className="sort-group__title">
  //     <span>{"업데이트 일시"}</span>
  //   </div>

  const gridInfoMessage = () => <span>{`${t("grid.update")} ${getFormattedTime(new Date())}`}</span>

  const [gridProps, setGridProps] = useState<CommonGridProps<IrregularResponseDto>>(
    {
      gridHeight: 550, //그리드 높이
      maxHeight: 600,
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
      gridInfoMessage,

      onSearch: getIrregularHistList,
      //deleteButton : deleteNotice,
      downloadButton,
      queryKey: "IrregularHistList",
    },
  );
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };
  const [page, setPage] = React.useState(initialDataState);

  const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)), //시작일자 초기값
    endDate: new Date(), //종료일자 초기값
    format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
    allFlag: false,
    type: 'date',
    initState: 'week',
    resetEnable: false
  });

  const [dateRangeProps2, setDateRangeProps2] = useState<DateRangeProps>({
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

  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} className="k-table-td txt-left">
        <span className="cell-date">{dayjs(props.children).format(t("format.date-uppercase"))}</span>
        <span className="cell-time">{dayjs(props.children).format(t("format.time"))}</span>
      </td>
    );
  };
  const SearchFilterCell = (props: any) => (
    <div className="inner-item type-icon">
      <Input />
      <Button size={"small"} fillMode="flat" className="btn-icon">
        <i className="icon icon-glass"></i>
      </Button>
    </div>
  );
  const CategoryFilterCell = (props: any) => (
    <DropdownFilterCell
      {...props}
      // data={categories}
      defaultItem={"전체"}
    />
  );
  const CustomCellTextColor = (props: any) => {
    const textColor = () => {
      if (props.dataItem.ServerNo !== props.dataItem.StationNo) {
        return "c-red";
      }
    };
    return (
      <td colSpan={1} {...props.tdProps}>
        <span className={`${textColor()}`}>{props.children}</span>
      </td>
    );
  };

  return (
    <>
      <Header headName={t("irregular.station_irregular_history")} descrption={""} />

      <div className="tabs">
        <TabStrip selected={selected} onSelect={handleSelect}>
          <TabStripTab title={t("home.second_generation")}>
            <DateRange
              setDateRangeProps={setDateRangeProps}
              dateRangeProps={dateRangeProps}
              searchEvent={searchEvent}
            />
            <section className="section">
              <p className="t-title-s mb1">
                {t("irregular.action_needed_number")} <span className="c-red">{count.toLocaleString()}</span>
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
          </TabStripTab>
          <TabStripTab title={t("home.first_generation")} >
            <IrregularBsmsHist/>            
            {/* <DateRange
              setDateRangeProps={setDateRangeProps2}
              dateRangeProps={dateRangeProps2}
              searchEvent={searchEvent}
            />

            <section className="section">
              <div className="sort-group">
                <div className="sort-group__counter">
                  <span className="total">전체 100</span>
                  <DropDownList
                    style={{ width: "130px" }}
                    data={["20", "50", "100"]}
                    defaultValue="20"
                    dir="rtl"
                  />
                </div>
                <div className="sort-group__btns">
                  <Button themeColor={"info"} title="필터 초기화">
                    <i className="icon icon-filter"></i>
                  </Button>
                  <Button themeColor={"info"} title="컬럼 초기화">
                    <i className="icon icon-tbl-layout"></i>
                  </Button>
                  <Button themeColor={"info"} title="컬럼 설정">
                    <i className="icon icon-column"></i>
                  </Button>
                  <Button themeColor={"info"} title="파일 다운로드">
                    <i className="icon icon-download"></i>
                  </Button>
                </div>
                <div className="sort-group__title">
                  <span>{`${t("grid.update")} ${getFormattedTime(new Date())}`}</span>
                </div>
              </div>
              <div>
                <Grid
                  style={{ maxHeight: "600px" }}
                  data={sampleProducts}
                  skip={page.skip}
                  take={page.take}
                  total={sampleProducts.length}
                  pageable={{
                    buttonCount: 10,
                    pageSizes: false,
                    info: false,
                  }}
                  scrollable="scrollable"
                  filterable={true}
                >
                  <GridNoRecords>{t("common.no_search_results")/*검색된 데이터가 없습니다.
                  </GridNoRecords>
                  <Column
                    className="txt-left"
                    field="DateTime"
                    title="발생일시"
                    width="120"
                    filterable={false}
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="StationName"
                    title="스테이션 명"
                    width="130"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="irrTarget"
                    title="대상"
                    width="130"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="irrLevel"
                    title="레벨"
                    width="100"
                    filterCell={CategoryFilterCell}
                    cells={{
                      data: CustomCellTextColor,
                    }}
                  />
                  <Column
                    className="txt-left"
                    field="code"
                    title="고장코드"
                    width="150"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="codeName"
                    title="코드명"
                    width="140"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-left"
                    field="statusName"
                    title="상태"
                    width="120"
                    filterCell={CategoryFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="handleDetail"
                    title="처리내용"
                    width="90"
                    filterCell={SearchFilterCell}
                  />
                  <Column
                    className="txt-center"
                    field="handledAt"
                    title="처리완료일시"
                    width="90"
                    filterable={false}
                  />
                  <Column
                    className="txt-left"
                    field="handledUserId"
                    title="처리자"
                    width="140"
                    filterCell={SearchFilterCell}
                  />
                </Grid>
              </div>
            </section> */}
          </TabStripTab>
        </TabStrip>
      </div>
    </>
  );
}
