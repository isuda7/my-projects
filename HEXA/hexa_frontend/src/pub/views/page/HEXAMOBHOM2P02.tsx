// HEXAMOBHOM2P02 : 로그아웃

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";

import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function HEXAMOBHOM2P02() {
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
          로그아웃 팝업 열기
        </Button>
      </div>

      {visible && (
        <Dialog
          title={"로그아웃"}
          onClose={toggleDialog}
          className="dialog-mobile"
        >
          <div className="dialog-box">
            <p className="txt-center">로그아웃 하시겠습니까?</p>
          </div>

          <DialogActionsBar>
            <Button size={"medium"} fillMode="outline" onClick={toggleDialog}>
              취소
            </Button>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              확인
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
