export interface ChargeProfileJobDto {
  ctaId: string; // 교환기 충전 프로파일 JOB ID
  profileNos: ProfileSimpleInfo[]; // 스테이션 충전 프로파일 ID
  stationCount: number; // 적용 대상 전체 교환기 수
  waitingCount: number; // 대기 교환기 수
  progressCount: number; // 진행 교환기 수
  successCount: number; // 성공 교환기 수
  failCount: number; // 실패 교환기 수
  deployAt: Date; // 배포일시
  createdAt: Date; // 등록일시
  createdUserId: string; // 등록자 ID
}

interface ProfileSimpleInfo {
  profileNo: string; //충전 프로파일 NO
  condition: string; //충전 조건
}