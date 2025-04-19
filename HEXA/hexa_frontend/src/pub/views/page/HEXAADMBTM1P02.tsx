// HEXAADMBTM1P02 : 	[P]다운로드 사유 팝업

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";

export default function HEXAADMBTM1P02() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        다운로드 사유 열기
      </Button>

      {/* 다운로드 사유 팝업 */}
      {visible && (
        <Dialog title={"다운로드 사유"} onClose={toggleDialog}>
          <div className="dialog-box pop-s">
            {/* 다운로드 사유 */}
            <p>개인정보를 다운로드하는 사유를 입력해주세요.</p>
            <div className="in-input">
              <Input></Input>
            </div>
          </div>

          <DialogActionsBar>
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
