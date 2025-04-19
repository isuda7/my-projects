import { UploadFileInfo } from "@progress/kendo-react-upload";

export interface NoticeResponseDto {
    id?: number;  // '?'를 사용하여 선택적 필드로 표시
    title: string;
    description: string;
    showPopup: boolean;
    postStartDate: Date; // TypeScript에서 날짜 시간 객체에는 Date 타입 사용
    postEndDate: Date;
    updatedAt: Date;
    updatedUserId: string;
    createdAt: Date;
    createdUserId: string;
    isPinned: number;
    // noticeFileName: string;
    // noticeS3Path: string;
    popupCount?: number;
    noticeFileCount?: number;
    noticeFiles: UploadFileInfo[]
}
