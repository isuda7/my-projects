// HEXAADMBTM3S14 : 배터리별 월변화량

import * as React from "react";
import {useEffect, useMemo, useRef, useState, useTransition} from "react";
import {Button} from "@progress/kendo-react-buttons";
import {Input} from "@progress/kendo-react-inputs";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import BatteryStatApiService from "@/utils/apiService/battery/BatteryStatApiService.ts";
import GridCommonComponent from "@/components/kendo/grid/GridCommonComponent.tsx";
import {CommonGridProps} from "@/components/kendo/grid/interface/GridInterfaces.ts";
import {Grid, GridColumn, GridToolbar} from "@progress/kendo-react-grid";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import {BatteryMonthlyStatRequestDto} from "@/utils/apiService/type/battery/BatteryStatRequestDto.ts";
import Header from "@/new_components/common/Header.tsx";
import useAlert from "@/hooks/useAlert.tsx";
import {ExcelExport} from "@progress/kendo-react-excel-export";

export default function BatteryMonthly() {

  const {t} = useTranslation();
  const showAlert = useAlert();
  const _export = React.useRef<ExcelExport | null>(null);
  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const initialDataState: BatteryMonthlyStatRequestDto = {
    "btryId": "",
    "year": currentYear,
    "month": currentMonth
  };

  const years = Array.from({length: currentYear - 1900 + 1}, (_, i) => 1900 + i);
  const months = Array.from({length: 12}, (_, i) => i + 1);

  const [data, setData] = useState<any[]>([]);
  const [params, setParams] = useState<BatteryMonthlyStatRequestDto>(initialDataState);
  const getBatteryMonthly = async () => {
    if (params.btryId === '') {

      return false;
    }
    const response = await BatteryStatApiService().getBatteryMonthlyStat(params)
    setData(response.data);
  }


  const transposedData = useMemo(() => {
    if (Object.keys(data).length > 0) {
      const keys = Object.keys(data[Object.keys(data)[0]]);
      return keys.map(key => {
        const row = {field: t(`battery.monthly.${key}`, {defaultValue: key})};
        Object.keys(data).forEach(week => {
          row[week] = data[week][key];
        });
        return row;
      });
    }
    return [];
  }, [data]);

  const columns = useMemo(() => {
    if (transposedData.length > 0) {
      const weeks = Object.keys(data);

      return [
        {field: 'field', title: ' ', width: '140'},
        ...weeks.map((week, index) => {
          const [start, end] = week.split(" ~ ");
          const title = start && end
            ? `${t("battery.monthly.weeks", {n: index + 1})} (${dayjs(start).format(t("format.month-date"))}~${dayjs(end).format(t("format.month-date"))})`
            : t(`battery.monthly.${week}`, {defaultValue: week});
          return {
            field: week,
            title: title,
            width: '140',
            className: "txt-right"
          };
        })
      ];
    }
    return [];
  }, [transposedData, data]);


  const callApi = async () => {
    await getBatteryMonthly();
  }
  const handleSearch = () => {
    if (params.btryId === '') {
      showAlert({message: "배터리ID를 입력해주세요."});
      return;
    }
    callApi();
  }


  useEffect(() => {
    callApi();
  }, []);

  return (
    <>
      <Header headName={"배터리별 월변화량"}/>

      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <dl className="search-group__box">
            <div>
              <dt>{t("battery.battery_id")} :</dt>
              <dd>
                <div className="in-input">
                  <Input id="phoneNumber"
                         className="w300"
                         onChange={(e) => setParams({...params, btryId: e.value})}
                  />
                </div>
              </dd>
            </div>
            <div>
              <dt>{t("battery.query_month")} :</dt>
              <dd>
                <DropDownList
                  style={{width: "100px"}}
                  data={years}
                  defaultValue={currentYear}
                  onChange={(e) => setParams({...params, year: e.value})}
                />
              </dd>
              <dd>
                <DropDownList
                  style={{width: "100px"}}
                  data={months}
                  defaultValue={currentMonth}
                  onChange={(e) => setParams({...params, month: e.value})}
                />
              </dd>
            </div>
          </dl>

          <div className="group-align-right">
            <Button size={"medium"} themeColor={"dark"} onClick={handleSearch}>
              <i className="icon icon-search"></i>
              {t('common.search')}
            </Button>
          </div>
        </div>
      </section>
      <section className="section">
        <ExcelExport data={transposedData} ref={_export}>
        <Grid data={transposedData} pageable={false}>
          <GridToolbar>
            <Button
              themeColor="info"
              onClick={excelExport}
              type="button"
            >
              <i className="icon icon-download" title="excel download"/>
            </Button>
          </GridToolbar>
          {columns.map((col, index) => (
            <GridColumn
              key={col.field}
              field={col.field}
              title={col.title}
              width={col.width}
            />
          ))}
        </Grid>
        </ExcelExport>
      </section>
    </>
  );
}
