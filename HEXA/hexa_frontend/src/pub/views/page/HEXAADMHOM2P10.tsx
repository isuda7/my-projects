// 	HEXAADMHOM2P10 : 공지 팝업

import * as React from "react";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import { Checkbox } from "@progress/kendo-react-inputs";
import CharthomeBar1 from "../../components/ChartHomeBar1";
import CharthomeBar2 from "../../components/ChartHomeBar2";
import CharthomeBar3 from "../../components/ChartHomeBar3";
import CharthomeBar4 from "../../components/ChartHomeBar4";
import CharthomePie from "../../components/ChartHomePie";

export default function HEXAADMHOM2P10() {
  // 공지 팝업
  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [visible3, setVisible3] = useState(true);

  React.useEffect(() => {
    if (visible1 === false && visible2 === false && visible3 === false) {
      setVisible(false);
    }
  });

  const content = `<p style="text-align: center;"><img src="/images/img-mail-01.png" alt="KendoReact Kendoka" title="KendoReact" width="100" height="100" /></p><p><strong>KendoReact Editor</strong> allows your users to edit HTML in a familiar, user-friendly way.<br>In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists, and image handling. The widget <strong>outputs identical HTML</strong> across all major browsers, follows accessibility standards and provides <a href="https://www.telerik.com/kendo-react-ui/components/editor/tools/" target="_blank" title="https://www.telerik.com/kendo-react-ui/components/editor/tools/">multiple tools</a> for content manipulation.</p><p>Features include:</p><ul><li><p>Text formatting &amp; alignment</p></li><li><p>Bulleted and numbered lists</p></li><li><p>Hyperlink and image dialogs</p></li><li><p>Identical HTML output across modern browsers</p></li><li><p><a href="https://www.telerik.com/kendo-react-ui/knowledge-base/add-custom-tools-to-the-editor-and-customize-built-in-tools/" target="_blank" title="Customize tools" />Highly customizable tools</a></p></li></ul><p></p><p>The Editor has a table option as well, allowing to add and edit tabular data.<br /></p><table><tbody><tr><td><p style="text-align: center;"><strong>Product Id</strong></p></td><td><p style="text-align: center;"><strong>Product Name</strong></p></td><td><p style="text-align: center;"><strong>Price</strong></p></td></tr><tr><td><p>1</p></td><td><p>Chai</p></td><td><p style="text-align: right;">18</p></td></tr><tr><td><p>2</p></td><td><p>Chang</p></td><td><p style="text-align: right;">19</p></td></tr><tr><td><p>3</p></td><td><p>Aniseed Syrup</p></td><td><p style="text-align: right;">10</p></td></tr></tbody></table><p></p>`;

  //chart : bar1
  const chartData1 = [65, 58, 50, 43, 20];

  //chart : pie
  const chartDatapie = [
    { value: 375, name: "1세대" },
    { value: 75, name: "2세대" },
  ];

  //chart : bar2
  const chartData2 = [
    {
      name: "1세대",
      data: [10, 14, 20, 5, 2, 14],
    },
    {
      name: "2세대",
      data: [0, 5, 4, 4, 6, 8],
    },
  ];
  const chartDataX2 = [
    "10월 11일",
    "10월 12일",
    "10월 13일",
    "10월 14일",
    "10월 15일",
    "10월 16일",
  ];

  //chart : bar3
  const chartData3 = [
    {
      name: "1세대",
      data: [50, 105, 81, 25, 63],
    },
    {
      name: "2세대",
      data: [30, 55, 35, 10, 15],
    },
  ];
  const chartDataX3 = [
    "10월 11일",
    "10월 12일",
    "10월 13일",
    "10월 14일",
    "10월 15일",
  ];

  //chart : bar4
  const chartData4 = [
    {
      name: "1세대 교환 실패",
      data: [5, 2, 10, 2, 8],
    },
    {
      name: "1세대 인증 실패",
      data: [12, 16, 11, 39, 34],
    },
    {
      name: "2세대 교환 실패",
      data: [0, 6, 1, 8, 2],
    },
    {
      name: "2세대 인증 실패",
      data: [3, 10, 5, 20, 15],
    },
  ];
  const chartDataX4 = [
    "10월 11일",
    "10월 12일",
    "10월 13일",
    "10월 14일",
    "10월 15일",
  ];

  //chart : bar5
  const chartData5 = [
    {
      name: "1세대",
      data: [10, 14, 20, 5, 2, 14, 10, 8],
    },
    {
      name: "2세대",
      data: [0, 5, 4, 4, 6, 8, 5, 2],
    },
  ];
  const chartDataX5 = [
    "10월 11일",
    "10월 12일",
    "10월 13일",
    "10월 14일",
    "10월 15일",
    "10월 16일",
    "10월 17일",
    "10월 18일",
  ];

  return (
    <>
      <div className="home">
        <div className="t-update">
          <span>업데이트 일시 2024-08-05 22:00:10</span>
          <Button themeColor={"info"}>
            <i className="icon icon-refresh-thin"></i>
          </Button>
        </div>
        <div className="home-row">
          {/* 스테이션 */}
          <div className="home-box type-title">
            <h2>스테이션</h2>
          </div>

          {/* 누적교환건수 순위 */}
          <div className="home-box type-ranking">
            <h3>10월 누적교환건수 순위</h3>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>
            <div className="home-chart-bar1">
              <ul>
                <li>
                  <span className="flag-2">2세대</span>
                  <span className="tit">GS25 아름다운미소점</span>
                </li>
                <li>
                  <span className="flag-2">2세대</span>
                  <span className="tit">본도시락 문정법조타운점</span>
                </li>
                <li>
                  <span className="flag-1">1세대</span>
                  <span className="tit">하이큐바이크관약점</span>
                </li>
                <li>
                  <span className="flag-2">2세대</span>
                  <span className="tit">GS25 양재강남점</span>
                </li>
                <li>
                  <span className="flag-2">2세대</span>
                  <span className="tit">GS25 신림관악점</span>
                </li>
              </ul>
              <CharthomeBar1 data={chartData1} />
            </div>
          </div>

          {/* 운영 현황 */}
          <div className="home-box type-situation">
            <h3>운영 현황</h3>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>
            <div className="home-chart-pie">
              <div className="chart-legend">
                <span className="round-g1">1세대</span>
                <span className="round-g2">2세대</span>
              </div>
              <div className="chart-total">
                <span className="tit">전체</span>
                <span className="con">450</span>
              </div>
              <CharthomePie data={chartDatapie} />
            </div>
          </div>

          {/* 일별 진단 건수 */}
          <div className="home-box type-diagnosis">
            <h3>일별 진단 건수</h3>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>
            <div className="home-chart-bar2">
              <CharthomeBar2 data={chartData2} dataX={chartDataX2} />
            </div>
          </div>
        </div>

        {/* 배터리 */}
        <div className="home-row">
          <div className="home-box type-title">
            <h2>배터리</h2>
          </div>

          {/* 교환 성공 */}
          <div className="home-box type-success">
            <h3>교환 성공</h3>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>
            <div className="home-chart-bar3">
              <CharthomeBar3 data={chartData3} dataX={chartDataX3} />
            </div>
          </div>

          {/* 교환 실패 */}
          <div className="home-box type-fail">
            <h3>교환 실패</h3>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>

            <div className="home-chart-bar4">
              <div className="chart-legend">
                <span className="round-g1">1세대 교환실패</span>
                <span className="round-g1-1"> 1세대 인증실패</span>
                <span className="round-g2">2세대 교환실패</span>
                <span className="round-g2-1">2세대 인증실패</span>
              </div>
              <CharthomeBar4 data={chartData4} dataX={chartDataX4} />
            </div>
          </div>
        </div>

        <div className="home-row">
          {/* 통신단절 건수 */}
          <div className="home-box type-disconnection">
            <h2>통신단절 건수</h2>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>

            <div className="home-chart-bar5">
              <CharthomeBar2 data={chartData5} dataX={chartDataX5} />
            </div>
          </div>

          {/* 공지사항 */}
          <div className="home-box type-notice">
            <h2>공지사항</h2>
            <Button fillMode="flat" className="btn-arr">
              더보기
            </Button>

            <ul className="home-notice">
              <li>
                <Link to="/">정기 시스템 점검 안내</Link>
                <span>
                  <span className="cell-date">2024-11-17</span>
                  <span className="cell-time">23:16:54</span>
                </span>
              </li>
              <li>
                <Link to="/">정기 시스템 점검 안내</Link>
                <span>
                  <span className="cell-date">2024-11-17</span>
                  <span className="cell-time">23:16:54</span>
                </span>
              </li>
              <li>
                <Link to="/">정기 시스템 점검 안내</Link>
                <span>
                  <span className="cell-date">2024-11-17</span>
                  <span className="cell-time">23:16:54</span>
                </span>
              </li>
              <li>
                <Link to="/">정기 시스템 점검 안내</Link>
                <span>
                  <span className="cell-date">2024-11-17</span>
                  <span className="cell-time">23:16:54</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 공지사항 팝업 */}
      {visible && (
        <div className="notice-pop">
          {visible1 && (
            <div className="win-pop">
              <div className="notice-pop-head">
                <div className="notice-pop-title">공지사항</div>
                <Button
                  size={"small"}
                  fillMode="flat"
                  className="notice-pop-close"
                  onClick={() => setVisible1(false)}
                >
                  <span className="sr-only">닫기</span>
                </Button>
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
              <div className="notice-pop-footer">
                <div className="chexkbox-round">
                  <Checkbox
                    label="오늘 하루 그만 보기"
                    defaultChecked={false}
                  />
                </div>
              </div>
            </div>
          )}
          {visible2 && (
            <div className="win-pop">
              <div className="notice-pop-head">
                <div className="notice-pop-title">공지사항</div>
                <Button
                  size={"small"}
                  fillMode="flat"
                  className="notice-pop-close"
                  onClick={() => setVisible2(false)}
                >
                  <span className="sr-only">닫기</span>
                </Button>
              </div>
              <div className="notice-pop-body">
                <div className="notice-title">공지사항 제목이 출력됩니다.</div>
                <div className="notice-cont">
                  <div className="notice-file">
                    <Link to="/">사이트 이용약관v2.docx</Link>
                    <Link to="/">사이트 이용약관v2.docx</Link>
                    <Link to="/">사이트 이용약관v2.docx</Link>
                  </div>
                  <div>공지사항 내용이 출력됩니다.</div>
                </div>
              </div>
              <div className="notice-pop-footer">
                <div className="chexkbox-round">
                  <Checkbox
                    label="오늘 하루 그만 보기"
                    defaultChecked={false}
                  />
                </div>
              </div>
            </div>
          )}
          {visible3 && (
            <div className="win-pop">
              <div className="notice-pop-head">
                <div className="notice-pop-title">공지사항</div>
                <Button
                  size={"small"}
                  fillMode="flat"
                  className="notice-pop-close"
                  onClick={() => setVisible3(false)}
                >
                  <span className="sr-only">닫기</span>
                </Button>
              </div>
              <div className="notice-pop-body">
                <div className="notice-title">공지사항 제목이 출력됩니다.</div>
                <div className="notice-cont">
                  <div className="notice-file">
                    <Link to="/">사이트 이용약관v2.docx</Link>
                    <Link to="/">사이트 이용약관v2.docx</Link>
                    <Link to="/">사이트 이용약관v2.docx</Link>
                  </div>
                  <div>공지사항 내용이 출력됩니다.</div>
                </div>
              </div>
              <div className="notice-pop-footer">
                <div className="chexkbox-round">
                  <Checkbox
                    label="오늘 하루 그만 보기"
                    defaultChecked={false}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
