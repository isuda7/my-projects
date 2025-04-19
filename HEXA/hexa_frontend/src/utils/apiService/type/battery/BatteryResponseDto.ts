export interface BatteryResponseDto {
    id: string;
    type: string;
    manufacturedDate: string;
    serialNumber: string;
    usageType1: string;
    usageType2: string;
    version: string;
    versionReleasedAt: Date;
    vehicleId: string;
    bmsVersion: string;
    ksBtryId: string;
    stationName: string;
    hwVersion: string;
    createdAt?: Date;
    createdUserId?: string;
    updatedAt?: Date;
    updatedUserId?: string;
    soh?: number;
    sohUpdatedAt: Date;
}