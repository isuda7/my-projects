// HEXAMOBCOM3S01 : 모바일 - 로그인 > 휴대폰 인증

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Form, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAMOBCOM3S01() {
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
                    <Label editorId="phoneNumber">휴대폰 번호 </Label>
                    <Input
                      id="phoneNumber"
                      defaultValue="010-****-0000"
                      disabled
                    />
                    <div className="btn-number-box">
                      <Button>인증번호 받기</Button>
                    </div>
                  </div>

                  <div className="in-input">
                    <Label editorId="number">인증번호 </Label>
                    <div className="inner-item">
                      <Input id="number" placeholder="인증번호를 입력하세요" />
                      <span className="time">05:00</span>
                    </div>
                    <div role="alert" className="k-form-error k-text-start">
                      잘못된 인증번호 입니다. 다시 입력해주세요.
                    </div>
                  </div>
                </FieldWrapper>

                <div className="m-btn-group mt1.5">
                  <Button size={"large"} themeColor={"primary"} className="btn-login" disabled>확인</Button>
                </div>
              </FormElement>
            )}
          />
        </div>
      </div>
    </>
  );
}
