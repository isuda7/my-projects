//스테이션 시계열 데이터 수집내역
export interface StationStatEventDto  {
  stationId: string;
  eventTime: Date;
  chassTemp: number;
  chassHumid: number;
  chassAccumPwr: number;
}

export interface StatisticsBasicDto  {
  stationId: string;
  stationName: string;
  installedAt: Date;
  total: number;
  unusedAt?: Date;
  authFail: number;
  swapFail: number;
}

export interface DeviceSwapDto  {
  stationName: string;
  serialNumber: string;
  manufacturedAt: Date;
  total: number;
}

interface FailBasic {
  total: number;
  authFail: number;
  swapFail: number;
}

interface MonthDayDto {
  [key: string]: number | null;
}
interface MonthDayFailDto {
  [key: string]: FailBasic;
}

export type StationStatDto = StatisticsBasicDto & Omit<MonthDayDto, keyof StatisticsBasicDto>
export type StatDeviceSwapDto = DeviceSwapDto & Omit<MonthDayDto, keyof DeviceSwapDto>
export type StationFailStatDto = StatisticsBasicDto & Omit<MonthDayFailDto, keyof StatisticsBasicDto>