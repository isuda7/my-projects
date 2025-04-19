
export interface BatteryHistResponseDto {

}

export interface BatteryRsrvHistResponseDto {
  id: number;
  rsrvId: string;
  month: number;
  stationId: string;
  stationName: string;
  btryId: string;
  vehicleId: string;
  insertionSlotNo: number;
  ejectionSlotNo: number;
  genCode: string;
  reservationStartedAt: string;
  reservationExpiredAt: string;
  reservationStatus: string;
  reservationStatusName: string;
  reservationResult: string;


}

export interface BatteryChrgHistResponseDto {
  btryId: string;
  chargeStartTime: string;
  chargeEndTime: string;
  chargeTime: string;
  totalChargeAmount: number;
  profileId: string;
  totalReChargeCount: number;
  totalNormalChargeCount: number;
  totalChargeCount: number;
  chgCondCode: string;
}

export interface BatteryUsageHistResponseDto {
  id: number;
  month: number;
  btryId: string;
  stationName: string;
  beforeStationName: string;
  usageType1: string;
  usageType2: string;
  stationId: string;
  vehicleId: string;
  usageType1Name: string;
  usageType2Name: string;
  beforeUsageType1: string;
  beforeUsageType2: string;
  beforeUsageType1Name: string;
  beforeUsageType2Name: string;
  beforeStationId: string;
  beforeVehicleId: string;
  createdAt: number;
  soh: number;
}

export interface BatterySwapResponseDto {
  id: number;
  swapAt: Date;
  insertBtryId: string;
  vehicleId: string;
  stationId: string;
  stationName: string;
  insertSlotNo: number;
  ejectSlotNo: number;
  ejactBtryId: string;
  type: string;
  rsrvId: string;
  swapResultType: string;
  failReason: string;
  genCode: string;
  soc: number;
  soh: number;
}

export interface BatteryChangeStateHistResponseDto {
  btryId: string;
  type: string;
  stationId: string;
  slotNo: number;
  soh: number;
  soc: number;
  sohr: number;
  totalChangeCnt: number;
  totalDischargeWh: number;
  totalChargeWh: number;
  usageWh: number;
  chargeCycle: number;
}