// HEXAADMERM3S07 : 고장코드 상세

import * as React from "react";
import { Input, RadioGroup, TextArea } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAADMERM3S07() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 고장 및 통신 관리 </span>
        <span>고장코드 관리 </span>
        <span>고장코드 상세 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">고장코드 상세 </h2>
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
                      <DropDownList defaultValue={"배터리"} className="w200" />
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
                        defaultValue={"2"}
                        data={[
                          { label: "경고", value: "1" },
                          { label: "고장", value: "2" },
                        ]}
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
                          <Input id="name" defaultValue="ER_BTRY_CDFET_02" />
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
                        <Input defaultValue="DiagPack_CDFET Temp_Fault" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">설명</th>
                    <td colSpan={3}>
                      <TextArea
                        rows={6}
                        resizable="none"
                        defaultValue="BMS 펌웨어 업데이트 실패"
                      />
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
                        defaultValue={"2"}
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
