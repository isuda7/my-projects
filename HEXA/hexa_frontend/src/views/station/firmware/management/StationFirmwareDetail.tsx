/**
 * 펌웨어 상세 Component
 * URL: /station/firmware/management/detail
 */

/* React */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Field, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* API */
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import FormField from "@/new_components/common/FormField";
import CustomSelect from "@/new_components/form/CustomSelect";
import CustomUpload from "@/new_components/form/CustomUpload";
import useAlert from "@/hooks/useAlert.tsx";
import FormTextArea from "@/new_components/common/FromTextArea.tsx";
import RegisterInfo from "@/views/station/components/RegisterInfo"

/* Types */
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";

export default function StationFirmwareDetail() {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const location = useLocation();
  const { tsid } = location.state;

	//세대구분 list
	const [genCodes, setGenCodes] = useState<any[]>([]);
	//펌웨어 list
	const [firmwareCodes, setFirmwareCodes] = useState<any[]>([]);

	const [initData, setInitData] = useState<any>();

	const onModify = async (dataItem: Record<string, unknown>) => {
		const formData = new FormData();

		//파일 세팅, 새로운 파일이아닌 조회한 값 그대로면 담아주지않음(판단기준 uid === '-')
		if((dataItem.file as any)[0].uid !== '-' ) {
			formData.append('fwFile', (dataItem.file as File[])[0]);
		}

		//나머지값 세팅
		formData.append('generationCode', dataItem.fwGenerationCode as string);
		formData.append('fwTypeCode', dataItem.fwTypeCode as string);

		const isUse = dataItem.isUse as boolean;
		formData.append('isUse', isUse.toString());
		formData.append('description', dataItem.description as string);
		
		//TODO: 추후 삭제
		for (let pair of formData.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`);
		}

		try {
			const res = await StationApiService().modifyFirmware(formData, tsid);
			showAlert({message: t('common.modify_success')}) //수정되었습니다.
			navigate(-1)
    } 
    catch (error) {
      if (error instanceof Error) showAlert({message: error.message});
    }
	}

	const handleSubmit = async (dataItem: Record<string, unknown>) => {
		console.log('dataItem', dataItem)
		if(!checkValidation(dataItem)) return;

		// title: '수정',
		// message: '수정하시겠습니까?',
		showAlert({
			title: t('common.modify'),
			message: t('common.modify_confirm'),
			onConfirm: () => onModify(dataItem)
		})

	}

	const checkValidation = (dataItem: Record<string, unknown>) => {
		let result = true;
		// if(!file) {
		// 	showAlert({message: '펌웨어 파일을 첨부해 주세요'})
		// 	return false;
		// }

		return result;
	}

	const onDelete = async () => {
		try {
			const res = await StationApiService().deleteFirmware(tsid);
			showAlert({message: t('common.delete_success')}) //'삭제되었습니다.'
			navigate(-1)
    } 
    catch (error) {
      if (error instanceof Error) showAlert({message: error.message});
    }
	}

	const deleteFirmware = async() => {
		showAlert({
			title: t('common.delete'), //'삭제',
			message: t('common.delete_confirm'), //'삭제하시겠습니까?',
			onConfirm: () => onDelete(),
		})
	}

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const getFirmwareData = async () => {
		//세대구분(1세대, 2세대)
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMGEN'});
		if(Array.isArray(res.data)) setGenCodes(res.data)
		//펌웨어명(슬롯 펌웨어, 충전기 펌웨어 등 ...)
		const res2 = await CodeApiService().getCodesByGroupCode({groupCode:'SMFWT'});
		if(Array.isArray(res2.data)) setFirmwareCodes(res2.data)

		const data = await StationApiService().getStationFirmware(tsid!);
		const init = {
			...data,
			file: [
				{
					name: data.fwFileName,
					size: 1000,
					uid: `-`
				}
			]
		}
		setInitData(init)
	}

	/**
	 * Form을 쓰는경우 initialData가 최초에 갖고있는 data값을 가지고 보여주고있는데, 
	 * react-query는 cache에의해 data가 남아있으므로 새로 들어와도 (`stationFirmware`, tsid)가 동일한 이전값을 보여준다. 
	 * 해당 컴포넌트를 나갈때 이전 data초기화시켜준다 <-ASIS, data 불러오는 방식 변경되어 필요없음
	 */
	useEffect(() => {
		getFirmwareData();

		// return () => {
		// 	queryClient.removeQueries([`stationFirmware`, tsid] as any)
		// }
	}, [])

	const onChangeFile = (e: any, formProps: FormRenderProps) => {
		
		if(!e.isValid) {
			//'유효하지 않은 파일형식입니다.'
			showAlert({message: t('common.invalid_file_name')})
			return
		}
		
		const name = e.value.length > 0? e.value[0].name : null;
		const regEx = /(V|SW)([\d.]+)[-_].*$/;
		if(name) {
			const match = name.match(regEx);
			if(match && match[1]) formProps.onChange('fwVersion', {value: match[2]})
		}
	}

	return (
		<>
			{/* 펌웨어 상세 */}
			<Header headName={t('station.firmware_details')}/>
			{initData && 
				<Form
					ignoreModified
					onSubmit={handleSubmit}
					initialValues={initData}
					render={(formRenderProps: FormRenderProps) => (
						<FormElement>
							<section className="section">
								<div className="title-group">
									<h3 className="t-title">{t('station.firmware_info') /* 펌웨어 정보 */}</h3>
									<div className="title-group__txt">
										<span className="c-red">
										{t('station.firmware_file_info_message')}
                    {/* ※ 펌웨어 버전은 파일명을 기준으로 자동적으로 작성되오니
                    파일명을 잘 확인하고 업로드해주세요. */}
										</span>
									</div>
								</div>

								<table className="tbl-base">
									<colgroup>
										<col style={{ width: "10%" }} />
										<col style={{ width: "15%" }} />
										<col style={{ width: "10%" }} />
										<col style={{ width: "15%" }} />
										<col style={{ width: "10%" }} />
										<col style={{ width: "15%" }} />
										<col style={{ width: "10%" }} />
										<col style={{ width: "15%" }} />
									</colgroup>
									<tbody>
										<tr>
										{/* 세대구분 */}
										<th scope="col">{t('station.generation_type')}</th>
											<td>
												<FormField 
													name={"fwGenerationCode"} 
													component={CustomSelect}
													data={genCodes}
													noSelectDefault={true}
												/>
											</td>
											<th scope="col">
                      {/* 펌웨어명 */}
											{t('station.firmware_name')}
												<span className="required">
													<span className="sr-only">필수</span>
												</span>
											</th>
											<td>
												<FormField 
													name={"fwTypeCode"} 
													component={CustomSelect}
													data={firmwareCodes}
													validation={true}
												/>
											</td>
											<th scope="col">
												{/* 버전 */}
												{t('station.version')}
											</th>
											<td>
												<div className="in-input">
													<FormField 
														name={"fwVersion"}
														className={"disabled"}
													/>
												</div>
											</td>
											<th scope="col">
												{/* 사용여부 */}
												{t('station.is_use')}
											</th>
											<td>
												<FormField 
													name={"isUse"} 
													component={CustomSelect}
													data={[
														{code: true, value: 'Y'},
														{code: false, value: 'N'},
													]}
												/>
											</td>
										</tr>
										<tr>
											<th scope="col">
                      {/* 파일 */}
											{t('common.file')}
												<span className="required">
													<span className="sr-only">필수</span>
												</span>
											</th>
											<td colSpan={7}>
												<FormField
													name="file"
													component={CustomUpload}
													fileNameRegex={/(V|SW)([\d.]+)[-_].*$/}
													onChange={(e: any) => onChangeFile(e, formRenderProps)}
												/>
											</td>
										</tr>
										<tr>
											<th scope="col">
												{/* 설명 */}
												{t('common.description')}
											</th>
											<td colSpan={7}>
												<div className="in-input">
													<Field 
														name={"description"} 
														component={FormTextArea} 
														rows={6}
														maxLength={2000} 
														resizable="none"
													/>
												</div>
											</td>
										</tr>
									</tbody>
								</table>

							</section>

							{/* 등록 정보 */}
							<RegisterInfo formProps={formRenderProps}/>

							{/* 하단 버튼 그룹 */}
							<div className="btn-group">
								<div className="group-align-right">
									{
										!initData?.isDeployed && 
										<Button
											type="button"
											onClick={() => deleteFirmware()}
											size="large"
											fillMode="outline"
										>
											{/* 삭제 */}
											{t('common.delete')}
										</Button>
									}
									<Button
										type="button"
										onClick={() => navigate(-1)}
										size="large"
										fillMode="outline"
									>
										{/* 취소 */}
										{t('common.cancel')}
									</Button>
									<Button size="large" themeColor="primary">
										{/* 저장 */}
										{t('common.save')}
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
