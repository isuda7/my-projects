import { useState } from "react";
import { Field, FieldWrapper, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import CodeDropDownList from "@/new_components/common/CodeDropDownList.tsx";
import FormCodeDropDownList from "@/new_components/common/FormCodeDropDownList";
import { requiredValidator } from "@/utils/Validators.ts";
import FormInput from "@/new_components/common/FormInput.tsx";
import FormTextArea from "@/new_components/common/FromTextArea.tsx";
import { useMutation } from "@tanstack/react-query";
import { ResponseDataType } from "@/utils/apiService/type/common/responseData.type.ts";
import { LoginResponse } from "@/utils/apiService/type/auth/login.type.ts";
import SampleApiService from "@/utils/apiService/SampleApiService";
import { Notice } from "@/utils/apiService/type/auth/Notice.type.ts";
import useAlert from "@/hooks/useAlert.tsx";
import { useNavigate } from "react-router-dom";

export default function SampleNoticeAdd() {
	const showAlert = useAlert();
	const navigate = useNavigate();
	const [noticeData, setNoticeData] = useState<Notice>();

	const registNotice = useMutation({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		mutationFn: async () =>
			SampleApiService().registNotice(noticeData),
		onSuccess: (response: any) => {
			navigate('/sample/grid');
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});

	const handleSubmit = (dataItem: Record<string, unknown>) => {
		console.log('dataItem', dataItem)
		setNoticeData(dataItem as Notice);
		registNotice.mutate();
	}
	// useCallback(()=>{
	//     console.log('role',role);
	// },[role])

	return (
		<div className="contents">
			<div className="content">
				<Header headName={"Add Notice"} descrption={"Notice 추가 샘플"} />
				<div className="k-mt-7.5">
					<Form
						onSubmit={handleSubmit}
						ignoreModified={true}
						render={(formRenderProps: FormRenderProps) => (
							<FormElement>
								<div className="in-head-group">
									<h3>Notice Info</h3>
								</div>
								<table className="tbl-base">
									<colgroup>
										<col style={{ width: "15%" }} />
										<col style={{ width: "35%" }} />
										<col style={{ width: "15%" }} />
										<col style={{ width: "35%" }} />
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">
												Title <span className="required">*</span>
											</th>
											<td>
												<FormInput
													name={"title"}
													validation={true}
													placeholder={"타이틀 입력"}
												/>
											</td>
											<th scope="row">
												Type <span className="required">*</span>
											</th>
											<td>
												<Field 
													name={"typeCd"} 
													component={FormCodeDropDownList} 
													codeGroup={"noticeType"} 
													validator={requiredValidator}
												/>
											</td>
										</tr>
										<tr>
											<th scope="row">Description</th>
											<td colSpan={3}>
												<FieldWrapper>
													<Field name={"description"} component={FormTextArea} rows={6}
														maxLength={2000} />
												</FieldWrapper>
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
										>
											Cancel
										</Button>
										<Button size="large" themeColor="primary">
											Save
										</Button>
									</div>
								</div>
							</FormElement>
						)}
					/>
				</div>
			</div>

			<footer className="footer">
				<div>
					<img src="/src/assets/image/logo-EN.svg" alt="LG Energy Solution" />
					<span>Copyright ⓒ 2023 LG Energy Solution. All right reserved.</span>
				</div>
			</footer>

		</div>
	);
}
