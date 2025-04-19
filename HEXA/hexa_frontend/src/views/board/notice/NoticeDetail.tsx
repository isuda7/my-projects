/** React */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

/* Kendo UI */
import { Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* API */
import { useMutation } from "@tanstack/react-query";

/* Common */
import useAlert from "@/hooks/useAlert.tsx";
import { useTranslation } from "react-i18next";

/* Types */
import { RadioGroup } from "@progress/kendo-react-inputs";
import * as React from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { toNumber } from "lodash";
import Header from "@/new_components/common/Header.tsx";
import { NoticeRequestDto } from "@/utils/apiService/type/board/NoticeRequestDto";
import { NoticeResponseDto } from "@/utils/apiService/type/board/NoticeResponseDto";
import NoticeApiService from "@/utils/apiService/board/NoticeApiService";
import Editor from "@/new_components/common/Editor";
import RegisterInfo from "@/views/station/components/RegisterInfo";
import FormField from "@/new_components/common/FormField";
import PopupModal from "./modal/PopupModal";
import CustomNoticeFile from "./components/CustomNoticeFile";
import { UploadFileInfo, UploadFileStatus } from "@progress/kendo-react-upload";

interface Props {
	id : string | undefined;
}
export default function NoticeDetail({id}: {id: number}) {
	const { t } = useTranslation();
	const showAlert = useAlert();
	const navigate = useNavigate();
	// const { state } = useLocation();
	// console.log('state', state);

	const editorRef = useRef<{ getHtml: () => void; }>(null);

	// 게시 기간
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	// 제목
	const [title, setTitle] = useState('');
	const changeTitle = () => {
		setTitle(title);
	}

	const [popupCount, setPopupCount] = useState<number>(0);
	const [initPopup, setInitPopup] = useState(false);

	// 파일 정보
	const [files, setFiles] = useState<Array<UploadFileInfo>>([]);

	const [fileNames, setFileNames] = useState<Array<string>>([]);
	const [delFileIds, setDelFileIds] = useState<Array<string>>([]);

	const handleStartDateChange = (event: any) => {
		setStartDate(event.value);
	}

	const handleEndDateChange = (event: any) => {
		setEndDate(event.value);
	}

	const [data, setData] = useState<NoticeResponseDto>({
		id: 0,
		title: "",
		description: "",
		showPopup: false,
		postStartDate: new Date(),
		postEndDate: new Date(),
		updatedAt: new Date(),
		updatedUserId: "",
		createdAt: new Date(),
		createdUserId: "",
		isPinned: 0,
		noticeFileName: "",
		noticeS3Path: ""
	})
	const [isLoading, setIsLoading] = useState(true);

	// const registNotice = useMutation(({
	// 	mutationFn: async () =>
	// 		NoticeApiService().updateNotice(toNumber(data.id), noticeInfo),
	// 	onSuccess: (response: any) => {
	// 		showAlert({ message: t('common.modify_success') }) //수정되었습니다.
	// 		navigate(-1)
	// 	},
	// 	onError: (error) => {
	// 		console.log(error);
	// 		showAlert({ message: error.message })
	// 	},
	// }))
	const registNotice = async (dataItem: any) => {
		const formData = new FormData();

		const saveDtoJson = {
			'title': dataItem.title
			, 'postStartDate': dataItem.postStartDate
			, 'postEndDate': dataItem.postEndDate
			, 'description': dataItem.description
			, 'isPinned': dataItem.isPinned
			, 'showPopup': dataItem.showPopup
			, 'fileIds': delFileIds
		}
		formData.append('saveNotice', JSON.stringify(saveDtoJson))

		dataItem.noticeFiles.forEach((file: any) => {
			formData.append("noticeFiles", file as File);
		})

		for (let pair of formData.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`);
		}

		try {
			const res = await NoticeApiService().updateNotice(toNumber(data.id), formData);
			console.log('registerNotice response - ', res)
			showAlert({ message: t('common.modify_success'), //수정되었습니다
				onConfirm: () => {
					navigate(-1)
				}
			 }) 
		}
		catch (error) {
			if (error instanceof Error) showAlert({ message: error.message });
		}
	}

	const handleSubmit = async (dataItem: Record<string, unknown>) => {

		const des = editorRef.current?.getHtml() as unknown as string;

		dataItem.postStartDate = startDate;
		dataItem.postEndDate = endDate;
		dataItem.description = des;

		console.log('dataItem', dataItem)

		if (!dataItem.title) {
			showAlert({ message: t('board.enter_title_alert') }) // "제목을 입력해주세요.""
			return false;
		}
		else if (des === "<p></p>") {
			showAlert({ message: t('board.enter_content_alert') }) // "내용을 입력해주세요."
			return false;
		}
		else if (startDate.getTime() > endDate.getTime()) {
			showAlert({ message: t('board.posting_period_alert') }) // "게시기간을 다시 선택해주세요."
			return false;
		}

		// console.log('initPopup', initPopup);
		if (!initPopup) {
			if (dataItem.showPopup && popupCount >= 3) {
				showAlert({ message: t('board.popup_maximum_3_alert') }) // "공지 팝업은 최대 3개까지 가능합니다."
				return false;
			}
		}

		showAlert({
			title: t('common.modify'),
			message: t('common.modify_confirm'),
			onConfirm: () => {
				registNotice(dataItem)
			}
		})

	}

	const setInitFiles = (list: any[]) => {
		const fileInfos: UploadFileInfo[] = [];
		for (let i = 0; i < list.length; i++) {
			const fileInfo: UploadFileInfo = {
				uid: list[i].fileId,
				name: list[i].fileName,
				size: 1000,
				status: UploadFileStatus.Selected,
				progress: 100,
				getRawFile: undefined,
				extension: '.' + list[i].extension,
			}
			fileInfos.push(fileInfo)
		}
		return fileInfos;
	}

	const getNoticeById = async (id: number) => {
		const response: NoticeResponseDto = await NoticeApiService().getNoticeById(BigInt(id));

		const res = setInitFiles(response.noticeFiles);

		const updatedResponse = {
			...response,
			postStartDate: new Date(response.postStartDate),
			postEndDate: new Date(response.postEndDate),
			noticeFiles: res
		};
		console.log('데이터..:', updatedResponse);
		// setInitFiles(response.noticeFiles);
		setData(updatedResponse);
		setStartDate(updatedResponse.postStartDate);
		setEndDate(updatedResponse.postEndDate);
		setInitPopup(updatedResponse.showPopup);
		setIsLoading(false);
	}

	const handleButtonClick = () => {
		console.log('파일이름 : ', fileNames);
		window.open(window.location.origin + "/board/notice/popup");
	}

	const getCount = async () => {
		const res = await NoticeApiService().getPopupCount();
		console.log('팝업갯수 : ', res.data);
		return res.data;
	}

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const count = await getCount();
				// console.log(typeof count);
				if (typeof count === 'number') {
					setPopupCount(count);
				}
				console.log('Fetched Count: ', count);
			} catch (error) {
				console.error('Failed to fetch popup count: ', error);
			}
		}
		const noticeId = id;
		fetchCount();
		setIsLoading(true);
		getNoticeById(noticeId!);
	}, []);

	return (
		<>
			{!isLoading &&
				<>
					{/* 공지사항 상세 */}
					<Header headName={t('board.notice_details')} descrption={""} />
					<Form
						ignoreModified={true}
						onSubmit={handleSubmit}
						initialValues={data}
						render={(formRenderProps: FormRenderProps) => (
							<section className="section">
								<FormElement>
									<table className="tbl-base">
										<colgroup>
											<col style={{ width: "10%" }} />
											<col style={{ width: "40%" }} />
											<col style={{ width: "13%" }} />
											<col style={{ width: "37%" }} />
										</colgroup>
										<tbody>
											<tr>
												<th scope="row">
													{/* 상단 고정 */}
													{t('board.pin_to_top')}
												</th>
												<td>
													<FormField
														layout="horizontal"
														component={RadioGroup}
														name={'isPinned'}
														className="flex-gap-0.5-2"
														defaultValue={data.isPinned}
														data={[
															{ label: t('board.used'), value: 1 }, // "사용"
															{ label: t('board.not_used'), value: 0 }, // "미사용"
														]}
													/>
												</td>
												<th scope="row">
													{/* 게시 기간 */}
													{t('board.posting_period')}
													<span className="required">
														<span className="sr-only">필수</span>
													</span>
												</th>
												<td>
													<span className="datepicker">
														<span className="cell">
															<DatePicker
																name="postStartDate"
																defaultValue={data.postStartDate}
																onChange={handleStartDateChange}
																format={"yyyy-MM-dd"}
															/>
														</span>
														~
														<span className="cell">
															<DatePicker
																name="postEndDate"
																defaultValue={data.postEndDate}
																onChange={handleEndDateChange}
																format={"yyyy-MM-dd"}
															/>
														</span>
													</span>
												</td>
											</tr>
											<tr>
												<th scope="row">
													{/* 제목 */}
													{t('board.title')} <span className="required">
														<span className="sr-only">필수</span>
													</span>
												</th>
												<td colSpan={3}>
													<div className="in-input">
														<FormField
															id="title"
															name={"title"}
															maxlength={100}
															defaultValue={data.title}
														/>
													</div>
												</td>
											</tr>
											<tr>
												<th scope="row">
													{/* 내용 */}
													{t('board.content')} <span className="required">
														<span className="sr-only">필수</span>
													</span>
												</th>
												<td colSpan={3}>
													<Editor
														ref={editorRef}
														contentStyle={{
															height: 320,
														}}
														defaultContent={data.description}
													/>
													<p hidden id="description">{editorRef.current?.getHtml() as unknown as string}</p>
												</td>
											</tr>
											<tr>
												<th scope="row">
													{/* 파일 첨부 */}
													{t('board.attach_file')}
												</th>
												<td colSpan={3}>
													<p className="desc mb0.5">
														{/* 파일은 5MB 이하로 최대 3개까지 업로드 가능합니다.
												(확장자 : zip, pdf, docx, xlsx, jpg, jpeg, png, gif) */}
														{t('board.file_upload_condition')}
													</p>
													<FormField
														name={"noticeFiles"}
														component={CustomNoticeFile}
														multiple
														validExtensions={['zip', 'pdf', 'docx', 'xlsx', 'jpg', 'jpeg', 'png', 'gif']}
														fileIds={delFileIds}
														setDelFileIds={setDelFileIds}
														fileNames={fileNames}
														setFileNames={setFileNames}
													/>
												</td>
											</tr>
											<p hidden id="fileNames">{fileNames}</p>
											<tr>
												<th scope="row">
													{/* 팝업 여부 */}
													{t('board.popup_status')}
												</th>
												<td colSpan={3}>
													<FormField
														layout="horizontal"
														component={RadioGroup}
														name={'showPopup'}
														className="flex-gap-0.5-2"
														defaultValue={data.showPopup}
														data={[
															{ label: t('board.used'), value: true },
															{ label: t('board.not_used'), value: false },
														]}
													/>
												</td>
											</tr>
										</tbody>
									</table>

									{/* 등록 정보 */}
									<RegisterInfo formProps={formRenderProps} />

									{/* 하단 버튼 그룹 */}
									<div className="btn-group k-mt-10">
										<div className="group-align-right">
											<Button
												size={"large"}
												onClick={handleButtonClick}
												type="button"
											>
												{/* 팝업 미리보기 */}
												{t('board.popup_preview_button')}
											</Button>
											<Button
												type="button"
												onClick={() => navigate(-1)}
												size="large"
												fillMode="outline"
											>
												{/* 취소 */}
												{t('common.cancel')}
											</Button>
											<Button size="large" themeColor="primary">
												{/* 저장 */}
												{t('common.save')}
											</Button>
										</div>
									</div>
								</FormElement>
							</section>
						)}
					/>
				</>
			}
		</>
	);
}
