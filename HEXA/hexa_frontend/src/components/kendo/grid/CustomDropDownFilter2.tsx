import { useRef, useState } from "react";
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
  defaultItem: string;
}
function CustomDropDownFilter(props: Readonly<CustomDropDownFilterType>) {
  const [state, setState] = useState({
    data: props?.data,
    loading: false,
  });
  const delay = 300;

  const onChange = (event: DropDownListChangeEvent) => {
    const isAllSelected = event.target.value === "ALL";
    props?.onChange?.({
      value: isAllSelected ? "" : event.target.value,
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
      setState({
        data: filterData(event.filter),
        loading: false,
      });
    }, delay);
  };

  return (
    <DropDownList
      filterable
      data={state.data}
      onChange={onChange}
      value={props?.value || props?.defaultItem}
      defaultItem={props?.defaultItem}
      onFilterChange={filterChange}
    />
  );
}

export default CustomDropDownFilter;
