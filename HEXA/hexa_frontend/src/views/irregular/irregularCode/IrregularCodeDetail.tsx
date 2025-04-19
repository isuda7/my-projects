import * as React from "react";
import {useEffect, useState} from "react";
import {Field, Form, FormElement, FormRenderProps,} from "@progress/kendo-react-form";
import {Button} from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import {useMutation} from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {numberValidator, requiredValidator, stringLengthValidator} from "@/utils/Validators.ts";
import ButtonGroup from "@/new_components/common/ButtonGroup.tsx";
import RadioGroup from "@/components/kendo/form/RadioGroup.tsx";
import FormField from "@/new_components/common/FormField.tsx";
import { IrregularCodeResponseDto, IrregularCodeSaveDto } from "@/utils/apiService/type/irregular/IrregularCodeDto";
import IrregularCodeApiService from "@/utils/apiService/irregular/IrregularCodeApiService";
import FormCodeDropDownList from "@/new_components/common/FormCodeDropDownList";
import RegisterInfo from "@/new_components/common/RegisterInfo";
import FormTextArea2 from "@/new_components/common/FromTextArea2";
import { useTranslation } from "react-i18next";

export default function IrregularCodeDetail() {
	const { state } = useLocation();
	const { t } = useTranslation();
	console.log('state', state);
  console.log('IrregularCodeDetail')
  const showAlert = useAlert();
  const navigate = useNavigate();
  const [irregularCodeInfo, setIrregularCodeInfo] = useState<IrregularCodeSaveDto>({
    code: "",
    description: "",
    asType: "",
    name: "",
    irrObject: "",
    isAlert: true});

	const [data, setData] = useState<IrregularCodeResponseDto>({
		id: "",
		code: "",
		description: "",
		asType: "",
		level: "",
		irrLevel: "",
		name: "",
		irrObject: "",
		object: "",
		irrTarget: "",
		isAlert: true,
		createdAt: new Date(),
		createdUserId: "",
		updatedAt: new Date(),
		updatedUserId: ""
  });
	const [isLoading, setIsLoading] = useState(true);
	// const [isDuplicate, setDuplicate] = useState<boolean | null>(null);
	const [isAlert, setIsAlert] = useState<boolean | undefined>(undefined);
	const [asType, setAsType] = useState("");
	const [code, setCode] = useState("");

	useEffect(() => {
		setIsLoading(true);
		getIrregularCodeById(state);
	}, []);

	const getIrregularCodeById = async (irregularCodeId: string) => {
		console.log(irregularCodeId);
		const response: IrregularCodeResponseDto = await IrregularCodeApiService().getIrregularCodeById(irregularCodeId);
		if(response.description === null){
			response.description = '';
		}
		console.log("irregularCodeInfo", response);
		setData(response);
		setIsLoading(false);
		setIsAlert(response.isAlert);
		setAsType(response.asType);
		setCode(response.code);
	};

	const handleAlertYnChange = (event: any) => {
		setIsAlert(event.value);
	};

	const handleAsTypeChange = (event: any) => {
		console.log(event.value);
		setAsType(event.value);
		console.log('asType',asType);
	}

	const cancelBtn = (event: any) => {
		navigate('/irregular/code');
	}

	const checkValidation = (dataItem: Record<string, any>) => {
		let result = true;
		console.log(dataItem);
		if(dataItem.irrObject === undefined || dataItem.irrObject.trim().length < 1) {
			showAlert({message: t("irregular.select_target_alert") });
			result = false;
		} else if(asType === undefined || asType.trim().length < 1) {
			showAlert({message: t("irregular.select_levet_alert") });
			result = false;
		} else if(dataItem.name === undefined || dataItem.name.trim().length < 1) {
			showAlert({message: t("irregular.enter_code_name_alert") });
			result = false;
		}
		return result;
	};

    const handleDelete = async () => {
		console.log('handleDelete');
		showAlert({
			title: t("common.delete"),
			message: t("irregular.irregular_code_delete_confirm"),
			type: 'confirm',
			onConfirm: () => delMutation.mutate()
		})
	}
    const delMutation = useMutation({
		mutationFn: async () => {
			IrregularCodeApiService().deleteIrregularCode(state)
		},
		onSuccess: (response) => {
			navigate('/irregular/code');
		},
		onError: (responseError) => {
			console.error(responseError);
		},
	});

  const handleSubmit = (dataItem: IrregularCodeSaveDto) => {
	  console.log('dataItem', dataItem)
		dataItem.asType = asType;
		dataItem.isAlert = isAlert;
	  if(!checkValidation(dataItem)) return;
	  setIrregularCodeInfo(dataItem);
		console.log('dataItem2', dataItem);
	  updateIrregularCode.mutate();
  };

	const updateIrregularCode = useMutation({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		mutationFn: async () =>
		IrregularCodeApiService().updateIrregularCode(state, irregularCodeInfo),
		onSuccess: (response: any) => {
			showAlert({
				message: t("common.modify_success"),
				onConfirm: () => {
					navigate('/irregular/code');
				}
			})
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});

  return (
	<>
	  <Header headName={t("irregular.irregular_code_detail")/*고장코드 상세*/} descrption={""}/>
      {!isLoading &&
	  <Form
        initialValues={data}
		onSubmit={(values) => handleSubmit(values as IrregularCodeSaveDto)}
		render={(formRenderProps: FormRenderProps) => (
		  <FormElement>
			<section className="section">
			  <table className="tbl-base">
				<colgroup>
				  <col style={{width: "20%"}}/>
				  <col style={{width: "30%"}}/>
					<col style={{width: "20%"}}/>
				  <col style={{width: "30%"}}/>
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
						  <FormField
							  name={"irrObject"}
							  component={FormCodeDropDownList}
								codeGroup={"EMIROJ"}
								validator={requiredValidator}
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
								value={asType}
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
								className="disabled"
								disabled={true}
						  />
						  <Button
							  size={"medium"}
							  fillMode="outline"
							  // className="w80 disabled"
							  type="button"
							  disabled={true}
						  >
							  {t("station.check_duplicates")/*중복 확인*/}
						  </Button>
							</div>
						</div>
					  </td>
						<th scope="row">
						  {t("irregular.codeName")/*코드명*/}
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
						  {t("common.description")/*설명*/}
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
							  name={"isAlert"}
							  layout="horizontal"
								value={isAlert}
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
			<RegisterInfo
				formProps={formRenderProps}
			/>
			{/* 하단 버튼 그룹 */}
			<div className="btn-group k-mt-10">
			  <div className="group-align-right">
						<Button
							type="button"
							size={"large"}
							onClick={handleDelete}
						>
							{t("common.delete")/*삭제*/}
						</Button>
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
			  </div>
			</div>
		  </FormElement>
		)}
	  />
    }
	</>
  );
}
