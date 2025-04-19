import React, { useEffect } from "react";
import {
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import CustomSelect from "@/new_components/form/CustomSelect";
import { getFormattedTime } from "@/utils/common";
import { MONTHS_LIST } from "@/views/station/constants"

export type DateProps = {
  year: number;
  month?: string;
};

export type Props = {
  setDateProps: React.Dispatch<React.SetStateAction<DateProps>>;
  dateProps: DateProps;
  searchEvent?: () => void;
};
export default function YearMonthSearchBox(props: Props) {
  const { t } = useTranslation();
  const { setDateProps, dateProps, searchEvent } = props;

  const currentYear = Number(getFormattedTime(new Date(), 'YYYY'));
	const yearData = new Array(10).fill(null).map((v:null, i:number) => ({code: currentYear - i, value: currentYear - i}))
  const monthData = MONTHS_LIST.map(v => ({code: Number(v.value), value: t(`date.${v.name}`)}))

  const onChange = (e: DropDownListChangeEvent) => {
    const name = e.target.name;
    if(name === 'year') {
      setDateProps(prevState => {
        return {
          ...prevState,
          year: e.value,
        }
      })
    }
    else {
      setDateProps(prevState => {
        return {
          ...prevState,
          month: e.value,
        }
      })
    }
  }

  return (
    <section className="section">
      {/* 검색 박스 */}
      <div className="search-group">
        <div className="search-flex">
          <CustomSelect
            name="year"
            className="w200" 
            data={yearData}
            value={dateProps.year}
            onChange={onChange}
            noSelectDefault={true}
          />
          <CustomSelect
            name="month"
            className="w200" 
            data={monthData}
            value={dateProps.month}
            onChange={onChange}
            defaultItem={{code: null, value: t('station.select_month')}}
          />
        </div>
        <div className="group-align-right">
          <Button 
            size={"medium"} 
            themeColor={"dark"}
            onClick={() => searchEvent?.()}  
          >
            <i className="icon icon-search"></i>
            {t('common.search') /* 검색 */}
          </Button>
        </div>
      </div>
    </section>
  );
}
