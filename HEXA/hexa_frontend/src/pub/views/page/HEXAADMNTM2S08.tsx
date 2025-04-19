// HEXAADMNTM2S08 : 공지사항 상세

import { Link } from "react-router-dom";

export default function HEXAADMNTM2S08() {
  const content = `<p style="text-align: center;"><img src="https://www.telerik.com/kendo-react-ui-develop/components/inputs/colorpicker/assets/kendoka.png" alt="KendoReact Kendoka" title="KendoReact" width="100" height="100" /></p><p><strong>KendoReact Editor</strong> allows your users to edit HTML in a familiar, user-friendly way.<br>In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists, and image handling. The widget <strong>outputs identical HTML</strong> across all major browsers, follows accessibility standards and provides <a href="https://www.telerik.com/kendo-react-ui/components/editor/tools/" target="_blank" title="https://www.telerik.com/kendo-react-ui/components/editor/tools/">multiple tools</a> for content manipulation.</p><p>Features include:</p><ul><li><p>Text formatting &amp; alignment</p></li><li><p>Bulleted and numbered lists</p></li><li><p>Hyperlink and image dialogs</p></li><li><p>Identical HTML output across modern browsers</p></li><li><p><a href="https://www.telerik.com/kendo-react-ui/knowledge-base/add-custom-tools-to-the-editor-and-customize-built-in-tools/" target="_blank" title="Customize tools" />Highly customizable tools</a></p></li></ul><p></p><p>The Editor has a table option as well, allowing to add and edit tabular data.<br /></p><table><tbody><tr><td><p style="text-align: center;"><strong>Product Id</strong></p></td><td><p style="text-align: center;"><strong>Product Name</strong></p></td><td><p style="text-align: center;"><strong>Price</strong></p></td></tr><tr><td><p>1</p></td><td><p>Chai</p></td><td><p style="text-align: right;">18</p></td></tr><tr><td><p>2</p></td><td><p>Chang</p></td><td><p style="text-align: right;">19</p></td></tr><tr><td><p>3</p></td><td><p>Aniseed Syrup</p></td><td><p style="text-align: right;">10</p></td></tr></tbody></table><p></p>`;

  return (
    <>
      <div className="breadcrumbs">
        <span>홈</span>
        <span>게시판 </span>
        <span>공지사항 </span>
        <span>공지사항 상세</span>
      </div>

      <div className="head-group">
        <h2 className="t-header">공지사항 상세</h2>
      </div>

      <section className="section">
        <table className="tbl-base">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "40%" }} />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">제목</th>
              <td>HEXA 시스템 점검 안내입니다.</td>
              <th scope="row">등록일시</th>
              <td>
                <span className="cell-date">2024-07-19</span>
                <span className="cell-time">20:08:19</span>
              </td>
            </tr>
            <tr>
              <th scope="row">내용</th>
              <td colSpan={3}>
                <div
                  className="notice-cont"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </td>
            </tr>
            <tr>
              <th scope="row">파일 첨부</th>
              <td colSpan={3}>
                <Link to="/" className="file-item">
                  stationInfo_20240725_v1.xlxs
                </Link>
                <Link to="/" className="file-item">
                  stationInfo_20240725_v1.xlxs
                </Link>
                <Link to="/" className="file-item">
                  stationInfo_20240725_v1.xlxs
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
