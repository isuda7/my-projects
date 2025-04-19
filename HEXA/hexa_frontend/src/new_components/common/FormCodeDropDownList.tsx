import {DropDownList, DropDownListChangeEvent} from "@progress/kendo-react-dropdowns";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import CodeApiService from "@/utils/apiService/CodeApiService.ts";
import {FieldWrapper} from "@progress/kendo-react-form";

type Props = {
  name: string;
  codeGroup?: string;
  codeGroupList?: string[];
  onChange?: any;
  value?: string;
  validationMessage?: string;
  visited?: boolean;
  defaultValue?: string;
  disabled?: boolean;
};
type Code = {
  code: string | boolean;
  groupCode?: string;
  description?: string;
  value: string;
}
const FormCodeDropDownList = ({value, onChange, validationMessage, visited, defaultValue, ...others}: Props) => {
  const [codeList, setCodeList] = useState<Code[]>([]);
  const triggerChangeEvent = (newValue: string | boolean) => {
    onChange({
      value: newValue,
      syntheticEvent: new Event('change'),
    });
  };
  // const codeMutation = useMutation(
  // 	{
  // 		mutationFn: async () => {
  // 			if(!others.codeGroup) return;
  // 			return CodeApiService().getCodesByGroupCode({
  // 				groupCode: others.codeGroup
  // 			})
  // 		},
  // 		onSuccess: (response: any) => {
  // 			setCodeList(response.data);
  // 		},
  // 		onError: (error) => {
  // 			console.log(error);
  // 		},
  // 	}
  // );

  // const changeHandler = (e:DropDownListChangeEvent) => {
  //     const code = e.target.value as Code;
  //     e.syntheticEvent
  //     console.log(code);
  //     // if (props.onChange) {
  //     //     props.onChange(e); // 부모 컴포넌트에서 onChange를 제공하는 경우 호출
  //     // }
  // }

  useEffect(() => {
    if (others.codeGroup === 'boolean') {
      setCodeList([
        {code: true, value: 'Y'},
        {code: false, value: 'N'},
      ])
    } else {
      // codeMutation.mutate();
      const getCodeList = async (groupCode: any) => {
        const response = await CodeApiService().getCodesByGroupCode({
          groupCode: groupCode
        });
        setCodeList(response.data);

      };

      const getCodeByGroupCodeList = async (groupCodes: GroupCodes) => {
        const response = await CodeApiService().getCodesByGroupCodeList({groupCodes: groupCodes});
        setCodeList(response.data);
      }
      if (others?.codeGroupList) {
        getCodeByGroupCodeList(others.codeGroupList);
      } else {
        getCodeList(others.codeGroup);
      }
    }
  }, [others.codeGroupList]);

  useEffect(() => {
    if (defaultValue) {
      triggerChangeEvent(defaultValue);
    }
  }, [codeList]);


  const handleChange = (event: DropDownListChangeEvent) => {
    onChange({
      value: event.target.value.code,
      syntheticEvent: event.syntheticEvent,
    });
  };

  return (
    <FieldWrapper>
      {codeList.length > 0 && (<DropDownList
          {...others}
          data={codeList}
          textField="value"
          dataItemKey="code"
          value={codeList.find(item => item.code === value) || defaultValue}
          onChange={handleChange}
          disabled={others.disabled || false}
        />
      )}
      {visited && validationMessage && (
        <div className="k-form-error">{validationMessage}</div>
      )}
    </FieldWrapper>
  );
}

export default FormCodeDropDownList;

