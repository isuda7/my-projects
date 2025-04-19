/**
 * 스테이션 설정 관리 Component
 * URL: /station/config/management
 */

/* React */
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationApiService from "@/utils/apiService/StationApiService";
import Header from "@/new_components/common/Header.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

//Types
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationConfigJobDto } from "@/utils/apiService/type/station/StationConfigDto"


export default function StationFirmwareDeployList() {
  const {t} = useTranslation();
	const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	/**
	 * 상세 이동
	 */
	const moveDetailFirmwareDeploy = (data: any) => {
		const state = {id: data.id}
		navigate(`/station/config/management/detail`, { state })
	}


  const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t('station.control_id'), //"제어 ID",
			width: 120,
			filterable: true,
			cellClick: (e: any, data: any) => moveDetailFirmwareDeploy(data)
		},
		{
			field: "configCode",
			title: t('station.control'), //"제어",
			width: 120,
			filterable: true,
			selectData: [],
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "col1",
			title: t('station.target_station'), //"대상 스테이션",
			children: [
				{
					field: "totalCount",
					title: t('station.all'), //"전체",
					width: 60,
					align: 'center',
				},
				{
					field: "succeedCount",
					title: t('station.success'), //"성공",
					width: 60,
					align: 'center',
				},
				{
					field: "inProgressCount",
					title: t('station.deploying'), //"배포중",
					width: 60,
					align: 'center',
				},
				{
					field: "failedCount",
					title: t('station.failed'), //"실패",
					width: 60,
					align: 'center',
				},
			]
		},
		{
			field: "createdAt",
			title: t('station.control_datetime'), //"제어일시",
			cellType: "dateTime",
			width: 140,
			align: 'center',
		},
		{
			field: "createdByUserId",
			title: t('station.controller_id'), //"제어자 ID",
			filterable: true,
			width: 140,
		},
  ])

  const getStationConfigMangementList = async (params: any) => {
		const result = await StationApiService().getStationConfigMangementList(params);
		return result.data;
  }

	const downloadButton = async (params?: object) =>  {
    const prefixedFields = new Map([ // field명 변경할 field 목록
      ["configCode", "configName"],
    ]);

    const excelMap = columns
      .flatMap(v => v.children ? v.children : v)
      .flatMap(v => {
        const newField = prefixedFields.has(v.field)? prefixedFields.get(v.field) : v.field;
        return [{ [newField]: v.title }];
      }
    );

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }

    await StationApiService().downloadExcelStationConfigJob(excelParams);
  }

	const addButton = () => {
		navigate("/station/config/management/add");
	}
	
  const [gridProps, setGridProps] = useState<CommonGridProps<StationConfigJobDto>>(
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
			//rowSelectable: true,
			checkKey: "tsId",
			queryKey: "stationConfigManage",
			//isChecked: true,
			downloadButton,
			addButton,
		},
  );

	/**
	 * 시코드, 구 전체코드 목록 호출
	 * @returns 
	 */
	const setInitData = async () => {
		//고객구분코드(GS25 등...)
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCNF'});
		const configCodes = res.data;
		
		setInitColumn([configCodes])
	}

	const searchEvent = () => {
    if (gridRef.current) {
      gridRef.current.refetchGrid();
    }
  }

	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if(v.field === 'configCode') v.selectData = seletData[0];
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

  return (
		<>
			{/* 스테이션 설정 관리 */}
			<Header headName={t('station.station_settings_management')} />
			<GridCommonComponent
				{...gridProps}
				onSearch={getStationConfigMangementList}
				ref={gridRef}
			/>
		</>
  );
}
