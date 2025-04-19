import { useRef, forwardRef, useImperativeHandle} from 'react'

import {
  Editor as KendoEditor,
  EditorTools,
  EditorUtils
} from "@progress/kendo-react-editor";
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

const Editor = (props: any, ref: any) => {

  const editorRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getHtml: () => getHtml()
  }))

  const getHtml = () => {
    if(editorRef) {
      return EditorUtils.getHtml((editorRef?.current as any)?.view?.state)
    }
  }

  return (
    <KendoEditor
      ref={editorRef}
      defaultEditMode="iframe"
      contentStyle={{ height: 150 }}
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
      {...props}
    />
  );
}

export default forwardRef(Editor);
