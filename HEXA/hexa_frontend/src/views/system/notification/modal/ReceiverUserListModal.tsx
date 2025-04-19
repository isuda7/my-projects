/**
 * 알림 등록, 상세 - 알림 메시지 - 수신자 선택 Modal Component
 * URL: /station/firmware/deploy/add
 * URL: /station/firmware/deploy/detail
 */

/** React */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

/* Common */
import DateRange, { DateRangeProps } from "@/components/common/DateRange.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

/* Types */
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";
import UserApiService from "@/utils/apiService/UserApiService";
import { UserActiveSearchParam } from "@/utils/apiService/type/user/user.type";
import RoleApiService from "@/utils/apiService/RoleApiService";

interface NotificationReceiverModalProp {
	onClose: any;
	setModalSeletedData: any;
	receiverIds: string[];
}

export default function ReceiverUserListModal(props: NotificationReceiverModalProp) {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const { onClose, setModalSeletedData, receiverIds } = props;
	const gridRef = useRef<{
		refetchGrid: () => void,
		getSeletedDataItems: () => any[],
		getAllDataItems: () => any[]
	}>(null);
	const [roleName, setRoleName] = useState<String>();

	const [columns, setColumns] = useState<GridHeader[]>([
		{
			field: "roleCode",
			title: t("user.role"),
			width: 120,
			align: "left",
			searchkey: 'roleCode',
			filterable: true,
			filterType: "select",
			cellType: "select",
			selectData: []
		},
		{
			field: "userId",
			title: t("user.user_id"),
			filterable: true,
			width: 80,
			align: "left",
		},
		{
			field: "userName",
			title: t("common.name"),
			width: 80,
			filterable: true,
			align: "center"
		},
		{
			field: "email",
			title: t("user.email_adress"),
			width: 140,
			filterable: true,
			align: "center"
		},
		{
			field: "cellPhone",
			title: t("common.cellphone"),
			width: 100,
			filterable: true,
			align: "center",
			cellType: 'phone'
		},
	])

	const getActiveUserList = async (params: UserActiveSearchParam) => {
		const result = await UserApiService().getActiveUsers(params);
		return result.data
	}

	const [gridProps, setGridProps] = useState<CommonGridProps<StationFirmwareDto>>(
		{
			gridHeight: 500,
			columnHeader: columns,
			defaultFilter: true,
			sortableGrid: true,
			unsorted: true,
			multipleSorting: true,
			isReorder: false,
			isResizable: true,
			girdToolBar: true,
			//gridData: [], // Correctly initialized as an empty array of User type
			displayCount: [20, 50, 100],
			// isFilterResetButton: true,
			// isGridResetButton: true,
			// isColumnSelectShowButton: true,
			checkKey: "id",
			queryKey: "ActiveUserList",
			rowSelectable: true,
			isChecked: true,
		},
	);

	const sendSelectedRows = () => {
		let rows: any[] = [];
		if (gridRef.current) {
			rows = gridRef.current.getSeletedDataItems();
			console.log("selected rows", rows);
		}

		if (rows.length === 0) {
			showAlert({ message: t("common.no_select_results")/*선택된 데이터가 없습니다.*/ });
			return;
		}

		setModalSeletedData(rows);
	}

	const sendAllRows = () => {
		// 전체선택
		let rows: any[] = [];
		if (gridRef.current) {
			rows = gridRef.current.getAllDataItems();
		}

		if (rows.length === 0) {
			// 검색된 데이터가 없습니다.
			showAlert({ message: t('common.no_search_results') });
			return;
		}

		setModalSeletedData(rows);
	}

	const setInitData = async () => {
		// 구분
		const res = await CodeApiService().getCodesByGroupCode({groupCode: 'AUTH_USER'});
		const smpvtp = res.data;

		setInitColumn([smpvtp]);
	}

	const setInitColumn = (seletData: any[]) => {
		const newColumn = _.cloneDeep(columns);
		newColumn.forEach(v => {
				if (v.field === 'roleCode') v.selectData = seletData[0];
		})
		setColumns(newColumn);
	}

	useEffect(() => {

		setInitData()
	}, [])

	// useEffect(() => {
	// 	const getRoleNameList = async () => {
	// 		let roleNames: any[] = [];
	// 		const result = await RoleApiService().getRoleNames();
	// 		if (Array.isArray(result.data)) {
	// 			console.log("getRoleNameList result.data", result.data);
	// 			roleNames = result.data.map(v => ({ code: v.roleCodeName, value: v.roleCodeName }))
	// 			await setColumnRoleName(roleNames, 'roleCodeName')
	// 		}
	// 		setRoleName('');
	// 	}
	// 	getRoleNameList()
	// }, [])

	// const setColumnRoleName = (seletData: any[], field: string) => {
	// 	const newColumn = _.cloneDeep(columns)
	// 	newColumn.forEach(v => {
	// 		if (v.field === field) v.selectData = seletData;
	// 	})
	// 	setColumns(newColumn);
	// }

	useEffect(() => {
		setGridProps({
			...gridProps,
			columnHeader: columns,
		})
	}, [columns])

	return (
		<Dialog title={t("notification.select_receivers")/*수신자 선택*/} onClose={onClose}>
			<div className="dialog-box pop-l">
				<GridCommonComponent
					{...gridProps}
					onSearch={getActiveUserList}
					ref={gridRef}
					// initSelected={receiverIds}
				/>
			</div>
			<DialogActionsBar>
				<Button size={"medium"} onClick={sendAllRows}>
					{/* 전체 선택 */}
					{t('common.all_select')}
				</Button>
				<Button size={"medium"} themeColor={"primary"} onClick={sendSelectedRows}>
					{/* 선택 */}
					{t('common.select')}
				</Button>
			</DialogActionsBar>
		</Dialog>
	);
}
