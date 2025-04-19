// HEXAADMSTM1S54 : 고속 Step 충전 Map 등록

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";

export default function HEXAADMSTM1S54() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>충전 프로파일 및 배포 관리 </span>
        <span>고속 Step 충전 Map 관리</span>
        <span>고속 Step 충전 Map 등록 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">고속 Step 충전 Map 등록</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">Map 정보</h3>
                <div className="group-align-right gap0.38">
                  <Button
                    size={"small"}
                    fillMode="flat"
                    className="btn-in-icon"
                  >
                    행 추가
                    <i className="icon icon-plus"></i>
                  </Button>
                  <Button
                    size={"small"}
                    fillMode="flat"
                    className="btn-in-icon"
                  >
                    행 삭제
                    <i className="icon icon-minus"></i>
                  </Button>
                  <Button
                    size={"small"}
                    fillMode="flat"
                    className="btn-in-icon"
                  >
                    열 추가
                    <i className="icon icon-plus"></i>
                  </Button>
                  <Button
                    size={"small"}
                    fillMode="flat"
                    className="btn-in-icon"
                  >
                    열 삭제
                    <i className="icon icon-minus"></i>
                  </Button>
                </div>
              </div>

              <div>
                <table className="tbl-base">
                  <caption hidden>table</caption>
                  <colgroup>
                    {/* 대각선일 경우 사이즈 픽셀로 고정 */}
                    <col style={{ width: "480px" }} />
                    <col />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="diagonal">
                        <span>팩 온도 (℃)</span>
                        <span>팩 SOC</span>
                      </th>
                      <th>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100">
                            <Input />
                          </div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> T </span>
                            <span> ＜ </span>
                          </div>
                          <div className="w100">
                            <Input />
                          </div>
                        </div>
                      </th>
                      <th>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100">
                            <Input />
                          </div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> T </span>
                            <span> ≤ </span>
                          </div>
                          <div className="w100">
                            <Input />
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100 txt-center">0</div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> SOC </span>
                            <span> ＜ </span>
                          </div>
                          <div className="w100">
                            <Input />
                          </div>
                        </div>
                      </th>
                      <td>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w280">
                            <Input />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w280">
                            <Input />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100">
                            <Input />
                          </div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> SOC </span>
                            <span> ＜ </span>
                          </div>
                          <div className="w100">
                            <Input />
                          </div>
                        </div>
                      </th>
                      <td>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w280">
                            <Input />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w280">
                            <Input />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100">
                            <Input />
                          </div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> SOC </span>
                            <span> ＜ </span>
                          </div>
                          <div className="w100">
                            <Input />
                          </div>
                        </div>
                      </th>
                      <td>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w280">
                            <Input />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w280">
                            <Input />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100">
                            <Input />
                          </div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> SOC </span>
                            <span> ＜ </span>
                          </div>
                          <div className="w100 txt-center">100</div>
                        </div>
                      </th>
                      <td>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w280">
                            <Input />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w280">
                            <Input />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
