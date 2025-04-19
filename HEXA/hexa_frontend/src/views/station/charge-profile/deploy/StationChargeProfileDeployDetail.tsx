/**
 * 충전 프로파일 배포 상세 Component
 * URL: /station/charge-profile/deploy/detail
 */
/* React */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import RegisterInfo from "@/new_components/common/RegisterInfo";
import PermissionButton from "@/new_components/common/PermissionButton";


export default function StationChargeProfileDeployDetail() {
	const {t} = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = location.state;
	const gridRef = useRef<{ getAllDataItems: () => any[] }>(null);
	const gridRef2 = useRef<{ getAllDataItems: () => any[] }>(null);

	const [initData, setInitData] = useState<any>()

	const retryChargeProfileDeploy = useMutation({
		mutationFn: async () => {
			if(id) {
				return StationApiService().registerChargeProfileJobRetry(id)
			}
		},
		onSuccess: (response: any) => {
			//재배포 되었습니다.
			showAlert({message: t('station.retry_deploy_success')})
			navigate(-1);
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});

	const handleSubmit = async (dataItem: Record<string, unknown>) => {
		
		//재배포
		//'충전 프로파일을 재배포하시겠습니까?\n선택한 스테이션 중에서 실패 상태인 스테이션에만 배포됩니다.',
		showAlert({
			title: t('station.retry_deploy'),
			message: t('station.charge_profile_retry_deploy_confirm'),
			type: 'confirm',
			onConfirm: () => retryChargeProfileDeploy.mutate()
		})
	}

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInit = async () => {
		const res = await StationApiService().getStationChargeProfileJob(id)
		console.log('res.data', res.data)
		setInitData(res.data)
	}

	useEffect(() => {
		setInit();
	}, [])

	return (
		<>
			{/* 충전 프로파일 배포 상세 */}
			<Header headName={t('station.charging_profile_deployment_details')}/>
			{
				initData && 
				<Form
					onSubmit={handleSubmit}
					ignoreModified
					initialValues={initData}
					render={(formRenderProps: FormRenderProps) => (
						<FormElement>

							<ChargeProfileSelectedList 
								ref = {gridRef}
								initData = {initData.profiles}
								disabled={true}
							/>

							<StationTargetSelectedList 
								ref = {gridRef2}
								initData = {initData.stations}
								disabled={true}
							/>

							<RegisterInfo formProps={formRenderProps} />

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
									{/* 재배포 */}
									<PermissionButton title={t('station.retry_deploy')}/>
								</div>
							</div>
						</FormElement>
					)}
				/>
			}
		</>
	);
}
