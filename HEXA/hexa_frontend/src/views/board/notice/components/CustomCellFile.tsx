const CustomCellFile = (props: any) => {

  const { dataItem } = props;

  const file = dataItem.file;

  const onClick = () => {
    props.onClick(dataItem);
  }

  return (
    <td colSpan={1}>
      {file != null && <i className="icon ico-files"></i>}
      <span onClick={onClick} style={{ textDecoration: 'underline', cursor:'pointer'}}> { file.fileName }</span>
    </td>
  );
};

export default CustomCellFile;