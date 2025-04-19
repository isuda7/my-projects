/**
 * 충전프로파일 Factor상세 Component
 * URL: /station/charge-profile/factor/detail
 */

/* React */
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

/* Kendo UI */
import { Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import FactorInfo from "./components/FactorInfo";
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import PermissionButton from "@/new_components/common/PermissionButton";

export default function ChargeProfileFactorDetail() {
	const showAlert = useAlert()
	const navigate = useNavigate()
	const location = useLocation()
	const { t } = useTranslation()
	const { id } = location.state;
	
	const [initData, setInitData] = useState<any>()

	const registerChargeProfileFactor = useMutation({
		mutationFn: async (dataItem: any) => {
			if(dataItem) {
				return StationApiService().modifyChargeProfileFactor(dataItem, dataItem.id)
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

	const deleteChargeProfileFactor = useMutation({
		mutationFn: async (id: string) => {
			if(id) {
				return StationApiService().deleteChargeProfileFactor(id)
			}
		},
		onSuccess: (response: any) => {
			//저장되었습니다.
			showAlert({message: t('common.delete_success')})
			navigate(-1);
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});
	
	const handleSubmit = (dataItem: Record<string, any>) => {
		console.log('handleSubmit dataItem', dataItem)

		const saveData: any = {
			id: dataItem.id,
			chargeFactorCode: dataItem.chargeFactorCode
		}

		if(dataItem.chargeFactorCode === 'CGST') {
			saveData.congestionLevelCode = dataItem.congestionLevelCode;
		}
		else {
			saveData.minValue = dataItem.minValue;
			saveData.maxValue = dataItem.maxValue;
		}

		showAlert({
			title: t('common.save'), //'저장',
			message: t('common.save_confirm'), //'저장하시겠습니까?',
			type: 'confirm',
			onConfirm: () => registerChargeProfileFactor.mutate(saveData)
		})
	}

	const setInit = async () => {
		const response = await StationApiService().getChargeProfileFactor(id)
		const init = {
			...response.data,
		}
		setInitData(init);
	}

	useEffect(() => {
		setInit();
	}, [])

	const onDeleteFactor = () => {
		showAlert({
			title: t('common.delete'), //'삭제',
			message: t('station.charge_profile_factor_delete_confirm'), //'해당 충전 프로파일 Factor를 삭제하시겠습니까?',
			type: 'confirm',
			onConfirm: () => deleteChargeProfileFactor.mutate(id)
		})
	}

  return (
    <>
			{/* 충전 프로파일 Factor 상세 */}
      <Header headName={t('station.charge_profile_factor_detail')} />
			{
				initData &&
				<Form
					onSubmit={handleSubmit}
					initialValues={initData}
					ignoreModified={true}
					//validator={validateFields}
					render={(formProps: FormRenderProps) => (
						<FormElement>
							{/* 기본 정보 */}
							<FactorInfo
								type={"add"}
								formProps={formProps}
							/>
	
							<div className="btn-group">
								<div className="group-align-right">
									{/* 삭제 */}
									<PermissionButton
										type="button"
										title={t('common.delete')}
										themeColor={'base'}
										onClick={() => onDeleteFactor()}
									/>
									<Button
										type="button"
										size={"large"} 
										fillMode="outline"
										onClick={() => navigate(-1)}
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
