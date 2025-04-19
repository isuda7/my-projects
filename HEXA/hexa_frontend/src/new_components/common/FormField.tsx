
import { memo, useMemo } from "react";

import { Field, FieldWrapper, FieldRenderProps } from "@progress/kendo-react-form";
import { requiredValidator } from "@/utils/Validators.ts";
import Input from "@/components/kendo/form/Input.tsx";

const FormField = (props: any) => {
	const { 
		component,
		validator, 
		validation,
		wrapperStyle,
		require = true,
		...others
	} = props;


	// validator 배열을 메모이제이션
	const validatorArr = useMemo(() => {
		const validators = require ? [requiredValidator] : [];
		if (validator) validators.push(validator);
		return validators;
	}, [require, validator]);

	// const validatorArr: any = require? [requiredValidator] : [];
	// validator && validatorArr.push(validator);

	//const defaultStyle = {width: '100%'};

	// wrapperStyle을 메모이제이션
	const style = useMemo(() => wrapperStyle ?? { width: '100%' }, [wrapperStyle]);

	return (
		<FieldWrapper style={style}>
			<Field
				component={component ?? Input}
				validator={validation ? validatorArr : undefined}
				{...others}
			/>
		</FieldWrapper>
	);
}

export default memo(FormField);
