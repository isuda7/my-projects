// HEXAADMSYM3S26 : 알림 상세

import { Input, RadioGroup, TextArea } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function HEXAADMSYM3S26() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>시스템 관리 </span>
        <span>알림 관리</span>
        <span>알림 상세</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">알림 상세</h2>
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
                      <DropDownList
                        defaultValue="전력량 이상 감지"
                        className="w310"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      일전력량 정상 범위(kWh)
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input className="w310" defaultValue="1,000" /> ~{" "}
                        <Input className="w310" defaultValue="50,000" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      발생 후, 미복귀 시간
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList
                        data={["1분", "5분", "10분", "15분", "20분", "30분"]}
                        defaultValue="20분"
                        className="w310"
                      />
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
                        <Input defaultValue="전력량 이상 감지 안내" />
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
                          <Input
                            id="name"
                            defaultValue="김엘지, 이엘지, 박엘지"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">메시지</th>
                    <td>
                      <div className="in-input">
                        <TextArea
                          rows={6}
                          resizable="none"
                          defaultValue="하기 스테이션내에서 이상 전력량이 감지되어 안내드립니다."
                        />
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
