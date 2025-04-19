import * as React from "react";
import {useEffect, useState} from "react";
import {Field, Form, FormElement, FormRenderProps,} from "@progress/kendo-react-form";
import {Button} from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import FormInput from "@/new_components/common/FormInput.tsx";
import {useMutation} from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import {useNavigate} from "react-router-dom";
import {numberValidator, requiredValidator, stringLengthValidator} from "@/utils/Validators.ts";
import ButtonGroup from "@/new_components/common/ButtonGroup.tsx";
import {UserCreateDto} from "@/utils/apiService/type/user/user.type.ts";
import UserApiService from "@/utils/apiService/UserApiService.ts";
import {RoleNameDto} from "@/utils/apiService/type/role/RoleDto.ts";
import RoleApiService from "@/utils/apiService/RoleApiService.ts";
import CustomSelect from "@/new_components/form/CustomSelect.tsx";
import RadioGroup from "@/components/kendo/form/RadioGroup.tsx";
import FormField from "@/new_components/common/FormField.tsx";
import { useTranslation } from "react-i18next";

export default function UserAdd() {
  console.log('UserAdd')
  const showAlert = useAlert();
  const navigate = useNavigate();
	const {t} = useTranslation();
  const [userInfo, setUserInfo] = useState<UserCreateDto>({
	  userId: "",
	  userName: "",
	  email: "",
	  cellPhone: "",
	  isActive: true,
		isMobileAccess: false,
		roleGroupId: "",
	  roleCodeName: ""});
	const [roleName, setRoleName] = useState<RoleNameDto[]>([]);
	const [userId, setUserId] = useState('');
	const [isUserIdDuplicate, setIsUserIdDuplicate] = useState<boolean | null>(null);
	const [isActive, setIsActive] = useState<boolean>(true);
	const [isMobileAccess, setIsMobileAccess] = useState<boolean>(false);

	useEffect(() => {
		RoleApiService().getUsingRoleNames()
			.then(response => {
				const roleNames = (response.data as any).content || response.data;
				// console.log("getRoleNames", roleNames);
				setRoleName(roleNames);
				// console.log(roleName);
			})
			.catch(error => console.error("권한 목록을 가져오는 중 에러:", error));
	}, [])

	useEffect(() => {
		setIsUserIdDuplicate(true);
		setIsActive(true);
		setIsMobileAccess(false);
	}, []);

	// const handleActiveYnChange = (event: any) => {
	// 	setIsActive(event.value);
	// };

	// const handleMobileAccessYnChange = (event: any) => {
	// 	setIsMobileAccess(event.value);
	// }

	const handleUserIdChange = (event: any) => {
		setUserId(event.target.value);
		setIsUserIdDuplicate(true)
	};

  const checkDuplication = async () => {
	  // console.log(userId);
	const isDuplicated = await UserApiService().checkIdDuplication(userId);
	console.log(isDuplicated);
	if(isDuplicated) {
		showAlert({message: t("user.is_duplicate_user_id_alert")/*이미 사용중인 사용자ID입니다.*/})
		setIsUserIdDuplicate(true)
	} else {
		showAlert({message: t("user.is_usable_user_id_alert")/*사용할 수 있는 사용자ID입니다.*/})
		setIsUserIdDuplicate(false)
	}
  };

	const checkValidation = (dataItem: Record<string, any>) => {
		let result = true;
		console.log(dataItem);
		if(dataItem.roleGroupId === undefined || dataItem.roleGroupId === null || dataItem.roleGroupId.trim().length < 1) {
			showAlert({message: t("user.choose_role_alert")/*권한을 선택해주세요*/});
			result = false;
		} else if(isUserIdDuplicate) {
			showAlert({message: t("user.check_duplicate_alert")/*중복확인 버튼을 클릭하여 중복을 확인해 주세요*/});
			result = false;
		} else if(dataItem.userId === undefined || dataItem.userId === null || dataItem.userId.trim().length < 1){
			showAlert({message: t("user.enter_user_id_alert")/*사용자ID를 입력해주세요.*/});
			result = false;
		} else if(dataItem.userName === undefined || dataItem.userName === null || dataItem.userName.trim().length < 1){
			showAlert({message: t("user.enter_user_name_alert")/*이름을 입력해주세요*/});
			result = false;
		} else if(dataItem.cellPhone === undefined || dataItem.cellPhone === null || dataItem.cellPhone.trim().length < 1){
			showAlert({message: t("user.enter_cellphone_alert")/*휴대폰번호를 입력해주세요*/});
			result = false;
		}	else if(dataItem.cellPhone.trim().length < 10 || dataItem.cellPhone.trim().length > 11) {
			showAlert({message: t("user.enter_correct_cellphone_alert")/*휴대폰 번호를 정확하게 입력해주세요.*/});
			result = false;
		}
		return result;
	}

  const handleSubmit = (dataItem: UserCreateDto) => {
	  let fullEmail;
	  console.log('dataItem', dataItem)
	  // eslint-disable-next-line eqeqeq
	  if(dataItem.emailId == undefined || dataItem.emailId.trim().length < 1) {
		  fullEmail = undefined;
	  } else {
		  fullEmail = `${dataItem.emailId  }@${  dataItem.domain}`;
	  }
	  dataItem.email = fullEmail;
	  // const selectedIsActive = isActive;
	  // dataItem.isActive = selectedIsActive;
		// dataItem.isMobileAccess = isMobileAccess;
	  console.log('dataItem', dataItem)
	  if(!checkValidation(dataItem)) return;
	  setUserInfo(dataItem);
	  registUser.mutate(dataItem);
  }

	const registUser = useMutation({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		mutationFn: async (createInfo: UserCreateDto) =>
			// console.log(userInfo),
			UserApiService().createUser(createInfo),
		onSuccess: (response: any) => {
			showAlert({
				message: t("common.register_success")/*등록되었습니다.*/,
				onConfirm: () => {
					navigate('/system/user');
				}
			})
			// navigate('/system/user');
		},
		onError: (error) => {
			console.log(error);
			showAlert({message: error.message})
		},
	});

	const cancelBtn = (event: any) => {
		navigate('/system/user');
	}

  return (
	<>
	  <Header headName={t("user.user_registration")/*사용자 등록*/} descrption={""}/>

	  <Form
		onSubmit={(values) => handleSubmit(values as UserCreateDto)}
		render={(formRenderProps: FormRenderProps) => (
		  <FormElement>
			<section className="section">
			  <div className="title-group">
				<h3 className="t-title">{t("user.user_information")/*사용자 정보*/}</h3>
			  </div>
			  <table className="tbl-base">
				<colgroup>
				  <col style={{width: "20%"}}/>
				  <col style={{width: "90%"}}/>
				</colgroup>
				  <tbody>
				  <tr>
					  <th scope="row">
						  {t("user.role")/*권한*/}
						  <span className="required">
					  <span className="sr-only">필수</span>
					</span>
					  </th>
					  <td>
						  <FormField
							  name={"roleGroupId"}
							  data={roleName}
							  component={CustomSelect}
							  textField={"roleCodeName"}
							  dataItemKey={"id"}
							  // value={selectedRole}
							  // onChange={handleRoleChange}
							  // visited={true}
							  className="w200"
						  />
					  </td>
				  </tr>
				  <tr>
					  <th scope="row">
						  {t("user.user_id")/*사용자ID*/}
						  <span className="required">
					  <span className="sr-only">필수</span>
					</span>
					  </th>
					  <td>
						<div className="in-input">
							<div className="inner-item mw400">
						  <FormField
							  // id={"userId"}
							  // type="text"
							  name={"userId"}
							  // value={userId}
							  validation={true}
							  onChange={handleUserIdChange}
							  className="w300"
						  />
						  <Button
							  size={"medium"}
							  fillMode="outline"
							  // className="w80"
							  type="button"
							  onClick={checkDuplication}
						  >
							  {t("user.check_duplicates")/*중복 확인*/}
						  </Button>
							</div>
						</div>
					  </td>
				  </tr>
				  <tr>
					  <th scope="row">
						  {t("common.name")/*이름*/}
						  <span className="required">
					  <span className="sr-only">필수</span>
					</span>
					  </th>
					  <td>
						<div className="in-input w310">
						  <FormField
							  name={"userName"}
							  validation={true}
						  />
						</div>
					  </td>
				  </tr>
				  <tr>
					  <th scope="row">
						  {t("user.email_adress")/*이메일 주소*/}
					  </th>
					  <td>
						<div className="in-input">
							<div className="inner-item mw400">
						  <FormField
							  name={"emailId"}
							  className="w310"
						  />
						   @{" "}
						  <FormField
							  name={"domain"}
							  data={[
								  { domain: "lgespartner.com" },
								  { domain: "lgensol.com" }
							  ]}
							  component={CustomSelect}
							  textField={"domain"}
							  dataItemKey={"domain"}
							  // value={domain}
							  // onChange={handleDomainChange}
							  // visited={true}
							  className="w200"
						  >
						  </FormField>
							</div>
						</div>
					  </td>
				  </tr>
				  <tr>
					  <th scope="row">
						  {t("common.cellphone")/*휴대폰 번호*/}
						  <span className="required">
					  <span className="sr-only">필수</span>
					</span>
					  </th>
					  <td>
						<div className="in-input">
						  <FormField
							  name={"cellPhone"}
							  validation={true}
							  validator={numberValidator}
							  placeholder={t("user.cellPhone_validator")/*‘-’없이 숫자만 입력해주세요.*/}
								className="w310"
						  />
						</div>
					  </td>
				  </tr>
				  <tr>
					  <th scope="row">
						  {t("user.isActive")/*활성화 여부*/}
						  <span className="required">
					  <span className="sr-only">필수</span>
						</span>
					  </th>
					  <td>
								<FormField
									className="flex-gap-0.5-2"
									layout="horizontal"
									name={"isActive"}
									component={RadioGroup}
									data={[
										{ label: "Y", value: true },
										{ label: "N", value: false },
									]}
								/>
						  {/* <RadioGroup
								className="flex-gap-0.5-2"
							  name={"isActive"}
							  layout="horizontal"
							  defaultValue={true}
							  validation={true}
							  data={[
								  { label: "Y", value: true },
								  { label: "N", value: false },
							  ]}
							  onChange={handleActiveYnChange}
						  /> */}
					  </td>
				  </tr>
					<tr>
					  <th scope="row">
						  {t("user.isMobileAccess")/*모바일 접근권한*/}
						  <span className="required">
					  <span className="sr-only">필수</span>
						</span>
					  </th>
					  <td>
							<FormField
								className="flex-gap-0.5-2"
								layout="horizontal"
								name={"isMobileAccess"}
								component={RadioGroup}
							  data={[
								  { label: "Y", value: true },
								  { label: "N", value: false },
							  ]}
							/>
						  {/* <RadioGroup
								className="flex-gap-0.5-2"
							  name={"isMobileAccess"}
							  layout="horizontal"
							  defaultValue={false}
							  validation={true}
							  data={[
								  { label: "Y", value: true },
								  { label: "N", value: false },
							  ]}
							  onChange={handleMobileAccessYnChange}
						  /> */}
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
