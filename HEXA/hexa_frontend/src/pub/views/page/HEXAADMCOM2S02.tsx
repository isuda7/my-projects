// HEXAADMCOM2S02 : 서비스 접속 불가
import { Button } from "@progress/kendo-react-buttons";

export default function PageDefault() {
  return (
    <>
      <div className="error-box">
        <div className="error-box__content">
          <h2 className="error-box__title type-x">
            서비스에 접속할 수 없습니다.
          </h2>
          <p className="error-box__txt">
            죄송합니다. ​시스템 문제로 접속되지 않습니다.
            <br />
            잠시 후 다시 이용해주시기 바랍니다. ​불편을 드려서 죄송합니다.
          </p>
        </div>
      </div>
    </>
  );
}
