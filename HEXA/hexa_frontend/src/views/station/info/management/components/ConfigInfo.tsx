/**
 * 교환기 정보 등록,상세 - 설정정보 Component
 * URL: /station/info/management/detail/add - 설정정보
 * URL: /station/info/management/detail/detail - 설정정보
 */

/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Field, FormRenderProps  } from "@progress/kendo-react-form";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import CustomSelect from "@/new_components/form/CustomSelect"
import { TIME_ARRAY, DAY_OF_WEEK, HOURS, MINUTES_2_TIME } from '@/views/station/constants';

/* Type */
import { CongestionCriteria } from "@/utils/apiService/type/station/StationConfigDto"

export default function ConfigInfo(props: any) {
  const {t} = useTranslation();
  const formProps: FormRenderProps = props.formProps;
  const { initData } = props;
  const { disChargeCriteriaList, congestionCriteriaList } = initData.config;
  const statusCode = initData? initData.statusCode : undefined;
  
  //상태 미사용(UNUSED)일 경우 disabled
  //const configDisabled = statusCode && statusCode === 'UNUSED'? 'dropdown-disabled' : '';
  const configDisabled = statusCode && statusCode === 'UNUSED'? true : false;

  const [smcnfdisList, setSmcnfdisList] = useState<any[]>([]) //SOC, SOH, 누적교환횟수
  const [smcnfdisvalList, setSmcnfdisvalList] = useState<any[]>([]) //높은순, 낮은순
  const [smcnfcogList, setSmcnfcogList] = useState<any[]>([]) //번잡도(1,2,3,4,5)

  const [smcnfprm, setSmcnfprm] = useState<any[]>([]) //충전순서기준

  const onChangeRebootCycle = (e: any) => {
    const value = e.value;
    if(!value) formProps.onChange('config.rebootCriteria.isNoneReboot', {value: true})
    else formProps.onChange('config.rebootCriteria.isNoneReboot', {value: false})
  }

  const setInit = async() => {
    const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFDIS'});
    if(Array.isArray(res.data)) setSmcnfdisList(res.data)

    const res2 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFDISVAL'});
    if(Array.isArray(res2.data)) setSmcnfdisvalList(res2.data)

    const res3 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFCOG'});
    if(Array.isArray(res3.data)) setSmcnfcogList(res3.data)

    //운영중(OPER) 일 때마 충전순서기준 코드값 가져옴
    if(statusCode && statusCode === 'OPER') {
      const res4 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFPRM'});
      if(Array.isArray(res4.data)) setSmcnfprm(res4.data)
    }
  }

  useEffect(() => {
    setInit()
  }, [])

  /**
   * 충전순서기준 이름값 가져오기
   * @param code 
   * @returns 
   */
  const getChargeOrderValue = (code: string) => {
    let value = '';
    for(let i=0; i<smcnfprm.length; i++) {
      if(smcnfprm[i].code === code) {
        value = smcnfprm[i].value;
        break;
      }
    }
    return value;
  }

  return (
    <>
      {/* 설정 정보 */}
      <section className="section">
        <h3 className="t-title">{t('station.settings_info')}</h3>

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
                {/* 배출 우선순위 */}
                {t('station.discharge_priority')}
              </th>
              <td colSpan={7} className="px0">
                <div className="cell-line">
                {
                  disChargeCriteriaList?.map((v: any, i: number) => 
                    <div className="row flex-gap-0.5" key={`td_key_${i}`}>
                      <span className="col-2">
                        {
                          i === 0? t('station.first_priority') :
                          i === 1? t('station.second_priority') :
                          t('station.third_priority')
                        }
                        {/* {formProps.valueGetter(`config.disChargeCriteriaList[${i}].priority`)}순위 */}
                      </span>
                      <Field 
                        name={`config.disChargeCriteriaList[${i}].criteriaCode`}
                        component={CustomSelect} 
                        data={smcnfdisList}
                        //className={[configDisabled, 'col-5']}
                        disabled={configDisabled}
                        className={'col-5'}
                        noSelectDefault={true}
                      />
                      <Field 
                        name={`config.disChargeCriteriaList[${i}].valueCode`}
                        component={CustomSelect} 
                        data={smcnfdisvalList}
                        //className={[configDisabled, 'col-4']}
                        disabled={configDisabled}
                        className={'col-4'}
                        noSelectDefault={true} 
                      />
                    </div>
                  )
                }
                </div>
              </td>
            </tr>
            <tr>
              <th>
                {t('station.congestion_level') /* 번잡도 */}
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
                <div className="t-desc">
                  {/* ※번잡도 숫자가 높을수록 해당 시간대가 번잡함을 의미합니다. */}
                  {`※${t('station.congestion_level_info')}`}
                </div>
              </th>
              <td colSpan={7}>
                <div className="tbl-inner">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          {t('station.time_zone') /* 시간대 */}
                        </th>
                        {
                          TIME_ARRAY.map((v: string, i: number) => {
                            if(i < 12) return <th key={`time_array_${i}`}>{v}</th>
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {t('station.step') /* 단계 */}
                        </td>
                        {
                          congestionCriteriaList.map((v: CongestionCriteria, i: number) => {
                            if(i < 12) {
                              return (
                                <td key={`smcnfcog_array_${i}`}>
                                  <Field 
                                    name={`config.congestionCriteriaList[${i}].congestionLevelCode`}
                                    component={CustomSelect} 
                                    data={smcnfcogList}
                                    disabled={configDisabled}
                                    noSelectDefault={true}
                                    //className={configDisabled}
                                  />
                                </td>
                              ) 
                            }
                          })
                        }
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tbl-inner">
                  <table>
                    <thead>
                      <tr>
                        <th>{t('station.time_zone') /* 시간대 */}</th>
                        {
                          TIME_ARRAY.map((v: string, i: number) => {
                            if(i >= 12) return <th key={`time_array_${i}`}>{v}</th>
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{t('station.step') /* 단계 */}</td>
                        {
                          congestionCriteriaList.map((v: CongestionCriteria, i: number) => {
                            if(i >= 12) {
                              return (
                                <td key={`smcnfcog_array_${i}`}>
                                  <Field 
                                    name={`config.congestionCriteriaList[${i}].congestionLevelCode`}
                                    component={CustomSelect} 
                                    data={smcnfcogList}
                                    disabled={configDisabled}
                                    noSelectDefault={true}
                                    //className={configDisabled}
                                  />
                                </td>
                              ) 
                            }
                          })
                        }
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                {t('station.os_reboot_cycle') /* OS 재부팅 주기 */}
              </th>
              <td colSpan={(statusCode && statusCode === 'OPER')? 3 : 7}>
                <div className="row flex-gap-0.5">
                  <Field 
                    name={`config.rebootCriteria.rebootCycle`}
                    component={CustomSelect} 
                    data={DAY_OF_WEEK}
                    //className={[configDisabled, "w150"]}
                    onChange={e => onChangeRebootCycle(e)}
                    noSelectDefault={true}

                    disabled={configDisabled}
                    className={'w150'}
                  />
                  <Field 
                    name={`config.rebootCriteria.rebootCycleHour`}
                    component={CustomSelect} 
                    data={HOURS}
                    className={"w150"}
                    disabled={configDisabled || formProps.valueGetter('config.rebootCriteria.isNoneReboot')}
                    // className={[configDisabled, "w150"]}
                    // disabled={formProps.valueGetter('config.rebootCriteria.isNoneReboot')}
                  />
                  <Field 
                    name={`config.rebootCriteria.rebootCycleMinute`}
                    component={CustomSelect} 
                    data={MINUTES_2_TIME}
                    className={"w150"}
                    disabled={configDisabled || formProps.valueGetter('config.rebootCriteria.isNoneReboot')}
                    // className={[configDisabled, "w150"]}
                    // disabled={formProps.valueGetter('config.rebootCriteria.isNoneReboot')}
                  />
                </div>
              </td>
              {
                //운영중일 경우만 해당 항목나옴
                (statusCode && statusCode === 'OPER') &&
                <>
                  <th scope="row">
                    {/* 배출가능 SOC (%) */}
                    {t('station.permissible_soc')} (%)
                  </th>
                  <td>{formProps.valueGetter('config.permissibleSoc')}</td>
                  <th scope="row">
                    {/* 충전 순서 기준 */}
                    {t('station.charge_order_code')}
                  </th>
                  <td>{getChargeOrderValue(formProps.valueGetter('config.chargeOrderCode'))}</td>
                </>
              }
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
