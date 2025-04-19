import React from "react";
import {
  Upload as KendoUpload,
  UploadOnAddEvent,
} from "@progress/kendo-react-upload";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";
import { Avatar } from "@progress/kendo-react-layout";
import userAvatar from "/images/user-avatar.jpg";

export default function Upload(fieldRenderProps: FieldRenderProps) {
  const {
    valid,
    value,
    id,
    optional,
    label,
    hint,
    validationMessage,
    touched,
    onChange,
    ...others
  } = fieldRenderProps;

  const imgRef = React.useRef<HTMLImageElement>(null);
  const hasImage = value && value.length > 0;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;

  const hintId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  const labelId = label ? `${id}_label` : "";

  const onChangeHandler = (event: UploadOnAddEvent) => {
    onChange({ value: event.newState });
  };
  const onRemoveHandler = (event: UploadOnAddEvent) => {
    onChange({ value: event.newState });
  };

  React.useEffect(() => {
    if (hasImage) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (imgRef.current && e.target?.result) {
          imgRef.current.setAttribute("src", e.target.result as string);
        }
      };
      reader.readAsDataURL(value[0].getRawFile());
    }
  }, [value, hasImage]);

  return (
    <FieldWrapper>
      <Label id={labelId} editorId={id} editorValid={valid} optional={optional}>
        {label}
        <Avatar
          style={{ width: 100, height: 100, flexBasis: 100 }}
          type="image"
        >
          {hasImage ? (
            <img
              style={{ width: 100, height: 100 }}
              ref={imgRef}
              src="#"
              alt="User Avatar"
            />
          ) : (
            <img
              style={{ width: 100, height: 100 }}
              src={userAvatar}
              alt="user-avatar"
            />
          )}
        </Avatar>
      </Label>
      <div className="k-form-field-wrap">
        <KendoUpload
          id={id}
          autoUpload={false}
          showActionButtons={false}
          multiple={false}
          files={value}
          onAdd={onChangeHandler}
          onRemove={onRemoveHandler}
          ariaDescribedBy={`${hintId} ${errorId}`}
          ariaLabelledBy={labelId}
          {...others}
        />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && (
          <Error id={errorId}>{validationMessage}</Error>
        )}
      </div>
    </FieldWrapper>
  );
}
