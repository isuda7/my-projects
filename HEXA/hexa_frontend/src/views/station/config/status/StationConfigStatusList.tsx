/**
 * 스테이션 설정 현황 Component
 * URL: /station/config/status
 */

/* React */
import {useEffect, useRef, useState, useLayoutEffect, Fragment} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationApiService from "@/utils/apiService/StationApiService";
import Header from "@/new_components/common/Header.tsx";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import useAlert from "@/hooks/useAlert";
import _ from 'lodash';

//Types
import { CommonGridProps, GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";
import { StationConfigJobDto } from "@/utils/apiService/type/station/StationConfigDto"

/* CONSTANTS */
import { TIME_ARRAY, SHORT_MONTHS, DAY_OF_WEEK, OS_DAY_OF_WEEK } from "@/views/station/constants";

export default function StationConfigStatusList() {
  const {t, i18n} = useTranslation();
	const showAlert = useAlert();
  const navigate = useNavigate();
  const gridRef = useRef<{ refetchGrid: () => void; }>(null);

	const dayOfWeek = OS_DAY_OF_WEEK.map((v: string, i: number) => {
    const code = v === 'no_reboot'? 'NONE' : String(v).toUpperCase();
    const value = t(`station.${v}`);
    return {code, value}
  })

  const [columns, setColumns] = useState<GridHeader[]>([])

  const getStationConfigStatusList = async (params: any) => {
		const result: any = await StationApiService().getStationConfigStatusList(params);

		//데이터 가공
		console.log('getStationConfigStatusList', result.data);
		const processData = getProcessData(result.data.content);

		const resultData = {
			...result.data,
			content: processData,
		}
		return resultData;
  }

	const getProcessData = (list: any[]) => {
		const resultList: any[] = [];
		for(let i=0; i<list.length; i++) {
			const obj: { [key: string]: any } = {
				stationId : list[i].stationId,
				stationName : list[i].stationName,
			}
			const { 
				dischargeCriteriaList, 
				congestionCriteriaList, 
				temperatureCriteriaList, 
				rebootCriteria ,
				...rest
			} = list[i].config;

			//온도범위 값 세팅
			temperatureCriteriaList.forEach((v: any, i: number) => {
				obj[`minTemperature${i}`] = v.minTemperature;
				obj[`maxTemperature${i}`] = v.maxTemperature;
			});

			//충전순서, 배출가능SOC, 사용가능전력량 값 세팅
			obj.chargeOrderCode = rest.chargeOrderCode;
			obj.permissibleSoc = rest.permissibleSoc;
			obj.powerCapacity = rest.powerCapacity;

			//배출우선순위 값 세팅
			dischargeCriteriaList.forEach((v: any, i: number) => {
				obj[`priority${i+1}`] = v;
			})

			//번잡도 값 세팅
			congestionCriteriaList.forEach((v: any, i: number) => {
				obj[`timeSpan${i+1}`] = v.congestionLevelCode;
			})
			
			//PC 재부팅 주기 값 세팅
			obj.rebootCycle = rebootCriteria;
			
			resultList.push(obj)
		}
		console.log('resultList', resultList)
		return resultList;
	}

	const getSplitString = (str: string, flag: string) => {
		if(flag === 'temp') {
			const match = str.match(/^(min|max)(Temperature)(\d+)$/);
			return match? [match[1], match[2], match[3]] : null;
		}
		else if(flag === 'timeSpan') {
			const match = str.match(/^(timeSpan)(\d+)$/);
			if(match) {
				const padNum = String(Number(match[2])-1).padStart(2, '0')
				return [match[1], padNum];
			}
		}
		return null;
	}

	const downloadButton = async (params?: object) =>  {
    console.log('downloadButton', columns)
    const changeFields = new Map([ // field명 변경할 field 목록
      ["chargeOrderCode", "chargeOrder"],
      ["priority1", "dischargePriority1"],
      ["priority2", "dischargePriority2"],
      ["priority3", "dischargePriority3"],
    ]);
		const changeTitles = new Map([ // title명 변경할 field 목록 ['field명', 'title명']
      ["priority1", `${t('station.discharge_priority')} 1`],
      ["priority2", `${t('station.discharge_priority')} 2`],
      ["priority3", `${t('station.discharge_priority')} 3`],
    ]); 

    const excelMap = columns
      .flatMap(v => v.children ? v.children : v)
      .flatMap(v => {
				//온도범위 세팅
				if(String(v.field).includes('Temperature')) {
					const match: any = getSplitString(v.field, 'temp');
					const newField = SHORT_MONTHS[Number(match[2])] + _.startCase(match[0])
					const newTitle = t(`short_date.${SHORT_MONTHS[Number(match[2])]}`) + ' ' + v.title;
					return [{ [newField]: newTitle }];
				}
				else if(String(v.field).includes('timeSpan')) {
					const match: any = getSplitString(v.field, 'timeSpan');
					const newField = 'congestion' + match[1]
					const newTitle = t('station.congestion_level') + ' ' + match[1]
					return [{ [newField]: newTitle }];
				}
        const newField = changeFields.has(v.field)? changeFields.get(v.field) : v.field;
        const newTitle = changeTitles.has(v.field)? changeTitles.get(v.field) : v.title;
        return [{ [newField]: newTitle }];
      }
    );
		console.log('excelMap', excelMap)
		const excelParams: {[key:string]:string} = {
			...params,
      'excelMap': JSON.stringify(excelMap),
    }
    await StationApiService().downloadExcelStationConfigStatus(excelParams);
  }
	
  const [gridProps, setGridProps] = useState<CommonGridProps<StationConfigJobDto>>(
		{
			gridHeight: 600,
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
			queryKey: "stationConfigStatus",
		},
  );

	/**
	 * 시코드, 구 전체코드 목록 호출
	 * @returns 
	 */
	const setInitData = async () => {
		//충전순서
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMCNFPRM'});
		const chargeOrderCodes = res.data;

		//SOC, SOH, 누적교환횟수
		const res2 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFDIS'});
    const priorityCodes = res2.data;
		
		//높은순, 낮은순
    const res3 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFDISVAL'});
    const priorityCodes2 = res3.data;

		//스테이션 번잡도 단계 범위
    const res4 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFCOG'});
    const congestionCodes = res4.data;
		
		setInitColumn([chargeOrderCodes, priorityCodes, priorityCodes2, congestionCodes])
	}

	/**
	 * 초기 조회한 SelectData를 세팅
	 * @param selectData
	 */
	const setInitColumn = (selectData: any[]) => {
		const newColumns: any[] = [
			{
				field: "stationId",
				title: t('station.station_id'), //"스테이션 ID",
				width: 120,
				filterable: true,
				locked: true,
				orderIndex: 0
				//cellClick: (e: any, data: any) => moveDetailFirmwareDeploy(data)
			},
			{
				field: "stationName",
				title: t('station.station_name'), //"스테이션명",
				width: 100,
				filterable: true,
				locked: true,
				orderIndex: 0,
			},
		]

		//온도범위 컬럼명 세팅
		SHORT_MONTHS.map((v: string, i: number) => {
			newColumns.push(
				{
					field: `temp_col${i}`,
					title: `${t('station.temperature_range')}(${t(`short_date.${v}`)})`,
					children: [
						{
							field: `minTemperature${i}`,
							//field: `${v}Min`,
							title: t('common.min'), //`최저`,
							width: 60,
							align: 'center',
							sortable: false,
						},
						{
							field: `maxTemperature${i}`,
							//field: `${v}Max`,
							title: t('common.max'), //`최고`,
							width: 90,
							align: 'center',
							sortable: false,
						}
					]
				}
			)
		})

		//충전순서, 배출가능SOC, 사용가능 전력량(Wh)
		newColumns.push(
			{
				field: `chargeOrderCode`,
				title: t('station.charge_order'), //`충전순서`,
				width: 120,
				filterable: true,
				filterType: "select",
				selectData: selectData[0],
				cellType: 'select',
				sortable: false,
			}
		)
		newColumns.push(
			{
				field: `permissibleSoc`,
				title: `${t('station.permissible_soc')}(%)`, //배출가능 SOC(%)
				width: 110,
				align: 'center',
				filterable: true,
				filterType: "select",
				selectData: [
					{code: [0, 30], value: '0~30'},
					{code: [31, 50], value: '31~50'},
					{code: [51, 70], value: '51~70'},
					{code: [71, 80], value: '71~80'},
					{code: [81, 90], value: '81~90'},
					{code: [91, 100], value: '91~100'},
				],
				cellType: 'select',
				sortable: false,
			}
		)
		newColumns.push(
			{
				field: `powerCapacity`,
				title: `${t('station.available_power')}(Wh)`, //`사용가능 전력량(Wh)`,
				width: 100,
				align: 'center',
				sortable: false,
				cellType: 'number',
			}
		)

		/**
		 * 배출우선순위 Cell 커스텀
		 * @param e 
		 * @returns 
		 */
		const customPriorityCell = (e: any) => {
			const obj = e.dataItem[e.field];

			let criteriaValue = '';
			for(let i=0; i<selectData[1].length; i++) {
				if(selectData[1][i].code === obj.criteriaCode) {
					criteriaValue = selectData[1][i].value;
					break;
				}
			}
			
			let value = '';
			for(let i=0; i<selectData[2].length; i++) {
				if(selectData[2][i].code === obj.valueCode) {
					value = selectData[2][i].value;
					break;
				}
			}
			return `${criteriaValue} ${value}`;
		}

		//배출우선순위 컬럼 세팅
		const priorityObj = {
			field: `temp_priority`,
			title: t('station.discharge_priority'), //`배출우선순위`,
			children: [] as any[]
		}
		new Array(3).fill(null).forEach((v: any, i: number) => {
			priorityObj.children.push({
				field: `priority${i+1}`,
				title: t('station.priority', {index: i+1}), //`${i+1}순위`,
				width: 140,
				sortable: false,
				cell: (e: any) => customPriorityCell(e)
			})
		})
		newColumns.push(priorityObj);

		//번잡도 컬럼 세팅
		const congestionObj = {
			field: `temp_congestion`,
			title: t('station.congestion_level'), //`번잡도`,
			children: [] as any[]
		}
		TIME_ARRAY.forEach((v: any, i: number) => {
			congestionObj.children.push({
				field: `timeSpan${i+1}`,
				title: `${v}`,
				width: 80,
				sortable: false,
				selectData: selectData[3],
				cellType: 'select',
				align: 'center',
			})
		})
		newColumns.push(congestionObj);

		const rebootCycleCell = (e: any) => {
			const obj = e.dataItem[e.field];
			let value = '';
			if(obj.isNoneReboot) return t('station.no_reboot');
			
			let noReboot = false;
			for(let i=0; i<DAY_OF_WEEK.length; i++) {
				if(DAY_OF_WEEK[i].code === obj.rebootCycle) {
					value = DAY_OF_WEEK[i].value;
					if(!obj.rebootCycle) noReboot = true;
					break;
				}
			}
			if(noReboot) return value;
			return `${value} ${obj.rebootCycleHour}시 ${obj.rebootCycleMinute}분`;
		}

		//OS 재부팅 주기
		newColumns.push({
			field: `rebootCycle`, //rebootCriteria
			title: t('station.os_reboot_cycle'), //`OS 재부팅 주기`,
			width: 140,
			sortable: false,
			filterable: true,
			filterType: "select",
			selectData: dayOfWeek,
			cell: (e: any) => rebootCycleCell(e),
		})

		setColumns(newColumns);
	}

	useLayoutEffect(() => {
		setInitData();
	}, [])

	// useEffect(() => {
  //   setGridProps({
  //     ...gridProps,
  //     columnHeader: columns,
  //   })
  // }, [columns])
	
  return (
		<Fragment>
			{/* 스테이션 설정 현황 */}
			<Header headName={t('station.station_settings_status')} />
			{
				columns.length > 0 &&
				<GridCommonComponent
					{...gridProps}
					columnHeader={columns}
					downloadButton={downloadButton}
					onSearch={getStationConfigStatusList}
					ref={gridRef}
				/>
			}
		</Fragment>
  );
}
