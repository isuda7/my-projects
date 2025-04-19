import React, { useRef } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';

interface UploadButtonProps {
  fileName?: string;
  setFile: (file: File) => void;
}

const FileForm: React.FC<UploadButtonProps> = ({ fileName, setFile }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 버튼 클릭 시 input[type="file"] 트리거
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 처리
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file); // 부모 컴포넌트로 파일 전달
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* 숨겨진 파일 input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {/* 파일 선택 버튼 */}
      <Button type="button" onClick={handleButtonClick} style={{ marginRight: '10px' }}>
        선택
      </Button>
      {/* 파일명 표시를 위한 Kendo UI Input */}
      <Input
        value={fileName}
        readOnly
        placeholder="선택된 파일 없음"
        style={{ flex: 1, padding: '6px' }}
      />
    </div>
  );
};

export default FileForm;
