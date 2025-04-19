/**
 * 스테이션ID 코드 엑셀 업로드 Component
 * URL: /station/code/id - 엑셀업로드 모달
 */

/* React */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/* Kendo UI */
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import {
  Upload,
  UploadOnAddEvent,
  UploadOnRemoveEvent,
  UploadFileInfo,
} from "@progress/kendo-react-upload";

import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import {fileDownload} from "@/utils/common.ts";

const FileUpload = (props: any) => {
  const showAlert = useAlert()
  const { t } = useTranslation();
  const { onClose, onConfirm } = props;

  const ALLOWED_EXTENSIONS: readonly string[] = ['.xlsx', '.xls'] as const;

  const [viewFiles, setViewFiles] = useState<UploadFileInfo[]>([]);

  const handleAdd = (event: UploadOnAddEvent) => {
    console.log('handleAdd event', event)

    const newFiles = event.newState;
    if(!checkValidation(newFiles)) return;

    setViewFiles(event.newState);
  };

  // 파일 제거 핸들러
  const handleRemove = (event: UploadOnRemoveEvent) => {
    console.log('handleRemove event', event)

    setViewFiles(event.newState);
  };

  const isValidFileExtension = (fileName: string): boolean => {
    const lowerFileName = fileName.toLowerCase();
    return ALLOWED_EXTENSIONS.some(ext => lowerFileName.endsWith(ext));
  };

  const checkValidation = (newFiles: any) => {
    let result = true;
    const invalidFiles = newFiles.filter(
      (file: UploadFileInfo) => !isValidFileExtension(file.name)
    );

    if (invalidFiles.length > 0) {
      showAlert({message: t("common.invalid_file_extenstion")}); //유효하지 않은 확장자 입니다.
      result = false;
    }

    return result;
  }

  const onFileUpload = async () => {

    if (viewFiles.length === 0) {
      showAlert({message: t("common.select_file_message")}); //업로드할 파일을 선택해주세요.
      return;
    }

    const files = viewFiles
      .map(file => file.getRawFile ? file.getRawFile() as File : null)
      .filter((file): file is File => file !== null);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file); // 서버로 전송할 FormData에 파일 추가
    });

    try {
			const response = await StationApiService().excelUploadIdCode(formData);
			console.log('onFileUpload response', response)
      onConfirm?.();
    } 
    catch (error: any) {
      console.log('fileUpload error', error)
      if(error.data && error?.data?.message) {
        showAlert({message: error.data.message});
      }
      else {
        showAlert({message: '엑셀 업로드 실패'});
      }
    }
  };

  return (
    /* "스테이션ID 코드 엑셀 업로드" */
    <Dialog title={t("station.station_id_code_excel_upload")} onClose={onClose}>
      <div className="dialog-box pop-s">
        {/* 파일 업로드 */}
        <div className="file-upload">
          <div className="input-file-upload">
            <p className="input-file-txt">
              {/* 여기를 클릭해서 파일을 업로드 하세요. */}
              {t("common.upload_click_message")}
              
            </p>
            <Upload
              batch={false}
              multiple={false}
              withCredentials={false}
              onAdd={handleAdd}
              onRemove={handleRemove}
              autoUpload={false}
              showActionButtons={false}
              files={viewFiles}
            />
          </div>
          <p className="c-red mt0.625">
            {/* 업로드할 파일을 선택해주세요. */}
            {t("common.select_file_message")}
          </p>
        </div>

        <div className="file-upload-info">
          <div className="info-txt" style={{ whiteSpace: "pre-line" }}>
            {/* 양식에 맞게 작성하신 후, <br /> 엑셀 파일을 업로드해주세요. */}
            {t('common.upload_instructions')}
          </div>
          <div className="info-btns">
            <Button 
              size={"small"} 
              fillMode="outline" 
              themeColor={"light"}
              onClick={() => fileDownload("HEXA_STN_Code_Register_sample.xlsx")}
            >
              {t("common.download_template") /* 양식 다운로드 */}
               <i className="icon icon-down"></i>
            </Button>
          </div>
        </div>
      </div>

      <DialogActionsBar>
        <Button 
          type={'button'}
          size={"medium"} 
          fillMode="outline" 
          onClick={onClose}
        >
          {t("common.cancel") /* 취소 */}
        </Button>
        <Button
          type={'button'}
          size={"medium"}
          themeColor={"primary"}
          onClick={onFileUpload}
        >
          {t("common.confirm") /* 확인 */}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default FileUpload;
