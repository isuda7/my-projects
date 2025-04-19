// HEXAADMSTM1S06 : 구 코드 추가

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAADMSTM1S06() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>스테이션 코드 관리 </span>
        <span>스테이션ID 코드 관리 </span>
        <span>구 코드 추가</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">구 코드 추가</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            {/* 구 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">구 정보</h3>
                <div className="group-align-right gap0.38">
                  <Button
                    size={"small"}
                    fillMode="flat"
                    className="btn-in-icon"
                  >
                    행 추가
                    <i className="icon icon-plus"></i>
                  </Button>
                </div>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "40%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">
                      시 단위
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <th scope="col">
                      구 단위
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <th scope="col">
                      시 코드
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="in-input w300 m0-atuo">
                        <DropDownList defaultValue="서울특별시" />
                      </div>
                    </td>
                    <td>
                      <div className="in-input w300 m0-atuo">
                        <Input id="name" />
                      </div>
                    </td>
                    <td>
                      <div className="in-input w300 m0-atuo">
                        <div className="inner-item gap0.25">
                          <Input id="name" />
                          <Button size={"small"} fillMode="flat">
                            <i className="icon icon-minus"></i>
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="in-input w300 m0-atuo">
                        <DropDownList defaultValue="선택" />
                      </div>
                    </td>
                    <td>
                      <div className="in-input w300 m0-atuo">
                        <Input id="name" />
                      </div>
                    </td>
                    <td>
                      <div className="in-input w300 m0-atuo">
                        <div className="inner-item gap0.25">
                          <Input id="name" />
                          <Button size={"small"} fillMode="flat">
                            <i className="icon icon-minus"></i>
                          </Button>
                        </div>
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
