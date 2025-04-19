import {
  Editor as KendoEditor,
  EditorTools,
} from "@progress/kendo-react-editor";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";
const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  FontSize,
  FormatBlock,
  Link,
  Unlink,
  InsertImage,
  ViewHtml,
  InsertTable,
  AddRowBefore,
  AddRowAfter,
  AddColumnBefore,
  AddColumnAfter,
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  MergeCells,
  SplitCell,
} = EditorTools;

export default function Editor(fieldRenderProps: FieldRenderProps) {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    hint,
    optional,
    value,
    onChange,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;

  const onChangeHandler = (event: { html: string }) => {
    onChange({ value: event.html });
  };

  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid} optional={optional}>
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <KendoEditor
          defaultEditMode="div"
          contentStyle={{ height: 150 }}
          value={value}
          onChange={onChangeHandler}
          tools={[
            [Bold, Italic, Underline, Strikethrough],
            [Subscript, Superscript],
            [AlignLeft, AlignCenter, AlignRight, AlignJustify],
            [Indent, Outdent],
            [OrderedList, UnorderedList],
            FontSize,
            FormatBlock,
            [Undo, Redo],
            [Link, Unlink, InsertImage, ViewHtml],
            [InsertTable],
            [
              AddRowBefore,
              AddRowAfter,
              AddColumnBefore,
              AddColumnAfter,
            ],
            [DeleteRow, DeleteColumn, DeleteTable],
            [MergeCells, SplitCell],
          ]}
          {...others}
        />
        {showHint && <Hint>{hint}</Hint>}
        {showValidationMessage && <Error>{validationMessage}</Error>}
      </div>
    </FieldWrapper>
  );
}
