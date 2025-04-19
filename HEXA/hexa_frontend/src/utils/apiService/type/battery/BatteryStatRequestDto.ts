export interface BatteryStatRequestDto {
	// btryId: string;
	searchType: string;
	startValue: number;
	endValue: number;
}

export interface BatteryAvgStatRequestDto extends BatteryStatRequestDto {

}

export interface BatteryMonthlyStatRequestDto {
  btryId: string;
  year: number;
  month: number;
}

export interface BatterySohStatRequestDto {
  btryId: string;
  startAt: string;
  endAt: string;
  searchType: string;
}

export interface BatteryChargeStatRequestDto {
  btryId: string;
  startAt: string;
  endAt: string;
}