import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import SampleApiService from "@/utils/apiService/SampleApiService.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import useAlert from "@/hooks/useAlert.tsx";
import { getFormattedTime } from "@/utils/common"
import _ from 'lodash';
import RowSpanCellData from "@/components/kendo/grid/RowSpanCellData.tsx";

//Type
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { NoticeReponse } from "@/utils/apiService/type/auth/Notice.type.ts";

export default function SampleGrid3() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null)

  const [columns, setColumns] = useState<GridHeader[]>([
    {
      field: "title",
      title: "title",
      filterable: true,
      isRowSpan: true,
    },
    {
      field: "numberValue",
      title: "number\nCase",
      cellType: "number",
      align: "right",
      width: 120,
    },
    {
      field: "numberValue2",
      title: "number\nCase2",
      cellType: "number",
      align: "right",
      width: 100,
      cellTypeProps: {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
      //소수점 2자리 고정을 원할땐 이렇게
    },
    {
      field: "numberValue3",
      title: "number\nCase3",
      cellType: "number",
      align: "right",
      width: 100,
      cellTypeProps: {
        style: 'unit',   // 단위 스타일
        unit: 'kilogram', // 'kg' 단위를 사용
        unitDisplay: 'short' // 'short'는 'kg'처럼 짧은 형식, 'long'은 'kilograms'
      },
    },
    {
      field: "description",
      title: "description",
      filterable: true,
      isRowSpan: true,
    },
    {
      field: "typeCd",
      title: "typeCd",
      width: 200,
      filterable: true,
      filterType: "multiSelect", //TODO : 임시로 제작 MultiSelect 추후 퍼블리싱받아 컴포넌트 수정예정
      selectData: [],
      cellType: 'select',
    },
    {
      field: "fileName",
      title: "fileName",
      hidden: true,
    },
    {
      field: "createdAt",
      title: "createdAt",
      width: 200,
      align: "left",
      cellType: "date", //cellType이 'date'일경우 YYYY-MM-DD HH:mm:ss 형식으로 반환
    },
    {
      field: "updatedAt",
      title: "updatedAt",
      width: 200,
      align: "left",
      cellType: "date", //cellType이 'date'일경우 YYYY-MM-DD 형식으로 반환
      cellTypeProps: {
        format: 'YYYY-MM-DD HH:mm' //원하는 포맷을 옵션으로 주어 원하는 모습으로 나오게 할 수 있음
      }
    },
  ])

  const setInitColumn = (typeData: any[]) => {
    const newColumn = _.cloneDeep(columns)
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

  const cellClickAlert = () => {
    console.log("cellClickAlert~!!!!!!!!!!!!!!!");
    showAlert({ title: "Test", message: "TestMessage" });
  };

  const downloadButton = () => {
    console.log('엑셀다운로드')
  }

  const getNoticeList = async (params?: object) => {
    const result = await SampleApiService().getNoticeAll(params);
    const content = RowSpanCellData(columns, Array.isArray(result?.data) ? result.data : []);
    let list = [];
    if(Array.isArray(content)) list = getNumberValueDup(content);

    const resultData = {
      content : list,
      paging: {
        totalElements: list.length,
      },
    }

    return resultData;
  }

  /**
   * 데이터 그리드의 조회 결과를 가공해서 리턴해줘야할경우 onSearch시점에 가공
   * @param data<Array>
   * @returns 
   */
  const getNumberValueDup = (list: any[]) => {
    list.forEach(v => {
      v.numberValue = Math.floor(Math.random() * 10000000) + 1;
      v.numberValue2 = Math.floor(Math.random() * 100) + 1;
      v.numberValue3 = Math.floor(Math.random() * 10000) + 1;
    })
    return list;
  }

  const gridInfoMessage = () => {
    return <span style={{color: 'red'}}>Grid왼쪽 상단 메세지 Custom</span>
  }


  const [gridProps, setGridProps] = useState<CommonGridProps<NoticeReponse>>(
    {
      gridHeight: 400, //그리드 높이
      columnHeader: columns, //column 헤더 설정, 상단 defaultColumn 참고
      //defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
      sortableGrid: true, //전체 정렬여부
      unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
      multipleSorting: true, //다중 컬럼 sorting 여부
      //isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부 
      //isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
      checkKey: "id", //Table의 PK컬럼 필드, default: id
      //rowSelectable: true, //행 선택 가능 여부
      //isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
      //headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      //displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      //isFilterResetButton: true, //필터 리셋버튼 생성여부
      //isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부(TODO: 오류 수정중)
      //isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부(TODO: 오류 수정중)
      pagination: false, //pagination이 필요없는경우 해당옵션적용 (default: true)

      //addButton,
      onSearch : getNoticeList,
      //deleteButton : deleteNotice,
      //downloadButton,
      queryKey : "notice3",
      gridInfoMessage,
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
      columnHeader: columns,
    })
  }, [columns])

  return (
    <>
      <GridCommonComponent
        {...gridProps}
        ref={gridRef}
      />
    </>
  );
}
