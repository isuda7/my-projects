import React, {useState} from "react";
import {Label} from "@progress/kendo-react-labels";
import {Checkbox, Input, InputChangeEvent} from "@progress/kendo-react-inputs";
import {Button} from "@progress/kendo-react-buttons";
import {FieldWrapper, Form, FormElement} from "@progress/kendo-react-form";
import {useNavigate} from "react-router-dom";
import PasswordInput from "@/components/common/PasswordInput.tsx";
import PasswordField from "@/new_components/auth/PasswordField.tsx";
import {useTranslation} from "react-i18next";

interface LoginFieldProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isShowAlert: boolean;
  alertMessage: string;
}

function LoginField(props: LoginFieldProps) {
  const {t} = useTranslation();
  const {userId, setUserId, password, setPassword, isShowAlert, alertMessage} = props;
  const navigate = useNavigate();
  return (
    <FieldWrapper>
      <div className="in-input">
        <Label editorId="emailID">{t("common.id")}</Label>
        <div className="inner-item type-del">
          <Input
            id="emailID"
            placeholder={t("common.input_required2", { string: t("common.id")})}
            value={userId}
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
            tabIndex={-1}
            onClick={() => setUserId("")}
          ></Button>
          }
        </div>
      </div>

      <div className="in-input">
        <Label editorId="password">{t("common.password")}</Label>
        <PasswordField password={password} setPassword={setPassword} isShowAlert={isShowAlert} alertMessage={alertMessage}/>
      </div>
    </FieldWrapper>
  )
    ;
}

export default LoginField;
