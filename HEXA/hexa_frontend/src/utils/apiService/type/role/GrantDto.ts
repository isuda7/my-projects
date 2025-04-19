import { MenuInfo, MenuTree } from "../system/MenuDto";

export interface Grant {
    tsid: string;
    grantType: string;
    roleStatus?: string;
    menuId: string;
    menuName: string;
    menuEngName: string;
    menuDepth: number;
    menuSort: number;
    parentMenu?: MenuInfo;
    childrenMenu: MenuTree[];
}

export interface GrantDto {
    grantId: string;
    grantType: string;
}

export interface GrantWithMenuTree {
    menuId: string;
    menuName: string;
    menuEngName: string;
    menuDepth: number;
    menuSort: number;
    menuType: string;
    parentMenu?: MenuInfo | null;
    childrenMenu: GrantWithMenuTree[];
    grants: GrantDto[];
}


