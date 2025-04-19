export interface UserResponseDto {
    id: string;
    userId: string;
    userName: string;
    email: string;
    cellPhone: string;
    isActive: boolean;
    isLock: boolean;
    isMobileAccess: boolean;
    roleCodeName: string;
    roleCode: string;
    roleGroupName: string;
    roleGroupId?: string;
    createdAt?: Date;
    createdUserId?: string;
    updatedAt?: Date;
    updatedUserId?: string;
    emailId?: string | null;
    domain?: string | null;
}

export interface UserEmailDto {
    id: string;
    userId?: string;
    userName: string;
    email: string;
}