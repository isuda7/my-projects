
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

/* Common */
import AuthApiService from "@/utils/apiService/AuthApiService.ts";
import {persistor} from "@/store";

export default function LogoutPopup(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { onClose } = props;

  const signOutMutation = useMutation({
    mutationFn: async () =>
      AuthApiService().signOut(),
    onSuccess: () => {
      window.localStorage.clear();
      persistor.purge().then(() => navigate("/login"));
    }
  });

  const logout = () => {
    signOutMutation.mutate();
  }

  return (
    <Dialog
      title={t('common.logout')} //{"로그아웃"}
      onClose={() => onClose?.()}
      className="dialog-mobile"
    >
      <div className="dialog-box">
        <p className="txt-center">
          {/* 로그아웃 하시겠습니까? */}
          {t('common.logout_confirm')}
        </p>
      </div>

      <DialogActionsBar>
        <Button size={"medium"} fillMode="outline" onClick={() => onClose?.()}>
          {t('common.cancel') /* 취소 */}
        </Button>
        <Button size={"medium"} themeColor={"primary"} onClick={logout}>
          {t('common.confirm') /* 확인 */}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
}
