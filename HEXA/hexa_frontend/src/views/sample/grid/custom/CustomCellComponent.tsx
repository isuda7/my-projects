import { GridCellProps } from "@progress/kendo-react-grid";

const CustomCellComponent = ( props: GridCellProps ) => {
  const {field, dataItem} = props;

  return (
    <div>
      <span style={{
        display: 'inlineBlock', /* Span에 block 속성을 추가 */
        width: '10px',           /* 원의 너비 */
        height: '10px',          /* 원의 높이 */
        backgroundColor: dataItem[field as string], /* 배경색 (원 색상) */
        borderRadius: '50%',    /* 원 모양으로 만듦 */
      }}
      className={`round color-${dataItem[field as string]}`} />
      {dataItem[field as string]}
    </div>
  )
}

export default CustomCellComponent;
