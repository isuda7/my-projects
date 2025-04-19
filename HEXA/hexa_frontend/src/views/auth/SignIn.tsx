import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {useDispatch} from "react-redux";
import {Form, FormElement} from "@progress/kendo-react-form";
import {setUserInfomation} from "@/store/authSlice.ts";
import AuthApiService from "@/utils/apiService/AuthApiService.ts";
import useAlert from "@/hooks/useAlert.tsx";
import LoginField from "@/new_components/auth/LoginField.tsx";
import LoginButtons from "@/new_components/auth/LoginButtons.tsx";
import {setLogin} from "@/store/modules/userStore.ts";
import {useTranslation} from "react-i18next";

export interface LoginState {
  auth: {
    accessToken: string;
    userId: string;
    region: string;
  };
}

export function SignIn() {
  const {t} = useTranslation();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [saveId, setSaveId] = useState<boolean>(true);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showAlert = useAlert();

  const signInMutation = useMutation({
    mutationFn: async () =>
      AuthApiService().signin({
        userId,
        password: password,
      }),
    onSuccess: (response) => {
      const data = response.data;
      if (data != null) {
        dispatch(setLogin(data));
        dispatch(setUserInfomation(userId));
        window.localStorage.setItem("signIn", "true");
        navigate(`/`);
      }
    },
    onError: (error) => {
      setPassword('');
      setAlertMessage(error.data?.message);
      setIsShowAlert(true);
      // showAlert({
      //   message: error.data?.message,
      // })
    },
  });

  const loginSummit = useCallback(() => {

    if (saveId) {
      document.cookie = `id=${userId}`;
    } else {
      document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    signInMutation.mutate();
  }, [userId, signInMutation, showAlert]);

  const handleLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    loginSummit();
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") {
        loginSummit();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [loginSummit]);

  const LoginFieldProps = {
    userId,
    setUserId,
    password,
    setPassword,
    isShowAlert,
    alertMessage
  };

  useEffect(() => {
    const cookieSavedId = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`id=`))
      ?.split("=")[1];
    if (cookieSavedId) {
      setUserId(cookieSavedId);
    }
  }, []);

  return (
    <div className="login-box">
      <h2 className="h2">Login</h2>
      <div>
        <Form
          render={() => (
            <FormElement>
              <LoginField {...LoginFieldProps} />
              <LoginButtons handleLoginClick={handleLoginClick} setSaveId={setSaveId}/>
            </FormElement>

          )}
        />
      </div>
    </div>
  );
}

export default SignIn;
