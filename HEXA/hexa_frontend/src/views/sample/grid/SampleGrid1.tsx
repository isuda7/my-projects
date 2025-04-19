import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import SampleApiService from "@/utils/apiService/SampleApiService.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import DateRange, { DateRangeProps } from "@/components/common/DateRange.tsx";
import useAlert from "@/hooks/useAlert.tsx";
import { getFormattedTime } from "@/utils/common"
import _ from 'lodash';
import { useTranslation } from "react-i18next";

//Type
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { NoticeReponse } from "@/utils/apiService/type/auth/Notice.type.ts";

// function testHeaderGroup() {
//   return (
//     <div className="head-group">
//       <h2 className="h2">Dashboard</h2>
//       <div className="time-update">
//         <span className="time">2023-11-12 11:10:15</span>
//         <button aria-label="reload" type="button" className="btn-reload" />
//       </div>

//       <div className="group-align-right location">
//         <i className="icon icon-home" /> <span>HeaderGroup</span>
//       </div>
//     </div>
//   );
// }

export default function SampleGrid1() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const {t} = useTranslation()
  const gridRef = useRef<{ refetchGrid: () => void; }>(null)
  //const [typeData, setTypeData] = useState<any[]>([])

  /**
   * DateRange Component 초기값, DateRange 컴포넌트의 부모 컴포넌트에서 작성한다
   */
  const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
    startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), //시작일자 초기값
    endDate: new Date(), //종료일자 초기값
    dropDownList: ["ALL", "Notice Time", "End Time"], //선택사항
    value: "ALL", //DropDownList가 존재할경우 초기값 및 현재값
    format: "yyyy-MM-dd HH:mm", //화면에 보여주는 DateFormat
    allFlag: false,
  });

  const cellClickFunction = (e:any, dataItem:any) => {
    navigate(`./${dataItem.id}`);
  };

  const [column, setColumns] = useState<GridHeader[]>([
    {
      field: "title",
      title: "타이틀",
      filterable: true,
      cellClick: cellClickFunction,
      //cellType: 'link',
      cellTypeProps: {
        link: true,
      },
      searchkey: 'aa',
      searchType: 'array',
    },
    {
      field: "description",
      title: "설명",
      filterable: true,
      searchkey: 'aa',
      searchType: 'array',
    },
    // {
    //   field: "description",
    //   title: "설명",
    //   filterable: true,
    //   filterType: "select",
    //   selectData: [
    //     {code: 'abc', value: 'abc'},
    //     {code: 'abc2', value: 'abc2'},
    //   ],
    //   childFilterFields: ['typeCd'],
    // },
    // {
    //   field: "typeCd",
    //   title: "typeCd",
    //   width: 200,
    //   filterable: true,
    //   filterType: "checkbox",
    //   selectData: [],
    //   cellType: "select",
    // },
    {
      field: "typeCd",
      title: "타입코드",
      width: 200,
      filterable: true,
      filterType: "select", //TODO : 임시로 제작 MultiSelect 추후 퍼블리싱받아 컴포넌트 수정예정
      selectData: [],
      cellType: "select",
      align: "center",
      //code: 'test'
    },
    {
      field: "fileName",
      title: "파일명",
      hidden: true,
    },
    // {
    //   field: "createdAt",
    //   title: "Date형식",
    //   width: 120,
    //   align: "center",
    //   cellType: 'date', //cellType이 'date'일경우 YYYY-MM-DD 형식으로 반환
    // },
    {
      field: "createdAt",
      title: "작성일시",
      width: 200,
      align: "left",
      cell: (props: any) => <div>{getFormattedTime(props.dataItem[props.field])}</div>, //함수를 이용해 원하는 셀형태를 만들어 줄 수 있음
    },
    {
      field: "updatedAt",
      title: "수정일시",
      width: 200,
      align: "left",
      cellType: "dateTime", //cellType이 'dateTime'일경우 YYYY-MM-DD HH:mm:ss 형식으로 반환
    },
  ])

  const setInitColumn = (typeData: any[]) => {
    const newColumn = _.cloneDeep(column)
    newColumn.map(v => {
      if (v.field === 'typeCd') v.selectData = typeData;
    })
    setColumns(newColumn);
  }

  const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

  /**
   * rowStyles 변경 예시 : flag라는 속성이 true인 값들만색칠
   * onSearch인 getNoticeList함수에서 가공해서 flag값을 만들어줌
   * @param props 
   * @returns 
   */
  const getRowStyles = (props: any) => {
    if(props.dataItem['flag']) return {background: '#f9edcb'}
    return undefined;
  }

  const cellClickAlert = () => {
    console.log("cellClickAlert~!!!!!!!!!!!!!!!");
    showAlert({ title: "Test", message: "TestMessage" });
  };

  const addButton = () => {
    navigate("./add");
  };

  const downloadButton = async (params?: object) =>  {
    //다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
    const excelMap = column.map(v => ({[v.field] : v.title}));
    console.log('excelMap', excelMap);
    params = {
      ...params,
      'excelMap': JSON.stringify(excelMap)
    }
    const result = await SampleApiService().downloadNoticeList(params);
  }

  const getNoticeList = async (params?: object) => {
    const result = await SampleApiService().getNoticeList(params);
    const list = getIdentifyDuplicates(result?.data?.content);
    const resultData = {
      content : list,
      paging: result?.data?.paging,
    }

    return resultData;
  }

  /**
   * 데이터 그리드의 조회 결과를 가공해서 리턴해줘야할경우 onSearch시점에 가공
   * @param data<Array>
   * @returns 
   */
  const getIdentifyDuplicates = (list: any[]) => {
    list.forEach(v => {
      if(v.description.includes('1')) {
        v.flag = true;
      }
    })
    return list;
  }

  const deleteNotice = async (data: any) => {
    const response = await SampleApiService().deleteNotice(data)
    return response;
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<NoticeReponse>>(
    {
      gridHeight: 400, //그리드 높이
      columnHeader: column, //column 헤더 설정, 상단 defaultColumn 참고
      defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
      sortableGrid: true, //전체 정렬여부
      unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
      multipleSorting: true, //다중 컬럼 sorting 여부
      isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부 
      isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
      checkKey: "id", //Table의 PK컬럼 필드, default: id
      rowSelectable: true, //행 선택 가능 여부
      isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
      headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      isFilterResetButton: true, //필터 리셋버튼 생성여부
      isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부(TODO: 오류 수정중)
      isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부(TODO: 오류 수정중)

      addButton,
      onSearch : getNoticeList,
      deleteButton : deleteNotice,
      downloadButton,
      queryKey : "notice1",
      //rowStyles : {background: '#f9edcb'}, //고정 행 스타일 적용인경우 여기에 값 입력
    },
  );

  useEffect(() => {
    const getTypeData = async () => {
      const result = await CodeApiService().getCodes({ groupCode: 'noticeType' });
      setInitColumn(result)
    }
    getTypeData()
  }, [])

  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: column,
    })
  }, [column])

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
        rowStyles={getRowStyles}
        searchParams={{
          startAt: dateRangeProps?.startDate,
          endAt: dateRangeProps?.endDate,
          allFlag: dateRangeProps.allFlag,
        }}
      />
    </>
  );
}
