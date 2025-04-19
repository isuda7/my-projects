// HEXAADMCOM2P04 : 자동 로그아웃 안내

import * as React from "react";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function HEXAADMCOM2P04() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        자동 로그아웃 안내 팝업 열기
      </Button>

      {/* 자동 로그아웃 안내 팝업 */}
      {visible && (
        <Dialog title={"자동 로그아웃 안내"} onClose={toggleDialog}>
          <div className="dialog-box pop-xs">
            <div className="content-center">
              안전한 사이트 이용을 위해 로그인 후 60분 동안 서비스 이용이 없어
              자동 로그아웃 됩니다. <br />
              <br />
              로그인 시간을 연장하시겠습니까?
            </div>
          </div>
          <DialogActionsBar>
            <Button size={"medium"} onClick={toggleDialog} fillMode="outline">
              연장
            </Button>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              로그아웃
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
