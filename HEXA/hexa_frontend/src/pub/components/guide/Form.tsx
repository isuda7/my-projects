import * as React from "react";
import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
  FieldWrapper,
} from "@progress/kendo-react-form";

import { Error } from "@progress/kendo-react-labels";

import {
  Input,
  TextArea,
  MaskedTextBox,
  NumericTextBox,
  Switch,
  Checkbox,
  RadioButton,
  RadioGroup,
} from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Button } from "@progress/kendo-react-buttons";

import { DropDownList } from "@progress/kendo-react-dropdowns";

import { DatePicker } from "@progress/kendo-react-dateinputs";
import { CustomCalendar } from "../../components/guide/CustomCalendar";

const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value: string) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";

const EmailInput = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Input {...others} labelClassName={"k-form-label"} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

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

export default function uiForm() {
  const handleSubmit = (dataItem: { [name: string]: any }) =>
    alert(JSON.stringify(dataItem, null, 2));

  const data = React.useMemo(
    () => [
      { label: "Option 1", value: "one" },
      { label: "Option 2", value: "two" },
      { label: "Option 3", value: "three" },
    ],
    []
  );

  const sports = [
    "Baseball",
    "Basketball",
    "Cricket",
    "Field Hockey",
    "Football",
    "Table Tennis",
    "Tennis",
    "Volleyball",
  ];

  const [state, setState] = React.useState(false);

  const toggleClass = () => {
    setState(!state);
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

  const defaultInput = (fieldRenderProps: any) => {
    const { validationMessage, visited, value, ...others } = fieldRenderProps;
    return (
      <div className="k-form-field-wrap">
        <Input {...others} labelClassName={"k-form-label"} value={value} />
        {visited && validationMessage && <Error>{validationMessage}</Error>}
      </div>
    );
  };

  // datepicker
  const [value, setValue] = React.useState(new Date());
  const changeDateStart = () => {
    setValue(value);
  };
  const changeDateEnd = () => {
    setValue(value);
  };

  return (
    <div>
      {/* From */}
      <h2 className="k-mt-14">From</h2>
      <hr className="k-mt-4 k-mb-4" />

      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <div>form</div>
          </FormElement>
        )}
      />

      <hr className="k-mt-4 k-mb-4" />

      <div className="in-input">
        <Label editorId="emailID">아이디</Label>
        <Input id="emailID" placeholder="아이디를 입력해 주세요." />
      </div>

      <div className="in-input">
        <p className="in-tit">input disabled : class="disabled"</p>
        <Input className="disabled" />
      </div>

      <br />
      <br />

      <div className="in-input">
        <Label editorId="phoneNumber">휴대폰 번호</Label>
        <div className="inner-item">
          <Input id="phoneNumber" placeholder="휴대폰 번호를 입력해 주세요." />
          <Button size={"medium"}>인증번호 받기</Button>
        </div>
      </div>

      <br />
      <br />

      <div className="in-input input-password">
        <Label editorId="password">비밀번호</Label>
        <div className="pass-view">
          <Input
            id="password"
            type={state ? "text" : "password"}
            placeholder="비밀번호를 입력해 주세요."
          />
          <Button
            size={"small"}
            fillMode="flat"
            className={`btn-view ${state ? "is-active" : ""}`}
            onClick={() => toggleClass()}
          ></Button>
        </div>
      </div>

      <br />
      <br />

      <div className="in-input">
        <Label>TextArea</Label>
        <TextArea
          placeholder="Type the text here..."
          rows={3}
          resizable="none"
        />
      </div>

      <br />
      <br />

      <div className="in-input">
        <Label>Input Number</Label>
        <Input type="Number" className="w100" />
      </div>

      <br />
      <br />

      <div className="col-12 col-md-6 example-col">
        <p>Switch</p>
        <Switch />
      </div>

      <br />
      <br />

      <div className="col-12 col-md-6 example-col">
        <p>Checkbox : chexkbox-group</p>
        <br />
        <div className="chexkbox-round">
          <Checkbox label="Checkbox Option 1" defaultChecked={true} />
          <Checkbox label="Checkbox Option 2" defaultChecked={false} />
          <Checkbox
            label="Checkbox Option 2"
            defaultChecked={false}
            className="disabled"
          />
        </div>

        <br />
        <br />

        <p>Checkbox</p>
        <br />
        <div>
          <Checkbox label="Checkbox Option 1" defaultChecked={true} />
          <Checkbox label="Checkbox Option 2" defaultChecked={false} disabled />
          <Checkbox
            label="Checkbox Option 2"
            defaultChecked={true}
            className="disabled"
          />
        </div>
      </div>

      <br />
      <br />

      <div className="col-12 col-md-6 example-col">
        <p>RadioButton</p>
        <br />
        <RadioButton
          label="Radio Option 1"
          name="group1"
          value="option 1"
          defaultChecked={true}
        />
      </div>

      <br />
      <br />

      <div className="col-12 col-md-6 example-col">
        <p>RadioGroup</p>
        <br />
        <RadioGroup defaultValue={data[2].value} data={data} disabled />
      </div>

      <br />
      <br />

      <div className="col-xs-12 col-sm-7 example-col">
        <p>DropDownList</p>
        <br />
        <DropDownList
          style={{ width: "300px" }}
          data={sports}
          defaultValue="Select"
        />
      </div>
      <br />
      <br />

      <div className="col-xs-12 col-sm-7 example-col">
        <p>file-upload</p>
        <br />
      </div>
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

      <br />
      <br />

      <div className="col-xs-12 col-sm-7 example-col">
        <p>input-file</p>
        <br />
      </div>
      <div className="input-file" data-custom-label="선택">
        <Upload
          batch={false}
          multiple={false}
          files={files}
          onAdd={onAdd}
          onRemove={onRemove}
          onProgress={onProgress}
          onStatusChange={onStatusChange}
          withCredentials={false}
          saveUrl={"https://demos.telerik.com/kendo-ui/service-v4/upload/save"}
          removeUrl={
            "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
          }
        />
      </div>

      <br />
      <br />

      <div className="col-xs-12 col-sm-7 example-col">
        <p>input-file-thumb</p>
        <br />
      </div>
      <div className="input-file-thumb" data-custom-label="파일첨부">
        <Upload
          batch={false}
          multiple={true}
          files={files}
          onAdd={onAdd}
          onRemove={onRemove}
          onStatusChange={onStatusChange}
          withCredentials={false}
          saveUrl={"https://demos.telerik.com/kendo-ui/service-v4/upload/save"}
          removeUrl={
            "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
          }
        />

        {files.length ? (
          <div className={"img-preview example-config"}>
            <div className="img-scroll">
              {Object.keys(filePreviews).map((fileKey, index) => (
                <span key={index}>
                  <img
                    src={filePreviews[fileKey]}
                    alt={"KendoReact Upload image preview"}
                  />
                  <button type="button" className="close"></button>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="img-preview example-config">
            <div className="img-scroll">
              <span>
                <img src="/images/img-mail-01.png" alt="" />
                <button type="button" className="close"></button>
              </span>
            </div>
          </div>
        )}
      </div>

      <br />
      <br />

      <div className="col-xs-12 col-sm-7 example-col">
        <p>input-file-multiple</p>
        <br />
      </div>
      <div className="input-file-multiple" data-custom-label="파일첨부">
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

      <br />
      <br />

      <div className="search-group">
        <dl>
          <div>
            <dt>기간선택</dt>
            <dd>
              <span className="period">
                <Button fillMode="outline" togglable={true}>
                  오늘
                </Button>
                <Button fillMode="outline" togglable={true}>
                  1주
                </Button>
                <Button fillMode="outline" togglable={true}>
                  1달
                </Button>
                <Button fillMode="outline" togglable={true} selected>
                  전체
                </Button>
              </span>

              <span className="datepicker">
                <span className="cell">
                  <DatePicker
                    calendar={CustomCalendar}
                    defaultValue={value}
                    onChange={changeDateStart}
                    format={"yyyy-MM-dd"}
                  />
                </span>
                ~
                <span className="cell">
                  <DatePicker
                    calendar={CustomCalendar}
                    defaultValue={value}
                    onChange={changeDateEnd}
                    format={"yyyy-MM-dd"}
                  />
                </span>
              </span>
            </dd>
          </div>
        </dl>
        <div className="group-align-right">
          <Button size={"medium"} themeColor={"dark"}>
            <i className="icon icon-search"></i>
            검색
          </Button>
        </div>
      </div>

      <br />
      <br />

      <div className="search-group">
        <dl>
          <div>
            <dt>스테이션 명</dt>
            <dd>
              <DropDownList style={{ width: "200px" }} defaultValue="" />
            </dd>
          </div>
          <div>
            <dt>기간선택</dt>
            <dd>
              <span className="period">
                <Button fillMode="outline" togglable={true}>
                  오늘
                </Button>
                <Button fillMode="outline" togglable={true}>
                  1주
                </Button>
                <Button fillMode="outline" togglable={true}>
                  1달
                </Button>
                <Button fillMode="outline" togglable={true} selected>
                  전체
                </Button>
              </span>

              <span className="datepicker">
                <span className="cell">
                  <DatePicker value={value} onChange={changeDateStart} />
                </span>
                ~
                <span className="cell">
                  <DatePicker value={value} onChange={changeDateEnd} />
                </span>
              </span>
            </dd>
          </div>
        </dl>
        <div className="group-align-right">
          <Button size={"medium"} fillMode="outline">
            <i className="icon icon-refresh"></i>
            초기화
          </Button>
          <Button size={"medium"} themeColor={"dark"}>
            <i className="icon icon-search"></i>
            검색
          </Button>
        </div>
      </div>

      <br />
      <br />

      <div className="search-group">
        <dl>
          <div>
            <dt>스테이션 명</dt>
            <dd>
              <div className="in-input">
                <div className="inner-item">
                  <Input
                    placeholder="스테이션명을 정확하게 입력 해 주세요."
                    className="w300"
                  />
                  <Button fillMode="outline" size={"medium"}>
                    조회
                  </Button>
                </div>
              </div>
            </dd>
          </div>
          <div>
            <dt>기간선택</dt>
            <dd>
              <span className="period">
                <Button fillMode="outline" togglable={true}>
                  오늘
                </Button>
                <Button fillMode="outline" togglable={true}>
                  1주
                </Button>
                <Button fillMode="outline" togglable={true}>
                  1달
                </Button>
              </span>

              <span className="datepicker">
                <span className="cell">
                  <DatePicker value={value} onChange={changeDateStart} />
                </span>
                ~
                <span className="cell">
                  <DatePicker value={value} onChange={changeDateEnd} />
                </span>
              </span>
            </dd>
          </div>
        </dl>
        <div className="group-align-right">
          <Button size={"medium"} fillMode="outline">
            <i className="icon icon-refresh"></i>
            초기화
          </Button>
          <Button size={"medium"} themeColor={"dark"}>
            <i className="icon icon-search"></i>
            검색
          </Button>
        </div>
      </div>

      <br />
      <br />

      <div className="search-group">
        <div className="search-flex">
          <DropDownList style={{ width: "200px" }} defaultValue="" />
          <DropDownList style={{ width: "200px" }} defaultValue="" />
          <Input id="sampletxt" />
        </div>

        <div className="group-align-right">
          <Button size={"medium"} fillMode="outline">
            <i className="icon icon-refresh"></i>
            초기화
          </Button>
          <Button size={"medium"} themeColor={"dark"}>
            <i className="icon icon-search"></i>
            검색
          </Button>
        </div>
      </div>
    </div>
  );
}
