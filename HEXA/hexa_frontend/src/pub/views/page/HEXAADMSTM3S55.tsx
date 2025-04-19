// HEXAADMSTM3S55 : 고속 Step 충전 Map 상세

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAADMSTM3S55() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>충전 프로파일 및 배포 관리 </span>
        <span>고속 Step 충전 Map 관리</span>
        <span>고속 Step 충전 Map 상세 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">고속 Step 충전 Map 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">Map 정보</h3>
              </div>

              <div>
                <table className="tbl-base">
                  <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "30%" }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">충전Map ID</th>
                      <td>MAP00123</td>
                      <th scope="row">
                        사용여부
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </th>
                      <td>
                        <DropDownList defaultValue="Y" className="w100" />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="tbl-base mt2">
                  <colgroup>
                    {/* 대각선일 경우 사이즈 픽셀로 고정 */}
                    <col style={{ width: "480px" }} />
                    <col />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="diagonal">
                        <span>팩 온도</span>
                        <span>팩 SOC</span>
                      </th>
                      <th>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100">10</div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> T </span>
                            <span> ＜ </span>
                          </div>
                          <div className="w100">25°C</div>
                        </div>
                      </th>
                      <th>
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100">25</div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> T </span>
                            <span> ≤ </span>
                          </div>
                          <div className="w100">45°C</div>
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
                          <div className="w100  txt-center">54</div>
                        </div>
                      </th>
                      <td className="txt-center">0.4</td>
                      <td className="txt-center">0.4</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100  txt-center">54</div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> SOC </span>
                            <span> ＜ </span>
                          </div>
                          <div className="w100 txt-center">71</div>
                        </div>
                      </th>
                      <td className="txt-center">0.4</td>
                      <td className="txt-center">0.4</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100  txt-center">71</div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> SOC </span>
                            <span> ＜ </span>
                          </div>
                          <div className="w100  txt-center">80</div>
                        </div>
                      </th>
                      <td className="txt-center">0.3</td>
                      <td className="txt-center">0.3</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div className="row flex-gap-1 flex-center">
                          <div className="w100 txt-center">80</div>
                          <div className="row flex-gap-0.5">
                            <span> ≤ </span>
                            <span> SOC </span>
                            <span> ＜ </span>
                          </div>
                          <div className="w100 txt-center">100</div>
                        </div>
                      </th>
                      <td className="txt-center">0.3</td>
                      <td className="txt-center">0.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                    <td>
                      <span className="cell-date">2024-08-20</span>
                      <span className="cell-time">00:18:51</span>
                    </td>
                    <th scope="row">등록자 ID</th>
                    <td>superadmin01</td>
                  </tr>
                  <tr>
                    <th scope="row">수정일시</th>
                    <td>
                      <span className="cell-date">2024-08-20</span>
                      <span className="cell-time">00:18:51</span>
                    </td>
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
