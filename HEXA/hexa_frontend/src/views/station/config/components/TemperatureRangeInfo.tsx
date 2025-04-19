/**
 * 스테이션 초기 설정 - 온도범위 Component
 * URL: /station/config/init - 온도범위
 */

import { useEffect, Fragment } from "react";
import { useTranslation } from "react-i18next";

/* Common */
import FormField from "@/new_components/common/FormField";

/* Type */
import { TemperatureCriteria } from "@/utils/apiService/type/station/StationConfigDto"

export default function TemperatureRangeInfo(props: any) {
  const {t} = useTranslation();
  const { list } = props;

  useEffect(() => {
    
  }, [])

  return (
    <>
      {/* 온도범위 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">
            {t('station.temperature_range') /* 온도 범위 */}
          </h3>
        </div>
        {
          (list && list.length > 0) &&
            <div>
              <table className="tbl-base">
                <colgroup>
                  { new Array(12).fill(null).map((v, i) => <col key={`colgroup_top_${i}`} style={{ width: "8%" }} />)}
                </colgroup>
                <thead>
                  <tr>
                    {
                      list.map((v:any, i:number) => {
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
                      Array(6).fill(null).map((v: null, i: number) => 
                        <Fragment key={`min_max_tempe_array_${i}`}>
                          <th>
                            {t('station.min_temperature') /* 최저 온도 */}
                          </th>
                          <th>
                            {t('station.max_temperature') /* 최고 온도 */}
                          </th>
                        </Fragment>
                      )
                    }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {
                      list.map((v: TemperatureCriteria, i: number) => {
                        if(i < 6) {
                          return (
                            <Fragment key={`temp_value_${i}`}>
                              <td className="txt-center">
                                <FormField 
                                  name={`temperatureCriteriaList[${i}].minTemperature`}
                                  regEx={/^-?$|^-?[1-9][0-9]{0,2}$|^0$/}
                                />
                              </td>
                              <td className="txt-center">
                                <FormField 
                                  name={`temperatureCriteriaList[${i}].maxTemperature`}
                                  regEx={/^-?$|^-?[1-9][0-9]{0,2}$|^0$/}
                                />
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
                  { new Array(12).fill(null).map((v, i) => <col key={`colgroup_bottom_${i}`} style={{ width: "8%" }} />)}
                </colgroup>
                <thead>
                  <tr>
                   {
                      list.map((v:any, i:number) => {
                        if(i >= 6) {
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
                      Array(6).fill(null).map((v: null, i: number) => 
                        <Fragment key={`min_max_tempe_array_${i+7}`}>
                          <th>
                            {t('station.min_temperature') /* 최저 온도 */}
                          </th>
                          <th>
                            {t('station.max_temperature') /* 최고 온도 */}
                          </th>
                        </Fragment>
                      )
                    }
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {
                      list.map((v: TemperatureCriteria, i: number) => {
                        if(i >= 6) {
                          return (
                            <Fragment key={`temp_value_${i}`}>
                              <td className="txt-center">
                                <FormField 
                                  name={`temperatureCriteriaList[${i}].minTemperature`}
                                  regEx={/^-?$|^-?[1-9][0-9]{0,2}$|^0$/}
                                />
                              </td>
                              <td className="txt-center">
                                <FormField 
                                  name={`temperatureCriteriaList[${i}].maxTemperature`}
                                  regEx={/^-?$|^-?[1-9][0-9]{0,2}$|^0$/}
                                />
                              </td>
                            </Fragment>
                          )
                        }
                      })
                    }
                  </tr>
                </tbody>
              </table>
            </div>
        }
      </section>
    </>
  );
}
