/**
 * 스테이션 정보 상세 - 대시보드 제어이력 모달
 * URL: /station/info/management/detail -> 대시보드 제어이력
 */

/** React */
import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

/* Kendo UI */
import {Dialog} from "@progress/kendo-react-dialogs";

/* Common */
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import _ from 'lodash';

/* Types */
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {StationCtrlHistoryDto} from "@/utils/apiService/type/station/StationControlDto";


export default function DashboardHistoryModal(props: any) {
    const {t} = useTranslation();
    const {id, name, onClose} = props;

    const gridRef = useRef<{ refetchGrid: () => void, getSeletedDataItems: () => any[] }>(null);

    const CustomCtrlTargeName = (props: any) => {
        return <>{props.dataItem['controlTargetName']}</>
    }

    const [columns, setColumns] = useState<GridHeader[]>([
        {
            field: "controlledAt",
            title: t('dashboard.control-history.control-at'), //"제어일시",
            cellType: "dateTime",
            width: 140,
            align: 'center',
        },
        {
            field: "controlTargetCode",
            title: t("dashboard.control-history.control-target"), //"제어대상",
            width: 120,
            filterable: true,
            selectData: [],
            filterType: 'multiSelect',
            cell: (props: any) => <CustomCtrlTargeName {...props} />,
        },
        {
            field: "controlCommandCode",
            title: t("dashboard.control-history.command-name"), //"제어명",
            width: 120,
            filterable: true,
            selectData: [],
            filterType: 'multiSelect',
            cellType: 'select'
        },
        {
            field: "statusCode",
            title: t('dashboard.control-history.is-succeed'), //"상태명",
            width: 120,
            filterable: true,
            selectData: [],
            filterType: 'multiSelect',
            align: 'center',
            cell: (props: any) => <CustomStatusName {...props} />,
        },
        {
            field: "controlUserId",
            title: t("dashboard.control-history.controller-id"), //'제어자 ID',
            width: 100,
            filterable: true,
        },
    ])

    const getStationHistoryList = async (params: any) => {
        const urlParams = {
            ...params,
            stationId: id,
        }
        const result = await StationApiService().getStationControlHistoryList(urlParams, {});
        return result.data;
    }

    const downloadButton = async (params: any) => {
        const changeFields = new Map([ // field명 변경할 field 목록
            ["controlTargetCode", "controlTargetName"],
            ["controlCommandCode", "controlCommandName"],
            ["statusCode", "statusName"],
        ]);
        const excelMap = columns
            .map(v => {
                    const newField: any = changeFields.has(v.field) ? changeFields.get(v.field) : v.field;
                    return {[newField]: v.title}
                }
            )

        const excelParams: { [key: string]: string } = {
            ...params,
            stationId: id,
            'excelMap': JSON.stringify(excelMap),
        }
        await StationApiService().downloadExcelStationControlHistoryPopup(excelParams);
    }

    const CustomStatusName = (props: any) => {
        return <>{props.dataItem['statusName']}</>
    }

    const [gridProps, setGridProps] = useState<CommonGridProps<StationCtrlHistoryDto>>(
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
            queryKey: "stationCtrlDashboard",
        },
    );

    /**
     * Select Data 전체 호출 및 세팅
     * @returns
     */
    const setInitData = async () => {
        //제어대상
        const res2 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCTG'});
        const tgList = res2.data;
        //제어명
        const res3 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCON'});
        const ctrlList = res3.data;
        //상태명
        const res4 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMFRS'});
        const statusList = res4.data;

        setInitColumn([tgList, ctrlList, statusList])
    }

    /**
     * 초기 조회한 SelectData를 세팅
     * @param selectData
     */
    const setInitColumn = (selectData: any[]) => {
        const newColumn = _.cloneDeep(columns);

        newColumn.forEach(v => {
            if (v.field === 'controlTargetCode') v.selectData = selectData[0]
            if (v.field === 'controlCommandCode') v.selectData = selectData[1]
			if (v.field === 'statusCode') v.selectData = selectData[2].filter((status: any) => {
				const statusCodes = ['WAITING', 'IN_PROGRESS', 'SUCCEEDED', 'FAILED']
				return statusCodes.includes(status.code)
			})
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

    //대시보드 제어 이력
    return (
        <Dialog title={t('station.dashboard_control_history')} onClose={() => onClose('dashboard')}>
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
