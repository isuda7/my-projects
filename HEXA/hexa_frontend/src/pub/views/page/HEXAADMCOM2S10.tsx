// HEXAADMCOM2S00 : 로그인

import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Form, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import Dropbox from "../../components/Dropbox.tsx";

export default function EBMWCMMAI5S00() {
  const [state, setState] = useState(false);

  const toggleClass = () => {
    setState(!state);
  };

  const langList = [
    {
      value: "ko",
      title: "한국어",
    },
    {
      value: "en",
      title: "English",
    },
  ];

  return (
    <div className="wrap-login">
      <div className="login-header">
        <div className="header-logo">
          <span className="sr-only">KooRoo Hexa</span>
        </div>
        <div className="header-lang">
          <Dropbox list={langList} defaultvalue="01" text="한국어" />
        </div>
      </div>

      <div className="login-body">
        <div className="login-visual">
          <div className="visual-img-bg"></div>
          <div className="visual-txt">
            Battery <br /> Switches
          </div>
          <div className="visual-img">
            <img src="/images/imgs_login_visual.png" alt="battery" />
          </div>
          <div className="visual-txt-s">
            Integrated Control System for <br />
            Next Generation Battery Switches
          </div>
        </div>
        <div className="login-box">
          <h2 className="h2">Login</h2>
          <div>
            <Form
              render={() => (
                <FormElement>
                  <FieldWrapper>
                    <div className="in-input">
                      <Label editorId="emailID">아이디</Label>
                      <div className="inner-item type-del">
                        <Input
                          id="emailID"
                          placeholder="아이디를 입력해 주세요."
                        />
                        <Button
                          size={"small"}
                          fillMode="flat"
                          className="btn-del"
                        ></Button>
                      </div>
                    </div>

                    <div className="in-input">
                      <Label editorId="password">비밀번호</Label>
                      <div className="pass-view">
                        <Input
                          id="password"
                          type={state ? "text" : "password"}
                          placeholder="비밀번호를 입력해 주세요."
                        />
                        <Button
                          size={"small"}
                          fillMode="flat"
                          className={`btn-view ${state ? "is-active" : ""}`}
                          onClick={() => toggleClass()}
                        ></Button>
                        <Button
                          size={"small"}
                          fillMode="flat"
                          className="btn-del"
                        ></Button>
                      </div>
                      <div role="alert" className="k-form-error k-text-start">
                        아이디 또는 비밀번호가 일치하지 않습니다.
                        <br />
                        입력하신 내용을 다시 확인해주세요.
                      </div>
                    </div>
                  </FieldWrapper>

                  <Button
                    size={"large"}
                    themeColor={"primary"}
                    className="btn-login"
                  >
                    로그인
                  </Button>

                  <div className="signup-box">
                    <div>
                      <Checkbox label="아이디 저장" defaultChecked={true} />
                    </div>
                    <div className="signup-box__right">
                      <Button size={"small"} fillMode="flat">
                        비빌번호 재설정
                      </Button>
                    </div>
                  </div>

                  <div className="help-box">
                    시스템 사용문의{" "}
                    <a href="mailto:kooroo@lgensol.com" title="새창">
                      kooroo@lgensol.com
                    </a>
                  </div>
                </FormElement>
              )}
            />
          </div>
        </div>
      </div>
      <div className="login-footer">
        <div className="footer-logo">
          <span className="sr-only">KooRoo</span>
        </div>
        <div className="footer-copy">
          Copyright ⓒ 2024 KooRoo Company. All right reserved.
        </div>
      </div>
    </div>
  );
}
