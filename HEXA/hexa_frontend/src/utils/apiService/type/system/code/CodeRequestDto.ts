export interface SaveCode {
    code: string;
    groupCode: string;
    codeEng: string;
    description: string;
    isUse: boolean;
    value: string;
}

export interface SaveGroupCode {
    groupCode: string;
    value: string;
    groupCodeEng: string;
    description: string;
    isUse: boolean;
}

export interface SearchCode {
    groupCodes: string[];
}

export interface SearchCodes {
    groupCode?: string;
    gcValue?: string;
    code?: string;
    value?: string;
    codeEng?: string;
    description?: string;
    isUse?: boolean;
    createdUserId?: string;
    updatedUserId?: string;
    excelMap?: string;
}

export interface SearchGroupCodes {
    groupCode: string;
    value: string;
    groupCodeEng: string;
    description: string;
    isUse: boolean;
    createdUserId: string;
    updatedUserId: string;
    excelMap?: string;
}