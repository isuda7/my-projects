import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "@/views/auth/SignIn.tsx";
import PublisherRoute from "@/router/PublisherRoute.tsx";
import NotFoundComponent from "@/views/NotFoundComponent.tsx";
import BatteryRoute from "@/router/BatteryRoute.tsx";
import BssRouter from "@/router/BssRouter.tsx";
import DashboardRouter from "@/router/DashboardRouter.tsx";
import FailureRouter from "@/router/FailureRouter.tsx";
import SystemRouter from "@/router/SystemRouter.tsx";
import SampleRoute from "./SampleRoute";
import Mypage from "@/views/auth/MyPage.tsx";
import BoardRouter from "./BoardRoute";
import PopupModal from "@/views/board/notice/modal/PopupModal";
import Home from "@/views/home/Home";
import Dashboard from "@/views/dashboard/Dashboard.tsx";
import DefaultLayout from "@/layout/DefaultLayout";
import MobileLogin from "@/views/mobile/auth/MobileLogin";
import MobileAuth from "@/views/mobile/auth/MobileAuth";
import MobileDashboard from "@/views/mobile/dashboard/MobileDashboard";
import MobileStationList from "@/views/mobile/dashboard/MobileStationList";
import MobileStationDetail from "@/views/mobile/dashboard/MobileStationDetail";
import PwdUpdate from "@/views/auth/PwdUpdate";
import NewPwd from "@/views/auth/NewPwd.tsx";
import UserAuth from "@/views/auth/UserAuth.tsx";
import { isMobile } from 'react-device-detect';

//const MainLayout = lazy(() => import("@/layout/MainLayout.tsx"));
const MainLayout = lazy(() => import("@/layout/MainLayout.tsx"));
const PopupLayout = lazy(() => import("@/layout/PopupLayout.tsx"));
const MobileLayout = lazy(() => import("@/layout/MobileLayout.tsx"));
const LoginLayout = lazy(() => import("@/layout/LoginLayout.tsx"));


const router = isMobile ? [
    {
  path: "/",
  element: (
      <Suspense>
        <MobileLayout />
      </Suspense>
  ),
  name: "모바일",
  children: [
    {
      // 모바일 로그인
      path: "login",
      element: <MobileLogin />,
    },
    {
      // 모바일 로그인
      path: "auth",
      element: <MobileAuth />,
    },
    {
      // 모바일 홈(대시보드)
      path: "dashboard",
      element: <MobileDashboard />,
    },
    {
      // 스테이션
      path: "dashboard/station",
      element: <MobileStationList />,
    },
    {
      // 스테이션
      path: "dashboard/station/detail/:id",
      element: <MobileStationDetail />,
    },
    {
      path: "*",
      element: <NotFoundComponent />,
    },
  ],
}
] :[
  {
    path: "/",
    element: <DefaultLayout />,
    name: "메인",
  },{
    path: "/",
    element: (
      <Suspense>
        <LoginLayout />
      </Suspense>
    ),
    name: "메인",
    children: [
      {
        path: "/sign-in",
        element: <SignIn/>,
        name: "로그인",
      },
      {
        path: "/user-auth",
        element: <UserAuth/>,
      },
      {
        path: "/new-password",
        element: <NewPwd/>,
      },
    ]
  },

  {
    path: "/",
    element: (
      <Suspense>
        <MainLayout />
      </Suspense>
    ),
    name: "메인",
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "my-page",
        element: <Mypage />,
      },
      {
        path: "pwdUpdate",
        element: <PwdUpdate />,
      },
      ...BssRouter,
      ...BatteryRoute,
      ...FailureRouter,
      ...BoardRouter,
      ...SystemRouter,
      ...SampleRoute,
      {
        path: "dashboard",
        element: <Dashboard />,

        // children: [
        //     {
        //         path: "",
        //         element: <HEXAADMHOM2S01 />,
        //     },
        // ],
      },
      {
        path: "*",
        element: <NotFoundComponent />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense>
        <PopupLayout />
      </Suspense>
    ),
    name: "팝업",
    children: [
      ...DashboardRouter,
      {
        // 공지사항 팝업
        path: "board/notice/popup",
        element: <PopupModal />,
      },
      // {
      // 	path: "my-account",
      // 	element: <MyAccount />,
      // },
      // ...BssRouter,
      // ...BatteryRoute,
      // ...DashboardRouter,
      // ...FailureRouter,
      // ...NoticeRouter,
      // ...SystemRouter,
      // ...AlertRoute,
      // ...SampleRoute,
      {
        path: "*",
        element: <NotFoundComponent />,
      },
    ],
  },

  ...PublisherRoute,
];

const mainRoute = createBrowserRouter(router);

export default mainRoute;
