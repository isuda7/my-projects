// HEXAMOBHOM2P03 : 언어 선택

import {useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@progress/kendo-react-buttons";
import { RadioGroup, RadioButtonChangeEvent } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { LANG_LIST } from "../common/constant";

export default function LanguagePopup(props: any) {
  const { t, i18n } = useTranslation();
  const { onClose } = props;

  const [selectValue, setSelectValue] = useState<string>(i18n.language)

  const onChange = (e: any) => {
    setSelectValue(e.value)
  }

  const onClickChangeLanguage = () => {
    i18n.changeLanguage(selectValue);
    onClose?.();
  }

  return (
    <Dialog
      title={t('mobile.selection_language')} //{"언어 선택"}
      onClose={() => onClose?.()}
      className="dialog-footer"
    >
      <div className="dialog-box">
        <div className="m-radio-group">
          <RadioGroup
            className="flex-gap-0.5-2"
            layout="vertical"
            data={LANG_LIST}
            value={selectValue}
            onChange={onChange}
          />
        </div>
      </div>

      <DialogActionsBar>
        <Button 
          size={"medium"} 
          themeColor={"primary"} 
          onClick={onClickChangeLanguage}>
          {t('common.confirm')/* 확인 */}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
}
