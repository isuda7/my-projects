import { PageSearchParam } from "../../common/Page.type";

export interface PrivacyHist extends PageSearchParam {
  userId: string;
  // depth1MenuId: number;
	// depth2MenuId: number;
  type: string;
  downloadReason: string;
}

export interface PrivacyHistResponse {
  userId: string;
  createdAt?: Date;
  path: string;
  engPath: string;
  // depth1Menu: string;
	// depth2Menu: string;
  type: string;
  downloadReason: string;
}