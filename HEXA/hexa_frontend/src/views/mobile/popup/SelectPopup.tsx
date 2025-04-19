import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@progress/kendo-react-buttons";
import { RadioGroup, RadioGroupChangeEvent } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

export default function SelectPopup(props: any) {
  const {t} = useTranslation()

  const { onClose, modalData, setValue } = props;
  const { key, data, value, title=t('common.select') } = modalData;

  const [selectValue, setSelectValue] = useState<string>(value)

  const onChange = (e: RadioGroupChangeEvent) => {
    setSelectValue(e.value)
  }

  /**
   * data에서 현재 selectValue와 value가 맞는 object를 찾아 setValue에 반환
   */
  const setValueAndClose = () => {
    const obj = data.find((v: any) => v.value === selectValue);
    setValue?.(obj, key);
    onClose?.();
  }

  return (
    <Dialog
      title={title}
      onClose={() => onClose?.()}
      className="dialog-footer"
    >
      <div className="dialog-box">
        <div className="m-radio-group">
          <RadioGroup
            className="flex-gap-0.5-2"
            data={data}
            value={selectValue}
            onChange={onChange}
          />
        </div>
      </div>

      <DialogActionsBar>
        <Button
          size={"medium"}
          themeColor={"primary"}
          onClick={() => setValueAndClose()}
        >
          {t('common.confirm')/* 확인 */}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
}
