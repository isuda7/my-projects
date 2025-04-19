import { Link } from "react-router-dom";
import "../../../assets/css/guide.css";
import { useEffect, useState } from "react";

export default function Guide() {
  const [listTotal, setlistTotal] = useState<number>();
  const [listDone, setlistDone] = useState<number>();
  const [listAvg, setListAvg] = useState<number>();

  useEffect(() => {
    const trTotal: number =
      document.querySelectorAll("tbody tr").length -
      document.querySelectorAll("tr.exception").length -
      document.querySelectorAll("tr.del").length;
    const trDone: number =
      document.querySelectorAll("tr.done").length +
      document.querySelectorAll("tr.modify").length;
    setlistTotal(trTotal);
    setlistDone(trDone);

    const avg = (trDone / trTotal) * 100;
    setListAvg(Math.floor(avg));
  });

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
      <h1>Map</h1>
      <div>
        <div className="guide">
          <div className="counter">
            전체 {listTotal} / 완료 {listDone} ({listAvg}%)
          </div>
          <table className="tbl-base" id="pubMap">
            <colgroup>
              <col style={{ width: "9%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "13%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "17%" }} />
            </colgroup>

            <caption hidden>guide map</caption>
            <thead>
              <tr>
                <th className="k-text-center">Depth1</th>
                <th className="k-text-center">Depth2</th>
                <th className="k-text-center">Depth3</th>
                <th className="k-text-center">Depth4</th>
                <th className="k-text-center">Link</th>
                <th className="k-text-center">update</th>
                <th className="k-text-center">Memo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="exception">
                <td>가이드</td>
                <td>레이아웃</td>
                <td>-</td>
                <td></td>
                <td>
                  <Link to="/pub/page/PageDefault" target="_blank">
                    PageDefault
                  </Link>
                </td>
                <td>
                  <span></span>
                </td>
                <td></td>
              </tr>
              <tr className="exception">
                <td></td>
                <td></td>
                <td>basic</td>
                <td></td>
                <td>
                  <Link to="/pub/page/PageDefaultBasic" target="_blank">
                    PageDefault basic
                  </Link>
                </td>
                <td>
                  <span></span>
                </td>
                <td></td>
              </tr>
              <tr className="exception">
                <td></td>
                <td></td>
                <td>mobile</td>
                <td></td>
                <td>
                  <Link to="/pub/page/PageDefaultMobile" target="_blank">
                    PageDefault mobile
                  </Link>
                </td>
                <td>
                  <span></span>
                </td>
                <td></td>
              </tr>
            </tbody>
            <tbody>
              <tr className="done">
                <td>로그인</td>
                <td>로그인</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM2S10" target="_blank">
                    HEXAADMCOM2S10
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>사용자 인증</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM3S11" target="_blank">
                    HEXAADMCOM3S11
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>비밀번호 재설정 </td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM3S12" target="_blank">
                    HEXAADMCOM3S12
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
            </tbody>
            <tbody>
              <tr className="done">
                <td>내정보</td>
                <td>마이페이지</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM2S00" target="_blank">
                    HEXAADMCOM2S00
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>비밀번호 변경</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM3S01" target="_blank">
                    HEXAADMCOM3S01
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>로그아웃</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM3P02" target="_blank">
                    HEXAADMCOM3P02
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>비밀번호 변경 안내 </td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM2P03" target="_blank">
                    HEXAADMCOM2P03
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>자동 로그아웃 안내 </td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM2P04" target="_blank">
                    HEXAADMCOM2P04
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>휴대폰번호 등록 안내 </td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM3P05" target="_blank">
                    HEXAADMCOM3P05
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
            </tbody>
            <tbody>
              <tr className="done">
                <td>기타</td>
                <td>페이지 없음</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM2S01" target="_blank">
                    HEXAADMCOM2S01
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td>[2024-10-31] 취소 → 이전 버튼명 수정</td>
              </tr>
              <tr className="done">
                <td></td>
                <td>서비스 접속 불가 </td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM2S02" target="_blank">
                    HEXAADMCOM2S02
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>시스템 접속 지연</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM2S03" target="_blank">
                    HEXAADMCOM2S03
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>로딩중</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMCOM2S04" target="_blank">
                    HEXAADMCOM2S04
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
            </tbody>
            <tbody>
              <tr className="modify">
                <td>홈</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2S00" target="_blank">
                    HEXAADMHOM2S00
                  </Link>
                  <br />
                  <Link to="/pub/page/HEXAADMHOM2S00en" target="_blank">
                    HEXAADMHOM2S00 en
                  </Link>
                </td>
                <td>
                  <span>2024-11-27</span>
                </td>
                <td>
                  [2024-11-20]
                  <br /> - 업데이트 일시 영역에 새로고침 버튼 추가
                  <br /> [2024-11-27] 새로고침 버튼 디자인 수정
                </td>
              </tr>
              <tr className="done">
                <td></td>
                <td>공지팝업</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P10" target="_blank">
                    HEXAADMHOM2P10
                  </Link>
                </td>
                <td>
                  <span>2024-11-20</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td>대시보드</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2S01" target="_blank">
                    HEXAADMHOM2S01
                  </Link>
                  <br />
                  <Link to="/pub/page/HEXAADMHOM2S01en" target="_blank">
                    HEXAADMHOM2S01 en
                  </Link>
                </td>
                <td>
                  <span>2024-11-20</span>
                </td>
                <td>
                  [2024-11-15]
                  <br /> - 상세화면 영역 상세보기 버튼 삭제. QRID 및 스테이션명
                  링크 추가
                  <br /> [2024-11-20]
                  <br /> - 그래프 툴팁 추가
                  <br /> - 교환중 숫자 링크 추가
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td>스테이션 목록 팝업</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P07" target="_blank">
                    HEXAADMHOM2P07
                  </Link>
                </td>
                <td>
                  <span>2024-11-15</span>
                </td>
                <td>[2024-11-15] QR ID 항목 추가</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td>진단 스테이션 목록 - 2세대 팝업</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P08" target="_blank">
                    HEXAADMHOM2P08
                  </Link>
                </td>
                <td>
                  <span>2024-11-15</span>
                </td>
                <td>[2024-11-15] QR ID 항목 추가</td>
              </tr>
              <tr className="done">
                <td></td>
                <td>진단 스테이션 목록 - 1세대 팝업</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P13" target="_blank">
                    HEXAADMHOM2P13
                  </Link>
                </td>
                <td>
                  <span>2024-11-20</span>
                </td>
                <td></td>
              </tr>

              <tr className="modify">
                <td></td>
                <td>진단 배터리 목록 팝업</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P09" target="_blank">
                    HEXAADMHOM2P09
                  </Link>
                </td>
                <td>
                  <span>2024-11-15</span>
                </td>
                <td>[2024-11-15] QR ID 항목 추가</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td>잠금 배터리 목록 팝업</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P11" target="_blank">
                    HEXAADMHOM2P11
                  </Link>
                </td>
                <td>
                  <span>2024-11-20</span>
                </td>
                <td>
                  [2024-11-15] QR ID 항목 추가 <br />
                  [2024-11-20] 진단명 항목 추가
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td>예약 배터리 목록 - 2세대 팝업</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P12" target="_blank">
                    HEXAADMHOM2P12
                  </Link>
                </td>
                <td>
                  <span>2024-11-20</span>
                </td>
                <td>
                  [2024-11-15] 항목 수정 <br />
                  [2024-11-20]상태 → 예약 상태 수정
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td>예약 배터리 목록 - 1세대 팝업</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P14" target="_blank">
                    HEXAADMHOM2P14
                  </Link>
                </td>
                <td>
                  <span>2024-11-20</span>
                </td>
                <td>[2024-11-20]상태 → 예약 상태 수정</td>
              </tr>

              <tr className="modify">
                <td></td>
                <td>2세대 상세</td>
                <td>관리자</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P03" target="_blank">
                    HEXAADMHOM2P03
                  </Link>
                </td>
                <td>
                  <span>2024-11-20</span>
                </td>
                <td>
                  [2024-11-20]
                  <br /> - 스테이션 정보 영역에 QR ID 항목 추가
                  <br /> - 충전 프로파일 → 충전 프로파일 NO, 충전 조건 변경
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>일반 사용자</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P04" target="_blank">
                    HEXAADMHOM2P04
                  </Link>
                  <br />
                  <Link to="/pub/page/HEXAADMHOM2P04en" target="_blank">
                    HEXAADMHOM2P04 en
                  </Link>
                </td>
                <td>
                  <span>2024-12-26</span>
                </td>
                <td>
                  [2024-11-15] <br /> - QR ID 항목 추가 <br />
                  - 배출 추천 기능 추가 <br />- 기본 영역에 스테이션ID 추가{" "}
                  <br />
                  [2024-11-16] 스테이션 제어 class 추가 <br />
                  [2024-12-11] 초기화중 버튼 추가 <br />
                  [2024-12-26] 최근 제어 이력 두줄 말줄임 추가
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td>1세대 상세</td>
                <td>관리자</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P05" target="_blank">
                    HEXAADMHOM2P05
                  </Link>
                </td>
                <td>
                  <span>2024-11-20</span>
                </td>
                <td>[2024-11-20] 배터리 상태 목록내 필터 항목 삭제</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>일반 사용자</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMHOM2P06" target="_blank">
                    HEXAADMHOM2P06
                  </Link>
                  <br />
                  <Link to="/pub/page/HEXAADMHOM2P06en" target="_blank">
                    HEXAADMHOM2P06 en
                  </Link>
                </td>
                <td>
                  <span>2024-12-26</span>
                </td>
                <td>
                  [2024-11-15] <br /> - 기본 영역에 스테이션ID 추가. <br /> -
                  슬롯제어 class 'slot-g' 추가 <br />
                  [2024-12-06] 스테이션 제어 정보갱신, 인증 초기화 추가.
                  스테이션 제어 class 추가 <br />
                  [2024-12-26] 최근 제어 이력 두줄 말줄임 추가
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr className="modify">
                <td>스테이션 관리</td>
                <td>스테이션 정보 관리</td>
                <td>생산정보 현황</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S99" target="_blank">
                    HEXAADMSTM2S99
                  </Link>
                </td>
                <td>
                  <span>2024-11-21</span>
                </td>
                <td>
                  [2024-11-18] QR ID 항목 추가 <br />
                  [2024-11-21] 구분 → 모델명
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>스테이션 정보 관리</td>
                <td>스테이션 정보 목록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S00" target="_blank">
                    HEXAADMSTM2S00
                  </Link>
                </td>
                <td>
                  <span>2024-11-21</span>
                </td>
                <td>
                  [2024-11-04] 충전 프로파일NO 개수 항목 추가 <br />
                  [2024-11-18] QR ID 항목 추가 <br />
                  [2024-11-21] SW APP, 슬롯펌웨어 검색 필터 추가. 충전
                  프로파일NO 개수: 숫자들 밑줄 제거.
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>[P]스테이션 정보 엑셀 업로드</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1P02" target="_blank">
                    HEXAADMSTM1P02
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td>- 파일 삭제 버튼 title kendo ui 언어팩 필요</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>스테이션 정보 등록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S01" target="_blank">
                    HEXAADMSTM1S01
                  </Link>
                </td>
                <td>
                  <span>2024-11-25</span>
                </td>
                <td>
                  [2024-10-31] 기기정보 placeholer 추가 <br />
                  [2024-11-18] 사용가능 전력량 콤보박스 추가, 설치사진 항목
                  추가, 대표 함체 수정 <br />
                  [2024-11-25] 사진 첨부 안내문구 추가
                </td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>스테이션 정보 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM3S03" target="_blank">
                    HEXAADMSTM3S03
                  </Link>
                </td>
                <td>
                  <span>2024-11-25</span>
                </td>
                <td>
                  [2024-10-31] 슬롯 사이즈 수정
                  <br />
                  [2024-11-04] 충전 프로파일 정보 영역 추가
                  <br />
                  [2024-11-18] 사용가능전력량, 설치사진 항목 추가, 대표함체 항목
                  수정, 스테이션명 수정가능하도록 변경
                  <br />
                  [2024-11-25] 사진 첨부 안내문구 추가
                </td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 기기 선택 팝업</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2P16" target="_blank">
                    HEXAADMSTM2P16
                  </Link>
                </td>
                <td>
                  <span>2024-11-21</span>
                </td>
                <td>[2024-11-21] 구분 → 모델명 / 등록일시 → 생산일 수정</td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 기기 변경 이력</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2P13" target="_blank">
                    HEXAADMSTM2P13
                  </Link>
                </td>
                <td>
                  <span>2024-11-21</span>
                </td>
                <td>[2024-11-21] 교환일시 → 변경일시</td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 대시보드 제어 이력</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2P14" target="_blank">
                    HEXAADMSTM2P14
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>

              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 설정 변경 이력</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2P15" target="_blank">
                    HEXAADMSTM2P15
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>

              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 사진 크게 보기 </td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2P17" target="_blank">
                    HEXAADMSTM2P17
                  </Link>
                </td>
                <td>
                  <span>2024-11-21</span>
                </td>
                <td></td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td>스테이션 로그 다운로드</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S30" target="_blank">
                    HEXAADMSTM2S30
                  </Link>
                </td>
                <td>
                  <span>2024-11-21</span>
                </td>
                <td>
                  [2024-10-31]
                  <br />- 검색 영역 : 스테이션명 띄어쓰기 수정, 기간선택 기간
                  으로 변경
                  <br />- 검색 버튼 삭제
                  <br />
                  [2024-11-19] 요청일시 추가
                  <br />
                  [2024-11-21] 스테이션명 → 스테이션ID / 기간 → 로그기간 /
                  안내문구 수정
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td>스테이션 코드 관리</td>
                <td>스테이션ID 코드</td>
                <td>스테이션ID 코드 목록 </td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S04" target="_blank">
                    HEXAADMSTM2S04
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td>[2024-10-31] 코드 버튼 디자인 변경</td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>시코드 추가 </td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S05" target="_blank">
                    HEXAADMSTM1S05
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>구코드 추가 </td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S06" target="_blank">
                    HEXAADMSTM1S06
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P]스테이션ID 코드 엑셀 업로드 </td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1P07" target="_blank">
                    HEXAADMSTM1P07
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>스테이션 QR 코드</td>
                <td>스테이션 QR 코드 목록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S10" target="_blank">
                    HEXAADMSTM2S10
                  </Link>
                </td>
                <td>
                  <span>2024-11-18</span>
                </td>
                <td>
                  [2024-10-31] 인쇄아이콘 title 추가 <br />
                  [2024-11-18] QR ID 항목 추가, 신규생성 버튼 추가 및 Alert 추가
                  - 신규 생성 버튼 클릭
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] QR코드 인쇄하기</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2P12" target="_blank">
                    HEXAADMSTM2P12
                  </Link>
                </td>
                <td>
                  <span>2024-11-18</span>
                </td>
                <td>
                  [2024-11-18] 스테이션ID, 스테이션명 삭제, QR ID 항목 추가
                </td>
              </tr>
              <tr className="done">
                <td></td>
                <td>펌웨어 및 배포 관리</td>
                <td>펌웨어 관리</td>
                <td>펌웨어 관리</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S20" target="_blank">
                    HEXAADMSTM2S20
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>펌웨어 등록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S21" target="_blank">
                    HEXAADMSTM1S21
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>펌웨어 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM3S22" target="_blank">
                    HEXAADMSTM3S22
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>펌웨어 배포 관리</td>
                <td>펌웨어 배포 관리</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S23" target="_blank">
                    HEXAADMSTM2S23
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td>-</td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 대기중 스테이션 목록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2P28" target="_blank">
                    HEXAADMSTM2P28
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>배포 등록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S24" target="_blank">
                    HEXAADMSTM1S24
                  </Link>
                </td>
                <td>
                  <span>2024-11-21</span>
                </td>
                <td>
                  [2024-10-31] 휴지통 버튼 title 추가
                  <br />
                  [2024-11-21] 구분 → 세대구분 수정
                </td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 펌웨어 선택</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2P25" target="_blank">
                    HEXAADMSTM2P25
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 스테이션 선택</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2P26" target="_blank">
                    HEXAADMSTM2P26
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>배포 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM3S27" target="_blank">
                    HEXAADMSTM3S27
                  </Link>
                </td>
                <td>
                  <span>2024-11-21</span>
                </td>
                <td>[2024-11-21] 구분 → 세대구분 수정</td>
              </tr>
              <tr className="done">
                <td></td>
                <td>스테이션 설정 관리</td>
                <td>스테이션 설정 관리</td>
                <td>스테이션 설정 관리</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S40" target="_blank">
                    HEXAADMSTM2S40
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td>-</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>스테이션 설정 변경</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S41" target="_blank">
                    HEXAADMSTM1S41
                  </Link>
                </td>
                <td>
                  <span>2024-11-18</span>
                </td>
                <td>
                  [2024-10-31] 저장 버튼 삭제 <br />
                  [2024-11-18] 사용가능 전력량 콤보박스 추가
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>스테이션 설정 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM3S42" target="_blank">
                    HEXAADMSTM3S42
                  </Link>
                </td>
                <td>
                  <span>2024-11-21</span>
                </td>
                <td>[2024-11-21] 사용가능 전력량 콤보박스 추가</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>스테이션 설정 현황</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S43" target="_blank">
                    HEXAADMSTM2S43
                  </Link>
                </td>
                <td>
                  <span>2024-10-31</span>
                </td>
                <td>
                  [2024-10-31]
                  <br />- 그리드내 가로 스크롤 이동시, 왼쪽 스테이션명 영역 고정
                  <br />- PC 재부팅주기 → OS 재부팅 주기로 명칭 변경
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>스테이션 초기 설정</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM3S44" target="_blank">
                    HEXAADMSTM3S44
                  </Link>
                </td>
                <td>
                  <span>2024-11-21</span>
                </td>
                <td>
                  [2024-10-31] 순위 오타 수정
                  <br /> [2024-11-21] 온도/ 배출가능 SOC input으로 변경
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td>충전 프로파일 및 배포 관리</td>
                <td>충전 프로파일 관리</td>
                <td>충전 프로파일 관리</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S50" target="_blank">
                    HEXAADMSTM2S50
                  </Link>
                </td>
                <td>
                  <span>2024-11-27</span>
                </td>
                <td>
                  [2024-11-04] 전체 화면 수정 <br />
                  [2024-11-18] 엑셀업로드 버튼 추가, 항목 수정 <br />
                  [2024-11-22] <br /> - CV Mode 진입 → 충전 Mode 변경 충전
                  <br />- 프로파일 No : C000 형태로 변경
                  <br />- 조건설정 '매핑없음' 추가
                  <br />
                  [2024-11-27] 조건NO 필터링은 input 검색 (select 아님) 수정
                </td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>충전 프로파일 등록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S51" target="_blank">
                    HEXAADMSTM1S51
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>
                  [2024-11-04] 전체 화면 수정 <br />
                  [2024-11-19] 조건 설정 변경
                  <br />
                  [2024-11-22] - CV Mode 진입 → 충전 Mode 변경
                  <br />- 조건 NO, 버튼명 '선택' 변경
                </td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 충전 프로파일 엑셀 업로드 팝업</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1P60" target="_blank">
                    HEXAADMSTM1P60
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] 신규 등록, 조건NO 매핑용구분 </td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 조건 설정</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2P61" target="_blank">
                    HEXAADMSTM2P61
                  </Link>
                </td>
                <td>
                  <span>2024-11-27</span>
                </td>
                <td>
                  [2024-11-22] 순번 → 조건 NO 수정 <br />
                  [2024-11-27] 등록일시 → 생성일시
                </td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>충전 프로파일 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM3S52" target="_blank">
                    HEXAADMSTM3S52
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>
                  [2024-11-04] 전체 화면 수정 <br />
                  [2024-11-19] 삭제 버튼 추가. 조건 설정 변경
                  <br />
                  [2024-11-22] CV Mode 진입 → 충전 Mode <br />
                </td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td>충전 프로파일 Factor 관리</td>
                <td>충전 프로파일 Factor 관리</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S62" target="_blank">
                    HEXAADMSTM2S62
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] 번잡도 추가.</td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>충전 프로파일 Factor 등록 </td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S63" target="_blank">
                    HEXAADMSTM1S63
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>

              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>충전 프로파일 Factor 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S64" target="_blank">
                    HEXAADMSTM1S64
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>충전 프로파일 Factor 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S66" target="_blank">
                    HEXAADMSTM1S66
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-24] 신규 추가</td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td>충전 프로파일 조건 설정</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S65" target="_blank">
                    HEXAADMSTM1S65
                  </Link>
                </td>
                <td>
                  <span>2024-11-27</span>
                </td>
                <td>
                  [2024-11-22] - 검색 영역 추가, 문구 수정.
                  <br />
                  [2024-11-27] <br />
                  - 조건NO 필터링은 input 검색 (select 아님) 수정
                  <br />
                  - 매핑여부 select 추가
                  <br />
                </td>
              </tr>

              <tr className="modify">
                <td></td>
                <td></td>
                <td>충전 프로파일 배포</td>
                <td>충전 프로파일 배포 관리</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S56" target="_blank">
                    HEXAADMSTM2S56
                  </Link>
                </td>
                <td>
                  <span>2024-11-04</span>
                </td>
                <td>
                  [2024-11-04] 프로파일ID → 충전 프로파일ID 변경, 충전 조건
                  삭제, 툴팁 추가
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>충전 프로파일 배포 등록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S57" target="_blank">
                    HEXAADMSTM1S57
                  </Link>
                </td>
                <td>
                  <span>2024-11-27</span>
                </td>
                <td>
                  [2024-11-19] 충전 프로파일 정보 항목 수정
                  <br />
                  [2024-11-22] CV Mode 진입 → 충전 Mode 변경.
                  <br />
                  [2024-11-27] 기본여부 다음에 조건NO 항목 추가
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>충전 프로파일 배포 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM3S58" target="_blank">
                    HEXAADMSTM3S58
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>
                  [2024-11-19] 충전 프로파일 정보 항목 수정
                  <br />
                  [2024-11-22] CV Mode 진입 → 충전 Mode 변경. 충전 Mode 추가
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 충전 프로파일 선택</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM3P59" target="_blank">
                    HEXAADMSTM3P59
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] 항목 수정</td>
              </tr>
              <tr className="del">
                <td></td>
                <td></td>
                <td>고속 Step 충전 Map</td>
                <td>고속 Step 충전 Map 관리</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S53" target="_blank">
                    HEXAADMSTM2S53
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="del">
                <td></td>
                <td></td>
                <td></td>
                <td>고속 Step 충전 Map 등록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM1S54" target="_blank">
                    HEXAADMSTM1S54
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="del">
                <td></td>
                <td></td>
                <td></td>
                <td>고속 Step 충전 Map 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM3S55" target="_blank">
                    HEXAADMSTM3S55
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td>스테이션 이력 조회</td>
                <td>대시보드 제어 이력</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S80" target="_blank">
                    HEXAADMSTM2S80
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td>
                  [2024-11-01] "전체 조회는 BSMS에서 확인해주세요." 문구 삭제
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>스테이션 충전 이력</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S81" target="_blank">
                    HEXAADMSTM2S81
                  </Link>
                </td>
                <td>
                  <span>2024-11-04</span>
                </td>
                <td>
                  [2024-11-04] 프로파일ID → 충전 프로파일 NO 으로 항목 수정
                </td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>스테이션 수집 Data 이력 조회</td>
                <td>
                  [Tab] 온도 <br />
                  [Tab] 습도 <br />
                  [Tab] 전력량
                </td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S82" target="_blank">
                    HEXAADMSTM2S82
                  </Link>
                  <br />
                  HEXAADMSTM2S83 <br />
                  HEXAADMSTM2S84
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>

              <tr className="done">
                <td></td>
                <td>스테이션 통계 정보</td>
                <td>스테이션별 누적 교체횟수</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S90" target="_blank">
                    HEXAADMSTM2S90
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>함체,슬롯별 교체횟수</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S91" target="_blank">
                    HEXAADMSTM2S91
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>스테이션별 누적 교체 실패횟수</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S92" target="_blank">
                    HEXAADMSTM2S92
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>
                  [2024-11-01] '교환중 실패' → '교환실패' 텍스트 변경
                  <br />
                  [2024-11-22] 누적실패 영역 '소계' → '누적' 변경
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>전력사용량</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S93" target="_blank">
                    HEXAADMSTM2S93
                  </Link>
                  <br />
                  <Link to="/pub/page/HEXAADMSTM2S93_1" target="_blank">
                    HEXAADMSTM2S93_ (월)
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td>[2024-11-01] 미사용여부, 미사용 등록일 항목 추가</td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>스테이션별 예약 건수</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSTM2S94" target="_blank">
                    HEXAADMSTM2S94
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
            </tbody>

            <tbody>
              <tr className="done">
                <td>배터리 관리</td>
                <td>배터리 정보 관리</td>
                <td>배티러 정보 관리 목록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2S00" target="_blank">
                    HEXAADMBTM2S00
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>배티러 정보 등록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM1S01" target="_blank">
                    HEXAADMBTM1S01
                  </Link>
                </td>
                <td>
                  <span>2024-11-19</span>
                </td>
                <td>
                  [2024-11-01] (8자리), (5자리) 문구 삭제 <br />
                  [2024-11-19] 생산년월일 입력 방식 변경
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>배티러 정보 관리 상세</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM3S02" target="_blank">
                    HEXAADMBTM3S02
                  </Link>
                </td>
                <td>
                  <span>2024-11-27</span>
                </td>
                <td>
                  [2024-11-01] (8자리), (5자리) 문구 삭제 <br />
                  [2024-11-19] KS표준배터리팩ID 삭제. <br />
                  [2024-11-22] 누락항목 추가. 생산년월일 아래 BMS 버전,
                  사용구분1 아래 스테이션명, 사용구분2 아래 차대번호 <br />
                  [2024-11-27] 스테이션명 선택박스 출력값으로 수정
                </td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 예약 이력</td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2P03" target="_blank">
                    HEXAADMBTM2P03
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 충전 이력</td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2P04" target="_blank">
                    HEXAADMBTM2P04
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>
                  [2024-11-04] 프로파일ID → 충전프로파일NO 항목 변경
                  <br />
                  [2024-11-22] 서버 전달용과 스테이션 적용 충전프로파일 구분하여
                  출력
                </td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 교환 및 위치 이력</td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2P05" target="_blank">
                    HEXAADMBTM2P05
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 사용 변경 이력</td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2P06" target="_blank">
                    HEXAADMBTM2P06
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] SOH → SOH(%) 수정 </td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 배터리 정보 엑셀 업로드 </td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM1P01" target="_blank">
                    HEXAADMBTM1P01
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>

              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P] 다운로드 사유</td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM1P02" target="_blank">
                    HEXAADMBTM1P02
                  </Link>
                </td>
                <td>
                  <span>2024-12-06</span>
                </td>
                <td></td>
              </tr>

              <tr className="done">
                <td></td>
                <td>배터리 사용 변경 이력</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2S03" target="_blank">
                    HEXAADMBTM2S03
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] SOH → SOH(%) 수정</td>
              </tr>
              <tr className="done">
                <td></td>
                <td>배터리 교환 및 위치 이력</td>
                <td>
                  [Tab] 2세대 <br /> [Tab] 1세대
                </td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2S04" target="_blank">
                    HEXAADMBTM2S04
                  </Link>
                  <br />
                  HEXAADMBTM2S05
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>배터리 예약 이력</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2S07" target="_blank">
                    HEXAADMBTM2S07
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td>배터리 충전 이력</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2S08" target="_blank">
                    HEXAADMBTM2S08
                  </Link>
                </td>
                <td>
                  <span>2024-11-19</span>
                </td>
                <td>
                  [2024-11-04] 프로파일ID → 충전프로파일NO 항목 변경
                  <br />
                  [2024-11-19] 서버 전달용과 스테이션 적용 충전프로파일 구분하여
                  출력
                </td>
              </tr>

              <tr className="done">
                <td></td>
                <td>배터리 통계정보</td>
                <td>배터리 상태변화 이력</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2S09" target="_blank">
                    HEXAADMBTM2S09
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>

              <tr className="done">
                <td></td>
                <td></td>
                <td>배터리 충전 통계</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2S10" target="_blank">
                    HEXAADMBTM2S10
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>

              <tr className="done">
                <td></td>
                <td>배터리 주요지표 이력</td>
                <td>배터리 사용량 평균</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM2S12" target="_blank">
                    HEXAADMBTM2S12
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>배터리 주요지표 월변화량</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM3S14" target="_blank">
                    HEXAADMBTM3S14
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>SOH 조회</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMBTM5S16" target="_blank">
                    HEXAADMBTM5S16
                  </Link>
                </td>
                <td>
                  <span>2024-11-01</span>
                </td>
                <td>[2024-11-01] 구분 항목 위치 이동</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="modify">
                <td>고장 및 통신 관리</td>
                <td>스테이션 고장 이력</td>
                <td>
                  [Tab] 2세대 <br />
                  [Tab] 1세대
                </td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMERM2S02" target="_blank">
                    HEXAADMERM2S02
                  </Link>
                  <br />
                  HEXAADMERM2S10
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] 고장명 → 코드명</td>
              </tr>
              <tr className="done">
                <td></td>
                <td>배터리 진단 이력</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMERM2S04" target="_blank">
                    HEXAADMERM2S04
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>고장코드 관리</td>
                <td>고장코드 목록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMERM2S05" target="_blank">
                    HEXAADMERM2S05
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>고장코드 등록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMERM1S06" target="_blank">
                    HEXAADMERM1S06
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[LP] 고장코드 엑셀 업로드</td>
                <td>
                  <Link to="/pub/page/HEXAADMERM1P09" target="_blank">
                    HEXAADMERM1P09
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>고장코드 상세</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMERM3S07" target="_blank">
                    HEXAADMERM3S07
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] 타이틀/depth 등록 → 상세</td>
              </tr>
              <tr className="done">
                <td></td>
                <td>통신단절 현황</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMERM2S08" target="_blank">
                    HEXAADMERM2S08
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
            </tbody>
            <tbody>
              <tr className="done">
                <td>게시판</td>
                <td>공지사항</td>
                <td>공지사항 목록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMNTM2S01" target="_blank">
                    HEXAADMNTM2S01
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>공지사항 등록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMNTM1S02" target="_blank">
                    HEXAADMNTM1S02
                  </Link>
                </td>
                <td>
                  <span>2024-11-25</span>
                </td>
                <td>[2024-11-25] 파일 첨부 안내문구 추가</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>미리보기 팝업 - 상세에서 팝업 미리보기 클릭</td>
                <td>
                  <Link to="/pub/page/HEXAADMNTM2P10" target="_blank">
                    HEXAADMNTM2P10
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] 'x' 버튼 삭제</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>공지사항 상세</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMNTM3S03" target="_blank">
                    HEXAADMNTM3S03
                  </Link>
                </td>
                <td>
                  <span>2024-11-25</span>
                </td>
                <td>[2024-11-25] 파일 첨부 안내문구 추가</td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>일반 사용자 공지사항 목록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMNTM2S07" target="_blank">
                    HEXAADMNTM2S07
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>일반 사용자 공지사항 상세</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMNTM2S08" target="_blank">
                    HEXAADMNTM2S08
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>사용자 매뉴얼</td>
                <td>사용자 매뉴얼 목록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMNTM2S04" target="_blank">
                    HEXAADMNTM2S04
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>사용자 매뉴얼 등록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMNTM1S05" target="_blank">
                    HEXAADMNTM1S05
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>사용자 매뉴얼 상세</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMNTM3S06" target="_blank">
                    HEXAADMNTM3S06
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>일반 사용자 매뉴얼 목록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMNTM2S09" target="_blank">
                    HEXAADMNTM2S09
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
            </tbody>
            <tbody>
              <tr className="done">
                <td>시스템 관리</td>
                <td>사용자 관리</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2S01" target="_blank">
                    HEXAADMSYM2S01
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>사용자 등록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM1S02" target="_blank">
                    HEXAADMSYM1S02
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>사용자 상세</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM3S03" target="_blank">
                    HEXAADMSYM3S03
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>권한 관리</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2S07" target="_blank">
                    HEXAADMSYM2S07
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>권한 등록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM1S08" target="_blank">
                    HEXAADMSYM1S08
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] 메뉴별 권한 설정 수정, 삭제 권한 삭제 </td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>권한 상세</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM3S09" target="_blank">
                    HEXAADMSYM3S09
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>메뉴 관리</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2S10" target="_blank">
                    HEXAADMSYM2S10
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>API Key 관리</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2S13" target="_blank">
                    HEXAADMSYM2S13
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>API Key 등록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM1S14" target="_blank">
                    HEXAADMSYM1S14
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>API Key 상세</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM3S15" target="_blank">
                    HEXAADMSYM3S15
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td>접속 로그 관리</td>
                <td>로그인 이력</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2S16" target="_blank">
                    HEXAADMSYM2S16
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>메뉴 사용이력</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2S18" target="_blank">
                    HEXAADMSYM2S18
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>개인정보처리 이력</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2S19" target="_blank">
                    HEXAADMSYM2S19
                  </Link>
                </td>
                <td>
                  <span>2024-12-06</span>
                </td>
                <td></td>
              </tr>

              <tr className="done">
                <td></td>
                <td>코드 관리</td>
                <td>공통 코드</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2S20" target="_blank">
                    HEXAADMSYM2S20
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>공통 코드 등록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM1S21" target="_blank">
                    HEXAADMSYM1S21
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] 사용여부 '필수 표시 *' 삭제</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>공통 코드 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM3S23" target="_blank">
                    HEXAADMSYM3S23
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>[2024-11-22] 사용여부 '필수 표시 *' 삭제</td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>그룹 코드</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2S27" target="_blank">
                    HEXAADMSYM2S27
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>그룹 코드 등록</td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM1S28" target="_blank">
                    HEXAADMSYM1S28
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>
                  [2024-11-22] 공통 코드 → 그룹 코드, 사용여부 필수 표시 * 삭제
                </td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>그룹 코드 상세</td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM3S29" target="_blank">
                    HEXAADMSYM3S29
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>
                  [2024-11-22] 공통 코드 → 그룹 코드, 사용여부 필수 표시 * 삭제
                </td>
              </tr>
              <tr className="done">
                <td></td>
                <td>알림 관리</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2S24" target="_blank">
                    HEXAADMSYM2S24
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>알림 등록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM1S25" target="_blank">
                    HEXAADMSYM1S25
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>알림 상세</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM3S26" target="_blank">
                    HEXAADMSYM3S26
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>

              <tr className="done">
                <td></td>
                <td></td>
                <td>전력량 이상 감지 이메일</td>
                <td></td>
                <td>
                  <Link to="/mail/HEXAADMCOM2S05.html" target="_blank">
                    HEXAADMCOM2S05
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td>이메일폼</td>
              </tr>

              <tr className="done">
                <td></td>
                <td></td>
                <td></td>
                <td>[P]수신자 선택</td>
                <td>
                  <Link to="/pub/page/HEXAADMSYM2P30" target="_blank">
                    HEXAADMSYM2P30
                  </Link>
                </td>
                <td>
                  <span>2024-11-22</span>
                </td>
                <td></td>
              </tr>
            </tbody>
            <tbody>
              <tr className="modify">
                <td>모바일</td>
                <td>로그인</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAMOBCOM2S00" target="_blank">
                    HEXAMOBCOM2S00
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td>[2024-12-16] 팝업창 버튼 수정, 언어 선택 버튼으로 변경.</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>휴대폰 인증</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAMOBCOM3S01" target="_blank">
                    HEXAMOBCOM3S01
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td>[2024-12-16] 하단 버튼 수정</td>
              </tr>
              <tr className="done">
                <td></td>
                <td>대시보드</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAMOBHOM2S00" target="_blank">
                    HEXAMOBHOM2S00
                  </Link>
                  <br />
                  <Link to="/pub/page/HEXAMOBHOM2S00en" target="_blank">
                    HEXAMOBHOM2S00 en
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>비밀번호 변경 팝업</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAMOBHOM2P01" target="_blank">
                    HEXAMOBHOM2P01
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td>[2024-12-16] 팝업창 버튼 수정</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>로그아웃 팝업</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAMOBHOM2P02" target="_blank">
                    HEXAMOBHOM2P02
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td>[2024-12-16] 팝업창 버튼 수정</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>언어 선택 팝업</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAMOBHOM2P03" target="_blank">
                    HEXAMOBHOM2P03
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td>[2024-12-16] 팝업창 버튼 수정</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>시단위 선택 팝업</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAMOBHOM2P04" target="_blank">
                    HEXAMOBHOM2P04
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td>[2024-12-16] 팝업창 버튼 수정</td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td>구단위 선택 팝업</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAMOBHOM2P05" target="_blank">
                    HEXAMOBHOM2P05
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td>[2024-12-16] 팝업창 버튼 수정</td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>교한기 목록</td>
                <td></td>
                <td>
                  <Link to="/pub/page/HEXAMOBHOM2S08" target="_blank">
                    HEXAMOBHOM2S08
                  </Link>
                  <br />
                  <Link to="/pub/page/HEXAMOBHOM2S08en" target="_blank">
                    HEXAMOBHOM2S08 en
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td></td>
              </tr>
              <tr className="done">
                <td></td>
                <td></td>
                <td>대시보드 상세</td>
                <td>2세대</td>
                <td>
                  <Link to="/pub/page/HEXAMOBHOM2S06" target="_blank">
                    HEXAMOBHOM2S06
                  </Link>
                  <br />
                  <Link to="/pub/page/HEXAMOBHOM2S06en" target="_blank">
                    HEXAMOBHOM2S06 en
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td></td>
              </tr>
              <tr className="modify">
                <td></td>
                <td></td>
                <td></td>
                <td>1세대</td>
                <td>
                  <Link to="/pub/page/HEXAMOBHOM2S07" target="_blank">
                    HEXAMOBHOM2S07
                  </Link>
                  <br />
                  <Link to="/pub/page/HEXAMOBHOM2S07en" target="_blank">
                    HEXAMOBHOM2S07 en
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td>[2024-12-16] 페어ID 추가</td>
              </tr>
              <tr className="done">
                <td></td>
                <td>QR랜딩</td>
                <td></td>
                <td></td>
                <td>
                  <Link to="/qr/info.html" target="_blank">
                    HEXAMOBETC2S00
                  </Link>
                </td>
                <td>
                  <span>2024-12-16</span>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
