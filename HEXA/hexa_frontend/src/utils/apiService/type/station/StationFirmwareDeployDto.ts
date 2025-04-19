export interface StationFirmwareDeployDto {
	id: string;
	deployStatusCode: string;
	displayFwListStr: string;
	stationCount: number;
	successCount: number;
	waitingCount: number;
	failCount: number;
	deployedAt: Date;
	createdAt: Date;
	createdBy: string;
	updatedAt: Date;
	updatedBy: string;
}