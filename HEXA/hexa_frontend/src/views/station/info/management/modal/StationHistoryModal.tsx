/**
 * 스테이션 정보 상세 - 기기 변경이력 모달
 * URL: /station/info/management/detail -> 기기 변경이력
 */

/** React */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Dialog } from "@progress/kendo-react-dialogs";

/* Common */
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import _ from 'lodash';

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";


export default function StationHistoryModal(props: any) {
	const { t } = useTranslation();
	const { id, name, onClose } = props;

	const gridRef = useRef<{ refetchGrid: () => void, getSeletedDataItems: () => any[] }>(null);

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "appliedAt",
			title: t('station.exchange_datetime'), //"교환일시",
			cellType: "dateTime",
			width: 140,
		},
		{
			field: "changeTypeCode",
			title: t('station.change_type_code'), //"이력 구분",
			width: 120,
			filterable: true,
			selectData: [],
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "changeTargetCode",
			title: t('station.target'), //"대상",
			width: 120,
			filterable: true,
			selectData: [],
			filterType: 'multiSelect',
			cellType: 'select'
		},
		{
			field: "beforeDeviceSerialNumber",
			title: t('station.before_sn'), //"이전 S/N",
			width: 120,
			filterable: true,
		},
		{
			field: "afterDeviceSerialNumber",
			title: t('station.after_sn'), //"이후 S/N",
			width: 100,
			filterable: true,
		},
	])

	const getStationHistoryList = async (params: any) => {
		const result = await StationApiService().getStationHistoryList(params, id);
		return result.data;
	}

	const downloadButton = async (params: any) => {
		const changeFields = new Map([ // field명 변경할 field 목록
      ["changeTypeCode", "changeTypeName"],
      ["changeTargetCode", "changeTargetName"],
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
    await StationApiService().downloadExcelStationHistory(excelParams, id);
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDto>>(
		{
			gridHeight: 300,
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
			downloadButton,
			queryKey: "stationHistory",
		},
	);

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//이력구분(최초등록, 함체변경 등...)
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMDVHIS'});
		const changeTypeCodes = res.data;
		//대상(함체1(대표), 슬롯1, 슬롯2 등 ...)
		const res2 = await CodeApiService().getCodesByGroupCode({groupCode:'SMDT'});
		const changeTargetCodes = res2.data;

		setInitColumn([changeTypeCodes, changeTargetCodes])
	}

	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'changeTypeCode') v.selectData = seletData[0];
			if (v.field === 'changeTargetCode') v.selectData = seletData[1];
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

	//기기 변경 이력
	return (
		<Dialog title={t('station.device_change_history')} onClose={() => onClose('station')}>
			<div className="dialog-box pop-l">
				<section className="section">
					{/* 검색 박스 */}
					<div className="search-group">
						<dl className="search-group__txt">
							<div>
								{/* 스테이션 ID */}
								<dt>{t('station.station_id')} :</dt>
								<dd>{id}</dd>
							</div>
							<div>
								{/* 스테이션 명 */}
								<dt>{t('station.station_name')} :</dt>
								<dd>{name}</dd>
							</div>
						</dl>
					</div>
				</section>

				<section className="section">
					<GridCommonComponent
						{...gridProps}
						onSearch={getStationHistoryList}
						ref={gridRef}
					/>
				</section>
			</div>
		</Dialog>
	);
}
