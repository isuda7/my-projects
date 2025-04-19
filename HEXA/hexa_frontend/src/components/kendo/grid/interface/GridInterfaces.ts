import React from "react";
import {
  GridFilterCellProps,
  GridPagerSettings,
  GridRowClickEvent,
} from "@progress/kendo-react-grid";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query";
import { Page } from "@/utils/apiService/type/common/Page.type.ts";

interface AppState {
  items: object[];
  total: number;
  skip: number;
  take: number;
  pageSize: number;
  pageable: boolean | GridPagerSettings;
}

type GridHeader = {
  field: string; //컬럼 필드값, 일종의 key값
  title: string; //컬럼의 헤더 명칭
  searchkey?: string; //대분류-소분류로 이어지는 컬럼을 연동하기위한 키값 (BatteryUsageHistoryModal.tsx 참고 )
  searchType?: string; //대분류-소분류로 이어지는 컬럼을 연동하기위한 키값 (BatteryUsageHistoryModal.tsx 참고 )
  width?: number | string; //컬럼의 길이
  filterType?: string; //컬럼 필터 타입 (select, multiSelect 등)
  filterable?: boolean; //컬럼 필터가능여부 필터적용하려면 true값 설정필요
  align?: string; //컬럼 데이터의 글자 정렬(기본값: left)
  cellType?: string; //컬럼의 셀 타입(select일경우 selectData의 code값과 매칭되어 해당 공통코드의 value가 보여진다)
  backgroundcolor?: string; //해당 컬럼의 배경색
  cellClick?: (event?: any, dataItem?: any) => void; //셀 클릭할경우 동작하는 callback함수
  show?: boolean; //TODO:사용하지않음 추후 영향도 판단하여 삭제
  isRowSpan?: boolean; //true일경우 같은값을 가진건 셀병합
  cell?: Function | ((props?: any) => void); //셀이 커스텀형식으로 보여져야 할경우 사용하는 변수
  headerTextAlign?: string; //헤더의 글자 정렬 (기본값: 'center')
  selectData?: any[]; //필터타입이 select나 multiSelect일 경우 해당 필터에 사용되는 데이터를 담는 변수
  onChangeSelect?: (event: any, filterProps: GridFilterCellProps) => void; //대분류-소분류로 이어지는 컬럼을 연동하기위한 함수 (BatteryUsageHistoryModal.tsx 참고 )
  hidden?: boolean; //해당 컬럼 숨김여부 true면 숨김
  children?: any[]; //자식 컬럼헤더 배열을 담는항목
  locked?: boolean; //컬럼 위치 고정여부 긴 그리드일때 왼쪽에 고정으로 담아
  cellTypeProps?: any; //셀데이터가 여러가지 방식으로 표현되기위해 사용하는 옵션값 CustomColumnCell.tsx에서 사용되며 사용방법은 CodeInfoList.tsx나 StationChargeProfileList.tsx등 참조
  cells?: any; //TODO:사용하지않음 추후 영향도 판단하여 삭제
  childFilterFields?: string[]; //대분류-소분류로 이어지는 컬럼을 연동하기위한 함수 (BatteryUsageHistoryModal.tsx 참고 )
  sortable?: boolean; //개별적으로 컬럼의 정렬 여부를 세팅하기위한 변수
};

