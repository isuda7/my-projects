export interface StationDeviceDto {
	tsid: string,
	modelName: string,
	primarySerialNumber: string,
	chassisList: Chassis[],
	//chassisList
	slotCount?: number
}

export interface Chassis {
	tsid: string,
	serialNumber: string,
	hwVersion: string,
	isPrimary: boolean,
	orderNumber: number,
	generationCode: string,
	manufacturedAt: Date,
	changedAt: Date,
	slots: SlotInfo[]
}

export interface SlotInfo {
	tsid: string,
	serialNumber: string,
	hwVersion: string,
	slotNumber: number,
	manufacturedAt: Date,
	assembledAt: Date,
}

//조회해온 List를 화면에 보여주기위한 가공 타입
export interface StationDeviceProcessDto {
	expanded?: boolean,
	tsid: string,
	modelName: string,
	primarySerialNumber: string,
	housingTsid: string,
	serialNumber: string,
	hwVersion: string,
	isPrimary: boolean,
	orderNumber: number,
	generationCode: string,
	manufacturedAt: Date,
	changedAt: Date,
	slotTsid: string,
	slotSerialNumber: string,
	slotHwVersion: string,
	slotNumber: number,
	slotManufacturedAt: Date,
	assembledAt: Date,
	
}