/**
 * 펌웨어 배포 상세 Component
 * URL: /station/firmware/deploy/detail
 */

/** React */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Field, FieldWrapper, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import FormTextArea from "@/new_components/common/FromTextArea.tsx";
import StationFirmwareSelectedList from "./add/StationFirmwareSelectedList"
import StationTargetSelectedList from "./add/StationTargetSelectedList"
import DeployDateComponent from "./components/DeployDateComponent"
import RegisterInfo from "@/views/station/components/RegisterInfo"
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import useAlert from "@/hooks/useAlert.tsx";

/* Types */
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";

export default function StationFirmwareDeployDetail() {
	const {t} = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = location.state;
	console.log('id', id)
	const gridRef = useRef<{ getAllDataItems: () => any[] }>(null);
	const gridRef2 = useRef<{ getAllDataItems: () => any[] }>(null);

	const [jobStatusCodeList, setJobStatusCodeList] = useState<any[]>([]);
	const [initData, setInitData] = useState<any>()

	// const initData = {
	// 	date: new Date(),
	// 	hour: null,
	// 	minute: null,
	// 	isInstant: false,
	// 	description: '',
	// }

	const modifyFirmwareDeploy = useMutation({
		mutationFn: async (saveData: any) => {
			if(saveData) {
				return StationApiService().modifyFirmwareDeploy(saveData, saveData.id)
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

	const cancelFirmwareDeploy = useMutation({
		mutationFn: async (id: string) => {
			return StationApiService().cancelFirmwareDeploy(id)
		},
		onSuccess: (response: any) => {
			//cancel_success
			showAlert({message: t('common.cancel_success')})
			navigate(-1);
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});

	const retryFirmwareDeploy = useMutation({
		mutationFn: async (saveData: any) => {
			if(saveData) {
				return StationApiService().retryFirmwareDeploy(saveData, saveData.id)
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

	/**
	 * 넘겨받은 Date객체가 현재시간 기준으로 30분 안쪽에 있는지 판단해주는 함수
	 * @param date 
	 * @returns 
	 */
	const withIn30MinNow = (date: Date) => {
		const flagValue = 30 * 60 * 1000;
		const now = Date.now();
		return date.getTime() <= now || date.getTime() <= now + flagValue;
	}

	const processSaveData = (dataItem: Record<string, unknown>) => {
		const saveData: { [key: string]: any } = { 
			...dataItem
		}

		const deployDate = new Date(initData.deployedAt)
		if(withIn30MinNow(deployDate)) {
			showAlert({message: '배포 30분전은 수정 불가능 합니다.'})
			return false;
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

	const handleSubmit = async (dataItem: Record<string, unknown>, event: any) => {
		const saveData = processSaveData(dataItem)
		const buttonName = event.nativeEvent.submitter.name;
		console.log('saveData', saveData)
		if(!saveData) return false;

		if(buttonName === 'deploy') {
			if(dataItem.isInstant) {
				// title: '배포',
				// message: '펌웨어를 선택한 스테이션에 지금 배포하시겠습니까?',
				showAlert({
					title: t('station.deploy'),
					message: t('station.deploy_confirm'),
					type: 'confirm',
					onConfirm: () => modifyFirmwareDeploy.mutate(saveData)
				})
			}
			else {
				// title: '저장',
				// message: '펌웨어 배포 예약을 변경하시겠습니까?',
				showAlert({
					title: t('common.save'),
					message: t('station.firmware_schedule_change_confirm'),
					type: 'confirm',
					onConfirm: () => modifyFirmwareDeploy.mutate(saveData)
				})
			}
		}
		else if(buttonName === 'reDeploy') {
			// title: '재배포',
			// message: '펌웨어를 재배포하시겠습니까? ​\n선택한 스테이션 중에서 실패 상태인 스테이션에만 배포됩니다. ',
			showAlert({
				title: t("station.retry_deploy"),
				message:  t("station.firmware_retry_deploy_confirm"),
				type: 'confirm',
				onConfirm: () => retryFirmwareDeploy.mutate(saveData)
			})
		}
		else if(buttonName === 'cancelDeploy') {
			/**
			 * 예약취소
			 * 현재시간이 배포시간(deployedAt) 30분전일경우 알림띄우고 return
			 * 현재시간이 배포시간 30분 이상 남았을경우 알림띄우고 취소처리
			 */
			const now = new Date();
			const deployedAt = new Date(initData.deployedAt)
			const differenceInMinutes = (deployedAt.getTime() - now.getTime()) / (1000 * 60);
	
			//cancelFlag가 true일 경우 예약 가능 처리
			const cancelFlag = differenceInMinutes > 30;
			if(cancelFlag) {
				// title: '취소',
				// message: '펌웨어 배포 예약을 취소하시겠습니까?',
				showAlert({
					title: t('common.cancel'),
					message: t("station.firmware_deploy_schedule_cancel_confirm"),
					type: 'confirm',
					onConfirm: () => cancelFirmwareDeploy.mutate(id)
				});
				return;
			}
			else {
				//펌웨어 배포 예약을 변경하실 수 없습니다.
				showAlert({message: t('station.no_firmware_deploy_schedule_message')});
				return;
			}
		}
	}

	/**
	 * 초기데이터 호출 및 세팅
	 * @returns 
	 */
	const getFirmwareDeploy = async () => {
		//완료 여부 한글값표현을 위한 리스트 데이터 조회 및 세팅
		const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMFCMP'});
		if(Array.isArray(res.data)) setJobStatusCodeList(res.data);


		const result: any = await StationApiService().getStationFirmwareDeploy(id);

		console.log('getFirmwareDeploy data', result.data)
		//const { firmwares, stations, ...rest} = result.data;
		const deployDate = new Date(result.data.deployedAt)
		const init = {
			date: deployDate,
			hour: deployDate.getHours(),
			minute: deployDate.getMinutes(),
			...result.data,
		}

		setInitData(init);
	}

	const getJobStatusValue = (code: string) => {
		console.log('jobStatusCodeList', jobStatusCodeList)
		let value = '';
		for(let i=0; i<jobStatusCodeList?.length; i++) {
			if(jobStatusCodeList[i].code === code) {
				value = jobStatusCodeList[i].value;
				break;
			}
		}
		console.log('value', value)
		return value;
	}

	useEffect(() => {
		getFirmwareDeploy();
	}, [])

	/**
	 * 상태값, 예약:REQ, 완료:CMP, 취소:CNCL, 미완료:NCMP
	 * 예약 : 모든 상태 노출
	 * 완료 : 모든 필드 disabled 예약취소 배포 버튼 미노출, 재배포버튼 노출
	 * 취소, 미완료: 모든 필드 disabled, 모든버튼 미노출
	 */
	const fieldDisabled = initData && initData.jobStatusCode !== 'REQ';
	console.log('fieldDisabled', fieldDisabled)
	return (
		<>
			{/* 배포 상세 */}
			<Header headName={t('station.deployment_details')}/>
			{
				initData &&
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
									<div className="title-group__txt">
                  <span className="c-red">
                    {/* ※ 펌웨어 배포 수정은 예약시간 30분전까지만 가능하며, 배포완료 후, 실패한 경우 상세화면에서 다시 재배포할 수 있습니다. */}
										{`※ ${t('station.firmware_deploy_detail_info_message')}`}
                  </span>
                </div>
								</div>

								<table className="tbl-base">
									<colgroup>
										<col style={{ width: "10%" }} />
										<col style={{ width: "70%" }} />
										<col style={{ width: "10%" }} />
										<col style={{ width: "10%" }} />
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
													disabled={fieldDisabled}
													formRenderProps = {formRenderProps}
												/>
											</td>
											<th scope="col">
												{/* OTA ID */}
												{t('station.ota_id')}
											</th>
											<td>{formRenderProps.valueGetter('id')}</td>
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
														disabled={fieldDisabled}
													/>
												</FieldWrapper>
											</td>
											<th scope="col">
												{/* 완료 여부 */}
												{t('station.is_complete')}
											</th>
											<td>{getJobStatusValue(formRenderProps.valueGetter('jobStatusCode'))}</td>
										</tr>
									</tbody>
								</table>
							</section>

							<StationFirmwareSelectedList
								disabled={fieldDisabled}
								initData = {initData.firmwares}
								ref = {gridRef}
								/>

							<StationTargetSelectedList 
								disabled={fieldDisabled}
								initData={initData.stations}
								ref = {gridRef2}
							/>

							<RegisterInfo formProps={formRenderProps}/>

							{/* 하단 버튼 그룹 */}
							<div className="btn-group">
								<div className="group-align-right">
									{
										//예약일 경우만 나오게
										initData.jobStatusCode === 'REQ' &&
										<Button
											type="submit"
											size={"large"}
											name="cancelDeploy"
										>
											{/* 예약취소 */}
											{t('station.deploy_schedule_cancel')}
										</Button>
									}
									{
										//예약, 완료일 경우만 나오게
										(initData.jobStatusCode === 'REQ' ||
										initData.jobStatusCode === 'CMP') &&
										<Button
											type="button" 
											size={"large"} 
											fillMode="outline"
											onClick={() => navigate(-1)}
										>
											{/* 취소 */}
											{t('common.cancel')}
										</Button>
									}
									{
										//예약일 경우만 나오게
										initData.jobStatusCode === 'REQ' &&
										<Button 
											size={"large"} 
											themeColor={"primary"}
											type="submit"
											name="deploy"
										>
											{/* 배포 */}
											{t('station.deploy')}
										</Button>
									}
									{
										//완료일 경우만 나오게
										initData.jobStatusCode === 'CMP' &&
										<Button 
											size={"large"}
											themeColor={"primary"}
											type="submit"
											name="reDeploy"
										>
											{/* 재배포 */}
											{t('station.retry_deploy')}
										</Button>
									}
								</div>
							</div>
						</FormElement>
					)}
				/>
			}
		</>
	);
}
