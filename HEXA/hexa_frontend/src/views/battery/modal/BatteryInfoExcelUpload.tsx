// HEXAADMBTM1P01 : 	[P]배터리 정보 엑셀 업로드 팝업

import * as React from "react";
import {Button} from "@progress/kendo-react-buttons";
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import {
  Upload,
  UploadFileInfo,
  UploadOnAddEvent,
  UploadOnProgressEvent,
  UploadOnRemoveEvent,
  UploadOnStatusChangeEvent,
} from "@progress/kendo-react-upload";
import BatteryApiService from "@/utils/apiService/battery/BatteryApiService.ts";
import {fileDownload} from "@/utils/common.ts";
import {useMutation} from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import {useTranslation} from "react-i18next";

const fileStatuses = [
  "UploadFailed",
  "Initial",
  "Selected",
  "Uploading",
  "Uploaded",
  "RemoveFailed",
  "Removing",
];

interface prop {
  setUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  completeHandle: () => void;
}

function BatteryInfoExcelUpload({setUploadModalOpen, completeHandle}: prop) {
  const {t} = useTranslation();
  const showAlert = useAlert();
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
    let newFilePreviews = {...filePreviews};
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

  const registerBulkBattery = useMutation({
    mutationFn: async (formData: FormData) => {
      if (formData) {
        await BatteryApiService().createBulkBattery(formData);
        return null;
      }
    },
    onSuccess: (response: any) => {
      const onConfirm = () => {
        completeHandle();
        setUploadModalOpen(false)
      }
      showAlert({message: t('common.save_success'), onConfirm: onConfirm})

    },
    onError: (error) => {
      showAlert({message: error.message})
    },
  });

  const onConfirm = () => {
    if (files.length === 0) {
      //업로드할 파일을 선택해주세요.
      showAlert({message: t('common.select_file_message')})
      return;
    }
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const rawFile = files[i].getRawFile?.();
      if (rawFile) formData.append('file', rawFile)
    }
    registerBulkBattery.mutate(formData);
  }

  return (
    <>
      <div className="k-mt-5"></div>
      {/* 배터리 정보 엑셀 업로드 팝업 */}
      <Dialog title={"배터리 정보 엑셀 업로드"} onClose={() => setUploadModalOpen(false)}>
        <div className="dialog-box pop-s">
          {/* 파일 업로드 */}
          <div className="file-upload">
            <div className="input-file-upload">
              <p className="input-file-txt">
                {t("common.upload_click_message")}
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
                // saveUrl={
                //   "https://demos.telerik.com/kendo-ui/service-v4/upload/save"
                // }
                // removeUrl={
                //   "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
                // }
              />
            </div>
            <p className="c-red mt0.625">{t('common.select_file_message')}</p>
          </div>

          <div className="file-upload-info">
            <div className="info-txt">
              {/*양식에 맞게 작성하신 후, <br /> 엑셀 파일을 업로드해주세요.*/}
              {t('common.upload_instructions')}
            </div>
            <div className="info-btns">
              <Button size={"small"} fillMode="outline" themeColor={"light"}
                      onClick={() => fileDownload("HEXA_BTRY_Register_sample.xlsx")}>
                {t("battery.battery_registration")} <i className="icon icon-down"></i>
              </Button>
              <Button size={"small"} fillMode="outline" themeColor={"light"}
                      onClick={() => fileDownload("HEXA_BTRY_USE_Modify_sample.xlsx")}>
                {t("battery.usage_change_upload")}
                <i className="icon icon-down"></i>
              </Button>
            </div>
          </div>
        </div>

        <DialogActionsBar>
          <Button size={"medium"} fillMode="outline" onClick={() => setUploadModalOpen(false)}>
            {t('common.cancel')}
          </Button>
          <Button
            size={"medium"}
            themeColor={"primary"}
            onClick={() => onConfirm()}
          >
            {t('common.confirm') /* 확인 */}
          </Button>
        </DialogActionsBar>
      </Dialog>
    </>
  );
}

export default BatteryInfoExcelUpload;
