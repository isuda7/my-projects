export interface StationConfigDto {
	dischargeCriteriaList: DischargeCriteria[],
	congestionCriteriaList: CongestionCriteria[],
	temperatureCriteriaList: TemperatureCriteria[],
	rebootCriteria: RebootCriteria,
	chargeOrderCode: string,
	permissibleSoc: string,
	[key: string]: any; // 문자열 키로 어떤 속성이든 접근 가능
}

export interface DischargeCriteria {
	priority: number,
	criteriaCode: string,
	valueCode: string,
}

export interface CongestionCriteria {
	timeSpan: string,
	congestionLevelCode: string,
}

export interface TemperatureCriteria {
	month: string,
	minTemperature: number,
	maxTemperature: number,
}

export interface RebootCriteria {
	isNoneReboot: boolean,
	rebootCycle: string,
	rebootCycleHour: number,
	rebootCycleMinute: number,
	[key: string]: any,
}

export interface StationConfigJobDto {
	id: string,
	configCode: string,
	configName: string,
	totalCount: number,
	succeedCount: number,
	inProgressCount: number,
	failedCount: number,
	createdAt: Date,
	createdByUserId: string,
}

export interface StationConfigStatusDto {
	stationId: string,
	stationName: string,
	config: StationConfigDto,
}

export interface StationConfigHistoryDto {
	controlAt: Date,
	configCode: string,
	configName: string,
	oldValue: string,
	newValue: string,
	isSucceeded: boolean,
	controlUserId: string,
}