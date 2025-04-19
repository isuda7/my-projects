import React, {useEffect} from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import PropTypes from "prop-types";
import MenuAccessApiService from "@/utils/apiService/menu/MenuAccessApiService.ts";

interface ModalComponentProps {
  title?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
  buttons?: Array<"confirm" | "cancel" | "close">;
  noHeader?: boolean;
  className?: string;
  menuUrl?: string;
}

function ModalComponent({
  title,
  onClose,
  onConfirm = () => {},
  showCloseButton = true,
  children,
  buttons = [],
  noHeader = false,
  className,
    menuUrl
}: Readonly<ModalComponentProps>) {
  const hasHeader = title ?? showCloseButton;
  const hasFooter = buttons.length > 0;

  useEffect(() => {
    if(menuUrl){
      MenuAccessApiService().accessLog({pageUrl: menuUrl}).then(r =>console.log(r));
    }

  }, [menuUrl]);

  return (
    <Dialog title={hasHeader && !noHeader ? title : ""} onClose={onClose} className={className} >
      <p>{children}</p>
      {hasFooter && (
        <DialogActionsBar>
          {buttons.includes("cancel") && (
            <Button onClick={onClose}>취소</Button>
          )}
          {buttons.includes("close") && <Button onClick={onClose}>닫기</Button>}
          {buttons.includes("confirm") && (
            <Button onClick={() => onConfirm()}>확인</Button>
          )}
        </DialogActionsBar>
      )}
    </Dialog>
  );
}

ModalComponent.defaultProps = {
  title: "Title",
  showCloseButton: true,
  buttons: [],
  noHeader: false,
};

ModalComponent.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool,
  children: PropTypes.node.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string),
  noHeader: PropTypes.bool,
};

export default ModalComponent;
