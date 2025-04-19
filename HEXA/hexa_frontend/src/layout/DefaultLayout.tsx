import {useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { authSelector, isSignedInSelector } from "@/store/modules/userStore.ts";
import _ from 'lodash';

import { isMobile } from 'react-device-detect';

export default function DefaultLayout() {
  const navigate = useNavigate();

  const auth = useSelector(authSelector);
  const isSignedIn = useSelector(isSignedInSelector);

  useEffect(() => {

    const signInLocal = window.localStorage.getItem("signIn");

    if (!isSignedIn || signInLocal != "true") {
        navigate("/sign-in");
    } 
    else {
      if(window.location.pathname == "/"){
          navigate("/home");
      }
    }
  }, [auth]);
  return (
    <></>
  );
}
