/**
 * 충전 프로파일 배포 등록 Component
 * URL: /station/charge-profile/deploy/add
 */

/* React */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import StationApiService from "@/utils/apiService/StationApiService";
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert.tsx";
import ChargeProfileSelectedList from "./add/ChargeProfileSelectedList"
import StationTargetSelectedList from "@/views/station/firmware/deploy/add/StationTargetSelectedList"


export default function StationFirmwareDeployAdd() {
	const {t} = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const gridRef = useRef<{ getAllDataItems: () => any[] }>(null);
	const gridRef2 = useRef<{ getAllDataItems: () => any[] }>(null);

	const registerChargeProfileDeploy = useMutation({
		mutationFn: async (saveData: any) => {
			if(saveData) {
				return StationApiService().registerChargeProfileJob(saveData)
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

	const processSaveData = (dataItem: Record<string, unknown>) => {

		const stationChargeProfileNos = getSaveIdList('chargeProfile')
		if(!stationChargeProfileNos) return false;
		
		const stationIds = getSaveIdList('station')
		if(!stationIds) return false;

		const saveData = {
			stationChargeProfileNos,
			stationIds,
		}
		return saveData;
	}

	const getSaveIdList = (flag: string) => {
		let list: any[] = [];
		if(flag === 'chargeProfile' && gridRef.current) {
			list = gridRef.current.getAllDataItems()
		}
		else if(flag === 'station' && gridRef2.current) {
			list = gridRef2.current.getAllDataItems()
		}
		console.log('list', list);
		if(list.length === 0) {
			//충전 프로파일, 대상스테이션 을(를) 선택해주세요.
			const flag = 'chargeProfile'? t('station.charge_profile') : t('station.target_station');
			const message = t('common.select_required', {string: flag})
			showAlert({message})
			return false;
		}

		let returnList: string[] = []
		if(list.length > 0) {
			if(flag === 'chargeProfile') returnList = list.map(v => v.id)
			else if(flag === 'station') returnList = list.map(v => v.id)
		}

		return returnList;
	}

	const handleSubmit = async (dataItem: Record<string, unknown>) => {
		const saveData = processSaveData(dataItem)
		if(!saveData) return false;
		// title: '저장',
		// message: '저장하시겠습니까?',
		console.log('saveData,', saveData)
		showAlert({
			title: t('common.save'),
			message: t('common.save_confirm'),
			type: 'confirm',
			onConfirm: () => registerChargeProfileDeploy.mutate(saveData)
		})
	}

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {

	}

	useEffect(() => {
		setInitData();
	}, [])

	return (
		<>
			{/* 충전 프로파일 배포 등록 */}
			<Header headName={t('station.charging_profile_deployment_registration')}/>
			<Form
				onSubmit={handleSubmit}
				ignoreModified
				render={(formRenderProps: FormRenderProps) => (
					<FormElement>

						<ChargeProfileSelectedList 
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
									{/* 저장 */}
									{t('common.save')}
								</Button>
							</div>
						</div>
					</FormElement>
				)}
			/>
		</>
	);
}
