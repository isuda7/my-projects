/* React */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {useMutation} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Form, FormElement, FieldWrapper } from "@progress/kendo-react-form";

/* Common */
import {useAppSelector} from "@/store";
import {tempSelector} from "@/store/modules/userStore.ts";
import AuthApiService from "@/utils/apiService/AuthApiService";
import {setLogin} from "@/store/modules/userStore.ts";
import {setUserInfomation} from "@/store/authSlice.ts";
import useAlert from "@/hooks/useAlert";

const LIMIT_TIME = 300;

export default function MobileAuth() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showAlert = useAlert();
  const temp = useAppSelector(tempSelector);

  const [vPhoneNumber, setVPhoneNumber] = useState<string>(''); //화면에 보이는 핸드폰 번호
  const [sendOtpFlag, setSendOtpFlag] = useState<boolean>(false)
  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [timer, setTimer] = useState<number>(LIMIT_TIME);
  const [otp, setOtp] = useState<string>("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if(temp) {
      const tempData = temp.tempData;
      const userId = temp.userId;
      console.log('MobileAuth tempData', tempData)
      console.log('MobileAuth userId', userId)
      setProcessCellPhone(tempData.cellPhone)
    }
  }, [temp])

  const setProcessCellPhone = (phone: string) => {
    // 앞자리(3자리), 중간(4자리), 뒷자리(3~4자리) 분리
    const firstPart = phone.substring(0, 3);
    const middlePart = '****';
    const lastPart = phone.length === 10 ? phone.substring(6) : phone.substring(7);
    setVPhoneNumber(`${firstPart}-${middlePart}-${lastPart}`);
  }

  const sendOTP = async () => {
    setErrorFlag(false)
    sendOtpMutation.mutate();
  };

  const startTimer = () => {
    if (intervalId) clearInterval(intervalId);
    setTimer(LIMIT_TIME);
    const id = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    setIntervalId(id);
  };

  const onSubmit = () => {
    setErrorFlag(false);
    if(!sendOtpFlag) {
      setErrorFlag(true)
      setErrorMessage(t('mobile.click_receive_auth_code'))
      return;
    }
    checkOtpMutation.mutate();
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes)}:${String(remainingSeconds).padStart(2, '0')}`;
  };
  
  const sendOtpMutation = useMutation({
    mutationFn: async () =>
      AuthApiService().sendOtp({
        userId: temp.userId,
        cellPhone: temp.tempData.cellPhone,
      }),
    onSuccess: (response) => {
      const data = response.data;
      if (data != null) {
        showAlert({message: t('mobile.otp_send_message')})
        setSendOtpFlag(true)
        startTimer()
      }
    },
    onError: (error) => {
      //setIsCellPhoneError(true);
    },
  });

  const checkOtpMutation = useMutation({
    mutationFn: async () =>
      AuthApiService().checkOtp({
        userId: temp.userId,
        cellPhone: temp.tempData.cellPhone,
        otp: otp
      }),
    onSuccess: (response) => {
      const data = response.data;
      console.log('data', data)
      if (data != null) {
        dispatch(setLogin(temp.tempData));
        dispatch(setUserInfomation(temp.userId));
        window.localStorage.setItem("signIn", "true");


        /**
         * 90일 비밀번호 변경 요청 알림, 로그인시 한번만
         */
        if(temp?.tempData?.isPasswordChange) {
          showAlert({
            title: t('mobile.change_password_guide'), //'비밀번호 변경 안내',
            message: (
              <>
                <p className="txt-left">
                  {t('mobile.change_password_notice1')}
                  {/* 소중한 개인정보 보호와 안전한 사이트 이용을 위해 90일 마다
                  비밀번호 변경을 권장하고 있습니다. */}
                </p>
                <p>
                  {t('mobile.change_password_notice2')}
                  {/* Web 화면으로 로그인하여 비밀번호를 변경해주세요. */}
                </p>
              </>
            )
          })
        }

        navigate(`/`);
      }
    },
    onError: (error: any) => {
      setErrorFlag(true);
      if(error.data && error.data.message) {
        setErrorMessage(error.data.message);
      }
      else {
        setErrorMessage(t('mobile.expired_auth_code'));
      }
    },
  });

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
                    <Label editorId="phoneNumber">
                      {t('common.cellphone') /* 휴대폰 번호 */}
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={vPhoneNumber}
                      disabled
                    />
                    <div className="btn-number-box">
                      <Button
                        type={'button'}
                        onClick={sendOTP}
                      >
                        {/* 인증번호 받기 */}
                        {t('mobile.receive_auth_code')}
                      </Button>
                    </div>
                  </div>

                  <div className="in-input">
                    <Label editorId="number">
                      {t('user-auth.veri-code') /* 인증번호 */}
                    </Label>
                    <div className="inner-item">
                      <Input 
                        id="otp" 
                        placeholder={t('mobile.enter_auth_code')}
                        value={otp}
                        onChange={(e: InputChangeEvent) => setOtp(e.value)}  
                      />
                      <span className="time">{formatTime(timer)}</span>
                    </div>
                    {
                      errorFlag &&
                      <div role="alert" className="k-form-error k-text-start">
                        {/* 잘못된 인증번호 입니다. 다시 입력해주세요. */}
                        {/* {t('user-auth.alert.otp')} */}
                        {errorMessage}
                      </div>
                    }
                  </div>
                </FieldWrapper>

                <div className="m-btn-group mt1.5">
                  <Button 
                    size={"large"} 
                    themeColor={"primary"} 
                    className="btn-login" 
                    onClick={onSubmit}
                  >
                    {t('common.confirm') /* 확인 */}
                  </Button>
                </div>
              </FormElement>
            )}
          />
        </div>
      </div>
    </>
  );
}
