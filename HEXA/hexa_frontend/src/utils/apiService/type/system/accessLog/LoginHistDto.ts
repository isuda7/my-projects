import { PageSearchParam } from "../../common/Page.type";

export interface LoginHist extends PageSearchParam {
	loginUserId: string;
	ipAddress: string;
  userAgent: string;
}

export interface LoginHistResponse {
	loginUserId: string;
	ipAddress: string;
  userAgent: string;
  loginAt: Date;
  logoutAt: Date;
  accessTime: string;
}
