import {PageSearchParam} from "@/utils/apiService/type/common/Page.type.ts";

export interface UserSearchParam extends PageSearchParam{
  userId: string;
  userName: string;
  email: string;
  cellPhone: string;
  isActive: boolean;
  isLock: boolean;
  isMobileAccess: boolean;
  createdUserId: string;
  updatedUserId: string;
  roleGroupId: string;
  roleGroupName: string;
}

export interface UserActiveSearchParam extends PageSearchParam{
  userId: string;
  userName: string;
  email: string;
  cellPhone: string;
  roleGroupId: string;
  roleGroupName: string;
}

export interface UserCreateDto {
  userId: string;
  userName: string;
  email?: string | null;
  cellPhone: string;
  isActive: boolean;
  isMobileAccess: boolean;
  roleGroupId?: string;
  roleCodeName: string;
  emailId?: string | null;
  domain?: string | null;
}

export interface UserUpdateDto {
  userName: string;
  email?: string | null;
  cellPhone: string;
  isActive: boolean;
  isMobileAccess: boolean;
  roleGroupId: string;
  roleCodeName: string;
  emailId?: string | null;
  domain?: string | null;
}

export interface UserUnlockDto {
  isLock: boolean;
}

