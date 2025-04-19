export interface BatteryStatic {
  genCode: string;
  statDate: string;
  succCnt: number;
  failCnt: number;
  authFailCnt?: number;
}

export interface AccSwapRank {
  rank: number;
  genCode: string;
  genName: string;
  stationName: string;
  swapCount: number;
}

export interface IrregularCount {
  statDate: string;
  genCode: string;
  irregularCount: number;
}

export interface DisconnectCount {
  statDate: string;
  genCode: string;
  disconnectCount: number;
}