import React, { useCallback, useEffect, useState } from "react";
import {
  Upload,
  UploadOnProgressEvent,
  UploadOnStatusChangeEvent,
} from "@progress/kendo-react-upload";
import { FieldRenderProps } from "@progress/kendo-react-form";
import {
  UploadFileInfo,
  UploadOnAddEvent,
  UploadOnRemoveEvent,
} from "@progress/kendo-react-upload";
import useAlert from "@/hooks/useAlert";
import NoticeApiService from "@/utils/apiService/board/NoticeApiService";
import { toNumber } from "lodash";
import { useTranslation } from "react-i18next";

interface CustomUploadProps extends FieldRenderProps {
  validExtensions?: string[];
}

interface CustomFile extends File {
  uid: string;
}

const CustomNoticeFile: React.FC<CustomUploadProps> = (fieldRenderProps) => {
  const { t } = useTranslation(); 
  const showAlert = useAlert();

  const {
    validExtensions = [],
    onChange,
    value,
    multiple = false,
    fileIds = [],
    setDelFileIds,
    fileNames = [],
    setFileNames,
    ...others
  } = fieldRenderProps;
  // console.log("fieldRenderProps", fieldRenderProps);
  const [files, setFiles] = useState<UploadFileInfo[]>(value || []);

  useEffect(() => {
    console.log("files:", files);
    const filename = files.map(file => file.name + ",");
    setFileNames(filename);
  }, [files]);

  const onAdd = (event: UploadOnAddEvent) => {
    console.log("onAdd event", event);

    if (event.newState.length > 3) {
      showAlert({ message: t('board.file_maximum_3_alert') }); // 첨부파일은 최대 3개까지 가능합니다.
      return;
    }

    let hasValidationError = false;
    event.affectedFiles.forEach((file: UploadFileInfo) => {
      const extension = file.extension as string;
      const errors = [];

      if (file.size && file.size > 5 * 1024 * 1024) {
        errors.push(t('station.photo_size_alert')); // 파일 크기는 5MB를 초과할 수 없습니다.
      }

      if ( !validExtensions.includes(extension.slice(1).toLocaleLowerCase())) {
        errors.push(t('board.file_extension_alert')); // 지원되지 않는 파일 형식입니다.
      }

      if (errors.length > 0) {
        file.validationErrors = errors;
        hasValidationError = true;
        // 오류가 발생하면 알림
        showAlert({ message: errors.join(" ") });
      }

      console.log("error:", errors);
    });

    // if(!hasValidationError) setFiles(event.newState);

    if (!hasValidationError) {
      setFiles(event.newState);
      const rawFiles = event.newState
        .map((file) => {
          const rawFile = file.getRawFile
            ? (file.getRawFile() as CustomFile)
            : null;
          if (rawFile) rawFile.uid = file.uid;
          return rawFile;
        })
        .filter((file): file is CustomFile => file !== null);

      onChange({ value: rawFiles } as any);
    } else {
      onChange({ value: value } as any);
    }
  };

  const onRemove = (event: UploadOnRemoveEvent) => {
    const updatedFiles = files.filter(
      (file) =>
        !event.affectedFiles.some((removedFile) => removedFile.uid === file.uid)
    );
    if (event.affectedFiles[0].progress == 100 ) {
      fileIds.push(event.affectedFiles[0].uid);
      setDelFileIds(fileIds);
    }
    
    console.log("sosad:", fileIds);
    setFiles(updatedFiles);

    const rawFiles = updatedFiles
      .map((file) => {
        const rawFile = file.getRawFile
          ? (file.getRawFile() as CustomFile)
          : null;
        if (rawFile) rawFile.uid = file.uid;
        return rawFile;
      })
      .filter((file): file is CustomFile => file !== null);
    onChange({ value: rawFiles });
  };

  const handleFileClick = useCallback(async (file: UploadFileInfo): Promise<void> => {
    console.log(`파일 클릭됨: ${file.name}`);
    // 여기에 원하는 커스텀 로직을 추가하세요
    console.log('uid:',file.uid.length);
    const res = await NoticeApiService().fileDownload(file.uid);
  }, []);

  return (
    <div className="input-file-multiple type-notice" data-custom-label={t('board.attach_file')}>
      {/* input-file-multiple 디자인은 공지사항과 메뉴얼에서 사용합니다 */}
      <Upload
        batch={false}
        autoUpload={false}
        multiple
        onAdd={onAdd}
        onRemove={onRemove}
        files={files}
        showActionButtons={false} // 클리어 및 업로드 버튼 숨김
        {...others}
      />
      {files.map((file: UploadFileInfo) => (
        <div key={file.uid} className="k-file-single">
          <span className="k-file-info">
            <span
              className="k-file-name"
              onClick={file.progress !== 0 ? () => handleFileClick(file) : undefined}
              role="button"
              tabIndex={0}
              style={{
                cursor: file.progress !== 0 ? "pointer" : "default",
                textDecoration: file.progress !== 0 ? "default" : "none",
              }}
            >
              {file.name}
            </span>
          </span>
          <span className="k-file-actions">
            <button
              className="k-button k-button-md k-button-flat k-button-flat-base k-rounded-md k-icon-button k-icon-button k-upload-action"
              type="button"
              onClick={(e) => {
                onRemove({
                  affectedFiles: [file],
                } as UploadOnRemoveEvent);
              }}
            >
              <span className="sr-only">삭제</span>
            </button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomNoticeFile;
