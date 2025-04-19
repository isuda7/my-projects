/**
 * 충전 프로파일 상세 Component
 * URL: /station/charge-profile/management/detail
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
import ChargeProfileInfo from "./components/ChargeProfileInfo";
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import PermissionButton from "@/new_components/common/PermissionButton";

export default function StationChargeProfileDetail() {
	const showAlert = useAlert()
	const navigate = useNavigate()
	const location = useLocation()
	const { t } = useTranslation()
	const { id } = location.state;
	
	const [initData, setInitData] = useState<any>()

	const modifyChargeProfile = useMutation({
		mutationFn: async (dataItem: any) => {
			if(dataItem) {
				return StationApiService().modifyStationChargeProfile(dataItem, dataItem.id)
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

	const deleteChargeProfile = useMutation({
		mutationFn: async (id: string) => {
			if(id) {
				return StationApiService().deleteStationChargeProfile(id)
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

		if(!checkValidation(dataItem)) return;

		showAlert({
			title: t('common.save'), //'저장',
			message: t('common.save_confirm'), //'저장하시겠습니까?',
			type: 'confirm',
			onConfirm: () => modifyChargeProfile.mutate(dataItem)
		})
	}

	const checkValidation = (dataItem: Record<string, any>) => {
		let result = true;
		/**
		 * deratingValue1, deratingValue2값이 각 항목의 최대, 최소값을 넘지않도록 체크
		 */
		if(Number(dataItem.deratingValue1) < Number(dataItem.deratingMin1) || 
			Number(dataItem.deratingValue1) > Number(dataItem.deratingMax1) ||
			Number(dataItem.deratingValue2) < Number(dataItem.deratingMin2) ||
			Number(dataItem.deratingValue2) > Number(dataItem.deratingMax2) 
			) {
			//Derating Factor는 최소, 최대 범위를 벗어날 수 없습니다. 다시 입력해주세요.
			showAlert({message: t('station.derating_factor_limit')})
			result = false;
			return false;
		}

		return result;
	}

	const setInit = async () => {
		const response = await StationApiService().getStationChargeProfile(id)

		const init = {
			...response.data,
		}
		setInitData(init);
	}

	useEffect(() => {
		setInit();
	}, [])

	const onDeleteProfile = () => {
		//'해당 충전 프로파일을 삭제하시겠습니까?',
		showAlert({
			title: t('common.delete'), //'삭제',
			message: t('station.charge_profile_delete_confirm'),
			type: 'confirm',
			onConfirm: () => deleteChargeProfile.mutate(id)
		})
	}

  return (
    <>
			{/* 충전 프로파일 상세 */}
      <Header headName={t('station.charging_profile_details')} />
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
							<ChargeProfileInfo
								type={"detail"}
								formProps={formProps}
							/>
	
							<div className="btn-group">
								<div className="group-align-right">
									{
										!formProps.valueGetter('isDefault') &&
										/* 삭제 */
										<PermissionButton
											type="button"
											title={t('common.delete')}
											themeColor={'base'}
											onClick={() => onDeleteProfile()}
										/>
										// <Button 
										// 	type="button"
										// 	size={"large"}
										// 	onClick={() => onDeleteProfile()}
										// >
										// 	{t('common.delete') }
										// </Button>
									}
									<Button
										type="button"
										size={"large"} 
										fillMode="outline"
										onClick={() => navigate(-1)}
									>
										{t('common.cancel') /* 취소 */}
									</Button>
									<PermissionButton />
									{/* <Button
										type="submit" 
										size={"large"} 
										themeColor={"primary"}
									>
										{t('common.save')}
									</Button> */}
								</div>
							</div>
						</FormElement>
					)}
				/>

			}
    </>
  );
}
