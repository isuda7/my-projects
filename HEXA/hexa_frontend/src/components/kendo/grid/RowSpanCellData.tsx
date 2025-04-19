import { GridHeader } from "@/components/kendo/grid/interface/GridInterfaces.ts";

function RowSpanCellData<T extends Record<string, any>>(
  columns: GridHeader[],
  data: any[] | T[] ,
  baseField?: string //기준필드, 해당 속성이 들어갈경우 해당 필드를 기준으로 rowSpan 설정된 모든 값이 병합됨
): any[] | T[] {
  //const spanColumns = columns?.filter((col: GridHeader) => col.isRowSpan === true);
  
  const spanColumns = columns.flatMap((col: GridHeader) => 
    col.children ? col.children : col
  ).filter(v => v.isRowSpan === true);

  if(baseField) {
    const column = columns.flatMap((col: GridHeader) => 
      col.children ? col.children : col
    ).find(v => v.field === baseField);

    setRowSpanProcess(data, column.field)
    
    const sapnFields = spanColumns.map(v => v.field)
    data.forEach(v => {
      for(let key in v) {
        if(sapnFields.includes(key)) v[`${key}RowSpan`] = v[`${baseField}RowSpan`]
      }
    })
  }
  else {
    spanColumns.forEach(v => {
      data = setRowSpanProcess(data, v.field)
    })
  }

  return data;
}

const setRowSpanProcess = (data: any[], field: string) => {
  let looped = 1;

  for (let i = 0; i < data.length; i += looped) {
    let rowSpan = 1;
    looped = 1;

    for (let j = i + 1; j < data.length; j++) {
      if (data[i][field] === data[j][field]) {
        looped++;
        rowSpan++;
      } 
      else {
        break;
      }
    }

    data[i][`${field}RowSpan`] =
      rowSpan === 1 ? (looped === 1 ? 1 : undefined) : rowSpan;
  }
  return data;
}

export default RowSpanCellData;
