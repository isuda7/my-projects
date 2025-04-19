/** React */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Field, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";


/* Common */
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert.tsx";


/* Types */
import ApikeyApiService from "@/utils/apiService/ApikeyApiService";
import { Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import FormField from "@/new_components/common/FormField";

export default function ApikeyAdd() {
	const { t } = useTranslation(); 
	const showAlert = useAlert();
	const navigate = useNavigate();

	const onSave = async (dataItem: any) => {
		const formData = new FormData();

		formData.append('systemId', dataItem.systemId as string);
		if(dataItem.systemName){
			formData.append('systemName', dataItem.systemName);
		}

		try {
			const res = await ApikeyApiService().createApikey(formData);
			console.log('createApikey response', res)
			showAlert({message: t('common.register_success')}) //등록되었습니다
			navigate(-1)
    } 
    catch (error) {
      if (error instanceof Error) showAlert({message: error.message});
    }
	}

	const handleSubmit = async (dataItem: Record<string, unknown>) => {
		console.log('dataItem', dataItem)
		
		if(!dataItem.systemId) {
			showAlert({message: t('api_key.enter_system_id_alert')}) // "시스템ID를 입력해주세요."
			return false;
		}

		// title: '저장',
		// message: '저장하시겠습니까?',
		showAlert({
			title: t('common.save'),
			message: t('common.save_confirm'),
			type:'confirm',
			onConfirm: () => onSave(dataItem),
		})

	}

	// const checkValidation = (dataItem: Record<string, unknown>) => {
	// 	let result = true;
	// 	if(!dataItem.systemId) {
	// 		showAlert({message: '시스템ID를 입력해주세요.'})
	// 		return false;
	// 	}

	// 	return result;
	// }

	return (
		<>
			{/* API key 등록 */}
			<Header headName={t(`api_key.api_key_registration`)} />
			<Form
				ignoreModified={true}
				onSubmit={handleSubmit}
				render={(formRenderProps: FormRenderProps) => (
					<FormElement>
						<section className="section">
							<table className="tbl-base">
								<colgroup>
									<col style={{ width: "20%" }} />
									<col style={{ width: "80%" }} />
								</colgroup>
								<tbody>
									<tr>
                    <th scope="row">
                      {/* 시스템ID */}
											{t('api_key.system_id')}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
											<div className="in-input w310">
												<FormField name="systemId"/>
											</div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {/* 시스템명 */}
											{t('api_key.system_name')}
                    </th>
                    <td>
											<div className="in-input w310">
                      	<FormField name="systemName"/>
											</div>
                    </td>
                  </tr>
								</tbody>
							</table>


							{/* 하단 버튼 그룹 */}
							<div className="btn-group k-mt-10">
								<div className="group-align-right">
									<Button
										onClick={() => window.history.back()}
										size="large"
										fillMode="outline"
										type="button"
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
