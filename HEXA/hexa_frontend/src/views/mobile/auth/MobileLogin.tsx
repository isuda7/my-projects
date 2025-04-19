/* React */
import React, {useCallback, useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useDispatch} from "react-redux";

/* Kendo UI */
import {Form, FormElement, FieldWrapper} from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Input, Checkbox, InputChangeEvent, CheckboxChangeEvent } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";

/* Common */
import { setTempLogin } from "@/store/modules/userStore.ts";
import useAlert from "@/hooks/useAlert.tsx";
import AuthApiService from "@/utils/apiService/AuthApiService.ts";
import CustomSelect from "@/new_components/form/CustomSelect";
import { LANG_LIST } from "../common/constant";

const langList = LANG_LIST.map(v => ({code: v.value, value: v.label}))

export function MobileLogin() {
  const {t, i18n } = useTranslation();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [saveId, setSaveId] = useState<boolean>(true);
  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showAlert = useAlert();

  const signInMutation = useMutation({
    mutationFn: async () =>
      AuthApiService().signin({
        userId,
        password: password,
      }),
    onSuccess: (response) => {
      console.log(response)
      const data: any = response.data;
      if (data != null) {

        if(!data.isMobileAccess) {
          //해당 계정이 비활성화되었습니다. 관리자에게 문의해주세요
          showAlert({message: t('mobile.login_fail_alert')});
          return;
        }

        if(!data.cellPhone) {
          //해당 계정이 비활성화되었습니다. 관리자에게 문의해주세요
          showAlert({
            title: t('mobile.mobile_unregistered'), //{"휴대폰 미등록"}
            message: (
              <>
                 <p className="txt-left">
                  {/* 모바일 서비스를 이용하기 위해서는 휴대폰번호가 필요합니다. */}
                  {t('mobile.mobile_required1')}
                </p>
                <p>
                  {/* Web 화면에서 로그인하셔서 먼저 휴대폰번호를 등록해주세요. */}
                  {t('mobile.mobile_required2')}
                </p>
              </>
            )
          });
          return;
        }

        dispatch(setTempLogin({
          tempData: data,
          userId,
        }));
        navigate('/auth')
        // dispatch(setLogin(data));
        // dispatch(setUserInfomation(userId));
        //window.localStorage.setItem("signIn", "true");
        //navigate(`/`);
      }
    },
    onError: (error: any) => {
      setErrorFlag(true);
      console.log('error', error)
      // showAlert({
      //   message: error.data?.message,
      // })
    },
  });

  const loginSummit = useCallback(() => {
    if (saveId) {
      document.cookie = `id=${userId}`;
    } else {
      document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    signInMutation.mutate();
  }, [userId, signInMutation, showAlert]);

  const handleLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    loginSummit();
  };

  useEffect(() => {
    //로그인 시도했던 정보 초기화
    dispatch(setTempLogin({
      tempData: null,
      userId: null,
    }));

    const cookieSavedId = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`id=`))
      ?.split("=")[1];
    if (cookieSavedId) {
      setUserId(cookieSavedId);
    }
  }, []);

  // pw
  const [pwVisible, setPwVisible] = React.useState(false);
  const toggleClass = () => {
    setPwVisible(!pwVisible);
  };

  //언어 설정 변경
  const [language, setLanguage] = useState<string>('ko')
  const onChangeLanguage = (e: DropDownListChangeEvent) => {
    setLanguage(e.value);
    i18n.changeLanguage(e.value);
  }

  const onChange = (e: InputChangeEvent | CheckboxChangeEvent) => {
    console.log('onChange', e)
    if(e.target.name === 'userId') {
      setUserId(e.value as string)
    }
    else if(e.target.name === 'password') {
      setPassword(e.value as string)
    }
    else if(e.target.name === 'saveId') {
      setSaveId(e.value as boolean)
    }
  }

  //초기 언어 설정 세팅
  useEffect(() => {
    setLanguage(i18n.language)
  }, [])

  return (
    <>
      <div className="m-login">
        <div className="m-logo">
          <h1 className="sr-only">KooRoo Hexa</h1>
        </div>
        <div className="m-form-box">
          <Form
            render={() => (
              <FormElement>
                <FieldWrapper>
                  <div className="in-input">
                    <div className="in-tit">
                      {t('mobile.language')/* 언어 */}
                    </div>
                    <div>
                      {/* <DropDownList
                        data={["한국어", "English"]}
                        defaultValue="한국어"
                      /> */}
                      <CustomSelect
                        data={langList}
                        onChange={onChangeLanguage}
                        value={language}
                        noSelectDefault={true}
                      />
                    </div>
                  </div>

                  <div className="in-input">
                    <Label editorId="emailID">
                      {t('common.id') /* 아이디 */}
                    </Label>
                    <div className="inner-item  type-del">
                      <Input
                        id="emailID"
                        name="userId"
                        placeholder={t('common.enter_id')} //아이디를 입력해주세요
                        value={userId}
                        onChange={onChange}
                      />
                      <Button
                        size={"small"}
                        fillMode="flat"
                        className="btn-del"
                        type="button"
                        onClick={() => setUserId('')}
                      />
                    </div>
                  </div>

                  <div className="in-input">
                    <Label editorId="password">
                      {t('common.password') /* 비밀번호 */}
                    </Label>
                    <div className="pass-view">
                      <Input
                        id="password"
                        name="password"
                        type={pwVisible ? "text" : "password"}
                        placeholder={t('common.enter_password')} //"비밀번호를 입력해 주세요."
                        value={password}
                        onChange={onChange}
                      />
                      <Button
                        size={"small"}
                        fillMode="flat"
                        className={`btn-view ${pwVisible ? "is-active" : ""}`}
                        type={'button'}
                        onClick={() => toggleClass()}
                      />
                      <Button
                        size={"small"}
                        fillMode="flat"
                        className="btn-del"
                        type="button"
                        onClick={() => setPassword('')}
                      />
                    </div>
                    {
                      errorFlag && 
                      <div role="alert" className="k-form-error k-text-start">
                        {/* 아이디 또는 비밀번호가 일치하지 않습니다. */}
                        {t('mobile.login_fail_message1')}
                        <br />
                        {/* 입력하신 내용을 다시 확인해주세요. */}
                        {t('mobile.login_fail_message2')}
                      </div>
                    }
                  </div>
                </FieldWrapper>

                <div className="m-btn-group mt1.5">
                  <Button
                    size={"large"}
                    themeColor={"primary"}
                    className="btn-login"
                    onClick={handleLoginClick}
                  >
                    {t('login.login') /* 로그인 */}
                  </Button>
                </div>

                <div className="signup-box">
                  <div>
                    <Checkbox 
                      name="saveId"
                      label={t('login.remember-id')} //"아이디 저장"
                      value={saveId}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </FormElement>
            )}
          />
        </div>
      </div>
    </>
  );
}

export default MobileLogin;
