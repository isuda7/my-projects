import { Outlet } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { useEffect, useRef, useState } from "react";

export default function LayoutGuideMobile() {
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
        Copyright ⓒ 2024 LG Energy Solution. All Rights Reserved
      </footer>
    </div>
  );
}
