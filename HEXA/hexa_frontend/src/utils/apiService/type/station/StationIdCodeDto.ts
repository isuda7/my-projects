export interface StationIdCodeDto {
	tsid: string;
	cityCode: string;
	cityName: string;
	districtCode: string;
	districtName: string;
	createdAt: Date;
	createdUserId: string;
}

export interface CityInfo {
	cityName: string,
	cityCode: string,
	[key: string]: any
}

export interface CityDistrictInfo {
	cityName: string,
	cityCode: string,
	districtName: string,
	districtCode: string,
	[key: string]: any
}