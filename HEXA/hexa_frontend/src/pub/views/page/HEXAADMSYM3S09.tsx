// HEXAADMSYM3S09 : 권한 상세

import * as React from "react";
import { Input, RadioGroup, Checkbox } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

export default function HEXAADMSYM3S09() {
  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>시스템 관리 </span>
        <span>권한 관리 </span>
        <span>권한 상세</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">권한 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">권한 정보</h3>
              </div>
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "40%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      권한 그룹
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input id="ngroup" />
                      </div>
                    </td>
                    <th scope="row">
                      권한 그룹(영문)
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input id="ngroup" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">설명</th>
                    <td colSpan={3}>
                      <div className="in-input">
                        <Input id="desc" />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">사용 여부</th>
                    <td colSpan={3}>
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

            <section className="section">
              <div className="title-group">
                <h3 className="t-title">
                  메뉴별 권한 설정
                  <span className="required">
                    <span className="sr-only">필수</span>
                  </span>
                </h3>
              </div>

              <div className="tbl-scroll">
                <div className="tbl-scroll-head">
                  <table className="tbl-base">
                    <colgroup>
                      <col style={{ width: "70%" }} />
                      <col style={{ width: "15%" }} />
                      <col style={{ width: "15%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col">메뉴명</th>
                        <th scope="col">
                          <Checkbox label="R(조회)" defaultChecked={false} />
                        </th>
                        <th scope="col">
                          <Checkbox label="C(등록)" defaultChecked={false} />
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="tbl-scroll-body">
                  <table className="tbl-base">
                    <colgroup>
                      <col style={{ width: "70%" }} />
                      <col style={{ width: "15%" }} />
                      <col style={{ width: "15%" }} />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td>
                          <span className="level-0">대시보드_관리자</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-0">대시보드</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-0">스테이션 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">스테이션 정보 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">생산정보 현황</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">스테이션 정보 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">로그 다운로드</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">스테이션 코드 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">스테이션ID 코드</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">스테이션QR 코드</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">펌웨어 및 배포 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">펌웨어 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">펌웨어 배포 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">스테이션 설정 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">스테이션 설정 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">스테이션 설정 현황</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">스테이션 초기 설정</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">
                            충전 프로파일 및 배포 관리
                          </span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">충전 프로파일 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">충전 프로파일 배포</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">스테이션 이력 조회</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-2">스테이션 통계 정보</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-0">배터리 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">배터리 정보 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">배터리 사용 변경 이력</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">
                            배터리 교환 및 위치 이력
                          </span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">
                            배터리 교환 및 위치 이력
                          </span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">배터리 예약 이력</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">배터리 충전 이력</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">배터리 통계정보</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">배터리 주요지표 이력</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-0">고장 및 통신 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">스테이션 고장 이력</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">배터리 진단 이력</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">고장코드 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">통신단절 현황</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-0">게시판</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">공지사항</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">사용자 매뉴얼</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-0">시스템 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">사용자 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">권한 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">메뉴 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">API Key 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">접속 로그 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">코드 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="level-1">알림 관리</span>
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                        <td className="txt-center">
                          <Checkbox defaultChecked={false} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
