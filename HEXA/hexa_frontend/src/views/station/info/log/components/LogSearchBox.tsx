/**
 * 스테이션 로그 다운로드 - 검색박스 Component
 * URL: /station/info/log - 검색박스
 */

import { useEffect } from "react";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import {
  DatePicker,
  DatePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import _ from "lodash";

export type DateRangeProps = {
  startDate: Date | null;
  endDate: Date | null;
  value?: string;
  initState?: string;
  stationId?: string;
};

export type Props = {
  setDateRangeProps?: React.Dispatch<React.SetStateAction<DateRangeProps>>;
  dateRangeProps: DateRangeProps;
  searchEvent?: () => void;
  requestLog?: () => void;
};
export default function LogSearchBox(props: Props) {
  const { t } = useTranslation();
  const { setDateRangeProps, dateRangeProps, searchEvent, requestLog } = props;

  const defaultFormat = t('format.date');

  const initState = dateRangeProps?.initState;

  const [state, setState] = useState({
    today: initState === 'today',
    week: initState === 'week',
    month: initState === 'month',
  });

  const [origin, setOrigin] = useState({
    dateRangeProps: dateRangeProps,
    state: state,
  });

  const getSelectDateValue = (selectDate : Date | null, type: string) => {
    console.log('selectDate', selectDate)
    let resultDate = _.cloneDeep(selectDate);

    if(type === 'start') resultDate?.setHours(0, 0, 0, 0)  
    else resultDate?.setHours(23, 59, 59, 999); 

    return resultDate;
  }

  const changeDateStart = (event: DatePickerChangeEvent) => {
    const date = getSelectDateValue(event.value, 'start')
    setDateRangeProps?.((prevState) => ({
      ...prevState,
      startDate: date,
    }));
    setState({
      today: false,
      week: false,
      month: false,
    })
  };
  const changeDateEnd = (event: DatePickerChangeEvent) => {
    const date = getSelectDateValue(event.value, 'end')
    setDateRangeProps?.((prevState) => ({
      ...prevState,
      endDate: date,
    }));
    setState({
      today: false,
      week: false,
      month: false,
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
    returnDate.setDate(returnDate.getDate() + 1);
    
    return returnDate;
  }

  const addDate = (range: string) => {
    const currentDate = new Date();
    const startDate = getStartDate(currentDate, range)

    if (range === "week") {
      setDateRangeProps?.((prevState) => ({
        ...prevState,
        startDate: getSelectDateValue(startDate, 'start'),
        endDate: getSelectDateValue(currentDate, 'end'),
      }));
      setState((prevState) => ({
        today: false,
        week: true,
        month: false,
      }));
    } 
    else if (range === "month") {
      setDateRangeProps?.((prevState) => ({
        ...prevState,
        startDate: getSelectDateValue(startDate, 'start'),
        endDate: getSelectDateValue(currentDate, 'end'),
      }));
      setState((prevState) => ({
        today: false,
        week: false,
        month: true,
      }));
    }
  };

  const resetDate = () => {
    console.log('origin', origin)
    setDateRangeProps?.(origin.dateRangeProps);
    setState(origin.state);
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
            <dt>
              {/* 스테이션 ID */}
              {t('station.station_id')}
            </dt>
            <dd>
              <div className="in-input">
                <div className="inner-item">
                  <Input
                    value={dateRangeProps.stationId}
                    onChange={(e) => {
                      setDateRangeProps?.((prevState) => ({
                        ...prevState,
                        stationId: e.value,
                      }));
                    }}
                    className="w300"
                  />
                  <Button 
                    fillMode="outline" 
                    size={"medium"}
                    onClick={() => searchEvent?.()}
                  >
                    {t('common.lookup') /* 조회 */}
                  </Button>
                </div>
              </div>
            </dd>
          </div>

          <div>
            <dt>
              {/* 로그 기간 */}
              {t('station.log_date_range')}
            </dt>
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
              </span>

              <span className="datepicker">
                <span className="cell" style={{ width: '150px' }}>
                  <DatePicker
                    value={dateRangeProps?.startDate}
                    onChange={changeDateStart}
                    format={defaultFormat}
                  />
                </span>
                ~
                <span className="cell" style={{ width: '150px' }}>
                  <DatePicker
                    value={dateRangeProps?.endDate}
                    onChange={changeDateEnd}
                    format={defaultFormat}
                  />
                </span>
              </span>
            </dd>
          </div>
        </dl>
        <div className="group-align-right">
          <Button 
            size={"medium"} 
            fillMode="outline"
            onClick={() => resetDate()}
          >
            <i className="icon icon-refresh"></i>
            {t('common.reset')/* 초기화 */}
          </Button>
          <Button 
            size={"medium"} 
            themeColor={"dark"}
            onClick={() => requestLog?.()}
          >
            <i className="icon icon-search"></i>
            {t('station.log_request')/* 로그요청 */}
          </Button>
        </div>
      </div>
    </section>
  );
}
