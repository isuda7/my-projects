import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import {
  CompositeFilterDescriptor,
  filterBy,
  FilterDescriptor,
} from "@progress/kendo-data-query";

interface CustomDropDownFilterType {
  field: string;
  data: any[];
  onChange?: (arg0: {
    value: string;
    operator: string;
    syntheticEvent: Event;
  }) => void;
  value?: string;
  defaultItem?: string;
}
function CustomDropDownFilter(props: Readonly<CustomDropDownFilterType>) {
  const {t} = useTranslation();
  const [state, setState] = useState({
    data: props?.data,
    loading: false,
    defaultItem: {code: props?.defaultItem, value: t('common.all')}
  });
  const delay = 300;

  const onChange = (event: DropDownListChangeEvent) => {
    const isAllSelected = event.target.value.code === "ALL";
    props?.onChange?.({
      value: isAllSelected ? "" : event.target.value.code,
      operator: isAllSelected ? "" : "contains",
      syntheticEvent: event.syntheticEvent.nativeEvent,
    });
  };

  const filterData = (filter: CompositeFilterDescriptor | FilterDescriptor) => {
    if (Array.isArray(props?.data)) {
      const data = props?.data?.slice();
      return filterBy(data, filter);
    }
    return [];
  };

  const timeout = useRef<number | undefined>();

  const filterChange = (event: {
    filter: CompositeFilterDescriptor | FilterDescriptor;
  }) => {
    if (timeout.current !== undefined) {
      window.clearTimeout(timeout.current);
    }

    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    timeout.current = window.setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        data: filterData(event.filter),
        loading: false,
      }));
    }, delay);
  };

  const getValueObject = (value:string | number | undefined | boolean) => {
    let resultValue = null;
    const data = state.data;
    if((typeof value === 'boolean' || value) && data.length > 0) {
      resultValue = data.find(v => v.code === value)
    }
    return resultValue;
  }

  return (
    <div className="k-filtercell">
      <DropDownList
        //filterable
        data={state.data}
        onChange={onChange}
        value={getValueObject(props?.value) || state.defaultItem}
        defaultItem={state.defaultItem}
        onFilterChange={filterChange}
        textField="value"
        dataItemKey="code"
      />
    </div>
  );
}

export default CustomDropDownFilter;
