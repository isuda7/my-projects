import {Input, InputChangeEvent} from "@progress/kendo-react-inputs";
import {Button} from "@progress/kendo-react-buttons";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {showAlert} from "@/store/modules/alertStore.ts";

interface PasswordFieldProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isShowAlert: boolean;
  alertMessage: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
                                                       password,
                                                       setPassword,
                                                       onKeyDown,
                                                       isShowAlert,
                                                         alertMessage

                                                     }) => {
  const [state, setState] = useState(false);
  const {t} = useTranslation();

  const toggleClass = () => {
    setState(!state);
  };

  return (
    <div className="pass-view">
      <Input
        id="password"
        type={state ? "text" : "password"}
        placeholder={t("common.input_required2", {string: t("common.password")})}
        value={password}
        onChange={(e: InputChangeEvent) => {
          if (typeof e.target?.value === "string") {
            setPassword(e.target.value);
          }
        }}
        onKeyDown={onKeyDown} // onKeyDown 이벤트 전달
      />
      {password && (
        <>
          <Button
            size={"small"}
            fillMode="flat"
            className={`btn-view ${state ? "is-active" : ""}`}
            onClick={toggleClass}
            tabIndex={-1}
          ></Button>
          <Button
            size={"small"}
            fillMode="flat"
            className="btn-del"
            onClick={() => setPassword("")}
            tabIndex={-1}
          ></Button>

        </>
      )}
      {isShowAlert && (
        <div role="alert" className="k-form-error k-text-start">
            {alertMessage}
        </div>
      )}
    </div>
  );
};

export default PasswordField;
