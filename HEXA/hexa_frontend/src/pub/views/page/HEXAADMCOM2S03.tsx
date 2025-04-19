// HEXAADMCOM2S03 : 서비스 접속 지연
import { Button } from "@progress/kendo-react-buttons";

export default function PageDefault() {
  return (
    <>
      <div className="error-box">
        <div className="error-box__content">
          <h2 className="error-box__title type-x">
            서비스 접속이 지연되고 있습니다.​
          </h2>
          <p className="error-box__txt">
            네트워크 연결 상태를 확인해주시거나 ​잠시 후 다시 이용해주시기
            바랍니다.
          </p>
          <div className="error-box__btns">
            <Button size={"large"} themeColor={"primary"}>
              다시 시도
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
