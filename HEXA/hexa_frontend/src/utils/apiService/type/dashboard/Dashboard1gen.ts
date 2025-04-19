export interface BssStatInfo {
  bssId: string;
  bssNm?: string;
  bssArea?: string;
  bssStatusCd?: string;
  canChrgBtry?: string;
  chrgCmplCnt?: number;
  chrgIngCnt?: number;
  resvBtryCnt?: number;
  errBtryCnt?: number;
  btryChngCnt?: number;
  lockBtryCnt?: number;
  registDthms?: Date;
  updtDthms?: Date;
  inexchngBtryCnt?: number;
  todayExchngCnt?: number;

}
export interface BssStatBtryInfo {
  id: string;
  stationId: string;
  positionNumber?: number;
  slotBatteryId?: string;
  btryPairId?: string;
  slotBatteryStatus?: string;
  slotBatterySoc?: string;
  slotBatterySoh?: string;
  tprt?: string;
  slotBatteryTemperatureAvg?: string;
  slotBatteryTemperatureMin?: string;
  slotBatteryTemperatureMax?: string;
  alrmInfo?: string;
  lockCnt?: number;
  createdAt?: Date;
  updatedAt?: Date;
  slotStatCd?: string;
  btryExchngCnt?: number;
  btryTodayExchngCnt?: number;
}