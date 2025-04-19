import { useEffect } from "react";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import {
  DatePicker,
  DateTimePicker,
  DatePickerChangeEvent,
  DateTimePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import _ from "lodash";
import {Input, InputChangeEvent} from "@progress/kendo-react-inputs";

const searchType = [
  {'code':'전체','value':'ALL'},
  {'code':'BMS','value':'BMS'},
  {'code':'CTO','value':'CTO'}
]

export type SearchBoxProps = {
  startDate: Date | null;
  endDate: Date | null;
  value?: string;
  format?: string;
  type?: string;
  allFlag: boolean;
  initState?: string;
  btryId?: string;
};

export type Props = {
  setSearchBoxProps?: React.Dispatch<React.SetStateAction<SearchBoxProps>>;
  searchProps: SearchBoxProps;
  searchEvent?: () => void;
  handleGraphType?: (e: DropDownListChangeEvent) => void;
};
export default function SearchBox(props: Props) {
  const { t } = useTranslation();
  const { setSearchBoxProps, searchProps, searchEvent } = props;
  const defaultFormat = searchProps?.type === 'date'? t('format.date') : t('format.date-time');

  const initState = searchProps?.initState;
  const [state, setState] = useState({
    today: initState === 'today',
    week: initState === 'week',
    month: initState === 'month',
    all: initState === 'all',
  });
  const [origin, setOrigin] = useState({
    dateRangeProps: searchProps,
    state: state,
  });

  const getSelectDateValue = (selectDate : Date | null, type: string) => {
    let resultDate = _.cloneDeep(selectDate);
    if(searchProps?.format) {
      const formatLength = searchProps?.format.length
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
    setSearchBoxProps?.((prevState) => ({
      ...prevState,
      startDate: date,
      allFlag: false,
    }));
    setState({
      today: false,
      week: false,
      month: false,
      all: false,
    })
  };
  const changeDateEnd = (event: DatePickerChangeEvent | DateTimePickerChangeEvent) => {
    const date = getSelectDateValue(event.value, 'end')
    setSearchBoxProps?.((prevState) => ({
      ...prevState,
      endDate: date,
      allFlag: false,
    }));
    setState({
      today: false,
      week: false,
      month: false,
      all: false,
    })
  };
  const todayDate = () => {
    const currentDate = new Date();
    setSearchBoxProps?.((prevState) => ({
      ...prevState,
      startDate: getSelectDateValue(currentDate, 'start'),
      endDate: getSelectDateValue(currentDate, 'end'),
      allFlag: false,
    }));
    setState((prevState) => ({
      today: true,
      week: false,
      month: false,
      all: false,
    }));
  };
  const addDate = (range: string) => {
    const currentDate = new Date();
    if (range === "week") {
      setSearchBoxProps?.((prevState) => ({
        ...prevState,
        startDate: getSelectDateValue(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000), 'start'),
        endDate: getSelectDateValue(currentDate, 'end'),
        allFlag: false,
      }));
      setState((prevState) => ({
        today: false,
        week: true,
        month: false,
        all: false,
      }));
    } else if (range === "month") {
      const startDate = new Date();
      setSearchBoxProps?.((prevState) => ({
        ...prevState,
        startDate: getSelectDateValue(new Date(startDate.setMonth(currentDate.getMonth() - 1)), 'start'),
        endDate: getSelectDateValue(currentDate, 'end'),
        allFlag: false,
      }));
      setState((prevState) => ({
        today: false,
        week: false,
        month: true,
        all: false,
      }));
    }
  };
  const allDate = () => {
    setState((prevState) => ({
      today: false,
      week: false,
      month: false,
      all: true,
    }));
    setSearchBoxProps?.((prevState) => ({
      ...prevState,
      allFlag: true,
    }));
  };

  const handleDropDownList = (e: DropDownListChangeEvent) => {
    setSearchBoxProps?.((prevState) => ({
      ...prevState,
      searchType: e.target.value,
    }));
  };

  const handelInput = (e: InputChangeEvent) => {
    setSearchBoxProps?.((prevState) => ({
      ...prevState,
      btryId: e.value,
    }));
  };

  useEffect(() => {
    const origin = _.cloneDeep(searchProps);
    const date = getSelectDateValue(searchProps.startDate, 'start')
    const date2 = getSelectDateValue(searchProps.endDate, 'end')

    origin.startDate = date;
    origin.endDate = date2;


    setSearchBoxProps?.(origin);
    setOrigin?.((prevState) => ({
      ...prevState,
      dateRangeProps: origin,
    }));
  }, [])

  return (
    <>
      <section className="section">
        {/* 검색 박스 */}
        <div className="search-group">
          <dl>
            <div>
              <dt>{t('station.battery_id')}</dt>
              <dd>
                <div className="in-input">
                  <Input className="w300" onChange={handelInput} />
                </div>
              </dd>
            </div>
            <div>
              <dt>{t("common.period")}</dt>
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
                  value="all"
                  selected={state.all}
                  onClick={() => allDate()}
                >
                  {t("date.all")}
                </Button>
              </span>

                <span className="datepicker">
                {
                  (searchProps?.type && searchProps?.type === 'date') ?
                    <span className="cell" style={{width: '150px'}}>
                    <DatePicker
                      value={searchProps?.startDate}
                      onChange={changeDateStart}
                      format={searchProps?.format || defaultFormat}
                    />
                  </span>
                    :
                    <span className="cell" style={{width: '220px'}}>
                    <DateTimePicker
                      value={searchProps?.startDate}
                      onChange={changeDateStart}
                      format={searchProps?.format || defaultFormat}
                    />
                  </span>
                }
                  ~
                  {
                    (searchProps?.type && searchProps?.type === 'date') ?
                      <span className="cell" style={{width: '150px'}}>
                    <DatePicker
                      value={searchProps?.endDate}
                      onChange={changeDateEnd}
                      format={searchProps?.format || defaultFormat}
                    />
                  </span>
                      :
                      <span className="cell" style={{width: '220px'}}>
                    <DateTimePicker
                      value={searchProps?.endDate}
                      onChange={changeDateEnd}
                      format={searchProps?.format || defaultFormat}
                    />
                  </span>
                  }
              </span>
              </dd>
            </div>
          </dl>
          <div className="group-align-right">
            <Button size={"medium"} themeColor={"dark"} onClick={() => searchEvent?.()}>
              <i className="icon icon-search"></i>
              {t("common.search")}
            </Button>
          </div>
        </div>
      </section>


    </>
  );
}

SearchBox.defaultProps = {
  setDateRangeProps: undefined,
  dateRangeProps: undefined,
  searchEvent: undefined,
};
