import {PageSearchParam} from "@/utils/apiService/type/common/Page.type.ts";

export interface BatteryRsrvHistRequestDto extends PageSearchParam {
  batteryId?: string;
  rsrvId?: string;
  vehicleId?: string;
  stationName?: string;
  reservationStatus?: string;
  excelMap?: string;
}

export interface BatteryChargeHistRequestDto extends PageSearchParam {
  btryId?: string;
  profileId?: string;
  chargeType?: string;
  excelMap?: string;
}

export interface BatteryUsageHistRequestDto extends PageSearchParam {
  btryId?: string;
  usageType1?: string;
  usageType2?: string;
  stationIdOrVehicleId?: string;
  beforeUsageType1?: string;
  beforeUsageType2?: string;
  beforeStationIdOrVehicleId?: string;
  soh?: number;
  excelMap?: string;
}

export interface BatterySwapHistRequestDto extends PageSearchParam {
  insertBtryId: string;
  type: string;
  vehicleId: string;
  stationId: string;
  stationName: string;
  ejactBtryId: string;
  rsrvId: string;
  failReason: string;
  startAt: Date;
  endAt: Date;
}
export interface BatterySwapHistExcelDto extends BatterySwapHistRequestDto{
  downloadReason: string;
}

export interface BatteryChangeStateHistRequestDto extends PageSearchParam {
  btryId?: string;
  type?: string;
  stationId?: string;
  slotNo?: number;
  soh?: number;
  soc?: number;
  sohr?: number;
  totalChangeCnt?: number;
  totalChargeAmount?: number;
  totalDischargeWh?: number;
  usageWh?: number;
  chargeCycle?: number;
  excelMap?: string;
  startDate: string;
  endDate: string;
}