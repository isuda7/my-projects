/**
 * 펌웨어 배포 관리 - 펌웨어 정보 Grid Component
 * URL: /station/firmware/deploy/add
 * URL: /station/firmware/deploy/detail
 */

/** React */
import { useEffect, useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import StationSelectGrid from "@/views/station/components/StationSelectGrid";
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationFirmwareListModal from "../modal/StationFirmwareListModal"
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

/* Types */
import { StationGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";


const StationFirmwareSelectedList = (props: any, ref: any) => {
	const { initData, disabled=false } = props;
	const { t } = useTranslation();
	const showAlert = useAlert();

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [data, setData] = useState<any[]>(initData? initData : [])

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "fwGenerationCode",
			title: t('station.category'), //"구분",
			filterable: true,
			selectData: [],
			align: 'center',
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "fwTypeCode",
			title: t('station.firmware_name'), //"펌웨어명",
			filterable: true,
			selectData: [],
			align: 'center',
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "fwVersion",
			title: t('station.version'), //"버전",
			filterable: true,
		},
		{
			field: "fwFileName",
			title: t('common.file_name'), //"파일명",
			filterable: true,
		},
	])

	const [gridProps, setGridProps] = useState<StationGridProps<StationFirmwareDto>>(
		{
			maxHeight: 325,
			columnHeader: columns,
			defaultFilter: true,
			checkKey: "tsid",
			rowSelectable: true,
			checkedDisabled: disabled,
		},
	);

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//세대구분(1세대, 2세대)
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMGEN'});
		const generationCodes = res.data;
		//펌웨어명(슬롯 펌웨어, 충전기 펌웨어 등 ...)
		const res2 = await CodeApiService().getCodesByGroupCode({groupCode:'SMFWT'});
		const fwTypeCodes = res2.data;

		setInitColumn([generationCodes, fwTypeCodes])
	}


	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'fwGenerationCode') v.selectData = seletData[0];
			if (v.field === 'fwTypeCode') v.selectData = seletData[1];
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

	const setModalSeletedData = (rows: any[], flag: string) => {
		console.log('rows', rows)
		setData(rows);
		setModalOpen(false);
	} 

	const onDelete = () => {
		const rows = ref.current.getSeletedDataItems();
		if(rows.length === 0) {
			// 펌웨어정보를 먼저 선택해주세요
			showAlert({message: t('common.select_required', {string: t('station.firmware_info')})});
			return;
		}

		showAlert({
			// 선택한 펌웨어정보를 배포 목록에서 삭제하시겠습니까?
			message : t('station.delete_firmware_info_confirm'),
			type: 'confirm',
			onConfirm: () => deleteRow(rows)
		})
	}

	const deleteRow = (rows: any[]) => {
		if(rows.length > 0){
			setData((prevData) => {
				const filterData = prevData.filter(v => !rows.some((row:any) => row.tsid === v.tsid))
				return filterData;
			})
		}
	}

	return (
		<>
			<section className="section">
				<div className="title-group">
					<h3 className="t-title">{t('station.firmware_info') /* 펌웨어 정보 */ }</h3>
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
				<StationFirmwareListModal 
					onClose={() => setModalOpen(false)}
					setModalSeletedData={setModalSeletedData}
				/>
			}
		</>
	);
}

export default forwardRef(StationFirmwareSelectedList);
