/**
 * 스테이션 정보 등록 Component
 * URL: /station/info/management/detail/add
 */

/* React */
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/* Kendo UI */
import { Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { UploadFileInfo } from "@progress/kendo-react-upload";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import BasicInfo from "./components/BasicInfo";
import ConfigInfo from "./components/ConfigInfo";
import StationInfo from "./components/StationInfo";
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import _ from "lodash"

/* Validator */
import { stringLengthMinMaxValidator } from "@/utils/Validators.ts";

export default function StationInfoManagementAdd() {
	const showAlert = useAlert()
	const navigate = useNavigate()
	const { t } = useTranslation()
	
	const [initData, setInitData] = useState<any>()

	//슬롯개수
	const [slotCount, setSlotCount] = useState<number>()
	//스테이션명 중복확인여부
	const [nameDupliCheck, setNameDupliCheck] = useState<boolean>(false)

	//파일 정보
	const [files, setFiles] = useState<Array<UploadFileInfo>>([]);

	const registerStation = useMutation({
		mutationFn: async (formData: FormData) => {
			if(formData) {
				return StationApiService().registerStationInfo(formData)
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

		const formData = new FormData();

		formData.append('dto', JSON.stringify(dataItem));
		for(let i=0; i<files.length; i++) {
			const rawFile = files[i].getRawFile?.();
			if(rawFile) formData.append('photos', rawFile)
		}

		// formData.forEach((value, key) => {
		// 	if (value instanceof File) {
		// 		console.log(`Key: ${key}, File Name: ${value.name}, File Type: ${value.type}, File Size: ${value.size}`);
		// 	} else {
		// 		console.log(`Key: ${key}, Value: ${value}`);
		// 	}
		// });

		showAlert({
			title: t('common.save'), //'저장',
			message: t('common.save_confirm'), //'저장하시겠습니까?',
			type: 'confirm',
			onConfirm: () => registerStation.mutate(formData)
		})
	}

	const checkValidation = (dataItem: Record<string, any>) => {
		let result = true;
		console.log('dataItem', dataItem)
		if(dataItem.powerCapTypeCode === 'INPUT') {
			if(!dataItem.powerCapacityWh) {
				//사용가능 전력량을(를) 입력해 주세요
				showAlert({message: t('common.input_required', {string: t('station.available_power')})})
				return false;
			}
			else if(Number(dataItem.powerCapacityWh) < 1000 || Number(dataItem.powerCapacityWh) > 29999) {
				//'사용가능 전력량은 1,000~29,999Wh 범위내에서만 입력이 가능합니다.\n다시 입력해주세요'
				showAlert({message: t('station.available_power_alert')})
				return false;
			}
		}
		if(!nameDupliCheck) {
			//중복확인 버튼을 클릭하여 중복을 확인해 주세요
			showAlert({message: t('station.check_duplicates_button')});
			return false;
		}
		else if(dataItem.deviceSerialNumber === undefined || dataItem.deviceSerialNumber === null) {
			//대표 함체를 선택해주세요.
			showAlert({message: t('station.check_case_sn')});
			return false;
		}
		return result;
	}

	const getStationConfigInit = async () => {
		const result: any = await StationApiService().getStationConfigInit();
		console.log('getStationConfigInit', result.data)

		const init = {
			isVisibleAtApp: true,
			config: {
				disChargeCriteriaList: result.data?.dischargeCriteriaList,
				congestionCriteriaList: result.data?.congestionCriteriaList,
				rebootCriteria: result.data?.rebootCriteria,
			},
			latitude: '',
			longitude: '',
			powerCapTypeCode: 'INPUT',
			name: '',
		}
		setInitData(init);
	}

	useEffect(() => {
		getStationConfigInit();
	}, [])

	useEffect(() => {
		if(slotCount) {}
	}, [slotCount])

	// /**
	//  * 커스텀 검증 함수, 주소의 값3개중 하나가 에러일시 알림을 표현하기위해 작성
	//  * @param values 
	//  * @returns 
	//  */
	// const validateFields = (values: any) => {
	// 	console.log('validateFields values', values)
	// 	const errors: any = {};

	// 	// 필드 값이 없을 경우 에러 메시지를 추가
	// 	if (!values.cityCode) {
	// 		errors.cityCode = ' ';
	// 	}
	// 	if (!values.districtCode) {
	// 		errors.districtCode = ' ';
	// 	}
	// 	if (!values.address) {
	// 		errors.address = ' ';
	// 	}

	// 	// 하나라도 값이 없을 경우 address 필드에 종합적인 에러 메시지를 추가
	// 	if (!values.cityCode || !values.districtCode || !values.address) {
	// 		errors.generalError = 'All fields are required';
	// 	}

	// 	return errors;
	// };

	const validatorFunction = (v: any) => stringLengthMinMaxValidator(v, { max: 30 });

  return (
    <>
			{/* 스테이션 정보 등록 */}
      <Header headName={t('station.station_info_registration')} />
			{
				initData &&
				<Form
					onSubmit={handleSubmit}
					initialValues={initData}
					ignoreModified={true}
					render={(formProps: FormRenderProps) => (
						<FormElement>
							{/* 기본 정보 */}
							<BasicInfo 
								formProps={formProps}
								slotCount={slotCount}
								setNameDupliCheck={setNameDupliCheck}
								validatorFunction={validatorFunction}
								files={files}
								setFiles={setFiles}
							/>
	
							{/* 설정 정보 */}
							<ConfigInfo 
								formProps={formProps}
								initData={initData}
							/>
	
							{/* 기기 정보 */}
							<StationInfo 
								formProps={formProps}
								setSlotCount={setSlotCount}
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

			}
    </>
  );
}
