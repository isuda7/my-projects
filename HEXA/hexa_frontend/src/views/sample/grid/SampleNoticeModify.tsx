/** React */
import { useEffect, useState } from "react";

/** Kendo UI */
import { Field, FieldWrapper, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/** Custom */
import Header from "@/new_components/common/Header.tsx";
import FormInput from "@/new_components/common/FormInput.tsx";
import FormTextArea from "@/new_components/common/FromTextArea.tsx";
import FormCodeDropDownList from "@/new_components/common/FormCodeDropDownList";

/** Hook */
import useAlert from "@/hooks/useAlert.tsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

/** API */
import SampleApiService from "@/utils/apiService/SampleApiService";

/** Validator */
import { requiredValidator } from "@/utils/Validators.ts";

/** Type */
import { Notice } from "@/utils/apiService/type/auth/Notice.type.ts";

export default function SampleNoticeModify() {
	const showAlert = useAlert();
	const navigate = useNavigate();
	const { id } = useParams();

	const [ saveData, setSaveData ] = useState<any>()
	const { data: noticeData, isLoading } = useQuery<Notice>({
    queryKey: [`notice`, id],
    queryFn: () => SampleApiService().getNotice(id!),
    enabled: !!id,
  });

	const modifyNotice = useMutation({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		mutationFn: async () =>
			SampleApiService().modifyNotice(saveData),
		onSuccess: (response: any) => {
			showAlert({title: '완료', message: '저장되었습니다.'})
			navigate('/sample/grid');
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});

	const mutate = () => {
		modifyNotice.mutate();
	}

	const handleSubmit = (dataItem: Record<string, unknown>) => {
		console.log('dataItem', dataItem)
		setSaveData(dataItem)
		showAlert({
			title: '저장',
			message: '저장하시겠습니까?',
			type: 'confirm',
			onConfirm: mutate,
		})
	}

	if(isLoading) return <></>

	return (
		<div className="contents">
			<div className="content">
				<Header headName={"Modify Notice"} descrption={"Notice 수정 샘플"} />
				<div className="k-mt-7.5">
					<Form
						ignoreModified
						initialValues={noticeData} // 초기값
						onSubmit={handleSubmit}
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
													<Field 
														name={"description"} 
														component={FormTextArea} 
														rows={6}
														maxLength={2000} 
													/>
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
										<Button
											type="submit"
											size="large" 
											themeColor="primary"
										>
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
