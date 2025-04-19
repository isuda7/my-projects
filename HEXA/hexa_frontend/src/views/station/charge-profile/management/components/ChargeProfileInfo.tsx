/**
 * 충전 프로파일 등록, 상세 > 충전프로파일 정보 Component
 * URL: /station/charge-profile/management/add > 충전프로파일 정보
 * URL: /station/charge-profile/management/detail > 충전프로파일 정보
 */

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/* Kendo UI */
import { FormRenderProps  } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";

/* Common */
import CodeApiService from "@/utils/apiService/CodeApiService";
import StationApiService from "@/utils/apiService/StationApiService";
import CustomSelect from "@/new_components/form/CustomSelect";
import NumberInput from "@/components/kendo/form/NumberInput";
import useAlert from "@/hooks/useAlert";
import ChargeProfileMatrixModal from "../modal/ChargeProfileMatrixModal";
import FormField from "@/new_components/common/FormField";

export default function ChargeProfileInfo(props: any) {
  const showAlert = useAlert()
  const {t} = useTranslation();
  const formProps: FormRenderProps = props.formProps;

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [isDefault, setIsDefault] = useState<boolean>(true);
  const [modeData, setModeData] = useState<any[]>([]) //SMCHGMODE, 충전 모드

  const setInit = async() => {
    //기본여부 Y 설정된 다른 충전프로파일 존재하는지 여부 확인
    const res = await StationApiService().getStationChargeProfileExistDefault();
    if(res.data === false) setIsDefault(res.data)

    const codeResponse = await CodeApiService().getCodesByGroupCode({groupCode: 'SMCHGMODE'})
    if(Array.isArray(codeResponse.data)) setModeData(codeResponse.data);
  }

  useEffect(() => {
    setInit()
  }, [])

  const setModalSeletedData = (rows: any[]) => {
    const matrixIds: string[] = []
    rows.forEach(v => {
      matrixIds.push(v.id);
    })
    formProps.onChange('matrixIds', {value : matrixIds})
    setModalOpen(false);
  }

  return (
    
    <>
      {/* 충전 프로파일 정보 */}
      <section className="section">
        <div className="title-group">
          <h3 className="t-title">{t('station.charge_profile_info')}</h3>
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
                {/* 충전프로파일NO */}
                {t('station.charge_profile_no')}
              </th>
              <td>{formProps.valueGetter('id')}</td>
              <th scope="row">
                {/* 충전 조건 */}
                {t('station.charging_condition')}
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
              </th>
              <td>
                <div className="in-input">
                  <FormField
                    name={"condition"}
                    validation={true}
                  />
                </div>
              </td>
              <th scope="row">
                {/* 기본 여부 */}
                {t('station.is_default')}
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
              </th>
              <td>
                <FormField
                  name={"isDefault"}
                  component={CustomSelect}
                  data={[
                    {code: true, value: 'Y'},
                    {code: false, value: 'N'}
                  ]}
                  noSelectDefault={true}
                  disabled={isDefault}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                {/* 전류(C) */}
                {t('station.ampere')}(C)
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
              </th>
              <td>
                <div className="in-input">
                  <FormField
                    name={"current"}
                    component={NumberInput}
                    validation={true}
                    decimals={3}
                  />
                </div>
              </td>
              <th scope="row">
                {/* 전압(V) */}
                {t('station.voltage')}(V)
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
              </th>
              <td>
                <div className="in-input">
                  <FormField
                    name={"voltage"}
                    component={NumberInput}
                    validation={true}
                    decimals={3}
                  />
                </div>
              </td>
              <th scope="row">
                Cutoff Current(C)
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
              </th>
              <td>
                <div className="in-input">
                  <FormField
                    name={"cutoff"}
                    component={NumberInput}
                    validation={true}
                    decimals={3}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {/* 충전 Mode */}
                {t('station.charge_mode')}
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
              </th>
              <td colSpan={5}>
                <div className="in-input">
                  <FormField
                    name={"chargeModeCode"}
                    component={CustomSelect}
                    data={modeData}
                    validation={true}
                    className="w200"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {/* Derating Factor 1(전류) */}
                {t('station.derating_factor1')}
              </th>
              <td colSpan={5}>
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
                      <th className="txt-center">
                        {/* 값 */}
                        {t('station.derating_value')}
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </th>
                      <td>
                        <div className="in-input">
                          <FormField
                            name={"deratingValue1"}
                            component={NumberInput}
                            validation={true}
                            decimals={3}
                            fixedDecimal={true}
                          />
                        </div>
                      </td>
                      <th className="txt-center">
                        {/* 최소 */}
                        {t('station.derating_min')}
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </th>
                      <td>
                        <div className="in-input">
                          <FormField
                            name={"deratingMin1"}
                            component={NumberInput}
                            validation={true}
                            decimals={3}
                            fixedDecimal={true}
                          />
                        </div>
                      </td>
                      <th className="txt-center">
                        {/* 최대 */}
                        {t('station.derating_max')}
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </th>
                      <td>
                        <div className="in-input">
                          <FormField
                            name={"deratingMax1"}
                            component={NumberInput}
                            validation={true}
                            decimals={3}
                            fixedDecimal={true}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {/* Derating Factor 2(전압) */}
                {t('station.derating_factor2')}
              </th>
              <td colSpan={5}>
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
                      <th className="txt-center">
                        {/* 값 */}
                        {t('station.derating_value')}
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </th>
                      <td>
                        <div className="in-input">
                          <FormField
                            name={"deratingValue2"}
                            component={NumberInput}
                            validation={true}
                            decimals={3}
                            fixedDecimal={true}
                          />
                        </div>
                      </td>
                      <th className="txt-center">
                        {/* 최소 */}
                        {t('station.derating_min')}
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </th>
                      <td>
                        <div className="in-input">
                          <FormField
                            name={"deratingMin2"}
                            component={NumberInput}
                            validation={true}
                            decimals={3}
                            fixedDecimal={true}
                          />
                        </div>
                      </td>
                      <th className="txt-center">
                        {/* 최대 */}
                        {t('station.derating_max')}
                        <span className="required">
                          <span className="sr-only">필수</span>
                        </span>
                      </th>
                      <td>
                        <div className="in-input">
                          <FormField
                            name={"deratingMax2"}
                            component={NumberInput}
                            validation={true}
                            decimals={3}
                            fixedDecimal={true}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {/* 조건NO */}
                {t('station.matrix_no')}
              </th>
              <td colSpan={2}>
                <div className="in-input">
                  <Button
                    size={"medium"}
                    fillMode="outline"
                    className="w80"
                    type={'button'}
                    onClick={() => setModalOpen(true)}
                    disabled={formProps.valueGetter('isDefault')}
                  >
                    {t('common.select') /* 선택 */}
                  </Button>
                  {
                    (formProps.valueGetter('matrixIds') && 
                    formProps.valueGetter('matrixIds').length > 0)?
                    <span className="ml1">{formProps.valueGetter('matrixIds').join(',')}</span>
                    :
                    <span className="ml1 c-red">
                      {t('station.no_mapping') /* 매핑없음 */}
                    </span>
                  }
                  
                </div>
              </td>
              <th scope="row">
                {/* Step 충전 여부 */}
                {t('station.is_step_chg')}
                <span className="required">
                  <span className="sr-only">필수</span>
                </span>
              </th>
              <td colSpan={2}>
                <FormField
                  name={"isStepChg"}
                  component={CustomSelect}
                  data={[
                    {code: true, value: 'Y'},
                    {code: false, value: 'N'},
                  ]}
                  className={'w200'}
                  noSelectDefault = {true}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      {
        modalOpen && 
        <ChargeProfileMatrixModal 
          onClose={() => setModalOpen(false)}
          setModalSeletedData={setModalSeletedData}
        />
      }
    </>
  );
}
