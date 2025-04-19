import * as React from "react";
import { useEffect, useState } from "react";
import { Form, FormElement, FormRenderProps, } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import { useMutation } from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "@progress/kendo-react-inputs";
import FormField from "@/new_components/common/FormField.tsx";
import { SaveGroupCode } from "@/utils/apiService/type/system/code/CodeRequestDto.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import { useTranslation } from "react-i18next";

export default function GroupCodeInfoAdd() {
  console.log('GroupCodeInfoAdd')
  const { t } = useTranslation();
  const showAlert = useAlert();
  const navigate = useNavigate();

  // groupCodeID 중복체크
  const [groupCode, setGroupCode] = useState('');
  const [isGcDuplicate, setIsGcDuplicate] = useState<boolean | null>(null);

  const [isUse, setIsUse] = useState<boolean>(true);

  const [groupCodeInfo, setGroupCodeInfo] = useState<SaveGroupCode>({ groupCode: "", value: "", groupCodeEng: "", description: "", isUse: "" });

  const checkDuplication = async () => {
    const isDuplicated = await CodeApiService().checkGroupIdDuplication(groupCode);
    console.log("isDuplicated", isDuplicated);
    if (isDuplicated.data) {
      showAlert({ message: t('system_code.group_code_duplication_alert') }) // '중복된 그룹 코드ID입니다.'
      setIsGcDuplicate(true)
    } else {
      showAlert({ message: t('system_code.available_group_code_alert') }) // '사용할 수 있는 그룹 코드ID입니다.'
      setIsGcDuplicate(false)
    }
  };

  const registGroupCode = useMutation({
    mutationFn: async () =>
      CodeApiService().createGroupCode(groupCodeInfo),
    onSuccess: (response: any) => {
      showAlert({ message: t('common.register_success') })
      navigate('/system/code/group');
    },
    onError: (error) => {
      console.log(error);
      showAlert({ message: error.message })
    },
  });

  useEffect(() => {
    setIsUse(true);
  }, []);

  const handelYnChange = (event: any) => {
    setIsUse(event.value);
  };

  const handleGroupCodeIdChange = (event: any) => {
    setIsGcDuplicate(true);
    setGroupCode(event.target.value);
  }

  const handleSubmit = (dataItem: Record<string, unknown>) => {
    console.log('dataItem::::::::::::', dataItem.groupCodeEng);

    const selectedIsUse = isUse;
    dataItem.isUse = selectedIsUse;

    if (dataItem.groupCode === undefined || dataItem.groupCode.trim().length < 1) {
      showAlert({ message: t('system_code.enter_group_code_id_alert') }) // '그룹코드ID를 입력해주세요.'
      return;
    }
    else if (isGcDuplicate === true) {
      showAlert({ message: t('station.check_duplicates_button') }); // '중복확인 버튼을 클릭하여 중복을 확인해주세요.'
      return;
    }
    else if (dataItem.value === undefined || dataItem.value.trim().length < 1) {
      showAlert({ message: t('system_code.enter_group_code_name_alert') }); // '그룹코드명을 입력해주세요.'
      return;
    }
    else if (dataItem.groupCodeEng === undefined || dataItem.groupCodeEng.trim().length < 1) {
      showAlert({ message: t('system_code.enter_group_code_eng_name_alert') }); // '그룹코드명(영문)을 입력해주세요.'
      return;
    }

    // if(!checkValidation(dataItem)) return;

    const createGroupCode: SaveGroupCode = {
      groupCode: dataItem.groupCode as string
      , value: dataItem.value as string
      , groupCodeEng: dataItem.groupCodeEng as string
      , description: dataItem.description as string
      , isUse: dataItem.isUse as boolean
    }

    console.log('createGroupCode', createGroupCode);
    showAlert({
      title: t('common.save'), // '저장'
			message: t('common.save_confirm'), // '저장하시겠습니까?'
      type: 'confirm',
      onConfirm: () => {
        setGroupCodeInfo(createGroupCode);
        registGroupCode.mutate();
      }
    })

  }


  return (
    <>
      {/* 그룹 코드 등록 */}
      <Header headName={t('system_code.group_code_registration')} />

      <Form
        ignoreModified={true}
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
                            onChange={handleGroupCodeIdChange}
                          />
                          <Button
                            size={"medium"}
                            fillMode="outline"
                            className="min-w-max px-4"
                            type="button"
                            onClick={checkDuplication}
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
                      <FormField
                        name={"value"}
                        className="in-input w310"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">
                      {/* 그룹 코드명(영문) */}
                      {t('system_code.group_code_name_eng')}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <FormField
                        name={"groupCodeEng"}
                        className="in-input w310"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">
                      {/* 설명 */}
                      {t('common.description')}
                    </th>
                    <td>
                      <FormField
                        name={"description"}
                        className="in-input w700"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {/* 사용여부 */}
                      {t('station.is_use')}
                    </th>
                    <td>
                      <RadioGroup
                        name={"isUse"}
                        layout="horizontal"
                        className="flex-gap-0.5-2"
                        defaultValue={true}
                        data={[
                          { label: "Y", value: true },
                          { label: "N", value: false },
                        ]}
                        onChange={handelYnChange}
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
  );
}
