/**
 * 스테이션 정보 관리 상세 Component
 * URL: /station/info/management/detail
 */

/* React */
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, useParams  } from "react-router-dom";

/* Kendo UI */
import { Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { UploadFileInfo, UploadFileStatus } from "@progress/kendo-react-upload";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import RegisterInfo from "@/new_components/common/RegisterInfo";
import BasicDetailInfo from "./components/BasicDetailInfo";
import ConfigInfo from "./components/ConfigInfo";
import TemperatureRangeInfo from "./components/TemperatureRangeInfo";
import StationInfo from "./components/StationInfo";
import FirmwareInfo from "./components/FirmwareInfo";
import ChargeProfileInfo from "./components/ChargeProfileInfo";
import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import _ from "lodash";
import PermissionButton from "@/new_components/common/PermissionButton";

/* Validator */
import { stringLengthMinMaxValidator } from "@/utils/Validators.ts";

/* Type */
import { ExUploadFileInfo } from "@/utils/apiService/type/common/File.type";

export default function StationInfoManagementDetail() {
	const showAlert = useAlert()
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation()
  //const { id } = location.state;
	const { id } = useParams();

	console.log('StationInfoManagementDetail id', id)
	
	const [initData, setInitData] = useState<any>()
	
	//슬롯개수
	const [slotCount, setSlotCount] = useState<number>()
	//스테이션명 중복확인여부
	const [nameDupliCheck, setNameDupliCheck] = useState<boolean>(true)
	//파일 정보
	const [files, setFiles] = useState<Array<UploadFileInfo>>([]);

	const modifyStation = useMutation({
		mutationFn: async (data: any) => {
			const {id, formData } = data;

			if(formData && id) {
				return await StationApiService().modifyStationInfo(formData, id)
			}
		},
		onSuccess: (response: any) => {
			//수정되었습니다.
			showAlert({message: t('common.modify_success')})
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
			title: t('common.modify'), //'수정',
			message: t('common.modify_confirm'), //'수정하시겠습니까?',
			type: 'confirm',
			onConfirm: () => processModifyData(dataItem)
		})
	}

	/**
	 * 저장 직전 dataItem을 Modify에 맞게 가공
	 * @param dataItem 
	 */
	const processModifyData = (dataItem: Record<string, any>) => {
		const modifyData = _.cloneDeep(dataItem);
		delete modifyData.config.temperatureRange;
		delete modifyData.device;
		console.log('modifyData', modifyData)

		const formData = new FormData();
		formData.append('dto', JSON.stringify(modifyData));
		
		for(let i=0; i<files.length; i++) {
			const rawFile = files[i].getRawFile?.();
			console.log('rawFile', rawFile)
			if(rawFile) formData.append('photos', rawFile)
		}
		formData.forEach((value, key) => {
			if (value instanceof File) {
				console.log(`Key: ${key}, File Name: ${value.name}, File Type: ${value.type}, File Size: ${value.size}`);
			} else {
				console.log(`Key: ${key}, Value: ${value}`);
			}
		});

		const data = {id : dataItem.id, formData}
		modifyStation.mutate(data)
	}

	const checkValidation = (dataItem: Record<string, any>) => {
		let result = true;
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
		else if(slotCount === undefined || slotCount === null) {
			//대표 함체를 선택해주세요.
			showAlert({message: t('station.check_case_sn')});
			return false;
		}
		return result;
	}

	const setProcessFiles = (list: any[]) => {
		const fileInfos: ExUploadFileInfo[] = [];
		if(list) {
			for(let i=0; i<list.length; i++) {
				const fileInfo: ExUploadFileInfo = {
					uid: list[i].photoId,
					name: list[i].fileName,
					size: list[i].photo.length,
					extension: '.' + list[i].extension,
					status: UploadFileStatus.Uploaded,
					progress: 100,
					base64Data: list[i].photo,
					getRawFile: undefined,
					
				}
				fileInfos.push(fileInfo)
			}
		}
		setFiles(fileInfos)
	}

	const getStationInfo = async () => {
		const result: any = await StationApiService().getStationInfo(id);

		console.log('getStationInfo data', result.data)
		const init = {
			...result.data,
			powerCapacityWh: result.data.powerCapTypeCode === 'INPUT'? Number(result.data.powerCapacityWh) : '',
			deviceSerialNumber: result.data.device.primaryDeviceSerial
		}
		setProcessFiles(result.data.installPhotos)
		setSlotCount(result?.data?.slotCount)
		setInitData(init);
	}

	useEffect(() => {
		getStationInfo();
	}, [])

	const delMutation = useMutation({
    mutationFn: async () => {
			if(id) {
				const res = await StationApiService().deleteStationInfo(id);
				console.log('delMutation res', res)
			}
    },
    onSuccess: (response) => {
			console.log('delMutation response', response)
			//삭제되었습니다.
      showAlert({message: t('common.delete_success')})
			navigate(-1);
    },
    onError: (responseError) => {
      console.error('responseError', responseError);
    },
  });

	/**
	 * 스테이션 삭제
	 */
	const onDeleteStation = async() => {
		// title: '삭제',
		// message: '해당 스테이션를 삭제하시겠습니까?',
		showAlert({
			title: t('common.delete'),
			message: t('station.delete_station_confirm'),
			type: 'confirm',
			onConfirm: () => delMutation.mutate()
		})
	}

	/**
	 * Validator Function 목록
	 * Form내에서 arrow function으로 validator를 지정해주는경우 formRender 변경에따른 무한 리렌더링이있어
	 * value값 외에 인자를 추가로 받아야 하는 validator의 경우 Form 외부에 Function을 지정해준다
	 */
	const validatorFunction = (v: any) => stringLengthMinMaxValidator(v, { max: 30 });

  return (
    <>
			{/* 스테이션 정보 상세 */}
      <Header headName={t('station.station_info_details')} />
			{
				initData &&
				<Form
					onSubmit={handleSubmit}
					ignoreModified={true}
					initialValues={initData}
					render={(formProps: FormRenderProps) => (
						<FormElement>
							{/* 기본 정보 */}
							<BasicDetailInfo 
								formProps={formProps}
								slotCount={slotCount}
								setNameDupliCheck={setNameDupliCheck}
								initData={initData}
								validatorFunction = {validatorFunction}
								files={files}
								setFiles={setFiles}
							/>
	
							{/* 설정 정보 */}
							<ConfigInfo 
								formProps={formProps}
								initData={initData}
							/>
							
							{
								//운영중일때만 온도정보 나옴
								initData.statusCode === 'OPER' &&
								<TemperatureRangeInfo
									formProps={formProps}
								/>
							}
	
							{/* 기기 정보 */}
							<StationInfo 
								formProps={formProps}
								initData={initData}
								setSlotCount={setSlotCount}
							/>

							{
								//운영중일때만 펌웨어정보 나옴
								initData.statusCode === 'OPER' &&
								<FirmwareInfo
									formProps={formProps}
								/>
							}

							{
								//운영중일때만 충전프로파일 정보 나옴
								initData.statusCode === 'OPER' &&
								<ChargeProfileInfo
									formProps={formProps}
								/>
							}

							{/* 등록 정보 */}
							<RegisterInfo 
								formProps={formProps}
							/>
	
							<div className="btn-group">
								<div className="group-align-right">
									{
										//등록중 일때만 삭제버튼 나옴
										initData.statusCode === 'REGI' &&
										<PermissionButton
											type="button"
											title={t('common.delete')}
											themeColor={'base'}
											pageId={true}
											onClick={() => onDeleteStation()}
										/>
									}
									<Button
										type="button"
										size={"large"} 
										fillMode="outline"
										onClick={() => navigate(-1)}
									>
										{t('common.cancel') /* 취소 */}
									</Button>
									<PermissionButton 
										pageId={true}
									/>
									{/* <Button
										type="submit" 
										size={"large"} 
										themeColor={"primary"}>
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
