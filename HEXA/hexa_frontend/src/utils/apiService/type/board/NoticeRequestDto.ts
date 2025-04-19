export interface NoticeRequestDto {
    isPinned: number;
    postStartDate: Date;
    postEndDate: Date;
    title: string;
    description: string;
    showPopup: boolean;
    fileIds: string[];
    noticeFiles: File[];
}
