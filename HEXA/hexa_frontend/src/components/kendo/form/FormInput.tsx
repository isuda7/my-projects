import { Field, FieldWrapper } from "@progress/kendo-react-form";
import {
  defaultInput,
  inputValidator,
} from "@/components/kendo/form/FormInnerComponent.tsx";

interface InputType {
  name: string;
  validation?: boolean;
}
function FormInput({ name, validation }: InputType) {
  return (
    <FieldWrapper>
      <Field
        name={name}
        component={defaultInput}
        validator={validation ? inputValidator : undefined}
      />
    </FieldWrapper>
  );
}

FormInput.defaultProps = {
  validation: false,
};

export default FormInput;
