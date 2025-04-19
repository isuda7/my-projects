// HEXAADMSYM1S21 : 공통 코드 등록

import { Input, RadioGroup } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAADMSYM1S21() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>시스템 관리 </span>
        <span>공통 코드 관리</span>
        <span>공통 코드 등록</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">공통 코드 등록</h2>
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
                      그룹 코드
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList
                        defaultValue="그룹 코드 선택"
                        className="w200"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      공통 코드ID
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <div className="inner-item mw400">
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
                  </tr>

                  <tr>
                    <th scope="row">
                      공통 코드명
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
                    <th scope="row">
                      공통 코드명(영문)
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
                    <th scope="row">설명</th>
                    <td>
                      <div className="in-input w310">
                        <Input />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">사용여부</th>
                    <td>
                      <RadioGroup
                        className="flex-gap-0.5-2"
                        layout="horizontal"
                        defaultValue={"1"}
                        data={[
                          { label: "Y", value: "1" },
                          { label: "N", value: "2" },
                        ]}
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
