import { Link } from "react-router-dom";

export default function Guide() {
  return (
    <div className="scrollbox" style={{ padding: "1.5rem" }}>
      <div className="k-float-right">
        <Link to="/pub/guide/Home">
          <span>Home</span>
        </Link>
        &nbsp;&nbsp;
        <Link to="/pub/guide/Guide">
          <span>Map</span>
        </Link>
        &nbsp;&nbsp;
        <Link to="/pub/guide/ComponentsList">
          <span>Conponents</span>
        </Link>
      </div>
      <br />
      <h1>기본 정책</h1>
      <br />
      <div>
        <h2>프로젝트 환경</h2>
        <div>
          <table className="tbl-base">
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "80%" }} />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">문서 및 버전</th>
                <td>HTML5, CSS3, JavaScript, React</td>
              </tr>
              <tr>
                <th scope="row">인코딩</th>
                <td>UTF-8</td>
              </tr>
              <tr>
                <th scope="row">웹 유형</th>
                <td>PC, Mobile</td>
              </tr>
              <tr>
                <th scope="row">해상도 기준 / 디자인 너비</th>
                <td>1920px / 1080px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
      <div>
        <h2>파일 / 폴더 규칙</h2>
        <div>
          <table className="tbl-base">
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "40%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>분류 </th>
                <th>폴더</th>
                <th>파일 이름</th>
                <th>파일 설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>폰트</td>
                <td>assets/fonts</td>
                <td>
                  Pretendard-Black.woff2 <br />
                  Pretendard-ExtraBold.woff2 <br />
                  Pretendard-Bold.woff2 <br />
                  Pretendard-SemiBold.woff2 <br />
                  Pretendard-Medium.woff2 <br />
                  Pretendard-Regular.woff2 <br />
                  Pretendard-Light.woff2 <br />
                  Pretendard-ExtraLight.woff2
                </td>
                <td>프리텐다드 폰트 사용</td>
              </tr>
              <tr>
                <td>CSS</td>
                <td>assets/css</td>
                <td>style.css</td>
                <td>스타일 - 가져오기</td>
              </tr>
              <tr>
                <td>SCSS</td>
                <td>assets/css</td>
                <td>
                  style.scss <br />
                  _variables.scss <br />
                  _reset.scss <br />
                  _button.scss <br />
                  _common.scss <br />
                  _dashboard.scss <br />
                  _home.scss <br />
                  _mobile.scss <br />
                  _k-ui.scss <br />
                </td>
                <td>
                  스타일 - 가져오기 <br />
                  스타일 - 변수 <br />
                  스타일 - 초기화 <br />
                  스타일 - 버튼 <br />
                  스타일 - 공통 영역 <br />
                  스타일 - 대시보드 <br />
                  스타일 - 홈 <br />
                  스타일 - 모바일 <br />
                  스타일 - kendo ui custom <br />
                </td>
              </tr>
              <tr>
                <td>img</td>
                <td>public/images</td>
                <td></td>
                <td>이미지</td>
              </tr>
              <tr>
                <td>메일</td>
                <td>public/mail</td>
                <td></td>
                <td>메일폼</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
      <div>
        <h2>VSCode 확장프로그램</h2>
        <div>
          <table className="tbl-base">
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "60%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">Live Sass Compiler</th>
                <td>
                  <div>
                    &#123; "liveSassCompile.settings.autoprefix": [ "&gt; 1%",
                    "last 2 versions" ], &#125;
                  </div>
                </td>
                <td>autoprefix 사용</td>
              </tr>
              <tr>
                <th scope="row">Prittier - Code formatter</th>
                <td>.prettiercc</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
