// 	HEXAADMNTM2P10 : 미리보기 팝업

import { Link } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";

export default function HEXAADMNTM2P10() {
  const content = `<p style="text-align: center;"><img src="https://www.telerik.com/kendo-react-ui-develop/components/inputs/colorpicker/assets/kendoka.png" alt="KendoReact Kendoka" title="KendoReact" width="100" height="100" /></p><p><strong>KendoReact Editor</strong> allows your users to edit HTML in a familiar, user-friendly way.<br>In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists, and image handling. The widget <strong>outputs identical HTML</strong> across all major browsers, follows accessibility standards and provides <a href="https://www.telerik.com/kendo-react-ui/components/editor/tools/" target="_blank" title="https://www.telerik.com/kendo-react-ui/components/editor/tools/">multiple tools</a> for content manipulation.</p><p>Features include:</p><ul><li><p>Text formatting &amp; alignment</p></li><li><p>Bulleted and numbered lists</p></li><li><p>Hyperlink and image dialogs</p></li><li><p>Identical HTML output across modern browsers</p></li><li><p><a href="https://www.telerik.com/kendo-react-ui/knowledge-base/add-custom-tools-to-the-editor-and-customize-built-in-tools/" target="_blank" title="Customize tools" />Highly customizable tools</a></p></li></ul><p></p><p>The Editor has a table option as well, allowing to add and edit tabular data.<br /></p><table><tbody><tr><td><p style="text-align: center;"><strong>Product Id</strong></p></td><td><p style="text-align: center;"><strong>Product Name</strong></p></td><td><p style="text-align: center;"><strong>Price</strong></p></td></tr><tr><td><p>1</p></td><td><p>Chai</p></td><td><p style="text-align: right;">18</p></td></tr><tr><td><p>2</p></td><td><p>Chang</p></td><td><p style="text-align: right;">19</p></td></tr><tr><td><p>3</p></td><td><p>Aniseed Syrup</p></td><td><p style="text-align: right;">10</p></td></tr></tbody></table><p></p>`;

  return (
    <>
      <div className="notice-pop-head">
        <div className="notice-pop-title">공지 미리보기</div>
        {/* 2024-11-22 'x' 버튼 삭제 */}
      </div>
      <div className="notice-pop-body">
        <div className="notice-title">공지사항 제목이 출력됩니다.</div>

        <div className="notice-cont">
          <div className="notice-file">
            <Link to="/">사이트 이용약관v2.docx</Link>
            <Link to="/">사이트 이용약관v2.docx</Link>
            <Link to="/">사이트 이용약관v2.docx</Link>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
    </>
  );
}
