
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

/* Common */

export default function AlertPopup(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message, onClose } = props;

  const closeFunction = () => {
    navigate(-1)
    onClose?.();
  }

  return (
    <Dialog
      title={"Alert"}
      onClose={closeFunction}
      className="dialog-mobile"
    >
      <div className="dialog-box">
        <p className="txt-center">{message}</p>
      </div>

      <DialogActionsBar>
        <Button size={"medium"} themeColor={"primary"} onClick={closeFunction}>
          {t('common.confirm')/* 확인 */}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
}
