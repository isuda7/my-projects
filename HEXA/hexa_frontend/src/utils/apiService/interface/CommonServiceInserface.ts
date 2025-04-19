export type Response<T> = {
  code: string; // 결과코드
  message: string; // 결과 메시지
  data: T | T[]; // 결과 데이터
  page?: number; // 페이지 위치
  size?: number; // 페이지 당 갯수
  totalPages?: number; // 전체 페이지 수
  totalElements?: number; // 전체 아이템 수
};
