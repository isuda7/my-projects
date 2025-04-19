import { Input } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";

export const inputValidator = (value: any) =>
  value ? "" : "This field is required.";
export const defaultInput = (fieldRenderProps: any) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;

  return (
    <div className="k-form-field-wrap">
      <Input {...others} labelClassName="k-form-label" />
      {visited && validationMessage && !others.value && (
        <Error>{validationMessage}</Error>
      )}
    </div>
  );
};
