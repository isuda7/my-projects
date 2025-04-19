/**
 * 스테이션 정보 상세 - 기기정보 -> 슬롯정보  Component
 * URL: /station/info/management/detail/detail - 기기정보 -> 슬롯정보
 */

/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import {
  Grid,
  GridColumn as Column,
  GridNoRecords,
} from "@progress/kendo-react-grid";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import { getFormattedTime } from "@/utils/common";

const DeviceInfo = (props: any) => {
  const { t } = useTranslation();
  const { device, index } = props;

  //세대정보 코드리스트
  const [smgenList, setSmgenList] = useState<any[]>([])

  //Pivot형태로 가공한 데이터
  const [pivotData, setPivotData] = useState<any[]>([])
  
  useEffect(() => {
    if(device) {
      const fields = [
        { field: 'serialNumber', divide: t('station.slot_serial_number') }, //'슬롯 S/N'
        { field: 'hwVersion', divide: t('station.hw_version') }, //'HW 버전'
        { field: 'manufacturedAt', divide: t('station.production_date') }, //'생산일'
        { field: 'assembledAt', divide: t('station.exchange_datetime') }, //'교환일시'
      ]
        
      const newData = fields.map(obj => {
        const row = { divide : obj.divide } as { [key: string]: any };
        device.slots.forEach((item: any) => {
          if(obj.field === 'manufacturedAt') {
            row[`slot${item.slotNumber}`] = getFormattedTime(item[obj.field], t('format.date-uppercase'));
          }
          else if(obj.field === 'assembledAt') {
            row[`slot${item.slotNumber}`] = getFormattedTime(item[obj.field], t('format.date-time-uppercase'));
          }
          else {
            row[`slot${item.slotNumber}`] = item[obj.field];
          }
        })
        return row;
      })
      setPivotData(newData);
    }
  }, [device])

  const setGenerationCode = async() => {
    const res = await CodeApiService().getCodesByGroupCode({groupCode: 'SMGEN'})
    if(Array.isArray(res.data)) setSmgenList(res.data);
  }

  useEffect(() => {
    setGenerationCode()
  }, [])

  const getGenerationName = (code: string) => {
    let value = '';
    for(let i=0; i<smgenList.length; i++) {
      if(smgenList[i].code === code) {
        value = smgenList[i].value;
        break;
      }
    }
    return value;
  }

  return (
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
            {/* {`함체${device.orderNumber}S/N`} */}
            {t('station.station_index_sn', {index: index+1})}
          </th>
          <td>{device.serialNumber}</td>
          <th scope="row">
            {t('station.generation_type') /* 세대 구분 */}
          </th>
          <td>{getGenerationName(device.generationCode)}</td>
          <th scope="row">
            {t('station.hw_version') /* HW 버전 */}
          </th>
          <td>{device.hwVersion}</td>
          <th scope="row">
            {t('station.production_date') /* 생산일 */}
          </th>
          <td>{getFormattedTime(device.manufacturedAt, t('format.date-uppercase'))}</td>
        </tr>
        <tr>
          <th scope="row">
            {t('station.slot_info') /* 슬롯 정보 */}
          </th>
          <td colSpan={7} className="scroll">
            <Grid data={pivotData} scrollable="none">
              <GridNoRecords>
                There is no data available
              </GridNoRecords>
              <Column
                field="divide"
                title={t('station.category')} //"구분"
                width="150"
                className="txt-center"
              />
              {
                new Array(10).fill(null).map((v: any, index: number) => {
                  return (
                    <Column
                      key={`device_slot_key_${index}`}
                      field={`slot${index+1}`}
                      title={`${t('station.slot')}${index+1}`} //슬롯${index+1}
                      width="150"
                      className="txt-center"
                    />
                  )
                })
              }
            </Grid>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default DeviceInfo;