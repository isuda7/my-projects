/**
 * 스테이션 정보 등록, 상세 - 설치사진 영역
 * URL: /station/info/management/detail - 설치사진 영역
 * URL: /station/info/management/add - 설치사진 영역
 */

import {useState, useRef, useEffect} from "react";
import { useTranslation } from "react-i18next";
import {
  Upload,
  UploadOnAddEvent,
  UploadFileInfo,
} from "@progress/kendo-react-upload";
import { ExUploadFileInfo } from "@/utils/apiService/type/common/File.type";
import useAlert from "@/hooks/useAlert";
import PhotoSlider from "./PhotoSlider";

export default function PhotoUpload(props: any) {
  const showAlert = useAlert();
  const {t} = useTranslation();
  const { files, setFiles, setDeletePhotoIds, disabled=false } = props;
  const [filePreviews, setFilePreviews] = useState<any>({});
  const wrapperRef = useRef<HTMLInputElement | null>(null);

  //사진 상세 확대 Modal open
  const [modalOpen, setModalOpen] = useState<boolean>(false);


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
    console.log('onAdd event', event)
    if(event.newState.length > 3) {
      //'사진은 최대 3장까지 등록하실 수 있습니다.'
      showAlert({message: t('station.photo_lenght_alert')});
      return;
    }

    let hasValidationError = false;
    event.affectedFiles.forEach((file: UploadFileInfo) => {
      const errors = [];

      //파일명이 50자 이상 초과하지않도록 체크
      if(file.name.length > 50) {
        errors.push(t('station.file_name_length_limit'));
      }

      // 유효성 검사 예시: 파일 크기 제한 (5MB 이하)
      if (file.size && file.size > 5 * 1024 * 1024) {
        //'파일 크기는 5MB를 초과할 수 없습니다.'
        errors.push(t('station.photo_size_alert'));
      }

      // 유효성 검사 예시: 지원하는 파일 형식 제한 (예: jpeg, png)
      if (file.extension && !['.jpeg', '.jpg', '.png'].includes(file.extension.toLowerCase())) {
        //'지원되지 않는 파일 형식입니다. (jpeg, jpg, png만 허용)'
        errors.push(t('station.photo_extension_alert'));
      }

      if (errors.length > 0) {
        file.validationErrors = errors;
        hasValidationError = true;
        // 오류가 발생하면 사용자에게 알림 표시
        showAlert({ message: errors.join(' ') });
      }
    });
    
    if(!hasValidationError) setFiles(event.newState);

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
    if(!removeFiles.getRawFile) {
      setDeletePhotoIds(key);
    }
    setFiles(newFiles)
  }

  return (
    <>
      <div
        className="input-file-thumb"
        data-custom-label={t('common.file_attach')} //파일첨부
        ref={wrapperRef}
      >
        <Upload
          batch={false}
          autoUpload={false}
          multiple={true}
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
                      onClick={() => setModalOpen(true)}  
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
      {
        modalOpen &&
        <PhotoSlider
          data = {filePreviews}
          onClose = {() => setModalOpen(false)}
        />
      }
    </>
  );
}
