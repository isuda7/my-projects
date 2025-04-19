// HEXAADMSYM3S15 : API Key 상세

import * as React from "react";
import { useState, useRef } from "react";
import { Input, RadioGroup } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

export default function HEXAADMSYM3S15() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>시스템 관리 </span>
        <span>API Key 관리 </span>
        <span>API Key 상세 </span>
      </div>
      <div className="head-group">
        <h2 className="t-header">API Key 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">API Key 정보</h3>
              </div>
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "90%" }} />
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
                        <Input
                          defaultValue="bspExternalApi"
                          className="disabled"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">시스템명</th>
                    <td>
                      <div className="in-input w310">
                        <Input defaultValue="BSP" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">API Key</th>
                    <td>
                      <div className="in-input w310">
                        <Input defaultValue="waoA7Qgo" className="disabled" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">비밀번호</th>
                    <td>
                      <div className="in-input w310">
                        <Input
                          defaultValue="Kov124qxEjYq"
                          className="disabled"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 등록 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">등록 정보</h3>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">등록일시</th>
                    <td>2024-07-19 20:08:19</td>
                    <th scope="row">등록자 ID</th>
                    <td>superadmin01</td>
                  </tr>
                  <tr>
                    <th scope="row">수정일시</th>
                    <td>2024-07-19 20:08:19</td>
                    <th scope="row">수정자 ID</th>
                    <td>admin003</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </FormElement>
        )}
      />

      <div className="btn-group">
        <div className="group-align-right">
          <Button size={"large"}>삭제</Button>
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
