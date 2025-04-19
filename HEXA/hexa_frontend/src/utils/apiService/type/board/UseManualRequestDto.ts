export interface UseManualRequestDto {
    title: string;
    isUsed: string;
    category: string;
    usFile: File;
}

export interface SearchManual {
    title: string;
    category: string;
    updatedUserId: string;
    createdUserId: string;
}

export interface SearchUsingManual {
    title: string;
    isUsed: boolean;
    category: string;
}