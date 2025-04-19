export interface StationCtrlDto  {
  stationId: string;
  controlTargetCode: string;
  commandCode: string;
  chassNum?: number;
  slotBoardNum?: number;
  slotNum?: number;
  brtyId?: string;
}

export interface StationCtrlHistoryDto  {
  stationId: string; // 교환기 ID
  stationName: string; // 교환기 명
  controlledAt: Date; // 제어일시
  controlTargetCode: string; // 제어대상코드
  controlTargetName: string; // 제어대상명
  controlCommandCode: string; // 제어코드
  controlCommandName: string; // 제어명
  statusCode: string; // 상태코드
  statusName: string; // 상태명
  isSucceed: boolean; // 성공여부
  controlUserId: string; // 제어자 ID
}