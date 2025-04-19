import Droppop from "@/components/common/Droppop.tsx";
import Dropbox from "@/pub/components/Dropbox.tsx";
import React from "react";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "@/store";
import {userSelector} from "@/store/modules/userStore.ts";


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


export default function MainHeader() {

  const {t} = useTranslation();
  const user = useAppSelector(userSelector);
  const profileList = [
		{ value: "a1", title: t("common.my_page")/*마이 페이지*/ },
		{ value: "a2", title: t("common.change_password") /*비밀번호 변경*/ },
		{ value: "a3", title: t("common.logout") /*로그아웃*/ },
  ];

	//Dashboard 화면엔 안나오게
	const path = window.location.pathname;
	if(path === '/dashboard') return <></>

  return (
		<div className="header">
			<div className="gnb-warp">
			<div className="logo-wrap">
				<h1 className="logo">
				<span className="sr-only">KOOROO Hexa</span>
				</h1>
			</div>

			<div className="group-align-right">
				<div className="gnb-profile">
				<Droppop
					list={profileList}
					defaultvalue="a1"
					text={user.userName}
				/>
				</div>

				<div className="gnb-lang">
				<Dropbox list={langList} defaultvalue="01" text="한국어"/>
				</div>
			</div>
			</div>
		</div>
  );
}
