// HEXAADMSTM1S01 : 스테이션 정보 등록

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
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

export default function HEXAADMSTM1S01() {
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
        <span>스테이션 정보 관리 </span>
        <span>스테이션 정보 등록 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 정보 등록</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            {/* 기본 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">기본 정보</h3>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "15%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "15%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Label editorId="name">
                        스테이션명
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </Label>
                    </th>
                    <td colSpan={3}>
                      <div className="in-input">
                        <div className="inner-item mw400">
                          <Input id="name" />
                          <Button
                            size={"medium"}
                            fillMode="outline"
                            className="w80"
                          >
                            중복 확인
                          </Button>
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <Label editorId="name">
                        고객구분
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </Label>
                    </th>
                    <td>
                      <DropDownList defaultValue="선택" />
                    </td>
                  </tr>
                  {/* [2024-10-21] 주소, 위도, 경도 수정 */}
                  <tr>
                    <th scope="row" rowSpan={2}>
                      주소
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td rowSpan={2} colSpan={3}>
                      <div className="in-address">
                        <DropDownList defaultValue="시 선택" className="w200" />
                        <DropDownList defaultValue="구 선택" className="w200" />
                        <div className="in-input">
                          <div className="inner-item">
                            <span>도로명</span>
                            <Input />
                          </div>
                          <div className="inner-item">
                            <span>지번</span>
                            <Input />
                          </div>
                        </div>
                      </div>
                    </td>
                    <th scope="row">
                      <Label editorId="Latitude">
                        위도
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </Label>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input id="Latitude" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <Label editorId="longitude">
                        경도
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </Label>
                    </th>
                    <td>
                      <div className="in-input">
                        <Input id="longitude" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">슬롯개수</th>
                    <td></td>
                    <th scope="row">
                      <Label editorId="wh">
                        사용가능 전력량
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </Label>
                    </th>
                    <td>
                      <div className="row flex-gap-0.5">
                        <DropDownList
                          defaultValue="직접입력"
                          className="w200"
                        />
                        <div className="in-input w200">
                          <div className="inner-item">
                            <Input id="wh" />
                            <span>Wh</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <th scope="row">APP 노출여부 </th>
                    <td>
                      <DropDownList defaultValue="Y" />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">비고(30자 이내)</th>
                    <td colSpan={7}>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      설치 사진
                      <div className="t-desc">
                        (5MB 이하 최대 3개. png, jpg, jpeg만 가능)
                      </div>
                    </th>
                    <td colSpan={7}>
                      <div
                        className="input-file-thumb"
                        data-custom-label="파일첨부"
                      >
                        <Upload
                          batch={false}
                          multiple={true}
                          files={files}
                          onAdd={onAdd}
                          onRemove={onRemove}
                          onStatusChange={onStatusChange}
                          withCredentials={false}
                          saveUrl={
                            "https://demos.telerik.com/kendo-ui/service-v4/upload/save"
                          }
                          removeUrl={
                            "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
                          }
                        />

                        {files.length ? (
                          <div className={"img-preview example-config"}>
                            <div className="img-scroll">
                              {Object.keys(filePreviews).map(
                                (fileKey, index) => (
                                  <span key={index}>
                                    <img
                                      src={filePreviews[fileKey]}
                                      alt={"KendoReact Upload image preview"}
                                    />
                                    <button
                                      type="button"
                                      className="close"
                                    ></button>
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 설정 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">설정 정보</h3>
              </div>

              {/* [2024-10-21] 
                  스테이션 정보 상세화면과 동일하게 맞춤.
              */}
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
                    <th scope="row">배출 우선순위</th>
                    <td colSpan={7} className="px0">
                      <div className="cell-line">
                        <div className="row flex-gap-0.5">
                          <span className="col-2">1순위</span>
                          <DropDownList defaultValue="SOH" className="col-5" />
                          <DropDownList
                            defaultValue="높은 순"
                            className="col-4"
                          />
                        </div>

                        <div className="row flex-gap-0.5">
                          <span className="col-2">2순위</span>
                          <DropDownList
                            defaultValue="누적교환횟수"
                            className="col-5"
                          />
                          <DropDownList
                            defaultValue="낮은 순"
                            className="col-4"
                          />
                        </div>

                        <div className="row flex-gap-0.5">
                          <span className="col-2">3순위</span>
                          <DropDownList defaultValue="SOH" className="col-5" />
                          <DropDownList
                            defaultValue="높은 순"
                            className="col-4"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      번잡도
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                      <div className="t-desc">
                        ※번잡도 숫자가 높을수록 해당 시간대가 번잡함을
                        의미합니다.
                      </div>
                    </th>
                    <td colSpan={7}>
                      <div className="tbl-inner">
                        <table>
                          <thead>
                            <tr>
                              <th>시간대</th>
                              <th>0~1</th>
                              <th>1~2</th>
                              <th>2~3</th>
                              <th>3~4</th>
                              <th>4~5</th>
                              <th>5~6</th>
                              <th>6~7</th>
                              <th>7~8</th>
                              <th>8~9</th>
                              <th>9~10</th>
                              <th>10~11</th>
                              <th>11~12</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>단계</td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="tbl-inner">
                        <table>
                          <thead>
                            <tr>
                              <th>시간대</th>
                              <th>12~13</th>
                              <th>13~14</th>
                              <th>14~15</th>
                              <th>15~16</th>
                              <th>16~17</th>
                              <th>17~18</th>
                              <th>18~19</th>
                              <th>19~20</th>
                              <th>20~21</th>
                              <th>21~22</th>
                              <th>22~23</th>
                              <th>23~24</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>단계</td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                              <td>
                                <DropDownList defaultValue="3" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>OS 재부팅 주기</th>
                    <td colSpan={7}>
                      <div className="row flex-gap-0.5">
                        <DropDownList
                          defaultValue="재부팅 없음"
                          className="w150"
                        />
                        <DropDownList defaultValue="00" className="w150" />
                        <DropDownList defaultValue="00" className="w150" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 기기 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">기기 정보</h3>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "90%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Label editorId="sn">
                        대표 함체
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </Label>
                    </th>
                    <td>
                      <Button
                        size={"medium"}
                        fillMode="outline"
                        className="w60"
                      >
                        선택
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </FormElement>
        )}
      />

      <div className="btn-group">
        <div className="group-align-right">
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
