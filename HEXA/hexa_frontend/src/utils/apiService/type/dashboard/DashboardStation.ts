export type DashboardStaionRequestDto = {
  stationId?: string;
  cityCode: string;
  idCodeTsid: string;
  searchKeyword: string;
}
export type StationSlot = {
  stationId: string;
  slotNum: number;
  slotSts: string;
  slotChgProf: string;
  slotErrCd: string;
  slotComNfcSts: number;
  slotComChgerSts: number;
  slotSeq: string;
  slotLedSts: string;
  slotDoorSts: number;
  slotTopSenOfDoorSts: number;
  slotBotSenOfDoorSts: number;
  slotLockCmd: number;
  slotLockSts1: number;
  slotLockSts2: number;
  slotFanSts: number;
  slotInBat: number;
  slotInputSwBat: number;
  slotBatWakSts: number;
  slotBatSts: string;
  slotBatId: string;
  slotBatVolt: number;
  slotBatTermVolt: number;
  slotBatCurr: number;
  slotBatTempMin: number;
  slotBatTempMax: number;
  slotBatTempAvg: number;
  slotBatSoc: number;
  slotBatSoh: number;
  slotBatCFET: number;
  slotBatDFET: number;
  slotBatFwVer: string;
  slotBatErrCd: string;
  eventTime: number;
  btryPairId: string;
  rowSpan: number;
};

export interface Station {
  stationId: string;
  generation: string;
  stationName: string;
  address: string;
  state: string;
  statusName: string;
  possibleSlot: number;
  totSlot: number;
  simChargeCnt: number;//동시 충전구수
  totWaitSlot: number;
  totFltSlot: number;
  totChgCpltSlot: number;
  totChgSlot: number;
  totAccumPwr: string;
  totChgProNum: string;
  installedAt: string;
  lat: number;
  lng: number;
  note: string;
  isVisibleAtApp: boolean
  totalSwapCnt: number;
  totalUsageWh: number;
  totalAvailableWh: number;
  stationStatus: string; //bssSts
  stationSlots?: StationSlot[];
  stationChassisList: StationChassis[];
  slotBoards: StationSlotBoardDto[];
  qrId: string;
  disconnectionCnt: number;
  powerCapTypeCode: string;
  districtName: string;
  cityName: string;
  isDisconnect: boolean;
}

export interface ChassisResponseDto {
  stationId: string;
  chassNum: number;
  chassSts: string;
  bssFloodSts: number;
  bssFireSts: number;
  chassErrCd: string;
  chassChgCpltNum: number;
  chassChgNum: number;
  chassWaitNum: number;
  chassFltNum: number;
  chassComSlotSts: string;
  chassTemp: number;
  chassHumid: number;
  chassCO2: number;
  chassAirconSts: number;
  chassTgtTemp: number;
  chassDoorSts: number;
  chassAccumPwr: number;
  chassFanSts: number;
  chassSwapCnt: number;
  chassAvailPwr: number;
  chassUsedPwr: number;
  eventTime: number;
}

export interface StationInfo {
  id: string;
  name: string;
  customerCode: string;
  address: string;
  landLotAddress: string;
  slotCount: number;
  isVisibleAtApp: boolean;
  statusCode: string;
  installedAt: string; // Timestamp
  isUnused: boolean;
  unusedAt: string; // Timestamp
  latitude: string;
  longitude: string;
  swAppVersion: string;
  chargerFwVersion: string;
  nfcFwVersion: string;
  bmsFwVersion: string;
  chassisFwVersion: string;
  slotFwVersion: string;
  totalChargeCompleteSlotCount: number;
  totalChargeSlotCount: number;
  totalWaitSlotCount: number;
  totalFaultSlotCount: number;
  totalAccumulatedPower: number; // BigDecimal
  stationChassisList: StationChassis[];
  stationSlotList: StationSlot[];
  slotBoards: StationSlotBoardDto[];
  note: string;
  generation: string;
  customerName: string;
  statusName: string;
}

