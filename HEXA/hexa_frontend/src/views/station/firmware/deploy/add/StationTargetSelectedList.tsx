/**
 * 펌웨어 배포 관리 - 대상 스테이션 Grid Component
 * URL: /station/firmware/deploy/add
 * URL: /station/firmware/deploy/detail
 */

/** React */
import { useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import StationSelectGrid from "@/views/station/components/StationSelectGrid";
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationTargetListModal from "../modal/StationTargetListModal"
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

/* Types */
import { StationGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationIdCodeDto } from "@/utils/apiService/type/station/StationIdCodeDto";
import { StationTargetInfoDto } from "@/utils/apiService/type/station/StationInfoDto";

const StationTargetSelectedList = (props: any, ref: any) => {
	const { initData, disabled=false } = props;
	const { t } = useTranslation();
	const showAlert = useAlert();

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [data, setData] = useState<any[]>(initData? initData : [])

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t("station.station_id"), //"스테이션 ID",
			width: 80,
			filterable: true,
		},
		{
			field: "name",
			title: t("station.station_name"), //"스테이션 명",
			width: 120,
			filterable: true,
		},
		{
			field: "cityCode",
			title: t("station.city_unit"), //"시 단위",
			width: 120,
			filterable: true,
			selectData: [],
			filterType: 'multiSelect',
			cellType: 'select',
		},
		{
			field: "idCodeTsid",
			title: t("station.district_unit"), //"구 단위",
			width: 120,
			filterable: true,
			selectData: [],
			filterType: 'multiSelect',
			cellType: 'select',
		},
	])

	const [gridProps, setGridProps] = useState<StationGridProps<StationTargetInfoDto>>(
		{
			maxHeight: 735,
			columnHeader: columns,
			defaultFilter: true,
			rowSelectable: true,
			checkedDisabled: disabled,
		},
	);

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {

		//시 단위
		let citys: any[] = [];
		const res2 = await StationApiService().getCityList();
		if(Array.isArray(res2?.data)) citys = res2?.data?.map(v => ({code: v.cityCode, value: v.cityName}))

		//구 단위
		let districts: any[] = [];
		const resData = await StationApiService().getStationCodeList({page:0, size:9999});
		if(resData.data && Array.isArray(resData?.data?.content)) {
			districts = (resData.data.content as StationIdCodeDto[]).map((v: StationIdCodeDto) => ({code: v.tsid, value: v.districtName}))
		}

		setInitColumn([citys, districts])
	}


	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = async (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'cityCode') v.selectData = seletData[0];
			if (v.field === 'idCodeTsid') v.selectData = seletData[1];
		})
		if(disabled) {
			//배포상태 select list 조회 및 세팅
			const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMFRS'});
			const statusList = Array.isArray(res.data)? res.data : [];
			newColumn.push(
				{
					field: "status",
					title: t("station.deploy_status"), //"배포 상태",
					width: 100,
					filterable: true,
					selectData: statusList,
					filterType: 'select',
					cellType: 'select',
				},
			)
		}
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
	
	/**
	 * 데이터의 개수에 따라 그리드 높이 조절
	 */
	// useEffect(() => {
	// 	const length = data?.length;
	// 	let gridHeight = 100 + (40 * length);
	// 	if(gridHeight > 300) gridHeight = 300;
		
	// 	setGridProps({
	// 		...gridProps,
	// 		gridHeight,
	// 	})
	// }, [data])

	const setModalSeletedData = (rows: any[], flag: string) => {
		console.log('rows', rows)
		setData(rows);
		setModalOpen(false);
	} 

	const onDelete = () => {
		const rows = ref.current.getSeletedDataItems();
		if(rows.length === 0) {
			//스테이션을(를) 선택해주세요
			showAlert({message: t('common.select_required', {string: t('station.station')})});
			return;
		}
		// 선택한 스테이션를 배포 목록에서 삭제하시겠습니까?​\n삭제한 스테이션에는 해당 펌웨어가 배포되지 않습니다.
		showAlert({
			message : t('station.delete_target_station_confirm'),
			type: 'confirm',
			onConfirm: () => deleteRow(rows)
		})
	}

	const deleteRow = (rows: any[]) => {
		if(rows.length > 0){
			setData((prevData) => {
				const filterData = prevData.filter(v => !rows.some((row:any) => row.id === v.id))
				return filterData;
			})
		}
	}
	
	return (
		<>
			<section className="section">
				<div className="title-group">
					<h3 className="t-title">
						{/* 대상 스테이션 */}
						{t('station.target_station')}
					</h3>
					<div className="type-btns">
						<Button 
							type="button"
							size={"medium"} 
							className="w80 ml1"
							disabled={disabled}
							onClick={() => setModalOpen(true)}
						>
							{/* 선택 */}
							{t('common.select')}
						</Button>
					</div>
				</div>

				<div className="sort-group">
					<div className="sort-group__counter">
						{/* 전체 n */}
						<span className="total">{`${t('grid.total')} ${data.length}`}</span>
					</div>
					<div className="group-align-right">
						<Button 
							type="button"
							themeColor={"info"}
							onClick={onDelete}
							disabled={disabled}
						>
							<i className="icon icon-recyclebin"></i>
						</Button>
					</div>
				</div>

				<StationSelectGrid
					{...gridProps}
					gridData={data}
					ref={ref}
				/>
			</section>
			{
				modalOpen &&
				<StationTargetListModal 
					onClose={() => setModalOpen(false)}
					setModalSeletedData={setModalSeletedData}
				/>
			}
		</>
	);
}

export default forwardRef(StationTargetSelectedList);
