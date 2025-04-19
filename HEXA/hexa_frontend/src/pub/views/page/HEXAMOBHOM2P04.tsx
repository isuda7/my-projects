// HEXAMOBHOM2P04 : 시단위 선택

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { RadioGroup } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function HEXAMOBHOM2P04() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  const data = React.useMemo(
    () => [
      { label: "전체", value: "0" },
      { label: "경기도", value: "1" },
      { label: "서울특별시", value: "2" },
      { label: "울산광역시", value: "3" },
      { label: "인천광역시", value: "4" },
      { label: "부산광역시", value: "5" },
      { label: "광주광역시", value: "6" },
    ],
    []
  );

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
          시단위 선택 팝업 열기
        </Button>
      </div>

      {visible && (
        <Dialog
          title={"시단위 선택"}
          onClose={toggleDialog}
          className="dialog-footer"
        >
          <div className="dialog-box">
            <div className="m-radio-group">
              <RadioGroup
                className="flex-gap-0.5-2"
                data={data}
                defaultValue={data[0].value}
              />
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
