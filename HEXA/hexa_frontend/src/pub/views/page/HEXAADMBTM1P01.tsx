// HEXAADMBTM1P01 : 	[P]배터리 정보 엑셀 업로드 팝업

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input } from "@progress/kendo-react-inputs";
import {
  Upload,
  UploadOnAddEvent,
  UploadOnRemoveEvent,
  UploadOnProgressEvent,
  UploadOnStatusChangeEvent,
  UploadFileInfo,
} from "@progress/kendo-react-upload";

const fileStatuses = [
  "UploadFailed",
  "Initial",
  "Selected",
  "Uploading",
  "Uploaded",
  "RemoveFailed",
  "Removing",
];

export default function HEXAADMBTM1P01() {
  const [visible, setVisible] = React.useState(true);
  const toggleDialog = () => {
    setVisible(!visible);
  };

  const [files, setFiles] = React.useState<Array<UploadFileInfo>>([]);
  const [events, setEvents] = React.useState<Array<any>>([]);
  const [filePreviews, setFilePreviews] = React.useState<any>({});
  const [affectedFiles, setAffectedFiles] = React.useState<
    Array<UploadFileInfo>
  >([]);

  React.useEffect(() => {
    affectedFiles
      .filter((file: UploadFileInfo) => !file.validationErrors)
      .forEach((file: UploadFileInfo) => {
        const reader = new FileReader();

        reader.onloadend = (ev: any) => {
          setFilePreviews({
            ...filePreviews,
            [file.uid]: ev.target.result,
          });
        };
        if (file && file.getRawFile) {
          reader.readAsDataURL(file.getRawFile());
        }
      });
  }, [affectedFiles, filePreviews]);

  const onAdd = (event: UploadOnAddEvent) => {
    setFiles(event.newState);
    setEvents([...events, `File selected: ${event.affectedFiles[0].name}`]);
    setAffectedFiles(event.affectedFiles);
  };

  const onRemove = (event: UploadOnRemoveEvent) => {
    let newFilePreviews = { ...filePreviews };
    event.affectedFiles.forEach((file) => {
      delete newFilePreviews[file.uid];
    });

    setFiles(event.newState);
    setEvents([...events, `File removed: ${event.affectedFiles[0].name}`]);
    setFilePreviews(newFilePreviews);
  };

  const onProgress = (event: UploadOnProgressEvent) => {
    setFiles(event.newState);
    setEvents([...events, `On Progress: ${event.affectedFiles[0].progress} %`]);
  };

  const onStatusChange = (event: UploadOnStatusChangeEvent) => {
    const file = event.affectedFiles[0];
    setFiles(event.newState);
    setEvents([
      ...events,
      `File '${file.name}' status changed to: ${fileStatuses[file.status]}`,
    ]);
  };

  return (
    <>
      <div className="k-mt-5"></div>
      <Button size={"medium"} themeColor={"primary"} onClick={toggleDialog}>
        배터리 정보 엑셀 업로드 열기
      </Button>

      {/* 배터리 정보 엑셀 업로드 팝업 */}
      {visible && (
        <Dialog title={"배터리 정보 엑셀 업로드"} onClose={toggleDialog}>
          <div className="dialog-box pop-s">
            {/* 파일 업로드 */}
            <div className="file-upload">
              <div className="input-file-upload">
                <p className="input-file-txt">
                  여기를 클릭해서 파일을 업로드 하세요.
                </p>
                <Upload
                  batch={false}
                  multiple={false}
                  files={files}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onProgress={onProgress}
                  onStatusChange={onStatusChange}
                  withCredentials={false}
                  saveUrl={
                    "https://demos.telerik.com/kendo-ui/service-v4/upload/save"
                  }
                  removeUrl={
                    "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
                  }
                />
              </div>
              <p className="c-red mt0.625">업로드할 파일을 선택해주세요.</p>
            </div>

            <div className="file-upload-info">
              <div className="info-txt">
                양식에 맞게 작성하신 후, <br /> 엑셀 파일을 업로드해주세요.
              </div>
              <div className="info-btns">
                <Button size={"small"} fillMode="outline" themeColor={"light"}>
                  배터리 등록 <i className="icon icon-down"></i>
                </Button>
                <Button size={"small"} fillMode="outline" themeColor={"light"}>
                  사용변경 업로드
                  <i className="icon icon-down"></i>
                </Button>
              </div>
            </div>
          </div>

          <DialogActionsBar>
            <Button size={"medium"} fillMode="outline" onClick={toggleDialog}>
              취소
            </Button>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={toggleDialog}
            >
              확인
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </>
  );
}
