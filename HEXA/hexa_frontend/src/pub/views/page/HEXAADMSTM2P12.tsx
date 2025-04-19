// 	HEXAADMSTM2P12 : 	[P] QR코드 인쇄하기

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import SliderQR from "../../components/SliderQR.tsx";

export default function HEXAADMSTM2P12() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  const dataImg = [
    {
      ImgID: "C4023",
      ImgUrl: "/images/imgs-qr.png",
    },
    {
      ImgID: "C4023",
      ImgUrl: "/images/imgs-qr.png",
    },
    {
      ImgID: "C4023",
      ImgUrl: "/images/imgs-qr.png",
    },
    {
      ImgID: "C4023",
      ImgUrl: "/images/imgs-qr.png",
    },
    {
      ImgID: "C4023",
      ImgUrl: "/images/imgs-qr.png",
    },
  ];

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        QR코드 인쇄하기 팝업 열기
      </Button>

      {/*  QR코드 인쇄하기 팝업 */}
      {visible && (
        <Dialog title={"QR코드 인쇄하기"} onClose={toggleDialog}>
          <div className="dialog-box" style={{ width: "510px" }}>
            <div className="slider-qr">
              <SliderQR dataImg={dataImg} />
            </div>
          </div>

          <DialogActionsBar>
            <Button size={"medium"} onClick={toggleDialog}>
              다운로드
            </Button>
            <Button size={"medium"} fillMode="outline" onClick={toggleDialog}>
              취소
            </Button>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              인쇄
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
