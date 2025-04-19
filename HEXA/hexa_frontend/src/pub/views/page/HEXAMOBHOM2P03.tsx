// HEXAMOBHOM2P03 : 언어 선택

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { RadioGroup } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function HEXAMOBHOM2P03() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  const data = React.useMemo(
    () => [
      { label: "한국어", value: "ko" },
      { label: "English", value: "en" },
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
          언어 선택 팝업 열기
        </Button>
      </div>

      {visible && (
        <Dialog
          title={"언어 선택"}
          onClose={toggleDialog}
          className="dialog-footer"
        >
          <div className="dialog-box">
            <div className="m-radio-group">
              <RadioGroup
                className="flex-gap-0.5-2"
                layout="vertical"
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
