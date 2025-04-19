// HEXAADMSYM1S25 : 알림 등록

import { Input, RadioGroup, TextArea } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAADMSYM1S25() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>시스템 관리 </span>
        <span>알림 관리</span>
        <span>알림 등록</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">알림 등록</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">알림 발송 조건</h3>
              </div>
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "80%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      구분
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList defaultValue="선택" className="w310" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="section">
              <div className="title-group">
                <h3 className="t-title">알림 메시지</h3>
              </div>
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "80%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      발송 종류
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <RadioGroup
                        className="flex-gap-0.5-2"
                        layout="horizontal"
                        defaultValue={"1"}
                        data={[
                          { label: "이메일", value: "1" },
                          { label: "알림톡", value: "2" },
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      제목
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
                      수신자
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <div className="inner-item">
                          <Button
                            size={"medium"}
                            fillMode="outline"
                            className="w100"
                          >
                            수신자 선택
                          </Button>
                          <Input id="name" />
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">메시지</th>
                    <td>
                      <div className="in-input">
                        <TextArea rows={6} resizable="none" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      사용여부
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
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
