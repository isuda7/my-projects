import { useEffect } from "react";
import {
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import {
  DatePicker,
  DatePickerChangeEvent,
  DateTimePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import _ from "lodash";
import CustomSelect from "@/new_components/form/CustomSelect";

export type DateRangeProps = {
  labelList?: string[];
  startDate: Date | null;
  endDate: Date | null;
  dropDownList: any[];
  value?: string;
  format?: string;
  type?: string;
  allFlag: boolean;
  initState?: string;
  resetEnable?: boolean;
};

export type DateState = {
  [key: string]: boolean;
}

export type Props = {
  setDateRangeProps?: React.Dispatch<React.SetStateAction<DateRangeProps>>;
  dateRangeProps: DateRangeProps;
  searchEvent?: (initValue?:string) => void;
};
export default function DateRange(props: Props) {
  const { t, i18n } = useTranslation();
  const { setDateRangeProps, dateRangeProps, searchEvent } = props;
  //['스테이션 명', '기간']
  const { labelList = [t('station.station_name'), t('common.period')]} = dateRangeProps;
  const defaultFormat = t('format.date');

  const initState = dateRangeProps?.initState;
  const [state, setState] = useState<DateState>({
    today: initState === 'today',
    week: initState === 'week',
    month: initState === 'month',
    year: initState === 'year',
  });
  const [origin, setOrigin] = useState({
    dateRangeProps: dateRangeProps,
    state: state,
  });

  const getSelectDateValue = (selectDate : Date | null, type: string) => {
    let resultDate = _.cloneDeep(selectDate);
    if(dateRangeProps?.format || defaultFormat) {
      const formatLength = dateRangeProps?.format? dateRangeProps?.format.length : defaultFormat.length

      switch(formatLength) {
        case 10: if(type === 'start') resultDate?.setHours(0, 0, 0, 0)  
          else resultDate?.setHours(23, 59, 59, 999); 
        break;
        case 13: if(type === 'start') resultDate?.setMinutes(0, 0, 0)  
          else resultDate?.setMinutes(59, 59, 999); 
        break;
        case 16: if(type === 'start') resultDate?.setSeconds(0, 0)  
          else resultDate?.setSeconds(59, 999); 
        break;
        default: break;
      }
    }
    return resultDate;
  }

  const changeDateStart = (event: DatePickerChangeEvent | DateTimePickerChangeEvent) => {
    const date = getSelectDateValue(event.value, 'start')
    setDateRangeProps?.((prevState) => ({
      ...prevState,
      startDate: date,
    }));
    setState({
      today: false,
      week: false,
      month: false,
      year: false,
    })
  };
  const changeDateEnd = (event: DatePickerChangeEvent | DateTimePickerChangeEvent) => {
    const date = getSelectDateValue(event.value, 'end')
    setDateRangeProps?.((prevState) => ({
      ...prevState,
      endDate: date,
    }));
    setState({
      today: false,
      week: false,
      month: false,
      year: false,
    })
  };
  const todayDate = () => {
    const currentDate = new Date();
    setDateRangeProps?.((prevState) => ({
      ...prevState,
      startDate: getSelectDateValue(currentDate, 'start'),
      endDate: getSelectDateValue(currentDate, 'end'),
    }));
    setState((prevState) => ({
      today: true,
      week: false,
      month: false,
      year: false,
    }));
  };

  const addDate = (range: string) => {
    const currentDate = new Date();
    const startDate = getStartDate(currentDate, range)

    setState((prevState: DateState) => {
      for(let key in prevState) {
        if(key === range) prevState[key] = true;
        else prevState[key] = false;
      }
      return {
        ...prevState,
      }
    })
    
    // let test = null;
    // if(dateRangeProps.endDate) {
    //   test = getStartDate(dateRangeProps.endDate, range)
    // }
    // setDateRangeProps?.((prevState) => ({
    //   ...prevState,
    //   startDate: getSelectDateValue(test, 'start'),
    // }));
    setDateRangeProps?.((prevState) => ({
      ...prevState,
      startDate: getSelectDateValue(startDate, 'start'),
      endDate: getSelectDateValue(currentDate, 'end'),
    }));
  };

  const getStartDate = (today: Date, flag: string) => {
    let returnDate = new Date(today);
    if(flag === 'week') {
      returnDate.setDate(returnDate.getDate() - 7);
    }
    else if(flag === 'month') {
      returnDate.setMonth(returnDate.getMonth() - 1);
    }
    if(flag === 'year') {
      returnDate.setFullYear(returnDate.getFullYear() - 1);
    }
    returnDate.setDate(returnDate.getDate() + 1);
    
    return returnDate;
  }

  const handleDropDownList = (e: DropDownListChangeEvent) => {
    console.log('handleDropDownList e', e)
    setDateRangeProps?.((prevState) => ({
      ...prevState,
      value: e.value,
    }));
  };

  useEffect(() => {
    const origin = _.cloneDeep(dateRangeProps);
    const date = getSelectDateValue(dateRangeProps.startDate, 'start')
    const date2 = getSelectDateValue(dateRangeProps.endDate, 'end')

    origin.startDate = date;
    origin.endDate = date2;


    setDateRangeProps?.(origin);
    setOrigin?.((prevState) => ({
      ...prevState,
      dateRangeProps: origin,
    }));
  }, [])

  return (
    <section className="section">
      <div className="search-group">
        <dl>
          <div>
            <dt>{labelList.length > 1? labelList[0] : ''}</dt>
            <dd>
              <CustomSelect
                style={{width: '250px'}}
                data={dateRangeProps?.dropDownList}
                value={dateRangeProps?.value}
                onChange={(e) => handleDropDownList(e)}
                noSelectDefault={true}
              />
            </dd>
          </div>
          <div>
            <dt>{labelList[labelList.length - 1]}</dt>
            <dd>
              <span className="period">
                <Button
                  fillMode="outline"
                  togglable
                  value="today"
                  selected={state.today}
                  onClick={() => todayDate()}
                >
                  {t("date.today")}
                </Button>
                <Button
                  fillMode="outline"
                  togglable
                  value="week"
                  selected={state.week}
                  onClick={() => addDate("week")}
                >
                  {t("date.week")}
                </Button>
                <Button
                  fillMode="outline"
                  togglable
                  value="month"
                  selected={state.month}
                  onClick={() => addDate("month")}
                >
                  {t("date.month")}
                </Button>
                <Button
                  fillMode="outline"
                  togglable
                  value="year"
                  selected={state.year}
                  onClick={() => addDate("year")}
                >
                  {t("date.year")}
                </Button>
              </span>

              <span className="datepicker">
                <span className="cell" style={{ width: '150px' }}>
                  <DatePicker
                    value={dateRangeProps?.startDate}
                    onChange={changeDateStart}
                    format={dateRangeProps?.format || defaultFormat}
                  />
                </span>
                ~
                <span className="cell" style={{ width: '150px' }}>
                  <DatePicker
                    value={dateRangeProps?.endDate}
                    onChange={changeDateEnd}
                    format={dateRangeProps?.format || defaultFormat}
                  />
                </span>
              </span>
            </dd>
          </div>
        </dl>
        <div className="group-align-right">
          <Button 
            size={"medium"} 
            themeColor={"dark"}
            onClick={() => searchEvent?.()}
          >
            <i className="icon icon-search"></i>
            {t('common.search')/* 검색 */}
          </Button>
        </div>
      </div>
    </section>
  );
}
