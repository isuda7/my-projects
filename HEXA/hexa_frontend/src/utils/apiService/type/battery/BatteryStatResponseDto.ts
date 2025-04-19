export interface BatteryStatResponseDto {
  btryId: string;
  statDate: Date;
  month: number;
  totalExchangeCnt: number;
  totalChargeCnt: number;
  totalRechargeCnt: number;
  cycleCnt: number;
  totalChargeWh: number;
  totalDischargeWh: number;
  chargeSoc: number;
  chargeSoh: number;
  insertSoc: number;
  insertSoh: number;
  totalUsageWh: number;
}

export interface BatteryStatAvgResponseDto {
  avgTotalExchangeCnt: number;
  avgTotalChargeCnt: number;
  avgTotalRechargeCnt: number;
  avgCycleCnt: number;
  avgTotalChargeWh: number;
  avgTotalDischargeWh: number;
  avgBmsSohe: number;
  avgCtoSohe: number;
  avgSohr: number;
  avgTotalUsageWh: number;
}