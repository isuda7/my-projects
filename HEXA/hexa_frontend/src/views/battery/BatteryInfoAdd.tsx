import * as React from "react";
import {useState} from "react";
import {Field, Form, FormElement, FormRenderProps,} from "@progress/kendo-react-form";
import Header from "@/new_components/common/Header.tsx";
import FormInput from "@/new_components/common/FormInput.tsx";
import {useMutation} from "@tanstack/react-query";
import useAlert from "@/hooks/useAlert.tsx";
import {useNavigate} from "react-router-dom";
import {BatteryCreateDto} from "@/utils/apiService/type/battery/BatteryRequestDto.ts";
import BatteryApiService from "@/utils/apiService/battery/BatteryApiService.ts";
import FormCodeDropDownList from "@/new_components/common/FormCodeDropDownList.tsx";
import {numberValidator, requiredValidator, stringLengthValidator} from "@/utils/Validators.ts";
import ButtonGroup from "@/new_components/common/ButtonGroup.tsx";
import {useTranslation} from "react-i18next";

export default function BatteryInfoAdd() {
  const {t} = useTranslation();
  const showAlert = useAlert();
  const navigate = useNavigate();
  const [batteryInfo, setBatteryInfo] = useState<BatteryCreateDto>({hwVersion: "", ksBtryId: "", manufacturedDate: ""});

  const registBattery = useMutation({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    mutationFn: async () =>
      BatteryApiService().createBattery(batteryInfo),
    onSuccess: (response: any) => {
      showAlert({message: t("common.register_success"), onConfirm: () => navigate('/battery/info')});
    },
    onError: (error) => {
      showAlert({message: error.message})
    },
  });

  const handleSubmit = (dataItem: BatteryCreateDto) => {
    setBatteryInfo(dataItem);
    registBattery.mutate();
  }

  return (
    <>
      <Header headName={"배터리 정보 등록"} descrption={""}/>

      <Form
        onSubmit={(values) => handleSubmit(values as BatteryCreateDto)}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement>
            <section className="section">
              <div className="title-group">
                <h3 className="t-title">{t("battery.battery_info")}</h3>
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
                  <th scope="row" rowSpan={2}>
                    {t("battery.creation_date")}
                    <span className="required">
					  <span className="sr-only">필수</span>
					</span>
                  </th>
                  <td rowSpan={2}>
                    {/*<Field*/}
                    {/*  name={"manufacturedDate"}*/}
                    {/*  component={DatePicker}*/}
                    {/*  validation={true}*/}
                    {/*  validator={requiredValidator}*/}
                    {/*  format={"yyyy-MM-dd"}*/}
                    {/*/>*/}
                    <FormInput
                      name={"manufacturedDate"}
                      validation={true}
                      placeholder={`${t("battery.input_creation_date")}`}
                    />
                  </td>

                  <th scope="row">
                    {t("battery.serial_no_4")}
                    <span className="required">
					  <span className="sr-only">필수</span>
					</span>
                  </th>
                  <td>
                    <FormInput
                      name={"serialNumber"}
                      validation={true}
                      validator={(value: string) => numberValidator(value) || stringLengthValidator(value, 4)}
                      placeholder={`${t("battery.input_serial_no_4")}`}

                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {t("battery.hw_version")}
                    <span className="required">
					  <span className="sr-only">필수</span>
					</span>
                  </th>
                  <td>
                    <FormInput
                      name={"hwVersion"}
                      validation={true}
                      placeholder={`${t("battery.input_hw_version")}`}
                    />
                  </td>
                </tr>
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
                    <span className="required">
					  <span className="sr-only">필수</span>
					</span>
                  </th>
                  <td>
                    <Field
                      name={"usageType1"}
                      component={FormCodeDropDownList}
                      codeGroup={"BMUT"}
                      validator={requiredValidator}
                      defaultValue={"REGI"}
                      disabled={true}
                    />
                  </td>
                  <th scope="row">
                    {t("battery.usage_type2")}
                    <span className="required">
					  <span className="sr-only">필수</span>
					</span>
                  </th>
                  <td>
                    <Field
                      defaultValue={"WAIT"}
                      name={"usageType2"}
                      component={FormCodeDropDownList}
                      codeGroup={"BMREGI"}
                      validator={requiredValidator}
                      disabled={true}
                    />
                  </td>
                </tr>
                </tbody>
              </table>
            </section>

            {/* 하단 버튼 그룹 */}
            <div className="btn-group k-mt-10">
              <div className="group-align-right">
                <ButtonGroup formRenderProps={formRenderProps} submitButton={true}/>
              </div>
            </div>
          </FormElement>
        )}
      />


    </>
  );
}
