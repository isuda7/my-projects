/**
 * 펌웨어 배포 관리 Component
 * URL: /station/firmware/deploy
 */

/* React */
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import DateRange, { DateRangeProps } from "@/components/common/DateRange.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationApiService from "@/utils/apiService/StationApiService";
import CustomFirmwareListCell from "./components/CustomFirmwareListCell"
import StationFirmwareWaitListModal from "./modal/StationFirmwareWaitListModal"
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

//Types
import { StationFirmwareDeployDto } from "@/utils/apiService/type/station/StationFirmwareDeployDto";
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";


export default function StationFirmwareDeployList() {
  const {t} = useTranslation();
	const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	const [modalProps, setModalProps] = useState<any>({
		open: false,
		id: null,
		deployedAt: null,
	});

	/**
	 * DateRange Component 초기값, DateRange 컴포넌트의 부모 컴포넌트에서 작성한다
	 */
	const now = new Date();
	const [dateRangeProps, setDateRangeProps] = useState<DateRangeProps>({
		startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 0, 0, 0), //시작일자 초기값
		endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59), //종료일자 초기값
		format: "yyyy-MM-dd", //화면에 보여주는 DateFormat
		allFlag: false,
		type: 'date',
		initState: 'week'
	});

	/**
	 * 상세 이동
	 */
	const moveDetailFirmwareDeploy = (data: any) => {
		console.log('data', data)
		const state = {id: data.id}
		navigate(`/station/firmware/deploy/detail`, { state })
	}

	/**
	 * 대상스테이션 대기중 클릭시 Modal Open
	 */
	const openFirmwareWaitModal = (data: any) => {
		setModalProps({open: true, id: data.id, deployedAt: data.deployedAt});
	}

	/**
	 * 신규 등록 이동
	 */
	const addButton = () => {
		navigate("/station/firmware/deploy/add");
	}

  const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t('station.ota_id'), //"OTA ID",
			width: 120,
			filterable: true,
			cellClick: (e: any, data: any) => moveDetailFirmwareDeploy(data)
		},
		{
			field: "deployStatusCode",
			title: t('station.is_complete'), //"완료여부",
			width: 90,
			filterable: true,
			selectData: [],
			align: 'center',
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "displayFwList",
			title: t('station.firmware'), //"펌웨어",
			width: 120,
			align: 'center',
			cell: (props: any) => <CustomFirmwareListCell {...props} />,
		},
		{
			field: "col1",
			title: t('station.target_station'), //"대상 스테이션",
			children: [
				{
					field: "stationCount",
					title: t('station.all'), //"전체",
					width: 60,
					align: 'center',
				},
				{
					field: "waitingCount",
					title: t('station.waiting'), //"대기중",
					width: 60,
					align: 'center',
					cellClick: (e: any, data: any) => openFirmwareWaitModal(data)
				},
				{
					field: "progressCount",
					title: t('station.deploying'), //"배포중",
					width: 60,
					align: 'center',
				},
				{
					field: "successCount",
					title: t('station.success'), //"성공",
					width: 60,
					align: 'center',
				},
				{
					field: "failCount",
					title: t('station.failed'), //"실패",
					width: 60,
					align: 'center',
				},
			]
		},
		{
			field: "deployedAt",
			title: t('station.deploy_datetime'), //"배포일시",
			cellType: "dateTime",
			width: 140,
			align: 'center',
		},
		{
			field: "updatedAt",
			title: t('common.modification_datetime'), //"수정일시",
			cellType: "dateTime",
			width: 140,
			align: 'center',
		},
		{
			field: "updatedUserId",
			title: t('common.modifier_id'), //"수정자 ID",
			filterable: true,
			width: 120,
		},
		{
			field: "createdAt",
			title: t('common.registration_datetime'), //"등록일시",
			cellType: "dateTime",
			width: 140,
			align: 'center',
		},
		{
			field: "createdUserId",
			title: t('common.registration_id'), //"등록자 ID",
			filterable: true,
			width: 120,
		},
  ])

  const getStationFirmwareDeployList = async (params: any) => {
		const result = await StationApiService().getStationFirmwareDeployList(params);
		return result.data;
  }

	const downloadButton = async (params?: object) =>  {
		const changeFields = new Map([ // field명 변경할 field 목록
      ["deployStatusCode", "deployStatusName"],
    ]);
		const excelMap = columns
			.flatMap(v => v.children ? v.children : v)
			.map(v => {
				const newField = changeFields.has(v.field)? changeFields.get(v.field) : v.field;
				return {[newField]: v.title }
			}
		)

    const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationFirmwareDeploy(excelParams);
  }

	const gridInfoMessage = () => {
    return (
      <span className="c-red">
        {/* ※ 펌웨어 배포 수정은 예약시간 30분전까지만 가능하며, 배포완료 후, 실패한 경우 상세화면에서 다시 재배포할 수 있습니다. */}
        ※ {t('station.firmware_deploy_detail_info_message')}
      </span>
    )
  }
	
  const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDeployDto>>(
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
			queryKey: "stationFirmwareDeploy",
			//isChecked: true,
			gridInfoMessage,
			addButton,
			addButtonLabel: t('station.deployment_registration'), //'배포 등록',
			downloadButton,
		},
  );

	/**
	 * 시코드, 구 전체코드 목록 호출
	 * @returns 
	 */
	const setInitData = async () => {
		//고객구분코드(GS25 등...)
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMFCMP'});
		const smfcmp = res.data;

		setInitColumn([smfcmp])
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
			if(v.field === 'deployStatusCode') v.selectData = seletData[0];
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
			{/* 펌웨어 배포 관리 */}
			<Header headName={t('station.firmware_deployment_management')} />
			<DateRange
        setDateRangeProps={setDateRangeProps}
        dateRangeProps={dateRangeProps}
        searchEvent={searchEvent}
      />
			<GridCommonComponent
				{...gridProps}
				onSearch={getStationFirmwareDeployList}
				ref={gridRef}
				searchParams={{
          createdAtStart: dateRangeProps?.startDate,
          createdAtEnd: dateRangeProps?.endDate,
          allFlag: dateRangeProps.allFlag,
        }}
			/>
			{
				modalProps.open &&
				<StationFirmwareWaitListModal
					modalProps = {modalProps}
					onClose = {() => setModalProps({open: false, id: null, deployedAt: null})}
				/>
			}
		</>
  );
}
