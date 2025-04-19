// HEXAADMCOM3P05 : 휴대폰번호 등록 안내

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";

export default function HEXAADMCOM3P05() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        휴대폰번호 등록 안내 팝업 열기
      </Button>

      {/* 휴대폰번호 등록 안내 팝업 */}
      {visible && (
        <Dialog title={"휴대폰번호 등록 안내"} onClose={toggleDialog}>
          <div className="dialog-box pop-xs">
            <div className="content-center">
              휴대폰번호가 미등록되어 있습니다. <br /> 앞으로 서비스를 원활하게
              이용하기 위해 휴대폰번호을 등록해주세요.
              <div className="in-input mt1">
                <Input
                  id="phoneNumber"
                  placeholder="휴대폰 번호를 입력해 주세요."
                  aria-label="휴대폰 번호"
                />
                <div role="alert" className="k-form-error k-text-start">
                  휴대폰 번호를 입력해주세요.
                </div>
              </div>
            </div>
          </div>
          <DialogActionsBar>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              저장
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
