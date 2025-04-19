import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";

export default function LabelInput(fieldRenderProps: FieldRenderProps) {
  const { validationMessage, visited, label, id, valid, ...others } =
    fieldRenderProps;
  // const showValidationMessage: string | false | null =
  //   visited && validationMessage;
  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid}>
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <Input valid={valid} type="text" id={id} {...others} />
        {/* {!showValidationMessage && ( */}
        {/*   <Hint>Enter your personal email address.</Hint> */}
        {/* )} */}
        {/* {showValidationMessage && <Error>{validationMessage}</Error>} */}
      </div>
    </FieldWrapper>
  );
}
