import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Dropbox from "@/components/common/Dropbox.tsx";

function LanguageDropDown() {
  const locale = navigator.language?.slice(0, 2);
  const { i18n } = useTranslation();

  const languageList = [
    {
      value: "en",
      title: "English",
      flag: "nation-eng",
    },
    {
      value: "de",
      title: "Deutsch",
      flag: "nation-eng",
    },
    {
      value: "es",
      title: "Español",
      flag: "nation-eng",
    },
    {
      value: "ko",
      title: "한국어",
      flag: "nation-eng",
    },
  ];

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, []);

  return (
    <div className="group-align-right">
      <div className="gnb-lang">
        <Dropbox
          icon
          list={languageList}
          defaultValue={locale}
          text={languageList[0].title}
          flag={languageList[0].flag}
          clickEvent={(value) => {
            i18n.changeLanguage(value).then((value) => {
              console.info(value.name);
            });
          }}
        />
      </div>
    </div>
  );
}

export default LanguageDropDown;
