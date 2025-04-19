// HEXAADMCOM3S01 : 비밀번호 변경

import { useState } from "react";
import { Label } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import FormField from "@/new_components/common/FormField";
import { CheckPwdParams } from "@/utils/apiService/type/auth/login.type";
import AuthApiService from "@/utils/apiService/AuthApiService";
import { getCookie } from "@/utils/common";
import UserApiService from "@/utils/apiService/UserApiService";
import useAlert from "@/hooks/useAlert.tsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Input } from "@progress/kendo-react-inputs";

const PwdUpdate = () => {
  const showAlert = useAlert();
  const { t } = useTranslation();
  const navigate = useNavigate();
  /* 비밀번호 토글 on/off */
  const [toggle, setToggle] = useState({
    currntToggle: false,
    newToggle: false,
    confirmToggle: false,
  });

  const onClickToggle = (e: any) => {
    setToggle((prevState: any) => ({
      ...prevState,
      [e.target.name]: !prevState[e.target.name],
    }));
  };

  /* 비밀번호 */
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    newPasswordCheck: "",
  });

  const onChangePwd = (e: any) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
    console.log(password);
  };

  /* 비밀번호 유효성 검사 */
  const isValidPassword = (password: any) => {
    const id = getCookie("id");
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d|.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])\S{8,15}$/;
    return regex.test(password) && password !== id && !password.includes(" ");
  };

  /* 경고 메세지 */
  const [alertMessage, setAlertMessage] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const updatePassword = async (password: any) => {
    try {
      const result = await UserApiService().updatePassword(
        getCookie("id") as string,
        password
      );
      showAlert({ message: t("common.modify_success") });
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) alert({ message: error.message });
    }
  };

  const handleSubmit = async () => {
    setAlertMessage({
      current: "",
      new: "",
      confirm: "",
    });

    if (!password.password) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 현재 비밀번호를 입력해주세요. */
        current: t("common.enter_current_password"),
      }));
      return;
    }

    const param: CheckPwdParams = { password: password.password };
    const result = await AuthApiService().checkPwd(param);

    if (!result || result.status !== 200) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 비밀번호가 일치하지 않습니다. 입력하신 내용을 다시 확인해주세요. */
        current: t("common.password_not_match"),
      }));
      return;
    }

    if (!password.newPassword) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 신규 비밀번호를 입력해주세요. */
        new: t("common.enter_new_password"),
      }));
      return;
    }

    if (!password.newPasswordCheck) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 신규 비밀번호를 다시 입력해주세요. */
        confirm: t("common.re_enter_new_password"),
      }));
      return;
    }

    if (password.newPassword !== password.newPasswordCheck) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 신규 비밀번호와 비밀번호 확인이 일치하지 않습니다. 입력하신 내용을 다시 확인해주세요. */
        confirm: t("common.new_password_not_match"),
      }));
      return;
    }

    if (!isValidPassword(password.newPassword)) {
      setAlertMessage((prev) => ({
        ...prev,
        /* 비밀번호 생성규칙에 위배됩니다. 입력하신 내용을 다시 확인해주세요. */
        new: t("common.new_password_rule_violation"),
      }));
      return;
    }

    showAlert({
      title: t("common.save"),
      message: t("common.save_confirm"),
      onConfirm: () => {
        updatePassword(password.newPassword);
      },
    });
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>{t("common.change_password")}</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">{t("common.change_password")}</h2>
      </div>

      <Form
        onSubmit={handleSubmit}
        ignoreModified={true}
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
                    <Label editorId="password">
                      {t("common.current_password")}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </Label>
                  </th>
                  <td>
                    <div className="in-input">
                      <div className="pass-view">
                        <Input
                          id={"password"}
                          name={"password"}
                          type={toggle.currntToggle ? "text" : "password"}
                          /* 비밀번호를 입력해주세요 */
                          placeholder={t("common.enter_password")}
                          value={password.password}
                          onChange={onChangePwd}
                        />
                        {password.password && (
                          <>
                            <Button
                              size={"small"}
                              fillMode="flat"
                              className={`btn-view ${toggle.currntToggle ? "is-active" : ""}`}
                              name={"currntToggle"}
                              onClick={onClickToggle}
                              type="button"
                            ></Button>
                            <Button
                              size={"small"}
                              fillMode="flat"
                              className="btn-del"
                              type="button"
                              onClick={() => {
                                setPassword({
                                  ...password,
                                  password: "",
                                });
                              }}
                            ></Button>
                          </>
                        )}
                      </div>
                      <div role="alert" className="k-form-error k-text-start">
                        {alertMessage.current}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Label editorId="newPassword">
                      {t("common.new_password")}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </Label>
                  </th>
                  <td>
                    <div className="in-input">
                      <div className="pass-view">
                        <Input
                          id="newPassword"
                          name={"newPassword"}
                          type={toggle.newToggle ? "text" : "password"}
                          /* 신규 비밀번호를 입력해주세요 */
                          placeholder={t("common.enter_new_password")}
                          value={password.newPassword}
                          onChange={onChangePwd}
                        />
                        {password.newPassword && (
                          <>
                            <Button
                              size={"small"}
                              fillMode="flat"
                              className={`btn-view ${toggle.newToggle ? "is-active" : ""}`}
                              name={"newToggle"}
                              onClick={onClickToggle}
                              type="button"
                            ></Button>
                            <Button
                              size={"small"}
                              fillMode="flat"
                              className="btn-del"
                              type="button"
                              onClick={() => {
                                setPassword({
                                  ...password,
                                  newPassword: "",
                                });
                              }}
                            ></Button>
                          </>
                        )}
                      </div>
                      <div role="alert" className="k-form-error k-text-start">
                        {alertMessage.new}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Label editorId="newPasswordCheck">
                      {t("common.confirm_new_password")}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </Label>
                  </th>
                  <td>
                    <div className="in-input">
                      <div className="pass-view">
                        <Input
                          id="newPasswordCheck"
                          name={"newPasswordCheck"}
                          type={toggle.confirmToggle ? "text" : "password"}
                          /* 비밀번호를 입력해주세요 */
                          placeholder={t("common.enter_password")}
                          value={password.newPasswordCheck}
                          onChange={onChangePwd}
                        />
                        {password.newPasswordCheck && (
                          <>
                            <Button
                              size={"small"}
                              fillMode="flat"
                              className={`btn-view ${toggle.confirmToggle ? "is-active" : ""}`}
                              name={"confirmToggle"}
                              onClick={onClickToggle}
                              type="button"
                            ></Button>
                            <Button
                              size={"small"}
                              fillMode="flat"
                              className="btn-del"
                              type="button"
                              onClick={() => {
                                setPassword({
                                  ...password,
                                  newPasswordCheck: "",
                                });
                              }}
                            ></Button>
                          </>
                        )}
                      </div>

                      <div role="alert" className="k-form-error k-text-start">
                        {alertMessage.confirm}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bullet-box">
              <h3 className="t-title">
                {t("common.password_creation_rules.password_creation_rule")}
              </h3>
              <ul>
                <li className="bu-dot">
                  {t("common.password_creation_rules.password_8_to_15")}
                </li>
                <li className="bu-dot">
                  {t(
                    "common.password_creation_rules.password_include_two_letters"
                  )}
                </li>
                <li className="bu-dot">
                  {t(
                    "common.password_creation_rules.allowed_special_characters"
                  )}
                </li>
                <li className="bu-dot">
                  {t(
                    "common.password_creation_rules.password_cannot_same-as-id_and_spaces"
                  )}
                </li>
              </ul>
            </div>

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
    </>
  );
};

export default PwdUpdate;
