import {useAppSelector} from "@/store";
import {roleSelector} from "@/store/modules/userStore.ts";
import UseManualList from "./UseManualList";
import UserUseManualList from "./UserUseManualList";

export default function UseManual() {
  const role = useAppSelector(roleSelector);
  return (
    <>
      {role.roleName == '시스템 관리자(Super)' &&
      <UseManualList />
      }
      {role.roleName !== '시스템 관리자(Super)' &&
        <UserUseManualList />
      }
    </>
  );
}