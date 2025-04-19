// HEXAADMCOM2S01 : 페이지 없음
import { Button } from "@progress/kendo-react-buttons";

export default function PageDefault() {
  return (
    <>
      <div className="error-box">
        <div className="error-box__content">
          <h2 className="error-box__title type-q">페이지를 찾을 수 없습니다</h2>
          <p className="error-box__txt">
            요청하신 페이지가 제거되었거나 이름이 변경되었거나 <br /> 일시적으로
            사용이 중단되었습니다.
          </p>
          <div className="error-box__btns">
            <Button size={"large"} fillMode="outline">
              이전
            </Button>
            <Button size={"large"} themeColor={"primary"}>
              홈
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
