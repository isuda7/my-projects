/**
 * 스테이션 설정 변경,상세 - 제어정보의 선택에 따라 달라져보이는 Component
 * URL: /station/config/management/add
 * URL: /station/config/management/detail
 */

/* React */
import { useEffect, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { RadioGroup } from "@progress/kendo-react-inputs";
import { FormRenderProps  } from "@progress/kendo-react-form";
import FormNumericTextBox from "@/components/kendo/form/FormNumericTextBox";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import FormField from "@/new_components/common/FormField";
import CustomSelect from "@/new_components/form/CustomSelect";

export default function ConfigControl(props: any) {
  const {t} = useTranslation();
  const formProps: FormRenderProps = props.formProps;
  const { initData, disabled=false } = props;
  const { temperatureCriteriaList } = initData;

  //충전순서기준 Data
  const [chargeOrderCodes, setChargeOrderCodes ] = useState<any[]>([]);
  //사용가능 전력량 data
  const [powCapCodes, setPowCapCodes ] = useState<any[]>([]);

  const setInit = async() => {
    const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFPRM'});
    if(Array.isArray(res.data)) {
      const processCodes = res.data?.map(v => ({label: v.value, value: v.code}))
      setChargeOrderCodes(processCodes)
    }

    const res3 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMPWCKIND'});
    if(Array.isArray(res3?.data)) setPowCapCodes(res3.data)
  }

  useEffect(() => {
    setInit()
  }, [])

  /**
   * configCode 의 상태에따라 보여지는 컴포넌트 리스트 달라짐
   * 온도범위(TMPRNG), 충전순서기준(CHGORD), 사용가능 전력량(PWRCAP), 
   * 배출가능SOC(PRMSOC), 시스템작업모드(SOMODE)
   */
  //console.log('configCode', formProps.valueGetter('configCode'))
  return (
    <>
      {
        formProps.valueGetter('configCode') === 'TMPRNG'?
        <>
          {/* 온도 범위 */}
          <div className="title-group__txt mt1">
            <span className="c-red">
              {/* ※ 스테이션 온도 범위를 설정합니다. */}
              {`※ ${t('station.temperature_control_message')}`}
            </span>
          </div>
          <table className="tbl-base">
            <colgroup>
              {
                new Array(12).fill(null).map((v, i) => <col key={`colgroup_top_${i}`} style={{ width: "8%" }} />)
              }
            </colgroup>
            <thead>
              <tr>
                {
                  temperatureCriteriaList.map((v:any, i:number) => {
                    if(i < 6) {
                      {/* n월 */}
                      return (
                        <th key={`th_top_${i}`} scope="col" colSpan={2}>
                          {t(`date.${String(v.month).toLowerCase()}`)}
                        </th>
                      )
                    }
                  })
                }
              </tr>
              <tr>
                {
                  new Array(6).fill(null).map((v, i) => (
                    <Fragment key={`th_second_top_${i}`}>
                      <th scope="col">
                        {t('station.min_temperature') /* 최저 온도 */}
                      </th>
                      <th scope="col">
                        {t('station.max_temperature') /* 최고 온도 */}
                      </th>
                    </Fragment>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              <tr>
                {
                  temperatureCriteriaList.map((v:any, i:number) => {
                    if(i < 6) {
                      return (
                        <Fragment key={`td_top_${i}`}>
                          <td>
                            <div className="in-input">
                              <FormField 
                                name={`temperatureCriteriaList[${i}].minTemperature`}
                                regEx={/^-?$|^-?[1-9][0-9]{0,2}$|^0$/}
                                disabled={disabled}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="in-input">
                              <FormField 
                                name={`temperatureCriteriaList[${i}].maxTemperature`}
                                regEx={/^-?$|^-?[1-9][0-9]{0,2}$|^0$/}
                                disabled={disabled}
                              />
                            </div>
                          </td>
                        </Fragment>
                      )
                    }
                  })
                }
              </tr>
            </tbody>
          </table>
          <table className="tbl-base">
            <colgroup>
              {
                new Array(12).fill(null).map((v, i) => <col key={`colgroup_bottom_${i}`} style={{ width: "8%" }} />)
              }
            </colgroup>
            <thead>
              <tr>
                {
                  temperatureCriteriaList.map((v:any, i:number) => {
                    if(i >= 6) {
                      {/* n월 */}
                      return (
                        <th key={`th_bottom_${i}`} scope="col" colSpan={2}>
                          {t(`date.${String(v.month).toLowerCase()}`)}
                        </th>
                      )
                    }
                  })
                }
              </tr>
              <tr>
                {
                  new Array(6).fill(null).map((v, i) => (
                    <Fragment key={`th_second_bottom_${i}`}>
                      <th scope="col">
                        {t('station.min_temperature') /* 최저 온도 */}
                      </th>
                      <th scope="col">
                        {t('station.max_temperature') /* 최고 온도 */}
                      </th>
                    </Fragment>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              <tr>
                {
                  temperatureCriteriaList.map((v:any, i:number) => {
                    if(i >= 6) {
                      return (
                        <Fragment key={`td_bottom_${i}`}>
                          <td>
                            <div className="in-input">
                              <FormField 
                                name={`temperatureCriteriaList[${i}].minTemperature`}
                                regEx={/^-?$|^-?[1-9][0-9]{0,2}$|^0$/}
                                disabled={disabled}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="in-input">
                              <FormField 
                                name={`temperatureCriteriaList[${i}].maxTemperature`}
                                regEx={/^-?$|^-?[1-9][0-9]{0,2}$|^0$/}
                                disabled={disabled}
                              />
                            </div>
                          </td>
                        </Fragment>
                      )
                    }
                  })
                }
              </tr>
            </tbody>
          </table>
        </>
        :
        formProps.valueGetter('configCode') === 'CHGORD'?
        <>
          {/* 충전 순서 기준 */}
          <div className="title-group__txt mt1">
            <span className="c-red">
              {/* ※ 스테이션내 배터리 충전 순서 기준을 설정합니다. */}
              {`※ ${t('station.charge_order_control_message')}`}
            </span>
          </div>
          <table className="tbl-base">
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "85%" }} />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {t('station.first_order') /* 우선 순서 */}
                  <span className="required">
                    <span className="sr-only">필수</span>
                  </span>
                </th>
                <td>
                  <FormField
                    layout="horizontal"
                    component={RadioGroup}
                    name={'chargeOrderCode'}
                    data={chargeOrderCodes}
                    disabled={disabled}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </>
        :
        formProps.valueGetter('configCode') === 'PRMSOC'?
          <>
            {/* 배출가능 SOC */}
            <div className="title-group__txt mt1">
              <span className="c-red">
                {/* ※ 배출 가능한 SOC를 설정합니다. */}
                {`※ ${t('station.permissible_soc_control_message')}`}
              </span>
            </div>
            <table className="tbl-base">
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "85%" }} />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">
                    {`${t('common.SOC')}(%)` /* SOC(%) */}
                    
                    <span className="required">
                      <span className="sr-only">필수</span>
                    </span>
                  </th>
                  <td>
                    <div className="in-input w200">
                      <FormField
                        name={'permissibleSoc'}
                        regEx={/^(?:100|[1-9]?[0-9])?$/}
                        disabled={disabled}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        :
        formProps.valueGetter('configCode') === 'SOMODE'?
          <div className="title-group__txt mt1"> {/* 시스템 작업모드 */}
            <span className="c-red">
              {/* ※ 스테이션 잠금 상태가 되어 스테이션가 재부팅될 때까지 사용이 제한될 수 있습니다. */}
              {`※ ${t('station.station_limit_message')}`}
            </span>
          </div>
        :
        formProps.valueGetter('configCode') === 'PWRCAP'?
          <>
            {/* 사용가능 전력량 */}
            <div className="title-group__txt mt1">
              <span className="c-red">
                {/* ※ 스테이션의 사용가능 전력량을 설정합니다. */}
                {`※ ${t('station.available_power_control_message')}`}
              </span>
            </div>
            <table className="tbl-base">
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "85%" }} />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">
                    {/* 사용가능 전력량(Wh) */}
                    {`${t('station.available_power')}(Wh)`}
                    <span className="required">
                      <span className="sr-only">필수</span>
                    </span>
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
                        disabled={disabled}
                      />
                      <div className="in-input w200">
                        <div className="inner-item">
                          <FormField
                            name={'powerCapacity'}
                            component={FormNumericTextBox}
                            format={'n0'}
                            disabled={disabled || formProps.valueGetter('powerCapTypeCode') !== 'INPUT'}
                          />
                          <span style={{width: 30}}>Wh</span>
                        </div>
                      </div>
                    </div>
                    {/* <div className="in-input w200">
                      <FormField 
                        name={'powerCapacity'}
                        regEx={/^[0-9]*$/}
                        disabled={disabled}
                      />
                    </div> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        :
        null
      }
    </>
  );
}
