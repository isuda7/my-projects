
export interface StationLogDto {
	id: string;
	generationName: string;
	stationId: string;
	stationName: string;
	logFileName: string;
	cityCode: string;
	isCompleted: boolean;
	requestedAt: Date;
}