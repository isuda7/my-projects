/**
 * 스테이션 정보 상세 - 기본정보 Component
 * URL: /station/info/management/detail/detail - 기본정보
 */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Label } from "@progress/kendo-react-labels";
import { FormRenderProps  } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationApiService from "@/utils/apiService/StationApiService";
import CustomSelect from "@/new_components/form/CustomSelect";
import useAlert from "@/hooks/useAlert";
import FormNumericTextBox from "@/components/kendo/form/FormNumericTextBox";
import DashboardHistoryModal from "@/views/station/info/management/modal/DashboardHistoryModal";
import StationHistoryModal from "@/views/station/info/management/modal/StationHistoryModal";
import StationConfigHistoryModal from "@/views/station/info/management/modal/StationConfigHistoryModal";
import FormField from "@/new_components/common/FormField";
import { getFormattedTime } from "@/utils/common";
import PhotoUpload from "./PhotoUpload";

export default function BasicDetailInfo(props: any) {
  const showAlert = useAlert()
  const {t} = useTranslation();

  const formProps: FormRenderProps = props.formProps;
  const { initData, slotCount, setNameDupliCheck, validatorFunction, files, setFiles } = props;

  const [smcustList, setSmcustList] = useState<any[]>([]) //SMCUST, 고객구분
  const [citys, setCitys] = useState<any[]>([]) //시 목록
  const [districts, setDistricts] = useState<any[]>([]) //구 목록
  const [powCapCodes, setPowCapCodes] = useState<any[]>([]) //사용가능 전력량 SelectBox
  const [statusList, setStatusList] = useState<any[]>([])

  //Modal Open값 제어
  const [dashboardModalOpen, setDashboardModalOpen] = useState<boolean>(false);
  const [configModalOpen, setConfigModalOpen] = useState<boolean>(false);
  const [stationModalOpen, setStationModalOpen] = useState<boolean>(false);

  const setInit = async() => {
    const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCUST'})
    if(Array.isArray(res.data)) setSmcustList(res.data);

    const res2 = await StationApiService().getCityList();
    if(Array.isArray(res2?.data)) {
      const list = res2?.data?.map(v => ({code: v.cityCode, value: v.cityName}))
      setCitys(list);
    }

    const res3 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMPWCKIND'});
    if(Array.isArray(res3?.data)) setPowCapCodes(res3.data)
      
    //스테이션 상태(SMSTA)
    const smstaRes = await CodeApiService().getCodesByGroupCode({groupCode:'SMSTA'});
    if(Array.isArray(smstaRes?.data)) setStatusList(smstaRes.data)
  }

  useEffect(() => {
    setInit()
  }, [])

  useEffect(() => {
    if(initData && initData.cityCode !== undefined && initData.cityCode !== null) {
      setDistrictList(initData.cityCode)
    }
  }, [initData.cityCode])

  //중복확인
  const checkDuplication = async () => {
    const stationName = formProps.valueGetter('name');

    if(!stationName) {
      //'스테이션명을 입력해 주세요'
      showAlert({message: t('station.enter_station_name')})
      return;
    }
    const res = await StationApiService().getNameDuplicationCheck(stationName);

    if(res.data) {
      //중복된 스테이션명으로 사용이 불가능합니다.
      showAlert({message: t('station.duplicated_station_alert')})
    }
    else {
      //사용할 수 있는 스테이션명 입니다.
      showAlert({message: t('station.possible_station_alert')})
      setNameDupliCheck(true);
    }
  }

  const onChangeCitys = async (e: any) => {
    formProps.onChange('districtCode', {value: null})
    formProps.onChange('idCodeTsid', {value: null})
    setDistrictList(e.value)
  }

  const onChangeDistrict = (e: any) => {
    const tsid = districts.find(v => v.code === e.value).tsid;
    formProps.onChange('idCodeTsid', {value: tsid})
  }

  const setDistrictList = async (value: string) => {
    const res = await StationApiService().getDistrictListByCityCode(value);
    if(Array.isArray(res?.data)) {
      const list = res?.data?.map(v => ({tsid: v.tsid, code: v.districtCode, value: v.districtName}))
      setDistricts(list)
    }
  }

  /**
   * Modal 닫기 Method
   * @param key 닫기를 원하는 Modal의 Key값
   */
  const onCloseModal = (key: string) => {
    if(key === 'dashboard') {
      setDashboardModalOpen(false);
    }
    else if(key === 'config') {
      setConfigModalOpen(false);
    }
    else if(key === 'station') {
      setStationModalOpen(false);
    }
  }

  const setDeletePhotoIds = (id: string) => {
    const newDelIds = formProps.valueGetter('photoIds') || [];
    newDelIds.push(id);
    formProps.onChange('photoIds', {value: newDelIds})
  }

  /**
   * 현재 statusCode 조건에 따라 disabled 상태 조정
   * 등록(REGI) - 미사용여부
   * 운영중(OPER) - 스테이션명, 고객구분, 주소(도로명 지번은 살림), 사용가능 전력량, 기기정보
   * 미사용(UNUSED) - 스테이션명, 고객구분, 주소, 위도, 경도, APP노출여부, 사용가능 전력량, 번잡도, OS재부팅주기
   */
  const statusCode = initData.statusCode;
  const disabledObj = {
    name : (['OPER', 'UNUSED'].includes(statusCode))? true : false, //스테이션 명
    nameButton: (['OPER', 'UNUSED'].includes(statusCode))? true : false, //스테이션 버튼
    customerCode : (['OPER', 'UNUSED'].includes(statusCode))? true : false, //고객구분
    cityCode : (['OPER', 'UNUSED'].includes(statusCode))? true : false, //시
    districtCode : (['OPER', 'UNUSED'].includes(statusCode))?  true : false, //구
    address : statusCode === 'UNUSED'?  true : false, //도로명
    landLotAddress : statusCode === 'UNUSED'?  true : false, //지번
    latitude : statusCode === 'UNUSED'?  true : false, //지번
    longitude : statusCode === 'UNUSED'?  true : false, //지번
    isVisibleAtApp : statusCode === 'UNUSED'?  true : false, //APP노출여부
    powerCapacityWh : (['OPER', 'UNUSED'].includes(statusCode))?  true : false, //사용가능 전력량
    isUnused: statusCode === 'REGI'? true : false,
    photo: statusCode === 'UNUSED'?  true : false, //사진 첨부
  }

  /**
   * 코드받아서 한글명(영문명 반환)
   * @param code 
   */
  const getStatusValue = (code: string) => {
    for(let i=0; i<statusList.length; i++) {
      if(statusList[i].code === code) {
        return statusList[i].value;
      }
    }
  }
  
  return (
    <>
      {/* 기본 정보 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">
            {t('station.basic_info') /* 기본 정보 */}
          </h3>

          <div className="group-align-right gap0.38">
            <Button
              type="button"
              size={"medium"}
              onClick={(e) => setDashboardModalOpen(true)}
            >
              {/* 대시보드 제어 이력 */}
              {t('station.dashboard_control_history')}
            </Button>
            <Button
              type="button"
              size={"medium"}
              onClick={(e) => setConfigModalOpen(true)}
            >
              {/* 설정 변경 이력 */}
              {t('station.settings_change_history')}
            </Button>
            <Button
              type="button"
              size={"medium"}
              onClick={(e) => setStationModalOpen(true)}
            >
              {/* 기기 변경 이력 */}
              {t('station.device_change_history')}
            </Button>
          </div>
        </div>

        <table className="tbl-base">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                {t('station.station_id') /* 스테이션 ID */}
              </th>
              <td>{formProps.valueGetter('id')}</td>
              <th scope="row">
                <Label editorId="name">
                  {t('station.station_name') /* 스테이션명 */}
                  <span className="required">
                    <span className="sr-only">필수</span>
                  </span>
                </Label>
              </th>
              <td colSpan={3}>
                <div className="in-input">
                  <div className="inner-item mw400">
                    <FormField
                      name={'name'}
                      onChange={() => {
                        setNameDupliCheck(false)
                      }}
                      validation={true}
                      disabled={disabledObj.name}
                      //className={disabledObj.name}
                    />
                    <Button
                      size={"medium"}
                      fillMode="outline"
                      type="button"
                      onClick={checkDuplication}
                      disabled={disabledObj.nameButton}
                    >
                      {t('station.check_duplicates') /* 중복 확인 */}
                    </Button>
                  </div>
                </div>
              </td>
              <th scope="row">
                <Label editorId="name">
                  {t('station.customer_category') /* 고객구분 */}
                  <span className="required">
                    <span className="sr-only">필수</span>
                  </span>
                </Label>
              </th>
              <td>
                <FormField
                  name={'customerCode'}
                  component={CustomSelect}
                  data={smcustList}
                  validation={true}
                  //className={disabledObj.customerCode}
                  disabled={disabledObj.customerCode}
                />
              </td>
            </tr>
            <tr>
              <th scope="row" rowSpan={2}>
                {t('common.address') /* 주소 */}
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
              </th>
              <td rowSpan={2} colSpan={5}>
                <div className="in-address">
                  <FormField
                    name={'cityCode'}
                    component={CustomSelect}
                    data={citys}
                    //className={[disabledObj.cityCode, 'w200']}
                    wrapperStyle={{width: 'auto'}}
                    onChange={(e: any) => onChangeCitys(e)}
                    defaultItem={{code: null, value: t('station.select_city')}} //시 선택
                    validation={true}

                    disabled={disabledObj.cityCode}
                    className={'w200'}
                  />
                  <FormField
                    name="districtCode" 
                    component={CustomSelect}
                    data={districts}
                    //className={[disabledObj.districtCode, 'w200']}
                    wrapperStyle={{width: 'auto'}}
                    onChange={(e: any) => onChangeDistrict(e)}
                    defaultItem={{code: null, value: t('station.select_district')}} //구 선택
                    validation={true}
                    disabled={disabledObj.districtCode}
                    className={'w200'}
                  />
                  <div className="in-input">
                    <div className="inner-item">
                      <span>
                        {t('common.street_name') /* 도로명 */}
                      </span>
                      <FormField
                        name={'address'}
                        validation={true}
                        disabled={disabledObj.address}
                        //className={disabledObj.address}
                      />
                    </div>
                    <div className="inner-item">
                      <span>
                        {t('common.land_lot') /* 지번 */}
                      </span>
                      <FormField
                        name={'landLotAddress'}
                        validation={true}
                        disabled={disabledObj.landLotAddress}
                        //className={disabledObj.landLotAddress}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <th scope="row">
                <Label editorId="Latitude">
                  {t('station.latitude') /* 위도 */}
                  <span className="required">
                    <span className="sr-only">필수</span>
                  </span>
                </Label>
              </th>
              <td>
                <div className="in-input">
                <FormField
                  name={'latitude'}
                  validation={true}
                  regEx={/^-?$|^-?\d+(\.\d*)?$/} //(숫자-.) 만 가능
                  disabled={disabledObj.latitude}
                  //className={disabledObj.latitude}
                />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <Label editorId="longitude">
                  {t('station.longitude') /* 경도 */}
                  <span className="required">
                    <span className="sr-only">필수</span>
                  </span>
                </Label>
              </th>
              <td>
                <div className="in-input">
                  <FormField
                    name={'longitude'}
                    validation={true}
                    regEx={/^-?$|^-?\d+(\.\d*)?$/} //(숫자-.) 만 가능
                    disabled={disabledObj.longitude}
                    //className={disabledObj.longitude}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {t('station.slot_count') /* 슬롯개수 */}
              </th>
              <td>{slotCount}</td>
              <th scope="row">
                <Label editorId="wh">
                  {t('station.available_power') /* 사용가능 전력량 */}
                  <span className="required">
                    <span className="sr-only">필수</span>
                  </span>
                </Label>
              </th>
              <td colSpan={3}>
                <div className="row flex-gap-0.5">
                  <FormField
                    name={'powerCapTypeCode'}
                    component={CustomSelect}
                    data={powCapCodes}
                    validation={true}
                    className="w200"
                    wrapperStyle={{}}
                    noSelectDefault={true}
                    disabled={disabledObj.powerCapacityWh}
                  />
                  <div className="in-input w200">
                    <div className="inner-item">
                      {/* <Field
                        name={'powerCapacityWh'}
                        component={NumericTextBox}
                        spinners={false}
                      /> */}
                      {/* <Field
                        id={"powerCapacityWh"}
                        name={"powerCapacityWh"}
                        component={FormNumericTextBox}
                        validator={requiredValidator}
                        format={'n0'}
                      /> */}
                      <FormField
                        name={'powerCapacityWh'}
                        component={FormNumericTextBox}
                        format={'n0'}
                        disabled={disabledObj.powerCapacityWh || formProps.valueGetter('powerCapTypeCode') !== 'INPUT'}
                      />
                      <span style={{width: 30}}>Wh</span>
                    </div>
                  </div>
                </div>
              </td>
              <th scope="row">
                {t('station.app_visibility') /* APP 노출여부 */}
              </th>
              <td>
                <FormField
                  name={'isVisibleAtApp'}
                  component={CustomSelect}
                  data={[
                    {code: true, value: 'Y'},
                    {code: false, value: 'N'},
                  ]}
                  disabled={disabledObj.isVisibleAtApp}
                  //className={disabledObj.isVisibleAtApp}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                {t('station.station_status') /* 스테이션 상태 */}
              </th>
              <td>
                {getStatusValue(formProps.valueGetter('statusCode'))}
              </td>
              <th scope="row">
                {t('station.installation_date') /* 설치일*/}
              </th>
              <td>{getFormattedTime(formProps.valueGetter('installedAt'), t('format.date-uppercase'))}</td>
              <th scope="row">
                {t('station.is_unused') /* 미사용 여부 */}
              </th>
              <td>
                <div>
                  <FormField
                    name={'isUnused'}
                    component={CustomSelect}
                    data={[
                      {code: true, value: 'Y'},
                      {code: false, value: 'N'},
                    ]}
                    disabled={disabledObj.isUnused}
                    //className={disabledObj.isUnused}
                  />
                </div>
              </td>
              <th scope="row">
                {/* 미사용 등록일 */}
                {t('station.unused_registration_date')}
              </th>
              <td>{formProps.valueGetter('unUsedAt')}</td>
            </tr>

            <tr>
              <th scope="row">
                {/* 비고(30자 이내) */}
                {t('station.note_limit_30')}
              </th>
              <td colSpan={7}>
                <div className="in-input">
                  <FormField
                    name={'note'}
                    validation={true}
                    validator={validatorFunction}
                    require={false}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {/* 설치 사진  */}
                {t('station.install_photo')}
                <div className="t-desc">
                  {/* (5MB 이하 최대 3개. png, jpg, jpeg만 가능) */}
                  {t('station.install_photo_des')}
                </div>
              </th>
              <td colSpan={7}>
                <PhotoUpload 
                  files={files}
                  setFiles={setFiles}
                  setDeletePhotoIds = {setDeletePhotoIds}
                  disabled={disabledObj.photo}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      {
        /* 대시보드 제어 이력 */
        dashboardModalOpen && 
        <DashboardHistoryModal
          id={initData?.id}
          name={initData?.name}
          onClose={onCloseModal}
        />
      }
      {
        /* 설정 변경 이력 */
        configModalOpen && 
        <StationConfigHistoryModal
          id={initData?.id}
          name={initData?.name}
          onClose={onCloseModal}
        />
      }
      {
        /* 기기 변경 이력 */
        stationModalOpen && 
        <StationHistoryModal
          id={initData?.id}
          name={initData?.name}
          onClose={onCloseModal}
        />
      }
    </>
  );
}
