/**
 * 스테이션 QR 코드 관리 목록 Component
 * URL: /station/code/qr
 */

/* React */
import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationQrCodeModal from "./modal/StationQrCodeModal";
import CustomQrCodeCell from "@/views/station/components/CustomQrCodeCell"
import QrCodeCreateModal from "./modal/QrCodeCreateModal";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';
//TODO: 추후 공식 버튼외 리스트 버튼 어떻게 정리할지 컴포넌트 제작할지 판단함
import { useSelector } from "react-redux";
import {flattenMenu} from "@/utils/common.ts";
import {menuSelector} from "@/store/modules/userStore.ts";
import {Menu} from "@/utils/apiService/type/auth/menu.type.ts";

/* Type */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationQrCodeDto } from "@/utils/apiService/type/station/StationQrCodeDto";
import { StationIdCodeDto } from "@/utils/apiService/type/station/StationIdCodeDto";

export default function StationQrCodeList() {
  const {t} = useTranslation();
	const showAlert = useAlert();
	const menuList = useSelector(menuSelector);
  const gridRef = useRef<{ 
		refetchGrid: () => void; 
		getSeletedDataItems: () => void
	}>(null);
	const [buttonList, setButtonList] = useState<any[]>([])

	//Modal관련 변수설정 - 인쇄하기
	const [printModalOpen, setPrintModalOpen] = useState<boolean>(false);
	const [modalData, setModalData] = useState<any>([])
	
	//신규등록 - 모달
	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t("station.qr_id"), //QR ID",
			width: 90,
			filterable: true,
			align: 'center',
		},
		{
			field: "stationId",
			title: t("station.station_id"), //스테이션ID",
			width: 120,
			filterable: true,
		},
		{
			field: "stationName",
			title: t("station.station_name"), //"스테이션명",
			width: 120,
			filterable: true,
		},
		{
			field: "cityCode",
			title: t("station.city_unit"), //"시 단위",
			width: 120,
			filterable: true,
			filterType: "multiSelect",
			selectData: [],
			cellType: 'select',
		},
		{
			field: "idCodeTsid",
			title: t("station.district_unit"), //"구 단위",
			width: 100,
			filterable: true,
			filterType: "multiSelect",
			selectData: [],
			cellType: 'select',
		},
		{
			field: "qrCode",
			title: t("station.qr_code"), //"Qr코드",
			width: 100,
			cell: (props: any) => <CustomQrCodeCell {...props} />,
			align: 'center',
			sortable: false,
		},
		{
			field: "createdAt",
			title: t("common.creation_datetime"), //"생성일시",
			cellType: "dateTime",
			width: 100,
			align: 'center'
		},
		{
			field: "createdUserId",
			title: t("common.creation_id"), //"생성자 ID",
			filterable: true,
			width: 100,
		},
  ])

  const getStationCodeList = async (params: any) => {
		const result = await StationApiService().getStationQrCodeList(params);
		return result.data;
  }

	const printButton = async () => {
		let selectedRows: any = [];
		if(gridRef) selectedRows = gridRef.current?.getSeletedDataItems();

		console.log('selectedRows', selectedRows)

		if(selectedRows.length === 0) {
			//'스테이션를 먼저 선택해 주세요'
			showAlert({message: t("station.station_select_alert")})
			return;
		}
		setModalData(selectedRows)
	} 
	
  const [gridProps, setGridProps] = useState<CommonGridProps<StationQrCodeDto>>(
		{
			gridHeight: 500,
			columnHeader: columns,
			defaultFilter: true,
			sortableGrid: true,
			unsorted: true,
			multipleSorting: true,
			girdToolBar: true,
			//gridData: [], // Correctly initialized as an empty array of User type
			displayCount: [20, 50, 100],
			//isFilterResetButton: true,
			//isGridResetButton: true,
			//isColumnSelectShowButton: true,
			rowSelectable: true,
			queryKey: "stationQrCode",
			isChecked: true,
			printButton,
		},
  );

	/**
	 * 시코드, 구 전체코드 목록 호출
	 * @returns 
	 */
	const setInitData = async () => {
		//시코드 호출
		let citys: any[] = [];
		const res2 = await StationApiService().getCityList();
		if(Array.isArray(res2?.data)) citys = res2?.data?.map(v => ({code: v.cityCode, value: v.cityName}))
		
		//구 코드
		let districts: any[] = [];
		const resData = await StationApiService().getStationCodeList({page:0, size:9999});
		if(resData.data && Array.isArray(resData?.data?.content)) {
			districts = (resData.data.content as StationIdCodeDto[]).map((v: StationIdCodeDto) => ({code: v.tsid, value: v.districtName}))
		}
		console.log('districts', districts)

		setInitColumn([citys, districts])
	}

	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if(v.field === 'cityCode') v.selectData = seletData[0];
			if(v.field === 'idCodeTsid') v.selectData = seletData[1];
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

	useEffect(() => {
		if(modalData.length > 0) {
			setPrintModalOpen(true)
		}
	}, [modalData])

	useEffect(() => {
		if(printModalOpen === false) {
			setModalData([])
		}
	}, [printModalOpen])

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
					className="btn-in-icon"
					onClick={() => setCreateModalOpen(true)}
				>
					{t('station.qr_creation') /* 신규 생성  */}
					<i className="icon icon-new-add"></i>
				</Button>
			])
		}
	}

	const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

  return (
		<>
			{/* 스테이션 QR 코드 관리 */}
			<Header headName={t("station.station_qr_code_management")} />
			<section className="section">
				<GridCommonComponent
					{...gridProps}
					onSearch={getStationCodeList}
					ref={gridRef}
					buttonList={buttonList}
				/>
			</section>
			{printModalOpen && (
				<StationQrCodeModal
					data = {modalData}
					onClose={() => setPrintModalOpen(false)}
				/>
			)}
			{
				createModalOpen && (
					<QrCodeCreateModal
						onClose={(flag: string) => {
							setCreateModalOpen(false)
							if(flag === 'success') {
								searchEvent();
							}
						}}
					/>
				)
			}
		</>
  );
}
