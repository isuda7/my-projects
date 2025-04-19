import { UploadFileInfo } from "@progress/kendo-react-upload";

export interface UseManualResponseDto {
    id: number;
    title: string;
    category: string;
    updatedAt: Date;
    updatedUserId: string;
    isUsed: boolean;
    createdAt: Date;
    createdUserId: string;
    file: UploadFileInfo[];
}