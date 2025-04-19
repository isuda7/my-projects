import * as React from "react";
import {useEffect, useState} from "react";
import {Field, Form, FormElement, FormRenderProps,} from "@progress/kendo-react-form";
import {Button} from "@progress/kendo-react-buttons";
import Header from "@/new_components/common/Header.tsx";
import FormInput from "@/new_components/common/FormInput.tsx";
import {useMutation} from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {BatteryUpdateDto} from "@/utils/apiService/type/battery/BatteryRequestDto.ts";
import BatteryApiService from "@/utils/apiService/battery/BatteryApiService.ts";
import {BatteryResponseDto} from "@/utils/apiService/type/battery/BatteryResponseDto.ts";
import FormCodeDropDownList from "@/new_components/common/FormCodeDropDownList.tsx";
import {requiredValidator} from "@/utils/Validators.ts";
import ModalComponent from "@/components/kendo/modal/ModalComponent.tsx";
import BatteryUsageHistoryModal from "@/views/battery/modal/BatteryUsageHistoryModal.tsx";
import BatteryChargeHistoryModal from "@/views/battery/modal/BatteryChargeHistoryModal.tsx";
import dayjs from "dayjs";
import BatteryRsrvHistoryModal from "@/views/battery/modal/BatteryRsrvHistoryModal.tsx";
import ButtonGroup from "@/new_components/common/ButtonGroup.tsx";
import BatterySwapAndLocHistoryModal from "@/views/battery/modal/BatterySwapAndLocHistoryModal.tsx";
import {getFormattedTime} from "@/utils/common.ts";
import {useTranslation} from "react-i18next";

const USAGETYPE2_CODE_LIST = ['BMWH', 'BMOEM', 'BMFAC', 'BMSHP', 'BMSVC', 'BMONM', 'BMREP', 'BMDISP'];

