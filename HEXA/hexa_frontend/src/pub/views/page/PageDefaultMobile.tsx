// PageDefaultMobile : 기본 페이지 모바일

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function PageDefault() {
  // alert qr 생성
  const [visible, setVisible] = React.useState(false);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  const [visible2, setVisible2] = React.useState(false);
  const toggleDialog2 = () => {
    setVisible2(!visible2);
  };

  return (
    <>
      <header className="m-header">
        <div>로고</div>
        <div>타이틀</div>
        <div>버튼</div>
      </header>

      <div className="m-content">
        <div>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
          <p>3</p>
        </div>

        <div>
          <Button
            size={"medium"}
            themeColor={"primary"}
            className="btn-in-icon"
            onClick={toggleDialog}
          >
            신규 생성 <i className="icon icon-new-add"></i>
          </Button>

          <Button
            size={"medium"}
            themeColor={"primary"}
            className="btn-in-icon"
            onClick={toggleDialog2}
          >
            신규 생성 <i className="icon icon-new-add"></i>
          </Button>
        </div>
      </div>

      {visible && (
        <Dialog
          title={"예약 배터리 목록 "}
          onClose={toggleDialog}
          className="dialog-footer"
        >
          <div className="dialog-box">
            <p className="txt-left mt1">생성할 QR코드 개수를 입력하세요.</p>
            <p className="txt-left mt1">생성할 QR코드 개수를 입력하세요.</p>
            <p className="txt-left mt1">생성할 QR코드 개수를 입력하세요.</p>
            <p className="txt-left mt1">생성할 QR코드 개수를 입력하세요.</p>
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

      {visible2 && (
        <Dialog
          title={"예약 배터리 목록 "}
          onClose={toggleDialog2}
          className="dialog-mobile"
        >
          <div className="dialog-box">
            <p className="txt-left mt1">생성할 QR코드 개수를 입력하세요.</p>
          </div>

          <DialogActionsBar>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog2}
            >
              확인
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
