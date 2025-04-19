/**
 * 스테이션 정보 관리 Component
 * URL: /station/info/management
 */

/* React */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationInfoExcelUpload from "@/views/station/info/management/modal/StationInfoExcelUpload"

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";
import { StationIdCodeDto } from "@/utils/apiService/type/station/StationIdCodeDto";


export default function StationInfoManagementList() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	
	const cellClickFunction = (event: React.MouseEvent, dataItem: any) => {
		navigate(`/station/info/management/detail/${dataItem.id}`)
	}

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t("station.station_id"), //"스테이션 ID",
			width: 120,
			filterable: true,
			align: 'center',
			cellClick: (e, dataItem) => cellClickFunction(e, dataItem)
		},
		{
			field: "name",
			title: t("station.station_name"), //"스테이션 명",
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "qrId",
			title: t("station.qr_id"), //"QR ID",
			width: 100,
			filterable: true,
			align: 'center',
		},
		{
			field: "customerCode",
			title: t("station.customer_category"), //"고객구분",
			width: 100,
			filterable: true,
			selectData: [],
			filterType: 'multiSelect',
			cellType: 'select',
		},
		{
			field: "cityCode",
			title: t("station.city_unit"), //"시 단위",
			width: 110,
			filterable: true,
			selectData: [],
			filterType: 'multiSelect',
			cellType: 'select',
		},
		{
			field: "idCodeTsid",
			title: t("station.district_unit"), //"구 단위",
			width: 100,
			filterable: true,
			selectData: [],
			filterType: 'multiSelect',
			cellType: 'select',
			align: 'center',
		},
		{
			field: "slotCount",
			title: t("station.slot_count"), //"슬롯개수",
			width: 100,
			filterable: true,
			selectData: [],
			filterType: 'select',
			cellType: 'select',
			align: 'center',
		},
		{
			field: "isVisibleAtApp",
			title: t("station.app_visibility"), //"App 노출여부",
			width: 110,
			filterable: true,
			selectData: [
				{code: true, value: 'Y'},
				{code: false, value: 'N'},
			],
			filterType: 'select',
			align: 'center',
			cell: (props: any) => <CustomRepresentativeCell {...props} />,
		},
		{
			field: "statusCode",
			title: t("station.station_status"), //"스테이션상태",
			width: 100,
			filterable: true,
			selectData: [],
			filterType: 'select',
			cellType: 'select',
		},
		{
			field: "installedAt",
			title: t("station.installation_date"), //"설치일",
			width: 110,
			cellType: 'date',
			align: 'center'
		},
		{
			field: "unUsedAt",
			title: t("station.unused_registration_date"), //"미사용 등록일",
			width: 100,
			cellType: 'date',
			align: 'center'
		},
		{
			field: "swAppVersion",
			title: t("station.sw_app"), //"SW App",
			width: 100,
			align: 'center'
		},
		{
			field: "slotFwVersion",
			title: t("station.slot_firmware"), //"슬롯 펌웨어",
			width: 100,
			align: 'center'
		},
		{
			field: "chargerFwVersion",
			title: t("station.charger_firmware"), //"충전기 펌웨어",
			width: 100,
			filterable: true,
			align: 'center'
		},
		{
			field: "nfcFwVersion",
			title: t("station.nfc_firmware"), //"NFC 펌웨어",
			width: 100,
			filterable: true,
			align: 'center'
		},
		{
			field: "bmsFwVersion",
			title: t("station.bms_firmware"), //"BMS 펌웨어",
			width: 100,
			filterable: true,
			align: 'center'
		},
		{
			field: "chassisFwVersion",
			title: t("station.case_firmware"), //"함체 펌웨어",
			width: 100,
			filterable: true,
			align: 'center'
		},
		{
			field: "chargeProfileCount",
			title: t("station.charge_profile_no_cnt"), //"충전 프로파일 No 개수",
			width: 100,
			align: 'center'
		},
		{
			field: "updatedAt",
			title: t("common.modification_datetime"), //"수정일시",
			width: 110,
			cellType: 'dateTime',
		},
		{
			field: "updatedUserId",
			title: t("common.modifier_id"), //"수정자 ID",
			width: 100,
			filterable: true,
		},
		{
			field: "createdAt",
			title: t("common.registration_datetime"), //"등록일시",
			width: 110,
			cellType: 'dateTime',
		},
		{
			field: "createdUserId",
			title: t("common.registration_id"), //"등록자 ID",
			width: 100,
			filterable: true,
		},
	])

	const getStationInfoList = async (params: any) => {
		const result = await StationApiService().getStationInfoList(params);
		return result.data;
	}

	const downloadButton = async (params?: object) => {
		const changeFields = new Map([ // field명 변경할 field 목록
      ["customerCode", "customerName"],
      ["cityCode", "cityName"],
      ["idCodeTsid", "districtName"],
      ["statusCode", "statusName"],
    ]);
		const excelMap = columns
			.map(v => {
				const newField: any = changeFields.has(v.field)? changeFields.get(v.field) : v.field;
				return {[newField]: v.title }
			}
		)

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationInfo(excelParams);
	}

	const addButton = () => {
		navigate('/station/info/management/add');
	}

	const gridInfoMessage = () => 
		<span className="c-red">
			{/* ※ 스테이션내에서 펌웨어 버전이 상이한 상태입니다. */}
			{t("station.station_firmware_version_alert")}
		</span>

	const uploadButton = () => {
		setModalOpen(true);
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDto>>(
		{
			gridHeight: 600,
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
			checkKey: "tsId",
			queryKey: "stationInfo",
			downloadButton,
			uploadButton,
			addButton,
			gridInfoMessage,
		},
	);

	const searchEvent = () => {
		if (gridRef.current) {
			gridRef.current.refetchGrid();
		}
	}

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//고객구분코드(GS25 등...)
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCUST'});
		const smcust = res.data;

		//시코드 호출
		let citys: any[] = [];
		const res2 = await StationApiService().getCityList();
		if(Array.isArray(res2?.data)) citys = res2?.data?.map(v => ({code: v.cityCode, value: v.cityName}))
		
		//구 코드
		let districts: any[] = [];
		const resData = await StationApiService().getStationCodeList({page:0, size:9999, sort:['districtName,asc']});
		if(resData.data && Array.isArray(resData?.data?.content)) {
			districts = (resData.data.content as StationIdCodeDto[]).map((v: StationIdCodeDto) => ({code: v.tsid, value: v.districtName}))
		}

		//슬롯개수
		const res4 = await CodeApiService().getCodesByGroupCode({groupCode:'SMSLCNT'});
		const smslcnt = res4.data;

		//스테이션 상태(SMSTA)
		const res5 = await CodeApiService().getCodesByGroupCode({groupCode:'SMSTA'});
		const smsta = res5.data;

		setInitColumn([smcust, citys, districts, smslcnt, smsta])
	}


	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'customerCode') v.selectData = seletData[0];
			if (v.field === 'cityCode') v.selectData = seletData[1];
			if (v.field === 'idCodeTsid') v.selectData = seletData[2];
			if (v.field === 'slotCount') v.selectData = seletData[3];
			if (v.field === 'statusCode') v.selectData = seletData[4];
		})
		setColumns(newColumn);
	}

	useEffect(() => {
		setInitData();
	}, [])

	useEffect(() => {
		setGridProps({
			...gridProps,
			columnHeader: columns,
		})
	}, [columns])

	const onCloseModal = () => {
		setModalOpen(false);
	}

	const onExcelUpload = () => {
		showAlert({message: t('common.save_success')})
		setModalOpen(false);
		if(gridRef.current){
      gridRef.current.refetchGrid();
    }
	}

	return (
		<>
			{/* 스테이션 정보 관리 */}
			<Header headName={t("station.station_info_management")} />
			<GridCommonComponent
				{...gridProps}
				onSearch={getStationInfoList}
				ref={gridRef}
			/>
			{
				modalOpen &&
					<StationInfoExcelUpload 
						onClose={onCloseModal}
						onConfirm={onExcelUpload}
					/>
			}
		</>
	);
}
