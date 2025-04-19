import React, { useEffect, useState } from 'react';
import { Upload, UploadOnProgressEvent, UploadOnStatusChangeEvent } from '@progress/kendo-react-upload';
import { FieldRenderProps } from '@progress/kendo-react-form';
import { 
  UploadFileInfo, 
  UploadOnAddEvent, 
  UploadOnRemoveEvent 
} from '@progress/kendo-react-upload';
import useAlert from '@/hooks/useAlert';
import { useTranslation } from 'react-i18next';

interface CustomUploadProps extends FieldRenderProps {
  validExtensions?: string[];
}

interface CustomFile extends File {
  uid: string;
}

const CustomManualFile: React.FC<CustomUploadProps> = (fieldRenderProps) => {
  const { t } = useTranslation();
  const showAlert = useAlert();

  const { 
    validExtensions=[], 
    onChange, 
    value,
    ...others
  } = fieldRenderProps;
  const [files, setFiles] = useState<UploadFileInfo[]>(value || []);

  useEffect(() => {
    console.log('filesssssss:', files)
  },[files])

  const onAdd = (event: UploadOnAddEvent) => {
    console.log('onAdd event', event);

    let hasValidationError = false;
    if(event.newState.length > 1) {
      showAlert({message: t('board.file_maximum_1_alert')}); // 파일 첨부는 1개만 가능합니다.
      hasValidationError = true;
      return;
    }

    event.affectedFiles.forEach((file: UploadFileInfo) => {
      if (file.size && file.size > 50 * 1024 * 1024) {
        showAlert({message: t('board.manual_size_alert')}); // 파일 크기는 50MB를 초과할 수 없습니다.
        hasValidationError = true;
      }
    });

    if (!hasValidationError) {
      setFiles(event.newState);
        const rawFiles = event.newState.map(file => {
        const rawFile = file.getRawFile ? (file.getRawFile() as CustomFile) : null;
        if(rawFile) rawFile.uid = file.uid;
        return rawFile;
      }).filter((file): file is CustomFile => file !== null);

      onChange({ value: rawFiles} as any);
    }
  };

  const onRemove = (event: UploadOnRemoveEvent) => {
    showAlert({
      message: (t('board.delete_file_alert')), // 해당 파일을 삭제하시겠습니까?
      onConfirm: () => {
        const updatedFiles = files.filter(file => 
          !event.affectedFiles.some(removedFile => removedFile.uid === file.uid)
        );
    
        setFiles(updatedFiles);
    
        const rawFiles = updatedFiles.map(file => {
          const rawFile = file.getRawFile ? (file.getRawFile() as CustomFile) : null;
          if(rawFile) rawFile.uid = file.uid;
          return rawFile;
        }).filter((file): file is CustomFile => file !== null);
        onChange({ value: rawFiles });
      }
    })
    
  };

  return (
    <div
      className="input-file-multiple"
      data-custom-label= {t('board.attach_file')}
    >
      <Upload
        batch={false}
        autoUpload={false}
        onAdd={onAdd}
        onRemove={onRemove}
        files={files}
        showActionButtons={false} // 클리어 및 업로드 버튼 숨김
        {...others}
      />
    </div>
  );
};

export default CustomManualFile;