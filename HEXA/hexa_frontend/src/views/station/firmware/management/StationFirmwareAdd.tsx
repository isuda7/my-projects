/**
 * 펌웨어 등록 Component
 * URL: /station/firmware/management/add
 */

/* React */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Field, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import FormField from "@/new_components/common/FormField";
import CustomSelect from "@/new_components/form/CustomSelect";
import CustomUpload from "@/new_components/form/CustomUpload";
import FormTextArea from "@/new_components/common/FromTextArea.tsx";
import StationApiService from "@/utils/apiService/StationApiService";
import CodeApiService from "@/utils/apiService/CodeApiService";
import useAlert from "@/hooks/useAlert.tsx";

/* Types */
import { StationFirmwareDto } from "@/utils/apiService/type/station/StationFirmwareDto";

export default function StationFirmwareAdd() {
	const { t } = useTranslation(); 
	const showAlert = useAlert();
	const navigate = useNavigate();

	//세대구분 list
	const [genCodes, setGenCodes] = useState<any[]>([]);
	//펌웨어 list
	const [firmwareCodes, setFirmwareCodes] = useState<any[]>([]);
	
	const initData = {
		fwGenerationCode: 'G2',
		isUse: true,
	}

	const onSave = async (dataItem: any) => {
		const formData = new FormData();

		//파일 세팅
		formData.append('fwFile', dataItem.file[0] as File);

		//나머지값 세팅
		//fwGenerationCode로 통일 시키는게 낫지않나?
		formData.append('generationCode', dataItem.fwGenerationCode as string);
		formData.append('fwTypeCode', dataItem.fwTypeCode as string);

		const isUse = dataItem.isUse as boolean;
		formData.append('isUse', isUse.toString());

		if(dataItem.description) formData.append('description', dataItem.description as string);
		
		for (let pair of formData.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`);
		}

		try {
			const res = await StationApiService().registerFirmware(formData);
			console.log('registerFirmware response', res)
			showAlert({message: t('common.register_success')}) //등록되었습니다
			navigate(-1)
    } 
    catch (error: any) {
			if(error.data && error.data.message) {
				showAlert({message: error.data.message});
			}
			else {
				showAlert({message: '알수없는 오류로 등록에 실패했습니다. 관리자에게 문의 부탁드립니다.'});
			}
    }
	}

	const handleSubmit = async (dataItem: Record<string, unknown>) => {
		console.log('dataItem', dataItem)
		if(!checkValidation(dataItem)) return;

		// title: '저장',
		// message: '저장하시겠습니까?',
		showAlert({
			title: t('common.save'),
			message: t('common.save_confirm'),
			type:'confirm',
			onConfirm: () => onSave(dataItem),
		})

	}

	const checkValidation = (dataItem: Record<string, unknown>) => {
		let result = true;
		if(!dataItem.file || (dataItem.file as File[]).length === 0) {
			//펌웨어 파일을 첨부해 주세요
			showAlert({message: t('station.firmware_file_require_alert')})
			return false;
		}

		return result;
	}

	/**
	 * Select Data 전체 호출 및 세팅
	 * @returns 
	 */
	const setInitData = async () => {
		//세대구분(1세대, 2세대)
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'SMGEN'});
		if(Array.isArray(res.data)) setGenCodes(res.data)
		//펌웨어명(슬롯 펌웨어, 충전기 펌웨어 등 ...)
		const res2 = await CodeApiService().getCodesByGroupCode({groupCode:'SMFWT'});
		if(Array.isArray(res2.data)) setFirmwareCodes(res2.data)
	}

	useEffect(() => {
		setInitData();
	}, [])

	const onChangeFile = (e: any, formProps: FormRenderProps) => {
		
		if(!e.isValid) {
			// 유효하지 않은 파일형식입니다.
			showAlert({message: t('common.invalid_file_name')})
			return
		}
		
		const name = e.value.length > 0? e.value[0].name : null;
		const regEx =  /(V|SW)([\d.]+)[-_].*$/;
		if(name) {
			const match = name.match(regEx);
			console.log('match', match)
			if(match && match[1]) formProps.onChange('fwVersion', {value: match[2]})
		}

	}

	return (
		<>
			{/* 펌웨어 등록 */}
			<Header headName={t('station.firmware_registration')} />
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
									<col style={{ width: "11%" }} />
									<col style={{ width: "14%" }} />
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


							{/* 하단 버튼 그룹 */}
							<div className="btn-group k-mt-10">
								<div className="group-align-right">
									<Button
										type="button"
										onClick={() => window.history.back()}
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

						</section>

					</FormElement>
				)}
			/>
		</>
	);
}
