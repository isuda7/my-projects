// HEXAADMNTM3S03 : 공지사항 상세

import * as React from "react";
import { Input, RadioGroup, TextArea } from "@progress/kendo-react-inputs";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { DatePicker } from "@progress/kendo-react-dateinputs";
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

import { Editor, EditorTools } from "@progress/kendo-react-editor";
const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  FontSize,
  FormatBlock,
  Link,
  Unlink,
  InsertImage,
  ViewHtml,
  InsertTable,
  AddRowBefore,
  AddRowAfter,
  AddColumnBefore,
  AddColumnAfter,
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  MergeCells,
  SplitCell,
} = EditorTools;

export default function HEXAADMNTM3S03() {
  // datepicker
  const [value, setValue] = React.useState(new Date());
  const changeDateStart = () => {
    setValue(value);
  };
  const changeDateEnd = () => {
    setValue(value);
  };

  // file
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

  const content = `<p style="text-align: center;"><img src="https://www.telerik.com/kendo-react-ui-develop/components/inputs/colorpicker/assets/kendoka.png" alt="KendoReact Kendoka" title="KendoReact" width="100" height="100" /></p><p><strong>KendoReact Editor</strong> allows your users to edit HTML in a familiar, user-friendly way.<br>In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists, and image handling. The widget <strong>outputs identical HTML</strong> across all major browsers, follows accessibility standards and provides <a href="https://www.telerik.com/kendo-react-ui/components/editor/tools/" target="_blank" title="https://www.telerik.com/kendo-react-ui/components/editor/tools/">multiple tools</a> for content manipulation.</p><p>Features include:</p><ul><li><p>Text formatting &amp; alignment</p></li><li><p>Bulleted and numbered lists</p></li><li><p>Hyperlink and image dialogs</p></li><li><p>Identical HTML output across modern browsers</p></li><li><p><a href="https://www.telerik.com/kendo-react-ui/knowledge-base/add-custom-tools-to-the-editor-and-customize-built-in-tools/" target="_blank" title="Customize tools" />Highly customizable tools</a></p></li></ul><p></p><p>The Editor has a table option as well, allowing to add and edit tabular data.<br /></p><table><tbody><tr><td><p style="text-align: center;"><strong>Product Id</strong></p></td><td><p style="text-align: center;"><strong>Product Name</strong></p></td><td><p style="text-align: center;"><strong>Price</strong></p></td></tr><tr><td><p>1</p></td><td><p>Chai</p></td><td><p style="text-align: right;">18</p></td></tr><tr><td><p>2</p></td><td><p>Chang</p></td><td><p style="text-align: right;">19</p></td></tr><tr><td><p>3</p></td><td><p>Aniseed Syrup</p></td><td><p style="text-align: right;">10</p></td></tr></tbody></table><p></p>`;

  // 윈도우 팝업 사이즈
  const width = 550;
  const height = 550;
  let left = document.body.clientWidth / 2 - width / 2;
  left += window.screenLeft;
  const top = screen.availHeight / 2 - height / 2;

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>게시판 </span>
        <span>공지사항 </span>
        <span>공지사항 상세</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">공지사항 상세</h2>
      </div>

      <Form
        render={() => (
          <FormElement>
            <section className="section">
              <table className="tbl-base">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "40%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "40%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">상단 고정</th>
                    <td>
                      <RadioGroup
                        className="flex-gap-0.5-2"
                        layout="horizontal"
                        defaultValue={"2"}
                        data={[
                          { label: "사용", value: "1" },
                          { label: "미사용", value: "2" },
                        ]}
                      />
                    </td>
                    <th scope="row">
                      게시 기간
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <span className="datepicker">
                        <span className="cell">
                          <DatePicker
                            value={value}
                            onChange={changeDateStart}
                            format={"yyyy-MM-dd"}
                          />
                        </span>
                        ~
                        <span className="cell">
                          <DatePicker
                            value={value}
                            onChange={changeDateEnd}
                            format={"yyyy-MM-dd"}
                          />
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      제목
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td colSpan={3}>
                      <div className="in-input">
                        <Input />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">내용</th>
                    <td colSpan={3}>
                      <Editor
                        tools={[
                          [Bold, Italic, Underline, Strikethrough],
                          [Subscript, Superscript],
                          [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                          [Indent, Outdent],
                          [OrderedList, UnorderedList],
                          FontSize,
                          FormatBlock,
                          [Undo, Redo],
                          [Link, Unlink, InsertImage, ViewHtml],
                          [InsertTable],
                          [
                            AddRowBefore,
                            AddRowAfter,
                            AddColumnBefore,
                            AddColumnAfter,
                          ],
                          [DeleteRow, DeleteColumn, DeleteTable],
                          [MergeCells, SplitCell],
                        ]}
                        contentStyle={{
                          height: 320,
                        }}
                        defaultContent={content}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">파일 첨부</th>
                    <td colSpan={3}>
                      <p className="desc mb0.5">
                        파일은 5MB 이하로 최대 3개까지 업로드 가능합니다.
                        (확장자 : zip, pdf, docx, xlsx, jpg, jpeg, png, gif)
                      </p>
                      <div
                        className="input-file-multiple"
                        data-custom-label="파일첨부"
                      >
                        <Upload
                          batch={false}
                          multiple
                          files={files}
                          onAdd={onAdd}
                          onRemove={onRemove}
                          onProgress={onProgress}
                          onStatusChange={onStatusChange}
                          withCredentials={false}
                          saveUrl="https://demos.telerik.com/kendo-ui/service-v4/upload/save"
                          removeUrl="https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">팝업 여부</th>
                    <td colSpan={3}>
                      <RadioGroup
                        className="flex-gap-0.5-2"
                        layout="horizontal"
                        defaultValue={"2"}
                        data={[
                          { label: "Y", value: "1" },
                          { label: "N", value: "2" },
                        ]}
                      />
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
          <Button
            size={"large"}
            onClick={() =>
              window.open(
                `${window.location.origin}/pub/page/HEXAADMNTM2P10`,
                "_blank",
                `width=${width},height=${height},top=${top},left=${left}`
              )
            }
          >
            팝업 미리보기
          </Button>
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
