export interface StationChargeProfileDto {
  id?: string; // 스테이션 충전 프로파일 ID
  condition: string; // 충전 조건
  current: number; // 전류
  voltage: number; // 전압
  cutoff: number; // 충전 종료 전류
  chargeModeCode: string; // 충전 모드 코드
  deratingValue1: number; // Derating Factor 전류 값
  deratingMin1: number; // Derating Factor 전류 최소
  deratingMax1: number; // Derating Factor 전류 최대
  deratingValue2: number; // Derating Factor 전압 값
  deratingMin2: number; // Derating Factor 전압 최소
  deratingMax2: number; // Derating Factor 전압 최대
  isDefault: boolean; // 기본 여부
  matrixIds: any[]; //충전 조건 Set
  isStepChg: boolean; // Step 충전 여부
  updatedAt: Date; // 수정일시
  updatedUserId: string; // 수정자 ID
  createdAt: Date; // 등록일시
  createdUserId: string; // 등록자 ID
}

export interface StationChargeHistoryDto {
  stationId: string; // 스테이션 ID
  stationName: string; // 스테이션 명
  slotNumber: number; // 슬롯 번호
  btryId: string; // 배터리 ID
  chgProfileNo: string; // 충전 프로파일 No
  condition: string; // 충전 조건
  chargeStartTime: Date; // 충전 시작 일시
  chargeEndTime: Date; // 충전 종료 일시
  chargeDuration: string; // 충전 시간
}