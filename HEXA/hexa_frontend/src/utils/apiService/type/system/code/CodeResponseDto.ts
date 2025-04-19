export interface CodeResponseDto {
    code: string;
    groupCode: string;
    codeEng: string;
    description: string;
    isUse: boolean;
    value: string;
    gcValue: string;
    createdAt: Date;
    createdUserId: string;
    updateAt: Date;
    updatedUserId: string;
}

export interface GroupCodeResponseDto {
    groupCode: string;
    value: string;
    groupCodeEng: string;
    description: string;
    isUse: boolean;
    createdAt: Date;
    createdUserId: string;
    updatedAt: Date;
    updatedUserId: string;
}

// export interface GroupCommonCodeDto {
//     code: string;
//     groupCode: string;
//     codeEng: string;
//     cDescription: string;
//     cIsUse: boolean;
//     cValue: string;
//     cCreatedAt: Date;
//     cCreatedUserId: string;
//     cUpdatedAt: Date;
//     cUpdatedUserId: string;
//     gDescription: string;
//     gIsUse: boolean;
//     gValue: string;
//     gcCreatedAt: Date;
//     gcCreatedUserId: string;
//     gcUpdatedAt: Date;
//     gcUpdatedUserId: string;
// }

export interface CodeValueDto {
    code: string;
    value: string;
}

export interface GroupCodeValueDto {
    // groupCode: string;
    value: string;
}