import * as React from "react";
import {useEffect, useState, useRef} from "react";
import {Field, FieldWrapper, Form, FormElement, FormRenderProps,} from "@progress/kendo-react-form";
import {Button} from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert.tsx";
import {useNavigate} from "react-router-dom";
import {DatePicker} from "@progress/kendo-react-dateinputs";
import {NoticeRequestDto} from "@/utils/apiService/type/board/NoticeRequestDto.ts";
import NoticeApiService from "@/utils/apiService/board/NoticeApiService.ts";
import {RadioGroup} from "@progress/kendo-react-inputs";
import FileForm from "@/views/station/components/FileForm.tsx";
import FormField from "@/new_components/common/FormField.tsx";
import Editor from "@/new_components/common/Editor";
import { useTranslation } from "react-i18next";
import CustomNoticeFile from "./components/CustomNoticeFile";
import { getCurrentDate, getFormattedTime } from "@/utils/common";

export default function NoticeAdd() {
	console.log('NoticeAdd')
  const { t } = useTranslation(); 
	const showAlert = useAlert();
	const navigate = useNavigate();
	// const [noticeInfo, setNoticeInfo] = useState<NoticeRequestDto>({isPinned: "", postStartDate: "", postEndDate: "", title: "", descriptrion: "", noticeFiles: "", showPopup: ""});
	const [popupCount, setPopupCount] = useState<number>(0);
 	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const editorRef = useRef<{ getHtml: () => void; }>(null);
	const [fileNames, setFileNames] = useState<Array<string>>([]);

	// console.log("noticeInfo: " + JSON.stringify(noticeInfo));

	const handleStartDateChange = (event: any) => {
		setStartDate(event.value);
	}

	const handleEndDateChange = (event: any) => {
		setEndDate(event.value);
	}

	const [delFileIds, setDelFileIds] = useState<Array<string>>([]);

	startDate.setHours(0, 0, 0, 0);

	const currentDate = new Date();
	endDate.setMonth(currentDate.getMonth() + 1);
	endDate.setHours(23, 59, 59, 999);
	
	const registNotice = async (dataItem: any) => {
	
		// 파일 세팅
		const formData = new FormData();

		const postStartDate = dataItem.postStartDate.getTime().toString();
		const postEndDate = dataItem.postEndDate.getTime().toString();

		if(dataItem.noticeFiles){
			dataItem.noticeFiles.forEach((file : any) => {
				formData.append("noticeFiles", file as File);
			});
		}

		const saveDtoJson = {
			'title': dataItem.title as string
			, 'postStartDate' : postStartDate
			, 'postEndDate' : postEndDate
			, 'description': dataItem.description
			, 'isPinned': dataItem.isPinned
			, 'showPopup': dataItem.showPopup
		}
		formData.append('saveDto', JSON.stringify(saveDtoJson))

		for (let pair of formData.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`);
		}

		try{
			const res = await NoticeApiService().createNotice(formData);
			console.log('registerNotice response - ', res)
			showAlert({message: t('common.register_success'), //등록되었습니다
				onConfirm: () => {
					navigate(-1)
				}
			}) 
		}
		catch (error) {
			if (error instanceof Error) showAlert({message: error.message});
		}
	}

	const getCount = async() => {
		const res = await NoticeApiService().getPopupCount();
		// console.log('팝업갯수 : ', res.data);
		return res.data;
	}

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const count = await getCount();
				// console.log(typeof count);
				if(typeof count === 'number'){
					setPopupCount(count);
				}
				console.log('Fetched Count: ', count);
			} catch (error) {
				console.error('Failed to fetch popup count: ', error);
			}
		};
		fetchCount();
	}, [])	

	const testView = () => {
		const des = editorRef.current?.getHtml() as unknown as string;
		console.log('des: ', document.getElementById("description"));
		const newWindow = window.open(`${window.location.origin}/board/notice/popup`);
		if (newWindow) {
			newWindow.open();
			newWindow.document.close();
		}
	}

	const handleSubmit = async (dataItem: Record<string, unknown>) => {
		console.log('저장클릭');
	
		const des = editorRef.current?.getHtml() as unknown as string;

		dataItem.postStartDate = startDate;
		dataItem.postEndDate = endDate;
		dataItem.description = des;
		console.log('startDate', startDate.getTime())
		console.log('endDate', endDate.getTime())

		if(!dataItem.title) {
			showAlert({message: t('board.enter_title_alert')}) // 제목을 입력해주세요.
			return false;
		}
		else if(dataItem.description === "<p></p>") {
			showAlert({message: t('board.enter_content_alert')}) // 내용을 입력해주세요.
			return false;
		}
		else if(startDate.getTime() > endDate.getTime()) {
			showAlert({message: t('board.posting_period_alert')}) // 게시 기간을 다시 선택해주세요.
			return false;
		}

		if(dataItem.showPopup && popupCount >= 3){
			showAlert({message: t('board.file_maximum_3_alert')}) // 첨부 파일은 최대 3개까지 가능합니다.
			return false;
		}

		console.log('dataItem', dataItem);

		showAlert({
			title: t('common.save'),
			message: t('common.save_confirm'),
			type:'confirm',
			onConfirm: () => registNotice(dataItem),
		})		
	}

	return (
		<>
			{/* 공지사항 등록 */}
			<Header headName={t('board.notice_registration')}/>

			<Form
				ignoreModified={true}
				onSubmit={handleSubmit}
				render={(formRenderProps: FormRenderProps) => (
					<FormElement>
						<section className="section">
							<table className="tbl-base">
								<colgroup>
									<col style={{width: "10%"}}/>
									<col style={{width: "40%"}}/>
									<col style={{width: "13%"}}/>
									<col style={{width: "37%"}}/>
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
											defaultValue={0}
											data={[
												{label: t('board.used'), value: 1},
												{label: t('board.not_used'), value: 0},
											]}
										/>
									</td>
									<th scope="row">
										{/* 게시기간 */}
										{t('board.posting_period')}
										<span className="required">
										  <span className="sr-only">필수</span>
										</span>
									</th>
									<td>
										<span className="datepicker">
											<span className="cell">
												<DatePicker
                          name={"postStartDate"}
                          format={"yyyy-MM-dd"}
													defaultValue={new Date()}
													onChange={handleStartDateChange}
											/>
										</span>
                    ~
                    <span className="cell">
                      <DatePicker
                        name={"postEndDate"}
                        format={"yyyy-MM-dd"}
												defaultValue={endDate}
												onChange={handleEndDateChange}
                      />
                    </span>
                  </span>
									</td>
								</tr>
								<tr>
									<th scope="row">
										{/* 제목 */}
										{t('board.title')}
										<span className="required">
										  <span className="sr-only">필수</span>
										</span>
									</th>
									<td colSpan={3}>
                    <div className="in-input">
                      <FormField
												id={"title"}
                        name={"title"}
												maxlength={100}
                      />
                    </div>
									</td>
								</tr>
								<tr>
									<th scope="row">
										{/* 내용 */}
										{t('board.content')}
										<span className="required">
										  <span className="sr-only">필수</span>
										</span>
									</th>
									<td colSpan={3}>
										<Editor
											ref={editorRef}
											contentStyle={{
												height: 320,
											}}
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
											{/* 파일은 5MB 이하로 최대 3개까지 업로드 가능합니다. (확장자 : zip, pdf, docx, xlsx, jpg, jpeg, png, gif) */}
											{t('board.file_upload_condition')}
										</p>
										<FormField
											name={"noticeFiles"}
											component={CustomNoticeFile}
											multiple
											validExtensions={["zip", "pdf", "docx", "xlsx", "jpg", "jpeg", "png", "gif"]}
											setDelFileIds={setDelFileIds}
											fileNames = {fileNames}
											setFileNames = {setFileNames}
											// onChange={(e: any) => onChangeFile(e, formRenderProps)}
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
											defaultValue={false}
											data={[
												{label: t('board.used'), value: true},
												{label: t('board.not_used'), value: false},
											]}
										/>
									</td>
								</tr>
								</tbody>
							</table>
              {/* 하단 버튼 그룹 */}
							<div className="btn-group k-mt-10">
								<div className="group-align-right">
									<Button size={"large"}
										onClick={testView}
										type="button"
									>
										{/* 팝업 미리보기 */}
										{t('board.popup_preview_button')}
										</Button>
									<Button
										onClick={() => window.history.back()}
										size="large"
										fillMode="outline"
										type="button"
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
						</section>

					</FormElement>
				)}
			/>


		</>
	);
}
