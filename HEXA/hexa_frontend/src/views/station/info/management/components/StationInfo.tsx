/**
 * 스테이션 정보 상세 - 기기정보 Component
 * URL: /station/info/management/detail/detail - 기기정보
 */
/* React */
import { useState } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { Label } from "@progress/kendo-react-labels";
import { FormRenderProps  } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import useAlert from "@/hooks/useAlert";

import DeviceInfo from "./DeviceInfo";
import PrimaryDeviceListModal from "../modal/PrimaryDeviceListModal";

export default function StationInfo(props: any) {
  const {t} = useTranslation();
  const showAlert = useAlert();
  const formProps: FormRenderProps = props.formProps;
  const { initData, setSlotCount } = props;
  const statusCode = initData? initData.statusCode : undefined
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  /**
   * 입력한 대표함체 S/N을 기준으로 정상등록 가능여부 판단
   */
  // const getStationDevicePrimary = async () => {
  //   const serialNumber = formProps.valueGetter('deviceSerialNumber')
  //   if(!serialNumber) {
  //     //"대표 함체 S/N을 정확하게 입력하세요."
  //     showAlert({message: t('station.enter_case_sn')})
  //     return;
  //   }

  //   try {
  //     const res = await StationApiService().getStationDevicePrimary(serialNumber);
  //     const slotCount = (res?.data as StationDeviceDto).slotCount;
  //     setSlotCount(slotCount)
  //     //'사용할 수 있는 대표함체 입니다.'
  //     showAlert({message: t('station.possible_device_alert')})
  //   } 
  //   catch (error) {
  //     showAlert({message: String(error)})
  //   }
  // }

  const setModalSeletedData = (rows: any[], flag: string) => {
		console.log('rows', rows)
		//setData(rows);
    if(rows.length > 0) {
      formProps.onChange('deviceSerialNumber', {value: rows[0].primarySerialNumber})
      formProps.onChange('qrId', {value: rows[0].qrId})
      setSlotCount(rows[0].slotCount);
    }
		setModalOpen(false);
	} 

  return (
    <>
      {/* 기기 정보 */}
      <section className="section">
        <h3 className="t-title">{t('station.device_info')}</h3>

        <table className="tbl-base">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "90%" }} />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <Label editorId="sn">
                  {/* 대표 함체 */}
                  {t('station.primary_device')}
                  <span className="required">
                    <span className="sr-only">필수</span>
                  </span>
                </Label>
              </th>
              <td>
                <Button
                  type={'button'}
                  size={"medium"}
                  fillMode="outline"
                  className="w60"
                  onClick={() => setModalOpen(true)}
                  disabled={(statusCode && statusCode === 'OPER')}
                >
                  {t('common.select') /* 선택 */}
                </Button>
                {
                  formProps.valueGetter('deviceSerialNumber') &&
                  <>
                    <span className="cell-bar">
                      S/N : <strong>{formProps.valueGetter('deviceSerialNumber')}</strong>
                    </span>
                    <span className="cell-bar">
                      QR ID : <strong>{formProps.valueGetter('qrId')}</strong>
                    </span>
                  </>
                }
                {/* <div className="in-input">
                  <div className="inner-item mw400">
                    <FormField
                      name={'deviceSerialNumber'}
                      onChange={() => setSlotCount(undefined)}
                      ///대표함체 S/N을 정확하게 입력하세요
                      placeholder={t('station.primary_device_placeholder')}
                      validation={true}

                      //운영중일떄 disabled
                      disabled={(statusCode && statusCode === 'OPER')? true : false}
                      //className={(statusCode && statusCode === 'OPER')? 'disabled' : ''}
                    />
                    <Button
                      type="button"
                      size={"medium"}
                      fillMode="outline"
                      className="w60"
                      onClick={getStationDevicePrimary}
                      disabled={(statusCode && statusCode === 'OPER')}
                    >
                      {t('common.lookup')}
                    </Button>
                  </div>
                </div> */}
              </td>
            </tr>
          </tbody>
        </table>

        {
          //상태가 등록, 운영일때만 디바이스 리스트 나옴
          (initData && statusCode && (statusCode === 'OPER' || statusCode === 'REGI')) &&
          initData.device.deviceList.map((device: any, index: number) => {
            return (
              <DeviceInfo
                key={`device_key_${index}`}
                device = {device}
                index = {index}
              />
            )
          })
        }
      </section>
      {
        modalOpen &&
        <PrimaryDeviceListModal
          onClose={() => setModalOpen(false)}
          setModalSeletedData={setModalSeletedData}
        />
      }
    </>
  );
}
