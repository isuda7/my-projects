import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {authSelector, isSignedInSelector} from "@/store/modules/userStore.ts";
import { Button } from "@progress/kendo-react-buttons";

export default function MobileLayout() {
  const navigate = useNavigate();

  const auth = useSelector(authSelector);
  const isSignedIn = useSelector(isSignedInSelector);

  useEffect(() => {
    /**
     * 모바일일떄 자동확대안하도록 막는 로직
     * TODO: 적용 확인해봐야함
     */
    const metaTag = document.createElement("meta");
    metaTag.name = "viewport";
    metaTag.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.head.appendChild(metaTag);
    /*********** 종료 ********/

    const originUrl = window.location.host;

    const originParts = originUrl.split(".");
    const subDomain = originParts.length > 2 ? originParts[0] : "";
    // if (subDomain !== import.meta.env.VITE_MOBILE_SUB_DOMAIN && subDomain !== "") {
    //   window.location.href = originUrl.replace(subDomain, import.meta.env.VITE_MOBILE_SUB_DOMAIN);
    // }
  }, []);

  useEffect(() => {
    const signInLocal = window.localStorage.getItem("signIn");
    if (!isSignedIn || signInLocal != "true") {
      navigate("/login");
    }
    else {
      if(window.location.pathname == "/"){
        navigate("/dashboard");
      }
    }
  }, [auth]);

    // 스크롤 이동
    const [scroll, setScroll] = useState(false);
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
  
    // 플로팅 버튼
    const fntop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    useEffect(() => {
      document.body.classList.add("mo");
      window.addEventListener("scroll", handleScroll);
      return function cleanup() {
        document.body.classList.remove("mo");
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <div className="wrap-mobile">
      <Outlet />
      <div className={`m-floating  ${scroll ? "is-active" : ""} `}>
        <Button size={"small"} fillMode="flat" onClick={fntop}></Button>
      </div>
      <footer className="m-footer">
        Copyright ⓒ 2025 LG Energy Solution. All Rights Reserved
      </footer>
    </div>
  );
}
