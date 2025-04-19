import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@progress/kendo-react-animation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  setAccountVisible,
  setChangePasswordVisible,
  setCurrentPasswordVisible,
  setHistoryVisible,
} from "@/store/accountSlice.ts";
import AuthApiService from "@/utils/apiService/AuthApiService.ts";
import { LoginResponse } from "@/utils/apiService/type/auth/login.type.ts";
import { ResponseDataType } from "@/utils/apiService/type/common/responseData.type.ts";
import { persistor } from "@/store";
import useAlert from "@/hooks/useAlert";
import {closeAllPopups} from "@/store/modules/popupStore.ts";

export default function uiDroppop(props: any) {
  const showAlert = useAlert();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropMenuRef = useRef(document.createElement("div"));
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);
  const [isDropTitle] = useState<boolean>(props.title);
  let [val, setVal] = useState<string>(props.defaultvalue);

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isDropMenuOpen && !dropMenuRef.current.contains(e.target))
        setDropMenuOpen(false);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isDropMenuOpen]);

  const signOutMutation = useMutation({
    mutationFn: async () => AuthApiService().signOut(),
    onSuccess: () => {
      dispatch(closeAllPopups());
      window.localStorage.clear();
      persistor.purge().then(() => navigate("/sign-in"));
    },
  });

  const dropListClick = (e: any) => {
    setDropMenuOpen(false);
    setVal(e.currentTarget.value);
    switch (e.currentTarget.value) {
      case "a1":
        dispatch(setAccountVisible(false));
        navigate("/my-page");
        dispatch(setCurrentPasswordVisible(true));
        break;
      case "a2":
        dispatch(setAccountVisible(false));
        navigate("/pwdUpdate");
        dispatch(setChangePasswordVisible(true));
        break;
      case "a3":
        showAlert({
          title: t('common.logout'), //'로그아웃,
          message: t('common.logout_confirm'), //'로그아웃 하시겠습니까?',
          type: 'confirm',
          onConfirm: () => signOutMutation.mutate(),
        })
        break;
      default:
        break;
    }
  };

  const dropCloseClick = () => {
    setDropMenuOpen(false);
  };

  return (
    <div ref={dropMenuRef} className="droppop">
      <button
        type="button"
        value={val}
        className={`droppop-btn ${isDropMenuOpen ? "is-active" : ""}`}
        onClick={() => setDropMenuOpen(!isDropMenuOpen)}
      >
        <span>{props.text}</span>
      </button>

      <Reveal className="ani">
        {isDropMenuOpen && (
          <div className="droppop-con">
            {isDropTitle && (
              <div className="droppop-con-tit">
                <span>{props.title}</span>
                <button
                  type="button"
                  className="btn-close"
                  onClick={dropCloseClick}
                >
                  <span className="k-sr-only">close</span>
                </button>
              </div>
            )}
            <ul>
              {props.list.map((item: any, i: any) => (
                <li key={i}>
                  <button
                    type="button"
                    value={item.value}
                    onClick={dropListClick}
                  >
                    <span>{item.title}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Reveal>
    </div>
  );
}
