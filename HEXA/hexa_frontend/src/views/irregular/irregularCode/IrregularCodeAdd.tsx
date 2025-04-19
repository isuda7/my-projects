import * as React from "react";
import { useEffect, useState } from "react";
import { Field, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import { useMutation } from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import { useNavigate } from "react-router-dom";
import { numberValidator, requiredValidator, stringLengthValidator } from "@/utils/Validators.ts";
import ButtonGroup from "@/new_components/common/ButtonGroup.tsx";
import RadioGroup from "@/components/kendo/form/RadioGroup.tsx";
import FormField from "@/new_components/common/FormField.tsx";
import { IrregularCodeSaveDto } from "@/utils/apiService/type/irregular/IrregularCodeDto";
import IrregularCodeApiService from "@/utils/apiService/irregular/IrregularCodeApiService";
import FormCodeDropDownList from "@/new_components/common/FormCodeDropDownList";
import FormTextArea2 from "@/new_components/common/FromTextArea2";
import { useTranslation } from "react-i18next";
import CodeApiService from "@/utils/apiService/CodeApiService";
import { CodeValueDto } from "@/utils/apiService/type/system/code/CodeResponseDto";
import CustomSelect from "@/new_components/form/CustomSelect";

export default function IrregularCodeAdd() {
	console.log('IrregularCodeAdd')
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	const [irregularCodeInfo, setIrregularCodeInfo] = useState<IrregularCodeSaveDto>({
		code: "",
		description: "",
		asType: "",
		name: "",
		irrObject: "",
		isAlert: undefined
	});
	const [isDuplicate, setDuplicate] = useState<boolean | null>(null);
	const [isAlert, setIsAlert] = useState<boolean | undefined>(undefined);
	const [asType, setAsType] = useState("");
	const [code, setCode] = useState("");
	const [codeList, setCodeList] = useState<CodeValueDto[]>([]);

	useEffect(() => {
		setDuplicate(true);
		getCodeList();
	}, []);

	const getCodeList = async () => {
		const response = await CodeApiService().getCodesByGroupCode({
			groupCode: "EMIROJ"
		});
		setCodeList(response.data);
	}


	const handleAlertYnChange = (event: any) => {
		setIsAlert(event.value);
	};

	const handleIrregularCodeChange = (event: any) => {
		setCode(event.target.value);
		setDuplicate(true)
	};

	const handleAsTypeChange = (event: any) => {
		console.log(event.value);
		setAsType(event.value);
		console.log('asType', asType);
	}

	const cancelBtn = (event: any) => {
		navigate('/irregular/code');
	}

	const checkDuplication = async () => {
		const isDuplicated = await IrregularCodeApiService().checkIrregularCodeDuplication(code);
		console.log(isDuplicated);
		if (isDuplicated) {
			showAlert({ message: t("irregular.irregular_code_is_duplicated_alert") })
			setDuplicate(true)
		} else {
			showAlert({ message: t("irregular.is_usable_irregular_code_alert") })
			setDuplicate(false)
		}
	};

	const checkValidation = (dataItem: Record<string, any>) => {
		let result = true;
		console.log(dataItem);
		if (dataItem.irrObject === undefined || dataItem.irrObject.trim().length < 1) {
			showAlert({ message: t("irregular.select_target_alert") });
			result = false;
		} else if (asType === undefined || asType.trim().length < 1) {
			showAlert({ message: t("irregular.select_levet_alert") });
			result = false;
		}
		else if (isDuplicate) {
			showAlert({ message: t("station.check_duplicates_button") });
			result = false;
		}
		else if (dataItem.name === undefined || dataItem.name.trim().length < 1) {
			showAlert({ message: t("irregular.enter_code_name_alert") });
			result = false;
		}
		else if (dataItem.isAlert == undefined) {
			showAlert({ message: t("irregular.select_isAlert_alert"/*알림 여부를 선택해 주세요. */) });
			result = false;
		}
		return result;
	}

	const handleSubmit = (dataItem: IrregularCodeSaveDto) => {
		console.log('dataItem', dataItem)
		dataItem.asType = asType;
		dataItem.isAlert = isAlert;
		if (!checkValidation(dataItem)) return;
		setIrregularCodeInfo(dataItem);
		console.log('dataItem2', dataItem)
		registIrregularCode.mutate();
	}

	const registIrregularCode = useMutation({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		mutationFn: async () =>
			IrregularCodeApiService().createIrregularCode(irregularCodeInfo),
		onSuccess: (response: any) => {
			showAlert({
				message: t("common.register_success"),
				onConfirm: () => {
					navigate('/irregular/code');
				}
			})
		},
		onError: (error) => {
			console.log(error);
			showAlert({ message: error.message })
		},
	});

	return (
		<>
			<Header headName={t("irregular.irregular_code_registration")} descrption={""} />

			<Form
				onSubmit={(values) => handleSubmit(values as IrregularCodeSaveDto)}
				render={(formRenderProps: FormRenderProps) => (
					<FormElement>
						<section className="section">
							<table className="tbl-base">
								<colgroup>
									<col style={{ width: "20%" }} />
									<col style={{ width: "30%" }} />
									<col style={{ width: "20%" }} />
									<col style={{ width: "30%" }} />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">
											{t("station.target")/*대상*/}
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td>
											{/* <FormField
												name={"irrObject"}
												// textField="선택"
												component={FormCodeDropDownList}
												codeGroup={"EMIROJ"}
												validator={requiredValidator}
												className="w200"
												defaultValue={"선택"}
											/> */}
											<FormField
												name={"irrObject"}
												data={codeList}
												component={CustomSelect}
												textField={"value"}
												dataItemKey={"code"}
												className="w200"
											/>
										</td>
										<th scope="row">
											{t("irregular.level")/*레벨*/}
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td>
											<RadioGroup
												className="flex-gap-0.5-2"
												name={"asType"}
												layout="horizontal"
												validation={true}
												data={[
													{ label: t("irregular.warning"), value: "WARN" },
													{ label: t("irregular.fault"), value: "BROK" },
												]}
												onChange={handleAsTypeChange}
											/>
										</td>
									</tr>
									<tr>
										<th scope="row">
											{t("irregular.irregular_code")/*고장코드*/}
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td>
											<div className="in-input">
												<div className="inner-item">
													<FormField
														name={"code"}
														validation={true}
														onChange={handleIrregularCodeChange}
													/>
													<Button
														size={"medium"}
														fillMode="outline"
														// className="w80"
														type="button"
														onClick={checkDuplication}
													> 
														{t("station.check_duplicates")/*중복 확인*/}
													</Button>
												</div>
											</div>
										</td>
										<th scope="row">
											{t("irregular.codeName") /*코드명*/} 
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td>
											<div className="in-input">
												<FormField
													name={"name"}
													validation={true}
												/>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">
											{t("common.description") /*설명*/}
										</th>
										<td colSpan={3}>
											<FormField
												name={"description"}
												component={FormTextArea2}
												rows={6}
												resizable="none"
											/>
										</td>
									</tr>
									<tr>
										<th scope="row">
											{t("irregular.isAlert")/*알림 여부*/}
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td colSpan={3}>
											<RadioGroup
												className="flex-gap-0.5-2"
												// name={"isAlert"}
												layout="horizontal"
												validation={true}
												data={[
													{ label: "Y", value: true },
													{ label: "N", value: false },
												]}
												onChange={handleAlertYnChange}
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</section>

						{/* 하단 버튼 그룹 */}
						<div className="btn-group k-mt-10">
							<div className="group-align-right">
								<Button
									type="button"
									size={"large"}
									fillMode="outline"
									onClick={cancelBtn}
								>
									{t("common.cancel")/*취소*/}
								</Button>
								<Button
									type="submit"
									disabled={!formRenderProps.allowSubmit}
									size={"large"}
									themeColor={"primary"}>
									{t("common.save")/*저장*/}
								</Button>
								{/* <ButtonGroup formRenderProps={formRenderProps} submitButton={true} /> */}
							</div>
						</div>
					</FormElement>
				)}
			/>


		</>
	);
}
