// HEXAADMSTM3S52 : 충전 프로파일 상세

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAADMSTM3S52() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>충전 프로파일 및 배포 관리 </span>
        <span>충전 프로파일 관리 </span>
        <span>충전 프로파일 상세</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">충전 프로파일 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            {/* 충전 프로파일 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">충전 프로파일 정보</h3>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "14%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">충전프로파일NO</th>
                    <td>101</td>
                    <th scope="row">
                      충전 조건
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input defaultValue="0.3C 4.1V 충전" />
                      </div>
                    </td>
                    <th scope="row">
                      기본 여부
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList defaultValue="Y" />
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      전류(C)
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input defaultValue="0.3" />
                      </div>
                    </td>
                    <th scope="row">
                      전압(V)
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input defaultValue="4.1" />
                      </div>
                    </td>
                    <th scope="row">
                      Cutoff Current(C)
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input defaultValue="0.05" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      충전 Mode
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td colSpan={5}>
                      <DropDownList defaultValue="CC/CV" className="w200" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Derating Factor 1(전류)</th>
                    <td colSpan={5}>
                      <table className="tbl-base">
                        <colgroup>
                          <col style={{ width: "13%" }} />
                          <col style={{ width: "20%" }} />
                          <col style={{ width: "13%" }} />
                          <col style={{ width: "20%" }} />
                          <col style={{ width: "14%" }} />
                          <col style={{ width: "20%" }} />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th className="txt-center">
                              값
                              <span className="required">
                                <span className="sr-only">필수</span>
                              </span>
                            </th>
                            <td>
                              <div className="in-input">
                                <Input defaultValue="0.95" />
                              </div>
                            </td>
                            <th className="txt-center">
                              최소
                              <span className="required">
                                <span className="sr-only">필수</span>
                              </span>
                            </th>
                            <td>
                              <div className="in-input">
                                <Input defaultValue="0.8" />
                              </div>
                            </td>
                            <th className="txt-center">
                              최대
                              <span className="required">
                                <span className="sr-only">필수</span>
                              </span>
                            </th>
                            <td>
                              <div className="in-input">
                                <Input defaultValue="1.0" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Derating Factor 2(전압)</th>
                    <td colSpan={5}>
                      <table className="tbl-base">
                        <colgroup>
                          <col style={{ width: "13%" }} />
                          <col style={{ width: "20%" }} />
                          <col style={{ width: "13%" }} />
                          <col style={{ width: "20%" }} />
                          <col style={{ width: "14%" }} />
                          <col style={{ width: "20%" }} />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th className="txt-center">
                              값
                              <span className="required">
                                <span className="sr-only">필수</span>
                              </span>
                            </th>
                            <td>
                              <div className="in-input">
                                <Input defaultValue="1.005" />
                              </div>
                            </td>
                            <th className="txt-center">
                              최소
                              <span className="required">
                                <span className="sr-only">필수</span>
                              </span>
                            </th>
                            <td>
                              <div className="in-input">
                                <Input defaultValue="1.0" />
                              </div>
                            </td>
                            <th className="txt-center">
                              최대
                              <span className="required">
                                <span className="sr-only">필수</span>
                              </span>
                            </th>
                            <td>
                              <div className="in-input">
                                <Input defaultValue="1.02" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      조건NO
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td colSpan={2}>
                      <Button
                        size={"medium"}
                        fillMode="outline"
                        className="w80"
                      >
                        선택
                      </Button>
                      <span className="ml1"> 1, 3, 5 </span>
                    </td>
                    <th scope="row">
                      Step 충전 여부
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td colSpan={2}>
                      <DropDownList defaultValue="Y" className="w200" />
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
