// 	HEXAADMHOM2P06 en : 1세대 상세 팝업(일반 사용자)

import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

const sampleProducts = [
  {
    DateTime: "2024-08-20 00:18:51",
    Target: "Enclosur01",
    Control: "Restart Control Program",
    State: "Y",
  },
  {
    DateTime: "2024-08-20 00:18:51",
    Target: "Slot Board15",
    Control: "Mainboard Reset",
    State: "Y",
  },
  {
    DateTime: "2024-08-20 00:18:51",
    Target: "Enclosur01",
    Control: "Mainboard Reset",
    State: "Y",
  },
  {
    DateTime: "2024-08-20 00:18:51",
    Target: "Enclosur01",
    Control: "Wake up BMS OFF",
    State: "Y",
  },
  {
    DateTime: "2024-08-20 00:18:51",
    Target: "-",
    Control: "Unlock All Slots",
    State: "N",
  },
];

export default function HEXAADMHOM2P06() {
  React.useEffect(() => {
    document.documentElement.lang = "en"; // 퍼블 확인용

    document.body.classList.add("dark");
    return function cleanup() {
      document.body.classList.remove("dark");
    };
  }, []);

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
              <span>BONIf Munjeongbeopjo Town Branch</span>
            </h2>
            <div className="tit-pos">
              <span className="tit-state-normal">Normal</span>
              {/* [2024-12-11] 초기화중 버튼 추가 */}
              {/* 
              <span className="tit-state-normal">Normal</span>
              <span className="tit-state-disconnection">Communication Disconnection</span>
              <span className="tit-state-lock">Fully Locked</span>
              <span className="tit-state-unable">Not Available for Exchange</span>
              <span className="tit-state-error">Error Occurred</span> 
              <span className="tit-state-reset">초기화중</span> 
               */}
            </div>
            <div className="t-update">
              Update Date & Time 2024-08-05 22:00:10
            </div>
          </div>

          <div className="dashboard-pop__body">
            <div className="pop-layout">
              <div className="pop-layout__left">
                {/* 기본 정보 */}
                <div className="box type-info">
                  <h4>Basic Information</h4>
                  <dl>
                    <div>
                      <dt>Station Name :</dt>
                      <dd>BONIf Munjeongbeopjo Town Branch</dd>
                    </div>
                    <div>
                      <dt>Station ID :</dt>
                      <dd>HX0224020C1</dd>
                    </div>
                    <div>
                      <dt>Address :</dt>
                      <dd>
                        #106-109, 5-30, Sinheung-ro 222beon-gil, Uijeongbu-si,
                        Gyeonggi-do
                      </dd>
                    </div>
                    <div>
                      <dt>Generation Type :</dt>
                      <dd>
                        <span className="flag-1">1st</span>
                      </dd>
                    </div>
                    <div>
                      <dt>Installation Date :</dt>
                      <dd>2024-08-10</dd>
                    </div>
                    <div>
                      <dt>App Exposure Status :</dt>
                      <dd>Y</dd>
                    </div>
                    <div>
                      <dt>Remarks :</dt>
                      <dd>2024-11-10 스테이션 철거 예정</dd>
                    </div>
                  </dl>
                </div>

                {/* 교환횟수 */}
                <div className="box type-counter">
                  <h4>Exchange Count</h4>
                  <dl>
                    <div>
                      <dt>Today</dt>
                      <dd>38</dd>
                    </div>
                    <div>
                      <dt>Yesterday</dt>
                      <dd>20</dd>
                    </div>
                    <div>
                      <dt>All</dt>
                      <dd>1,120</dd>
                    </div>
                  </dl>
                </div>

                {/* 최근 제어 이력 */}
                <div className="box type-list">
                  <h4>Recent Control History</h4>
                  <Button
                    themeColor={"info"}
                    className="btn-more"
                    title="More Recent Control History"
                  >
                    <i className="icon icon-arr-right"></i>
                  </Button>

                  <div className="grid-dark">
                    <Grid data={sampleProducts} scrollable="none">
                      <Column
                        field="DateTime"
                        title="Control Date & Time"
                        width="82"
                      />
                      <Column
                        field="Target"
                        title="Target"
                        width="65"
                        cells={{
                          data: CustomCellEllipse,
                        }}
                      />
                      <Column
                        field="Control"
                        title="Control Name"
                        width="75"
                        cells={{
                          data: CustomCellEllipse,
                        }}
                      />
                      <Column
                        className="txt-center"
                        field="State"
                        title="Success Status"
                        width="55"
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
                          <span>Pair ID</span>
                          <span>2410021210</span>
                        </div>
                      </div>
                      <div className="box-slot on-exchangeable">
                        <span>SOC 47.3%</span>
                        <span>SOH 47.3%</span>
                        <div className="tip-box">
                          <span>Pair ID</span>
                          <span>2410021210</span>
                        </div>
                      </div>
                      <div className="box-slot on-lock">
                        <span>SOC 47.3%</span>
                        <span>SOH 47.3%</span>
                        <div className="tip-box">
                          <span>Pair ID</span>
                          <span className="c-primary">2410021210</span>
                        </div>
                      </div>
                      <div className="box-slot on-charging">
                        <span>SOC 47.3%</span>
                        <span>SOH 47.3%</span>
                        <div className="tip-box">
                          <span>Pair ID</span>
                          <span>2410021210</span>
                        </div>
                      </div>
                      <div className="box-slot on-exchanging">
                        <span>SOC 100.0%</span>
                        <span>SOH 100.0%</span>
                        <div className="tip-box">
                          <span>Pair ID</span>
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
                    <span className="mark-blank">Empty Slot</span>
                    <span className="mark-reservation">Reserved</span>
                    <span className="mark-exchangeable">
                      Available for Exchange
                    </span>
                    <span className="mark-exchanging">Exchanging</span>
                    <span className="mark-lock">Locked</span>
                    <span className="mark-charging">Charging</span>
                  </div>
                </div>
              </div>
              <div className="pop-layout__right">
                {/* 스테이션 제어 */}
                <div className="box type-switch">
                  <h4>Station Control</h4>
                  <div className="switch-group">
                    {/* 
                      활성화 : .is-active
                      비활성화 : .disabled 
                    */}
                    <Button className="switch-btn-1">Fully Locked</Button>
                    <Button className="switch-btn-2">Unlock All</Button>
                    {/* [2024-12-06] 정보 갱신, 인층 초기화 버튼 추가 */}
                    <Button className="switch-btn-3">Information Update</Button>
                    <Button className="switch-btn-4">
                      Authentication Reset
                    </Button>
                    <Button className="switch-btn-5">
                      Restart Control Program
                    </Button>
                  </div>
                </div>

                {/* 슬롯 제어 */}
                <div className="box type-slot">
                  <h4>Slot Control</h4>
                  <p className="t-txt">Slot Number : 02</p>

                  {/* [2024-11-15] class 'slot-g' 추가*/}
                  <div className="slot-group slot-g">
                    {/* 
                      활성화 : .is-active
                      비활성화 : .disabled 
                    */}
                    <Button>
                      <i className="ico"></i>
                      Locked
                    </Button>
                    <Button>
                      <i className="ico"></i>
                      Unlock
                    </Button>
                    <Button>
                      <i className="ico"></i>
                      Open
                    </Button>
                    <Button>
                      <i className="ico"></i>
                      Force Eject
                    </Button>
                    <Button>
                      <i className="ico"></i>
                      Reset
                    </Button>
                  </div>
                </div>

                {/* 배터리 정보 */}
                <div className="box type-battery">
                  <h4>Battery Information</h4>
                  <dl>
                    <div>
                      <dt>Battery ID : </dt>
                      <dd>24100212345</dd>
                    </div>
                    <div>
                      <dt>Pair ID : </dt>
                      <dd>24100212345</dd>
                    </div>
                  </dl>
                  <div className="info type-g">
                    <dl>
                      {/* <div className="info-state-normal">
                        <dt>Status</dt>
                        <dd>Normal</dd>
                      </div>
                      <div className="info-state-charging">
                        <dt>Status</dt>
                        <dd>Charging</dd>
                      </div>
                      <div className="info-state-blank">
                        <dt>Status</dt>
                        <dd>Empty Slot</dd>
                      </div>
                      <div className="info-state-reservation">
                        <dt>Status</dt>
                        <dd>Reserved</dd>
                      </div>
                      <div className="info-state-exchanging">
                        <dt>Status</dt>
                        <dd>Exchanging</dd>
                      </div> */}
                      <div className="info-state-lock">
                        <dt>Status</dt>
                        <dd>Locked</dd>
                      </div>
                      <div className="info-tem">
                        <dt>Average Temp.</dt>
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
