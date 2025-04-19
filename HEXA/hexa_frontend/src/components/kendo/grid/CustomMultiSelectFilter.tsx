import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@progress/kendo-react-buttons';
import { Checkbox } from '@progress/kendo-react-inputs';
import { Popup } from '@progress/kendo-react-popup';
import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';

// 데이터 아이템의 구조를 정의하는 인터페이스
// value: 사용자에게 표시될 텍스트
// code: 내부적으로 사용되는 고유 식별자
interface DataItem {
  value: string;
  code: string;
}

// 컴포넌트의 props 인터페이스
// data: 필터링할 데이터 배열. DataItem 타입의 객체들로 구성됨
// onChange: 필터 변경 시 호출될 콜백 함수. 선택된 항목들의 code를 문자열로 전달받음
interface MultiSelectFilterProps {
  data: DataItem[];
  value: string[] | string,
  onChange?: (event: React.MouseEvent<HTMLButtonElement>, values: any[] | string | undefined) => void;
}

const CustomMultiSelectFilter: React.FC<MultiSelectFilterProps> = ({ data, value, onChange }) => {
  const {t} = useTranslation();
  // 팝업의 열림/닫힘 상태를 관리하는 상태 변수
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // 검색 입력값을 관리하는 상태 변수. 사용자가 입력한 검색어를 저장
  const [filterText, setFilterText] = useState<string>('');
  
  // 최종적으로 선택된 아이템들을 관리하는 상태 변수. 초기값은 모든 데이터 항목
  const [selectedItems, setSelectedItems] = useState<DataItem[]>(data);
  
  // 팝업 내에서 임시로 선택된 아이템들을 관리하는 상태 변수
  // 사용자가 'Apply' 버튼을 누르기 전까지의 선택 상태를 임시 저장
  const [tempSelectedItems, setTempSelectedItems] = useState<DataItem[]>(data);
  
  // 메인 컴포넌트에 대한 ref. 팝업의 위치를 이 요소를 기준으로 지정
  const anchorRef = useRef<HTMLDivElement>(null);
  
  // 팝업 컨텐츠에 대한 ref. 외부 클릭 감지에 사용
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 외부 필터 값이 초기화된 경우 (빈 문자열이나 빈 배열)
    if (value === '' || (Array.isArray(value) && value.length === 0)) {
      // 원하는 초기 상태로 리셋: 예시에서는 전체 데이터로 복원 (혹은 전부 선택 해제 등)
      setSelectedItems(data);
      setTempSelectedItems(data);
    }
  }, [value, data])

  // 외부 클릭 시 팝업을 닫는 이벤트 리스너를 설정하는 useEffect
  useEffect(() => {
    // 클릭 이벤트 핸들러 함수
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭된 요소가 anchorRef나 popupRef 내부가 아닌 경우 팝업을 닫음
      if (anchorRef.current && !anchorRef.current.contains(event.target as Node) &&
          popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // 문서에 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 팝업 열기/닫기를 토글하는 함수
  const togglePopup = (): void => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // 팝업을 열 때 현재 선택된 항목들로 임시 선택 상태를 초기화
      setTempSelectedItems([...selectedItems]);
      // 검색어 초기화
      setFilterText('');
    }
  };

  // 검색 입력값 변경을 처리하는 핸들러
  const handleFilterTextChange = (e: InputChangeEvent) => {
    setFilterText(e.value);
  };

  // 개별 아이템 선택/해제를 처리하는 핸들러
  const handleItemCheck = (e: React.MouseEvent, item: DataItem): void => {
    e.stopPropagation();  // 이벤트 버블링 방지
    setTempSelectedItems(prev => 
      prev.some(i => i.code === item.code)
        ? prev.filter(i => i.code !== item.code)  // 이미 선택된 경우 제거
        : [...prev, item]  // 선택되지 않은 경우 추가
    );
  };

  // '전체' 체크박스 선택/해제를 처리하는 핸들러
  const handleAllCheck = (e: React.MouseEvent): void => {
    e.stopPropagation();  // 이벤트 버블링 방지
    setTempSelectedItems(tempSelectedItems.length === data.length ? [] : [...data]);
    // 모든 항목이 선택된 상태면 모두 해제, 그렇지 않으면 모두 선택
  };

  // 필터 적용을 처리하는 핸들러
  const applyFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 임시 선택 상태를 최종 선택 상태로 적용
    setSelectedItems(tempSelectedItems);

    // 선택된 항목들의 code를 문자열로 변환
    let items: any[] | string | undefined = tempSelectedItems.map(item => item.code);
    if(tempSelectedItems.length === data.length) items = '';
    // onChange 콜백 함수 호출
    onChange?.(e, items);
    // 팝업 닫기
    setIsOpen(false);
  };

  // 검색어에 따라 필터링된 데이터를 생성
  const filteredData = data.filter((item) =>
    item.value.toLowerCase().includes(filterText.toLowerCase())
  );

  // 메인 입력창에 표시할 텍스트를 생성하는 함수
  const getDisplayValue = () => {
    if(selectedItems.length === data.length) {
      //전체
      return t('common.all')  // 모든 항목이 선택된 경우
    }
    else {
      return selectedItems.map(item => item.value).join();  // 선택된 항목들의 value를 쉼표로 구분하여 표시
    }
  };

  // 모든 아이템이 선택되었는지 확인하는 변수
  const isAllSelected = tempSelectedItems.length === data.length;
  
  // 필터 버튼 비활성화 여부를 결정하는 변수 (선택된 아이템이 없을 때 비활성화)
  const isFilterButtonDisabled = tempSelectedItems.length === 0;

  return (
    <div className="inner-item type-icon" ref={anchorRef}>
      <Input
        value={getDisplayValue()}
      />
      <Button
        type="button"
        size={"small"} 
        fillMode="flat" 
        className="btn-icon"
        onClick={togglePopup}
      >
        <i className="icon icon-funnel"></i>
      </Button>
      
      <Popup show={isOpen} anchor={anchorRef.current}>
        <div className="filter-popup" ref={popupRef} style={{ padding: '10px', minWidth: '200px' }}>
          <Input
            value={filterText}
            onChange={handleFilterTextChange}
            placeholder="Search..."
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <div className="filter-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <div className="filter-item" style={{ marginBottom: '5px' }}>
              <Checkbox
                checked={isAllSelected}
                onChange={(e) => handleAllCheck(e.nativeEvent as React.MouseEvent)}
                label={<span style={{ fontWeight: 'bold' }}>
                  {t('common.all') /* 전체 */}
                </span>}
              />
            </div>
            {filteredData.map((item) => (
              <div key={item.code} className="filter-item" style={{ marginBottom: '5px' }}>
                <Checkbox
                  checked={tempSelectedItems.some(i => i.code === item.code)}
                  onChange={(e) => handleItemCheck(e.nativeEvent as React.MouseEvent, item)}
                  label={item.value}
                />
              </div>
            ))}
          </div>
          <div className="filter-actions">
            <Button type="button" onClick={togglePopup}>
              {t('common.cancel') /* Cancel */}
            </Button>
            <Button type="button" onClick={applyFilter} themeColor={"primary"} disabled={isFilterButtonDisabled}>
              {t('common.confirm') /* Filter */}
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default CustomMultiSelectFilter;