import Input from "@/components/kendo/form/Input";
import useAlert from "@/hooks/useAlert";
import HomeApiService from "@/utils/apiService/home/HomeApiService";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { InputChangeEvent } from "@progress/kendo-react-inputs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const RegisterPhoneModal = (props: any) => {
  const {t} = useTranslation();
  const showAlert = useAlert();
  const navigate = useNavigate()
  const { onClose } = props;
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const validatePhoneNumber = () => {
    console.log('phoneNumber', phoneNumber);
    if(phoneNumber === undefined || phoneNumber === null || phoneNumber.trim().length < 1){
      showAlert({message: t("user.enter_cellphone_alert")/*휴대폰번호를 입력해주세요*/});
      return;
    }else if(phoneNumber.trim().length < 10 || phoneNumber.trim().length > 11){
      showAlert({message: t("user.enter_correct_cellphone_alert")/*휴대폰 번호를 정확하게 입력해주세요.*/});
			return;
    }
    registerPhone(phoneNumber);
  }

  const registerPhone = async (phone: string) => {
    try {
      await HomeApiService().registerPhone(phone);
        showAlert({message: t("common.register_success"),/*등록되었습니다.*/
        onConfirm: () => { onClose(true) }
      });
      // onClose(true);
    } catch (error) {
      console.error("휴대폰 번호 등록 실패:", error);
    }
  };

  const handlePhoneChange = (e: InputChangeEvent) => {
    const inputValue = e.target.value || ""; // value가 undefined일 경우 대비
    const onlyNumbers = inputValue.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
    setPhoneNumber(onlyNumbers);
  };

  return (
    <>
      {/* 휴대폰번호 등록 안내 팝업 */}
        <Dialog title={t("home.phone_register_alert")/*휴대폰번호 등록 안내*/} onClose={onClose}>
          <div className="dialog-box pop-xs">
            <div className="content-center">
              {t("home.phone_unregistered")/*휴대폰번호가 미등록되어 있습니다.​\n앞으로 서비스를 원활하게 이용하기 위해 휴대폰번호을 등록해주세요. */}
              <div className="in-input mt1">
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  placeholder={t("user.enter_cellphone_alert")/*휴대폰번호를 입력해주세요*/}
                  onChange={handlePhoneChange}
                  maxLength={11}
                />
              </div>
            </div>
          </div>
          <DialogActionsBar>
            <Button
              size={"medium"}
              themeColor={"primary"}
              onClick={validatePhoneNumber}
            >
              저장
            </Button>
          </DialogActionsBar>
        </Dialog>
    </>
  );
};

export default RegisterPhoneModal;