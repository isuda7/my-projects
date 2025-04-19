/**
 * 스테이션 정보 상세 - 설정 변경이력 모달
 * URL: /station/info/management/detail -> 설정 변경이력
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
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import _ from 'lodash';

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationConfigHistoryDto } from "@/utils/apiService/type/station/StationConfigDto";


export default function StationHistoryModal(props: any) {
	const { t } = useTranslation();
	const { id, name, onClose } = props;

	const gridRef = useRef<{ refetchGrid: () => void, getSeletedDataItems: () => any[] }>(null);

	/**
	 * 설정 항목마다 표현해줘야하는 Text가 다르기때문에 설정에 맞춰 표현해줘야함
	 * @param props 
	 * @returns 
	 */
	const CustomConfigValueCell = (props: any) => {
		const value = props.dataItem[props.field]
		const configCode = props.dataItem['configCode'];
		var words = value.split("\n");
    var tt = words.map((item: any, i: any) => <p key={i}>{item}</p>);

		if(value) {
			return <>{tt}</>
		}
		return <>{'-'}</>
	}

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "controlAt",
			title: t("station.control_datetime"), //"제어일시",
			cellType: "dateTime",
			width: 140,
			align: 'center',
		},
		{
			field: "configCode",
			title: t("station.control"), //"제어",
			width: 120,
			filterable: true,
			selectData: [],
			filterType: 'select',
			cellType: 'select'
		},
		{
			field: "oldValue",
			title: t("station.before_change"), //"변경 전",
			width: 120,
			cell: (props) => <CustomConfigValueCell {...props} />
		},
		{
			field: "newValue",
			title: t("station.after_change"), //"변경 후",
			width: 120,
			cell: (props) => <CustomConfigValueCell {...props} />
		},
		{
			field: "isSucceeded",
			title: t("station.is_succeed"), //"성공여부",
			width: 100,
			filterable: true,
			selectData: [
				{code: true, value: 'Y'},
				{code: false, value: 'N'},
			],
			filterType: 'select',
			cellType: 'select',
			align: 'center',
			cell: (props) => <CustomRepresentativeCell {...props} />
		},
		{
			field: "controlUserId",
			title: t("station.controller_id"), //"제어자 ID",
			width: 100,
			filterable: true,
		},
	])

	const getStationHistoryList = async (params: any) => {
		params.stationId = id;
		const result = await StationApiService().getStationConfigHistoryList(params);
		return result.data;
	}

	const downloadButton = async (params: any) => {
		const changeFields = new Map([ // field명 변경할 field 목록
      ["configCode", "configName"],
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
    await StationApiService().downloadExcelStationConfigHistory(excelParams);
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationConfigHistoryDto>>(
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
			queryKey: "stationConfigHistory",
		},
	);

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//스테이션 설정 제어의 온도 범위 명칭 코드
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCNF'});
		const configs = res.data;

		setInitColumn([configs])
	}

	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param seletData 
	 */
	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
			if (v.field === 'configCode') v.selectData = seletData[0];
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

	//설정 변경 이력
	return (
		<Dialog title={t('station.settings_change_history')} onClose={() => onClose('config')}>
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
