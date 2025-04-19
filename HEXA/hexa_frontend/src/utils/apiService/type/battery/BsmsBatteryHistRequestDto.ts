import {PageSearchParam} from "@/utils/apiService/type/common/Page.type.ts";


export interface BsmsBatterySwapHistRequestDto extends PageSearchParam {
  btryId: string;
  btryPairId: string;
  registDate: Date;
  funcCd: string;
  bikeId: string;
  bssId: string;
  bssInBtrySlot1Loc: string;
  bssInBtrySlot2Loc: string;
  rsrvId: string;
  bssNm: string;
  bssOutBtry1Id: string;
  bssOutBtry2Id: string;
  bssOutBtrySlot1Id: string;
  bssOutBtrySlot2Id: string;
  chngSuccessYn: string;
  chngFailReasonCd: string;
}
export interface BatterySwapHistExcelDto extends BsmsBatterySwapHistRequestDto{
  downloadReason: string;
}
