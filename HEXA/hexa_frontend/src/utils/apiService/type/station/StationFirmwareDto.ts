export interface StationFirmwareDto {
	tsid?: string;
	fwGenerationCode: string;
	fwTypeCode: string;
	fwVersion?: string;
	fwFileName: string;
	fwFilePath: string;
	isUse: boolean;
	description?: string;
	createdAt?: Date;
	createdUserId?: string;
	updatedAt?: Date;
	updatedUserId?: string;
	isDeployed?: boolean;
}