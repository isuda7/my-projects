/**
 * 스테이션 설정 상세 Component
 * URL: /station/config/management/detail
 */

/* React */
import { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

/* Kendo UI */
import { Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import useAlert from "@/hooks/useAlert";
import CustomSelect from "@/new_components/form/CustomSelect";
import FormField from "@/new_components/common/FormField";
import ConfigControl from "../components/ConfigControl";
import StationTargetSelectedList from "./StationTargetSelectedList";
import RegisterInfo from "@/views/station/components/RegisterInfo"

/* Type */
import { StationConfigDto } from "@/utils/apiService/type/station/StationConfigDto"

export default function StationConfigManagementAdd() {
	const showAlert = useAlert()
	const navigate = useNavigate()
	const gridRef = useRef<{ getAllDataItems: () => any[] }>(null);
	const location = useLocation();
	const { id } = location.state;
	const { t } = useTranslation()

	//설정제어 SelectBox
	const [configCodes, setConfigCodes] = useState<any[]>([])

	//초기 데이터
	const [initData, setInitData] = useState<any>();

	const registerStationConfigManage = useMutation({
		mutationFn: async (saveData: any) => {
			if(saveData) {
				return StationApiService().registerStationConfigManage(saveData)
			}
		},
		onSuccess: (response: any) => {
			//저장되었습니다.
			showAlert({message: t('common.save_success')})
			navigate(-1);
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});
	
	const handleSubmit = (dataItem: Record<string, any>) => {
		console.log('handleSubmit dataItem', dataItem)

		if(!checkValidation(dataItem)) return;

		let saveData: any = { configCode: dataItem.configCode }
		switch(dataItem.configCode) {
			//온도범위
			case 'TMPRNG': saveData.temperatureCriteriaList = dataItem.temperatureCriteriaList; break;
			//충전순서기준
			case 'CHGORD': saveData.chargeOrderCode = dataItem.chargeOrderCode; break;
			//배출가능SOC
			case 'PRMSOC': saveData.permissibleSoc = dataItem.permissibleSoc; break;
			//사용가능 전력량
			case 'PWRCAP': saveData.powerCapacity = dataItem.powerCapacity; break;
			//시스템작업모드
			case 'SOMODE': saveData.isSystemOperationMode = true; break;
			default: break;
		}

		//대상스테이션 ID리스트 삽입
		const stationIds = getSaveIdList('station')
		if(!stationIds) return false;
		saveData.stationIds = stationIds;

		//제어명 가지고오기
		const configValue = getConfigValue(dataItem.configCode);
		console.log('saveData', saveData);
		//`[${configValue}] 지금 실행하시겠습니까?`,
		showAlert({
			title: t('common.save'),//'저장',
			message: `[${configValue}] ${t('station.im_start_confirm')}`,
			type: 'confirm',
			onConfirm: () => registerStationConfigManage.mutate(saveData)
		})
	}

	const getConfigValue = (code: string) => {
		let result = '';
		for(let i=0; i<configCodes.length; i++) {
			if(configCodes[i].code === code) {
				result = configCodes[i].value;
				break;
			}
		}
		return result;
	}

	const checkValidation = (dataItem: Record<string, any>) => {
		let result = true;
		
		return result;
	}

	const getSaveIdList = (flag: string) => {
		let list: any[] = [];
		if(gridRef.current) {
			list = gridRef.current.getAllDataItems()
		}

		console.log('list', list);
		if(list.length === 0) {
			//대상스테이션 을(를) 선택해주세요.
			const message = t('common.select_required', {string: t('station.target_station')})
			showAlert({message})
			return false;
		}

		let returnList: string[] = []
		if(list.length > 0) {
			returnList = list.map(v => v.id)
		}

		return returnList;
	}

	// const { data, isLoading, isFetching, refetch } = useQuery<any, Error>({
  //   queryKey: ["stationConfigInit"],
  //   queryFn: () => {
	// 		return getStationConfigInit()
  //   },
  //   //enabled: false, // 자동 실행 비활성화
  // });

	const getStationConfigInit = async () => {
		const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNF'});
		if(Array.isArray(res.data)) {
			//배출 우선순위, 번잡도, OS재부팅주기가 아닌경우만 보여줌
			const list = res.data.filter(v => !['DISCHG', 'CONGST', 'REBOOT'].includes(v.code))
			setConfigCodes(list);
		}

		const result: any = await StationApiService().getStationConfigJob(id);
		console.log('getStationConfigJob', result.data)

		const init = {
			...result.data,
			// configCode: null,
			// temperatureCriteriaList : result.data?.temperatureCriteriaList,
			// chargeOrderCode: result.data?.chargeOrderCode,
			// permissibleSoc: result.data?.permissibleSoc,
			// isSystemOperationMode: false,
			// powerCapacity: null,
		}
		setInitData(init)
	}

	useEffect(() => {
		getStationConfigInit();
	}, [])

	const disabled = true;

  return (
    <>
			{/* 스테이션 설정 상세 */}
      <Header headName={t('station.station_settings_details')} />
			{
				initData &&
				<Form
					onSubmit={handleSubmit}
					initialValues={initData}
					ignoreModified={true}
					//validator={validateFields}
					render={(formProps: FormRenderProps) => (
						<FormElement>
							<section className="section">
								<div className="title-group">
									<h3 className="t-title">
										{t('station.control_info') /* 제어 정보 */}
									</h3>
								</div>

								<table className="tbl-base">
									<colgroup>
										<col style={{ width: "15%" }} />
										<col style={{ width: "85%" }} />
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">
												{t('station.control') /* 제어 */}
												<span className="required">
													<span className="sr-only">필수</span>
												</span>
											</th>
											<td>
												<div className="in-input">
													<div className="inner-item mw400">
														<FormField
															name={'configCode'}
															component={CustomSelect}
															data={configCodes}
															disabled={disabled}
															// onChange={(e: any) => {
															// 	let value = false;
															// 	if(e.value === 'SOMODE') value = true;
															// 	formProps.onChange('isSystemOperationMode', {value})
															// }}
														/>
														<Button 
															type="button"
															size={"medium"}
															className="w80"
															disabled={disabled}	
														>
															{t('common.lookup') /* 조회 */}
														</Button>
													</div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>

								<ConfigControl 
									initData={initData} 
									formProps={formProps}
									disabled={disabled}
								/>

							</section>
							
							<StationTargetSelectedList 
								disabled={disabled}
								initData={initData.deploys}
								ref = {gridRef}
							/>

							<RegisterInfo formProps={formProps}/>

						</FormElement>
					)}
				/>

			}
    </>
  );
}
