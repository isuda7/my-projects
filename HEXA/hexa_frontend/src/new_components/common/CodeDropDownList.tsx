import { DropDownList, DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";

type Props = {
	name: string;
	codeGroup?: string;
	onChange?: any;
	value?: string;
	// defaultValue?: string;
};
type Code = {
	code: string;
	groupCode: string;
	description: string;
	value: string;
}
const CodeDropDownList = ({ value, onChange, ...others }: Props) => {
	const [codeList, setCodeList] = useState<Code[]>([]);

	const codeMutation = useMutation(
		{
			mutationFn: async () =>
				CodeApiService().getCodes({
					groupCode: others.codeGroup
				}),
			onSuccess: (response: Code[]) => {
				setCodeList(response);
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	// const changeHandler = (e:DropDownListChangeEvent) => {
	//     const code = e.target.value as Code;
	//     e.syntheticEvent
	//     console.log(code);
	//     // if (props.onChange) {
	//     //     props.onChange(e); // 부모 컴포넌트에서 onChange를 제공하는 경우 호출
	//     // }
	// }

	useEffect(() => {
		codeMutation.mutate();

	}, []);


	const handleChange = (event: DropDownListChangeEvent) => {
		onChange({
			value: event.target.value.code,
			syntheticEvent: event.syntheticEvent,
		});
	};

	return (
		<DropDownList
			{...others}
			data={codeList}
			textField="value"
			dataItemKey="code"
			value={codeList.find(item => item.code === value) || null}
			onChange={handleChange}
		/>
	);
}

export default CodeDropDownList;

