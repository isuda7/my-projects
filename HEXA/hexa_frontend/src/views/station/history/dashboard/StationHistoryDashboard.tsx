/**
 * 대시보드 제어 이력 Component
 * URL: /station/history/dashboard
 */

/* React */
import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import CustomRepresentativeCell from "@/views/station/components/CustomRepresentativeCell"
import DateRange, {DateRangeProps} from "@/components/common/DateRange.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

//Types
import {StationCtrlHistoryDto} from "@/utils/apiService/type/station/StationControlDto";
import {CommonGridProps, GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";


export default function StationHistoryDashboard() {
    const {t} = useTranslation();
    const showAlert = useAlert();
    const gridRef = useRef<{ refetchGrid: () => void; }>(null);

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

    const CustomCtrlTargeName = (props: any) => {
        return <>{props.dataItem['controlTargetName']}</>
    }

    const CustomStatusName = (props: any) => {
        return <>{props.dataItem['statusName']}</>
    }

    const [columns, setColumns] = useState<GridHeader[]>([
        {
            field: "genCode",
            title: t('station.generation_type'), //'세대구분',
            width: 80,
            filterable: true,
            selectData: [],
            align: 'center',
            filterType: 'select',
            cellType: 'select'
        },
        {
            field: "stationId",
            title: t('station.station_id'), //"스테이션 ID",
            width: 80,
            filterable: true,
            align: 'center',
        },
        {
            field: "stationName",
            title: t('station.station_name'), //"스테이션명",
            width: 140,
            filterable: true,
            //cell: (props: any) => <CustomFirmwareListCell {...props} />,
        },
        {
            field: "controlTargetCode",
            title: t('dashboard.control-history.control-target'), //"제어대상",
            width: 100,
            filterable: true,
            selectData: [],
            filterType: 'multiSelect',
            cell: (props: any) => <CustomCtrlTargeName {...props} />,
        },
        {
            field: "controlCommandCode",
            title: t('dashboard.control-history.command-name'), //"제어명",
            width: 160,
            filterable: true,
            selectData: [],
            filterType: 'multiSelect',
            cellType: 'select'
        },
        {
            field: "statusCode",
            title: t('dashboard.control-history.is-succeed'), //"상태명",
            width: 110,
            filterable: true,
            selectData: [],
            filterType: 'multiSelect',
            align: 'center',
            cell: (props: any) => <CustomStatusName {...props} />,
        },
        {
            field: "controlledAt",
            title: t('dashboard.control-history.control-at'), //'제어일시',
            cellType: "dateTime",
            width: 140,
            align: 'center',
        },
        {
            field: "controlUserId",
            title: t('dashboard.control-history.controller-id'), //'제어자 ID',
            width: 120,
            filterable: true,
        },
    ])

    const getStationControlHistoryList = async (params: any) => {
        const result = await StationApiService().getStationControlHistoryList(params, {});
        return result.data;
    }

    const downloadButton = async (params?: object) => {
        const changeFields = new Map([ // field명 변경할 field 목록
            ["genCode", "genCodeName"],
            ["controlTargetCode", "controlTargetName"],
            ["controlCommandCode", "controlCommandName"],
            ["statusCode", "statusName"]
        ]);
        const excelMap = columns
            .map(v => {
                    const newField: any = changeFields.has(v.field) ? changeFields.get(v.field) : v.field;
                    return {[newField]: v.title}
                }
            )

        const excelParams: { [key: string]: string } = {
            ...params,
            'excelMap': JSON.stringify(excelMap),
        }
        await StationApiService().downloadExcelStationControlHistory(excelParams);
    }

    const gridInfoMessage = () => {
        return (
            <span className="c-red">
				{/* ※ 1세대인 경우, 제어 이력은 HEXA에서 제어한 이력만 조회됩니다. */}
                {t('station.dashboard_grid_message')}
                <br/>
                {/* ※ 1세대인 경우, 성공여부는 서버에서 스테이션에 제어 전달 성공여부입니다. */}
                {t('station.dashboard_grid_message2')}
			</span>
        )
    }

    const [gridProps, setGridProps] = useState<CommonGridProps<StationCtrlHistoryDto>>(
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
            displayCount: [20, 50, 100],
            isFilterResetButton: true,
            isGridResetButton: true,
            isColumnSelectShowButton: true,
            //rowSelectable: true,
            queryKey: "stationCtrlDashboard",
            //isChecked: true,
            downloadButton,
            gridInfoMessage,
        },
    );

    /**
     * Select Data 전체 호출 및 세팅
     * @returns
     */
    const setInitData = async () => {
        //세대구분
        const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMGEN'});
        const genType = res.data;
        //제어대상
        const res2 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCTG'});
        const tgList = res2.data;
        //제어명
        const res3 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCON'});
        const ctrlList = res3.data;
        //상태명
        const res4 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMFRS'});
        const statusList = res4.data;


        setInitColumn([genType, tgList, ctrlList, statusList])
    }

    const searchEvent = () => {
        if (gridRef.current) {
            gridRef.current.refetchGrid();
        }
    }

    /**
     * 초기 조회한 SelectData를 세팅
     * @param selectData
     */
    const setInitColumn = (selectData: any[]) => {
        const newColumn = _.cloneDeep(columns);
        newColumn.forEach(v => {
            if (v.field === 'genCode') v.selectData = selectData[0]
            if (v.field === 'controlTargetCode') v.selectData = selectData[1]
            if (v.field === 'controlCommandCode') v.selectData = selectData[2]
            if (v.field === 'statusCode') v.selectData = selectData[3].filter((status: any) => {
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

    return (
        <>
            {/* 대시보드 제어이력 */}
            <Header headName={t('station.dashboard_control_history')}/>
            <DateRange
                setDateRangeProps={setDateRangeProps}
                dateRangeProps={dateRangeProps}
                searchEvent={searchEvent}
            />
            <GridCommonComponent
                {...gridProps}
                onSearch={getStationControlHistoryList}
                ref={gridRef}
                searchParams={{
                    startDate: dateRangeProps?.startDate,
                    endDate: dateRangeProps?.endDate,
                    allFlag: dateRangeProps.allFlag,
                }}
            />
        </>
    );
}