export default function BatteryInfoModify() {
  const {t} = useTranslation();
  const {state} = useLocation();
  const showAlert = useAlert();
  const navigate = useNavigate();
  const [batteryInfo, setBatteryInfo] = useState<BatteryUpdateDto>({
    hwVersion: "",
    ksBtryId: "",
    usageType1: "",
    usageType2: ""
  });
  const [data, setData] = useState<BatteryResponseDto>({
    bmsVersion: "",
    createdAt: new Date(),
    createdUserId: "",
    hwVersion: "",
    id: "",
    ksBtryId: "",
    manufacturedDate: "",
    serialNumber: "",
    stationName: "",
    type: "",
    updatedAt: new Date(),
    updatedUserId: "",
    usageType1: "",
    usageType2: "",
    vehicleId: "",
    version: "",
    versionReleasedAt: new Date(),
    soh: 0,
    sohUpdatedAt: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);
  const [usageType2CodeList, setUsageType2CodeList] = useState<any[]>(USAGETYPE2_CODE_LIST);
  const [openModal, setOpenModal] = useState<boolean[]>([false, false, false, false]);
  const [expand, setExpand] = useState<boolean>(false);
  const registBattery = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    mutationFn: async () =>
      BatteryApiService().updateBattery(state as string, batteryInfo),
    onSuccess: (response: any) => {
      showAlert({message: t("common.modify_success"), onConfirm: () => navigate('/battery/info')});
    },
    onError: (error) => {
      showAlert({message: error.message})
    },
  });

  const handleSubmit = (dataItem: Record<string, unknown>) => {
    const updateData: BatteryUpdateDto = {
      hwVersion: dataItem.hwVersion as string
      , ksBtryId: dataItem.ksBtryId as string
      , usageType1: dataItem.usageType1 as string
      , usageType2: dataItem.usageType2 as string
    };
    setBatteryInfo(updateData);
    registBattery.mutate();
  }

  const ensureDate = (date: any): Date => {
    if (date instanceof Date) {
      return date;
    }
    const parsedDate = dayjs(date);
    return parsedDate.isValid() ? parsedDate.toDate() : new Date();
  };

  const getBatteryById = async (batteryId: string) => {
    const response: BatteryResponseDto = await BatteryApiService().getBatteryById(batteryId);
    setUsageType2CodeList([`BM${response.usageType1}`]);
    setData(response);
    setIsLoading(false);
    if (response.usageType2 !== 'WAIT') {
      setExpand(true);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getBatteryById(state!);
  }, []);

  const onChangeUsageType1 = (e: any, formRenderProps: FormRenderProps) => {
    setUsageType2CodeList([`BM${e.value}`]);
    if (formRenderProps) {
      formRenderProps.onChange('usageType2', {
        value: null
      });
    }
  }

  const handleDelete = async () => {
    const deleteConfirm = async () => {
      await BatteryApiService().deleteBattery(state).then(() => {
        navigate('/battery/info');
      });
    };
    showAlert({ message: t("battery.delete_battery_confirm"), type: 'confirm', onConfirm: () => deleteConfirm()});

  }


  return (
    <>
      {!isLoading &&
        <>
          <Header headName={"배터리 정보 상세"} descrption={""}/>
          <Form
            initialValues={data}
            // ignoreModified={true}//수정된 필드 없이도 양식 제출
            onSubmit={handleSubmit}
            render={(formRenderProps: FormRenderProps) => (
              <FormElement>
                <section className="section">
                  <div className="title-group">
                    <h3 className="t-title">{t("battery.battery_info")}</h3>

                    {expand && (<div className="group-align-right gap0.38">
                      <Button
                        onClick={() => setOpenModal([true, false, false, false])}
                        size="medium"
                      >
                        {t("battery.reservation_history")}
                      </Button>
                      <Button
                        onClick={() => setOpenModal([false, true, false, false])}
                        size="medium"
                      >
                        {t("battery.charging_history")}
                      </Button>
                      <Button
                        onClick={() => setOpenModal([false, false, true, false])}
                        size="medium"
                      >
                        {t("battery.exchange_location_history")}
                      </Button>
                      <Button
                        onClick={() => setOpenModal([false, false, false, true])}
                        size="medium"
                      >
                        {t("battery.usage_change_history")}
                      </Button>
                    </div>)
                    }
                  </div>
                  <table className="tbl-base">
                    <colgroup>
                      <col style={{width: "20%"}}/>
                      <col style={{width: "30%"}}/>
                      <col style={{width: "20%"}}/>
                      <col style={{width: "30%"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                      <th scope="row">
                        {t("battery.battery_id")}
                      </th>
                      <td colSpan={expand ? 0 : 4}>
                        {data.id}
                      </td>
                      {expand && (<>
                        <th scope="row">
                          SOH(%)
                        </th>
                        <td>
                          {data.soh} {data.sohUpdatedAt && `(수집일시 ${dayjs(data.sohUpdatedAt).format('YYYY-MM-DD HH:mm:ss')})`}
                        </td>
                      </>)}
                    </tr>
                    <tr>
                      <th scope="row">
                        {t("battery.creation_date")}
                        <span className="required"><span className="sr-only">필수</span>						  </span>
                      </th>
                      <td>
                        {/*<Field*/}
                        {/*name={"manufacturedDate"}*/}
                        {/*component={DatePicker}*/}
                        {/*validator={requiredValidator}*/}
                        {/*value={"2015-01-10"}*/}
                        {/*format={"yyyy-MM-dd"}*/}
                        {/*disabled={true}*/}
                        {/*/>*/}
                        <FormInput
                          name={"manufacturedDate"}
                          placeholder={"생산년월일 입력"}
                          disabled={true}
                        />

                      </td>
                      <th scope="row">
                        {t("battery.serial_no_4")}
                        <span className="required"><span className="sr-only">필수</span> </span>
                      </th>
                      <td>
                        <FormInput
                          name={"serialNumber"}
                          validation={true}
                          placeholder={"타이틀 입력"}
                          disabled={true}
                        />
                      </td>
                    </tr>

                    {expand && (<>
                      <tr>
                        <th scope="row">
                          {t("battery.bms_version")}
                        </th>
                        <td>
                          {data.bmsVersion}
                        </td>
                        <th scope="row">
                          {t("battery.hw_version")}
                          <span className="required"><span className="sr-only">필수</span></span>
                        </th>
                        <td>
                          <FormInput
                            name={"hwVersion"}
                            validation={true}
                            placeholder={"타이틀 입력"}
                          />
                        </td>
                      </tr>
                    </>)}

                    </tbody>
                  </table>
                </section>

                <section className="section">
                  <div className="title-group">
                    <h3 className="t-title">{t("battery.usage_info")}</h3>
                  </div>
                  <table className="tbl-base">
                    <colgroup>
                      <col style={{width: "20%"}}/>
                      <col style={{width: "30%"}}/>
                      <col style={{width: "20%"}}/>
                      <col style={{width: "30%"}}/>
                    </colgroup>

                    <tbody>
                    <tr>
                      <th scope="row">
                        {t("battery.usage_type1")}
                        <span className="required"><span className="sr-only">필수</span></span>
                      </th>
                      <td>
                        <Field
                          name={"usageType1"}
                          component={FormCodeDropDownList}
                          codeGroup={"BMUT"}
                          validator={requiredValidator}
                          onChange={(e: any) => onChangeUsageType1(e, formRenderProps)}
                        />
                      </td>
                      <th scope="row">
                        {t("battery.usage_type2")}
                        <span className="required"><span className="sr-only">필수</span></span>
                      </th>
                      <td>
                        <Field
                          name={"usageType2"}
                          component={FormCodeDropDownList}
                          codeGroupList={usageType2CodeList}
                          validator={requiredValidator}
                        />
                      </td>
                    </tr>
                    {expand && (<>
                      <tr>
                        <th scope="row">
                          {t("station.station_name")}
                        </th>
                        <td>
                          {data.stationName}
                        </td>
                        <th scope="row">
                          {t("battery.vehicle_id")}
                        </th>
                        <td>
                          {data.vehicleId}
                        </td>
                      </tr>
                    </>)}
                    </tbody>
                  </table>
                </section>

                <section className="section">
                  <div className="title-group">
                    <h3 className="t-title">{t("common.registration_info")}</h3>
                  </div>
                  <table className="tbl-base">
                    <colgroup>
                      <col style={{width: "20%"}}/>
                      <col style={{width: "30%"}}/>
                      <col style={{width: "20%"}}/>
                      <col style={{width: "30%"}}/>
                    </colgroup>

                    <tbody>
                    <tr>

                      <th scope="row">
                        {t("common.registration_datetime")}
                      </th>
                      <td>
                        {getFormattedTime(data.createdAt)}
                      </td>
                      <th scope="row">
                        {t("common.registrant")}
                      </th>
                      <td>
                        {data.createdUserId}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {t("common.modification_datetime")}
                      </th>
                      <td>

                        {getFormattedTime(data.updatedAt)}
                      </td>
                      <th scope="row">
                        {t("common.modifier")}
                      </th>
                      <td>
                        {data.updatedUserId}
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </section>
                <div className="btn-group k-mt-10">
                  <div className="group-align-right">
                    <ButtonGroup deleteButton={!expand} submitButton={true} handleDelete={handleDelete}
                                 formRenderProps={formRenderProps}/>
                  </div>
                </div>
              </FormElement>
            )}
          />
        </>
      }
      {openModal[0] && (
        <ModalComponent
          onClose={() => setOpenModal([false, false, false, false])}
          title={t("battery.battery_reservation_history")}
          showCloseButton={true}
          menuUrl={'/battery/popup/reservation'}
        >
          <BatteryRsrvHistoryModal batteryId={state}/>
        </ModalComponent>
      )}
      {openModal[1] && (
        <ModalComponent
          onClose={() => setOpenModal([false, false, false, false])}
          title={t("battery.battery_charging_history")}
          showCloseButton={true}
          menuUrl={'/battery/popup/charge'}
        >
          <BatteryChargeHistoryModal batteryId={state}/>
        </ModalComponent>
      )}
      {openModal[2] && (
        <ModalComponent
          onClose={() => setOpenModal([false, false, false, false])}
          title={t("battery.battery_exchange_location_history")}
          showCloseButton={true}
          menuUrl={'/battery/popup/swap'}
        >
          <BatterySwapAndLocHistoryModal batteryId={state}/>
        </ModalComponent>
      )}
      {openModal[3] && (
        <ModalComponent
          onClose={() => setOpenModal([false, false, false, false])}
          title={t("battery.battery_usage_change_history")}
          showCloseButton={true}
          menuUrl={'/battery/popup/usage'}
        >
          <BatteryUsageHistoryModal batteryId={state}/>
        </ModalComponent>
      )}
    </>
  );
}
