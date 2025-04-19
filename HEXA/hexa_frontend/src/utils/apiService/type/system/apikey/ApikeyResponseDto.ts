export interface ApikeyResponseDto{
  tsid?: number;
  systemId: string;
  systemName: string;
  apikey: string;
  password: string;
  createdAt?: Date;
	createdUserId?: string;
	updatedAt?: Date;
	updatedUserId?: string;
}