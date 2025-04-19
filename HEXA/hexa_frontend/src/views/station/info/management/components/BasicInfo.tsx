/**
 * 스테이션 정보 등록 - 기본정보 Component
 * URL: /station/info/management/detail/add - 기본정보
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

import FormField from "@/new_components/common/FormField";
import PhotoUpload from "./PhotoUpload";
import NumberInput from "@/components/kendo/form/NumberInput";

export default function BasicInfo(props: any) {
  const showAlert = useAlert()
  const {t} = useTranslation();
  const formProps: FormRenderProps = props.formProps;
  const { slotCount, setNameDupliCheck, validatorFunction, files, setFiles } = props;

  const [smcustList, setSmcustList] = useState<any[]>([]) //SMCUST, 고객구분
  const [citys, setCitys] = useState<any[]>([]) //시 목록
  const [districts, setDistricts] = useState<any[]>([]) //구 목록
  const [powCapCodes, setPowCapCodes] = useState<any[]>([]) //사용가능 전력량 SelectBox

  // const validateNumberInput = (event: any) => {
  //   const regex = /^\d{0,3}(\.\d{0,4})?$/; // 정수3자리 소숫점4자리 숫자만가능
  //   const value = event.target.value;

  //   if (!regex.test(value)) {
  //     event.preventDefault(); // 값이 정규식에 맞지 않으면 값이 업데이트되지 않도록 방지
  //   }
  // };

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
  }

  useEffect(() => {
    setInit()
  }, [])

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
    const res = await StationApiService().getDistrictListByCityCode(e.value);
    if(Array.isArray(res?.data)) {
      const list = res?.data?.map(v => ({tsid: v.tsid, code: v.districtCode, value: v.districtName}))
      setDistricts(list)
    }
  }

  const onChangeDistrict = (e: any) => {
    const tsid = districts.find(v => v.code === e.value).tsid;
    formProps.onChange('idCodeTsid', {value: tsid})
  }

  // const addressValidator = (value: any, field: string) => {
  //   const cityCode = formProps.valueGetter('cityCode');
  //   const districtCode = formProps.valueGetter('districtCode');
  //   const address = formProps.valueGetter('address');
  //   console.log('values', cityCode, districtCode, address)
  //   if(!cityCode || !districtCode || !address) {
  //     return ' ';
  //   }
  // }

  // const isFormTouched = formProps.touched; // 폼 전체가 터치된 상태 확인
  // const generalError = formProps.errors?.generalError && isFormTouched;

  return (
    
    <>
      {/* 기본 정보 */}
      <section className="section">
        <h3 className="t-title">
          {t('station.basic_info') /* 기본 정보 */}
        </h3>

        <table className="tbl-base">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <tbody>
            <tr>
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
                    {/* <Field
                      name={'name'}
                      component={Input}
                      onChange={() => {
                        setNameDupliCheck(false)
                      }}
                      validator={requiredValidator}
                    /> */}
                    <FormField
                      name={'name'}
                      onChange={() => {
                        setNameDupliCheck(false)
                      }}
                      validation={true}
                    />
                    <Button
                      size={"medium"}
                      fillMode="outline"
                      type="button"
                      onClick={checkDuplication}
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
                <div>
                  <FormField
                    name={'customerCode'}
                    component={CustomSelect}
                    data={smcustList}
                    validation={true}
                  />
                  {/* <Field 
                    name="customerCode" 
                    component={CustomSelect} 
                    data={smcustList}
                    defaultItem={{code: null, value: '선택'}}
                    validator={requiredValidator}
                  /> */}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" rowSpan={2}>
                {t('common.address') /* 주소 */}
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
              </th>
              <td rowSpan={2} colSpan={3}>
                <div className="in-address">
                  {/* <Field 
                    name="cityCode" 
                    component={CustomSelect} 
                    data={citys}
                    className="w200"
                    onChange={(e) => onChangeCitys(e)}
                    defaultItem={{code: null, value: '시 선택'}}
                    validator={requiredValidator}
                  /> */}
                  <FormField
                    name={'cityCode'}
                    component={CustomSelect}
                    data={citys}
                    className="w200"
                    wrapperStyle={{width: 'auto'}}
                    onChange={(e: any) => onChangeCitys(e)}
                    defaultItem={{code: null, value: t('station.select_city')}} //시 선택
                    validation={true}
                  />
                  <FormField
                    name="districtCode" 
                    component={CustomSelect}
                    data={districts}
                    className="w200"
                    wrapperStyle={{width: 'auto'}}
                    onChange={(e: any) => onChangeDistrict(e)}
                    defaultItem={{code: null, value: t('station.select_district')}} //구 선택
                    validation={true}
                  />
                  {/* <Field 
                    name="districtCode" 
                    component={CustomSelect}
                    data={districts}
                    className="w200"
                    onChange={(e) => onChangeDistrict(e)}
                    defaultItem={{code: null, value: '구 선택'}}
                    validator={requiredValidator}
                  /> */}
                  <div className="in-input">
                    <div className="inner-item">
                      <span>
                        {t('common.street_name') /* 도로명 */}
                      </span>
                      {/* <Field
                        name={'address'}
                        component={Input}
                        validator={requiredValidator}
                      /> */}
                      <FormField
                        name={'address'}
                        validation={true}
                      />
                    </div>
                    <div className="inner-item">
                      <span>
                        {t('common.land_lot') /* 지번 */}
                      </span>
                      {/* <Field
                        name={'landLotAddress'}
                        component={Input}
                        validator={requiredValidator}
                      /> */}
                      <FormField
                        name={'landLotAddress'}
                        validation={true}
                      />
                    </div>
                  </div>
                </div>
                {/* TODO: 추후 요구사항있을 때, Address 필드 아래에만 에러 메시지를 표시 */}
                {/* {(formProps.errors.cityCode || formProps.errors.districtCode || formProps.errors.address) && (
                  <div className="k-form-error k-text-start" style={{ color: 'red' }}>
                    {'All fields are required'}
                  </div>
                )} */}
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
                {/* <Field
                  id={"latitude"}
                  name={"latitude"}
                  component={FormNumericTextBox}
                  validator={[requiredValidator, latLongValidator]}
                  format={{
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 4,
                  }}
                /> */}

                {/* <Field
                  name={'latitude'}
                  component={Input}
                  validator={requiredValidator}
                  //regEx={/^-?$|^-?\d{1,2}(\.\d{0,4})?$/}
                  regEx={/^-?$|^-?\d+(\.\d*)?$/} //(숫자-.) 만 가능
                /> */}
                <FormField
                  name={'latitude'}
                  validation={true}
                  regEx={/^-?$|^-?\d+(\.\d*)?$/} //(숫자-.) 만 가능
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
                  {/* <Field
                    name={'longitude'}
                    component={Input}
                    validator={requiredValidator}
                    //regEx={/^-?$|^-?\d{1,3}(\.\d{0,4})?$/}
                    regEx={/^-?$|^-?\d+(\.\d*)?$/}
                  /> */}
                  <FormField
                    name={'longitude'}
                    validation={true}
                    regEx={/^-?$|^-?\d+(\.\d*)?$/} //(숫자-.) 만 가능
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
              <td>
                <div className="row flex-gap-0.5">
                  <FormField
                    name={'powerCapTypeCode'}
                    component={CustomSelect}
                    data={powCapCodes}
                    validation={true}
                    className="w200"
                    wrapperStyle={{}}
                    noSelectDefault={true}
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
                        component={NumberInput}
                        disabled={formProps.valueGetter('powerCapTypeCode') !== 'INPUT'}
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
                {/* <Field 
                  name="isVisibleAtApp" 
                  component={CustomSelect} 
                  data={[
                    {code: true, value: 'Y'},
                    {code: false, value: 'N'},
                  ]}
                /> */}
                <FormField
                  name={'isVisibleAtApp'}
                  component={CustomSelect}
                  data={[
                    {code: true, value: 'Y'},
                    {code: false, value: 'N'},
                  ]}
                />
              </td>
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
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