interface CommonGridProps<T> {
  columnHeader?: GridHeader[]; //컬럼 헤더 목록 리스트 
  defaultColumn?: GridHeader[]; //TODO:사용안함 - 추후영향도 확인하여 삭제
  buttonCount?: number; //하단 페이지네이션에 한번에 보이는 페이지 개수 (기본값: 10)
  sortableGrid?: boolean; //그리드 정렬기능 여부, (기본값: false)
  unsorted?: boolean; //정렬 해제할수있는지 없는지 여부, false면 정렬을 한번누르면 기본정렬상태(화살표가없는상태)로 돌아갈수없다. (기본값: false)
  multipleSorting?: boolean; //다중 컬럼 정렬 가능여부, (기본값: false)
  defaultFilter?: boolean; //필터링여부 true여야만 필터링 적용가능, (기본값: false)
  isResizable?: boolean; //컬럼 사이즈 마우스로 조정 가능 여부, (기본값: false)
  isReorder?: boolean; //컬럼 위치 이동 가능여부, 마우스로 컬럼 순서를 변경가능, (기본값: false)
  gridData?: T[]; //TODO:사용안함 - 추후영향도 확인하여 삭제
  displayCount?: number[]; //왼쪽상단 한번에 최대몇개씩 보일수있는지 표현하는 숫자 배열 리스트 (기본값: [10])
  gridWidth?: number | string; //고정 그리드 넓이 (기본값: '100%')
  gridHeight?: number; //고정 그리드 높이 (기본값: 0)
  isChecked?: boolean; //그리드 행 체크 가능 여부 true면 가장 상단 컬럼에 체크박스가 생김 (기본값: false)
  checkKey?: string; //그리드 체크박스를 사용하기위한 기준이되는 행의 id 필드명 (기본값: 'id')
  rowClick?: (props: GridRowClickEvent) => void; //row 클릭 이벤트 함수
  rowSelectable?: boolean; //ROW 선택 가능여부 isChecked가 true여도 이항목이 true가 아니면 체크박스가 활성화되지않는다
  addButton?: (event: React.MouseEvent<Element, MouseEvent>) => void; //신규등록 버튼을 클릭할경우 동작하는 callback함수, 해당변수가 있어야지 신규버튼이보여짐
  addButtonLabel?: string; //신규등록 버튼의 '신규등록' 명칭을 다른 용어로 바꾸고 싶을때 사용하는 변수
  deleteButton?: (event: any) => void; //삭제 버튼을 클릭할경우 동작하는 callback함수, 해당변수가 있어야지 삭제버튼이보여짐
  uploadButton?: (event: React.MouseEvent<Element, MouseEvent>) => void; //엑셀업로드 버튼을 클릭할경우 동작하는 callback함수, 해당변수가 있어야지 엑셀업로드가보여짐
  downloadButton?: (event: React.MouseEvent<Element, MouseEvent>) => void; //엑셀다운로드 아이콘 버튼을 클릭할경우 동작하는 callback함수, 해당변수가 있어야지 엑셀다운로드 아이콘이 보여짐
  printButton?: (event: React.MouseEvent<Element, MouseEvent>) => void; //인쇄아이콘 버튼을 클릭할경우 동작하는 callback함수, 해당변수가 있어야지 인쇄아이콘이보여짐
  girdToolBar?: boolean; //그리드 상단에 버튼, 최대목록보기 개수를 표현할수있는지 없는지 여부, true여아지만 설정한 버튼, 최대목록개수가 노출됨 (기본값: false)
  headerGroup?: React.ReactNode; //TODO: 사용하는 화면없는데 GridCommonComponent에 있어서 영향도 확인하고 GridCommonComponent에 반영하는부분까지 삭제 필요
  isLoading?: boolean; //TODO:사용안함 - 추후영향도 확인하여 삭제
  showUpdateTime?: boolean; //TODO:사용안함 - 추후영향도 확인하여 삭제
  isFilterResetButton?: boolean; //모든 필터 리셋버튼 사용여부 (기본값: false)
  isGridResetButton?: boolean; //마우스로 조작한 그리드의 상태를 초기화하는 버튼 사용여부 (기본값: false)
  isColumnSelectShowButton?: boolean; //컬럼을 show/hide 할수있는 팝업 사용여부 (기본값: false)
  pageChange?: any; //TODO:사용안함 - 추후영향도 확인하여 삭제
  onSearch?: any; //Grid의 데이터를 조회하는 함수
  queryKey?: string; //react-query의 useQuery를 이용한 API 통신을 위해 사용하는 키값, 각 화면마다 키값을 다르게 설정해주면된다
  searchParams?: any; //조회조건 obejct, 기본조회이외에 날짜,input값이 필요하다면 넣어준다 (StationFirmwareList.tsx 참고)
  headerSelection?: boolean; //isChecked에 의해 checkbox가 활성화되어있을때 전체 체크를 할수있는지 없는지 여부 (기본값: true)
  checkedDisabled?: boolean; //체크박스가 비활성화 상태로 보여야하는지 여부 (기본값: false)
  rowStyles?: Function | object; //row의 style을 설정하는 항목 (StationInfoDeviceList.tsx 참고, 이화면뺴고 사용하는곳 없음)
  pagination?: boolean; //페이지네이션 보일지 말지 여부(기본값: true)
  gridInfoMessage?: (() => React.ReactNode) | React.ReactNode; //왼쪽 상단에 원하는 커스텀 메세지를 표현해주는 항목
  gridClassName?: string; //그리드의 전체 className을 지정해줄수있는 항목
  parentShowHideFlag?: boolean; //기본적으로 크리드의 컬럼 show/hide 팝업은 최종 childe 필드를 기준으로 리스트를 보여주고있는데 부모필드를 기준으로 리스트를 보여야할떄 사용한다 (StationExchangeFailedList.tsx 참고)
  initSelected?: any[]; //그리드가 체크박스 선택 가능한 그리드일경우 최초 데이터를 불러올시에 체크박스가 체크되어있는 상태를 보여주기위해 사용되는항목, TODO: 요청에의해 만들어졌으나 현재 사용하지않아 추후 영향도 확인하여 GridCommonComponent에 반영하는부분까지 삭제 필요

