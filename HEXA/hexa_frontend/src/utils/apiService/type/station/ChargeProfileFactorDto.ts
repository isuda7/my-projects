export interface ChargeProfileFactorDto {
  id?: string; // 충전 팩터 ID
  chargeFactorCode: string; // 충전Factor 유형
  chargeFactorName: string; // 충전Factor 유형명
  minValue: number; // 범위 최소값
  maxValue: number; // 범위 최대값
  congestionLevelCode: string; // 번잡도 레벨 코드
  congestionLevel: string; // 번잡도 레벨
  updatedAt?: Date; // 수정일시
  updatedByUserId?: string; // 수정자 ID
  createdAt?: Date; // 등록일시
  createdUserId?: string; // 등록자 ID
}