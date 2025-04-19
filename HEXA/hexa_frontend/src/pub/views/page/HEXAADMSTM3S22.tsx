// HEXAADMSTM3S22 : 펌웨어 상세

import * as React from "react";
import { Input, TextArea } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
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

export default function HEXAADMSTM3S22() {
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
      <div className="breadcrumbs">
        <span>홈</span>
        <span>스테이션 관리</span>
        <span>펌웨어 및 배포 관리 </span>
        <span>펌웨어 관리</span>
        <span>펌웨어 상세</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">펌웨어 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">펌웨어 정보</h3>
                <div className="title-group__txt">
                  <span className="c-red">
                    ※ 펌웨어 버전은 파일명을 기준으로 자동적으로 작성되오니
                    파일명을 잘 확인하고 업로드해주세요.
                  </span>
                </div>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "15%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">세대구분</th>
                    <td>
                      <DropDownList defaultValue="2세대" />
                    </td>
                    <th scope="row">
                      펌웨어명
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <DropDownList defaultValue="선택" />
                    </td>
                    <th scope="row">버전</th>
                    <td>
                      <div className="in-input">
                        <Input id="name" disabled />
                      </div>
                    </td>
                    <th scope="row">사용여부</th>
                    <td>
                      <DropDownList defaultValue="Y" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      파일
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td colSpan={7}>
                      <div
                        className="input-file mw800"
                        data-custom-label="선택"
                      >
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
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">설명</th>
                    <td colSpan={7}>
                      <div className="in-input">
                        <TextArea rows={6} resizable="none" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 등록 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">등록 정보</h3>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "30%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">등록일시</th>
                    <td>
                      <span className="cell-date">2024-08-20</span>
                      <span className="cell-time">00:18:51</span>
                    </td>
                    <th scope="row">등록자 ID</th>
                    <td>superadmin01</td>
                  </tr>
                  <tr>
                    <th scope="row">수정일시</th>
                    <td>
                      <span className="cell-date">2024-08-20</span>
                      <span className="cell-time">00:18:51</span>
                    </td>
                    <th scope="row">수정자 ID</th>
                    <td>admin003</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </FormElement>
        )}
      />

      <div className="btn-group">
        <div className="group-align-right">
          <Button size={"large"}>삭제</Button>
          <Button size={"large"} fillMode="outline">
            취소
          </Button>
          <Button size={"large"} themeColor={"primary"}>
            저장
          </Button>
        </div>
      </div>
    </>
  );
}
