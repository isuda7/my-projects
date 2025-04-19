// HEXAADMSYM1S14 : API Key 등록

import * as React from "react";
import { useState, useRef } from "react";
import { Input, RadioGroup } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

export default function HEXAADMSYM1S14() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>시스템 관리 </span>
        <span>API Key 관리 </span>
        <span>API Key 등록 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">API Key 등록</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "80%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      시스템ID
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input w310">
                        <Input />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">시스템명</th>
                    <td>
                      <div className="in-input w310">
                        <Input />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </FormElement>
        )}
      />

      <div className="btn-group">
        <div className="group-align-right">
          <Button size={"large"} fillMode="outline">
            취소
          </Button>
          <Button size={"large"} themeColor={"primary"}>
            저장
          </Button>
        </div>
      </div>
    </>
  );
}
