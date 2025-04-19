import { useState, useEffect } from "react";
import { InputChangeEvent, Input as KendoInput } from "@progress/kendo-react-inputs";
import { FieldWrapper, FieldRenderProps } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";

export default function NumberInput(fieldRenderProps: FieldRenderProps) {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    optional,
    onChange,
    value,
    onFocus,
    onBlur,
    decimals = 0,
    fixedDecimal = false,
    ...others
  } = fieldRenderProps;

  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";

  const [displayValue, setDisplayValue] = useState<string | number>(value !== undefined ? value : '');
  const [isFocused, setIsFocused] = useState<boolean>(false)

  useEffect(() => {
    if(isFocused) {
      setDisplayValue(value !== undefined ? value : ''); // value가 바뀌면 displayValue도 업데이트
    }
    else {
      if(value !== undefined) setDisplayValue(getFormatValue(value))
    }
  }, [value]);

  // 입력 제한 로직
  const handleInputChange = (e: InputChangeEvent) => {
    let inputValue: any = e.target.value;
    const regEx = new RegExp(`^\\d*(\\.\\d{0,${decimals}})?$`); // 소수점 자리 제한
    
    //정규식 조건이 존재하는지 판단
    if(regEx.test(inputValue)) {
      onChange(e);  // 조건을 만족할 때만 onChange 호출
      //setDisplayValue(inputValue);
    }
  };

  // 포커스 들어올 때 (기존 값 그대로 표시)
  const handleFocus = () => {
    setIsFocused(true);
    if (displayValue !== "") {
      setDisplayValue(value); // 포커스가 들어왔을 때는 숫자 그대로 표시
    }
  };

  /**
   * 소수점 제외 숫자 콤마 찍어서 반환
   */
  const getFormatValue = (value: string | number) => {
    const number = Number(value)
    if(fixedDecimal) {
      const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
      return formatter.format(number)
    }
    return new Intl.NumberFormat("en-US").format(number)
  }

  // 포커스 나갈 때 (3자리마다 , 찍기)
  const handleBlur = () => {
    setIsFocused(false);
    if (displayValue !== "") {
      console.log('displayValue', displayValue)
      
      //.으로 끝날경우 Blur 시점에 실제 value값 .삭제
      if(String(displayValue).endsWith('.')) {
        const sanitizedValue = String(displayValue).slice(0, -1)
        onChange({
          target: {
            ...fieldRenderProps,
            value: sanitizedValue,
          }
        })
      }

      const formattedValue = getFormatValue(displayValue);
      setDisplayValue(formattedValue); // 포커스가 나갔을 때만 쉼표로 표시
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
          valid={valid}
          id={id}
          disabled={disabled}
          value={displayValue}
          ariaDescribedBy={`${hintId} ${errorId}`}
          onChange={handleInputChange}  // 제한을 걸기 위한 onChange 핸들러
          onFocus={handleFocus} // 포커스 이벤트 핸들러
          onBlur={handleBlur} // 포커스 아웃 이벤트 핸들러
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
