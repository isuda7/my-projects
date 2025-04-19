import { Outlet } from "react-router-dom";
import { useState } from "react";

import { loadMessages, LocalizationProvider } from "@progress/kendo-react-intl";
import esMessages from "../../components/guide/ko.json";
loadMessages(esMessages, "ko");

import Dropbox from "../../components/Dropbox.tsx";
import Droppop from "../../components/Droppop.tsx";
import { Link } from "react-router-dom";

// 하위 메뉴 펼침 시 class : 'is-active'
// 메뉴 활성화 class: 'on'
// 1depth 메뉴 아이콘 icon, 2depth 메뉴 아이콘 sicon : 아이콘 class 추가 예정입니다

export default function LayoutGuide() {
  const [sideActive, setsideActive] = useState(false); // 왼쪽 메뉴 펼침, 접힘.
  const [activeIndex, setActiveIndex] = useState(); // 1 depth 메뉴 active
  const [activeIndex2dep, setActiveIndex2dep] = useState(); // 2 depth 메뉴 active
  const [clickedIdx2dep, setClickedIdx2dep] = useState(); // 2 depth 메뉴 on
  const [clickedIdx3dep, setClickedIdx3dep] = useState(); // 3 depth 메뉴 on

  // 왼쪽 메뉴 펼침, 접힘.
  const fnNav = () => {
    setsideActive(!sideActive);
  };

  // 1 depth 메뉴 클릭
  const handleClick = (idx: any) => {
    setActiveIndex(idx);
    setActiveIndex2dep(undefined);
    setClickedIdx2dep(undefined);
    setClickedIdx3dep(undefined);

    MENU_LIST[idx].list.length === 0
      ? setsideActive(false)
      : setsideActive(true);
  };

  // 2 depth 메뉴 클릭
  const handle2DepClick = (i: any) => {
    setActiveIndex2dep(i);
    setClickedIdx2dep(i);
  };

  // 3 depth 메뉴 클릭
  const handleLink = (i: any) => {
    setClickedIdx3dep(i);
  };

  // lnb 툴팁 위치
  const fnHover = (e: any) => {
    const topPosOffset = e.target.getBoundingClientRect();
    const child = e.target.querySelector("span") as HTMLElement;
    child.style.top = topPosOffset.top + 11 + "px";
  };

  const MENU_LIST = [
    {
      icon: "/images/m-1dep-icon-dashboard.svg",
      title: "대시보드",
      list: [],
    },
    {
      icon: "/images/m-1dep-icon-switchboard.svg",
      title: "스테이션 관리",
      list: [
        {
          sicon: "/images/m-2dep-icon-switchboard-01.svg",
          stitle: "스테이션 정보 관리",
          slist: ["생산정보 현황", "스테이션 정보 관리", "로그 다운로드"],
        },
        {
          sicon: "/images/m-2dep-icon-switchboard-02.svg",
          stitle: "스테이션 코드 관리",
          slist: ["스테이션ID 코드", "스테이션 QR코드"],
        },
        {
          sicon: "/images/m-2dep-icon-switchboard-03.svg",
          stitle: "펌웨어 및 배포 관리",
          slist: ["펌웨어 관리", "펌웨어 배포 관리"],
        },
        {
          sicon: "/images/m-2dep-icon-switchboard-04.svg",
          stitle: "스테이션 설정 관리",
          slist: [
            "스테이션 설정 관리",
            "스테이션 설정 현황",
            "Window PC 재부팅",
            "스테이션 초기 설정",
          ],
        },
        {
          sicon: "/images/m-2dep-icon-switchboard-05.svg",
          stitle: "충전 프로파일 및 배포 관리",
          slist: [
            "충전 프로파일 관리",
            "충전 프로파일 배포",
            "고속 Step 충전 Map",
          ],
        },
        {
          sicon: "/images/m-2dep-icon-switchboard-06.svg",
          stitle: "스테이션 이력 조회",
          slist: [
            "대시보드 제어 이력",
            "스테이션별 충전 이력",
            "수집 Data 이력",
          ],
        },
        {
          sicon: "/images/m-2dep-icon-switchboard-07.svg",
          stitle: "스테이션 통계 정보",
          slist: [
            "교한기별 교환횟수",
            "함체,슬롯별 교환횟수",
            "스테이션별 교환 실패횟수",
            "전력사용량 조회",
            "스테이션별 예약건수",
          ],
        },
      ],
    },
    {
      icon: "/images/m-1dep-icon-battery.svg",
      title: "배터리 관리",
      list: [
        {
          sicon: "/images/m-2dep-icon-battery-01.svg",
          stitle: "배터리 정보 관리",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-battery-02.svg",
          stitle: "배터리 사용 이력",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-battery-03.svg",
          stitle: "배터리 교환 및 위치 이력",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-battery-04.svg",
          stitle: "배터리 예약 이력",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-battery-05.svg",
          stitle: "배터리 충전 이력",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-battery-06.svg",
          stitle: "배터리 상태변화 정보",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-battery-07.svg",
          stitle: "배터리 주요지표",
          slist: [],
        },
      ],
    },
    {
      icon: "/images/m-1dep-icon-breakdown.svg",
      title: "고장 및 통신 관리",
      list: [
        {
          sicon: "/images/m-2dep-icon-breakdown-01.svg",
          stitle: "스테이션 고장 이력",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-breakdown-02.svg",
          stitle: "배터리 진단 이력",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-breakdown-03.svg",
          stitle: "고장코드 관리",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-breakdown-04.svg",
          stitle: "통신단절 현황",
          slist: [],
        },
      ],
    },
    {
      icon: "/images/m-1dep-icon-board.svg",
      title: "게시판",
      list: [
        {
          sicon: "/images/m-2dep-icon-board-01.svg",
          stitle: "공지사항",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-board-02.svg",
          stitle: "사용자 매뉴얼",
          slist: [],
        },
      ],
    },
    {
      icon: "/images/m-1dep-icon-system.svg",
      title: "시스템 관리",
      list: [
        {
          sicon: "/images/m-2dep-icon-system-01.svg",
          stitle: "사용자 관리",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-system-02.svg",
          stitle: "권한 관리",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-system-03.svg",
          stitle: "메뉴 관리",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-system-04.svg",
          stitle: "API Key 관리",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-system-05.svg",
          stitle: "접속 로그 관리",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-system-06.svg",
          stitle: "코드 관리",
          slist: [],
        },
        {
          sicon: "/images/m-2dep-icon-system-07.svg",
          stitle: "알림 관리",
          slist: [],
        },
      ],
    },
  ];
  const langList = [
    {
      value: "ko",
      title: "한국어",
    },
    {
      value: "en",
      title: "English",
    },
  ];
  const profileList = [
    { value: "a1", title: "마이 페이지" },
    { value: "a2", title: "비밀번호 변경" },
    { value: "a3", title: "로그아웃" },
  ];

  return (
    <LocalizationProvider language="ko">
      <div className="wrap">
        {/* side */}
        <div className={`sidebar ${sideActive ? "is-active" : ""}`}>
          <div className={`btnfixed ${sideActive ? "is-active" : ""}`}>
            <button className="btn-fixed" type="button" onClick={fnNav}>
              <span className="k-sr-only">메뉴</span>
            </button>
          </div>

          <nav className="sidemenu">
            <Link to="/">
              <div className="sidebar-logo"></div>
            </Link>
            <ul className="menu-depth1">
              {MENU_LIST.map((item, idx) => {
                const active = idx === activeIndex ? "is-active" : "";
                const views = item.list.length === 0;

                return (
                  <li key={idx}>
                    <button
                      type="button"
                      className={`${active}`}
                      onClick={() => handleClick(idx)}
                      onMouseEnter={fnHover}
                    >
                      <figure className="icon-img">
                        <img src={item.icon} />
                      </figure>
                      <span>{item.title}</span>
                    </button>

                    {!views && (
                      <ul className={`menu-depth2 ${active}`}>
                        {item.list.map((itemSub, i) => {
                          const active2dep =
                            i === activeIndex2dep ? "is-active" : "";
                          const btnActive2dep =
                            i === clickedIdx2dep ? "on" : "";
                          const viewsD = itemSub.slist.length === 0;

                          return (
                            <li key={i}>
                              <button
                                type="button"
                                className={btnActive2dep}
                                onClick={() => handle2DepClick(i)}
                              >
                                <figure className="icon">
                                  <img src={itemSub.sicon} />
                                </figure>
                                <span>{itemSub.stitle}</span>
                              </button>

                              {!viewsD && (
                                <ul className={`menu-depth3 ${active2dep}`}>
                                  {itemSub.slist.map((itemSubD, idxx) => {
                                    const btnActive3dep =
                                      idxx === clickedIdx3dep ? "on" : "";
                                    return (
                                      <li key={idxx}>
                                        <button
                                          type="button"
                                          className={btnActive3dep}
                                          onClick={() => handleLink(idxx)}
                                        >
                                          <span>{itemSubD}</span>
                                        </button>
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
          </nav>
        </div>

        {/* contentswrap */}
        <div className={`contentswrap ${sideActive ? "is-active" : ""}`}>
          {/* header */}
          <div className="header">
            <div className="gnb-warp">
              <div className="logo-wrap">
                <Link to="/">
                  <h1 className="logo">
                    <span className="sr-only">KOOROO Hexa</span>
                  </h1>
                </Link>
              </div>

              <div className="group-align-right">
                <div className="gnb-profile">
                  <Droppop
                    list={profileList}
                    defaultvalue="a1"
                    text="김쿠루 타요타"
                  />
                </div>

                <div className="gnb-lang">
                  <Dropbox list={langList} />
                </div>
              </div>
            </div>
          </div>

          <div className="contents">
            {/* contents */}
            <div className="content">
              <Outlet />
            </div>

            {/* footer */}
            <footer className="footer">
              <div>
                <span className="footer-logo"></span>
                <span>
                  Copyright ⓒ 2024 LG Energy Solution. All right reserved.
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
