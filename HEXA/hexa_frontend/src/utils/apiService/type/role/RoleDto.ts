import {PageSearchParam} from "@/utils/apiService/type/common/Page.type.ts";
import {Grant} from "@/utils/apiService/type/role/GrantDto.ts";

export interface RoleSearchParam extends PageSearchParam{
    roleCode: string;
    roleGroupName: string;
    roleGroupEngName: string;
    roleGroupDescription: string;
    isUse: boolean;
    createdUserId: string;
    updatedUserId: string;
}

export interface RoleSaveDto {
    roleCode: string | null;
    roleGroupName: string;
    roleGroupEngName: string;
    roleGroupDescription?: string;
    isUse: boolean;
    grantIds?: string[] | null;
}

export interface RoleResponseDto {
    id: string;
    roleCode: string;
    roleGroupName: string;
    roleGroupEngName: string;
    roleGroupDescription: string;
    isUse: boolean;
    grants?: Grant[] | null;
    createdAt?: Date;
    createdUserId?: string;
    updatedAt?: Date;
    updatedUserId?: string;
}

export interface RoleDetailDto{
    id: string;
    roleCode: string | null;
    roleCodeEng: string;
    roleCodeName: string;
    roleGroupName: string;
    roleGroupEngName: string;
    roleGroupDescription: string;
    isUse: boolean;
    grants: Grant[];
    grantIds: string[];
}

export interface RoleNameDto {
    tsid: string;
    roleCodeName: string;
}

export interface RoleEngNameDto {
    tsid: string;
    roleCodeEng: string;
}