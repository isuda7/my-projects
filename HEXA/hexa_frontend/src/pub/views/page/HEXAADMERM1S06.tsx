// HEXAADMERM1S06 : 고장코드 등록

import * as React from "react";
import { Input, RadioGroup, TextArea } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAADMERM1S06() {
  // radio
  const data = React.useMemo(
    () => [
      { label: "경고", value: "1" },
      { label: "고장", value: "2" },
    ],
    []
  );

  const data2 = React.useMemo(
    () => [
      { label: "Y", value: "1" },
      { label: "N", value: "2" },
    ],
    []
  );

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 고장 및 통신 관리 </span>
        <span>고장코드 관리 </span>
        <span>고장코드 등록 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">고장코드 등록 </h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
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
                      대상
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList defaultValue={"선택"} className="w200" />
                    </td>
                    <th scope="row">
                      레벨
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <RadioGroup
                        className="flex-gap-0.5-2"
                        layout="horizontal"
                        data={data}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      고장코드
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <div className="inner-item">
                          <Input id="name" />
                          <Button
                            size={"medium"}
                            fillMode="outline"
                            className="w80"
                          >
                            중복 확인
                          </Button>
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      코드명
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
                    <th scope="row">설명</th>
                    <td colSpan={3}>
                      <TextArea rows={6} resizable="none" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      알림 여부
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td colSpan={3}>
                      <RadioGroup
                        className="flex-gap-0.5-2"
                        layout="horizontal"
                        data={data2}
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
