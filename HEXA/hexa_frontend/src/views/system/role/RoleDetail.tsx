import * as React from "react";
import { useEffect, useState } from "react";
import { Field, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import { useMutation } from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonGroup from "@/new_components/common/ButtonGroup.tsx";
import { RoleDetailDto, RoleNameDto, RoleResponseDto, RoleSaveDto } from "@/utils/apiService/type/role/RoleDto.ts";
import RoleApiService from "@/utils/apiService/RoleApiService.ts";
import RadioGroup from "@/components/kendo/form/RadioGroup.tsx";
import FormField from "@/new_components/common/FormField.tsx";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Grant, GrantDto, GrantWithMenuTree } from "@/utils/apiService/type/role/GrantDto.ts";
import { useTranslation } from "react-i18next";
import CodeApiService from "@/utils/apiService/CodeApiService";
import CustomSelect from "@/new_components/form/CustomSelect";

export default function RoleDetail() {
	const { state } = useLocation();
	const {t, i18n} = useTranslation();
	const roleId = state;
	console.log('state', state)
	console.log('RoleDetail')
	const showAlert = useAlert();
	const navigate = useNavigate();
	// const [roleUpdateInfo, setRoleUpdateInfo] = useState<RoleSaveDto>({
	// 	roleGroupName: "",
	// 	roleGroupDescription: "",
	// 	isUse: true,
	// 	grantIds: []
	// });
	const [data, setData] = useState<RoleDetailDto>({
		id: "",
		roleCode: null,
		roleCodeEng: "",
    roleCodeName: "",
		roleGroupName: "",
		roleGroupEngName: "",
		roleGroupDescription: "",
		isUse: true,
		grants: [],
		grantIds: []
	});
	const [isLoading, setIsLoading] = useState(true);
	const [grants, setGrants] = useState<GrantWithMenuTree[]>([]);
	const [roleEng, setRoleEng] = useState('');
	const [roleName, setRoleName] = useState('');
	const [isRoleNameDuplicate, setIsRoleNameDuplicate] = useState<boolean | null>(null);
	const [isUse, setIsUse] = useState<boolean>(true);
	const [selectedGrantIds, setSelectedGrantIds] = useState<string[]>([]);
	const [selectAll, setSelectAll] = useState<{ [grantType: string]: boolean }>({
		READ: false,
		CREATE: false,
		UPDATE: false,
		DELETE: false,
	});

	const [roleList, setRoleList] = useState<any[]>([])

	const alwaysSelectedGrantIds = [
		"642232863435161102", // 대시보드
		"626237188278899349", // 스테이션 관리
		"653855692864080390", // 스테이션 통계 정보
		"653855919805286525", // 스테이션별 누적 교환횟수
		"615730220672999191", // 배터리 관리
		"634596348024796858", // 배터리 예약 이력
		"638661197261557558", // 배터리 교환 및 위치 이력
		"636100575729190963", // 고장 및 통신 관리
		"636100730255740629", // 스테이션 고장 이력
		"636107268774508650", // 배터리 진단 이력
		"636108502127147003", // 통신단절 현황
	];

	useEffect(() => {
		initData();
		console.log(roleId);
		getGrants();
		setRoleById(state);
		setIsLoading(true);
		setIsRoleNameDuplicate(true);
	}, []);
	
	const initData = async () => {
		const res = await CodeApiService().getCodesByGroupCode({groupCode:'AUTH_USER'});
		console.log("RoleCode response",res.data);
		if(Array.isArray(res.data)) {
			setRoleList(res.data)
		}
	}

	const getGrants = async () => {
		RoleApiService().getGrantsWithMenuTree()
			.then(response => {
				const fetchedGrants = (response.data as any).content || response.data;
				console.log("fetchedGrants", fetchedGrants);
				setGrants(fetchedGrants);
			})
			.catch(error => console.error("메뉴별 권한 목록을 가져오는 중 에러:", error));
	}

	const setRoleById = async (roleId: number) => {
		const response: RoleDetailDto = await RoleApiService().getRoleById(roleId);
		console.log("response", response);
		const grantIds = response.grantIds.map(num => num.toString());
		setData(response);
		setIsUse(response.isUse);
		setRoleEng(response.roleCodeEng);
		console.log("grantIds", grantIds);
		setSelectedGrantIds(grantIds);
		// if(grantIds.length > 0) 
		setIsLoading(false);
		console.log("selectedGrantIds", selectedGrantIds);
		console.log("isLoading", isLoading);
	}

	useEffect(() => {
		const initializeSelectAllState = () => {
			const initialSelectAll = { ...selectAll };
	
			Object.keys(initialSelectAll).forEach((grantType) => {
				const allGrantIds = grants
					.flatMap(flattenGrants)
					.filter((grant) =>
						grantType === "CREATE"
							? ["CREATE", "UPDATE", "DELETE"].includes(grant.grantType)
							: grant.grantType === grantType
					)
					.map((grant) => grant.grantId);
	
				// 모든 관련 grantId가 선택되어 있는지 확인
				initialSelectAll[grantType] = allGrantIds.every((id) =>
					selectedGrantIds.includes(id)
				);
			});
	
			setSelectAll(initialSelectAll);
		};
	
		initializeSelectAllState();
	}, [grants]); // grants가 로드된 후에만 실행

	useEffect(() => {
		const updateSelectAllState = () => {
			const updatedSelectAll = { ...selectAll };
	
			Object.keys(updatedSelectAll).forEach((grantType) => {
				const allGrantIds = grants
					.flatMap(flattenGrants)
					.filter((grant) =>
						grantType === "CREATE"
							? ["CREATE", "UPDATE", "DELETE"].includes(grant.grantType)
							: grant.grantType === grantType
					)
					.map((grant) => grant.grantId);
	
				// 모든 관련 grantId가 선택되어 있는지 확인
				updatedSelectAll[grantType] = allGrantIds.every((id) =>
					selectedGrantIds.includes(id)
				);
			});
	
			setSelectAll(updatedSelectAll);
		};
	
		updateSelectAllState();
	}, [selectedGrantIds, grants]);


	const handleUseYnChange = (event: any) => {
		setIsUse(event.value);
	};

	const handleRoleNameChange = (event: any) => {
		setRoleName(event.target.value);
	};

	const handleSubmit = async (dataItem: RoleSaveDto) => {
		console.log('dataItem', dataItem)
		console.log('data', data)
		console.log('선택된 grantId:', selectedGrantIds);
		const selectedIsUse = isUse;
		dataItem.isUse = selectedIsUse;
		dataItem.grantIds = selectedGrantIds;
		// if (data.roleGroupName !== dataItem.roleGroupName) {
		// 	if (dataItem.roleGroupName === undefined || dataItem.roleGroupName.trim().length < 1) {
		// 		showAlert({ message: t("role.enter_role_alert")/*권한을 입력해주세요.*/ });
		// 		return;
		// 	} else if (dataItem.roleGroupEngName === undefined || dataItem.roleGroupEngName.trim().length < 1) {
		// 		showAlert({ message: t("role.enter_role_eng_alert")/*권한영문명을 입력해주세요.*/ });
		// 		return;
		// 	} else if (roleName.trim().length > 0) {
		// 		const isDuplicated = await RoleApiService().checkRoleNameDuplication(roleName);
		// 		console.log("isDuplicated", isDuplicated);
		// 		if (isDuplicated) {
		// 			// setIsRoleNameDuplicate(true)
		// 			showAlert({ message: t("role.is_duplicate_role_alert")/*이미 등록된 권한입니다.*/ });
		// 			return;
		// 		}
		// 	}
		// }
		if(data.roleCode !== dataItem.roleCode) {
			//TODO: 이미 roleCode 등록되어있는지 체크
		}
		else if (selectedGrantIds === undefined || selectedGrantIds.length < 1) {
			showAlert({ message: t("role.select_grant_alert")/*메뉴별 권한을 선택해주세요.*/ });
			return;
		}
		console.log('dataItem2', dataItem);
		updateRole.mutate(dataItem);
	}

	const updateRole = useMutation({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		mutationFn: async (dataItem: RoleSaveDto) =>
			// console.log(userInfo),
			RoleApiService().updateRole(state, dataItem),
		onSuccess: (response: any) => {
			showAlert({
				message: t("common.modify_success")/*수정되었습니다.*/,
				onConfirm: () => {
					navigate('/system/role');
				}
			})
			// navigate('/system/role');
		},
		onError: (error) => {
			console.log(error);
			showAlert({ message: error.message })
		},
	});

	// const handleSelectAll = (type: string) => {
	// 	const isSelected = !selectAll[type];
	// 	setSelectAll(prev => ({ ...prev, [type]: isSelected }));

	// 	const updatedSelectedGrantIds = grants
	// 		.filter(grant => grant.grantType === type)
	// 		.map(grant => grant.tsid);

	// 	// 전체선택 상태에 따라 selectedGrantIds 업데이트
	// 	if (isSelected) {
	// 		setSelectedGrantIds(prevSelectedGrantIds => [
	// 			...prevSelectedGrantIds,
	// 			...updatedSelectedGrantIds.filter(id => !prevSelectedGrantIds.includes(id))
	// 		]);
	// 	} else {
	// 		setSelectedGrantIds(prevSelectedGrantIds =>
	// 			prevSelectedGrantIds.filter(id => !updatedSelectedGrantIds.includes(id))
	// 		);
	// 	}
	// 	if(type === 'CREATE'){
	// 		handleSelectAll('UPDATE');
	// 		handleSelectAll('DELETE');
	// 	}
	// };

	// const handleCheckboxChange = (grantId: string, grantType: string, menuGrants: Grant[]) => {
	// 	// setSelectedGrantIds(prev =>
	// 	// 	prev.includes(grantId) ? prev.filter(id => id !== grantId) : [...prev, grantId]
	// 	// );
	// 	console.log(grantId, grantType, menuGrants);
	// 	console.log("selectedGrantIds", selectedGrantIds);
	// 	if (grantType === 'CREATE') {
	// 		// CREATE 선택 시 UPDATE와 DELETE도 함께 선택하거나 해제
	// 		const relatedGrants = menuGrants
	// 			.filter(grant => ['CREATE', 'UPDATE', 'DELETE'].includes(grant.grantType))
	// 			.map(grant => grant.tsid);

	// 		setSelectedGrantIds(prevSelectedGrantIds => {
	// 			let newSelectedGrantIds: string | string[];

	// 			// CREATE 체크 해제 시 관련 권한들도 모두 해제
	// 			if (prevSelectedGrantIds.includes(grantId)) {
	// 				newSelectedGrantIds = prevSelectedGrantIds.filter(id => !relatedGrants.includes(id));
	// 			} else {
	// 				// CREATE 체크 시 관련 권한들도 모두 선택
	// 				newSelectedGrantIds = [...prevSelectedGrantIds, ...relatedGrants.filter(id => !prevSelectedGrantIds.includes(id))];
	// 			}

	// 			// 모든 CREATE, UPDATE, DELETE 권한이 선택되었는지 확인하여 selectAll 업데이트
	// 			const allSelectedForType = grants
	// 				.filter(grant => ['CREATE', 'UPDATE', 'DELETE'].includes(grant.grantType))
	// 				.every(grant => newSelectedGrantIds.includes(grant.tsid));

	// 			setSelectAll(prev => ({ ...prev, CREATE: allSelectedForType }));
	// 			return newSelectedGrantIds;
	// 		});
	// 	} else {
	// 		// READ 선택 시 해당 grant만 추가/제거
	// 		setSelectedGrantIds(prevSelectedGrantIds => {
	// 			const newSelectedGrantIds = prevSelectedGrantIds.includes(grantId)
	// 				? prevSelectedGrantIds.filter(id => id !== grantId)
	// 				: [...prevSelectedGrantIds, grantId];

	// 			const allSelectedForType = grants
	// 				.filter(grant => grant.grantType === grantType)
	// 				.every(grant => newSelectedGrantIds.includes(grant.tsid));

	// 			setSelectAll(prev => ({ ...prev, [grantType]: allSelectedForType }));
	// 			return newSelectedGrantIds;
	// 		});
	// 	}
	// };

	const handleSelectAll = (grantType: string) => {
		const relevantGrantIds = grants
			.flatMap(flattenGrants) // 모든 메뉴 평탄화
			.filter((grant) =>
				grantType === "CREATE"
					? ["CREATE", "UPDATE", "DELETE"].includes(grant.grantType)
					: grant.grantType === grantType
			) // grantType에 따른 필터링
			.map((grant) => grant.grantId);
	
		setSelectedGrantIds((prev) => {
			if (selectAll[grantType]) {
				// 해제: 관련 ID 제거
				return prev.filter(
					(id) => !relevantGrantIds.includes(id) || alwaysSelectedGrantIds.includes(id)
				);
			}
			// 선택: 관련 ID 추가
			return [...prev, ...relevantGrantIds.filter((id) => !prev.includes(id))];
		});
	
		setSelectAll((prev) => ({ ...prev, [grantType]: !prev[grantType] }));
	};
	
	// 메뉴 트리 평탄화
	const flattenGrants = (menu: GrantWithMenuTree): GrantDto[] => {
		return [
			...menu.grants, // 현재 메뉴의 권한
			...menu.childrenMenu.flatMap(flattenGrants), // 하위 메뉴의 권한
		];
	};
	
	const handleCheckboxChange = (grantId: string, grantType: string, grants: GrantWithMenuTree[]) => {
		if (alwaysSelectedGrantIds.includes(grantId)) {
			return;
		}

		// 선택된 상태 업데이트
		const toggleGrantSelection = (id: string, isSelected: boolean) => {
			setSelectedGrantIds((prev) => {
				// 항상 선택된 ID는 선택 해제 불가
				if (alwaysSelectedGrantIds.includes(id) && !isSelected) {
					return prev;
				}
		
				return isSelected
					? [...prev, id] // 선택 추가
					: prev.filter((selectedId) => selectedId !== id); // 선택 해제
			});
		};
	
		// 부모 메뉴 상태 업데이트 (자식 메뉴 선택 시 부모 메뉴 선택)
		const updateParentSelection = (menuId: string, grantType: string) => {
			const findParent = (menuId: string): GrantWithMenuTree | null => {
				const flattenMenuTree = (menuList: GrantWithMenuTree[]): GrantWithMenuTree[] =>
					menuList.flatMap((menu) => [menu, ...flattenMenuTree(menu.childrenMenu)]);
	
				const allMenus = flattenMenuTree(grants);
				const currentMenu = allMenus.find((menu) => menu.menuId === menuId);
				if (currentMenu?.parentMenu) {
					return allMenus.find((menu) => menu.menuId === currentMenu.parentMenu?.tsid) || null;
				}
				return null;
			};
	
			const parentMenu = findParent(menuId);
			if (parentMenu) {
				const parentGrant = parentMenu.grants.find((grant) => grant.grantType === grantType);
				if (parentGrant) {
					toggleGrantSelection(parentGrant.grantId, true); // 부모 메뉴를 선택
					updateParentSelection(parentMenu.menuId, grantType); // 재귀적으로 상위 부모 처리
				}
			}
		};
	
		// 자식 메뉴 상태 업데이트 (부모 메뉴 해제 시 자식 메뉴도 해제)
		const updateChildSelection = (
			menu: GrantWithMenuTree,
			grantType: string,
			isSelected: boolean
		) => {
			menu.grants
				.filter((grant) => grant.grantType === grantType)
				.forEach((grant) => toggleGrantSelection(grant.grantId, isSelected));
			menu.childrenMenu.forEach((child) => updateChildSelection(child, grantType, isSelected));
		};
	
		// 현재 체크박스의 선택 상태 반전
		const isSelected = !selectedGrantIds.includes(grantId);
		toggleGrantSelection(grantId, isSelected);
	
		// 모든 메뉴 평탄화
		const flattenMenuTree = (menuList: GrantWithMenuTree[]): GrantWithMenuTree[] =>
			menuList.flatMap((menu) => [menu, ...flattenMenuTree(menu.childrenMenu)]);
	
		const allMenus = flattenMenuTree(grants);
		const currentMenu = allMenus.find((menu) =>
			menu.grants.some((grant) => grant.grantId === grantId)
		);
	
		if (currentMenu) {
			if (isSelected) {
				// 부모 메뉴 상태 업데이트 (선택 시)
				updateParentSelection(currentMenu.menuId, grantType);
			} else {
				// 자식 메뉴 상태 업데이트 (해제 시)
				updateChildSelection(currentMenu, grantType, false);
			}
		}
	};

	const cancelBtn = (event: any) => {
		navigate('/system/role');
	}

	// // 1. Grant 배열을 menuId 기준으로 그룹화
	// const groupGrantsByMenu = (grants: Grant[]) => {
	// 	return grants.reduce<{ [key: string]: Grant[] }>((acc, grant) => {
	// 		if (!acc[grant.menuId]) acc[grant.menuId] = [];
	// 		acc[grant.menuId].push(grant);
	// 		return acc;
	// 	}, {});
	// };

	// const renderRows = () => {
	// 	// 메뉴를 그룹화하고 정렬
	// 	const groupedGrants = groupGrantsByMenu(grants);
	// 	const sortedMenus = Object.values(groupedGrants).sort(
	// 		(a, b) => (a[0].menuSort || 0) - (b[0].menuSort || 0)
	// 	);

	// 	// 각 메뉴별로 한 줄에 권한 체크박스 표시
	// 	return sortedMenus.map(menuGrants => {
	// 		const firstGrant = menuGrants[0];
	// 		return (
	// 			<tr key={firstGrant.menuId}>
	// 				<td>
	// 					<span
	// 						className={`level-${firstGrant.menuDepth - 1}`}
	// 					>
	// 						{firstGrant.menuName}
	// 					</span>
	// 				</td>
	// 				{['READ', 'CREATE'].map(type => {
	// 					const grant = menuGrants.find(g => g.grantType === type);
	// 					return (
	// 						<td key={type}>
	// 							{grant && (
	// 								<Checkbox
	// 									checked={selectedGrantIds.includes(grant.tsid)}
	// 									onChange={() => handleCheckboxChange(grant.tsid, grant.grantType, menuGrants)}
	// 								/>
	// 							)}
	// 						</td>
	// 					);
	// 				})}
	// 			</tr>
	// 		);
	// 	});
	// };

	useEffect(() => {
		renderRows(grants);
	}, [i18n.language])

	const renderRows = (menuData: GrantWithMenuTree[], depth: number = 0) => {
		// console.log(menuData);
		return menuData
			.filter((menu) => menu.menuType !== "P") // menuType이 "P"인 항목 제거(팝업메뉴)
			.map((menu) => (
			<React.Fragment key={menu.menuId}>
      <tr key={menu.menuId}>
        <td>
					<span
						className={`level-${menu.menuDepth - 1}`}
					>
						{ i18n.language == 'ko'? menu.menuName : menu.menuEngName }
					</span>
				</td>
        {['READ', 'CREATE'].map((type) => {
          const grant = menu.grants.find((g) => g.grantType === type);
          return (
            <td key={type} className="txt-center">
              {grant ? (
                <Checkbox
                  checked={selectedGrantIds.includes(grant.grantId)}
                  onChange={() => handleCheckboxChange(grant.grantId, grant.grantType, grants)}
									disabled={alwaysSelectedGrantIds.includes(grant.grantId)}
								/>
              ) : null}
            </td>
          );
        })}
      </tr>
			{menu.childrenMenu.length > 0 &&
          renderRows(menu.childrenMenu, depth + 1)}
			</React.Fragment>
    ));
	};

	return (
		<>
			<Header headName={t("role.role_detail")/*권한 상세*/} descrption={""} />
			{!isLoading &&
				<Form
					initialValues={data}
					ignoreModified={true}
					onSubmit={(values) => handleSubmit(values as RoleSaveDto)}
					render={(formRenderProps: FormRenderProps) => (
						<FormElement>
							<section className="section">
								<div className="title-group">
									<h3 className="t-title">{t("role.role_information")/*권한 정보 */}</h3>
								</div>
								<table className="tbl-base">
									<colgroup>
										<col style={{ width: "10%" }} />
										<col style={{ width: "40%" }} />
										<col style={{ width: "10%" }} />
										<col style={{ width: "40%" }} />
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">
											{t("role.roleGroupName")/*권한 그룹 */}
												<span className="required">
													<span className="sr-only">필수</span>
												</span>
											</th>
											<td>
												<div className="in-input">
													<FormField
														name={"roleCode"}
														component={CustomSelect}
														data={roleList}
														validation={true}
														disabled={true}
													/>
													{/* <FormField
														name={"roleGroupName"}
														onChange={handleRoleNameChange}
													/> */}
												</div>
											</td>
											<th scope="row">
											{t("role.roleGroupEng")}
											</th>
											<td>
											<div className="in-input">
												{roleEng}
											</div>
											</td>
										</tr>
										{/* <tr>
											<th scope="row">
											{t("common.description")}
											</th>
											<td colSpan={3}>
												<div className="in-input">
													<FormField
														name={"roleGroupDescription"}
													/>
												</div>
											</td>
										</tr> */}
										<tr>
											<th scope="row">
											{t("station.is_use")/*사용 여부*/}
												<span className="required">
													<span className="sr-only">필수</span>
												</span>
											</th>
											<td colSpan={3}>
												<RadioGroup
													className="flex-gap-0.5-2"
													name={"isUse"}
													layout="horizontal"
													value={isUse}
													validation={true}
													data={[
														{ label: "Y", value: true },
														{ label: "N", value: false },
													]}
													onChange={handleUseYnChange}
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</section>

							<section className="section">
								<div className="title-group">
									<h3 className="t-title">
									{t("role.grant_management")/*메뉴별 권한 설정*/}
										<span className="required">
											<span className="sr-only">필수</span>
										</span>
									</h3>
								</div>
								<div className="tbl-scroll">
									<div className="tbl-scroll-head">
										<table className="tbl-base">
											<colgroup>
												{/* <col style={{width: "40%"}}/>
												<col style={{width: "15%"}}/>
												<col style={{width: "15%"}}/>
												<col style={{width: "15%"}}/>
												<col style={{width: "15%"}}/> */}
												<col style={{ width: "70%" }} />
												<col style={{ width: "15%" }} />
												<col style={{ width: "15%" }} />
											</colgroup>
											<thead>
												<tr>
													<th>{t("menu.menu_name")/*메뉴명*/}</th>
													<th>
														<Checkbox
															label={"R("+ t("role.read") + ")"/* 조회 */}
															checked={selectAll.READ}
															onChange={() => handleSelectAll('READ')}
														/>
													</th>
													<th>
														<Checkbox
															label={"C("+ t("role.create") + ")"/* 등록 */}
															checked={selectAll.CREATE}
															onChange={() => handleSelectAll('CREATE')}
														/>
													</th>
													{/* <th>
															<Checkbox
																checked={selectAll.UPDATE}
																onChange={() => handleSelectAll('UPDATE')}
															>
																U(수정)
															</Checkbox>
														</th>
														<th>
															<Checkbox
																checked={selectAll.DELETE}
																onChange={() => handleSelectAll('DELETE')}
															>
																D(삭제)
															</Checkbox>
														</th> */}
												</tr>
											</thead>
										</table>
									</div>
									<div className="tbl-scroll-body">
										<table className="tbl-base">
											<colgroup>
												{/* <col style={{ width: "40%" }} />
												<col style={{ width: "15%" }} />
												<col style={{ width: "15%" }} />
												<col style={{ width: "15%" }} />
												<col style={{ width: "15%" }} /> */}
												<col style={{ width: "70%" }} />
												<col style={{ width: "15%" }} />
												<col style={{ width: "15%" }} />
											</colgroup>
											<tbody>
												{renderRows(grants)}
											</tbody>
										</table>
									</div>
								</div>
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
									{/*<ButtonGroup formRenderProps={formRenderProps} submitButton={true}/>*/}
								</div>
							</div>
						</FormElement>
					)}
				/>

			}
		</>
	);
}
