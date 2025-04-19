export interface ChargeProfileMatrixDto {
  id?: number; // 충전 조건 No
  temperature: string; // 온도
  soc: string; // SOC
  soh: string; // SOH
  congestionLevelCode: string; // 번잡도 레벨 코드
  congestionLevel: string; // 번잡도 레벨
  isMapped?: boolean; // 매핑 여부
  chargeProfileId?: string; // 매핑 충전프로파일 No
  createdAt?: Date; // 등록일시
  createdUserId?: string; // 등록자 ID
}