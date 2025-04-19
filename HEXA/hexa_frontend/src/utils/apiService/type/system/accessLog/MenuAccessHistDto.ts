import { PageSearchParam } from "../../common/Page.type";

export interface AccessHist extends PageSearchParam {
	userId: string;
	menuUrl: string;
	// depth1MenuId: number;
	// depth2MenuId: number;
	// depth3MenuId: number;
}

export interface AccessHistResponse {
	userId: string;
	menuUrl: string;
	path: string;
	engPath: string;
	// depth1Menu: string;
	// depth2Menu: string;
	// depth3Menu: string;
	createdAt?: Date;
}
