import * as React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

export default function uiDialog() {
  const [visible, setVisible] = React.useState(false);
  const [visibleConfirm, setVisibleConfirm] = React.useState(false);
  const toggleDialog = () => {
    setVisible(!visible);
  };
  const toggleDialogConfirm = () => {
    setVisibleConfirm(!visibleConfirm);
  };

  return (
    <div>
      <h2 className="k-mt-14">Dialog</h2>
      <hr className="k-mt-4 k-mb-4" />
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        onClick={toggleDialog}
      >
        Open Dialog
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        onClick={toggleDialogConfirm}
      >
        Open confirm
      </button>
      {visible && (
        <Dialog title={"Please confirm"} onClose={toggleDialog}>
          <div className="dialog-box pop-xs">
            Are you sure you want to continue? Are you sure you want to
            continue? Are you sure you want to continue? Are you sure you want
            to continue? Are you sure you want to continue? Are you sure you
            want to continue? Are you sure you want to continue? Are you sure
            you want to continue? Are you sure you want to continue? Are you
            sure you want to continue? Are you sure you want to continue? Are
            you sure you want to continue? Are you sure you want to continue?
            Are you sure you want to continue? Are you sure you want to
            continue? Are you sure you want to continue?
          </div>
          <DialogActionsBar>
            <Button size={"medium"} onClick={toggleDialog} fillMode="outline">
              Cancel
            </Button>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              OK
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
      {visibleConfirm && (
        <Dialog>
          <Button
            size={"medium"}
            onClick={toggleDialogConfirm}
            fillMode="flat"
            className="btn-dialog-actions"
          ></Button>

          <div className="confirm-box">해당 스테이션를 삭제하시겠습니까?</div>

          <DialogActionsBar>
            <Button
              size={"medium"}
              onClick={toggleDialogConfirm}
              fillMode="outline"
            >
              Cancel
            </Button>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialogConfirm}
            >
              OK
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
}
