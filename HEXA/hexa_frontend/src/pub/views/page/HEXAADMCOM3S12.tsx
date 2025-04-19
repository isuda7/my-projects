// HEXAADMCOM3S02 : 로그인 > 사용자 인증> 비밀번호 재설정

import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Form, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import Dropbox from "../../components/Dropbox.tsx";

export default function HEXAADMCOM3S02() {
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
          <h2 className="txt">새롭게 사용할 비밀번호를 입력해주세요.</h2>
          <div>
            <Form
              render={() => (
                <FormElement>
                  <FieldWrapper>
                    <div className="in-input">
                      <Label editorId="emailID">아이디</Label>
                      <Input
                        id="emailID"
                        placeholder="아이디를 입력해 주세요."
                        value={"superadmin001"}
                        disabled
                      />
                      <div className="c-red mt0.5">
                        비밀번호 생성규칙
                        <ul>
                          <li className="bu-dot-red">비밀번호는 8~15자. </li>
                          <li className="bu-dot-red">
                            영문/숫자/특수문자 중 2가지 이상 혼합
                          </li>
                          <li className="bu-dot-red">
                            가능 특수문자 :
                            !”#$%&’()*+,-./:;&lt;&#61;&gt;?@[\]^_`&#123;&#124;&#125;~
                          </li>
                          <li className="bu-dot-red">
                            아이디와 동일하거나 공백은 사용 불가
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="in-input">
                      <Label editorId="newPassword">신규 비밀번호</Label>
                      <div className="pass-view">
                        <Input
                          id="newPassword"
                          type={state ? "text" : "password"}
                          placeholder="신규 비밀번호를 입력해 주세요."
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
                    </div>

                    <div className="in-input">
                      <Label editorId="newPasswordConfirm">
                        신규 비밀번호 확인
                      </Label>
                      <div className="pass-view">
                        <Input
                          id="newPasswordConfirm"
                          type={state ? "text" : "password"}
                          placeholder="신규 비밀번호를 다시 입력해 주세요."
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
                    </div>
                  </FieldWrapper>

                  <Button
                    size={"large"}
                    themeColor={"primary"}
                    className="btn-login"
                  >
                    저장
                  </Button>
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
