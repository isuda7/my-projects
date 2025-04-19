import Breadcrumbs from "@/new_components/common/Breadcrumbs.tsx";
import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import CodeDropDownList from "@/new_components/common/CodeDropDownList.tsx";
import { defaultInput } from "@/components/kendo/form/FormInnerComponent.tsx";
import { Checkbox, TextArea } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

type FormProps = {
	field: []
}
// <Field
//     name="Email"
//     component={defaultInput}
//     placeholder="이메일을 입력하세요."
// />
const FormComponent = (props: FormProps) => {

	return (
		<Form
			render={() => (
				<FormElement>
					<div className="in-head-group">
						<h3>User Info</h3>
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
								<th scope="row">Role</th>
								<td>
									<CodeDropDownList codeGroup={"test"}  name={"role"}/>
								</td>
								<th scope="row">
									Email <span className="required">*</span>
								</th>
								<td>
									<FieldWrapper>
										<Field
											name="Email"
											component={defaultInput}
											placeholder="이메일을 입력하세요."
										/>
									</FieldWrapper>
								</td>
							</tr>
							<tr>
								<th scope="row">
									First Name <span className="required">*</span>
								</th>
								<td>
									<FieldWrapper>
										<Field
											name="FirstName"
											component={defaultInput}
											placeholder="이름을 입력하세요."
										/>
									</FieldWrapper>
								</td>
								<th scope="row">
									Last Name <span className="required">*</span>
								</th>
								<td>
									<FieldWrapper>
										<Field
											name="LastName"
											component={defaultInput}
											placeholder="성을 입력하세요."
										/>
									</FieldWrapper>
								</td>
							</tr>
							<tr>
								<th scope="row">User Description</th>
								<td colSpan={3}>
									<p className="textarea-info">{0} / 1000</p>
									<TextArea
										rows={3}
										maxLength={1000}
										// onChange={CountTextNumber}
										// value={textArea}
										placeholder="설명을 입력하세요."
									/>
								</td>
							</tr>
						</tbody>
					</table>

					<div className="in-head-group k-mt-7.5">
						<h3>Basic Info</h3>
					</div>
					<table className="tbl-base">
						<colgroup>
							<col style={{ width: "15%" }} />
							<col style={{ width: "35%" }} />
							<col style={{ width: "15%" }} />
							<col style={{ width: "35%" }} />
						</colgroup>
						<tbody>

						</tbody>
					</table>

					<div className="in-head-group k-mt-7">
						<h3>View Only</h3>
					</div>
					<div className="chexkbox-group line-group">
						<Checkbox label="View Only" defaultChecked={false} />
					</div>


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
	)
}

export default FormComponent;
