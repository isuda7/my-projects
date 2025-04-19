// HEXAADMSYM2S10 : 메뉴 관리
// layout LayoutGuideSystem 사용 (대시보드와 동일한 형태)

import * as React from "react";
import { useState, useRef } from "react";
import { Input, RadioGroup } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

export default function HEXAADMSYM2S10() {
  const [accoActive1d, setAccoActive1d] = useState(1);

  // acco 클릭
  const handleClick1d = (idx1: any) => {
    setAccoActive1d(idx1);
  };

  const [items, setItems] = useState([
    {
      id: 0,
      title: "대시보드",
    },
    {
      id: 1,
      title: "스테이션 관리",
      list: [
        {
          id: 0,
          title: "스테이션 정보 관리",
          list: [
            {
              id: 0,
              title: "생산정보 현황",
            },
            {
              id: 1,
              title: "스테이션 정보 관리",
            },
            {
              id: 2,
              title: "스테이션 로그 다운로드",
            },
          ],
        },
        {
          id: 1,
          title: "스테이션 코드 관리",
          list: [
            {
              id: 0,
              title: "스테이션ID 코드",
            },
            {
              id: 1,
              title: "스테이션 QR 코드",
            },
          ],
        },
        {
          id: 2,
          title: "펌웨어 및 배포 관리",
          list: [
            {
              id: 0,
              title: "펌웨어 관리",
            },
            {
              id: 1,
              title: "펌웨어 배포 관리",
            },
          ],
        },
        {
          id: 3,
          title: "스테이션 설정 관리",
          list: [
            {
              id: 0,
              title: "스테이션 설정 관리",
            },
            {
              id: 1,
              title: "스테이션 설정 현황",
            },
            {
              id: 2,
              title: "스테이션 초기 설정",
            },
          ],
        },
        {
          id: 4,
          title: "충전 프로파일 및 배포 관리",
          list: [
            {
              id: 0,
              title: "충전 프로파일 관리",
            },
            {
              id: 1,
              title: "충전 프로파일 배포",
            },
          ],
        },
        {
          id: 5,
          title: "스테이션 이력 조회",
          list: [
            {
              id: 0,
              title: "대시보드 제어 이력",
            },
            {
              id: 1,
              title: "스테이션 충전 이력",
            },
            {
              id: 2,
              title: "스테이션 수집 Data 이력 조회",
            },
          ],
        },
        {
          id: 6,
          title: "스테이션 통계 정보",
          list: [
            {
              id: 0,
              title: "스테이션별 누적 교체횟수",
            },
            {
              id: 1,
              title: "함체,슬롯별 교체횟수",
            },
            {
              id: 2,
              title: "스테이션별 누적 교체 실패횟수",
            },
            {
              id: 3,
              title: "전력사용량",
            },
            {
              id: 4,
              title: "스테이션별 예약 건수",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "배터리 관리",
      list: [
        {
          title: "배터리 정보 관리",
        },
        {
          title: "배터리 사용 변경 이력",
        },
        {
          title: "배터리 교환 및 위치 이력",
        },
        {
          title: "배터리 예약 이력",
        },
        {
          title: "배터리 충전 이력",
        },
        {
          title: "배터리 통계정보",
        },
        {
          title: "배터리 주요지표 이력",
          list: [
            {
              title: "배터리 사용량 평균",
            },
            {
              title: "배터리 주요지표 월변화량",
            },
            {
              title: "SOH 조회",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "고장 및 통신 관리",
      list: [
        {
          title: "스테이션 고장 이력",
        },
        {
          title: "배터리 진단 이력",
        },
        {
          title: "고장코드 관리",
        },
        {
          title: "통신단절 현황",
        },
      ],
    },
    {
      id: 4,
      title: "게시판",
      list: [
        {
          title: "공지사항",
        },
        {
          title: "사용자 매뉴얼",
        },
      ],
    },
  ]);

  return (
    <>
      <div className="contents system">
        <div className="menu-box">
          <div className="menu-box-left">
            <div className="title-group">
              <h3 className="t-title">전체 메뉴</h3>
              <div className="group-align-right">
                <Button size={"small"}>메뉴 추가</Button>
              </div>
            </div>

            <div className="menu-acco">
              <ul className="menu-acco-level-0" role="list">
                {items.map((item, idx1) => {
                  const active = idx1 === accoActive1d;
                  const dept = item.list == undefined;

                  const [accoActive2d, setAccoActive2d] = useState();
                  const handleClick2d = (idx2: any) => {
                    setAccoActive2d(idx2);
                  };

                  return (
                    <li key={idx1} role="listitem">
                      <span
                        className={`${active ? "is-active" : ""} ${!dept ? "in-icon" : ""}`}
                        onClick={() => {
                          handleClick2d(null);
                          if (!active) {
                            handleClick1d(idx1);
                          } else {
                            handleClick1d(null);
                          }
                        }}
                      >
                        {item.title}
                      </span>

                      {!dept && (
                        <ul
                          className={`menu-acco-level-1 ${active ? "is-active" : ""}`}
                          role="group"
                        >
                          {item.list.map((item, idx2) => {
                            const active =
                              idx2 === accoActive2d ? "is-active" : "";
                            const dept = item.list == undefined;

                            const [accoActive3d, setAccoActive3d] = useState();
                            const handleClick3d = (idx3: any) => {
                              setAccoActive3d(idx3);
                            };

                            return (
                              <li key={idx2} role="listitem">
                                <span
                                  className={`${active}`}
                                  onClick={() => {
                                    handleClick2d(idx2);
                                    handleClick3d(null);
                                  }}
                                >
                                  {item.title}
                                </span>

                                {!dept && (
                                  <ul
                                    className={`menu-acco-level-2`}
                                    role="group"
                                  >
                                    {item.list.map((item, idx3) => {
                                      const active =
                                        idx3 === accoActive3d &&
                                        idx2 === accoActive2d
                                          ? "is-active"
                                          : "";

                                      return (
                                        <li key={idx3} role="listitem">
                                          <span
                                            className={`${active}`}
                                            onClick={() => {
                                              handleClick3d(idx3);
                                              handleClick2d(idx2);
                                            }}
                                          >
                                            {item.title}
                                          </span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="menu-btns">
              <Button themeColor={"info"}>
                <i className="icon icon-arr-up"></i>
              </Button>
              <Button themeColor={"info"}>
                <i className="icon icon-arr-down"></i>
              </Button>
            </div>
          </div>
          <div className="menu-box-right">
            <div className="breadcrumbs">
              <span>홈</span>
              <span>시스템 관리 </span>
              <span>메뉴 관리 </span>
            </div>

            <div className="head-group">
              <h2 className="t-header">메뉴 관리</h2>
            </div>
            <Form
              render={() => (
                <FormElement>
                  {/* 메뉴 상세 정보 */}
                  <section className="section">
                    <div className="title-group">
                      <h3 className="t-title">메뉴 상세 정보</h3>
                    </div>
                    <table className="tbl-base">
                      <colgroup>
                        <col style={{ width: "30%" }} />
                        <col style={{ width: "70%" }} />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row">
                            메뉴명
                            <span className="required">
                              <span className="sr-only">필수</span>
                            </span>
                          </th>
                          <td>
                            <div className="in-input">
                              <Input id="newmenu" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            메뉴명(영문)
                            <span className="required">
                              <span className="sr-only">필수</span>
                            </span>
                          </th>
                          <td>
                            <div className="in-input">
                              <Input id="newmenuE" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            URL
                            <span className="required">
                              <span className="sr-only">필수</span>
                            </span>
                          </th>
                          <td>
                            <div className="in-input">
                              <Input
                                id="url"
                                value={"/station/img/img001.png"}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">아이콘</th>
                          <td>
                            ※ 1 Level img size : 32px x 32px <br />※ 2 Level img
                            size : 21px x 21px
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

            {/* footer */}
            <footer className="footer">
              <div>
                <span className="footer-logo"></span>
                <span>
                  Copyright ⓒ 2024 KooRoo Company. All right reserved.
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
