/**
 * 스테이션 초기 설정 - 배출 우선순위 Component
 * URL: /station/config/init - 배출 우선순위
 */

/* React */
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import CustomSelect from "@/new_components/form/CustomSelect"
import FormField from "@/new_components/common/FormField";

/* Type */
import { DischargeCriteria } from "@/utils/apiService/type/station/StationConfigDto"

export default function EmissionPriorityInfo(props: any) {
  const {t} = useTranslation();
  const { list=[] } = props;

  const [smcnfdisList, setSmcnfdisList] = useState<any[]>([]) //SOC, SOH, 누적교환횟수
  const [smcnfdisvalList, setSmcnfdisvalList] = useState<any[]>([]) //높은순, 낮은순

  const setInit = async() => {
    const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFDIS'});
    if(Array.isArray(res.data)) setSmcnfdisList(res.data)

    const res2 = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFDISVAL'});
    if(Array.isArray(res2.data)) setSmcnfdisvalList(res2.data)
  }

  useEffect(() => {
    setInit()
  }, [])

  return (
    <>
      {/* 배출 우선순위 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">
            {/* 배출 우선순위 */}
            {t('station.discharge_priority')}
          </h3>
        </div>

        <table className="tbl-base">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "23%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "23%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "24%" }} />
          </colgroup>
          <tbody>
            <tr>
              {
                list.map((v: DischargeCriteria, i: number) => {
                  return (
                    <Fragment key={`discharge_array_${i}`}>
                      <th scope="row">
                        {t('station.priority', {index: v.priority})}
                      </th>
                      <td>
                        <div className="row flex-gap-0.5">
                          <div className="col-6">
                            <FormField
                              name={`dischargeCriteriaList[${i}].criteriaCode`}
                              data={smcnfdisList}
                              component={CustomSelect}
                            />
                          </div>
                          <div className="col-5">
                            <FormField
                              name={`dischargeCriteriaList[${i}].valueCode`}
                              data={smcnfdisvalList}
                              component={CustomSelect}
                            />
                          </div>
                        </div>
                      </td>
                    </Fragment>
                  )
                })
              }
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
