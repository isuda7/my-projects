// HEXAADMSTM1S64 : 충전 프로파일 Factor 상세

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAADMSTM1S64() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>충전 프로파일 및 배포 관리 </span>
        <span>충전 프로파일 Factor 상세 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">충전 프로파일 Factor 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            {/* 충전 프로파일 Factor 정보 */}
            <section className="section">
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "90%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">Factor</th>
                    <td>Factor08</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      구분
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList className="w200" defaultValue="온도" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      범위
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input className="w200" defaultValue="10" /> ~{" "}
                        <Input className="w200" defaultValue="25" />
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
