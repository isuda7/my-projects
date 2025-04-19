import { UploadFileInfo } from "@progress/kendo-react-upload";

export interface ExUploadFileInfo extends UploadFileInfo {
  base64Data?: string;
}