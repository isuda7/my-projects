import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent";
import useAlert from "@/hooks/useAlert.tsx";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import _ from "lodash";
import Footer from "@/components/common/Footer.tsx";
import Header from "@/new_components/common/Header.tsx";
import {useTranslation} from "react-i18next";
import UserApiService from "@/utils/apiService/UserApiService.ts";
import {UserSearchParam} from "@/utils/apiService/type/user/user.type.ts";
import {UserResponseDto} from "@/utils/apiService/type/user/UserResponseDto.ts";
import RoleApiService from "@/utils/apiService/RoleApiService.ts";
import {any} from "prop-types";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell";
import CodeApiService from "@/utils/apiService/CodeApiService";


export default function UserList() {
  console.log('UserList')
  const {t} = useTranslation();

  const cellClickFunction = (e:any, dataItem:any) => {
	console.log(dataItem);
	  navigate('/system/user/detail', { state: dataItem.userId });
  };

  const COLUMNS: GridHeader[] = [
	{
		field: "roleCode",
		title: t("user.role"),
		width: 100,
		align: "left",
		searchkey: 'roleCode',
		filterable: true,
		filterType: "select",
		cellType: "select",
		selectData: []
	},
	{
		field: "id",
		title: t("user.id"),
		hidden: true
	},
	{
	  field: "userId",
	  title: t("user.user_id"),
	  filterable: true,
	  width: 90,
		align: "left",
	  cellClick: cellClickFunction,
	  cellTypeProps: {
		link: true,
	  },
	},
	{
	  field: "userName",
	  title: t("common.name"),
	  width: 90,
	  filterable: true,
		align: "center"
	},
	{
	  field: "email",
	  title: t("user.email_adress"),
	  width: 140,
	  filterable: true,
		align: "left",
	},
	{
	  field: "cellPhone",
	  title: t("common.cellphone"),
	  width: 140,
	  filterable: true,
		align: "left",
		cellType: 'phone'
	},
	{
		field: "isActive",
		title: t("user.isActive"),
		width: 90,
		filterable: true,
		filterType: "select",
		selectData: [
			{code: true, value: 'Y'},
			{code: false, value: 'N'},
		],
		align: 'center',
		cell: (props: any) => <CustomRepresentativeCell {...props} />,
	},
	{
		field: "isMobileAccess",
		title: t("user.isMobileAccess"),
		width: 90,
		filterable: true,
		filterType: "select",
		selectData: [
			{code: true, value: 'Y'},
			{code: false, value: 'N'},
		],
		align: 'center',
		cell: (props: any) => <CustomRepresentativeCell {...props} />,
	},
	{
	  field: "isLock",
	  title: t("user.isLock"),
	  width: 90,
	  filterable: true,
	  filterType: "select",
	  selectData: [
			{code: true, value: 'Y'},
			{code: false, value: 'N'},
		],
		align: 'center',
		cell: (props: any) => <CustomRepresentativeCell {...props} />,
	},
	{
	  field: "updatedAt",
	  title: t("common.modification_datetime"),
	  width: 100,
	  align: "left",
	  cellType: "dateTime", // cellType이 'dateTime'일경우 YYYY-MM-DD HH:mm:ss 형식으로 반환
	},
	{
	  field: "updatedUserId",
	  title: t("common.modifier_id"),
	  width: 120,
		align: "left",
	  filterable: true,
	},
	{
	  field: "createdAt",
	  title: t("common.registration_datetime"),
	  width: 100,
	  align: "left",
	  cellType: "dateTime",
	},
	{
	  field: "createdUserId",
	  title: t("common.registration_id"),
	  width: 120,
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
	navigate("/system/user/add");
  };

  const downloadButton = async (params: UserSearchParam) => {
	// 다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
	const excelMap = column.map(v => ({[v.field]: v.title}));
	console.log('excelMap', excelMap);
	params = {
	  ...params,
	  "excelMap": JSON.stringify(excelMap)
	}
	const result = await UserApiService().downloadList(params);
  }

  const getUserList = async (params: UserSearchParam) => {
	const result = await UserApiService().getUsers(params);
	return result.data
  }

  const [gridProps, setGridProps] = useState<CommonGridProps<UserResponseDto>>(
	{
	  gridHeight: 550, //그리드 높이
		maxHeight: 600,
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
	  onSearch: getUserList,
	  //deleteButton : deleteNotice,
	  downloadButton,
	  queryKey: "UserList",
	},
  );
  // const setColumnRoleName = (seletData: any[], field: string) => {
	// 	const newColumn = _.cloneDeep(column)
	// 	newColumn.forEach(v => {
	// 		if (v.field === field) v.selectData = seletData;
	// 	})
	// 	setColumns(newColumn);
  // }

	const setInitData = async () => {
		// 구분
		const res = await CodeApiService().getCodesByGroupCode({groupCode: 'AUTH_USER'});
		const smpvtp = res.data;

		setInitColumn([smpvtp]);
	}

	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(column);
		newColumn.forEach(v => {
				if (v.field === 'roleCode') v.selectData = seletData[0];
		})
		setColumns(newColumn);
	}

	useEffect(() => {

		setInitData()
	}, [])

  // useEffect(() => {
	// const getRoleNameList = async () => {
	// 	let roleNames: any[] = [];
	//   const result = await RoleApiService().getRoleNames();
	//   if (Array.isArray(result.data)) {
	// 	  console.log("getRoleNameList result.data", result.data);
	// 	  roleNames = result.data.map(v => ({code: v.roleCodeName, value: v.roleCodeName}))
	// 	  await setColumnRoleName(roleNames, 'roleCode')
	//   }
	// 	setRoleName('');
	// }
	//   getRoleNameList()
  // }, [])

  useEffect(() => {
	setGridProps({
	  ...gridProps,
	  columnHeader: column,
	})
  }, [column])

  return (
	<>
		<Header headName={t("user.user_management")/*사용자 관리*/}/>
		<GridCommonComponent
		{...gridProps}
		ref={gridRef}
		/>

	</>
  );
}
