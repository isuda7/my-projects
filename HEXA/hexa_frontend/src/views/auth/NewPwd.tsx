// HEXAADMCOM3S02 : 로그인 > 사용자 인증> 비밀번호 재설정

import React, {useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import {Input} from "@progress/kendo-react-inputs";
import {Label} from "@progress/kendo-react-labels";
import {FieldWrapper, Form, FormElement} from "@progress/kendo-react-form";
import {useLocation, useNavigate} from "react-router-dom";
import AuthApiService from "@/utils/apiService/AuthApiService.ts";
import useAlert from "@/hooks/useAlert.tsx";
import {useTranslation} from "react-i18next";

export default function NewPwd() {
  const {state} = useLocation();
  const showAlert = useAlert();
  const navigate = useNavigate();
  const {t} = useTranslation();
  /* 경고 메세지 */
  const [alertMessage, setAlertMessage] = useState({
    new: "",
    confirm: "",
  });

  const [userId, setUserId] = useState<string>(state);
  /* 비밀번호 토글 on/off */
  const [toggle, setToggle] = useState({
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
    newPassword: "",
    newPasswordCheck: "",
  });

  const onChangePwd = (e: any) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const isValidPassword = (password: string) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d|.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])\S{8,15}$/;
    return regex.test(password) && password !== userId && !password.includes(" ");
  };

  const handleSubmit = async () => {
    console.log('submit')
    setAlertMessage({
      new: "",
      confirm: "",
    });

    if (!password.newPassword) {
      showAlert({message: t("common.enter_new_password")});
      return;
    }

    if (!password.newPasswordCheck) {
      showAlert({message: t("common.re_enter_new_password")});
      return;
    }

    if (password.newPassword !== password.newPasswordCheck) {
      showAlert({message: t("common.new_password_not_match")});
      return;
    }

    if (!isValidPassword(password.newPassword)) {
      showAlert({message: t("common.new_password_rule_violation")});
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
  const updatePassword = async (password: any) => {
    try {
      const result = await AuthApiService().newPwd({
        userId,
        password
      });
      showAlert({message: t("common.modify_success")});
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) alert({message: error.message});
    }
  };

  return (

    <div className="login-box">
      <h2 className="txt">새롭게 사용할 비밀번호를 입력해주세요.</h2>
      <div>
        <Form
          ignoreModified={true}
          render={() => (
            <FormElement>
              <FieldWrapper>
                <div className="in-input">
                  <Label editorId="emailID">{t("common.id")}</Label>
                  <Input
                    id="emailID"
                    disabled
                    value={userId}
                  />
                  <div className="c-red mt0.5">
                    {t("common.password_creation_rules.password_creation_rule")}
                    <ul>
                      <li className="bu-dot-red">{t("common.password_creation_rules.password_8_to_15")}</li>
                      <li className="bu-dot-red">
                        {t(
                          "common.password_creation_rules.password_include_two_letters"
                        )}
                      </li>
                      <li className="bu-dot-red">
                        {t(
                          "common.password_creation_rules.allowed_special_characters"
                        )}
                      </li>
                      <li className="bu-dot-red">
                        {t(
                          "common.password_creation_rules.password_cannot_same-as-id_and_spaces"
                        )}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="in-input">
                  <Label editorId="newPassword">{t("common.new_password")}</Label>
                  <div className="pass-view">
                    <Input
                      id="newPassword"
                      name={"newPassword"}
                      type={toggle.newToggle ? "text" : "password"}
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
                        ></Button>
                        <Button
                          size={"small"}
                          fillMode="flat"
                          className="btn-del"
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
                </div>

                <div className="in-input">
                  <Label editorId="newPasswordConfirm">
                    {t("common.confirm_new_password")}
                  </Label>
                  <div className="pass-view">
                    <Input
                      id="newPasswordCheck"
                      name={"newPasswordCheck"}
                      type={toggle.confirmToggle ? "text" : "password"}
                      placeholder={t("common.re_enter_new_password")}
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
                        ></Button>
                        <Button
                          size={"small"}
                          fillMode="flat"
                          className="btn-del"
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
                </div>
              </FieldWrapper>

              <Button
                size={"large"}
                themeColor={"primary"}
                className="btn-login"
                onClick={handleSubmit}
              >
                {t("common.save")}
              </Button>
            </FormElement>
          )}
        />
      </div>
    </div>

  );
}
