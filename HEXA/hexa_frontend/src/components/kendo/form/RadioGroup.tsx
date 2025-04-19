import React from "react";
import { RadioGroup as KendoRadioGroup } from "@progress/kendo-react-inputs";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";

export default function RadioGroup(fieldRenderProps: FieldRenderProps) {
  const {
    validationMessage,
    touched,
    id,
    label,
    valid,
    disabled,
    hint,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);

  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  const labelId = label ? `${id}_label` : "";

  return (
    <FieldWrapper>
      <Label
        id={labelId}
        editorRef={editorRef}
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
      >
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <KendoRadioGroup
          ariaDescribedBy={`${hintId} ${errorId}`}
          ariaLabelledBy={labelId}
          valid={valid}
          disabled={disabled}
          ref={editorRef}
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
