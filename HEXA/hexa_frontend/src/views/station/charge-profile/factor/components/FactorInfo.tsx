/**
 * 충전프로파일 Factor 등록,상세 > 충전 프로파일 Factor 정보 Component
 * URL: /station/charge-profile/factor/add > 충전 프로파일 Factor 정보
 * URL: /station/charge-profile/factor/detail > 충전 프로파일 Factor 정보
 */

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { FormRenderProps  } from "@progress/kendo-react-form";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import CustomSelect from "@/new_components/form/CustomSelect";
import NumberInput from "@/components/kendo/form/NumberInput";
import useAlert from "@/hooks/useAlert";
import FormField from "@/new_components/common/FormField";

export default function ChargeProfileInfo(props: any) {
  const showAlert = useAlert()
  const {t} = useTranslation();
  const formProps: FormRenderProps = props.formProps;

  const [factorCodes, setFactorCodes] = useState<any[]>([]) //SMCHGFCT, 충전팩터 코드
  const [congestionCodes, setCongestionCodes] = useState<any[]>([]) //SMCNFCOG, 번잡도 범위

  const setInit = async() => {
    const codeRes = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCHGFCT'})
    if(Array.isArray(codeRes.data)) setFactorCodes(codeRes.data);

    const codeRes2 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFCOG'})
    if(Array.isArray(codeRes2.data)) setCongestionCodes(codeRes2.data);
  }

  useEffect(() => {
    setInit()
  }, [])

  return (
    
    <>
      {/* 충전 프로파일 Factor 정보 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">
            {t('station.charge_profile_factor_info')}
          </h3>
        </div>

        <table className="tbl-base">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "90%" }} />
          </colgroup>
          <tbody>
            {
              formProps.valueGetter('id') && 
              <tr>
                <th scope="row">Factor</th>
                <td>{formProps.valueGetter('id')}</td>
              </tr>
            }
            <tr>
              <th scope="row">
                {t('station.category') /* 구분 */}
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
              </th>
              <td>
                <FormField
                  name={"chargeFactorCode"}
                  component={CustomSelect}
                  data={factorCodes}
                  validation={true}
                  className="w200"
                />
              </td>
            </tr>
            <tr>
              {
                formProps.valueGetter('chargeFactorCode') === 'CGST'?
                  <>
                    <th scope="row">
                      {/* 번잡도 */}
                      {t('station.congestion_level')}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <FormField
                        name={"congestionLevelCode"}
                        component={CustomSelect}
                        data={congestionCodes}
                        validation={true}
                        className="w200"
                      />
                    </td>
                  </>
                :
                  <>
                    <th scope="row">
                      {t('station.range') /* 범위 */}
                      <span className="required">
                        <span className="sr-only">필수</span>
                      </span>
                    </th>
                    <td>
                      <div className="in-input row flex-gap-0.5">
                        <FormField
                          name={"minValue"}
                          component={NumberInput}
                          validation={true}
                          className="w200"
                          wrapperStyle={{}}
                        />
                        ~ 
                        <FormField
                          name={"maxValue"}
                          component={NumberInput}
                          validation={true}
                          className="w200"
                          wrapperStyle={{}}
                        />
                      </div>
                    </td>
                  </>
              }
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
