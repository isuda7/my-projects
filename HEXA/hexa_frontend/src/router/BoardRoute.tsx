import NoticeAdd from "@/views/board/notice/NoticeAdd";
import NoticeDetail from "@/views/board/notice/NoticeDetail";
import NoticeList from "@/views/board/notice/NoticeList";
import UserNoticeDetail from "@/views/board/notice/UserNoticeDetail";
import UserNoticeList from "@/views/board/notice/UserNoticeList";
import PopupModal from "@/views/board/notice/modal/PopupModal";
import UseManualAdd from "@/views/board/useManual/UseManualAdd";
import UseManualDetail from "@/views/board/useManual/UseManualDetail";
import UseManualList from "@/views/board/useManual/UseManualList";
import UserUseManualList from "@/views/board/useManual/UserUseManualList";
import { element } from "prop-types";
import Notice from "@/views/board/notice/Notice.tsx";
import UseManual from "@/views/board/useManual/UseManual";
import { Path } from "@progress/kendo-drawing";
import NoticeDetailRole from "@/views/board/notice/NoticeDetailRole";

const BoardRouter = [
    {
        // 게시판
        path: "board",
        children: [
            {
                // 공지사항
                path: "notice",
                children: [
                    {
                        // 공지사항 목록
                        path: "",
                        element: <Notice />,
                    },
                    {
                        // 공지사항 등록
                        path: "admin/add",
                        element: <NoticeAdd />,
                    },
                    {
                        // 공지사항 상세
                        path: "detail",
                        element: <NoticeDetailRole />
                    }
                    // {
                    //     // 공지사항 상세
                    //     path: "admin/detail",
                    //     element: <NoticeDetail />,
                    // },

                    // {
                    //     path: "user/detail",
                    //     element: <UserNoticeDetail />
                    // }
                ],
            },
            {
                // 사용자 매뉴얼
                path: "use-manual",
                children: [
                    {
                        // 관리자 화면
                        path: "",
                        element: <UseManual />,
                    },
                    {
                        // 사용자 매뉴얼 등록
                        path: "admin/add",
                        element: <UseManualAdd />,
                    },
                    {
                        // 사용자 매뉴얼 상세
                        path: "admin/detail",
                        element: <UseManualDetail />,
                    }
                ]
            }
            
        ],
    },
];

export default BoardRouter;
