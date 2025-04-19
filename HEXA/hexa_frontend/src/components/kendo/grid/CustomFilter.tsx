import * as React from 'react';
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';
import { GridFilterCellProps } from '@progress/kendo-react-grid';

function CustomFilterCell(props:any, refetchGrid:Function) {
  console.log('CustomFilterCell props', props, refetchGrid)
  const { field, filter, onChange } = props;

  const renderFilter = () => {
    if (field === 'category') {
      return (
        <DropDownList
          data={['Category1', 'Category2', 'Category3']}
          value={filter ? filter.value : ''}
          onChange={(e: DropDownListChangeEvent) => onChange({
            value: e.target.value,
            operator: 'eq',
            syntheticEvent: e.syntheticEvent
          })}
        />
      );
    } 
    else {
      return (
        <Input
          value={props.value}
          onChange={(e: InputChangeEvent) => onChange({
            value: e.target.value,
            operator: 'contains',
            syntheticEvent: e.syntheticEvent
          })}
        />
      );
    }
  };

  return (
    <div className="k-filtercell">
      {renderFilter()}
    </div>
  );
};

export default CustomFilterCell;
