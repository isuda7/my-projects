import { Field, FieldWrapper } from "@progress/kendo-react-form";
import { requiredValidator } from "@/utils/Validators.ts";
import Input from "@/components/kendo/form/Input.tsx";

interface InputType {
	name: string;
	component?: any;
	validator?: any;
	validation?: boolean;
	placeholder?: string;
	disabled?: boolean;
}
function FormInput({ name, validator, validation, component, placeholder, disabled }: InputType) {
	const validatorArr: any = [requiredValidator];
	validator && validatorArr.push(validator);
	return (
		<FieldWrapper>
			<Field
				name={name}
				component={component ?? Input}
				validator={validation ? validatorArr : undefined}
				placeholder={placeholder}
				disabled={disabled ?? false}
			/>
		</FieldWrapper>
	);
}

FormInput.defaultProps = {
	validation: false,
};

export default FormInput;
