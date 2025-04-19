/** React */
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

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import Footer from "@/components/common/Footer.tsx";
import { SearchGroupCodes } from "@/utils/apiService/type/system/code/CodeRequestDto.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import { GroupCodeResponseDto } from "@/utils/apiService/type/system/code/CodeResponseDto.ts";
import _ from "lodash";


export default function GroupCodeInfoList() {
	console.log('GroupCodeInfoList');
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const gridRef = useRef<{ refetchGrid: () => void; }>(null);


	const cellClickFunction = (e: any, dataItem: any) => {
		const state = dataItem.groupCode
		navigate(`/system/code/group/detail`, { state })
	}

	const yesOrNo = [
		{ code: true, value: 'Y' },
		{ code: false, value: 'N' }
	];

	const addButton = () => {
		navigate("/system/code/group/add");
	}

	// const [gcName, setGcName] = useState<String>();

	const [columns, setColumns] = useState<GridHeader[]>([

		{
			field: "groupCode",
			title: t('system_code.group_code_id'), // "그룹 코드ID",
			width: 140,
			filterable: true,
			cellClick: cellClickFunction
		},
		{
			field: "value",
			title: t('system_code.group_code_name'), //"그룹 코드명",
			width: 140,
			filterable: true,
			filterType: "select",
			searchkey: "value",
			selectData: [],
			cellTypeProps: {
				array: true
			}
		},
		{
			field: "groupCodeEng",
			title: t('system_code.group_code_name_eng'), // "그룹 코드명(영문)",
			width: 140,
			filterable: true
		},
		{
			field: "description",
			title: t('common.description'), // "설명",
			width: 140,
			filterable: true
		},
		{
			field: "isUse",
			title: t('station.is_use'), // "사용 여부",
			width: 80,
			filterable: true,
			selectData: yesOrNo,
			align: 'center',
			filterType: 'select',
			cell: (props: any) => <CustomRepresentativeCell {...props} />,
		},
		{
			field: "updatedAt",
			title: t("common.modification_datetime"), //"수정일시",
			cellType: "dateTime",
			width: 100,
			align: 'center',
		},
		{
			field: "updatedUserId",
			title: t("common.modifier_id"), //"수정자 ID",
			filterable: true,
			width: 120,
		},
		{
			field: "createdAt",
			title: t("common.registration_datetime"), //"등록일시",
			cellType: "dateTime",
			width: 100,
			align: 'center',
		},
		{
			field: "createdUserId",
			title: t("common.registration_id"), //"등록자 ID",
			filterable: true,
			width: 120,
		},
	])

	const getGroupCodeInfoList = async (params: SearchGroupCodes) => {
		console.log('파라미터:', params);
		const result = await CodeApiService().getGroupCodesSearch(params);
		console.log("data:", JSON.stringify(result.data, null, 2));
		return result.data;
	}

	const setGroupCodeName = (selectData: any[], field: string) => {
		console.log('selectData :', selectData);
		const newColumn = _.cloneDeep(columns)
		newColumn.forEach(v => {
			if (v.field === field) v.selectData = selectData;
		})
		setColumns(newColumn);
	}

	const getGroupCodeNameList = async () => {
		let groupCodeNames: any[] = [];
		const result = await CodeApiService().getGcValues();
		console.log('result', result);
		if (Array.isArray(result.data)) {
			groupCodeNames = result.data.map(v => ({ code: v.value, value: v.value }))
			console.log("getGroupCodeName - ", groupCodeNames);
			setGroupCodeName(groupCodeNames, 'value')
		}
		// setGcName('');
	}

	const downloadButton = async (params: SearchGroupCodes) => {
		const excelMap = columns.map(v => ({[v.field]: v.title}));
		console.log('excelMap', excelMap);
		params = {
			...params,
			"excelMap": JSON.stringify(excelMap)
		}
		const result = await CodeApiService().downloadGroupCodeExcel(params);
	}

	useEffect(() => {
		getGroupCodeNameList();
	}, [])

	const [gridProps, setGridProps] = useState<CommonGridProps<GroupCodeResponseDto>>(
		{
			gridHeight: 550,
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
			checkKey: "groupCode",
			queryKey: "group-code-list",
			addButton,
			downloadButton,

			onSearch: getGroupCodeInfoList,
		},
	);

	const searchEvent = () => {
		if (gridRef.current) {
			gridRef.current.refetchGrid();
		}
	}

	useEffect(() => {
		console.log('columns', columns)
		setGridProps({
			...gridProps,
			columnHeader: columns,
		})
	}, [columns])

	return (
		<>
			{/* 그룹 코드 */}
			<Header headName={t('system_code.group_code')} />
			<GridCommonComponent
				{...gridProps}
				ref={gridRef}
			/>
		</>
	);
}