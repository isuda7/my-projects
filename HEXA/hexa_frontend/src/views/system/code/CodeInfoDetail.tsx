import * as React from "react";
import { useEffect, useState } from "react";
import { Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import { useMutation } from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonGroup from "@/new_components/common/ButtonGroup.tsx";
import { RadioGroup } from "@progress/kendo-react-inputs";
import { getFormattedTime } from "@/utils/common.ts";
import FormField from "@/new_components/common/FormField.tsx";
import { SaveCode } from "@/utils/apiService/type/system/code/CodeRequestDto";
import { CodeResponseDto } from "@/utils/apiService/type/system/code/CodeResponseDto";
import CodeApiService from "@/utils/apiService/CodeApiService";
import { useTranslation } from "react-i18next";
import CustomSelect from "@/new_components/form/CustomSelect";
import RegisterInfo from "@/new_components/common/RegisterInfo";

export default function CodeinfoDetail() {
  const { state } = useLocation();
  const { t } = useTranslation();
  console.log("state", state);
  console.log("CodeInfoDetail");
  const showAlert = useAlert();
  const navigate = useNavigate();
  const [isCodeDuplicate, setIsCodeDuplicate] = useState<boolean | null>(null);
  const [code, setCode] = useState("");
  const [codeInfo, setCodeInfo] = useState<SaveCode>({
    groupCode: "",
    code: "",
    value: "",
    codeEng: "",
    description: "",
    isUse: true,
  });
  const [data, setData] = useState<CodeResponseDto>({
    code: "",
    groupCode: "",
    codeEng: "",
    description: "",
    isUse: "",
    value: "",
    createdAt: new Date(),
    createdUserId: "",
    updateAt: new Date(),
    updatedUserId: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [groupCodes, setGroupCodes] = useState<any[]>([]);
  // const [isUse, setIsUse] = useState<boolean>(true);
  const [codeId, setCodeId] = useState("");

  const setInitData = async () => {
    // 그룹코드ID set
    const res = await CodeApiService().getGroupCodes();
    console.log(res.data);
    if (Array.isArray(res.data)) setGroupCodes(res.data);
  };

  const registCommonCode = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    mutationFn: async () =>
      CodeApiService().updateCommonCode(state.code, state.groupCode, codeInfo),
    onSuccess: (response: any) => {
      showAlert({ 
        message: t("common.modify_success"), //수정되었습니다.
        onConfirm: () => navigate(-1)
      }); 
    },
    onError: (error) => {
      console.log(error);
      showAlert({ message: error.message });
    },
  });

  const checkDuplication = async () => {
    const isDuplicated = await CodeApiService().checkIdDuplication(code);
    console.log("중복결과? ", isDuplicated);
    if (isDuplicated.data) {
      showAlert({ message: t("system_code.code_duplication_alert") }); // '중복된 공통 코드ID입니다.'
      setIsCodeDuplicate(true);
    } else {
      showAlert({ message: t("system_code.available_code_alert") }); // '사용할 수 있는 공통 코드ID입니다.'
      setIsCodeDuplicate(false);
    }
  };

  const handleSubmit = (dataItem: Record<string, unknown>) => {
    if (
      dataItem.groupCode === undefined ||
      dataItem.groupCode.trim().length < 1
    ) {
      showAlert({ message: t("system_code.select_group_code_alert") }); // '그룹코드를 선택해주세요.'
      return;
    } else if (dataItem.code === undefined || dataItem.code.trim().length < 1) {
      showAlert({ message: t("system_code.enter_common_code_id_alert") }); // '공통코드ID를 입력해주세요.'
      return;
    } else if (dataItem.code !== codeId) {
      if (isCodeDuplicate === null || isCodeDuplicate) {
        showAlert({ message: t("user.check_duplicate_alert") }); // '중복확인 버튼을 클릭하여 중복을 확인해주세요.'
        return;
      }
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

    const updateData: SaveCode = {
      groupCode: dataItem.groupCode as string,
      code: dataItem.code as string,
      value: dataItem.value as string,
      codeEng: dataItem.codeEng as string,
      description: dataItem.description as string,
      isUse: dataItem.isUse as boolean,
    };
    console.log("updateData ", updateData);
    // title: '수정',
    // message: '수정하시겠습니까?',
    showAlert({
      title: t("common.modify"),
      message: t("common.modify_confirm"),
      onConfirm: () => {
        setCodeInfo(updateData);
        registCommonCode.mutate();
      },
    });
  };

  const getCommonCodeByCode = async (code: string, groupCode: string) => {
    const response: CodeResponseDto =
      await CodeApiService().getCommonCodeByCode(code, groupCode);
    console.log("codeInfo: ", response.data);
    setData(response.data);
    setCodeId(response.data.code);
    setIsLoading(false);
  };

  const handleCodeIdChange = (event: any) => {
    setIsCodeDuplicate(true);
    setCode(event.target.value);
  };

  useEffect(() => {
    setInitData();
    setIsLoading(true);
    setIsCodeDuplicate(true);
    getCommonCodeByCode(state.code!, state.groupCode!);
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          {/* 공통 코드 상세 */}
          <Header
            headName={t("system_code.common_code_details")}
            descrption={""}
          />
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
                          {/* 그룹 코드 */}
                          {t("system_code.group_code")}
                          <span className="required">
                            <span className="sr-only">필수</span>
                          </span>
                        </th>
                        <td>
                          <FormField
                            className="w200"
                            name={"groupCode"}
                            component={CustomSelect}
                            data={groupCodes}
                            textField="groupCode"
                            dataItemKey="groupCode"
                            validation={true}
                            noSelectDefault={true}
                            // defaultItem={{ value: null, groupCode: data.groupCode }}
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
                                // onChange={(event: any) => setCode(event.target.value)}
                                onChange={handleCodeIdChange}
                                // validator={(value) => numberValidator(value) || stringLengthValidator(value, 5)}
                                value={data.code}
                              />
                              <Button
                                size={"medium"}
                                fillMode="outline"
                                className="min-w-max px-4"
                                type="button"
                                onClick={checkDuplication}
                              >
                                {/* 중복 확인 */}
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
                              // validator={(value) => numberValidator(value) || stringLengthValidator(value, 5)}
                              value={data.value}
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
                            <FormField name={"codeEng"} value={data.codeEng} />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          {/* 설명 */}
                          {t("common.description")}
                        </th>
                        <td>
                          <div className="in-input w310">
                            <FormField
                              name={"description"}
                              // validation={true}
                              // validator={(value) => numberValidator(value) || stringLengthValidator(value, 5)}
                              value={data.description}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          {/* 사용여부 */}
                          {t("station.is_use")}
                        </th>
                        <td>
                          <FormField
                            className="flex-gap-0.5-2"
                            component={RadioGroup}
                            name={'isUse'}
                            layout="horizontal"
                            defaultValue={data.isUse}
                            data={[
                              { label: "Y", value: true },
                              { label: "N", value: false },
                            ]}
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
      )}
    </>
  );
}
