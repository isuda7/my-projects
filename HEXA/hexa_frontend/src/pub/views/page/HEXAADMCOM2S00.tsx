// HEXAADMCOM2S00 : 마이 페이지

import * as React from "react";
import { useState } from "react";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function HEXAADMCOM2S00() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  const [state, setState] = useState(false);
  const toggleClass = () => {
    setState(!state);
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>마이 페이지</span>
      </div>

      <div className="head-group">
        <div>
          <h2 className="t-header">마이 페이지</h2>
        </div>
      </div>

      <Form
        render={() => (
          <FormElement>
            <table className="tbl-base">
              <caption hidden>table</caption>
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "80%" }} />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">
                    <Label editorId="auth">권한</Label>
                  </th>
                  <td>
                    <Input id="editorId1" value="시스템 관리자" readOnly />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Label editorId="userid">아이디</Label>
                  </th>
                  <td>
                    <Input id="userid" value="superadmin001" readOnly />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Label editorId="username">
                      이름
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </Label>
                  </th>
                  <td>
                    <Input id="username" value="김쿠루" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Label editorId="useremail">이메일</Label>
                  </th>
                  <td>
                    <Input id="useremail" value="ensol@email.com" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Label editorId="phonenumber">
                      휴대폰 번호
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </Label>
                  </th>
                  <td>
                    <Input id="phonenumber" value="010-1111-1111" />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="btn-group">
              <div className="group-align-right gap10">
                <Button size={"large"} themeColor={"primary"}>
                  저장
                </Button>
              </div>
            </div>
          </FormElement>
        )}
      />

      {/* 비밀번호 확인 팝업 */}
      {visible && (
        <Dialog title={"비밀번호 확인"} onClose={toggleDialog}>
          <div className="dialog-box pop-xs">
            <div className="in-input">
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
                비밀번호가 일치하지 않습니다.
                <br /> 입력하신 내용을 다시 확인해주세요.
              </div>
            </div>
          </div>
          <DialogActionsBar>
            <Button size={"medium"} onClick={toggleDialog} fillMode="outline">
              취소
            </Button>
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
