import * as React from "react";
import {useEffect, useState} from "react";
import {Field, Form, FormElement, FormRenderProps,} from "@progress/kendo-react-form";
import {Button} from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import FormInput from "@/new_components/common/FormInput.tsx";
import {useMutation} from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {numberValidator, requiredValidator, stringLengthValidator} from "@/utils/Validators.ts";
import ButtonGroup from "@/new_components/common/ButtonGroup.tsx";
import {UserCreateDto, UserUpdateDto} from "@/utils/apiService/type/user/user.type.ts";
import UserApiService from "@/utils/apiService/UserApiService.ts";
import {RoleNameDto} from "@/utils/apiService/type/role/RoleDto.ts";
import RoleApiService from "@/utils/apiService/RoleApiService.ts";
import CustomSelect from "@/new_components/form/CustomSelect.tsx";
import DropDownList from "@/components/kendo/form/DropDownList.tsx";
import RadioGroup from "@/components/kendo/form/RadioGroup.tsx";
import FormField from "@/new_components/common/FormField.tsx";
import Input from "@/components/kendo/form/Input.tsx";
import {UserResponseDto} from "@/utils/apiService/type/user/UserResponseDto.ts";
import RegisterInfo from "@/new_components/common/RegisterInfo";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function UserDetail() {
	const { state } = useLocation();
	const {t} = useTranslation();
	console.log('state', state)
  	console.log('UserDetail')
  	const showAlert = useAlert();
  	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState<UserUpdateDto>({
		userName: "",
		email: "",
		cellPhone: "",
		isActive: true,
		isMobileAccess: false,
		roleGroupId: "",
		roleCodeName: ""
	});
	const [data, setData] = useState<UserResponseDto>({
		id: "",
		userId: "",
		userName: "",
		email: "",
		cellPhone: "",
		isActive: true,
		isLock: false,
		isMobileAccess: false,
		roleGroupName: "",
		createdAt: new Date(),
		createdUserId: "",
		updatedAt: new Date(),
		updatedUserId: ""
  });
	const [isLoading, setIsLoading] = useState(true);
	const [roleName, setRoleName] = useState<RoleNameDto[]>([]);
	const [isUserIdDuplicate, setIsUserIdDuplicate] = useState<boolean | null>(null);
	//const [isActive, setIsActive] = useState<boolean>(true);
	const [userId, setUserId] = useState("");
	//const [isMobileAccess, setIsMobileAccess] = useState<boolean>(false);

	useEffect(() => {
		RoleApiService().getRoleNames()
			.then(response => {
				const roleNames = (response.data as any).content || response.data;
				// console.log("getRoleNames", roleNames);
				setRoleName(roleNames);
				// console.log(roleName);
			})
			.catch(error => console.error("권한 목록을 가져오는 중 에러:", error));
	}, [])

	useEffect(() => {
		setIsLoading(true);
		setIsUserIdDuplicate(true);
		getUserById(state);
	}, []);

	const getUserById = async (userId: string) => {
		console.log("userId",userId);
		const response: UserResponseDto = await UserApiService().getUserByUserId(userId);
		console.log("userInfo",response);
		if(response.email !== null && response.email !== undefined && response.email.trim().length > 0){
			const [emailId, domain] = response.email.split('@');
			response.emailId = emailId;
			response.domain = domain;
		}
		setData(response);
		setIsLoading(false);
		//setIsActive(response.isActive);
		//setIsMobileAccess(response.isMobileAccess);
		console.log("response",response);
	}

	// const handleActiveYnChange = (event: any) => {
	// 	setIsActive(event.value);
	// };

	const hanleUserIDChange = (event: any) => {
		setUserId(event.value);
	};

	// const handleMobileAccessYnChange = (event: any) => {
	// 	setIsMobileAccess(event.value);
	// }

	const unlockUser = async (event: any) => {
		console.log('unlockUser');
		const result = await UserApiService().unlockUser(state).then(() => {
			showAlert({message: t("user.user_unlock_alert")/*잠금해제 처리되었습니다.*/})
		});
	}

	const checkValidation = (dataItem: Record<string, any>) => {
		let result = true;
		console.log(dataItem);
		if(dataItem.roleGroupId === undefined || dataItem.roleGroupId === null || dataItem.roleGroupId.trim().length < 1) {
			showAlert({message: t("user.choose_role_alert")/*권한을 선택해주세요*/});
			result = false;
		} else if(dataItem.userName === undefined || dataItem.userName === null || dataItem.userName.trim().length < 1){
			showAlert({message: t("user.enter_user_name_alert")/*이름을 입력해주세요*/});
			result = false;
		} else if(dataItem.cellPhone === undefined || dataItem.cellPhone === null || dataItem.cellPhone.trim().length < 1){
			showAlert({message: t("user.enter_cellphone_alert")/*휴대폰번호를 입력해주세요*/});
			result = false;
		} else if(dataItem.cellPhone.trim().length < 10 || dataItem.cellPhone.trim().length > 11) {
			showAlert({message: t("user.enter_correct_cellphone_alert")/*올바른 휴대폰번호를 입력해주세요*/});
			result = false;
		}
		return result;
	}

  const handleSubmit = async (dataItem: UserUpdateDto) => {
		const isRoleUse = await RoleApiService().isRoleUse(dataItem.roleGroupId);
		console.log('isRoleUse',isRoleUse);
		if(!isRoleUse && dataItem.isActive){
			// 권한의 사용여부가 false이고, isActive가 true인 경우
			showAlert({ 
				message: t("user.cannot_use_role"),/*해당 권한은 사용하실 수 없습니다.\n권한을 변경해주세요.*/ 
				type: 'confirm',
				onConfirm: () => {}
			});
			return;
		}
	  let fullEmail;
	  // eslint-disable-next-line eqeqeq
	  if(dataItem.emailId == undefined || dataItem.emailId.trim().length < 1) {
		  fullEmail = undefined;
	  } else {
		  fullEmail = `${dataItem.emailId  }@${  dataItem.domain}`;
	  }
	  dataItem.email = fullEmail;
	  // const selectedisActive = isActive;
	  // dataItem.isActive = selectedisActive;
		// dataItem.isMobileAccess = isMobileAccess;
	  console.log('dataItem', dataItem)
	  if(!checkValidation(dataItem)) return;
	  setUserInfo(dataItem);
	  updateUser.mutate(dataItem);
  }

	const handleDelete = async () => {
		console.log('handleDelete');
		showAlert({
			title: '삭제',
			message: t("user.user_delete_confirm")/*해당 사용자를 삭제하시겠습니까?*/,
			type: 'confirm',
			onConfirm: () => delMutation.mutate()
		})
	}
	const delMutation = useMutation({
		mutationFn: async () => {
			UserApiService().deleteUser(state)
		},
		onSuccess: (response) => {
			navigate('/system/user');
		},
		onError: (responseError) => {
			console.error(responseError);
		},
	});
	const updateUser = useMutation({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		mutationFn: async (updateInfo : UserUpdateDto) =>
			// console.log(userInfo),
			UserApiService().updateUser(state, updateInfo),
		onSuccess: (response: any) => {
			showAlert({
				message: t("common.modify_success")/*수정되었습니다.*/,
				onConfirm: () => {
					navigate('/system/user');
				}
			})
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
	  <Header headName={t("user.user_detail")/*사용자 상세*/} descrption={""}/>
	{!isLoading &&
	  <Form
		  initialValues={data}
		  ignoreModified={true} //수정된 필드 없이도 양식 제출
		onSubmit={(values) => handleSubmit(values as UserUpdateDto)}
		render={(formRenderProps: FormRenderProps) => (
			<FormElement>
				<section className="section">
					<div className="title-group">
						<h3 className="t-title">{t("user.user_information")/*사용자 정보*/}</h3>
						<div className="group-align-right gap0.38">
							<Button
								onClick={unlockUser}
								size="medium"
							>
								{t("user.user_unlock")/*계정 잠금 해제*/}
							</Button>
						</div>
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
									onChange={hanleUserIDChange}
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
								<FormField
									name={"cellPhone"}
									validation={true}
									validator={numberValidator}
									placeholder={"‘-’없이 숫자만 입력해주세요."}
									className="w310"
								/>
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
									value={isActive}
									validation={true}
									data={[
										{label: "Y", value: true},
										{label: "N", value: false},
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
							size={"large"}
							themeColor={"primary"}>
							{t("common.save")/*저장*/}
						</Button>
						{/*<ButtonGroup deleteButton={true} submitButton={true} formRenderProps={formRenderProps}*/}
						{/*			 handleDelete={handleDelete}/>*/}
					</div>
				</div>
			</FormElement>
		)}
	  />

	}
	</>
  );
}
