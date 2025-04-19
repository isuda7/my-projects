// HEXAADMSTM1S01 : 스테이션 정보 등록

import {useState, useRef, useEffect, useTransition} from "react";
import {
  Upload,
  UploadOnAddEvent,
  UploadFileInfo,
} from "@progress/kendo-react-upload";
import { ExUploadFileInfo } from "@/utils/apiService/type/common/File.type";
import useAlert from "@/hooks/useAlert";
import { useTranslation } from "react-i18next";

export default function IconUpload(props: any) {
  const { t } = useTranslation();
  const showAlert = useAlert();
  const { files, setFiles, disabled=false } = props;
  const [filePreviews, setFilePreviews] = useState<any>({});
  const wrapperRef = useRef<HTMLInputElement | null>(null);


  useEffect(() => {
    const newPreviews: any = {};

    files
      .filter((file: ExUploadFileInfo) => !file.validationErrors)
      .forEach((file: ExUploadFileInfo) => {
        if(file.base64Data) {
          newPreviews[file.uid] = `data:image/${String(file.extension).substring(1)};base64,${file.base64Data}`
          setFilePreviews({...newPreviews})
        }
        else {
          const reader = new FileReader();
  
          reader.onloadend = (ev: any) => {
            newPreviews[file.uid] = ev.target?.result;
  
            setFilePreviews({...newPreviews})
          };
  
          if (file && file.getRawFile) {
            reader.readAsDataURL(file.getRawFile());
          }
        }
      });
  }, [files]);

  const onAdd = (event: UploadOnAddEvent) => {

    let hasValidationError = false;
    event.affectedFiles.forEach((file: UploadFileInfo) => {
      const errors = [];

      // 유효성 검사 예시: 파일 크기 제한 (5MB 이하)
      if (file.size && file.size > 5 * 1024 * 1024) {
        errors.push('파일 크기는 5MB를 초과할 수 없습니다.');
      }

      // 유효성 검사 예시: 지원하는 파일 형식 제한 (예: jpeg, png)
      if (file.extension && !['.png'].includes(file.extension.toLowerCase())) {
        errors.push('지원되지 않는 파일 형식입니다. (png만 허용)');
      }

      console.log('file', file)

      if (errors.length > 0) {
        file.validationErrors = errors;
        hasValidationError = true;
        // 오류가 발생하면 사용자에게 알림 표시
        showAlert({ message: errors.join(' ') });
      }
    });
    
    if(!hasValidationError) setFiles(event.newState);

    console.log('wrapperRef.current', wrapperRef.current)
    if(wrapperRef.current) {
      const inputElement = wrapperRef.current.querySelector('input[type="file"]') as HTMLInputElement;
      if(inputElement) inputElement.value = ""; //파일 중복 올릴 수 있도록 파일초기화
    }
  };

  const onRemoveFile = (key: any) => {
    const removeFiles = files.find((v: any) => v.uid === key)
    const newFiles = files.filter((v: any) => v.uid !== key)
    console.log('newFiles', newFiles)
    console.log('removeFiles', removeFiles)
    setFiles(newFiles)
  }

  return (
    <>
      <div
        className="input-file-thumb"
        data-custom-label={t('common.file_attach')} // 파일첨부
        ref={wrapperRef}
      >
        <Upload
          batch={false}
          autoUpload={false}
          multiple={false}
          files={files}
          onAdd={onAdd}
          showActionButtons={false} // 클리어 및 업로드 버튼 숨김
          withCredentials={false}
          disabled={disabled}
        />

        {files.length ? (
          <div className={"img-preview example-config"}>
            <div className="img-scroll">
              {Object.keys(filePreviews).map(
                (fileKey, index) => (
                  <span key={index}>
                    <img 
                      src={filePreviews[fileKey]} 
                    />
                    {
                      !disabled &&
                      <button
                        type="button"
                        className="close"
                        onClick={() => onRemoveFile(fileKey)}
                      ></button>
                    }
                  </span>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="img-preview example-config">
            <div className="img-scroll"></div> 
          </div>
        )}
      </div>
    </>
  );
}
