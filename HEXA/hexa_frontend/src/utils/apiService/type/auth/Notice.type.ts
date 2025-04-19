
export type NoticeReponse = {
	id: number; // bigint -> number
	title?: string | null; // varchar(255) -> string (nullable 가능성 있음)
	description?: string | null; // varchar(255) -> string (nullable 가능성 있음)
	typeCd?: string | null; // varchar(100) -> string (nullable 가능성 있음)
	filePath?: string | null; // varchar(100) -> string (nullable 가능성 있음)
	fileName?: string | null; // varchar(100) -> string (nullable 가능성 있음)
	createdAt: string; // timestamp -> string (ISO date string)
	updatedAt: string; // timestamp -> string (ISO date string)
	createdBy?: number | null; // bigint -> number (nullable 가능성 있음)
	updatedBy?: number | null; // bigint -> number (nullable 가능성 있음)
}

export type Notice = {
	id?: number | null;
	title: string | null; // varchar(255) -> string
	description?: string | null; // varchar(255) -> string (nullable 가능성 있음)
	typeCd: string | null; // varchar(100) -> string
	filePath?: string | null; // varchar(100) -> string (nullable 가능성 있음)
	fileName?: string | null; // varchar(100) -> string (nullable 가능성 있음)
}