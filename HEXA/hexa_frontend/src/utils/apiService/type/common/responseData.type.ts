import { Page } from "@/utils/apiService/type/common/Page.type.ts";

export interface ResponseDataType<T>  {
  code: number;
  message: string;
  data:   T | Page<T>;
};