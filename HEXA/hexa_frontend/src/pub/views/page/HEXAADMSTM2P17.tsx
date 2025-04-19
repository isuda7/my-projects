// 	HEXAADMSTM2P17 : 	[P] 사진 크게 보기 팝업

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import SliderImg from "../../components/SliderImg.tsx";

export default function HEXAADMSTM2P17() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  const dataImg = [
    {
      ImgUrl: "/images/imgs_login_visual.png",
    },
    {
      ImgUrl: "/images/bg-board-1.png",
    },
    {
      ImgUrl: "/images/bg-board-2.png",
    },
  ];

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        사진 크게 보기 팝업 열기
      </Button>

      {/*  사진 크게 보기 팝업  */}
      {visible && (
        <Dialog title={"사진 크게 보기"} onClose={toggleDialog}>
          <div className="dialog-box" style={{ width: "600px" }}>
            <div className="slider-img">
              <SliderImg dataImg={dataImg} />
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
