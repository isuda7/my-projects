/**
 * 스테이션 정보 상세 - 펌웨어정보 Component
 * URL: /station/info/management/detail/detail - 펌웨어정보
 */
/* React */
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { FormRenderProps  } from "@progress/kendo-react-form";

export default function FirmwareInfo(props: any) {
  const { t } = useTranslation();
  const formProps: FormRenderProps = props.formProps;

  return (
    <>
      {/* 펌웨어 정보 */}
      <section className="section">
        <div className="title-group ">
          <h3 className="t-title">
            {t('station.firmware_info') /* 펌웨어 정보 */}
          </h3>
        </div>

        <table className="tbl-base">
          <colgroup>
            <col style={{ width: "13%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                {t('station.sw_application') /* SW Application */}
              </th>
              <td>{formProps.valueGetter('swAppVersion')}</td>
              <th scope="row">
                {t('station.nfc_firmware') /* NFC 펌웨어 */}
              </th>
              <td>{formProps.valueGetter('nfcFwVersion')}</td>
              <th scope="row">
                {t('station.slot_firmware') /* 슬롯 펌웨어 */}
              </th>
              <td>{formProps.valueGetter('slotFwVersion')}</td>
            </tr>
            <tr>
              <th scope="row">
                {t('station.charger_firmware') /* 충전기 펌웨어 */}
              </th>
              <td>{formProps.valueGetter('chargerFwVersion')}</td>
              <th scope="row">
                {t('station.bms_firmware') /* BMS 펌웨어 */}
              </th>
              <td>{formProps.valueGetter('bmsFwVersion')}</td>
              <th scope="row">
                {t('station.case_firmware') /* 함체 펌웨어 */}
              </th>
              <td>{formProps.valueGetter('chassisFwVersion')}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
