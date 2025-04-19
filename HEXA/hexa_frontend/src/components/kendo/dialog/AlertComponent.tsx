import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { useTranslation } from "react-i18next";
import { hideAlert } from "@/store/modules/alertStore";
import { RootState } from "@/store";
import { handleConfirm } from "@/hooks/useAlert";
import { isMobile } from 'react-device-detect';

function AlertComponent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { open, message, title='', type } = useSelector(
    (state: RootState) => state.alertStore,
  );

  const handleClose = () => {
    dispatch(hideAlert());
  };

  const handleConfirmAndClose = () => {
    handleConfirm();
    dispatch(hideAlert());
  };

  const renderMessage = () => {
    
    if (React.isValidElement(message)) {
      return <>{message}</>; // HTML 요소라면 그대로 반환
    }
    return <p className="txt-center">{message}</p>; // 문자열이면 텍스트로 렌더링
  }

  return (
    <div>
      { 
        (open && !isMobile)? 
          <Dialog title={title} onClose={handleClose}>
            <div 
              className={type === 'confirm'? "confirm-box" : "dialog-box"}
              style={{ whiteSpace: "pre-line" }}
            >
              {message}
            </div>
            <DialogActionsBar>
              {
                type === 'confirm' && 
                <Button 
                  size="medium" 
                  fillMode="outline"
                  onClick={handleClose}
                >
                  {t("common.cancel")}
                </Button>
              }
              <Button 
                size="medium" 
                themeColor="primary" 
                onClick={handleConfirmAndClose}
              >
                {t("common.confirm")}
              </Button>
            </DialogActionsBar>
          </Dialog>
        :
        (open && isMobile)?
          <Dialog
            title={title}
            onClose={handleClose}
            className="dialog-mobile"
          >
            <div className="dialog-box">
              {renderMessage()}
            </div>
      
            <DialogActionsBar>
              <Button size={"medium"} themeColor={"primary"} onClick={handleClose}>
                {t('common.confirm')/* 확인 */}
              </Button>
            </DialogActionsBar>
          </Dialog>
        :
        <></>
      }
    </div>
  );
}

export default AlertComponent;
