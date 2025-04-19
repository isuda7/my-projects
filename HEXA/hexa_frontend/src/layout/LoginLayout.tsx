import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Menu} from "@/utils/apiService/type/auth/menu.type.ts";
import {authSelector, isSignedInSelector, menuSelector} from "@/store/modules/userStore.ts";
import _ from 'lodash';

import Dropbox from "@/pub/components/Dropbox.tsx";
import Droppop from "@/components/common/Droppop.tsx";
import Footer from "@/components/common/Footer.tsx";
import MainHeader from "@/new_components/common/MainHeader.tsx";
import {GridHeader} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import MenuAccessApiService from "@/utils/apiService/menu/MenuAccessApiService.ts";
import {Link} from "react-router-dom";


const langList = [
  {
    value: "ko",
    title: "한국어",
  },
  {
    value: "en",
    title: "English",
  },
];
export default function LoginLayout() {
  const navigate = useNavigate();

  return (
    <div className="wrap-login">
      <div className="login-header">
        <Link to={"/"}>
          <div className="header-logo">
            <span className="sr-only">KooRoo Hexa</span>
          </div>
        </Link>
        <div className="header-lang">
          <Dropbox list={langList} />
          {/* <Dropbox list={langList} defaultvalue="ko" text="한국어"/> */}
        </div>
      </div>

      <div className="login-body">
        <div className="login-visual">
          <div className="visual-img-bg"></div>
          <div className="visual-txt">
            Battery <br/> Switches
          </div>
          <div className="visual-img">
            <img src="/images/imgs_login_visual.png" alt="battery"/>
          </div>
          <div className="visual-txt-s">
            Integrated Control System for <br/>
            Next Generation Battery Switches
          </div>
        </div>

        <Outlet/>
      </div>
      <div className="login-footer">
        <div className="footer-logo">
          <span className="sr-only">KooRoo</span>
        </div>
        <div className="footer-copy">
          Copyright ⓒ 2025 LG Energy Solution. All right reserved.
        </div>
      </div>
    </div>
  );
}
