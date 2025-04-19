import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import SampleApiService from "@/utils/apiService/SampleApiService.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import useAlert from "@/hooks/useAlert.tsx";
import { getFormattedTime } from "@/utils/common"
import _ from 'lodash';
import CustomCellComponent from './custom/CustomCellComponent';
import CustomCellStatus from "@/components/kendo/common/CustomCellStatus.tsx";

//Type
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { NoticeReponse } from "@/utils/apiService/type/auth/Notice.type.ts";

export default function SampleGrid2() {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null)
  //const [typeData, setTypeData] = useState<any[]>([])

  const cellClickFunction = (e:any, dataItem:any) => {
    navigate(`./${dataItem.id}`);
  };

  const [column, setColumns] = useState<GridHeader[]>([
    {
      field: "title",
      title: "title",
      filterable: true,
      //cellClick: cellClickFunction,
      //cellType: 'link',
      backgroundcolor: '#f9edcb'
    },
    {
      field: "custom",
      title: "Custom Cell",
      cell: (props) => <CustomCellComponent {...props}/>,
      width: 120,
    },
    {
      title: 'test멀티헤더',
      field: 'testField',
      children: [
        {
          field: "description",
          title: "description",
          filterable: true,
        },
        {
          field: "typeCd",
          title: "typeCd",
          width: 120,
          filterable: true,
          filterType: "multiSelect", //TODO : 임시로 제작 MultiSelect 추후 퍼블리싱받아 컴포넌트 수정예정
          selectData: [],
          cellType: 'select',
          align: "center",
        },
      ]
    },
    {
      field: "fileName",
      title: "fileName",
      hidden: true,
    },
    {
      title: '시간범위',
      field: "time", //임의의 필드명이라도 필수적으로 전달
      children : [
        {
          field: "createdAt",
          title: "createdAt",
          width: 200,
          align: "left",
          cell: (props: any) => <div>{getFormattedTime(props.dataItem[props.field])}</div> //함수를 이용해 원하는 셀형태를 만들어 줄 수 있음
        },
        {
          field: "updatedAt",
          title: "updatedAt",
          width: 200,
          align: "left",
          cellType: "dateTime", //cellType이 'dateTime'일경우 YYYY-MM-DD HH:mm:ss 형식으로 반환
        },
      ]
    },
    // {
    //   field: "checkTest",
    //   title: "체크박스",
    //   width: 100,
    //   align: "center",
    //   //cellType: "checkbox",
    // },
  ])

  const setInitColumn = (typeData: any[]) => {
    const newColumn = _.cloneDeep(column)
    newColumn.map(v => {
      if(v.children) {
        v.children.map(w => {
          if (w.field === 'typeCd') w.selectData = typeData;
        })
      }
    })
    setColumns(newColumn);
  }

  const addButton = () => {
    navigate("./add");
  };

  const downloadButton = () => [
    console.log('엑셀다운로드')
  ]

  const getNoticeList = async (params?: object) => {
    const result = await SampleApiService().getNoticeList(params);
    return addCustomData(result.data);
  }

  const addCustomData = async (data: any) => {
    data.content.forEach((v: any, i: number) => {
      const mod = (i+1)%3;
      switch(mod) {
        case 0 : v.custom = 'red'; break;
        case 1 : v.custom = 'blue'; break;
        case 2 : v.custom = 'orange'; break;
        default: break;
      }
    })

    return data;
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
      //rowSelectable: true, //행 선택 가능 여부
      //isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
      headerSelection: true, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

      //gridData: [], // Correctly initialized as an empty array of User type
      girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
      displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
      isFilterResetButton: true, //필터 리셋버튼 생성여부
      isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부(TODO: 오류 수정중)
      isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부(TODO: 오류 수정중)

      //addButton,
      onSearch : getNoticeList,
      //deleteButton : deleteNotice,
      downloadButton,
      queryKey : "notice2",
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
      <GridCommonComponent
        {...gridProps}
        ref={gridRef}
      />
    </>
  );
}
