import { useCallback, useEffect } from "react";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import _ from "lodash";

export type DateProps = {
  year?: string;
  month?: string;
};

export type Props = {
  setDateProps?: React.Dispatch<React.SetStateAction<DateProps>>;
  dateProps: DateProps;
  searchEvent?: () => void;
};

export default function DateRange(props: Props) {
  const { setDateProps, dateProps, searchEvent } = props;
  const [yearList, setYearList] = useState<any[]>([
    {value : '2020', name : '2020년'},
    {value : '2021', name : '2021년'},
    {value : '2022', name : '2022년'},
    {value : '2023', name : '2023년'},
    {value : '2024', name : '2024년'},
  ])
  const [monthList, setMonthList] = useState<any[]>([])
  
  const [displayYearMonth, setDisplayYearMonth] = useState<any>({
    year: {name: `${dateProps.year}년`, value: dateProps.year},
    month: {
      name: dateProps.month? `${dateProps.month}월` : '전체',
      value: dateProps.month? dateProps.month : 'ALL',
    }
  })
  const defaultMonth = {name: '전체', value:'ALL'}

  const getMonthArray = useCallback(() => {
    const monthArray = []
    for(let i=1; i<=12; i++) {
      monthArray.push({name: `${i}월`, value: String(i)})
    }
    return monthArray;
  }, [])
  
  const handleDropDownList = (e:DropDownListChangeEvent) => {
    setDisplayYearMonth({
      ...displayYearMonth,
      [e.target.name as string]: e.value,
    })
    
    setDateProps?.({
      ...dateProps,
      [e.target.name as string]: e.value.value === 'ALL'? '' : e.value.value
    })
  }

  useEffect(() => {
    setMonthList(getMonthArray());
  }, []);

  return (
    <div className="search-group">
      <div className="search-flex">
        <DropDownList
          data={yearList}
          value={displayYearMonth.year}
          onChange={handleDropDownList}
          name="year"
          textField="name"
          dataItemKey="value"
          style={{width: '200px'}}
        />
        <DropDownList
          data={monthList}
          value={displayYearMonth.month}
          onChange={handleDropDownList}
          name="month"
          textField="name"
          dataItemKey="value"
          defaultItem={defaultMonth}
          style={{width: '200px'}}
        />
      </div>

      <div className="group-align-right">
        <Button 
          size={"medium"} 
          themeColor={"dark"}
          onClick={() => searchEvent?.()}  
        >
          <i className="icon icon-search"></i>
          검색
        </Button>
      </div>
    </div>
  );
}

DateRange.defaultProps = {
  setDateRangeProps: undefined,
  dateRangeProps: undefined,
  searchEvent: undefined,
};
