import { PageSearchParam } from "../common/Page.type";

export interface BatteryDiagnosis extends PageSearchParam {
    genCode: string;
    batteryId: string;
    stationId: string;
    stationName: string;
    status: string;
    code: string;
    codeName: string;
    codeLevel: string;
    handleDetail: string;
    handledAt?: Date;
    createdAt?: Date;
    chassisNum: number;
    slotNum: number;
    excelMap?: string;
}

export interface BatteryDiagnosisRequest {
    genCode: string;
    batteryId: string;
    stationId: string;
    stationName: string;
    status: string;
    code: string;
    codeName: string;
    codeLevel: string;
    handleDetail: string;
    handledAt?: Date;
    createdAt?: Date;
    chassisNum: number;
    slotNum: number;
    excelMap?: string;
}

export interface BatteryDiagnosisResponse {
    genCode: string;
    batteryId: string;
    stationId: string;
    stationName: string;
    status: string;
    code: string;
    codeName: string;
    codeLevel: string;
    chassisNum: number;
    slotNum: number;
    handleDetail: string;
    handledAt?: Date;
    createdAt?: Date;
    totalCountByStatus?: number;
}
