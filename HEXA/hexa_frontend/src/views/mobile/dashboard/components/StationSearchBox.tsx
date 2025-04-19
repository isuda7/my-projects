/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";

/* Common */
import StationApiService from "@/utils/apiService/StationApiService";
import SelectPopup from "../../popup/SelectPopup";

interface RadioData {
  label: string;
  value: string | null;
  groupCode?: string;
}

export default function StationSearchBox(props: any) {
  const {t} = useTranslation()
  const { onSearch, initStatus } = props;

  const [cityList, setCityList] = useState<RadioData[]>([]); //시 데이터 목록
  const [districtList, setDistrictList] = useState<RadioData[]>([]); //구 데이터 목록
  
  const [city, setCity] = useState<RadioData>({label: t('common.all'), value: null}); //선택 된 시 데이터
  const [district, setDistrict] = useState<RadioData>({label: t('common.all'), value: null}); //선택 된 구 데이터
  const [status, setStatus] = useState<RadioData>({label: t('dashboard.station-status.all-lock'), value: 'LOCKED'})
  const [searchKeyword, setSearchKeyword] = useState<string>(''); //검색 키워드
  
  const statusOptions = [
    {label: t('dashboard.station-status.all-lock'), value: 'LOCKED'}, //'전체잠금'
    {label: t('dashboard.station-status.error'), value: 'ERROR'}, //'오류발생'
  ]

  //모달 정보
  const [modalData, setModalData] = useState<any>({
    open: false,
  })

  useEffect(() => {
    if(initStatus) {
      const obj: any = statusOptions.find(v => v.value === initStatus);
      setStatus(obj)

      const params = {
        stationStatus: initStatus,
      }
      onSearch?.(params)
    }
  }, [initStatus])

  /**
	 * 시코드, 구코드 전체 목록 호출
	 * @returns 
	 */
	const getSelectList = async () => {
		const response = await StationApiService().getCityList();
		if(Array.isArray(response.data)) {
      const origin = response.data;
      const radioCityList: RadioData[] = origin.map(v => ({label: v.cityName, value: v.cityCode}))
      radioCityList.unshift({label: t('common.all'), value: null})
      setCityList(radioCityList)
    }

    const response2 = await StationApiService().getStationCodeList({page: 0, size: 9999});
		if(Array.isArray(response2.data.content)) {
      const origin: any = response2.data.content;
      const radioDistrictList: RadioData[] = origin.map((v: any) => ({label: v.districtName, value: v.tsid, groupCode: v.cityCode}))
      radioDistrictList.unshift({label: t('common.all'), value: null})
      setDistrictList(radioDistrictList)
    }
	}

  useEffect(() => {
    getSelectList();
  }, [])

  /**
   * 현재 클릭한 버튼에 맞춰 모달 데이터 세팅하고 모달 열기
   */
  const setDataAndOpenModal = (key: string) => {
    const modalData: any = {
      open: true,
      key,
    }

    if(key === 'city') {
      modalData.data = cityList;
      modalData.value = city.value;
      modalData.title = t('mobile.selection_city') //'시단위 선택'
    }
    else if(key === 'district') {
      let data = districtList;
      if(city.value) data = getDistrictList(city.value)
      modalData.data = data;
      modalData.value = district.value;
      modalData.title = t('mobile.selection_district') //'구단위 선택'
    }
    else if(key === 'status') {
      modalData.data = statusOptions;
      modalData.value = status.value;
      modalData.title = ''
    }
    console.log('modalData', modalData)

    setModalData(modalData);
  }

  /**
   * 넘겨받은 code와 맞는 district 리스트 가져오기
   * @param code 
   */
  const getDistrictList = (code: string) => {
    const data = districtList.filter(v => v.groupCode === code);
    data.unshift({label: t('common.all'), value: null});
    return data;
  }

  const setValue = (obj: RadioData, key: string) => {
    if(key === 'city') {
      setCity(obj)
    }
    else if(key === 'district') {
      setDistrict(obj)
    }
    else if(key === 'status') {
      setStatus(obj)
    }
  }

  const searchEvent = () => {
    const params = {
      cityCode: city.value,
      idCodeTsid: district.value,
      stationStatus: status.value,
      searchKeyword,
    }
    onSearch?.(params);
  }
  
  return (
    <>
      <section className="section mt1.5">
        <div className="m-search-group">
          <div className="in-select-btn">
            <Button 
              size={"small"} 
              fillMode="flat"
              onClick={() => setDataAndOpenModal('city')}
            >
              {city.label}
            </Button>
          </div>
          <div className="in-select-btn">
            <Button 
              size={"small"} 
              fillMode="flat"
              onClick={() => setDataAndOpenModal('district')}
            >
              {district.label}
            </Button>
          </div>
          <div className="in-select-btn">
            <Button 
              size={"small"} 
              fillMode="flat"
              onClick={() => setDataAndOpenModal('status')}
            >
              {status.label}
            </Button>
          </div>
          <div className="inner-item type-icon">
            <Input 
              name={'searchKeyword'}
              placeholder={t('mobile.required_search')} //"검색어를 입력해주세요."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.value)}
            />
            <Button
              size={"small"}
              fillMode="flat"
              className="btn-icon"
              onClick={searchEvent}
            >
              <i className="icon icon-glass"></i>
            </Button>
          </div>
        </div>
      </section>
      {
        modalData.open &&
        <SelectPopup 
          modalData={modalData}
          setValue={setValue}
          onClose={() => setModalData((prevState: any) => {
            return {
              ...prevState,
              open: false,
            }
          })}
        />
      }
    </>
  );
}
