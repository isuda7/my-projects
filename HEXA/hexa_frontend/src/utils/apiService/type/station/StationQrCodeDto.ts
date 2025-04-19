export interface StationQrCodeDto {
	id: number;
	stationId: string;
	stationName: string;
	cityCode: string;
	cityName: string;
	districtCode: Date;
	districtName: string;
	qrCode: string;
	createdAt: Date;
	createdUserId: string;
}