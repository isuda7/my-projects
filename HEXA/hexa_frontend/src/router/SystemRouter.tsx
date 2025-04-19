import { Navigate } from "react-router-dom";
import UserList from "@/views/system/user/UserList.tsx";
import UserAdd from "@/views/system/user/UserAdd.tsx";
import UserDetail from "@/views/system/user/UserDetail.tsx";
import RoleList from "@/views/system/role/RoleList";
import RoleAdd from "@/views/system/role/RoleAdd";
import RoleDetail from "@/views/system/role/RoleDetail";
import CodeInfoList from "@/views/system/code/CodeInfoList";
import CodeInfoAdd from "@/views/system/code/CodeInfoAdd";
import CodeinfoDetail from "@/views/system/code/CodeInfoDetail";
import GroupCodeInfoList from "@/views/system/code/GroupCodeInfoList";
import GroupCodeInfoAdd from "@/views/system/code/GroupCodeInfoAdd";
import GroupCodeinfoDetail from "@/views/system/code/GroupCodeInfoDetail";
import NotificationList from "@/views/system/notification/NotificationList";
import ApikeyList from "@/views/system/api-key/ApikeyList";
import ApikeyAdd from "@/views/system/api-key/ApikeyAdd";
import ApikeyDetail from "@/views/system/api-key/ApikeyDetail";
import NotificationAdd from "@/views/system/notification/NotificationAdd";
import NotificationDetail from "@/views/system/notification/NotificationDetail";
import MenuManage from "@/views/system/menu/MenuManage";
import LoginHistory from "@/views/system/access-log/LoginHistory";
import MenuAccessHistory from "@/views/system/access-log/MenuAccessHistory";
import PrivacyHistory from "@/views/system/access-log/PrivacyHistory";

const SystemRouter = [
	{
		path: "system",
		children: [
			{// 사용자 관리
				path: "user",
				children: [
					{
						path: "",
						element: <UserList />,
					},
					{ // 사용자 등록
						path: "add",
						element: <UserAdd />,
					},
					{ // 사용자 상세
						path: "detail",
						element: <UserDetail />,
					}
				]
			},
			{// 권한 관리
				path: "role",
				children: [
					{
						path: "",
						element: <RoleList />,
					},
					{ // 권한 등록
						path: "add",
						element: <RoleAdd />,
					},
					{ // 권한 상세
						path: "detail",
						element: <RoleDetail />,
					}
				]
			},
			{// 메뉴 관리
				path: "menu",
				element: <MenuManage />,
			},
			{// 알림 관리
				path: "notification",
				children: [
					{
						path: "",
						element: <NotificationList />,
					},
					{ // 알림 등록
						path: "add",
						element: <NotificationAdd />,
					},
					{ // 권한 상세
						path: "detail",
						element: <NotificationDetail />,
					}
				]
			},
			{
				path: "test",
				element: <Navigate to="user" replace />,
			},
			{
				// 코드 정보 관리
				path: "code",
				children: [
					{
						// 공통 코드 목록
						path: "common",
						element: <CodeInfoList />,
					},
					{
						// 공통 코드 추가
						path: "common/add",
						element: <CodeInfoAdd />,
					},
					{
						// 공통 코드 상세
						path: "common/detail",
						element: <CodeinfoDetail />,
					},
					{
						// 그룹 코드 목록
						path: "group",
						element: <GroupCodeInfoList />,
					},
					{
						// 그룹 코드 추가
						path: "group/add",
						element: <GroupCodeInfoAdd />,
					},
					{
						// 그룹 코드 상세
						path: "group/detail",
						element: <GroupCodeinfoDetail />,
					},
				],
			},
			{
				// API-key 관리
				path: "api-key",
				children: [
					{
						// API key 목록
						path: "",
						element: <ApikeyList />,
					},
					{
						// API key 등록
						path: "add",
						element: <ApikeyAdd />
					},
					{
						// API key 상세
						path: "detail",
						element: <ApikeyDetail />
					},
				],
			},
			{
				// 접속 로그 관리
				path: "access-log",
				children: [
					{
						// 로그인 이력
						path: "login-history",
						element: <LoginHistory />,
					},
					{
						// 메뉴 사용 이력
						path: "menu-history",
						element: <MenuAccessHistory />,
					},
					{
						// 개인정보처리 이력
						path: "privacy-history",
						element: <PrivacyHistory />,
					},
				],
			}

		],
	},
];

export default SystemRouter;
