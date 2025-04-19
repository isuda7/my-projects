export interface NoticeDTO {
    id?: number;
    title?: string;
    description?: string;
    createdBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
    updatedBy?: number;
    showPopup?: boolean;
    name?: string;
    user?: User;
}

export interface User {
    userName?: string;
}

export interface SearchDto {
    title?: string;
    showPopup?: boolean;
    createId?: string;
    updateId?: string;
}

export interface PeriodSearchDto { 
    title?: string;
}

export interface ExcelDownloadDto extends SearchDto {
    excelMap?: string;
}