  externalData?: Page<T>; //그리드가 내부에서 queryKey와 onSearch함수에 의해서 조회되는게 아닌 외부에서 조회된 값을 보여줄때 사용하는 항목 (StationInfoDeviceList.tsx 참고)
  externalLoading?: boolean; //그리드가 내부에서 queryKey와 onSearch함수에 의해서 조회되는게 아닌 외부에서 조회된 값을 보여줄때 사용하는 항목 (StationInfoDeviceList.tsx 참고)
  externalFetching?: boolean; //그리드가 내부에서 queryKey와 onSearch함수에 의해서 조회되는게 아닌 외부에서 조회된 값을 보여줄때 사용하는 항목 (StationInfoDeviceList.tsx 참고)
  externalRefetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<Page<T>, Error>>; //그리드가 내부에서 queryKey와 onSearch함수에 의해서 조회되는게 아닌 외부에서 조회된 값을 보여줄때 사용하는 항목 (StationInfoDeviceList.tsx 참고)
  buttonList?: any[]; //신규등록, 엑셀업로드 같이 정해진 버튼말고 다른외부버튼을 추가하고싶을때 사용하는 항목 (StationIdCodeList.tsx 참고)
}

interface ItemType<T> {
  [key: string]: T;
}

interface StationGridProps<T> {
  columnHeader?: GridHeader[];
  defaultColumn?: GridHeader[];
  buttonCount?: number;
  sortableGrid?: boolean;
  unsorted?: boolean;
  multipleSorting?: boolean;
  defaultFilter?: boolean;
  isResizable?: boolean;
  isReorder?: boolean;
  gridData?: T[] | T;
  displayCount?: number[];
  gridWidth?: number | string;
  gridHeight?: number;
  isChecked?: boolean;
  checkKey?: string;
  rowSelectable?: boolean;
  headerSelection?: boolean;
  rowStyles?: Function | object,
  maxHeight?: number,
  rowClick?: (props: GridRowClickEvent) => void;
  checkedDisabled?: boolean;
  nonCheck?: boolean;
}

export type { AppState, GridHeader, CommonGridProps, ItemType, StationGridProps };
