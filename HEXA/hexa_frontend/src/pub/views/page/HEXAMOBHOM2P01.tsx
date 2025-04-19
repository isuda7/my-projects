// HEXAMOBHOM2P01 : 비밀번호 변경 안내

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";

import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function HEXAMOBHOM2P01() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <header className="m-header">
        <div className="m-logo">
          <a href="">
            <h1 className="sr-only">KooRoo Hexa</h1>
          </a>
        </div>
      </header>
      <div className="m-content">
        <div className="k-mt-5"></div>
        <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
          비밀번호 변경 안내 팝업 열기
        </Button>
      </div>

      {visible && (
        <Dialog
          title={"비밀번호 변경 안내"}
          onClose={toggleDialog}
          className="dialog-mobile"
        >
          <div className="dialog-box">
            <p className="txt-left">
              소중한 개인정보 보호와 안전한 사이트 이용을 위해 90일 마다
              비밀번호 변경을 권장하고 있습니다.
            </p>
            <p>Web 화면으로 로그인하여 비밀번호를 변경해주세요.</p>
          </div>

          <DialogActionsBar>
            <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
              확인
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
