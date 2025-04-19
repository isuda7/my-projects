import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import { isAdmin } from "@/utils/common";
import NoticeDetail from "./NoticeDetail";
import UserNoticeDetail from "./UserNoticeDetail";
import { useLocation, useParams } from "react-router-dom";

export default function NoticeDetailRole() {
  const { state } = useLocation();
  console.log('detail페이지 거쳐가는 곳 state :', state);
  const role = useAppSelector(roleSelector);
  return (
    <>
      {isAdmin(role.roleCode) &&
      <NoticeDetail id={state?.id}/>
      }
      {!isAdmin(role.roleCode) &&
        <UserNoticeDetail id={state?.id}/>
      }
    </>
  );
}