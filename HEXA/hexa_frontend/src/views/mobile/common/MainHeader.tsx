import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@progress/kendo-react-buttons";

/* Popup */
import LanguagePopup from "../popup/LanguagePopup";
import LogoutPopup from "../popup/LogoutPopup";

/* Common */
import { LANG_LIST } from "./constant";

export default function MainHeader() {
  const { t, i18n } = useTranslation();
  const [visibleLang, setVisibleLang] = useState<string>('')

  //모달 open Flag
  const [langModalOpen, setLangModalOpen] = useState<boolean>(false)
  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if(i18n.language) {
      const obj = LANG_LIST.find(v => v.value === i18n.language)
      if(obj) setVisibleLang(obj?.label)
    }
  }, [i18n.language])

  return (
    <>
      <header className="m-header">
        <div className="m-logo">
          <a href="">
            <h1 className="sr-only">KooRoo Hexa</h1>
          </a>
        </div>
        <div className="m-lang-btn">
          <Button 
            size={"small"} 
            fillMode="flat"
            onClick={() => setLangModalOpen(true)}
          >
            {visibleLang}
          </Button>
        </div>

        <div className="m-logout">
          <Button 
            size={"small"} 
            fillMode="flat"
            onClick={() => setLogoutModalOpen(true)}  
          >
            <span className="sr-only">
              {t('common.logout') /* 로그아웃 */}
            </span>
          </Button>
        </div>
      </header>
      {
        langModalOpen && 
        <LanguagePopup onClose={() => setLangModalOpen(false)}/>
      }
      {
        logoutModalOpen && 
        <LogoutPopup onClose={() => setLogoutModalOpen(false)} />
      }
    </>
  );
}
