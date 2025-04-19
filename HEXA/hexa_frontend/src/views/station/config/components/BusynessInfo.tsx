/**
 * 스테이션 초기 설정 - 번잡도 Component
 * URL: /station/config/init - 번잡도
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import CustomSelect from "@/new_components/form/CustomSelect"
import { TIME_ARRAY } from '@/views/station/constants';
import FormField from "@/new_components/common/FormField";

/* Type */
import { CongestionCriteria } from "@/utils/apiService/type/station/StationConfigDto"

export default function BusynessInfo(props: any) {
  const {t} = useTranslation();
  const { list, onChange } = props;

  const [smcnfcogList, setSmcnfcogList] = useState<any[]>([]) //번잡도(1,2,3,4,5)

  const setInit = async() => {
    const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCNFCOG'});
    if(Array.isArray(res.data)) setSmcnfcogList(res.data)
  }

  useEffect(() => {
    setInit()
  }, [])

  return (
    <>
      {/* 번잡도 */}
      <section className="section">

        <div className="title-group">
          <h3 className="t-title">
            {t('station.congestion_level') /* 번잡도 */}
          </h3>
          <div className="title-group__txt">
            <span className="c-red">
              {/* ※ 번잡도 숫자가 높을수록 번잡합니다. */}
              {`※ ${t('station.congestion_level_info2')}`}
            </span>
          </div>
        </div>

        <div>
          <table className="tbl-base">
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
                  list.map((v: CongestionCriteria, i: number) => {
                    if(i < 12) {
                      return (
                        <td key={`smcnfcog_array_${i}`}>
                          <FormField 
                            name={`congestionCriteriaList[${i}].congestionLevelCode`}
                            data={smcnfcogList}
                            component={CustomSelect}
                          />
                        </td>
                      ) 
                    }
                  })
                }
              </tr>
            </tbody>
          </table>
          <table className="tbl-base">
            <thead>
              <tr>
                <th>
                  {t('station.time_zone') /* 시간대 */}
                </th>
                {
                  TIME_ARRAY.map((v: string, i: number) => {
                    if(i >= 12) return <th key={`time_array_${i}`}>{v}</th>
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
                  list.map((v: CongestionCriteria, i: number) => {
                    if(i >= 12) {
                      return (
                        <td key={`smcnfcog_array_${i}`}>
                          <FormField 
                            name={`congestionCriteriaList[${i}].congestionLevelCode`}
                            data={smcnfcogList}
                            component={CustomSelect}
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

      </section>
    </>
  );
}
