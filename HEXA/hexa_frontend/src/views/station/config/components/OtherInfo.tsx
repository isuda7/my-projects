/**
 * 스테이션 초기 설정 - 충전순서, 배출가능SOC, OS재부팅주기 Component
 * URL: /station/config/init - 충전순서, 배출가능SOC, OS재부팅주기 항목
 */

import { useEffect, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { FormRenderProps } from "@progress/kendo-react-form";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import CustomSelect from "@/new_components/form/CustomSelect"
import FormField from "@/new_components/common/FormField";
import { HOURS, MINUTES_2_TIME, DAY_OF_WEEK } from "@/views/station/constants";

export default function OtherInfo(props: any) {
  const {t} = useTranslation();
  const formProps: FormRenderProps = props.formProps;

  // const dayOfWeek = OS_DAY_OF_WEEK.map((v: string, i: number) => {
  //   const code = v === 'no_reboot'? null : String(v).toUpperCase();
  //   const value = t(`station.${v}`);
  //   return {code, value}
  // })

  const [smcnfprmList, setSmcnfprmList] = useState<any[]>([]) //순서

  const setInit = async() => {
    const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFPRM'});
    if(Array.isArray(res.data)) setSmcnfprmList(res.data)
  }

  useEffect(() => {
    setInit()
  }, [])

  const onChangeRebootCycle = (e: any) => {
    if(e.value) {
      formProps.onChange('rebootCriteria.isNoneReboot', {value: false})
    }
    else {
      formProps.onChange('rebootCriteria.isNoneReboot', {value: true})
    }
  }

  return (
    <div className="row mt3">
      <div className="col-4">
        {/* 충전 순서 기준 */}
        <section className="section">
          <div className="title-group">
            <h3 className="t-title">
              {/* 충전 순서 기준 */}
              {t('station.charge_order_code')}
            </h3>
          </div>
          <div className="row flex-gap-0.5">
            <div className="w200">
              <FormField 
                name={'chargeOrderCode'}
                data={smcnfprmList}
                component={CustomSelect}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="col-4">
        {/* 배출가능 SOC(%) */}
        <section className="section">
          <div className="title-group">
            <h3 className="t-title">
              {/* 배출가능 SOC(%) */}
              {`${t('station.permissible_soc')}(%)`}
            </h3>
          </div>
          <div className="row flex-gap-0.5">
            <div className="w200">
              <FormField 
                name={'permissibleSoc'}
                regEx={/^(?:100|[1-9]?[0-9])?$/}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="col-4">
        {/* OS 재부팅 주기 */}
        <section className="section">
          <div className="title-group">
            <h3 className="t-title">
              {/* OS 재부팅 주기 */}
              {t('station.os_reboot_cycle')}
            </h3>
          </div>
          <div className="row flex-gap-0.5">
            <div className="w200">
              <FormField 
                name={`rebootCriteria.rebootCycle`}
                data={DAY_OF_WEEK}
                component={CustomSelect}
                onChange = {onChangeRebootCycle}
                noSelectDefault = {true}
              />
            </div>
            <div className="w110">
              <FormField 
                name={`rebootCriteria.rebootCycleHour`}
                data={HOURS}
                component={CustomSelect}
                disabled={formProps.valueGetter('rebootCriteria.isNoneReboot')}
              />
            </div>
            <div className="w110">
              <FormField 
                name={`rebootCriteria.rebootCycleMinute`}
                data={MINUTES_2_TIME}
                component={CustomSelect}
                disabled={formProps.valueGetter('rebootCriteria.isNoneReboot')}
              />
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
