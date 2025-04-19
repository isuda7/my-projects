// HEXAADMCOM3S01 : 로그인 > 사용자 인증

import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Form, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import Dropbox from "../../components/Dropbox.tsx";

export default function HEXAADMCOM3S01() {
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
          <h2 className="txt">
            비밀번호 재설정을 위해 사용자 정보를 입력해주세요.
          </h2>
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
                      <Label editorId="phoneNumber">휴대폰 번호</Label>
                      <div className="inner-item">
                        <Input
                          id="phoneNumber"
                          placeholder="휴대폰 번호를 입력해 주세요."
                        />
                        <Button size={"large"}>인증번호 받기</Button>
                      </div>
                      <div role="alert" className="k-form-error k-text-start">
                        휴대폰 번호를 정확하게 입력해주세요.
                      </div>
                    </div>

                    <div className="in-input">
                      <Label editorId="number">인증 번호</Label>
                      <div className="inner-item">
                        <Input
                          id="number"
                          placeholder="인증번호를 입력해 주세요"
                        />
                        <span className="time">5:00</span>
                      </div>
                      <div role="alert" className="k-form-error k-text-start">
                        잘못된 인증번호 입니다. 다시 입력해주세요.
                      </div>
                    </div>
                  </FieldWrapper>

                  <Button
                    size={"large"}
                    themeColor={"primary"}
                    className="btn-login"
                  >
                    확인
                  </Button>

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
