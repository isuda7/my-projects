import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, UploadOnAddEvent } from '@progress/kendo-react-upload';
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import Input from '@/components/kendo/form/Input';
import FormField from '@/new_components/common/FormField';
import FormInput from '@/new_components/common/FormInput';


const ExcelDownloadModal = (props: any) => {
  const { t } = useTranslation();
  const showAlert = useAlert()
  const { onClose, setModalData } = props;
  const [downloadReason, setDownloadReason] = useState<string>("");

  const saveDownloadReason = () => {
    console.log('downloadReason',downloadReason);
    if(downloadReason === undefined || downloadReason === null || downloadReason.trim().length < 1){
      showAlert({message: t("common.privacy_download_message")});
      return;
    }
    setModalData(downloadReason);
  };

  return (
    <Dialog title={t("common.privacy_download_title")} onClose={onClose}> {/* 배터리 정보 엑셀 다운로드 */}
      <div className="dialog-box pop-s">
        {/* 다운로드 사유 */}
        <p>{t("common.privacy_download_message")}</p>
        <div className="in-input">
          <Input
            name={"downloadReason"}
            onChange={e => setDownloadReason(e.value)}
          />
        </div>
      </div>
      <DialogActionsBar>
        <Button
          size={"medium"}
          themeColor={"primary"}
          onClick={saveDownloadReason}
        >
          {t("common.confirm")}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default ExcelDownloadModal;
