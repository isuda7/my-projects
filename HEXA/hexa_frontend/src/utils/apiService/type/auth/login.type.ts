import {Menu} from "@/utils/apiService/type/auth/menu.type.ts";

export type LoginParams = {
    userId: string;
    password: string;
}

export type CheckPwdParams = {
    password: string;
}

export type LoginResponse = {
    "accessToken": string;
    "refreshToken": string;
    "menu": Menu[]
}
