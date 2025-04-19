// HEXAADMBTM3S02 : 배터리 정보 상세

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { DatePicker } from "@progress/kendo-react-dateinputs";

export default function HEXAADMBTM3S02() {
  // datepicker
  const [value, setValue] = React.useState(new Date("2024-08-19"));
  const changeDateStart = () => {
    setValue(value);
  };

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>배터리 관리 </span>
        <span>배터리 정보 관리 </span>
        <span>배터리 정보 상세</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">배터리 정보 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            {/* 배터리 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">배터리 정보</h3>
                <div className="group-align-right gap0.38">
                  <Button size={"medium"}>예약 이력</Button>
                  <Button size={"medium"}>충전 이력</Button>
                  <Button size={"medium"}>교환 및 위치 이력</Button>
                  <Button size={"medium"}>사용 변경 이력</Button>
                </div>
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
                    <th scope="row">배터리ID</th>
                    <td>2024081908415</td>
                    <th scope="row">SOH(%)</th>
                    <td>94 (수집일시 2024-07-19 20:08:19)</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      생산년월일
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="datepicker">
                        <div className="in-input w200">
                          <Input value={"2024-08-19"} disabled />
                        </div>
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
                        <Input value={"84150"} disabled />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">BMS 버전</th>
                    <td>1.1.000</td>
                    <th scope="row">
                      HW버전
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input value={"1.0.00"} />
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
                      <DropDownList defaultValue="등록" className="w200" />
                    </td>
                    <th scope="row">
                      사용구분2
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList defaultValue="사용대기" className="w200" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">스테이션명</th>
                    <td>GS25강남점</td>
                    <th scope="row">차대번호</th>
                    <td></td>
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
                    <th scope="row">등록자</th>
                    <td>superadmin01</td>
                  </tr>
                  <tr>
                    <th scope="row">수정일시</th>
                    <td>2024-07-19 20:08:19</td>
                    <th scope="row">수정자</th>
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
