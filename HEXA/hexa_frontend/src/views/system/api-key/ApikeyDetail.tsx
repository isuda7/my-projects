import * as React from "react";
import { useEffect, useState } from "react";
import { Field, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import FormField from "@/new_components/common/FormField.tsx";
import { UpdateApikeyDto } from "@/utils/apiService/type/system/apikey/ApikeyRequestDto";
import { ApikeyResponseDto } from "@/utils/apiService/type/system/apikey/ApikeyResponseDto";
import ApikeyApiService from "@/utils/apiService/ApikeyApiService";
import { useTranslation } from "react-i18next";
import RegisterInfo from "@/views/station/components/RegisterInfo";

export default function ApikeyDetail() {
	const { state } = useLocation();
	const tsid = state;
	console.log('state', state)
	console.log('ApikeyDetail')
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();

	const [data, setData] = useState<ApikeyResponseDto>({
		tsid: 0,
		systemId: "",
		systemName: "",
		apikey: "",
		password: "",
		createdAt: new Date(),
		createdUserId: "",
		updatedAt: new Date(),
		updatedUserId: ""
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		console.log(tsid);
		setApikey(state);
		setIsLoading(true);
	}, []);

	const setApikey = async (tsid: number) => {
		const response: ApikeyResponseDto = await ApikeyApiService().getApikeyById(tsid);
		console.log("response", response);
		setData(response);
		setIsLoading(false);
		console.log("isLoading", isLoading);
	}

	const handleSubmit = async (dataItem: Record<string, unknown>) => {
		console.log('dataItem', dataItem)
		// title: '수정',
		// message: '수정하시겠습니까?',
		showAlert({
			title: t('common.modify'),
			message: t('common.modify_confirm'),
			onConfirm: () => updateApikey(dataItem)
		})
	}

	const updateApikey = async (dataItem: Record<string, unknown>) => {
		const formData = new FormData();

		formData.append('systemName', dataItem.systemName as string);

		try {
			const res = await ApikeyApiService().updateApikey(state, formData);
			showAlert({ message: t('common.modify_success') }) //수정되었습니다.
			navigate(-1)
		}
		catch (error) {
			if (error instanceof Error) showAlert({ message: error.message });
		}
	};

	const onDelete = async () => {
		try {
			const res = await ApikeyApiService().deleteApikey(tsid);
			showAlert({ message: t('common.delete_success') }) //'삭제되었습니다.'
			navigate(-1)
		}
		catch (error) {
			if (error instanceof Error) showAlert({ message: error.message });
		}
	}

	const deleteData = (event: any) => {
		showAlert({
			title: t('common.delete'), //'삭제'
			message: t('api_key.delete_api_key_alert'), //'해당 API Key를 삭제하시겠습니까?'
			type: 'confirm',
			onConfirm: () => onDelete(),
		})
	}


	const cancelBtn = (event: any) => {
		navigate('/system/api-key');
	}

	return (
		<>
			{/* API Key 상세 */}
			<Header headName={t('api_key.api_key_details')} descrption={""} />
			{!isLoading &&
				<Form
					initialValues={data}
					ignoreModified={true}
					onSubmit={handleSubmit}
					render={(formRenderProps: FormRenderProps) => (
						<FormElement>
							<section className="section">
								<div className="title-group">
									<h3 className="t-title">
										{/* API Key 정보 */}
										{t('api_key.api_key_information')}
									</h3>
								</div>
								<table className="tbl-base" style={{ width: "500" }}>
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
													<FormField
														name={"systemId"}
														className={"disabled"}
													/>
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
													<FormField
														name={"systemName"}
													/>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">
												{/* API Key */}
												{t('api_key.api_key')}
											</th>
											<td>
												<div className="in-input w310">
													<FormField
														name={"apikey"}
														className={"disabled"}
													/>
												</div>
											</td>
										</tr>
										<tr>
											<th scope="row">
												{/* 비밀번호 */}
												{t('common.password')}
											</th>
											<td>
												<div className="in-input w310">
													<FormField
														name={"password"}
														className={"disabled"}
													/>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</section>

							{/* 등록 정보 */}
							<RegisterInfo formProps={formRenderProps} />

							{/* 하단 버튼 그룹 */}
							<div className="btn-group k-mt-10">
								<div className="group-align-right">
									<Button
										type="button"
										onClick={deleteData}
										size="large"
									>
										{/* 삭제 */}
										{t('common.delete')}
									</Button>
									<Button
										type="button"
										size={"large"}
										fillMode="outline"
										onClick={cancelBtn}
									>
										{/* 취소 */}
										{t('common.cancel')}
									</Button>
									<Button
										type="submit"
										disabled={!formRenderProps.allowSubmit}
										size={"large"}
										themeColor={"primary"}>
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
