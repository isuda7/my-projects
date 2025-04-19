/**
 * 스테이션 정보 관리 ExcelUpload Component
 * URL: /station/info/management > 엑셀업로드
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Upload, 
  UploadOnAddEvent,
  UploadFileInfo,
  UploadOnRemoveEvent,
} from '@progress/kendo-react-upload';
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

import StationApiService from "@/utils/apiService/StationApiService";
import useAlert from "@/hooks/useAlert";
import {fileDownload} from "@/utils/common.ts";

const StationInfoExcelUpload = (props: any) => {
  const { t } = useTranslation();
  const showAlert = useAlert()
  const { onClose, onConfirm } = props;
  const [files, setFiles] = useState<UploadFileInfo[]>([])

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
    
    if(!hasValidationError) setFiles(event.newState);
  };

  const onFileUpload = async () => {
    console.log('files', files)
    if (files.length === 0) {
      //업로드할 파일을 선택해주세요.
      showAlert({message: t('common.select_file_message')})
      return;
    }

    const formData = new FormData();
    files.forEach((file:UploadFileInfo) => {
      if(file.getRawFile) {
        formData.append('file', file.getRawFile()); // 서버로 전송할 FormData에 파일 추가
      }
    });

    try {
			const response = await StationApiService().excelUploadStationInfo(formData);
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
    setFiles(e.newState)
  }

  return (
    <Dialog title={t("station.station_info_excel_upload")} onClose={onClose}> {/* 스테이션 정보 엑셀 업로드 */}
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
              files={files}
              onAdd={handleAdd}
              onRemove={handleRemove}
              autoUpload={false}
              showActionButtons={false}
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
              onClick={() => fileDownload("HEXA_STN_Register_sample.xlsx")}
            >
              {/* 신규 스테이션용  */}
              {t("station.new_station")}
              <i className="icon icon-down"></i>
            </Button>
            <Button 
              size={"small"} 
              fillMode="outline" 
              themeColor={"light"}
              onClick={() => fileDownload("HEXA_STN_Modify_sample.xlsx")}  
            >
              {/* 기 스테이션용  */}
              {t("station.existing_station")}
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
          {/* 저장 */}
          {t("common.save")}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default StationInfoExcelUpload;
