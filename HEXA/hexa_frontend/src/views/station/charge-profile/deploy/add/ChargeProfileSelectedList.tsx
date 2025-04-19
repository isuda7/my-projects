/**
 * 충전 프로파일 배포 등록, 상세 > 충전 프로파일 정보 Component
 * URL: /station/charge-profile/deploy/add > 충전 프로파일 정보
 * URL: /station/charge-profile/deploy/detail > 충전 프로파일 정보
 */

/** React */
import { useEffect, useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import StationSelectGrid from "@/views/station/components/StationSelectGrid";
import CodeApiService from "@/utils/apiService/CodeApiService";
import ChargeProfileListModal from "../modal/ChargeProfileListModal"
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import CustomMatrixIdsCell from "../../common/CustomMatrixIdsCell"

/* Types */
import { StationGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";


const ChargeProfileSelectedList = (props: any, ref: any) => {
	const { initData, disabled=false } = props;
	const { t } = useTranslation();
	const showAlert = useAlert();

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [data, setData] = useState<any[]>(initData? initData : [])

	const cellTypeProps = {
		minimumFractionDigits: 3,
		maximumFractionDigits: 3,
	}

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "id",
			title: t("station.charge_profile_no"), //"충전 프로파일 No",
			width: 100,
		},
		{
			field: "condition",
			title: t("station.charging_condition"), //"충전 조건",
			width: 140,
		},
		{
			field: "current",
			title: `${t("station.ampere")}(C)`, //"전류(C)",
			width: 80,
			align: 'center',
		},
		{
			field: "voltage",
			title:  `${t("station.voltage")}(V)`, //"전압(V)",
			width: 80,
			align: 'center',
		},
		{
			field: "cutoff",
			title:  `${t("station.cutoff_current")}(C)`, //"Cutoff current(C)",
			width: 80,
			align: 'center',
		},
		{
			field: "chargeModeCode",
			title: t('station.charge_mode'), //`충전 Mode`,
			width: 100,
			align: 'center',
			selectData: [],
			cellType: 'select'
		},
		{
			field: 'col01',
			title: t('station.derating_factor1'), //'Derating Factor 1(전류)',
			children: [
				{
					field: "deratingValue1",
					title: t('station.derating_value'), //`값`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMin1",
					title: t('station.derating_min'), //`최소`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMax1",
					title: t('station.derating_max'), //`최대`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
			]
		},
		{
			field: 'col02',
			title: t('station.derating_factor2'), //'Derating Factor 2(전압)',
			children: [
				{
					field: "deratingValue2",
					title: t('station.derating_value'), //`값`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMin2",
					title: t('station.derating_min'), //`최소`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
				{
					field: "deratingMax2",
					title: t('station.derating_max'), //`최대`,
					width: 80,
					align: 'center',
					cellType: 'number',
					cellTypeProps,
				},
			]
		},
		{
			field: "isDefault",
			title: t('station.is_default'), //"기본여부",
			width: 120,
			selectData: [
				{code: true, value: 'Y'},
				{code: false, value: 'N'},
			],
			align: 'center',
			cell: (props: any) => <CustomRepresentativeCell {...props} />,
		},
		{
			field: "matrixIds",
			title: t('station.matrix_no'), //"조건 NO",
			width: 120,
			align: 'center',
			sortable: false,
			cell: (props: any) => <CustomMatrixIdsCell {...props} />,
		},
		{
			field: "updatedAt",
			title: t("common.modification_datetime"), //"수정일시",
			cellType: "dateTime",
			width: 120,
			align: 'center',
		},
		{
			field: "updatedUserId",
			title: t("common.modifier_id"), //"수정자 ID",
			width: 120,
		},
	])

	const [gridProps, setGridProps] = useState<StationGridProps<StationFirmwareDto>>(
		{
			maxHeight: 325,
			columnHeader: columns,
			defaultFilter: true,
			checkKey: "uniqueId",
			rowSelectable: true,
			checkedDisabled: disabled,
		},
	);

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//충전 프로파일 고속 충전 조건
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCHGMODE'});
		const codes = res.data;
		setInitColumn([codes])
	}


	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'chargeModeCode') v.selectData = seletData[0];
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
			// 충전 프로파일 정보를 먼저 선택해주세요
			showAlert({message: t('common.select_required', {string: t('station.firmware_info')})});
			return;
		}

		showAlert({
			// 선택한 충전 프로파일 정보를 배포 목록에서 삭제하시겠습니까?
			message : t('station.charge_profile_deploy_delete_confirm'),
			type: 'confirm',
			onConfirm: () => deleteRow(rows)
		})
	}

	const deleteRow = (rows: any[]) => {
		if(rows.length > 0){
			setData((prevData) => {
				const filterData = prevData.filter(v => !rows.some((row:any) => row.uniqueId === v.uniqueId))
				return filterData;
			})
		}
	}

	return (
		<>
			<section className="section">
				<div className="title-group">
					<h3 className="t-title">
						{/* 충전 프로파일 정보 */}
						{t('station.charge_profile_info')}
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
				<ChargeProfileListModal 
					onClose={() => setModalOpen(false)}
					setModalSeletedData={setModalSeletedData}
				/>
			}
		</>
	);
}

export default forwardRef(ChargeProfileSelectedList);
