/**
 * 기존 DropDownList는 data가 object 배열일 경우 dataItemKey와 textField를 나눠서 보여주기위해
 * 설정해줘야하는것이 많음, textField를 선택했을때 dataItemKey가 반환되도록 도와주는 공통 컴포넌트 만듬
 */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DropDownList, DropDownListProps  } from '@progress/kendo-react-dropdowns';

interface CustomSelectProps extends DropDownListProps {
  data: Array<{ [key: string]: any }>; // 객체 배열
  dataItemKey?: string; // 객체의 value 값
  textField?: string; // 객체의 name 값
  value: any; // 외부에서 관리되는 값 (value 값)
  onChange: (value: any) => void; // 값 변경 시 호출될 함수
  defaultItem?: any;
  noSelectDefault?: boolean; //true일시 한번선택한 default는 다시는 선택 못하도록 조치

  validationMessage?: string;
  visited?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  data = [],
  textField = "value",
  dataItemKey = "code",
  value,
  onChange,
  defaultItem = {[dataItemKey]: null, [textField]: '선택'},
  noSelectDefault=false,

  validationMessage,
  visited,

  ...props // DropDownList에서 상속된 나머지 props를 전달받음
}) => {
  const {t} = useTranslation()
  const [selectedItem, setSelectedItem] = useState<any>(null)
  // 현재 선택된 값을 객체로 변환
  

  const handleChange = (event: any) => {
    const selectedValue = event.target.value;
    // 선택된 값의 키를 외부로 전달
    event.value = selectedValue[dataItemKey];
    onChange(event);
  };

  useEffect(() => {
    let selected = data.find(item => item[dataItemKey] === value) || null;
    if(!selected) selected = {[dataItemKey]: null, [textField]: t('common.select')};
    //if(value === null || value === undefined || value === '') selected = defaultItem;
    setSelectedItem(selected);
  }, [value, data])

  return (
    <>
      <DropDownList
        data={data}
        textField={textField} // 표시될 텍스트 필드 (원하는 필드로 설정 가능)
        dataItemKey={dataItemKey}
        value={selectedItem} // 선택된 객체
        onChange={handleChange} // 값 변경 이벤트
        defaultItem={noSelectDefault? undefined : {[dataItemKey]: null, [textField]: t('common.select')}}
        {...props}
      />
      {(visited && validationMessage) && (
        <div className="k-form-error">{validationMessage}</div>
      )}
    </> 
  );
};

export default CustomSelect;
