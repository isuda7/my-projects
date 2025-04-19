// HEXAADMSTM3S03 : 스테이션 정보 상세

import * as React from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
} from "@progress/kendo-react-grid";
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

const sampleProducts = [
  {
    divide: "슬롯 S/N",
    slot1: "20240610001",
    slot2: "20240610001",
    slot3: "20240610001",
    slot4: "20240610001",
    slot5: "20240610001",
    slot6: "20240610001",
    slot7: "20240610001",
    slot8: "20240610001",
    slot9: "20240610001",
    slot10: "20240610001",
  },
  {
    divide: "HW 버전",
    slot1: "1.0",
    slot2: "1.0",
    slot3: "1.0",
    slot4: "1.0",
    slot5: "1.0",
    slot6: "1.0",
    slot7: "1.0",
    slot8: "1.0",
    slot9: "1.0",
    slot10: "1.0",
  },
  {
    divide: "생산일",
    slot1: "2024-08-04",
    slot2: "2024-08-04",
    slot3: "2024-08-04",
    slot4: "2024-08-04",
    slot5: "2024-08-04",
    slot6: "2024-08-04",
    slot7: "2024-08-04",
    slot8: "2024-08-04",
    slot9: "2024-08-04",
    slot10: "2024-08-04",
  },
  {
    divide: "교환일시",
    slot1: "2024-08-04 12:30:41",
    slot2: "2024-08-04 12:30:40",
    slot3: "2024-08-04 12:30:40",
    slot4: "2024-08-04 12:30:40",
    slot5: "2024-08-04 12:30:40",
    slot6: "2024-08-04 12:30:40",
    slot7: "2024-08-04 12:30:40",
    slot8: "2024-08-04 12:30:40",
    slot9: "2024-08-04 12:30:40",
    slot10: "2024-08-04 12:30:40",
  },
];

const sampleProducts2 = [
  {
    No: "4",
    ProfileNo: "7",
    Condition: "0.45C 4.15V 충전",
    DateTime: "2024-10-10 20:05:19",
  },
  {
    No: "3",
    ProfileNo: "5",
    Condition: "0.45C 4.1V 충전",
    DateTime: "2024-10-10 20:05:19",
  },
  {
    No: "2",
    ProfileNo: "2",
    Condition: "0.45C 4.15V 충전",
    DateTime: "2024-10-10 20:05:19",
  },
  {
    No: "4",
    ProfileNo: "7",
    Condition: "0.45C 4.15V 충전",
    DateTime: "2024-10-10 20:05:19",
  },
];

