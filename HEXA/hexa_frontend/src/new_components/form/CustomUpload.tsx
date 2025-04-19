import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload } from '@progress/kendo-react-upload';
import { FieldRenderProps } from '@progress/kendo-react-form';
import { 
  UploadFileInfo, 
  UploadOnAddEvent, 
  UploadOnRemoveEvent 
} from '@progress/kendo-react-upload';

interface CustomUploadProps extends FieldRenderProps {
  validExtensions?: string[];
  fileNameRegex?: RegExp; // 정규식을 prop으로 받습니다
}

interface CustomFile extends File {
  uid: string;
}

const CustomUpload: React.FC<CustomUploadProps> = (fieldRenderProps) => {
  const { 
    validExtensions=[], 
    fileNameRegex,
    onChange, 
    value,
    multiple=false,
    ...others 
  } = fieldRenderProps;
  const {t} = useTranslation();
  const [files, setFiles] = useState<UploadFileInfo[]>(value || []);

  const onAdd = (event: UploadOnAddEvent) => {
    const newFiles = event.newState.filter(file => {
      // 확장자 검사
      const isValidExtension = validExtensions.length === 0 || 
        (file.extension && validExtensions.includes(file.extension.toLowerCase()));

      // 파일 이름 정규식 검사
      const isValidFileName = !fileNameRegex || fileNameRegex.test(file.name);

      return isValidExtension && isValidFileName;
    });

    const isValid = newFiles.length === event.newState.length;

    if(isValid) {
      setFiles(newFiles);

      const rawFiles = newFiles.map(file => {
        const rawFile = file.getRawFile ? (file.getRawFile() as CustomFile) : null;
        if(rawFile) rawFile.uid = file.uid;
        return rawFile;
      }).filter((file): file is CustomFile => file !== null);

      onChange({ value: rawFiles, isValid: isValid } as any);
    }
    else {
      onChange({ value: value, isValid: isValid } as any);
    }
  };

  const onRemove = (event: UploadOnRemoveEvent) => {
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
  };

  return (
    <div
      className="input-file mw800"
      data-custom-label={t('common.select')}
    >
      <Upload
        batch={false}
        autoUpload={false}
        multiple={multiple}
        onAdd={onAdd}
        onRemove={onRemove}
        files={files}
        showActionButtons={false} // 클리어 및 업로드 버튼 숨김
        {...others}
      />
    </div>
  );
};

export default CustomUpload;