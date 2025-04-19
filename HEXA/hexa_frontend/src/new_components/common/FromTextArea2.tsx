import { useEffect, useState } from "react";
import { TextArea } from "@progress/kendo-react-inputs";
import { FieldWrapper } from "@progress/kendo-react-form";

interface TextAreaType {
	name: string;
	rows?: number;
	maxLength?: any;
	placeholder?: string;
	onChange?: any;
	value: string;
}


const FormTextArea2 = ({ name, rows = 5, maxLength = 1000, placeholder = "", value = "", ...props }: TextAreaType) => {
	const [countText, setCountText] = useState<number>(0);
	const [textAreaValue, setTextAreaValue] = useState<string>(value || '');

	const changeHandler = (e: any) => {
		const value = e.target.value
		setCountText(value.length);
		setTextAreaValue(value);
		if (props.onChange) {
			props.onChange(e); // 부모 컴포넌트에서 onChange를 제공하는 경우 호출
		}
	}

	useEffect(() => {
		setTextAreaValue(value);
		setCountText(value.length);
	}, [value]);

	return (
		<>
			<TextArea
				{...props}
				name={name}
				rows={rows}
				maxLength={maxLength}
				placeholder={placeholder}
				value={textAreaValue}
				onChange={changeHandler}
			/>
		</>
	)
}


export default FormTextArea2;
