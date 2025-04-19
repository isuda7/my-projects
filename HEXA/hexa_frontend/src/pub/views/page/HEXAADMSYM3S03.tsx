// HEXAADMSYM3S03 : 사용자 상세

import { Input, RadioGroup } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAADMSYM3S03() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>시스템 관리 </span>
        <span>사용자 관리 </span>
        <span>사용자 상세</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">사용자 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">사용자 정보</h3>
                <div className="group-align-right gap0.38">
                  <Button size={"medium"}>계정 잠금 해제</Button>
                </div>
              </div>
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "80%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      권한
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList defaultValue="선택" className="w200" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      사용자ID
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <div className="inner-item mw400">
                          <Input
                            id="name"
                            value={"admin04123"}
                            className="disabled"
                          />
                          <Button
                            size={"medium"}
                            fillMode="outline"
                            className="w80 disabled"
                          >
                            중복 확인
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      이름
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input w310">
                        <Input value={"김엘지"} />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">이메일 주소</th>
                    <td>
                      <div className="in-input">
                        <Input id="name" className="w310" /> @{" "}
                        <DropDownList
                          defaultValue="선택"
                          data={["lgespartner.com", "lgensol.com"]}
                          className="w200"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      휴대폰 번호
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input
                          id="name"
                          className="w310"
                          placeholder="‘-’없이 숫자만 입력해주세요."
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">활성화 여부</th>
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
