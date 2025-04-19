import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import SampleApiService from "@/utils/apiService/SampleApiService.ts";
import SampleMock from "@/utils/apiService/SampleMock";
import DateSearchBox, { DateProps } from "./custom/DateSearchBox";
import useAlert from "@/hooks/useAlert.tsx";
import _ from 'lodash';
import dayjs from "dayjs";

//Type
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { NoticeReponse } from "@/utils/apiService/type/auth/Notice.type.ts";

export default function SampleHeaderChangeGrid() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null)
  //const [typeData, setTypeData] = useState<any[]>([])

  /**
   * DateRange Component 초기값, DateRange 컴포넌트의 부모 컴포넌트에서 작성한다
   */
  const [dateProps, setDateProps] = useState<DateProps>({
    year: '2024',
    month: '',
  });
  
  const defaultColumn:GridHeader[] = [
    {
      field: "stationId",
      title: "스테이션 ID",
      filterable: true,
      width: 150, //* locked컬럼은 반드시 고정 width를 가져야함
      locked: true,
    },
    {
      field: "stationName",
      title: "스테이션명",
      filterable: true,
      width: 150,
      locked: true,
    },
    {
      field: "stationInstallDate",
      title: "설치일",
      width: 100,
      locked: true,
    },
    {
      field: "sum",
      title: "누적",
      width: 120,
      cellType: 'number',
      locked: true,
      align: 'right',
    },
  ]

  const [column, setColumns] = useState<GridHeader[]>(defaultColumn)

  // const setInitColumn = (typeData: any[]) => {
  //   const newColumn = _.cloneDeep(column)
  //   newColumn.map(v => {
  //     if (v.field === 'typeCd') v.selectData = typeData;
  //   })
  //   setColumns(newColumn);
  // }

  const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

  /**
   * rowStyles 변경 예시 : flag라는 속성이 true인 값들만색칠
   * onSearch인 getSampleStatList함수에서 가공해서 flag값을 만들어줌
   * @param props 
   * @returns 
   */
  const getRowStyles = (props: any) => {
    if(props.dataItem['flag']) return {background: '#f9edcb'}
    return undefined;
  }

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

  const getSampleStatList = async (params?: object) => {
    const result = await SampleMock().getSampleStatList(params);
    setNewColumn();

    const list = getTransformColumnData(result?.data?.hexaStationStatMonthly);
    const resultData = {
      content : list,
      paging: {
        totalElements: list.length
      },
    }

    return resultData;
  }

  const setNewColumn = () => {
    const year = dateProps.year;
    const month = dateProps.month;
    const newColumn = [...defaultColumn]

    const addColumnLength = month? dayjs(`${year}-${month}-01`).daysInMonth() : 12;
    for(let i=0; i<addColumnLength; i++) {
      newColumn.push({
        field: month? `${year}-${month}-${i+1}` : `${year}-${i+1}`,
        title: month? `${month}/${i+1}` : `${i+1}월`,
        width: 80,
        cellType: 'number',
        align: 'right',
      })
    }
    setColumns(newColumn)
  }

  /**
   * 데이터 그리드의 조회 결과를 가공해서 리턴해줘야할경우 onSearch시점에 가공
   * @param data<Array>
   * @returns 
   */
  const getTransformColumnData = (list: any[]) => {
    const month = dateProps.month;
    console.log('month', month)
    const returnData: any[] = [];
    list.map(v => {
      const obj = { ...v }

      const stat: any[] = v.stat;
      stat.map((w, i) => {
        const key = month? `${w.year}-${w.month}-${w.day}` : `${w.year}-${w.month}`;
        obj[key] = w.chargeCnt;
      })
      returnData.push(obj)
    })
    console.log('returnData', returnData)
    return returnData;
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<NoticeReponse>>(
    {
      gridHeight: 400, //그리드 높이
      columnHeader: column, //column 헤더 설정, 상단 defaultColumn 참고
      //defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
      sortableGrid: true, //전체 정렬여부
      unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
      multipleSorting: true, //다중 컬럼 sorting 여부
      isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부 
      isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
      checkKey: "id", //Table의 PK컬럼 필드, default: id
      //rowSelectable: true, //행 선택 가능 여부
      //isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
      //headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      isFilterResetButton: true, //필터 리셋버튼 생성여부
      isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부(TODO: 오류 수정중)
      isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부(TODO: 오류 수정중)

      //addButton,
      //onSearch : getSampleStatList,
      //deleteButton : deleteNotice,
      downloadButton,
      queryKey : "stat1",
      //rowStyles : {background: '#f9edcb'}, //고정 행 스타일 적용인경우 여기에 값 입력
    },
  );

  useEffect(() => {

  }, [])

  useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: column,
    })
  }, [column])

  return (
    <>
      <DateSearchBox 
        dateProps={dateProps}
        setDateProps={setDateProps}
        searchEvent={searchEvent}
      />
      <GridCommonComponent
        {...gridProps}
        ref={gridRef}
        rowStyles={getRowStyles}
        searchParams={{
          ...dateProps,
        }}
        onSearch={getSampleStatList} //onSearch 함수는 gridProps에 넣지않고 명시적으로 넣는방법을 권장함
      />
    </>
  );
}
