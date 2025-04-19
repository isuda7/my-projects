import { NumericTextBox, NumericTextBoxChangeEvent } from "@progress/kendo-react-inputs";
import { FieldWrapper, FieldRenderProps } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";

const FormNumericTextBox = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    spinners = false,
    ...others
  } = fieldRenderProps;

  const showValidationMessage: string | false | null =
    touched && validationMessage;
  const showHint: boolean = !showValidationMessage && hint;
  const hintId: string = showHint ? `${id}_hint` : "";
  const errorId: string = showValidationMessage ? `${id}_error` : "";

  // const handleChange = (e: NumericTextBoxChangeEvent) => {
  //   console.log('onChange', e)
  //   if(e.value) {
  //     const [integerPart, fractionPart] = String(e.value).split('.')
  //     if(integerPart && integerPart > maxIntegerLength) return;
  //     if(fractionPart && fractionPart > maxFractionLength) {
  //       return false;
  //     }
  //   }

  //   onChange(e);
  // }

  return (
    <FieldWrapper style={{width: '100%'}}>
      <Label
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        className="k-form-label"
      >
        {label}
      </Label>
      <div className={"k-form-field-wrap"}>
        <NumericTextBox
          ariaDescribedBy={`${hintId} ${errorId}`}
          valid={valid}
          id={id}
          disabled={disabled}
          {...others}
          spinners={spinners}
        />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && (
          <Error id={errorId}>{validationMessage}</Error>
        )}
      </div>
    </FieldWrapper>
  );
};

export default FormNumericTextBox