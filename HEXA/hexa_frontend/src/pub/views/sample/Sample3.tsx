import { useTranslation } from "react-i18next";
import Component from "../../components/sample/Component.tsx";

export default function Sample3() {

  const width = 1200;
  const height = 700;

  return (
    <div className="App">
      <div className="App-header">
        <button type="button" onClick={
          () => window.open(`${window.location.origin}/pub/page/PageDefaultPopup`, '_blank', `width=${width},height=${height},top=100,left=100`)}
        >
          팝업열기
        </button>
      </div>
    </div>
  );
}
