export interface PageSearchParam  {
  page: number;
  size: number;
  // sort: Array<string>;
}

// JPA Page 인터페이스
export interface Page<T> {
  content: T[];
  paging?: {
		first: boolean;
		last: boolean;
		totalElements: number;
		totalPages: number;
		size: number;
		page: number;
		numberOfElements: number;
  };
}