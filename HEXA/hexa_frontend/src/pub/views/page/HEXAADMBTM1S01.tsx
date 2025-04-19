// HEXAADMBTM1S01 : 배터리 정보 등록

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";

export default function HEXAADMBTM1S01() {
  // datepicker
  const [value, setValue] = React.useState(new Date());
  const changeDateStart = () => {
    setValue(value);
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>배터리 관리 </span>
        <span>배터리 정보 관리 </span>
        <span>배터리 정보 등록 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">배터리 정보 등록</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            {/* 배터리 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">배터리 정보</h3>
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
                    <th scope="row" rowSpan={2}>
                      생산년월일
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td rowSpan={2}>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                    <th scope="row">
                      시리얼넘버
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      HW버전
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 사용 구분 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">사용 구분 정보</h3>
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
                    <th scope="row">
                      사용구분1
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList
                        defaultValue="등록"
                        className="w200"
                        disabled
                      />
                    </td>
                    <th scope="row">
                      사용구분2
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList
                        defaultValue="사용대기"
                        className="w200"
                        disabled
                      />
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
