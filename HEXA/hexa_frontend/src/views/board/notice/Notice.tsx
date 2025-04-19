import NoticeList from "@/views/board/notice/NoticeList.tsx";
import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import UserNoticeList from "@/views/board/notice/UserNoticeList.tsx";
import { isAdmin } from "@/utils/common";

export default function Notice() {
  const role = useAppSelector(roleSelector);
  return (
    <>
      {isAdmin(role.roleCode) &&
      <NoticeList />
      }
      {!isAdmin(role.roleCode) &&
        <UserNoticeList />
      }
    </>
  );
}