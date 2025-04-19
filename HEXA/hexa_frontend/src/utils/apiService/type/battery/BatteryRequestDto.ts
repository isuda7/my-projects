import {PageSearchParam} from "@/utils/apiService/type/common/Page.type.ts";

export interface BatteryRequestDto extends PageSearchParam {
  id?: string;
  version?: string;
  bmsVersion?: string;
  usageType1?: string;
  usageType2?: string;
  stationName?: string;
  vehicleId?: string;
  adminId?: string;
  hwVersion?: string;
  ksBtryId?: string;
  excelMap?: string;
  // type: string;
  // manufacturedDate: string;
  // serialNumber: string;
  // releasedAt: Date;
}

export interface BatteryCreateDto {
  manufacturedDate: string;
  ksBtryId?: string;
  hwVersion: string;
}

export interface BatteryUsageStatusChangeDto {
  usageType1: string;
  usageType2: string;
}

export interface BatteryUpdateDto extends BatteryUsageStatusChangeDto {
  hwVersion: string;
  ksBtryId: string;
}

export interface ExcelDownloadDto extends BatteryRequestDto {
  excelMap: string;
}