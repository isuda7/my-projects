import React, {useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useSelector} from "react-redux";
import {Menu} from "@/utils/apiService/type/auth/menu.type.ts";
import {authSelector, isSignedInSelector, menuSelector} from "@/store/modules/userStore.ts";
import _ from 'lodash';

import Footer from "@/components/common/Footer.tsx";
import MainHeader from "@/new_components/common/MainHeader.tsx";
import MenuAccessApiService from "@/utils/apiService/menu/MenuAccessApiService.ts";
import { ORIGIN_MENU_LIST } from "@/new_components/constant";
import {persistor} from "@/store";
import useAlert from "@/hooks/useAlert.tsx";
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import {Button} from "@progress/kendo-react-buttons";
import SessionTimeout from "@/new_components/common/SessionTimeout.tsx";

// 하위 메뉴 펼침 시 class : 'is-active'
// 메뉴 활성화 class: 'on'
// 1depth 메뉴 아이콘 icon, 2depth 메뉴 아이콘 icon : 아이콘 class 추가 예정입니다
export default function MainLayout() {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();

  const auth = useSelector(authSelector);
  const isSignedIn = useSelector(isSignedInSelector);
  const menuList = useSelector(menuSelector);
  const [apiMenuList, setApiMenuList] = useState<Menu[]>(menuList);
  const [noneLayoutFlag, setNoneLayoutFlag] = useState<boolean>(false); //HOME일땐 Footer안나옴

  const [sideActive, setsideActive] = useState(false); // 왼쪽 메뉴 펼침, 접힘.
  const [activeIndex, setActiveIndex] = useState<number>(); // 1 depth 메뉴 active
  const [activeIndex2dep, setActiveIndex2dep] = useState<number>(); // 2 depth 메뉴 active
  const [clickedIdx2dep, setClickedIdx2dep] = useState<number>(); // 2 depth 메뉴 on
  const [clickedIdx3dep, setClickedIdx3dep] = useState<number>(); // 3 depth 메뉴 on
  const [visibleAutoLogout, setVisibleAutoLogout] = React.useState(false);
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

    if(MENU_LIST[idx].list.filter((menu: any) => menu.type === 'L').length === 0){
      setsideActive(false)
      navigate(`${MENU_LIST[idx].path}`);
    }else{
      setsideActive(true)
    }

  };

  // 2 depth 메뉴 클릭
  const handle2DepClick = (itemSub: any, i: number) => {
    if (!MENU_LIST) return;
    setClickedIdx2dep(i);
    if (itemSub.list.filter((menu: any) => menu.type === 'L').length > 0) {
      setActiveIndex2dep(i === activeIndex2dep ? undefined : i); // 같은 메뉴를 누르면 토글
    } else {
        navigate(`${itemSub.path}`);
    }

    setActiveIndex2dep(i);
  };

  // 3 depth 메뉴 클릭
  const handleLink = (i: number, depth2Item: any, depth3Item: any) => {
    setClickedIdx3dep(i);
    navigate(`${depth3Item.path}`);
  };

  // lnb 툴팁 위치
  const fnHover = (e: any) => {
    const topPosOffset = e.target.getBoundingClientRect();
    const child = e.target.querySelector("span") as HTMLElement;
    child.style.top = topPosOffset.top + 11 + "px";
  };



  const buildMenuList = (menuItem: any) => {
    // 하위 메뉴의 이름들만 추출합니다.
    const list = menuItem.children
      ? menuItem.children.map((subItem: any) => buildMenuList(subItem)) // 재귀적으로 하위 메뉴를 처리합니다.
      : [];
    //TODO : 메뉴 아이콘 임시 하드코딩
    const flattenMenu = (menuList: any[]): any[] => {
      return menuList.reduce((acc: any[], menu: any) => {
        acc.push(menu);
        if (menu.list) {
          acc.push(...flattenMenu(menu.list));
        }
        return acc;
      }, []);
    };
    
    const base64Data = menuItem.iconBlobData? `data:image/png;base64,${menuItem.iconBlobData}` : null;
    const menu1 = flattenMenu(ORIGIN_MENU_LIST).find(menu => menu.title == menuItem.name);
    //메뉴 아이콘 임시 하드코딩
    return {
      icon: base64Data? base64Data : menu1?.icon || '/images/m-1dep-icon-switchboard.svg',
      title: i18n.language === 'ko'? menuItem.name : menuItem.engName,
      path: menuItem.url,
      type: menuItem.type,
      grantType: menuItem.grantType,
      list, // 하위 메뉴를 list로 저장
    };
  };

  const MENU_LIST = apiMenuList?.map(buildMenuList);

  useEffect(() => {
    const signInLocal = window.localStorage.getItem("signIn");
    if (!isSignedIn || signInLocal != "true") {
      navigate("/sign-in");
    } else {
      if(window.location.pathname == "/"){
        navigate("/home");
      }
    }
  }, [auth]);

  useEffect(() => {
    const path = window.location.pathname;
    MenuAccessApiService().accessLog({pageUrl: path}).then(r =>console.log(r));

    if(path === '/home' || path === '/dashboard') setNoneLayoutFlag(false)
    else setNoneLayoutFlag(true)

    //ScrollToTop
    const contentsElement = document.querySelector('.contents') as HTMLElement;
    if (contentsElement) {
      contentsElement.scrollTo(0, 0);
    }
  }, [window.location.pathname]);

  //재귀적으로 메뉴 필터링해서 반환해주는 함수
  const filterMenuRecursively = (menu: any): any | null => {
    // 현재 메뉴가 조건을 만족하지 않으면 null 반환
    if (!(menu.type === 'L' && menu.grantType.includes('READ'))) {
      return null;
    }
  
    // 자식 메뉴가 있으면 재귀적으로 필터링
    let filteredChildren = [];
    if (menu.list && menu.list.length > 0) {
      filteredChildren = menu.list
        .map(filterMenuRecursively)
        .filter((child: any) => child !== null);
    }
  
    return { ...menu, list: filteredChildren };
  };

  //useEffect: URL 변경 감지 시 해당 메뉴를 active 상태로 업데이트
  useEffect(() => {
    const currentPath = location.pathname;
    let found = false;

    // 전체 MENU_LIST를 재귀적으로 필터링
    const filteredMenuList = MENU_LIST.map(filterMenuRecursively).filter(menu => menu !== null);

    filteredMenuList.forEach((menu, i) => {
      if (found) return;
      // 1 depth 메뉴 경로 일치 확인
      if (menu.path === currentPath) {
        setActiveIndex(i);
        setActiveIndex2dep(undefined);
        setClickedIdx2dep(undefined);
        setClickedIdx3dep(undefined);
        found = true;
      } else if (menu.list && menu.list.length > 0) {
        menu.list.forEach((subMenu: any, j: number) => {
          if (found) return;
          if (subMenu.path === currentPath) {
            setActiveIndex(i);
            setActiveIndex2dep(j);
            setClickedIdx2dep(j);
            setClickedIdx3dep(undefined);
            found = true;
          } else if (subMenu.list && subMenu.list.length > 0) {
            subMenu.list.forEach((subSubMenu: any, k: number) => {
              if (found) return;
              if (subSubMenu.path === currentPath) {
                setActiveIndex(i);
                setActiveIndex2dep(j);
                setClickedIdx2dep(j);
                setClickedIdx3dep(k);
                found = true;
              }
            });
          }
        });
      }
    });
  }, [location.pathname]);

  return (

    <div className="wrap">
      {/* side */}
      <div className={`sidebar ${sideActive ? "is-active" : ""}`}>
        <div className={`btnfixed ${sideActive ? "is-active" : ""}`}>
          <button className="btn-fixed" type="button" onClick={fnNav}>
            <span className="k-sr-only">메뉴</span>
          </button>
        </div>

        <nav className="sidemenu">
          <Link to="/home">
            <div className="sidebar-logo"></div>
          </Link>
          <ul className="menu-depth1">
            {MENU_LIST?.filter((menu) => menu.type === 'L' && menu.grantType.includes('READ')).map((item, idx) => {
              const active = idx === activeIndex ? "is-active" : "";
              const views = item?.list.length === 0;
              return (
                <li key={idx}>
                  <button
                      type="button"
                      className={`${item.icon} ${active}`}
                      onClick={() => handleClick(idx)}
                      onMouseEnter={fnHover}
                  >
                    <figure className="icon">
                      <img src={item.icon}/>
                    </figure>
                    <span>{item.title}</span>
                  </button>

                  {!views && (
                      <ul className={`menu-depth2 ${active}`}>
                      {item?.list.filter((menu: any) => menu.type === 'L' && menu.grantType.includes('READ')).map((itemSub: any, i: number) => {
                        const active2dep =
                          i === activeIndex2dep ? "is-active" : "";
                        const btnActive2dep = i === clickedIdx2dep ? "on" : "";
                        const viewsD = itemSub?.list.length === 0;

                        return (
                          <li key={i}>
                            <button
                              type="button"
                              className={btnActive2dep}
                              onClick={() => handle2DepClick(itemSub, i)}
                            >
                              <figure className="icon">
                                <img src={itemSub.icon}/>
                              </figure>
                              <span>{itemSub.title}</span>
                            </button>

                            {!viewsD && (
                              <ul className={`menu-depth3 ${active2dep}`}>
                                {itemSub?.list.filter((menu: any) => menu.type === 'L' && menu.grantType.includes('READ')).map((itemSubD: any, idxx: number) => {
                                  const btnActive3dep =
                                    idxx === clickedIdx3dep ? "on" : "";
                                  return (
                                    <li key={idxx}>
                                      <button
                                        type="button"
                                        className={btnActive3dep}
                                        onClick={() => handleLink(idxx, itemSub, itemSubD)}
                                      >
                                        <span className="circle-icon"></span>
                                        <span>{itemSubD.title}</span>
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
        <MainHeader />

        {
          noneLayoutFlag ?
          <div className="contents">
            {/* contents */}
            <div className="content">
              <Outlet />
            </div>
            <Footer />
          </div>
          :
          <Outlet />
        }

      </div>

    </div>



  );

}
