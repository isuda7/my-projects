import * as React from "react";
import { useState, useEffect } from "react";
import { Field, Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import { useMutation } from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import { useNavigate } from "react-router-dom";
import { numberValidator, requiredValidator, stringLengthValidator } from "@/utils/Validators.ts";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import ButtonGroup from "@/new_components/common/ButtonGroup.tsx";
import { UseManualRequestDto } from "@/utils/apiService/type/board/UseManualRequestDto.ts";
import UseManualApiService from "@/utils/apiService/board/UseManualApiService.ts";
import { Input, RadioGroup } from "@progress/kendo-react-inputs";
import { Upload } from "@progress/kendo-react-upload";
import FormField from "@/new_components/common/FormField.tsx";
import { useTranslation } from "react-i18next";
import CustomUpload from "@/new_components/form/CustomUpload";
import CustomManualFile from "../notice/components/CustomManualFile";
import CustomSelect from "@/new_components/form/CustomSelect";

export default function UseManualAdd() {
  console.log('BatteryInfoAdd')
  const { t } = useTranslation();
  const showAlert = useAlert();
  const navigate = useNavigate();

  const [useManualInfo, setUseManualInfo] = useState<UseManualRequestDto>({ title: "", isUsed: "", usFile: "" });

  const onSave = async (dataItem: any) => {
    const formData = new FormData();

    // 파일 세팅
    formData.append('usFile', dataItem.usFile[0] as File);

    const isUsed = dataItem.isUsed == null ? true : dataItem.isUsed;
    // 나머지 값 세팅
    const saveDtoJson = {
      'title' : dataItem.title
      , 'isUsed' : isUsed
      , 'category' : dataItem.category
    }
    formData.append('saveDto', JSON.stringify(saveDtoJson))

    for (let pair of formData.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`);
		}

    try {
      const res = await UseManualApiService().createUseManual(formData);
      console.log('registerUseManual response', res);
      showAlert({ message: t('common.register_success'), //등록되었습니다
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
    console.log('dataItem', dataItem);

    if(!dataItem.usFile || (dataItem.usFile as File[]).length === 0) {
    	showAlert({message: t('board.file_attach_alert')}) // 파일을 첨부해주세요.
    	return false;
    }
    else if(!dataItem.category){
      showAlert({message: t("board.select_category_alert")}) 
    	return false;
    }
    else if(!dataItem.title){
    	showAlert({message: t('board.enter_title_alert')}) // 제목을 입력해주세요.
    	return false;
    }

    showAlert({
      title: t('common.save'),
      message: t('common.save_confirm'), 
      type: 'confirm',
      onConfirm: () => onSave(dataItem)
    })
  }

  return (
    <>
      {/* 매뉴얼 등록 */}
      <Header headName={t('board.manual_registration')} /> 
      <Form
        ignoreModified={true}
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
                          {code: '운영자 매뉴얼', value: t('board.operator_manual')},
                        ]}
                        // textField="category"
                        // dataItemKey="category"
                        defaultItem={{value: null, category: t('common.select')}}
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
                      <div className="in-input">
                        <FormField
                          name={"title"}
                        />
                      </div>
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
                        className="flex-gap-0.5-2"
                        defaultValue={true}
                        data={[
                          {label: t('board.used'), value: true}, // 사용
                          {label: t('board.not_used'), value: false}, //미사용
                        ]}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {/* 파일첨부 */}
                      {t('board.attach_file')}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td colSpan={3}>
                      <p className="desc mb0.5">
                        {/* 파일은 50MB 이하로 최대 1개 업로드 가능합니다. */}
                        {t('board.manual_size_alert')}
                      </p>
                      <FormField
                        name={"usFile"}
                        component={CustomManualFile}
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
          </FormElement>
        )}
      />
    </>
  );
}
