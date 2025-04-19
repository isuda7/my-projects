/**
 * 펌웨어 배포 등록 Component
 * URL: /station/firmware/deploy/add
 */

/* React */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Field, FieldWrapper, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";


/* Common */
import StationApiService from "@/utils/apiService/StationApiService";
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert.tsx";
import FormTextArea from "@/new_components/common/FromTextArea.tsx";
import StationFirmwareSelectedList from "./add/StationFirmwareSelectedList"
import StationTargetSelectedList from "./add/StationTargetSelectedList"
import DeployDateComponent from "./components/DeployDateComponent"

/* Types */
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";

export default function StationFirmwareDeployAdd() {
	const {t} = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const gridRef = useRef<{ getAllDataItems: () => any[] }>(null);
	const gridRef2 = useRef<{ getAllDataItems: () => any[] }>(null);

	const initData = {
		date: new Date(),
		hour: null,
		minute: null,
		isInstant: false,
		description: '',
	}

	const registerFirmwareDeploy = useMutation({
		mutationFn: async (saveData: any) => {
			if(saveData) {
				return StationApiService().registerFirmwareDeploy(saveData)
			}
		},
		onSuccess: (response: any) => {
			//등록되었습니다.
			showAlert({message: t('common.register_success')})
			navigate(-1);
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});

	const getDeployDate = (dataItem: Record<string, unknown>) => {
		const deployDate = new Date((dataItem.date as Date).getTime());

		deployDate.setHours((dataItem.hour as number));
		deployDate.setMinutes((dataItem.minute as number));
		deployDate.setSeconds(0);
		deployDate.setMilliseconds(0);
		return deployDate;
	}

	/**
	 * 예약 등록한 시간값과 현재시간을 비교해 이전시간 여부 반환
	 * @param dataItem 
	 * @returns 
	 */
	const checkDateBeforeNow = (dataItem: any) => {
		const { date, hour, minute } = dataItem;
		const newDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			hour,
			minute
		)

		return newDate.getTime() < Date.now();
	}

	const processSaveData = (dataItem: Record<string, unknown>) => {
		const saveData: { [key: string]: any } = { 
			isInstant : dataItem.isInstant,
			description : dataItem.description,
		}

		if(!dataItem.isInstant) {
			if((!dataItem.hour && dataItem.hour !== 0) || (!dataItem.minute && dataItem.minute !== 0)) {
				// 배포 시간을 선택해주세요
				showAlert({message: t('common.select_required', {string: t('station.deploy_time')})})
				return false;
			}
			
			if(checkDateBeforeNow(dataItem)) {
				showAlert({message: "현재시간보다 과거 시간은 배포 예약 할 수 없습니다."})
				return false;
			}

			saveData.deployDate = getDeployDate(dataItem);
		}
		const stationFwMngIds = getSaveIdList('firmware')
		if(!stationFwMngIds) return false;
		saveData.stationFwMngIds = stationFwMngIds;
		
		const stationIds = getSaveIdList('station')
		if(!stationIds) return false;
		saveData.stationIds = stationIds;

		console.log('saveData', saveData)
		return saveData;
	}

	const getSaveIdList = (flag: string) => {
		let list: any[] = [];
		if(flag === 'firmware' && gridRef.current) {
			list = gridRef.current.getAllDataItems()
		}
		else if(flag === 'station' && gridRef2.current) {
			list = gridRef2.current.getAllDataItems()
		}
		console.log('list', list);
		if(list.length === 0) {
			//배포할 펌웨어, 대상스테이션 을(를) 선택해주세요.
			const flag = 'firmware'? t('station.deploy_wait_firmware') : t('station.target_station');
			const message = t('common.select_required', {string: flag})
			showAlert({message})
			return false;
		}

		let returnList: string[] = []
		if(list.length > 0) {
			if(flag === 'firmware') returnList = list.map(v => v.tsid)
			else if(flag === 'station') returnList = list.map(v => v.id)
		}

		return returnList;
	}

	const handleSubmit = async (dataItem: Record<string, unknown>) => {
		const saveData = processSaveData(dataItem)
		if(!saveData) return false;
		// title: '배포',
		// message: '펌웨어를 선택한 스테이션에 지금 배포하시겠습니까?',
		showAlert({
			title: t('station.deploy'),
			message: t('station.deploy_confirm'),
			type: 'confirm',
			onConfirm: () => registerFirmwareDeploy.mutate(saveData)
		})
	}

	return (
		<>
			{/* "배포 등록" */}
			<Header headName={t('station.deployment_registration')}/>
			<Form
				onSubmit={handleSubmit}
				initialValues={initData}
				ignoreModified
				render={(formRenderProps: FormRenderProps) => (
					<FormElement>
						<section className="section">
							<div className="title-group">
                <h3 className="t-title">
									{/* 배포 정보 */}
									{t('station.deploy_info')}
								</h3>
              </div>

							<table className="tbl-base">
								<colgroup>
									<col style={{ width: "10%" }} />
									<col style={{ width: "90%" }} />
								</colgroup>
								<tbody>
									<tr>
										<th scope="col">
                      {/* 배포 일시 */}
											{t('station.deploy_datetime')}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
										<td>
											<DeployDateComponent
												formRenderProps = {formRenderProps}
											/>
										</td>
									</tr>
									<tr>
										<th scope="row">
											{/* 배포 설명 */}
											{t('station.deploy_description')}
										</th>
										<td>
											<FieldWrapper>
												<Field 
													name={"description"} 
													component={FormTextArea} 
													rows={6}
													maxLength={2000} 
												/>
											</FieldWrapper>
										</td>
									</tr>
								</tbody>
							</table>
						</section>

						<StationFirmwareSelectedList 
							ref = {gridRef}
						/>

						<StationTargetSelectedList 
							ref = {gridRef2}
						/>

						{/* 하단 버튼 그룹 */}
						<div className="btn-group">
							<div className="group-align-right">
								<Button
									type="button" 
									size={"large"} 
									fillMode="outline"
									onClick={() => navigate(-1)}
								>
									{/* 취소 */}
									{t('common.cancel')}
								</Button>
								<Button
									size={"large"} 
									themeColor={"primary"}
								>
									{/* 배포 */}
									{t('station.deploy')}
								</Button>
							</div>
						</div>
					</FormElement>
				)}
			/>
		</>
	);
}
