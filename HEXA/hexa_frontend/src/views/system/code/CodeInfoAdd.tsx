import * as React from "react";
import { useEffect, useState } from "react";
import {
  Field,
  Form,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import { useMutation } from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "@progress/kendo-react-inputs";
import FormField from "@/new_components/common/FormField.tsx";
import { SaveCode } from "@/utils/apiService/type/system/code/CodeRequestDto.ts";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import CustomSelect from "@/new_components/form/CustomSelect.tsx";
import _ from "lodash";
import { useTranslation } from "react-i18next";

export default function CodeInfoAdd() {
  console.log("CodeInfoAdd");
  const { t } = useTranslation();
  const showAlert = useAlert();
  const navigate = useNavigate();

  // 그룹코드 list
  const [groupCodes, setGroupCodes] = useState<any[]>([]);

  const [code, setCode] = useState("");
  const [isCodeDuplicate, setIsCodeDuplicate] = useState<boolean | null>(null);

  const [codeInfo, setCodeInfo] = useState<SaveCode>({
    code: "",
    groupCode: "",
    value: "",
    codeEng: "",
    description: "",
    isUse: "",
  });

  const [isUse, setIsUse] = useState<boolean>(true);

  const setInitData = async () => {
    // 그룹코드ID
    const res = await CodeApiService().getGroupCodes();
    if (Array.isArray(res.data)) setGroupCodes(res.data);
  };

  const checkDuplication = async () => {
    const isDuplicated = await CodeApiService().checkIdDuplication(code);
    console.log(isDuplicated.data);
    if (isDuplicated.data) {
      showAlert({ message: t("system_code.code_duplication_alert") }); // '중복된 공통 코드ID입니다.'
      setIsCodeDuplicate(true);
    } else {
      showAlert({ message: t("system_code.available_code_alert") }); // '사용할 수 있는 공통 코드ID입니다.'
      setIsCodeDuplicate(false);
    }
  };

  useEffect(() => {
    setInitData();
    setIsUse(true);
  }, []);

  const handelYnChange = (event: any) => {
    setIsUse(event.value);
  };

  const registCommonCode = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    mutationFn: async () => CodeApiService().createCode(codeInfo),
    onSuccess: (response: any) => {
      showAlert({ message: t("common.register_success") });
      navigate(-1);
    },
    onError: (error) => {
      console.log(error);
      showAlert({ message: error.message });
    },
  });

  const handleCodeIdChange = (event: any) => {
    setIsCodeDuplicate(true);
    setCode(event.target.value);
  };

  const handleSubmit = (dataItem: Record<string, unknown>) => {
    dataItem.isUse = isUse;

    console.log("dataItem", dataItem);

    if (
      dataItem.groupCode === undefined ||
      dataItem.groupCode.trim().length < 1
    ) {
      showAlert({ message: t("system_code.select_group_code_alert") }); // '그룹코드를 선택해주세요.'
      return;
    } else if (dataItem.code === undefined || dataItem.code.trim().length < 1) {
      showAlert({ message: t("system_code.enter_common_code_id_alert") }); // '공통코드ID를 입력해주세요.'
      return;
    } else if (isCodeDuplicate === null || isCodeDuplicate) {
      showAlert({ message: t("user.check_duplicate_alert") }); // '중복확인 버튼을 클릭하여 중복을 확인해주세요.'
      return;
    } else if (isCodeDuplicate) {
      showAlert({ message: t("system_code.code_duplication_alert") }); // '중복된 공통코드ID 입니다.'
      return;
    } else if (
      dataItem.value === undefined ||
      dataItem.value.trim().length < 1
    ) {
      showAlert({ message: t("system_code.enter_common_code_name_alert") }); // '공통코드명을 입력해주세요.'
      return;
    } else if (
      dataItem.codeEng === undefined ||
      dataItem.codeEng.trim().length < 1
    ) {
      showAlert({ message: t("system_code.enter_common_code_eng_name_alert") }); // '공통코드명(영문)을 입력해주세요.'
      return;
    }
    if (dataItem.description == undefined) {
      dataItem.description = "";
    }

    const createCode: SaveCode = {
      code: dataItem.code as string,
      groupCode: dataItem.groupCode as string,
      value: dataItem.value as string,
      codeEng: dataItem.codeEng as string,
      description: dataItem.description as string,
      isUse: isUse as boolean,
    };

    console.log("저장될 데이터: ", createCode);
    showAlert({
      title: t("common.save"),
      message: t("common.save_confirm"),
      type: "confirm",
      onConfirm: () => {
        setCodeInfo(createCode);
        registCommonCode.mutate();
      },
    });
  };

  return (
    <>
      {/* 공통 코드 등록 */}
      <Header
        headName={t("system_code.common_code_registration")}
        descrption={""}
      />

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
                      {/* 그룹 코드 */}
                      {t("system_code.group_code")}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <FormField
                        name={"groupCode"}
                        component={CustomSelect}
                        data={groupCodes}
                        textField="groupCode"
                        dataItemKey="groupCode"
                        defaultItem={{
                          value: null,
                          groupCode: t("system_code.select_group_code"),
                        }} // '그룹 코드 선택'
                        className="w200"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {/* 공통 코드ID */}
                      {t("system_code.common_code_id")}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <div className="inner-item mw400">
                          <FormField
                            name={"code"}
                            onChange={handleCodeIdChange}
                          />
                          <Button
                            size="medium"
                            fillMode="outline"
                            className="min-w-max px-4"
                            type="button"
                            onClick={checkDuplication}
                          >
                            {t("station.check_duplicates")}
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {/* 공통 코드명 */}
                      {t("system_code.common_code_name")}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input w310">
                        <FormField
                          name={"value"}
                          // validation={true}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {/* 공통 코드명(영문) */}
                      {t("system_code.common_code_name_eng")}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input w310">
                        <FormField
                          name={"codeEng"}
                          // validation={true}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">
                      {/* 설명 */}
                      {t("common.description")}
                    </th>
                    <td>
                      <div className="in-input w700">
                        <FormField name={"description"} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {/* 사용여부 */}
                      {t("station.is_use")}
                    </th>
                    <td>
                      <RadioGroup
                        name={"isUse"}
                        className="flex-gap-0.5-2"
                        layout="horizontal"
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
                  {t("common.cancel")}
                </Button>
                <Button size="large" themeColor="primary">
                  {/* 저장 */}
                  {t("common.save")}
                </Button>
              </div>
            </div>
          </FormElement>
        )}
      />
    </>
  );
}
