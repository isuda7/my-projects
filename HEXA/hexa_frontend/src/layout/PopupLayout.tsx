import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {authSelector, isSignedInSelector} from "@/store/modules/userStore.ts";
import {useTranslation} from "react-i18next";
import {commonSlice} from "@/store/modules/commonStore.ts";
import {RootState} from "@/store";

// 하위 메뉴 펼침 시 class : 'is-active'
// 메뉴 활성화 class: 'on'
// 1depth 메뉴 아이콘 icon, 2depth 메뉴 아이콘 sicon : 아이콘 class 추가 예정입니다

export default function PopupLayout() {
  const { i18n } = useTranslation();
  const langauge = useSelector((state: RootState) => state.commonStore.language);
  const navigate = useNavigate();

  const auth = useSelector(authSelector);
  const isSignedIn = useSelector(isSignedInSelector);

  useEffect(() => {
    const signInLocal = window.localStorage.getItem("signIn");
    if (!isSignedIn || signInLocal != "true") {
      navigate("/sign-in");
    }
  }, [auth]);

  useEffect(() => {
    const parentLang = window.opener?.document.documentElement.lang;
    if (parentLang && i18n.language !== parentLang) {
      i18n.changeLanguage(parentLang);
    }else if(!parentLang && i18n.language !== langauge){
      i18n.changeLanguage(langauge);
    }
  }, []);

  return (
    <div className="wrap">
      {/* winpop */}
      <div className="win-pop">
        <Outlet/>
      </div>
    </div>
  );
}