export interface StationChassis {
  tsid: number;
  stationId?: string;
  chassisNumber: number;
  fwVersion: string;
  hwVersion: string;
  routerNumber: string;
  routerSwVer: string;
  bootTime: string; // Timestamp
  bootReason: string;
  chassisStatus: string;
  floodStatus: number;
  fireStatus: number;
  chassisErrorCode: string;
  chassisChargeCompleteNumber: number;
  chassisChargeNumber: number;
  chassisWaitNumber: number;
  chassisFaultNumber: number;
  chassisTemperature: number;
  chassisHumidity: number;
  chassisCO2: number;
  chassisAirConStatus: number;
  chassisTargetTemperature: number;
  chassisDoorStatus: number;
  chassisAccumulatedPower: number;
  chassisFanStatus: number;
  chassisSwapCount: number;
  chassisAvailablePower: number;
  chassisUsedPower: number;
}

export interface StationSlotDto {
  id: string;
  positionNumber: number;
  slotBoardPosition: number;
  nfcFwVersion: string;
  nfcHwVersion: number;
  nfcSerialNumber: string;
  chargerFwVersion: string;
  chargerHwVersion: number;
  chargerSerialNumber: string;
  slotStatus: string;
  slotChargeProfileId: string;
  slotErrorCode: string;
  slotCommNfcStatus: number;
  slotCommChargerStatus: number;
  slotSequence: string;
  slotLedStatus: string;
  slotDoorStatus: number;
  slotTopSensorOfDoorStatus: number;
  slotBottomSensorOfDoorStatus: number;
  slotLockCommand: number;
  slotLockStatus1: number;
  slotLockStatus2: number;
  slotFanStatus: number;
  slotInBattery: number;
  slotInputSwBattery: number;
  slotBatteryWakeUpStatus: number;
  slotBatteryStatus: string;
  slotBatteryId: string;
  slotBatteryVoltage: number;
  slotBatteryCurrent: number;
  slotBatteryTemperatureMin: number;
  slotBatteryTemperatureMax: number;
  slotBatteryTemperatureAvg: number;
  slotBatterySoc: number;
  slotBatterySoh: number;
  slotBatteryCFET: number;
  slotBatteryDFET: number;
  slotBatteryFwVersion: string;
  nfcBoardStatus: string;
  nfcBoardErrorCode: string;
  chargerBoardStatus: string;
  chargerBoardErrorCode: string;
}
export interface StationSlotBoardDto {
  stationSlotBoardId: number;
  stationId: string;
  slotBoardNumber: number;
  slots: StationSlot[];
  fwVersion: string;
  hwVersion: string;
  serialNumber: string;
  comStatus: string;
}

export interface DashboardStationDto {
  stationId: string; // 교환기 ID
  stationName: string; // 교환기 명
  customerCode: string; // 고객 구분코드
  address: string; // 주소
  landLotAddress: string; // 지번 주소
  totSlot: number; // 슬롯 개수
  isVisibleAtApp: boolean; // App 노출 여부
  state: string; // 교환기 상태 코드
  installedAt: Date; // 설치일
  isUnused: boolean; // 미사용여부
  unusedAt: Date; // 미사용등록일
  lat: string; // 위도
  lng: string; // 경도
  swAppVersion: string; // SW 앱 버전
  chargerFwVersion: string; // 충전기 펌웨어 버전
  nfcFwVersion: string; // NFC 펌웨어 버전
  bmsFwVersion: string; // BMS 펌웨어 버전
  chassisFwVersion: string; // 함체 펌웨어 버전
  slotFwVersion: string; // 슬롯 펌웨어 버전
  totChgCpltSlot: number; // IF-DATA-003 전체 충전 완료 슬롯 개수
  totChgSlot: number; // IF-DATA-003 전체 충전 중 슬롯 개수
  totWaitSlot: number; // IF-DATA-003 전체 대기 중 슬롯 개수
  totFltSlot: number; // IF-DATA-003 전체 충전 불가 슬롯 개수
  totAccumPwr: number; // IF-DATA-003 전체 누적 전력량
  stationChassis: StationChassis[]; // 교환기 논리 함체 정보
  slotBoards: StationSlotBoardDto[]; // 교환기 논리 슬롯 보드 정보
  stationSlots: StationSlot[]; // 교환기 논리 슬롯 정보
  note: string; // 비고
  generation: string; // 세대 (default 2)
  customerName: string; // 고객명
  statusName: string; // 상태명
  possibleSlot: number; // 사용 가능한 슬롯 수
  totalSwapCnt: number; // 전체 교환 횟수
  totalUsageWh: number; // 총 사용 전력량 (Wh)
  totalAvailableWh: number; // 총 사용 가능 전력량 (Wh)
}