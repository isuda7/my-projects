import { DischargeCriteria, CongestionCriteria, RebootCriteria } from "./StationConfigDto"

export interface StationInfoDto {
	id: string;
	name: string;
	customerCode: string;
	customerName: string;
	idCodeTsid: string;
	cityCode: string;
	cityName: string;
	districtCode: string;
	districtName: string;
	slotCount: number;
	isVisibleAtApp: boolean;
	statusCode: string;
	installedAt: Date;
	unUsedAt: Date;
	swAppVersion: string;
	chargerFwVersion: string;
	nfcFwVersion: string;
	bmsFwVersion: string;
	chassisFwVersion: string;
	slotFwVersion: string;
	chargeProfileCount: number;
	updatedAt: Date;
	updatedUserId: string;
	createdAt: Date;
	createdUserId: string;
}

export interface StationInfoRegisterDto {
	stationName: string;
	idCodeTsid?: string;
	cityCode: string;
	districtCode: string;
	address: string;
	customerCode: string;
	latitude: string;
	longitude: string;
	deviceSerialNumber: string;
	powerCapacityWh: string;
	isVisibleAtApp: boolean;
	isUnused?: boolean;
	config: Config;
}

export interface Config {
	disChargeCriteriaList: DischargeCriteria[],
	congestionCriteriaList: CongestionCriteria[],
	rebootCriteria: RebootCriteria,
}

export interface StationTargetInfoDto {
	id: string;
	name: string;
	customerCode: string;
	customerName: string;
	idCodeTsid: string;
	cityCode: string;
	cityName: string;
	districtCode: string;
	districtName: string;
}

export interface ChargeProfileCompact {
	appliedAt: Date;
	chgProfileNo: string;
	condition: string;
	no: number;
}