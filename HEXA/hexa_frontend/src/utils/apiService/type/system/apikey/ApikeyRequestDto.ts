export interface SaveApikeyDto{
  systemId: string;
  systemName: string;
}

export interface UpdateApikeyDto {
  systemName: string;
}

export interface SearchApikeyDto {
  systemId: string;
  systemName: string;
  apikey: string;
  password: string;
  createdUserId?: string;
  updatedUserId?: string;
  excelMap?: string;
}