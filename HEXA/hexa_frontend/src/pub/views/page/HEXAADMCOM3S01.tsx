// HEXAADMCOM3S01 : 비밀번호 변경

import { useState } from "react";
import { Label } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

export default function HEXAADMCOM3S01() {
  const [state, setState] = useState(false);
  const [state1, setState1] = useState(false);
  const [state2, setState2] = useState(false);

  const toggleClass = () => {
    setState(!state);
  };
  const toggleClass1 = () => {
    setState1(!state1);
  };
  const toggleClass2 = () => {
    setState2(!state2);
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>비밀번호 변경</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">비밀번호 변경</h2>
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
                    <Label editorId="password">
                      현재 비밀번호
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </Label>
                  </th>
                  <td>
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
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Label editorId="newPassword">
                      신규 비밀번호
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </Label>
                  </th>
                  <td>
                    <div className="in-input">
                      <div className="pass-view">
                        <Input
                          id="newPassword"
                          type={state1 ? "text" : "password"}
                          placeholder="비밀번호를 입력해 주세요."
                        />
                        <Button
                          size={"small"}
                          fillMode="flat"
                          className={`btn-view ${state1 ? "is-active" : ""}`}
                          onClick={() => toggleClass1()}
                        ></Button>
                        <Button
                          size={"small"}
                          fillMode="flat"
                          className="btn-del"
                        ></Button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <Label editorId="newPasswordCheck">
                      신규 비밀번호 확인
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </Label>
                  </th>
                  <td>
                    <div className="in-input">
                      <div className="pass-view">
                        <Input
                          id="newPasswordCheck"
                          type={state2 ? "text" : "password"}
                          placeholder="비밀번호를 입력해 주세요."
                        />
                        <Button
                          size={"small"}
                          fillMode="flat"
                          className={`btn-view ${state2 ? "is-active" : ""}`}
                          onClick={() => toggleClass2()}
                        ></Button>
                        <Button
                          size={"small"}
                          fillMode="flat"
                          className="btn-del"
                        ></Button>
                      </div>
                      <div role="alert" className="k-form-error k-text-start">
                        비밀번호가 일치하지 않습니다. 입력하신 내용을 다시
                        확인해주세요.
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bullet-box">
              <h3 className="t-title">비밀번호 생성규칙</h3>
              <ul>
                <li className="bu-dot">비밀번호는 8~15자.</li>
                <li className="bu-dot">
                  영문/숫자/특수문자 중 2가지 이상 혼합
                </li>
                <li className="bu-dot">
                  가능 특수문자 :
                  !”#$%&’()*+,-./:;&lt;&#61;&gt;?@[\]^_`&#123;&#124;&#125;~
                </li>
                <li className="bu-dot">아이디와 동일하거나 공백은 사용 불가</li>
              </ul>
            </div>

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
    </>
  );
}
