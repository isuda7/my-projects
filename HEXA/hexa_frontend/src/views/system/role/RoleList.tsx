import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import _ from "lodash";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import {useTranslation} from "react-i18next";
import RoleApiService from "@/utils/apiService/RoleApiService.ts";
import {any} from "prop-types";
import {RoleResponseDto, RoleSearchParam} from "@/utils/apiService/type/role/RoleDto.ts";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell";
import CodeApiService from "@/utils/apiService/CodeApiService";


export default function RoleList() {
  console.log('RoleList')
  const {t} = useTranslation();

  const cellClickFunction = (e:any, dataItem:any) => {
    console.log(dataItem);
    navigate('/system/role/detail', { state: dataItem.id });
  };

  const COLUMNS: GridHeader[] = [
    {
      field: "roleCodeName",
      title: t("role.roleGroupName"),
      width: 140,
      searchkey: 'roleCode',
      filterable: true,
      filterType: "select",
      selectData: [],
      cellClick: cellClickFunction,
      cellTypeProps: {
        link: true,
      },
      align: "left"
    },
    {
      field: "roleCodeEng",
      title: t("role.roleGroupEng"),
      width: 140,
      searchkey: 'roleCode',
      filterable: true,
      filterType: "select",
      selectData: [],
      align: "left"
    },
    {
      field: "id",
      title: t("role.id"),
      hidden: true
    },
    // {
    //   field: "roleGroupDescription",
    //   title: t("common.description"),
    //   width: 200,
    //   filterable: true,
    //   align: "left"
    // },
    {
      field: "isUse",
      title: t("station.is_use"),
      width: 90,
      align: "center",
      filterable: true,
      filterType: "select",
      selectData: [
        {code: true, value: 'Y'},
        {code: false, value: 'N'},
      ],
      cell: (props: any) => <CustomRepresentativeCell {...props} />,
    },
    {
      field: "updatedAt",
      title: t("common.modification_datetime"),
      width: 140,
      align: "left",
      cellType: "dateTime", // cellType이 'dateTime'일경우 YYYY-MM-DD HH:mm:ss 형식으로 반환
    },
    {
      field: "updatedUserId",
      title: t("common.modifier_id"),
      width: 100,
      align: "left",
      filterable: true,
    },
    {
      field: "createdAt",
      title: t("common.registration_datetime"),
      width: 140,
      align: "left",
      cellType: "dateTime",
    },
    {
      field: "createdUserId",
      title: t("common.registration_id"),
      width: 100,
      align: "left",
      filterable: true,
    },

];
const showAlert = useAlert();
const navigate = useNavigate();
const gridRef = useRef<{ refetchGrid: () => void; }>(null)


const [column, setColumns] = useState<GridHeader[]>(COLUMNS);

const [roleName, setRoleName] = useState<String>();

const addButton = () => {
  console.log('addButton')
  navigate("/system/role/add");
};

const downloadButton = async (params: RoleSearchParam) => {
  // 다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
  const excelMap = column.map(v => ({[v.field]: v.title}));
  console.log('excelMap', excelMap);
  params = {
      ...params,
      "excelMap": JSON.stringify(excelMap)
  }
  const result = await RoleApiService().downloadList(params);
}

const getRoleList = async (params: RoleSearchParam) => {
  const result = await RoleApiService().getRoles(params)
  return result.data
}

const [gridProps, setGridProps] = useState<CommonGridProps<RoleResponseDto>>(
  {
    gridHeight: 550, //그리드 높이
    columnHeader: column, //column 헤더 설정, 상단 defaultColumn 참고
    defaultFilter: true, //필터 영역여부 filter를 써야한다면 필수
    sortableGrid: true, //전체 정렬여부
    unsorted: true, //정렬시 원상태로 돌아올수있는지 판단여부
    multipleSorting: true, //다중 컬럼 sorting 여부
    isReorder: true, //컬럼 위치 마우스로 변경,이동 가능 여부
    isResizable: true, //컬럼 너비 마우스로 확장 가능 여부
    checkKey: "tsid", //Table의 PK컬럼 필드, default: id
    //rowSelectable: true, //행 선택 가능 여부
    //isChecked: true, //최상단 컬럼 체크박스 생성여부, (true: 생성 다중체크가능, false: 생성x 단일 행 체크 가능)
    headerSelection: false, // true면 헤더체크박스 존재, false면 헤더 체크박스x (default: true)

    //gridData: [], // Correctly initialized as an empty array of User type
    girdToolBar: true, //gridTooBar 생성여부, false거나 하단 옵션 모두 적용불가
    displayCount: [20, 50, 100], //한페이지에 보여줄수있는 최대 row개수 목록, default: 20
    isFilterResetButton: true, //필터 리셋버튼 생성여부
    isGridResetButton: true, //그리드 상태 초기화 버튼 생성여부(TODO: 오류 수정중)
    isColumnSelectShowButton: true, //컬럼을 숨기고 보여주는 버튼 생성 여부(TODO: 오류 수정중)

    addButton,
    onSearch: getRoleList,
    //deleteButton : deleteNotice,
    downloadButton,
    queryKey: "RoleList",
  },
);
const setColumnRoleName = (seletData: any[], field: string) => {
  const newColumn = _.cloneDeep(column)
  newColumn.forEach(v => {
      if (v.field === field) v.selectData = seletData;
  })
  setColumns(newColumn);
}

const setInitData = async () => {
  // 권한
  const res = await CodeApiService().getCodesByGroupCode({groupCode: 'AUTH_USER'});
  const auth = res.data.map(item => ({
    code: item.code,
    value: item.value
  }));

  // 권한(영문)
  const res2 = await CodeApiService().getCodesByGroupCode({groupCode: 'AUTH_USER'});
  const authEng = res2.data.map(item => ({
    code: item.code,
    value: item.codeEng
  }));

  setInitColumn([auth, authEng]);
}

const setInitColumn = (seletData: any[]) => {
  console.log(seletData);
  const newColumn = _.cloneDeep(column);
  newColumn.forEach(v => {
      if (v.field === 'roleCodeName') v.selectData = seletData[0];
      if (v.field === 'roleCodeEng') v.selectData = seletData[1];
  })
  setColumns(newColumn);
}

useEffect(() => {
  
  setInitData()
}, [])


// useEffect(() => {
//   const getRoleNameList = async () => {
//     let roleNames: any[] = [];
//     const result = await RoleApiService().getRoleNames();
//     if (Array.isArray(result.data)) {
//       console.log("getRoleNameList result.data", result.data);
//       roleNames = result.data.map(v => ({code: v.roleGroupName, value: v.roleGroupName}))
//       await setColumnRoleName(roleNames, 'roleGroupName')
//     }
//     setRoleName('');
//   }
//   getRoleNameList();
// }, [])

// useEffect(() => {
//   const getRoleNameList = async () => {
//     let roleEngNames: any[] = [];
//     const result = await RoleApiService().getRoleEngNames();
//     if (Array.isArray(result.data)) {
//       console.log("getRoleNameEngList result.data", result.data);
//       roleEngNames = result.data.map(v => ({code: v.roleGroupEngName, value: v.roleGroupEngName}))
//       await setColumnRoleName(roleEngNames, 'roleGroupEngName')
//     }
//     setRoleName('');
//   }
//   getRoleNameList();
// }, [])

useEffect(() => {
  setGridProps({
    ...gridProps,
    columnHeader: column,
  })
}, [column])

return (
  <>
  <Header headName={t("role.role_management")/*권한 관리*/}/>
  <GridCommonComponent
    {...gridProps}
    ref={gridRef}
  />

  </>
  );
}
