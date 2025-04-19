import { PageSearchParam } from "../common/Page.type";

export interface Disconnection extends PageSearchParam {
    stationId: string;
    stationName: string;
    status: string;
}

export interface DisconnectionResponse {
    id: string;
    stationId: string;
    stationName: string;
    statusName: string;
    statusNameEng: string;
    statusCode: string;
    status: string;
    disconnectedTime: string;
    createdAt?: Date;
    disconnectedAt: Date;
    reconnectedAt?: Date;
}