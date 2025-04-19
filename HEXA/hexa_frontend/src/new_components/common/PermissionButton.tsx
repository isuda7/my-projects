/**
 * 사용자의 권한에 따라 보여지는 버튼
 * 기본은 저장버튼이며 기본타입은 submit이다
 */

/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

/* Common */
import {flattenMenu} from "@/utils/common.ts";
import {menuSelector} from "@/store/modules/userStore.ts";
import {Menu} from "@/utils/apiService/type/auth/menu.type.ts";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";


export default function PermissionButton(props: any) {
  const {t} = useTranslation();

  const {
    type="submit",
    title=t('common.save'),
    size="large",
    themeColor="primary",
    pageId = false, //URL경로에 상세아이디가있는경우 true로 처리
    onClick = undefined
  } = props;

  let path = window.location.pathname;
  if(pageId) {
    path = path.replace(/\/[^/]+$/, ""); // 마지막 경로만 제거
  }
  const menuList = useSelector(menuSelector);

  const flatMenuList = flattenMenu(menuList);
  const thisMenu = flatMenuList.find((menu: Menu) => menu.url === path);
  const menuGrantType = thisMenu?.grantType;

  const pemissionFlag = menuGrantType?.find((v: any) => v === 'CREATE')? true : false;

  return (
    <>
      {
        pemissionFlag?
        <Button
          type={type}
          size={size} 
          themeColor={themeColor}
          onClick={onClick}
        >
          {title}
        </Button>
        :
        <></>
      }
    </>
  );
}
