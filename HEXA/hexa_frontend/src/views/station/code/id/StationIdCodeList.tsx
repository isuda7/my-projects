/**
 * 스테이션ID 코드 목록 Component
 * URL: /station/code/id
 */
/* React */
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationIdExcelUpload from "./modal/StationIdExcelUpload";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';
//TODO: 추후 공식 버튼외 리스트 버튼 어떻게 정리할지 컴포넌트 제작할지 판단함
import { useSelector } from "react-redux";
import {flattenMenu} from "@/utils/common.ts";
import {menuSelector} from "@/store/modules/userStore.ts";
import {Menu} from "@/utils/apiService/type/auth/menu.type.ts";

/* Type */
import {StationIdCodeDto} from "@/utils/apiService/type/station/StationIdCodeDto";
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";


export default function StationIdCodeList() {
  const {t} = useTranslation();
	const showAlert = useAlert();
  const navigate = useNavigate();
	const menuList = useSelector(menuSelector);
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);
	const [buttonList, setButtonList] = useState<any[]>([])

	//Modal관련 변수설정
	const [openModal, setOpenModal] = useState<boolean>(false);

  const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "cityName",
			title: t("station.city_unit"),//"시 단위",
			width: 120,
			filterable: true,
			filterType: "multiSelect",
			selectData: [],
		},
		{
			field: "cityCode",
			title: t("station.city_code"), //"시 코드",
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "districtName",
			title: t("station.district_unit"), //"구 단위",
			width: 100,
			filterable: true,
			filterType: "select",
			selectData: [],
		},
		{
			field: "districtCode",
			title: t("station.district_code"), //"구 코드",
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "createdAt",
			title: t("common.registration_datetime"), //"등록일시",
			cellType: "dateTime",
			width: 100,
		},
		{
			field: "createdUserId",
			title: t("common.registration_id"), //"등록자ID",
			filterable: true,
			width: 100,
		},
  ])

  const getStationCodeList = async (params: any) => {
		const result = await StationApiService().getStationCodeList(params);
		return result.data;
  }

	const uploadButton = () => {
		setOpenModal(true)
	}

	const downloadButton = async (params?: object) =>  {
    //다운로드시 필요한 컬럼만 추출 가능  ex) {field: 'title', title: '제목'};
    const excelMap = columns.map(v => ({[v.field] : v.title}));
    console.log('excelMap', excelMap);
    params = {
      ...params,
      'excelMap': JSON.stringify(excelMap)
    }
    await StationApiService().excelDownloadIdCode(params);
  }
	
  const [gridProps, setGridProps] = useState<CommonGridProps<StationIdCodeDto>>(
		{
			gridHeight: 500,
			columnHeader: columns,
			defaultFilter: true,
			sortableGrid: true,
			unsorted: true,
			multipleSorting: true,
			isReorder: true,
			isResizable: true,
			girdToolBar: true,
			//gridData: [], // Correctly initialized as an empty array of User type
			displayCount: [20, 50, 100],
			isFilterResetButton: true,
			isGridResetButton: true,
			isColumnSelectShowButton: true,
			//rowSelectable: true,
			checkKey: "tsId",
			queryKey: "stationIdCode",
			//isChecked: true,
			//addButton,
			uploadButton,
			downloadButton,
		},
  );

	const buttonListSetting = () => {
		let path = window.location.pathname;
		const flatMenuList = flattenMenu(menuList);
		const thisMenu = flatMenuList.find((menu: Menu) => menu.url === path);
		const menuGrantType = thisMenu?.grantType;
		const createFlag = menuGrantType?.find((v: any) => v === 'CREATE')? true : false;

		if(createFlag) {
			setButtonList([
				<Button 
					size={"medium"} 
					themeColor={"primary"} 
					onClick={() => navigate("/station/code/id/add-city")}	
				>
					{t("station.add_city_code")/* 시코드 추가 */} 
				</Button>,
				<Button 
					size={"medium"} 
					themeColor={"primary"} 
					onClick={() => navigate("/station/code/id/add-district")}	
				>
					{t("station.add_district_code")/* 구코드 추가 */} 
				</Button>
			])
		}
	}

	/**
	 * 엑셀 업로드 저장 완료후 동작
	 */
	const onConfirm = async () => {
		showAlert({message: t("common.register_success")}) //'등록되었습니다.'
		setOpenModal(false);
		gridRef.current?.refetchGrid();
	}

	/**
	 * 시코드, 구 전체코드 목록 호출
	 * 버튼리스트 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		const cityRes = await StationApiService().getCityList();
		let cityNameSelectData: any[] = [];
		if(Array.isArray(cityRes?.data)) cityNameSelectData = cityRes?.data?.map(v => ({code: v.cityName, value: v.cityName}))
			console.log('cityNameSelectData', cityNameSelectData)
		
		const districtRes = await StationApiService().getDistrictList();
		let districtNameSelectData: any[] = [];
		if(Array.isArray(districtRes?.data)) districtNameSelectData = districtRes?.data?.map(v => ({code: v.districtName, value: v.districtName}))

		setInitColumn([cityNameSelectData, districtNameSelectData])
	}

	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if(v.field === 'cityName') v.selectData = seletData[0];
			if(v.field === 'districtName') v.selectData = seletData[1];
		})
		setColumns(newColumn);
	}

	useEffect(() => {
		setInitData();
		buttonListSetting();
	}, [])

	useEffect(() => {
    setGridProps({
      ...gridProps,
      columnHeader: columns,
    })
  }, [columns])

  return (
		<>
			{/* "스테이션 ID 코드 관리" */}
			<Header headName={t("station.station_id_code_management")} />
			<GridCommonComponent
				{...gridProps}
				onSearch={getStationCodeList}
				ref={gridRef}
				buttonList = {buttonList} 
			/>
			{openModal && (
				<StationIdExcelUpload 
					//스테이션 ID코드 엑셀 업로드
					title={t("station.station_id_code_excel_upload")}
					onClose={() => setOpenModal(false)}
					onConfirm={onConfirm}
				/>
			)}
		</>
  );
}
