import { useTranslation } from "react-i18next";
import Component from "../../components/sample/Component.tsx";

export default function Sample2() {
  const { t, i18n } = useTranslation("translation");
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="App">
      <div className="App-header">
        <div>{t("title")}</div>
        <button type="button" onClick={() => changeLanguage("kr")}>
          kr
        </button>
        <button type="button" onClick={() => changeLanguage("en")}>
          en
        </button>
      </div>
      <div>{t("description.part2")}</div>
      <Component />
    </div>
  );
}
