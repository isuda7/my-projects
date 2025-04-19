import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import * as React from "react";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApiService from "@/utils/apiService/AuthApiService.ts";
import { CheckPwdParams } from "@/utils/apiService/type/auth/login.type.ts";
import PasswordField from "@/new_components/auth/PasswordField.tsx";
import { useTranslation } from "react-i18next";

const PwdCheckModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const toggleDialog = () => {
    setVisible(!visible);
    navigate(-1);
  };
  const { t } = useTranslation();
  const checkPassword = async () => {
    const param: CheckPwdParams = { password };

    const result = await AuthApiService().checkPwd(param);

    if (result && result.status === 200) {
      setShowAlert(false);
      setVisible(!visible);
    } else {
      setShowAlert(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 Enter 동작 방지
      checkPassword();
    }
  };

  return (
    <>
      {visible && (
        <Dialog title={t("common.confirm_password")} onClose={toggleDialog}>
          <div className="dialog-box pop-xs">
            <div className="in-input">
              <PasswordField
                password={password}
                setPassword={setPassword}
                onKeyDown={handleKeyDown}
              />
              {showAlert && (
                <div role="alert" className="k-form-error k-text-start">
                  {t("common.password_not_match")}
                </div>
              )}
            </div>
          </div>
          <DialogActionsBar>
            <Button size={"medium"} onClick={toggleDialog} fillMode="outline">
              {t("common.cancel")}
            </Button>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={checkPassword}
            >
              {t("common.confirm")}
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
};

export default PwdCheckModal;
