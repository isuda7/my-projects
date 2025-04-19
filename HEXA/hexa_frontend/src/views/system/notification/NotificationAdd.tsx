import * as React from "react";
import { useEffect, useState } from "react";
import { Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import FormInput from "@/new_components/common/FormInput.tsx";
import { useMutation } from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import { useNavigate } from "react-router-dom";
import { requiredValidator } from "@/utils/Validators.ts";
import CustomSelect from "@/new_components/form/CustomSelect.tsx";
import RadioGroup from "@/components/kendo/form/RadioGroup.tsx";
import FormField from "@/new_components/common/FormField.tsx";
import NotificationApiService from "@/utils/apiService/NotificationApiService";
import { NotificationSaveDto } from "@/utils/apiService/type/notification/NotificationDto";
import FormCodeDropDownList from "@/new_components/common/FormCodeDropDownList";
import ReceiverUserListModal from "./modal/ReceiverUserListModal";
import Input from "@/components/kendo/form/Input";
import { UserEmailDto } from "@/utils/apiService/type/user/UserResponseDto";
import FormTextArea2 from "@/new_components/common/FromTextArea2";
import { useTranslation } from "react-i18next";
import { CodeValueDto } from "@/utils/apiService/type/system/code/CodeResponseDto";
import CodeApiService from "@/utils/apiService/CodeApiService";

export default function NotificationAdd() {
	console.log('NotificationAdd')
	const showAlert = useAlert();
	const navigate = useNavigate();
	const {t} = useTranslation();
	const [notiInfo, setNotiInfo] = useState<NotificationSaveDto>({
		type: "",
		name: "",
		message: "",
		isUse: true,
		time: "",
		rangeStart: "",
		rangeEnd: "",
		channelCode: "",
		receiverIds: []
	});
	const [userEmailData, setUserEmailData] = useState<UserEmailDto[]>();
	const [codeList, setCodeList] = useState<any[]>([]);
	const [type, setType] = useState('');
	const [isUse, setIsUse] = useState<boolean>(true);
	const [isWTAN, setWTAN] = useState<boolean>(false);
	const [isDSCN, setDSCN] = useState<boolean>(false);
	const [isIRNA, setIRNA] = useState<boolean>(false);
	const [isBTDN, setBTDN] = useState<boolean>(false);
	const [isSMS, setSMS] = useState<boolean>(false);
	const [SMStitle, setSMSTitle] = useState('');
	const [SMSMessage, setSMSMessage] = useState('');
	const [time, setTime] = useState('');
	const [channelCode, setChannelCode] = useState('');
	const [receiverNames, setReceiverNames] = useState('');
	const [receiverIds, setReceiverIds] = useState<string[]>([]);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	useEffect(() => {
		getCodeList();
	}, []);

	const getCodeList = async () => {
		const response = await CodeApiService().getCodesByGroupCode({
			groupCode: "SMNOTI"
		});
		if(Array.isArray(response.data)){
			setCodeList(response.data);
		}
	}

	const handleTypeChange = (event: any) => {
		console.log(event);
		const selectedType = event.value;
		setType(selectedType);
		setTime("");
		console.log('type', type);
		if (event.value === 'WTAN') { // 전력량 이상 감지
			if(channelCode === 'SMS'){
				setChannelCode("");
			}
			setWTAN(true);
			setDSCN(false);
			setIRNA(false);
			setBTDN(false);
		}
		if (event.value === 'DSCN') { // 통신단절
			if(channelCode === 'EMAIL'){
				setChannelCode("");
			}
			if(channelCode === 'SMS'){
				updateSMSContent('DSCN', time);
			}
			setDSCN(true);
			setWTAN(false);
			setIRNA(false);
			setBTDN(false);
		}
		if (event.value === 'IRNA') { // 고장알림
			if(channelCode === 'EMAIL'){
				setChannelCode("");
			}
			if(channelCode === 'SMS'){
				updateSMSContent('IRNA', time);
			}
			setDSCN(false);
			setWTAN(false);
			setIRNA(true);
			setBTDN(false);
		}
		if (event.value === 'BTDN') { // 배터리진단
			if(channelCode === 'EMAIL'){
				setChannelCode("");
			}
			if(channelCode === 'SMS'){
				updateSMSContent('BTDN', time);
			}
			setDSCN(false);
			setWTAN(false);
			setIRNA(false);
			setBTDN(true);
		}
	};

	const handleChannelChange = (event: any) => {
		const selectedChannel = event.value;
		setChannelCode(selectedChannel);
		console.log(selectedChannel);
		console.log(channelCode);
		if(event.value === "SMS") {
			setSMS(true);
			updateSMSContent(type, time);
		}else {
			setSMS(false);
			setSMSTitle('');
			setSMSMessage('');
		}
	};

	const handleUseYnChange = (event: any) => {
		setIsUse(event.value);
	};

	const handleTimeChange = (event: any) => {
		const selectedTime = event.value;
		setTime(selectedTime);
		console.log(time);
		if(channelCode === "SMS"){
			updateSMSContent(type, selectedTime);
		}
	}

	const updateSMSContent = (selectedType: any, selectedTime: any) => {
    if (selectedType === 'DSCN') {
      setSMSTitle(`[HEXA 2세대 통신단절 미복귀 ${selectedTime || '0분'} 경과 안내`);
      setSMSMessage(`하기 스테이션내에서 통신단절이 발생하고 미복귀 된지 ${selectedTime || '0분'}이 경과되었습니다.확인 부탁드립니다.`);
    } else if (selectedType === 'IRNA') {
      setSMSTitle(t("[HEXA 2세대 스테이션 고장 발생]"));
      setSMSMessage(t("하기 스테이션내에서 고장이 발생하였습니다.\n확인부탁드립니다."));
    } else if (selectedType === 'BTDN') {
      setSMSTitle(t("[HEXA 2세대 배터리 진단 발생]")/*배터리 진단 알림 */);
      setSMSMessage(t("하기 배터리에서 진단이 발생하였습니다.\n확인부탁드립니다."));
    } else {
      setSMSTitle('');
      setSMSMessage('');
    }
  };

	const setModalSeletedData = (rows: any[]) => {
		console.log('rows', rows);
		setModalOpen(false);
		setUserEmailData(rows);
		setReceiverNames(rows.map(row => row.userName).join(', '));
		setReceiverIds(rows.map(row => row.id));
		console.log(rows.map(row => row.userName).join(', '));
		console.log('receiverIds', rows.map(row => row.id));
	}

	const handleSubmit = async (dataItem: NotificationSaveDto) => {
		console.log('dataItem', dataItem);
		console.log('receiverIds', receiverIds);
		dataItem.receiverIds = receiverIds;
		dataItem.isUse = isUse;
		dataItem.channelCode = channelCode;
		dataItem.message = SMSMessage;

		if (dataItem.type === undefined || dataItem.type.trim().length < 1) {
			showAlert({ message: t("notification.select_condition_alert")/*발송 조건을 선택해주세요. */ });
			return;
		} else if (dataItem.type === 'WTAN') {
			if (dataItem.rangeStart === undefined || dataItem.rangeStart.trim().length < 1 ||
				dataItem.rangeEnd === undefined || dataItem.rangeEnd.trim().length < 1) {
				showAlert({ message: t("notification.enter_daily_power_normal_range_alert")/*일전력량 정상 범위를 입력해주세요.*/ });
				return;
			}
		} else if (dataItem.type === 'DSCN') {
			if (dataItem.time === undefined || dataItem.time.trim().length < 1) {
				showAlert({ message: t("notification.enter_non_return_time_alert")/*발생 후, 미복귀 시간을 입력해주세요.*/ });
				return;
			}
		}
		if (channelCode === undefined || channelCode.trim().length < 1) {
			showAlert({ message: t("notification.select_channel_alert")/*발송 종류를 선택해주세요. */});
			return;
		}
		else if (receiverIds === undefined || receiverIds.length < 1) {
			showAlert({ message: t("notification.select_receiver_alert")/*수신자를 지정해주세요. */ });
			return;
		} else if (dataItem.message === undefined || dataItem.message.trim().length < 1) {
			showAlert({ message: t("notification.enter_massage_alert")/*메시지를 입력해주세요. */ });
			return;
		}
		else if (dataItem.channelCode === 'EMAIL') {
			console.log('userEmailData', userEmailData);
			if (userEmailData != undefined &&
				userEmailData?.filter(user => user.email === null || user.email.trim().length < 1).length > 0) {
				const userWithNoEmail = userEmailData?.filter(user => user.email === null).map(user => user.userName).join(', ');
				console.log('userWithNoEmail', userWithNoEmail);
				showAlert({ message: t("notification.non_email_address_alert")/*일부 수신자의 이메일 주소가 없습니다.\n다시 확인해주세요.\n\n*/ + userWithNoEmail });
				return;
			}
		}
		else if (dataItem.channelCode === 'SMS') {
			dataItem.name = SMStitle;
			dataItem.message = SMSMessage;
		}
		const isDuplicated = await NotificationApiService().checkDuplication(dataItem);
		console.log("isDuplicated", isDuplicated);
		if (isDuplicated) {
			showAlert({ message: t("notification.notification_duplicated_alert")/*해당 조건으로 이미 등록된 알림이 있습니다.\n다시 확인해주세요.*/ });
			return;
		}
		console.log('dataItem2', dataItem);
		setNotiInfo(dataItem);
		registNotification.mutate(dataItem);
	}

	const registNotification = useMutation({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		mutationFn: async (dataItem: NotificationSaveDto) =>
			NotificationApiService().createNotification(dataItem),
		onSuccess: (response: any) => {
			showAlert({
				message: t("common.register_success")/*등록되었습니다.*/,
				onConfirm: () => {
					navigate('/system/notification');
				}
			})
			// navigate('/system/notification');
		},
		onError: (error) => {
			console.log(error);
			showAlert({ message: error.message })
		},
	});

	const cancelBtn = (event: any) => {
		navigate('/system/notification');
	}

	return (
		<>
			<Header headName={t("notification.notification_registration")/*알림 등록*/} descrption={""} />

			<Form
				onSubmit={(values) => handleSubmit(values as NotificationSaveDto)}
				render={(formRenderProps: FormRenderProps) => (
					<FormElement>
						<section className="section">
							<div className="title-group">
								<h3 className="t-title">{t("notification.noti_condition")/*알림 발송 조건*/}</h3>
							</div>
							<table className="tbl-base">
								<colgroup>
									<col style={{ width: "20%" }} />
									<col style={{ width: "90%" }} />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">
											{t("common.category")/*구분*/}
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td>
											{/* <FormField
												name={"type"}
												component={FormCodeDropDownList}
												codeGroup={"SMNOTI"}
												validator={requiredValidator}
												className="w310"
												onChange={handleTypeChange}
											/> */}
											<FormField
												name={"type"}
												data={codeList}
												component={CustomSelect}
												textField={"value"}
												dataItemKey={"code"}
												className="w310"
												onChange={handleTypeChange}
											/>
										</td>
									</tr>
									{isWTAN &&
										<tr>
											<th scope="row">
												{t("notification.daily_power_normal_range")/*일전력량 정상 범위*/}(Wh)
												<span className="required">
													<span className="sr-only">필수</span>
												</span>
											</th>
											<td>
												<div className="in-input">
													<div className="inner-item mw400">
														<FormField
															name={"rangeStart"}
															className="w310"
														/>
														~{" "}
														<FormField
															name={"rangeEnd"}
															className="w310"
														/>
													</div>
												</div>
											</td>
										</tr>
									}
									{isDSCN &&
										<tr>
											<th scope="row">
												{t("notification.non_return_time")/*발생 후, 미복귀 시간*/}
												<span className="required">
													<span className="sr-only">필수</span>
												</span>
											</th>
											<td>
												<FormField
													name={"time"}
													data={[
														{ time: t("notification.time.1min"), value: "1" },
														{ time: t("notification.time.5min"), value: "5" },
														{ time: t("notification.time.10min"), value: "10" },
														{ time: t("notification.time.15min"), value: "15" },
														{ time: t("notification.time.20min"), value: "20" },
														{ time: t("notification.time.30min"), value: "30" }
													]}
													onChange={handleTimeChange}
													component={CustomSelect}
													textField={"time"}
													dataItemKey={"time"}
													className="w310"
												/>
											</td>
										</tr>
									}
								</tbody>
							</table>
						</section>
						<section className="section">
							<div className="title-group">
								<h3 className="t-title">{t("notification.noti_message")/*알림 메시지*/}</h3>
							</div>
							<table className="tbl-base">
								<colgroup>
									<col style={{ width: "20%" }} />
									<col style={{ width: "80%" }} />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">
											{t("notification.channel")/*발송 종류*/}
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td>
											<RadioGroup
												className="flex-gap-0.5-2"
												name={"channelCode"}
												layout="horizontal"
												validation={true}
												data={[
													{ 
														label: t("user.grid.header.email"), 
														value: "EMAIL",
														disabled: isDSCN || isIRNA || isBTDN											
													},
													{ 
														label: t("notification.sns_talk"), 
														value: "SMS" ,
														disabled: isWTAN
													},
												]}
												onChange={handleChannelChange}
												value={channelCode}
											/>
										</td>
									</tr>
									<tr>
										<th scope="row">
											{t("board.title")/*제목*/}
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td>
											{isSMS &&
											<div className="in-input">
												<Input
													name={"name"}
													value={SMStitle}
													disabled={channelCode === 'SMS'}
													onChange={(e) => setSMSTitle(e.target.value)}
												/>
											</div>
											}
											{!isSMS &&
											<div className="in-input">
												<FormField
													name={"name"}
													validation={true}
												/>
											</div>
											}
										</td>
									</tr>
									<tr>
										<th scope="row">
											{t("notification.receivers")/*수신자*/}
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td>
											<div className="in-input">
												<div className="inner-item">
													<Button
														size={"medium"}
														fillMode="outline"
														// className="w100"
														type="button"
														onClick={() => setModalOpen(true)}
													>
														{t("notification.select_receivers")/*수신자 선택*/}
													</Button>
													<Input
														style={{width: "1000px"}}
														name={"userName"}
														value={receiverNames}
														disabled={true}
													/>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="row">
											{t("notification.message")/*메시지*/}
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td>
										{!isSMS &&
											<div className="in-input">
												<FormField
													name={"message"}
													component={FormTextArea2}
													rows={6}
													// maxLength={50} 
													resizable="none"
												/>
											</div>
										}
										{isSMS &&
										<div className="in-input">
											<Input
												// component={FormTextArea2}
												rows={6}
												name={"message"}
												value={SMSMessage}
												resizable="none"
												onChange={(e) => setSMSMessage(e.target.value)}
            						disabled={channelCode === 'SMS'}
											/>
										</div>
										}
										</td>
									</tr>
									<tr>
										<th scope="row">
											{t("station.is_use")/*사용여부*/}
											<span className="required">
												<span className="sr-only">필수</span>
											</span>
										</th>
										<td>
											<RadioGroup
												className="flex-gap-0.5-2"
												name={"isUse"}
												layout="horizontal"
												defaultValue={true}
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
			{
				modalOpen &&
				<ReceiverUserListModal
					onClose={() => setModalOpen(false)}
					setModalSeletedData={setModalSeletedData}
				/>
			}

		</>
	);
}
