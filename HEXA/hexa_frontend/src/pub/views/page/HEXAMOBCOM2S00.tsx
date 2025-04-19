// HEXAMOBCOM2S00 : 모바일 - 로그인

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Form, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAMOBCOM2S00() {
  // 휴대폰 미등록
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  // pw
  const [state, setState] = React.useState(false);
  const toggleClass = () => {
    setState(!state);
  };

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
                    <div className="in-tit">언어</div>
                    {/* 클릭시 언어선택 팝업(HEXAMOBHOM2P03) 사용 */}
                    <div className="in-select-btn">
                      <Button size={"small"} fillMode="flat">
                        한국어
                      </Button>
                    </div>
                  </div>

                  <div className="in-input">
                    <Label editorId="emailID">아이디</Label>
                    <div className="inner-item  type-del">
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

                <div className="m-btn-group mt1.5">
                  <Button
                    size={"large"}
                    themeColor={"primary"}
                    className="btn-login"
                  >
                    로그인
                  </Button>
                </div>

                <div className="signup-box">
                  <div>
                    <Checkbox label="아이디 저장" defaultChecked={true} />
                  </div>
                </div>
              </FormElement>
            )}
          />
        </div>
      </div>

      {visible && (
        <Dialog
          title={"휴대폰 미등록"}
          onClose={toggleDialog}
          className="dialog-mobile"
        >
          <div className="dialog-box">
            <p className="txt-left">
              모바일 서비스를 이용하기 위해서는 휴대폰번호가 필요합니다.
            </p>
            <p>Web 화면에서 로그인하셔서 먼저 휴대폰번호를 등록해주세요.</p>
          </div>

          <DialogActionsBar>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              확인
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
