import { PageSearchParam } from "../common/Page.type";

export interface IrregularCode extends PageSearchParam {
    code: string;
    description: string;
    asType: string;
    level: string;
    irrLevel: string;
    name: string;
    irrObject: string;
    object: string;
    irrTarget: string;
    isAlert?: boolean;
    createdAt?: Date;
    createdUserId?: string;
    updatedAt?: Date;
    updatedUserId?: string;
}

export interface IrregularCodeResponseDto {
    id: string;
    code: string;
    description: string;
    asType: string;
    level: string;
    irrLevel: string;
    name: string;
    irrObject: string;
    object: string;
    irrTarget: string;
    isAlert?: boolean;
    createdAt?: Date;
    createdUserId?: string;
    updatedAt?: Date;
    updatedUserId?: string;
}

export interface IrregularCodeSaveDto {
    code: string;
    description: string;
    asType: string;
    name: string;
    irrObject: string;
    isAlert?: boolean;
}