import { PageSearchParam } from "../common/Page.type";

export interface NotificationDto extends PageSearchParam {
  type: string;
  name: string;
  message: string;
  isUse: boolean;
  time?: string;
  rangeStart?: string;
  rangeEnd?: string;
  channelCode?: string;
  receiverIds?: string[];
  receivers: string;
}

export interface NotificationSaveDto {
  type: string;
  name: string;
  message: string;
  isUse: boolean;
  channelCode?: string;
  time?: string;
  rangeStart?: string;
  rangeEnd?: string;
  receiverIds?: string[];
}

export interface NotificationResponse {
  id: string;
  type: string;
  typeName: string;
  name: string;
  message: string;
  isUse: boolean;
  condition?: string;
  time?: string;
  rangeStart?: string;
  rangeEnd?: string;
  receiverIds: string[];
  receiverNames?: string[];
  channelCode: string;
  channelName?: string;
  channel?: string;
  // channelCodes?: string[];
  // channelNames?: string[];
  // channels?: string[];
  createdAt?: Date;
  createdUserId?: string;
  updatedAt?: Date;
  updatedUserId?: string;
  receivers: string;
  strChannels?: string;
}

