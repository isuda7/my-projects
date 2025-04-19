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
import { RadioGroup } from "@progress/kendo-react-inputs";
import { getFormattedTime } from "@/utils/common.ts";
import FormField from "@/new_components/common/FormField.tsx";
import { SaveGroupCode } from "@/utils/apiService/type/system/code/CodeRequestDto";
import { GroupCodeResponseDto } from "@/utils/apiService/type/system/code/CodeResponseDto";
import CodeApiService from "@/utils/apiService/CodeApiService";
import RegisterInfo from "@/new_components/common/RegisterInfo";
import { useTranslation } from "react-i18next";

export default function GroupCodeinfoDetail() {
  const { t } = useTranslation();
  const { state } = useLocation();
  console.log('state', state)
  console.log('GroupCodeInfoDetail')
  const showAlert = useAlert();
  const navigate = useNavigate();
  // const [groupCode, setGroupCode] = useState('');

  const [isUse, setIsUse] = useState(true);

  const [updateGcInfo, setUpdateGcInfo] = useState<SaveGroupCode>({
    groupCode: "", value: "", groupCodeEng: "", description: "", isUse: ""
  });
  const [data, setData] = useState<GroupCodeResponseDto>({
    groupCode: "",
    groupCodeEng: "",
    value: "",
    description: "",
    isUse: false,
    createdAt: new Date(),
    createdUserId: "",
    updateAt: new Date(),
    updatedUserId: ""
  })
  const [isLoading, setIsLoading] = useState(true);

  const registGroupCode = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    mutationFn: async () =>
      CodeApiService().updateGroupCode(state, updateGcInfo),
    onSuccess: (response: any) => {
      showAlert({ 
        message: t("common.modify_success"), //수정되었습니다.
        onConfirm: () => navigate(-1)
      }); 
    },
    onError: (error) => {
      console.log(error);
      showAlert({ message: error.message })
    },
  });

  const getGroupCodeById = async (groupCode: string) => {
    const response: GroupCodeResponseDto = await CodeApiService().getGroupCodeById(groupCode);
    console.log('groupCodeInfo', response.data);
    setData(response.data);
    setIsUse(response.data.isUse);
    setIsLoading(false);
  }

  // const handleIsUseChange = (e: any) => {
  //   setIsUse(e.value);
  // }

  const handleSubmit = (dataItem: Record<string, unknown>) => {
    // const selectedIsUse = isUse;

    if (dataItem.value === undefined || dataItem.value.trim().length < 1) {
      showAlert({ message: t('system_code.enter_group_code_name_alert') }); // '그룹코드명을 입력해주세요.'
      return;
    }
    else if (!dataItem.groupCodeEng === undefined || dataItem.groupCodeEng.trim().length < 1) {
      showAlert({ message: t('system_code.enter_group_code_eng_name_alert') }); // '그룹코드명(영문)을 입력해주세요.'
      return;
    }

    const updateData: SaveGroupCode = {
      groupCode: dataItem.groupCode as string
      , value: dataItem.value as string
      , groupCodeEng: dataItem.groupCodeEng as string
      , description: dataItem.description as string
      , isUse: dataItem.isUse as boolean
    };
    console.log('updateData ', updateData)
    // title: '수정',
    // message: '수정하시겠습니까?',
    showAlert({
      title: t('common.modify'),
      message: t('common.modify_confirm'),
      onConfirm: () => {
        setUpdateGcInfo(updateData)
        registGroupCode.mutate();
      }
    })
  }

  useEffect(() => {
    setIsLoading(true);
    getGroupCodeById(state!);
  }, []);

  return (
    <>
      {!isLoading &&
        <>
          {/* 그룹 코드 상세 */}
          <Header headName={t('system_code.group_code_details')} descrption={""} />
          <Form
            initialValues={data}
            onSubmit={handleSubmit}
            render={(formRenderProps: FormRenderProps) => (
              <FormElement>
                <section className="section">
                  <table className="tbl-base">
                    <colgroup>
                      <col style={{ width: "20%" }} />
                      <col style={{ width: "80%" }} />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row">
                          {/* 그룹 코드ID */}
                          {t('system_code.group_code_id')}
                          <span className="required">
                            <span className="sr-only">필수</span>
                          </span>
                        </th>
                        <td>
                          <div className="in-input">
                            <div className="inner-item mw400">
                              <FormField
                                name={"groupCode"}
                                // onChange={(event) => setGroupCode(event.target.value)}
                                className="disabled"
                              />
                              <Button
                                size={"medium"}
                                fillMode="outline"
                                className="min-w-max px-4 disabled"
                                type="button"
                              >
                                {/* 중복 확인 */}
                                {t('station.check_duplicates')}
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          {/* 그룹 코드명 */}
                          {t('system_code.group_code_name')}
                          <span className="required">
                            <span className="sr-only">필수</span>
                          </span>
                        </th>
                        <td>
                          <div className="in-input w310">
                            <FormField
                              name={"value"}
                              // validation={true}
                              value={data.value}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          {/* 그룹 코드명(영문) */}
                          {t('system_code.group_code_name_eng')}
                          <span className="required">
                            <span className="sr-only">필수</span>
                          </span>
                        </th>
                        <td>
                          <div className="in-input w310">
                            <FormField
                              name={"groupCodeEng"}
                              value={data.groupCodeEng}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"> 
                          {/* 설명 */}
                          {t('common.description')}  
                        </th>
                        <td>
                          <div className="in-input w310">
                            <FormField
                              name={"description"}
                              value={data.description}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          {/* 사용여부 */}
                          {t('station.is_use')}
                        </th>
                        <td>
                          <FormField
                            component={RadioGroup}
                            className="flex-gap-0.5-2"
                            name={"isUse"}
                            layout="horizontal"
                            defaultValue={data.isUse}
                            data={[
                              { label: "Y", value: true },
                              { label: "N", value: false },
                            ]}
                            // onChange={handleIsUseChange}
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
                      type="button"
                      onClick={() => window.history.back()}
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
