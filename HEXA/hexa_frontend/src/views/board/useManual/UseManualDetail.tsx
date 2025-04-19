import * as React from "react";
import { useEffect, useState } from "react";
import { Field, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import { useMutation } from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { numberValidator, requiredValidator, stringLengthValidator } from "@/utils/Validators.ts";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import ButtonGroup from "@/new_components/common/ButtonGroup.tsx";
import { UseManualRequestDto } from "@/utils/apiService/type/board/UseManualRequestDto.ts";
import UseManualApiService from "@/utils/apiService/board/UseManualApiService.ts";
import { RadioGroup } from "@progress/kendo-react-inputs";
import { UseManualResponseDto } from "@/utils/apiService/type/board/UseManualResponseDto.ts";
import { getFormattedTime } from "@/utils/common.ts";
import FormField from "@/new_components/common/FormField.tsx";
import RegisterInfo from "@/views/station/components/RegisterInfo";
import CustomManualFile from "../notice/components/CustomManualFile";
import { UploadFileInfo, UploadFileStatus } from "@progress/kendo-react-upload";
import { useTranslation } from "react-i18next";
import CustomSelect from "@/new_components/form/CustomSelect";

export default function UseManualDetail() {
  const { t } = useTranslation();
  const { state } = useLocation();
  console.log('state', state)
  console.log('UseManualAModify')
  const showAlert = useAlert();
  const navigate = useNavigate();
  const [useManualInfo, setUseManualInfo] = useState<UseManualRequestDto>({
    title: "", isUsed: "", usFile: ""
  });
  const [data, setData] = useState<UseManualResponseDto>({
    id: 0,
    title: "",
    isUsed: true,
    category: "",
    file: "",
    createdAt: new Date(),
    createdUserId: "",
    updatedAt: new Date(),
    updatedUserId: ""
  })
  const [isLoading, setIsLoading] = useState(true);

  const registUseManual = async (dataItem: any) => {
    const formData = new FormData();

    const saveDtoJson = {
      'title' : dataItem.title
      , 'isUsed' : dataItem.isUsed
      , 'category' : dataItem.category
    }

    formData.append('saveUseManual', JSON.stringify(saveDtoJson))

    formData.append('usFile', dataItem.usFile[0] as File);

    for (let pair of formData.entries()) {
			console.log('폼데이터 :', `${pair[0]}: ${pair[1]}`);
		}

    try {
			const res = await UseManualApiService().updateUseManual(BigInt(data.id), formData);
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

  const handleSubmit = (dataItem: Record<string, unknown>) => {

    if(!dataItem.title) {
      showAlert({message: t('board.enter_title_alert')})
      return false;
    }
    else if(!dataItem.usFile || (dataItem.usFile as File[]).length === 0) {
    	showAlert({message: t('board.file_attach_alert')})
    	return false;
    }

    showAlert({
			title: t('common.modify'),
			message: t('common.modify_confirm'),
			onConfirm: () => {
				registUseManual(dataItem);
			}
		})
  }

  const getUseManualById = async (id: number) => {
    const response: UseManualResponseDto = await UseManualApiService().getUseManualById(id);
    console.log('useManualInfo', response);
    console.log('filename : ', response.file.fileName);
    const updatedResponse = {
			...response,
			usFile: [
				{
					name: response.file.fileName,
					size: 1000,
					uid: response.id,
          status: UploadFileStatus.Selected,
          progress: 100,
          getRawFile: undefined,
          extension: '.' + response.file.extension
				}
			]
		};
    setData(updatedResponse);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getUseManualById(state!);
  }, []);

  const handleDelete = async () => {
    console.log('handleDelete');
    showAlert({
      // '해당 게시물을 삭제하시겠습니까?'
      message: (t('board.delete_alert')),
      type: 'confirm',
      onConfirm: () => UseManualApiService().deleteUseManual(state).then(() => {
        navigate('/board/use-manual');
      })
    })
  }

  return (
    <>
      {!isLoading &&
        <>
          {/* 매뉴얼 상세 */}
          <Header headName={t('board.manual_details')} descrption={""} />
          <Form
            initialValues={data}
            onSubmit={handleSubmit}
            render={(formRenderProps: FormRenderProps) => (
              <FormElement>
                <section className="section">
                  <table className="tbl-base">
                    <colgroup>
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "50%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "30%" }} />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">
                          {/* 구분 */}
                          {t('common.category')}
                          <span className="required">
                            <span className="sr-only">필수</span>
                          </span>
                        </th>
                        <td colSpan={3}>
                          <FormField
                            name={"category"}
                            component={CustomSelect}
                            data={[
                              {code: '사용자 매뉴얼', value: t('board.user_manual')},
                              {code: '운영자 매뉴얼', value: t('board.operator_manual')}
                            ]}
                            // textField="category"
                            // dataItemKey="category"
                            noSelectDefault={true}
                            // defaultItem={{value: null, category: data.category}}
                            className="w400"
                          />
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
                        <td>
                          <FormField
                            name={"title"}
                            // validation={true}
                            // validator={(value) => numberValidator(value) || stringLengthValidator(value, 5)}
                            value={data.title}
                          />
                        </td>
                        <th scope="row">
                          {/* 사용여부 */}
                          {t('station.is_use')}
                          <span className="required">
                            <span className="sr-only">필수</span>
                          </span>
                        </th>
                        <td>
                          <FormField
                            layout="horizontal"
                            component={RadioGroup}
												    name={'isUsed'}
                            defaultValue={data.isUsed}
                            data={[
                              { label: t('board.used'), value: true }, //사용
                              { label: t('board.not_used'), value: false }, //미사용
                            ]}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          {/* 파일 첨부 */}
                          {t('board.attach_file')}
                          <span className="required">
                            <span className="sr-only">필수</span>
                          </span>
                        </th>
                        <td colSpan={3}>
                          <FormField
                            name={"usFile"}
                            component={CustomManualFile}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                {/* 등록 정보 */}
                <RegisterInfo formProps={formRenderProps} />

                {/* 하단 버튼 그룹 */}
                <div className="btn-group k-mt-10">
                  <div className="group-align-right">
                    <Button
                      size={"large"}
                      type="button"
                      onClick={handleDelete}
                    >
                      {/* 삭제 */}
                      {t('common.delete')} 
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
            )}
          />
        </>
      }
    </>
  );
}
