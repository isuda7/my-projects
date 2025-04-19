/**
 * 충전프로파일 Factor 등록 Component
 * URL: /station/charge-profile/factor/add
 */

/* React */
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/* Kendo UI */
import { Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import FactorInfo from "./components/FactorInfo";
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";

/* Validator */
import { stringLengthMinMaxValidator } from "@/utils/Validators.ts";

export default function ChargeProfileFactorAdd() {
	const showAlert = useAlert()
	const navigate = useNavigate()
	const { t } = useTranslation()
	
	const registerChargeProfileFactor = useMutation({
		mutationFn: async (dataItem: any) => {
			if(dataItem) {
				return StationApiService().registerChargeProfileFactor(dataItem)
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

		const saveData: any = {chargeFactorCode: dataItem.chargeFactorCode}
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

  return (
    <>
			{/* 충전 프로파일 Factor 등록 */}
      <Header headName={t('station.charge_profile_factor_add')} />
			<Form
				onSubmit={handleSubmit}
				ignoreModified={true}
				render={(formProps: FormRenderProps) => (
					<FormElement>
						{/* 기본 정보 */}
						<FactorInfo
							type={"add"}
							formProps={formProps}
						/>

						<div className="btn-group">
							<div className="group-align-right">
								<Button
									type="button"
									size={"large"} 
									fillMode="outline"
									onClick={() => navigate(-1)}
								>
									{t('common.cancel') /* 취소 */}
								</Button>
								<Button
									type="submit" 
									size={"large"} 
									themeColor={"primary"}
								>
									{t('common.save') /* 저장 */}
								</Button>
							</div>
						</div>
					</FormElement>
				)}
			/>
    </>
  );
}
