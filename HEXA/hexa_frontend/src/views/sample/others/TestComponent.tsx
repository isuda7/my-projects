import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestGridComponent from "@/views/sample/grid/custom/TestGridComponent";
import SampleApiService from "@/utils/apiService/SampleApiService.ts";
import useAlert from "@/hooks/useAlert.tsx";
import _ from 'lodash';
import RowSpanCellData from "@/components/kendo/grid/RowSpanCellData.tsx";
import CustomExpandIconCell from "@/views/sample/grid/custom/CustomExpandIconCell"
import { useQuery, useMutation } from "@tanstack/react-query";

//Type
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { GridCellProps } from "@progress/kendo-react-grid";
import { NoticeReponse } from "@/utils/apiService/type/auth/Notice.type.ts";
import { Page } from "@/utils/apiService/type/common/Page.type.ts";

const rowData = [
  {"expanded": false, "col1": "테스트6", "col2": "테스트1", "col3": "테스트6"},
  {"expanded": true, "col1": "테스트10", "col2": "테스트3", "col3": "테스트10"},
  {"expanded": false, "col1": "테스트7", "col2": "테스트5", "col3": "테스트4"},
  {"expanded": false, "col1": "테스트3", "col2": "테스트3", "col3": "테스트6"},
  {"expanded": false, "col1": "테스트1", "col2": "테스트10", "col3": "테스트8"},
  {"expanded": false, "col1": "테스트4", "col2": "테스트4", "col3": "테스트7"},
  {"expanded": true, "col1": "테스트5", "col2": "테스트3", "col3": "테스트9"},
  {"expanded": true, "col1": "테스트1", "col2": "테스트7", "col3": "테스트5"},
  {"expanded": false, "col1": "테스트8", "col2": "테스트4", "col3": "테스트6"},
  {"expanded": false, "col1": "테스트6", "col2": "테스트3", "col3": "테스트4"}
]


export default function TestComponent() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ 
    getSearchParams: () => object;
  }>(null)
  // useRef를 사용해 이전 함수 참조를 저장
  const prevOnClickExpandedRef = useRef<any>(null);

  const [processData, setProcessData] = useState([]);
  // const { data, isLoading, isFetching, refetch } = useQuery<any, Error>({
  //   queryKey: ["fakeData"],
  //   queryFn: () => {
  //     if(gridRef.current) {
  //       const params = gridRef.current.getSearchParams();
  //       return getFakeData(params)
  //     }
  //     return undefined;
  //   },
  //   enabled: false, // 자동 실행 비활성화
  // });

  const onClickExpanded = useCallback((e: any, cellProps: GridCellProps, gridData: any) => {
    console.log('onClickExpanded processData', processData)
    const content = _.cloneDeep(processData);
    // for(let i=0; i<content.length; i++) {
    //   if(i === cellProps.dataIndex) {
    //     if(cellProps.field) content[i][cellProps.field] = !cellProps.dataItem[cellProps.field]
    //     break;
    //   }
    // }
    //console.log('onClickExpanded content', content)
    // setProcessData({
    //   ...processData,
    //   content,
    // })
  }, [processData])

  const [column, setColumns] = useState<GridHeader[]>([
    {
      field: "expanded",
      title: "expanded",
      width: 100,
      // cell: (props) => 
      //   <CustomExpandIconCell 
      //     {...props}
      //     onClick={onClickExpanded}
      //   />,
      cells: {data: (props) => (
        <CustomExpandIconCell 
          {...props}
          onClick={onClickExpanded}
        />
      )},
      align: "center"
    },
    {
      field: "col1",
      title: "테스트1",
      width: 150,
    },
    {
      field: "col2",
      title: "테스트2",
      width: 150,
    },
    {
      field: "col3",
      title: "테스트3",
      width: 150,
    },
  ])

  const getFakeData = async (params?: object) => {
    const result = await SampleApiService().getFakeData();
    RowSpanCellData(column, result.content, 'housingSerialNumber');
    return result;
  }

  const downloadButton = () => [
    console.log('엑셀다운로드')
  ]

  const [gridProps, setGridProps] = useState<CommonGridProps<NoticeReponse>>(
    {
      gridHeight: 400, //그리드 높이
      //columnHeader: column, //column 헤더 설정, 상단 defaultColumn 참고
      //defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
      sortableGrid: true, //전체 정렬여부
      unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
      //multipleSorting: true, //다중 컬럼 sorting 여부
      //isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부 
      isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
      checkKey: "id", //Table의 PK컬럼 필드, default: id
      //rowSelectable: true, //행 선택 가능 여부
      //isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
      headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      //isFilterResetButton: true, //필터 리셋버튼 생성여부
      //isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부(TODO: 오류 수정중)
      //isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부(TODO: 오류 수정중)

      //addButton,
      onSearch : getFakeData,
      //deleteButton : deleteNotice,
      downloadButton,
    },
  );

  //data호출시 props 전달 state 변수에 담아줌
  // useEffect(() => {
  //   // console.log('useEffect data', data)
  //   // const newData = _.cloneDeep(data)
  //   // setProcessData(newData);
  // }, [data])

  useEffect(() => {
    console.log("최신 ProcessData", processData); // 상태 업데이트 후 값 확인
    // const newColumn = _.cloneDeep(column)
    // setColumns(newColumn);
  }, [processData]);

  useEffect(() => {
    console.log("최신 onClickExpanded 재생성"); // 상태 업데이트 후 값 확인
  }, [onClickExpanded]);

  useEffect(() => {
    setProcessData(rowData)
  }, [])

  return (
    <TestGridComponent
      columnHeader={column}
      gridData={processData}
    />
  );
}
