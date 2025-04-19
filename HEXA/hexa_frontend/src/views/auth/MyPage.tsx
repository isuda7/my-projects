// HEXAADMCOM2S00 : 마이 페이지

/* React */
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Kendo UI */
import { Label } from "@progress/kendo-react-labels";
import { Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import Header from "@/new_components/common/Header.tsx";
import { getCookie } from "@/utils/common";
import useAlert from "@/hooks/useAlert.tsx";
import { useTranslation } from "react-i18next";
import FormField from "@/new_components/common/FormField";

/* Types */
import PwdCheckModal from "@/new_components/auth/PwdCheckModal.tsx";
import UserApiService from "@/utils/apiService/UserApiService";
import CustomSelect from "@/new_components/form/CustomSelect";
import { setUser } from "@/store/modules/userStore";
import { numberValidator } from "@/utils/Validators";

export default function Mypage() {
  const { t } = useTranslation();
  const showAlert = useAlert();
  //const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [userInfo, setUserInfo] = useState<any>({
    id: "",
    userId: "",
    userName: "",
    email: "",
    cellPhone: "",
    isActive: true,
    isLock: false,
    roleGroupName: "",
    roleGroupId: "",
    roleCodeName:"",
    createdAt: new Date(),
    createdUserId: "",
    updatedAt: new Date(),
    updatedUserId: "",
    emailId: "",
    domain: "",
  });

  const [emailId, setEmailId] = useState("");
  const [domain, setDomain] = useState("");

  useEffect(() => {
    if (!visible) {
      getUserInfo(getCookie("id") as string);
    }
  }, [visible]);

  useEffect(() => {
    console.log("domain", domain)
    console.log('email', emailId)
  },[domain])

  const getUserInfo = async (userId: string) => {
    setUserInfo(undefined);
    const result = await UserApiService().getUserByUserId(userId);
    if (
      result.email !== null &&
      result.email !== undefined &&
      result.email.trim().length > 0
    ) {
      const [emailId, domain] = result.email.split("@");
      result.emailId = emailId;
      result.domain = domain;
    }
    console.log("result", result)
    setUserInfo(result);
    setEmailId(result.emailId as string);
    setDomain(result.domain as string);
  };

  const onChange = (event: any) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeEmailId = (e: any) => {
    const emailId = e.target.value;
    setEmailId(emailId);
  };

  const onChangeDmain = (e: any) => {
    const domain = e.target.value;
    if (typeof domain === "object" && domain.domain) {
      setDomain(domain.domain);
    } else {
      setDomain(domain.toString());
    }
  };

  const updateMyInfo = async (userInfo: any) => {

    // 여기서 email형식으로 update해서 수정
    let updatedUserInfo = {
      ...userInfo,
      email: `${emailId}@${domain}`,
    };

    if (domain === t('common.select') || !domain) {
      updatedUserInfo = {
        ...userInfo,
        email: null,
      };
    }
    try {
      const result = await UserApiService().updateUser(
        userInfo.userId,
        updatedUserInfo
      );
      showAlert({ message: t("common.modify_success") });
      //navigate(-1);
    } catch (error) {
      if (error instanceof Error) showAlert({ message: error.message });
    }
  };

  /* 경고 메세지 */
  const [alertMessage, setAlertMessage] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (userInfo: any) => {
    setAlertMessage({
      name: "",
      phone: "",
      email: "",
    });

    if (!userInfo.userName) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 이름을 입력해주세요. */
        name: t("user.enter_user_name_alert"),
      }));
    }
    if (!userInfo.cellPhone) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 휴대폰 번호를 입력해주세요. */
        phone: t("common.enter_cellphone"),
      }));
    }
    if (emailId && domain == t('common.select')) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 이메일을 정확하게 입력해주세요. */
        email: t("common.check_email"),
      }));
    }

    if (!emailId && domain !== t('common.select')) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 이메일을 정확하게 입력해주세요. */
        email: t("common.check_email"),
      }));
    }

    if (!/^[0-9]{10,11}$/.test(userInfo.cellPhone)) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 휴대폰 번호를 정확하게 입력해주세요. */
        phone: t("common.enter_correct_cellphone"),
        //phone: "휴대폰 번호를 맞게 입력했는지 다시 확인해주세요.",
      }));
      return;
    }

    if (userInfo.userName && userInfo.cellPhone) {
      if (emailId && (domain == t('common.select')||!domain)) {
        setAlertMessage((prev) => ({
          ...prev,
          /* 이메일을 정확하게 입력해주세요. */
          email: t("common.check_email"),
        }));
        return;
      }

      if (!emailId && domain !== t('common.select')) {
        setAlertMessage((prev) => ({
          ...prev,
          /* 이메일을 정확하게 입력해주세요. */
          email: t("common.check_email"),
        }));
        return;
      }
      console.log("update userInfo",userInfo)
      showAlert({
        title: t("common.save"),
        message: t("common.save_confirm"),
        onConfirm: () => {
          
          updateMyInfo(userInfo);
        },
      });
    }
  };

  return (
    <>
      <Header headName={t("common.my_page")} />

      {userInfo && (
        <Form
          onSubmit={handleSubmit}
          ignoreModified={true}
          initialValues={userInfo}
          render={() => (
            <FormElement>
              <table className="tbl-base">
                <caption hidden>table</caption>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "80%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Label editorId="auth">{t("common.role")}</Label>
                    </th>
                    <td>
                      <Input
                        id="editorId1"
                        value={userInfo.roleCodeName}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Label editorId="userid">{t("common.id")}</Label>
                    </th>
                    <td>
                      <Input
                        name={"userId"}
                        id="userId"
                        value={userInfo?.userId}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Label editorId="username">
                        {t("common.name")}
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </Label>
                    </th>
                    <td>
                      <FormField
                        id="username"
                        name={"userName"}
                        onChange={onChange}
                      />
                      <div role="alert" className="k-form-error k-text-start">
                        {alertMessage.name}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Label editorId="useremail">{t("common.email")}</Label>
                    </th>
                    <td>
                      <div className="in-input">
                        <div className="inner-item mw400">
                          <FormField
                            name={"emailId"}
                            className="w310"
                            onChange={onChangeEmailId}
                            value={userInfo.emailId}
                          />
                          @{" "}
                          <FormField
                            name={"domain"}
                            data={[
                              { domain: "lgespartner.com" },
                              { domain: "lgensol.com" },
                            ]}
                            component={CustomSelect}
                            textField={"domain"}
                            dataItemKey={"domain"}
                            // onChange={handleDomainChange}
                            // visited={true}
                            defaultItem={{ value: null, domain: t('common.select') }}
                            className="w200"
                            onChange={onChangeDmain}
                          ></FormField>
                        </div>
                      </div>
                      <div role="alert" className="k-form-error k-text-start">
                        {alertMessage.email}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Label editorId="phonenumber">
                        {t("common.cellphone")}
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </Label>
                    </th>
                    <td>
                      <FormField
                        name={"cellPhone"}
                        onChange={onChange}
                        placeholder={t("common.enter_number_without_-")}
                        validation={false}
                        validator={numberValidator}
                      />
                      <div role="alert" className="k-form-error k-text-start">
                        {alertMessage.phone}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="btn-group">
                <div className="group-align-right gap10">
                  <Button size={"large"} themeColor={"primary"}>
                    {t("common.save")}
                  </Button>
                </div>
              </div>
            </FormElement>
          )}
        />
      )}

      {/* 비밀번호 확인 팝업 */}
      {visible && <PwdCheckModal visible={visible} setVisible={setVisible} />}
    </>
  );
}
