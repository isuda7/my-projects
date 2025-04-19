// HEXAADMCOM3P02 : 로그아웃

import * as React from "react";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function HEXAADMCOM3P02() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        로그아웃 팝업 열기
      </Button>

      {/* 로그아웃 팝업 */}
      {visible && (
        <Dialog title={"로그아웃"} onClose={toggleDialog}>
          <div className="dialog-box pop-xs">
            <div className="content-center">로그아웃 하시겠습니까?</div>
          </div>
          <DialogActionsBar>
            <Button size={"medium"} onClick={toggleDialog} fillMode="outline">
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
