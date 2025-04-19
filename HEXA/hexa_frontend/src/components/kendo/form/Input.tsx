import { useRef, useEffect } from 'react';
import { InputChangeEvent, Input as KendoInput } from "@progress/kendo-react-inputs";
import { FieldWrapper, FieldRenderProps } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";

export default function Input(fieldRenderProps: FieldRenderProps) {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    type,
    optional,
    onChange,
    regEx,
    visited,
    ...others
  } = fieldRenderProps;

  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  const inputRef = useRef<HTMLInputElement>(null);

  // 유효성 검사 실패 시 포커스 이동
  useEffect(() => {
    if (validationMessage && visited && inputRef.current) {
      inputRef.current.focus();
    }
  }, [validationMessage, visited]);

  // 입력 제한 로직
  const handleInputChange = (e: InputChangeEvent) => {
    const inputValue: any = e.target.value;

    //정규식 조건이 존재하는지 판단
    if(regEx) {
      if(regEx.test(inputValue)) onChange(e);  // 조건을 만족할 때만 onChange 호출
    }
    else {
      onChange(e)
    }
  };

  return (
    <FieldWrapper>
      <Label
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        optional={optional}
      >
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <KendoInput
          ref={inputRef}
          valid={valid}
          type={type}
          id={id}
          disabled={disabled}
          ariaDescribedBy={`${hintId} ${errorId}`}
          onChange={handleInputChange}  // 제한을 걸기 위한 onChange 핸들러
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