export default function HEXAADMSTM3S03() {
  const CustomCellDateTime = (props: any) => {
    return (
      <td colSpan={1} {...props.tdProps}>
        {/* {props.children} */}
        <span className="cell-date">2024-08-20</span>
        <span className="cell-time">00:18:51</span>
      </td>
    );
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
        <span>스테이션 정보 상세 </span>
      </div>

      <div className="head-group">
        <h2 className="t-header">스테이션 정보 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            {/* 기본 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">기본 정보</h3>
                <div className="group-align-right gap0.38">
                  <Button size={"medium"}>대시보드 제어 이력</Button>
                  <Button size={"medium"}>설정 변경 이력 </Button>
                  <Button size={"medium"}>기기 변경 이력</Button>
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
                    <th scope="row">스테이션ID</th>
                    <td>HX0224020C1</td>
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
                    <td rowSpan={2} colSpan={5}>
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
                    <td colSpan={3}>
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
                    <th scope="row">스테이션 상태</th>
                    <td>등록</td>
                    <th scope="row">설치일</th>
                    <td></td>
                    <th scope="row">미사용 여부</th>
                    <td>
                      <DropDownList defaultValue="N" disabled />
                    </td>
                    <th scope="row">미사용 등록일</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">비고(30자 이내)</th>
                    <td colSpan={7}>
                      <div className="in-input">
                        <Input defaultValue="2024.10.30 스테이션 교체 예정" />
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
                            <div className="img-scroll">
                              <span role="button">
                                <img src="/images/img-mail-01.png" alt="" />
                                <button
                                  type="button"
                                  className="close"
                                ></button>
                              </span>
                              <span role="button">
                                <img src="/images/img-mail-01.png" alt="" />
                                <button
                                  type="button"
                                  className="close"
                                ></button>
                              </span>
                              <span role="button">
                                <img src="/images/img-mail-01.png" alt="" />
                                <button
                                  type="button"
                                  className="close"
                                ></button>
                              </span>
                            </div>
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
                  누락된 '배출가능 SOC (%)', '충전 순서 기준', '온도 범위' 추가했습니다
                  항목 추가로 인해 col 추가, '배출 우선순위' 부분 마크업 수정되었습니다.
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
                    <th scope="row">OS 재부팅 주기</th>
                    <td colSpan={3}>
                      <div className="row flex-gap-0.5">
                        <DropDownList
                          defaultValue="매주 일요일"
                          className="w150"
                        />
                        <DropDownList defaultValue="00" className="w150" />
                        <DropDownList defaultValue="00" className="w150" />
                      </div>
                    </td>
                    <th scope="row">배출가능 SOC (%)</th>
                    <td>90</td>
                    <th scope="row">충전 순서 기준 </th>
                    <td>선입선출</td>
                  </tr>
                  <tr>
                    <th scope="row">온도 범위</th>
                    <td colSpan={7}>
                      <div className="tbl-inner type-header-line">
                        <table>
                          <colgroup>
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col" colSpan={2}>
                                1월
                              </th>
                              <th scope="col" colSpan={2}>
                                2월
                              </th>
                              <th scope="col" colSpan={2}>
                                3월
                              </th>
                              <th scope="col" colSpan={2}>
                                4월
                              </th>
                              <th scope="col" colSpan={2}>
                                5월
                              </th>
                              <th scope="col" colSpan={2}>
                                6월
                              </th>
                            </tr>
                            <tr>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>0</td>
                              <td>10</td>
                              <td>0</td>
                              <td>10</td>
                              <td>5</td>
                              <td>15</td>
                              <td>10</td>
                              <td>25</td>
                              <td>20</td>
                              <td>30</td>
                              <td>20</td>
                              <td>30</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="tbl-inner type-header-line">
                        <table>
                          <colgroup>
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "8%" }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col" colSpan={2}>
                                7월
                              </th>
                              <th scope="col" colSpan={2}>
                                8월
                              </th>
                              <th scope="col" colSpan={2}>
                                9월
                              </th>
                              <th scope="col" colSpan={2}>
                                10월
                              </th>
                              <th scope="col" colSpan={2}>
                                11월
                              </th>
                              <th scope="col" colSpan={2}>
                                12월
                              </th>
                            </tr>
                            <tr>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                              <th scope="col">최저 온도</th>
                              <th scope="col">최고 온도</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>0</td>
                              <td>10</td>
                              <td>0</td>
                              <td>10</td>
                              <td>5</td>
                              <td>15</td>
                              <td>10</td>
                              <td>25</td>
                              <td>20</td>
                              <td>30</td>
                              <td>20</td>
                              <td>30</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 기기 정보 */}
            <section className="section">
              <div className="title-group ">
                <h3 className="t-title">기기 정보</h3>
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
                    <th scope="row">
                      <Label editorId="sn">
                        대표 함체
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </Label>
                    </th>
                    <td colSpan={7}>
                      <Button
                        size={"medium"}
                        fillMode="outline"
                        className="w60"
                        disabled
                      >
                        선택
                      </Button>
                      <span className="cell-bar">
                        S/N : <strong>123466126510</strong>
                      </span>
                      <span className="cell-bar">
                        QR ID : <strong>C0034</strong>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">함체 1 S/N</th>
                    <td>123466126510</td>
                    <th scope="row">세대 구분</th>
                    <td>2세대</td>
                    <th scope="row">HW 버전</th>
                    <td>1.0</td>
                    <th scope="row">생산일</th>
                    <td>2024-07-08</td>
                  </tr>
                  <tr>
                    <th scope="row">슬롯 정보</th>
                    <td colSpan={7} className="scroll">
                      <Grid data={sampleProducts} scrollable="none">
                        <GridNoRecords>
                          There is no data available
                        </GridNoRecords>
                        <Column
                          field="divide"
                          title="구분"
                          width="145"
                          className="txt-center"
                        />
                        <Column
                          field="slot1"
                          title="슬롯1"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot2"
                          title="슬롯2"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot3"
                          title="슬롯3"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot4"
                          title="슬롯4"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot5"
                          title="슬롯5"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot6"
                          title="슬롯6"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot7"
                          title="슬롯7"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot8"
                          title="슬롯8"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot9"
                          title="슬롯9"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot10"
                          title="슬롯10"
                          width="140"
                          className="txt-center"
                        />
                      </Grid>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">함체 2 S/N</th>
                    <td>123466126510</td>
                    <th scope="row">세대 구분</th>
                    <td>2세대</td>
                    <th scope="row">HW 버전</th>
                    <td>1.0</td>
                    <th scope="row">생산일</th>
                    <td>2024-07-08</td>
                  </tr>
                  <tr>
                    <th scope="row">슬롯 정보</th>
                    <td colSpan={7} className="scroll">
                      <Grid data={sampleProducts} scrollable="none">
                        <GridNoRecords>
                          There is no data available
                        </GridNoRecords>
                        <Column
                          field="divide"
                          title="구분"
                          width="145"
                          className="txt-center"
                        />
                        <Column
                          field="slot1"
                          title="슬롯1"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot2"
                          title="슬롯2"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot3"
                          title="슬롯3"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot4"
                          title="슬롯4"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot5"
                          title="슬롯5"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot6"
                          title="슬롯6"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot7"
                          title="슬롯7"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot8"
                          title="슬롯8"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot9"
                          title="슬롯9"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot10"
                          title="슬롯10"
                          width="140"
                          className="txt-center"
                        />
                      </Grid>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">함체 3 S/N</th>
                    <td>123466126510</td>
                    <th scope="row">세대 구분</th>
                    <td>2세대</td>
                    <th scope="row">HW 버전</th>
                    <td>1.0</td>
                    <th scope="row">생산일</th>
                    <td>2024-07-08</td>
                  </tr>
                  <tr>
                    <th scope="row">슬롯 정보</th>
                    <td colSpan={7} className="scroll">
                      <Grid data={sampleProducts} scrollable="none">
                        <GridNoRecords>
                          There is no data available
                        </GridNoRecords>
                        <Column
                          field="divide"
                          title="구분"
                          width="145"
                          className="txt-center"
                        />
                        <Column
                          field="slot1"
                          title="슬롯1"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot2"
                          title="슬롯2"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot3"
                          title="슬롯3"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot4"
                          title="슬롯4"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot5"
                          title="슬롯5"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot6"
                          title="슬롯6"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot7"
                          title="슬롯7"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot8"
                          title="슬롯8"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot9"
                          title="슬롯9"
                          width="140"
                          className="txt-center"
                        />
                        <Column
                          field="slot10"
                          title="슬롯10"
                          width="140"
                          className="txt-center"
                        />
                      </Grid>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 펌웨어 정보 */}
            <section className="section">
              <div className="title-group ">
                <h3 className="t-title">펌웨어 정보</h3>
              </div>

              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "14%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">SW Application </th>
                    <td>2</td>
                    <th scope="row">NFC 펌웨어 </th>
                    <td>
                      {/* [2024-10-24] 펌웨어 정보가 상이한 경우  */}
                      <span className="c-red">1.0.2.0*</span>
                    </td>
                    <th scope="row">슬롯 펌웨어</th>
                    <td>1.0.2.0</td>
                  </tr>
                  <tr>
                    <th scope="row">충전기 펌웨어 </th>
                    <td>1.0.2.0</td>
                    <th scope="row">BMS 펌웨어</th>
                    <td>1.0.2.0</td>
                    <th scope="row">함체 펌웨어</th>
                    <td>1.0.2.0</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 충전프로파일 정보 */}
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">충전프로파일 정보</h3>
              </div>

              <div className="grid-box-line">
                <Grid data={sampleProducts2} scrollable="none">
                  <GridNoRecords>There is no data available</GridNoRecords>
                  <Column
                    field="No"
                    title="No"
                    width="80"
                    className="txt-left"
                  />
                  <Column
                    field="ProfileNo"
                    title="충전 프로파일 NO"
                    width="140"
                    className="txt-left"
                  />
                  <Column
                    field="Condition"
                    title="충전 조건"
                    width="140"
                    className="txt-left"
                  />
                  <Column
                    field="DateTime"
                    title="적용일시"
                    width="140"
                    className="txt-left"
                    cells={{
                      data: CustomCellDateTime,
                    }}
                  />
                </Grid>
              </div>
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
                    <td>2024-07-19 20:08:19</td>
                    <th scope="row">등록자 ID</th>
                    <td>superadmin01</td>
                  </tr>
                  <tr>
                    <th scope="row">수정일시</th>
                    <td>2024-07-19 20:08:19</td>
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
