/**
 * 펌웨어 배포 등록, 상세 - 배포일시 Component
 * URL: /station/firmware/deploy/add - 배포일시 항목
 * URL: /station/firmware/deploy/detail - 배포일시 항목
 */

/* React */
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Checkbox } from '@progress/kendo-react-inputs';
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { FormRenderProps } from "@progress/kendo-react-form";

/* Common */
import FormField from "@/new_components/common/FormField";
import CustomSelect from "@/new_components/form/CustomSelect";
import { HOURS, MINUTES } from '@/views/station/constants';
import _ from "lodash";

export default function DeployDateComponent(props: any) {
  const {t} = useTranslation();
  const { disabled = false} = props;
  const formRenderProps: FormRenderProps = props.formRenderProps

  return (
    <div className="row flex-gap-1">
      <div>
        {t('station.date_select') /* 날짜 선택 */}
      </div>
      <div className="datepicker">
        <span className="cell" style={{verticalAlign: 'middle'}}>
          <FormField
            name={'date'}
            component={DatePicker}
            disabled={disabled || formRenderProps.valueGetter('isInstant')}
            format={t("format.date")}
          />
        </span>
      </div>
      <div className="pl1">
        {t('station.time_select') /* 시간 선택 */}
      </div>
      <div className="w100">
        <FormField
          name={'hour'}
          component={CustomSelect}
          data={HOURS}
          defaultItem={{code: null, value: t('station.hour_select')}} //'시 선택'
          disabled={disabled || formRenderProps.valueGetter('isInstant')}
        />
      </div>
      <div className="w100">
        <FormField
          name={'minute'}
          data={MINUTES}
          component={CustomSelect}
          defaultItem={{code: null, value: t('station.minute_select')}} //'시 선택'
          disabled={disabled || formRenderProps.valueGetter('isInstant')}
        />
      </div>
      <div className="w100">
        <FormField
          label={t('station.is_instant')} //"즉시"
          name={'isInstant'}
          component={Checkbox}
          disabled={disabled}
        />
      </div>

    </div>
  );
}
