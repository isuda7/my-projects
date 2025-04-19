/**
 * 스테이션 정보 상세 - 설정 정보 -> 온도범위 Component
 * URL: /station/info/management/detail/detail - 설정정보 -> 온도범위
 */

/* React */
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { FormRenderProps  } from "@progress/kendo-react-form";

/* Common */
import { MONTHS } from "@/views/station/constants"

export default function TemperatureRangeInfo(props: any) {
  const {t} = useTranslation();
  const formProps: FormRenderProps = props.formProps;

  return (
    <>
      {/* 온도 정보 */}
      <section className="section">
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
                {t('station.temperature_range')/* 온도 범위 */}
              </th>
              <td colSpan={7}>
                <div className="tbl-inner type-header-line">
                  <table>
                    <colgroup>
                      {new Array(12).fill(null).map((v:any, i:number) => <col key={`col_top_key_${i}`} style={{ width: "8%" }} />)}
                    </colgroup>
                    <thead>
                      <tr>
                        {
                          MONTHS.map((v, i) => {
                            if(i < 6) {
                              return (
                                <th key={`th_temp_${i}`} scope="col" colSpan={2}>{t(`date.${v}`)}</th>
                              )
                            }
                          })
                        }
                      </tr>
                      <tr>
                        {
                          new Array(6).fill(null).map((v:any, i:number) => {
                            return (
                              <Fragment key={`temper_top_title_${i}`}>
                                <th scope="col">
                                  {t('station.min_temperature')/* 최저 온도 */}
                                </th>
                                <th scope="col">
                                  {t('station.max_temperature')/* 최고 온도 */}
                                </th>
                              </Fragment>
                            )
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {
                          new Array(12).fill(null).map((v:any, i:number) => {
                            if(i<6) {
                              return (
                                <Fragment key={`temper_value_key_${i}`}>
                                  <td>{formProps.valueGetter(`config.temperatureRange[${i}].minTemperature`)}</td>
                                  <td>{formProps.valueGetter(`config.temperatureRange[${i}].maxTemperature`)}</td>
                                </Fragment>
                              )
                            }
                          })
                        }
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tbl-inner type-header-line">
                  <table>
                    <colgroup>
                      {new Array(12).fill(null).map((v:any, i:number) => <col key={`col_bottom_key_${i}`} style={{ width: "8%" }} />)}
                    </colgroup>
                    <thead>
                      <tr>
                        {
                          MONTHS.map((v, i) => {
                            if(i >= 6) {
                              return (
                                <th key={`th_temp_${i}`} scope="col" colSpan={2}>{t(`date.${v}`)}</th>
                              )
                            }
                          })
                        }
                      </tr>
                      <tr>
                        {
                          new Array(6).fill(null).map((v:any, i:number) => {
                            return (
                              <Fragment key={`temper_bottom_title_${i}`}>
                                <th scope="col">
                                  {t('station.min_temperature')/* 최저 온도 */}
                                </th>
                                <th scope="col">
                                  {t('station.max_temperature')/* 최고 온도 */}
                                </th>
                              </Fragment>
                            )
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {
                          new Array(12).fill(null).map((v:any, i:number) => {
                            if(i >= 6) {
                              return (
                                <Fragment key={`temper_value_key_${i}`}>
                                  <td>{formProps.valueGetter(`config.temperatureRange[${i}].minTemperature`)}</td>
                                  <td>{formProps.valueGetter(`config.temperatureRange[${i}].maxTemperature`)}</td>
                                </Fragment>
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
          </tbody>
        </table>
      </section>
    </>
  );
}
