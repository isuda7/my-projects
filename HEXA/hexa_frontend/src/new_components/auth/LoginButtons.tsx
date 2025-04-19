import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Link, useNavigate } from "react-router-dom";
import {Checkbox, CheckboxChangeEvent} from "@progress/kendo-react-inputs";
import {useTranslation} from "react-i18next";

interface LoginButtonsProps {
  handleLoginClick: React.MouseEventHandler<HTMLButtonElement>;
  setSaveId: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginButtons(props: LoginButtonsProps) {
  const {t} = useTranslation();
  const { handleLoginClick, setSaveId} = props;
  const navigate = useNavigate();

  const navigateRePwdPage = () => {
    navigate("/user-auth");
  };

  return (
    <>
      <Button
        size={"large"}
        themeColor={"primary"}
        className="btn-login"
        onClick={handleLoginClick}
      >
        {t("login.login")}
      </Button>

      <div className="signup-box">
        <div>
          <Checkbox label={t("login.remember-id")}
                    defaultChecked={true}
                    onChange={(e:CheckboxChangeEvent) => {
                      setSaveId(e.value);
                    }}
          />
        </div>
        <div className="signup-box__right">
          <Button size={"small"}
                  fillMode="flat"
                  onClick={navigateRePwdPage}
          >
            {t("login.reset-pwd")}
          </Button>
        </div>
      </div>

      <div className="help-box">
        {t("common.contact-support")}{" "}
        <a href="mailto:kooroo@lgensol.com" title="새창">
          kooroo@lgensol.com
        </a>
      </div>

    </>
  );
}

export default LoginButtons;
