// 	HEXAADMHOM2P06 : 1세대 상세 팝업(일반 사용자)

import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

const sampleProducts = [
  {
    DateTime: "2024-08-20 00:18:51",
    Target: "함체01",
    Control: "제어프로그램 재구동",
    State: "Y",
  },
  {
    DateTime: "2024-08-20 00:18:51",
    Target: "슬롯보드15",
    Control: "메인보드 리셋",
    State: "Y",
  },
  {
    DateTime: "2024-08-20 00:18:51",
    Target: "함체01",
    Control: "메인보드 리셋",
    State: "Y",
  },
  {
    DateTime: "2024-08-20 00:18:51",
    Target: "함체01",
    Control: "Wake up BMS OFF",
    State: "Y",
  },
  {
    DateTime: "2024-08-20 00:18:51",
    Target: "-",
    Control: "전체 슬롯 잠금 해제",
    State: "N",
  },
];

export default function HEXAADMHOM2P06() {
  //grid
  const CustomCellColor = (props: any) => (
    <td {...props.tdProps} colSpan={1}>
      <span className="c-primary">{props.children}</span>
    </td>
  );

  const CustomCellEllipse = (props: any) => (
    <td {...props.tdProps} colSpan={1}>
      <div className="txtellipse">{props.children}</div>
    </td>
  );

  //click
  const [active, setActive] = React.useState(true);
  const clickSlot = () => {
    setActive(!active);
  };

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-pop">
          <div className="dashboard-pop__head">
            <h2 className="pop-title">
              <span className="stit-ico"></span>
              <span>본도시락 문정법조타운점</span>
            </h2>
            <div className="tit-pos">
              <span className="tit-state-reset">초기화중</span>
              {/* [2024-12-11] 초기화중 버튼 추가 */}
              {/*
              <span className="tit-state-normal">정상</span>
              <span className="tit-state-disconnection">통신단절</span>
              <span className="tit-state-lock">전체잠금</span>
              <span className="tit-state-unable">교환불가</span>
              <span className="tit-state-error">오류발생</span>
              <span className="tit-state-reset">초기화중</span>
               */}
            </div>
            <div className="t-update">업데이트 일시 2024-08-05 22:00:10</div>
          </div>

          <div className="dashboard-pop__body">
            <div className="pop-layout">
              <div className="pop-layout__left">
                {/* 기본 정보 */}
                <div className="box type-info">
                  <h4>기본 정보</h4>
                  <dl>
                    <div>
                      <dt>스테이션명 :</dt>
                      <dd>GS25 강남점</dd>
                    </div>
                    <div>
                      <dt>스테이션 ID :</dt>
                      <dd>HX0224020C1</dd>
                    </div>
                    <div>
                      <dt>주소 :</dt>
                      <dd> 경기 의정부시 신흥로222번길 5-30 106-109호</dd>
                    </div>
                    <div>
                      <dt>세대구분 :</dt>
                      <dd>
                        <span className="flag-1">1세대</span>
                      </dd>
                    </div>
                    <div>
                      <dt>설치일 :</dt>
                      <dd>2024-08-10</dd>
                    </div>
                    <div>
                      <dt>APP 노출 여부 :</dt>
                      <dd>Y</dd>
                    </div>
                    <div>
                      <dt>비고 :</dt>
                      <dd>2024-11-10 스테이션 철거 예정</dd>
                    </div>
                  </dl>
                </div>

                {/* 교환횟수 */}
                <div className="box type-counter">
                  <h4>교환 횟수</h4>
                  <dl>
                    <div>
                      <dt>금일</dt>
                      <dd>38</dd>
                    </div>
                    <div>
                      <dt>전일</dt>
                      <dd>20</dd>
                    </div>
                    <div>
                      <dt>전체</dt>
                      <dd>1,120</dd>
                    </div>
                  </dl>
                </div>

                {/* 최근 제어 이력 */}
                <div className="box type-list">
                  {/* 2025-03-19 수정 (3.새로고침 버튼 추가) */}
                  <div className="box-tit">
                    <h4>최근 제어 이력</h4>
                    <Button size={"none"} title="새로고침" className="btn-refresh">
                      <i className="icon icon-refresh-sm"></i>
                    </Button>
                  </div>
                  <Button
                    themeColor={"info"}
                    className="btn-more"
                    title="최근 제어 이력 더보기"
                  >
                    <i className="icon icon-arr-right"></i>
                  </Button>

                  <div className="grid-dark">
                    <Grid data={sampleProducts} scrollable="none">
                      <Column field="DateTime" title="제어일시" width="82" />
                      <Column
                        field="Target"
                        title="대상"
                        width="65"
                        cells={{
                          data: CustomCellEllipse,
                        }}
                      />
                      <Column
                        field="Control"
                        title="제어명"
                        width="75"
                        cells={{
                          data: CustomCellEllipse,
                        }}
                      />
                      <Column
                        className="txt-center"
                        field="State"
                        title="성공여부"
                        width="45"
                        cells={{
                          data: CustomCellColor,
                        }}
                      />
                    </Grid>
                  </div>
                </div>
              </div>
              <div className="pop-layout__center">
                {/* 스테이션 */}
                <div className="box type-main">
                  {/* 스테이션 1세대 */}
                  <div className="board-g">
                    <div className="board-body">
                      {/*
                    on-reservation 예약중
                    on-exchangeable 교환가능
                    on-lock 잠금
                    on-charging 충전 중
                    on-exchanging 교환중
                    is-active 활성화
                  */}
                      <div className="box-slot on-reservation is-active">
                        <span>SOC 47.3%</span>
                        <span>SOH 47.3%</span>
                        <div className="tip-box">
                          <span>페어 ID</span>
                          <span>2410021210</span>
                        </div>
                      </div>
                      <div className="box-slot on-exchangeable">
                        <span>SOC 47.3%</span>
                        <span>SOH 47.3%</span>
                        <div className="tip-box">
                          <span>페어 ID</span>
                          <span>2410021210</span>
                        </div>
                      </div>
                      <div className="box-slot on-lock">
                        <span>SOC 47.3%</span>
                        <span>SOH 47.3%</span>
                        <div className="tip-box">
                          <span>페어 ID</span>
                          <span className="c-primary">2410021210</span>
                        </div>
                      </div>
                      <div className="box-slot on-charging">
                        <span>SOC 47.3%</span>
                        <span>SOH 47.3%</span>
                        <div className="tip-box">
                          <span>페어 ID</span>
                          <span>2410021210</span>
                        </div>
                      </div>
                      <div className="box-slot on-exchanging">
                        <span>SOC 100.0%</span>
                        <span>SOH 100.0%</span>
                        <div className="tip-box">
                          <span>페어 ID</span>
                          <span>2410021210</span>
                        </div>
                      </div>
                      <div className="box-slot"></div>
                      <div className="box-slot"></div>
                      <div className="box-slot"></div>
                    </div>
                  </div>

                  {/* 범례 */}
                  <div className="board-legend">
                    <span className="mark-blank">빈 슬롯</span>
                    <span className="mark-reservation">예약 중</span>
                    <span className="mark-exchangeable">교환 가능</span>
                    <span className="mark-exchanging">교환 중</span>
                    <span className="mark-lock">잠금</span>
                    <span className="mark-charging">충전 중</span>
                  </div>
                </div>
              </div>
              <div className="pop-layout__right">
                {/* 스테이션 제어 */}
                <div className="box type-switch">
                  <h4>스테이션 제어</h4>
                  <div className="switch-group">
                    {/*
                      활성화 : .is-active
                      비활성화 : .disabled
                    */}
                    <Button className="switch-btn-1">전체 잠금</Button>
                    <Button className="switch-btn-2">전체 잠금 해제</Button>
                    {/* [2024-12-06] 정보 갱신, 인층 초기화 버튼 추가 */}
                    <Button className="switch-btn-3">정보 갱신</Button>
                    <Button className="switch-btn-4">인층 초기화</Button>
                    <Button className="switch-btn-5">
                      제어프로그램 재구동
                    </Button>
                  </div>
                </div>

                {/* 슬롯 제어 */}
                <div className="box type-slot">
                  <h4>슬롯 제어</h4>
                  <p className="t-txt">슬롯번호 : 02</p>

                  {/* [2024-11-15] class 'slot-g' 추가*/}
                  <div className="slot-group slot-g">
                    {/*
                      활성화 : .is-active
                      비활성화 : .disabled
                    */}
                    <Button>
                      <i className="ico"></i>
                      잠금
                    </Button>
                    <Button>
                      <i className="ico"></i>
                      잠금 해제
                    </Button>
                    <Button>
                      <i className="ico"></i>
                      개방
                    </Button>
                    <Button>
                      <i className="ico"></i>
                      강제 배출
                    </Button>
                    <Button>
                      <i className="ico"></i>
                      리셋
                    </Button>
                  </div>
                </div>

                {/* 배터리 정보 */}
                <div className="box type-battery">
                  <h4>배터리 정보</h4>
                  <dl>
                    <div>
                      <dt>배터리 ID : </dt>
                      <dd>24100212345</dd>
                    </div>
                    <div>
                      <dt>페어 ID : </dt>
                      <dd>24100212345</dd>
                    </div>
                  </dl>
                  <div className="info type-g">
                    <dl>
                      {/* <div className="info-state-normal">
                        <dt>상태</dt>
                        <dd>정상</dd>
                      </div>
                      <div className="info-state-charging">
                        <dt>상태</dt>
                        <dd>충전중</dd>
                      </div>
                      <div className="info-state-blank">
                        <dt>상태</dt>
                        <dd>빈 슬롯</dd>
                      </div>
                      <div className="info-state-reservation">
                        <dt>상태</dt>
                        <dd>예약중</dd>
                      </div>
                      <div className="info-state-exchanging">
                        <dt>상태</dt>
                        <dd>교환중</dd>
                      </div> */}
                      <div className="info-state-lock">
                        <dt>상태</dt>
                        <dd>잠금</dd>
                      </div>
                      <div className="info-tem">
                        <dt>평균온도</dt>
                        <dd>
                          40 <span className="unit">℃</span>
                        </dd>
                      </div>
                      <div className="info-soc">
                        <dt>SOC</dt>
                        <dd>
                          60 <span className="unit">%</span>
                        </dd>
                      </div>
                      <div className="info-soh">
                        <dt>SOH</dt>
                        <dd>
                          88 <span className="unit">%</span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
