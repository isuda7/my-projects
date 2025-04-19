/**
 * 스테이션 초기 설정 Component
 * URL: /station/config/init
 */

/* React */
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import StationApiService from "@/utils/apiService/StationApiService";
import Header from "@/new_components/common/Header.tsx";
import OtherInfo from "../components/OtherInfo";
import EmissionPriorityInfo from "../components/EmissionPriorityInfo";
import BusynessInfo from "../components/BusynessInfo";
import TemperatureRangeInfo from "../components/TemperatureRangeInfo";
import useAlert from "@/hooks/useAlert";
import _ from "lodash";
import PermissionButton from "@/new_components/common/PermissionButton";

/* Type */
import { StationConfigDto } from "@/utils/apiService/type/station/StationConfigDto"

export default function StationConfigInit() {
	const showAlert = useAlert()
	const queryClient = useQueryClient();
	const { t } = useTranslation()

	const [configData, setConfigData] = useState<StationConfigDto>()
	
  const { data, isLoading, isFetching, refetch } = useQuery<any, Error>({
    queryKey: ["stationConfigInit"],
    queryFn: async () => {
			return await getStationConfigInit()
    },
    //enabled: false, // 자동 실행 비활성화
  });

	const registInit = useMutation({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		mutationFn: async (dataItem: Record<string, unknown>) => {
			if(dataItem)
			return await StationApiService().registerStationConfigInit(dataItem)
		},
		onSuccess: (response: any) => {
			//'설정값이 변경되었습니다.'
			showAlert({message: t('station.config_value_change_success')})
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});

	const handleSubmit = (dataItem: Record<string, unknown>) => {
		if(!checkValidation(dataItem)) return;

		console.log('handleSubmit data', dataItem)
		showAlert({
			title: t('common.save'), //'저장',
			message: t('station.station_init_save_confirm'), //'스테이션 초기 설정값을 변경하시겠습니까?',
			type: 'confirm',
			onConfirm: () => registInit.mutate(dataItem),
		})
	}

	/**
	 * form 데이터 유효성검사
	 * @param dataItem 
	 * @returns 
	 */
	const checkValidation = (dataItem: any) => {
		console.log('checkValidation dataItem', dataItem)
		let result = true;
		const { dischargeCriteriaList: discharge, congestionCriteriaList: congestion, 
						temperatureCriteriaList: temp, rebootCriteria: reboot } = dataItem;

		for(let i=0; i<discharge.length; i++) {
			if(!discharge[i].criteriaCode || !discharge[i].valueCode) {
				//배출우선순위를 선택해주세요
				showAlert({message: t('common.select_required', {string: t('station.discharge_priority')})});
				return false;
			}
		}
		
		for(let i=0; i<congestion.length; i++) {
			if(!congestion[i].congestionLevelCode) {
				//번잡도를 선택해주세요
				showAlert({message: t('common.select_required', {string: t('station.congestion_level')})});
				return false;
			}
		}
		
		for(let i=0; i<temp.length; i++) {
			if((!temp[i].minTemperature && temp[i].minTemperature !== 0) || 
				 (!temp[i].maxTemperature && temp[i].maxTemperature !== 0)) {
				//온도범위를 선택해주세요
				showAlert({message: t('common.select_required', {string: t('station.temperature_range')})});
				return false;
			}
		}

		if(!dataItem.chargeOrderCode) {
			//충전순서기준를 선택해주세요
			showAlert({message: t('common.select_required', {string: t('station.charge_order_code')})});
			return false;
		}

		if(!dataItem.permissibleSoc) {
			//배출가능 SOC를 선택해주세요
			showAlert({message: t('common.select_required', {string: t('station.permissible_soc')})});
			return false;
		}

		if(reboot.rebootCycle === '-' || (reboot.rebootCycle && ((!reboot.rebootCycleHour && reboot.rebootCycleHour !== 0) || (!reboot.rebootCycleMinute && reboot.rebootCycleMinute !== 0)))) {
			//OS 재부팅 주기를 선택해주세요
			showAlert({message: t('common.select_required', {string: t('station.os_reboot_cycle')})});
			return false;
		}

		return result;
	}

	const getStationConfigInit = async () => {
		const result = await StationApiService().getStationConfigInit();
		console.log('getStationConfigInit', result.data)
		return result.data;
	}

	useEffect(() => {
		if(data) {
			setConfigData(data)
		}
	}, [data])

	useEffect(() => {
		return () => queryClient.removeQueries()
	}, [queryClient])

	/**
	 * 초기 조회값으로 리셋
	 * @param formProps 
	 */
	const resetConfigInit = (formProps: FormRenderProps) => {
		const origin = _.cloneDeep(configData);
		console.log('origin', origin)
		for(let key in origin) {
			formProps.onChange(key, {value: origin[key]});
		}
	}

  return (
    <>
			{/* 스테이션 초기 설정 */}
      <Header headName={t('station.initial_station_settings')} />
			{configData && 
				<Form
					onSubmit={handleSubmit}
					initialValues={configData}
					ignoreModified={true}
					render={(formProps: FormRenderProps) => (
						<FormElement>
							{/* 배출 우선순위 */}
							<EmissionPriorityInfo
								list={configData?.dischargeCriteriaList}
							/>

							{/* 번잡도 */}
							<BusynessInfo 
								list={configData?.congestionCriteriaList}
							/>

							{/* 온도범위 */}
							<TemperatureRangeInfo 
								list={configData?.temperatureCriteriaList}
							/>

							<OtherInfo 
								data={configData}
								formProps={formProps}
							/>

							<div className="btn-group">
								<div className="group-align-right">
									<Button
										type="button"
										size={"large"} 
										fillMode="outline"
										onClick={() => resetConfigInit(formProps)}
									>
										{t('common.cancel') /* 취소 */}
									</Button>
									{/* 저장 */}
									<PermissionButton />
								</div>
							</div>
						</FormElement>
					)}
				/>
			}
    </>
  );
}
