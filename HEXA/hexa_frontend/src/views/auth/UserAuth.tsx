// HEXAADMCOM3S01 : 로그인 > 사용자 인증

import {useCallback, useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import {Input, InputChangeEvent} from "@progress/kendo-react-inputs";
import {Label} from "@progress/kendo-react-labels";
import {FieldWrapper, Form, FormElement} from "@progress/kendo-react-form";
import {showAlert} from "@/store/modules/alertStore.ts";
import {useMutation} from "@tanstack/react-query";
import AuthApiService from "@/utils/apiService/AuthApiService.ts";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {phoneValidator} from "@/utils/Validators.ts";

const LIMIT_TIME = 300;

export default function UserAuth() {
  const {t} = useTranslation();
  const [state, setState] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [cellPhone, setCellPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(LIMIT_TIME);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const [isCellPhoneError, setIsCellPhoneError] = useState<boolean>(false);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);

  const sendOTP = useCallback(async () => {
    // phoneValidator(cellPhone);
    setIsCellPhoneError(false);
    sendOtpMutation.mutate();
  }, [showAlert]);

  const startTimer = () => {
    if (intervalId) clearInterval(intervalId);
    setTimer(LIMIT_TIME);
    const id = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    setIntervalId(id);
  };

  const onSubmit = () => {
    setIsAuthError(true);
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
        userId,
        cellPhone: cellPhone,
      }),
    onSuccess: (response) => {
      const data = response.data;
      if (data != null) {
        startTimer()
      }
    },
    onError: (error) => {
      setIsCellPhoneError(true);

    },
  });

  const checkOtpMutation = useMutation({
    mutationFn: async () =>
      AuthApiService().checkOtp({
        userId,
        cellPhone: cellPhone,
        otp: otp
      }),
    onSuccess: (response) => {
      const data = response.data;
      if (data != null) {
        navigate("/new-password", {state: data})
      }
    },
    onError: (error) => {
      setIsAuthError(true);
    },
  });

  return (

    <div className="login-box">
      <h2 className="txt">
        {t("user-auth.title")}
      </h2>
      <div>
        <Form
          render={() => (
            <FormElement>
              <FieldWrapper>
                <div className="in-input">
                  <Label editorId="emailID">{t("common.id")}</Label>
                  <div className="inner-item type-del">
                    <Input
                      id="emailID"
                      placeholder={t("common.input_required2", { string: t("common.id")})}
                      onChange={(e: InputChangeEvent) => {
                        if (typeof e.target?.value === "string") {
                          setUserId(e.target.value);
                        }
                      }}
                    />
                    {userId && <Button
                      size={"small"}
                      fillMode="flat"
                      className="btn-del"
                    ></Button>
                    }
                  </div>
                </div>

                <div className="in-input">
                  <Label editorId="phoneNumber">{t("common.cellphone")}</Label>
                  <div className="inner-item">
                    <Input
                      id="phoneNumber"
                      placeholder={t("common.input_required2", { string: t("common.cellphone")})}
                      onChange={(e: InputChangeEvent) => {
                        setCellPhone(e.target.value);
                      }}

                    />
                    <Button size={"large"} onClick={sendOTP}>{t("user-auth.send-veri-code")}</Button>
                  </div>
                  {isCellPhoneError && <div role="alert" className="k-form-error k-text-start">
                    {t("user-auth.alert.phone")}
                  </div>
                  }
                </div>

                <div className="in-input">
                  <Label editorId="number">{t("user-auth.veri-code")}</Label>
                  <div className="inner-item">
                    <Input
                      id="number"
                      placeholder={t("common.input_required2", { string: t("user-auth.veri-code")})}
                      onChange={(e: InputChangeEvent) => {
                        setOtp(e.target.value);
                      }}
                    />
                    <span className="time">{formatTime(timer)}</span>
                  </div>
                  {isAuthError && <div role="alert" className="k-form-error k-text-start">
                    {t("user-auth.alert.otp")}
                  </div>
                  }
                </div>
              </FieldWrapper>

              <Button
                size={"large"}
                themeColor={"primary"}
                className="btn-login"
                onClick={onSubmit}
              >
                {t("common.confirm")}
              </Button>


            </FormElement>
          )}
        />
      </div>
    </div>

  );
}
