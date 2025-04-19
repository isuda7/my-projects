/**
 * 고장 코드 정보 관리 ExcelUpload Component
 * URL: /irregular/code > 엑셀업로드
 * TODO: 추후 엑셀 업다운로드양식 정해지면 제작 - StationInfoExcelUpload 참고
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, UploadFileInfo, UploadOnAddEvent, UploadOnRemoveEvent } from '@progress/kendo-react-upload';
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

import useAlert from "@/hooks/useAlert";
import IrregularCodeApiService from '@/utils/apiService/irregular/IrregularCodeApiService';
import {fileDownload} from "@/utils/common.ts";

const IrregularCodeExcelUpload = (props: any) => {
  const { t } = useTranslation();
  const showAlert = useAlert()
  const { title, onClose, onConfirm } = props;
  const [uploadedFiles, setUploadedFiles] = useState<UploadFileInfo[]>([]);

  const handleAdd = (event: UploadOnAddEvent) => {
    let hasValidationError = false;
    event.newState.forEach((file: UploadFileInfo) => {
      const errors = [];

      // 유효성 검사 예시: 지원하는 파일 형식 제한 (예: jpeg, png)
      if (file.extension && !['.xls', '.xlsx'].includes(file.extension.toLowerCase())) {
        //유효하지 않은 파일 형식 입니다.
        errors.push(t('common.invalid_file_name'));
      }

      if (errors.length > 0) {
        file.validationErrors = errors;
        hasValidationError = true;
        // 오류가 발생하면 사용자에게 알림 표시
        showAlert({ message: errors.join(' ') });
      }
    });
    
    if(!hasValidationError) setUploadedFiles(event.newState);
  };

  const onFileUpload = async () => {
    console.log('uploadedFiles', uploadedFiles)
    if (uploadedFiles.length === 0) {
      //"select_file_message": "업로드할 파일을 선택해주세요.", 알림
      showAlert({ message: t("station.select_file_message")/*업로드할 파일을 선택해주세요.*/});
      return;
    }

    const formData = new FormData();

    uploadedFiles.forEach((file:UploadFileInfo) => {
      if(file.getRawFile) {
        formData.append('file', file.getRawFile()); // 서버로 전송할 FormData에 파일 추가
      }
    });

    try {
			const response = await IrregularCodeApiService().excelUpload(formData);
			console.log('onFileUpload response', response)
      onConfirm?.();
    } 
    catch (error: any) {
      //if (error instanceof Error) showAlert({message: error.message});
      console.log('fileUpload error', error)
      if(error.data && error?.data?.message) {
        showAlert({message: error.data.message});
      }
      else {
        showAlert({message: '엑셀 업로드 실패'});
      }
    }
  };

  const handleRemove = (e: UploadOnRemoveEvent) => {
    console.log('handleRemove e', e)
    setUploadedFiles(e.newState)
  }

  return (
    <Dialog title={t("irregular.irregular_code_excel_upload")} onClose={onClose}>
      <div className="dialog-box pop-s">

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
              files={uploadedFiles}
              onAdd={handleAdd}
              onRemove={handleRemove}
              autoUpload={false}
              showActionButtons={false}
              // saveUrl={
              //   "https://demos.telerik.com/kendo-ui/service-v4/upload/save"
              // }
              // removeUrl={
              //   "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
              // }
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
              onClick={()=> fileDownload("HEXA_ERR_Code_Register_sample.xlsx")}
            >
              {/* 엑셀 다운로드  */}
              {t("common.excel_download")}
              <i className="icon icon-down"></i>
            </Button>
          </div>
        </div>

      </div>
      <DialogActionsBar>
        <Button size={"medium"} fillMode="outline" onClick={onClose}>
          {/* 취소 */}
          {t("common.cancel")}
        </Button>
        <Button
          size={"medium"}
          themeColor={"primary"}
          onClick={onFileUpload}
        >
          {/* 확인 */}
          {t("common.confirm")}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default IrregularCodeExcelUpload;
