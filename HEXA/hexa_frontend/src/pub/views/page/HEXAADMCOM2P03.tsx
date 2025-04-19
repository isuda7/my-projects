// HEXAADMCOM2P03 : 비밀번호 변경 안내

import * as React from "react";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function HEXAADMCOM2P03() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        비밀번호 변경 안내 팝업 열기
      </Button>

      {/* 비밀번호 변경 안내 팝업 */}
      {visible && (
        <Dialog title={"비밀번호 변경 안내"} onClose={toggleDialog}>
          <div className="dialog-box pop-xs">
            <div className="content-center">
              소중한 개인정보 보호와 안전한 사이트 이용을 위해 90일 마다
              비밀번호 변경을 권장하고 있습니다. <br /> 지금 비밀번호를
              변경해주세요.
            </div>
          </div>
          <DialogActionsBar>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              비밀번호 변경
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
