// HEXAMOBHOM2S07 : 대시보드 상세_1세대

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

export default function HEXAMOBHOM2S07() {
  // tab
  const [selected, setSelected] = React.useState<number>(0);
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };
  return (
    <>
      <header className="m-header">
        <div className="m-prev">
          <Button size={"small"} fillMode="flat">
            <span className="sr-only">이전화면으로 이동</span>
          </Button>
        </div>

        <h1 className="m-title">
          GS25 강남점 <span className="tit-state-normal">정상</span>
          {/* 
              <span className="tit-state-normal">정상</span>
              <span className="tit-state-disconnection">통신단절</span>
              <span className="tit-state-lock">전체잠금</span>
              <span className="tit-state-unable">교환불가</span>
              <span className="tit-state-error">오류발생</span> 
              <span className="tit-state-reset">초기화중</span> 
              */}
        </h1>
      </header>

      <div className="m-content">
        <section className="section mt1.5">
          <div className="m-box-slot">
            <h3 className="m-t-title">
              슬롯 01
              <span className="mark-normal">교환가능</span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>배터리ID </strong> 24100212345
              </span>
              <span>
                <strong>페어ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">23℃</div>
                <div className="stit">평균 온도</div>
              </div>
              <div>
                <div className="cont">60%</div>
                <div className="stit">SOC</div>
              </div>
              <div>
                <div className="cont">88%</div>
                <div className="stit">SOH</div>
              </div>
            </div>
          </div>

          <div className="m-box-slot">
            <h3 className="m-t-title">
              슬롯 02
              <span className="mark-reservation">예약중</span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>배터리ID </strong> 24100212345
              </span>
              <span>
                <strong>페어ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">23℃</div>
                <div className="stit">평균 온도</div>
              </div>
              <div>
                <div className="cont">60%</div>
                <div className="stit">SOC</div>
              </div>
              <div>
                <div className="cont">88%</div>
                <div className="stit">SOH</div>
              </div>
            </div>
          </div>

          <div className="m-box-slot">
            <h3 className="m-t-title">
              슬롯 03
              <span className="mark-charging">충전 중 </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>배터리ID </strong> 24100212345
              </span>
              <span>
                <strong>페어ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">23℃</div>
                <div className="stit">평균 온도</div>
              </div>
              <div>
                <div className="cont">60%</div>
                <div className="stit">SOC</div>
              </div>
              <div>
                <div className="cont">88%</div>
                <div className="stit">SOH</div>
              </div>
            </div>
          </div>

          <div className="m-box-slot">
            <h3 className="m-t-title">
              슬롯 04
              <span className="mark-blank">빈 슬롯 </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>배터리ID </strong> 24100212345
              </span>
              <span>
                <strong>페어ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">평균 온도</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOC</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOH</div>
              </div>
            </div>
          </div>

          <div className="m-box-slot">
            <h3 className="m-t-title">
              슬롯 05
              <span className="mark-lock">잠금 </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>배터리ID </strong> -
              </span>
              <span>
                <strong>페어ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">평균 온도</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOC</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOH</div>
              </div>
            </div>
          </div>

          <div className="m-box-slot">
            <h3 className="m-t-title">
              슬롯 06
              <span className="mark-lock">잠금 </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>배터리ID </strong> -
              </span>
              <span>
                <strong>페어ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">평균 온도</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOC</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOH</div>
              </div>
            </div>
          </div>

          <div className="m-box-slot">
            <h3 className="m-t-title">
              슬롯 07
              <span className="mark-lock">잠금 </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>배터리ID </strong> -
              </span>
              <span>
                <strong>페어ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">평균 온도</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOC</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOH</div>
              </div>
            </div>
          </div>

          <div className="m-box-slot">
            <h3 className="m-t-title">
              슬롯 08
              <span className="mark-lock">잠금 </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>배터리ID </strong> -
              </span>
              <span>
                <strong>페어ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">평균 온도</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOC</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOH</div>
              </div>
            </div>
          </div>

          <div className="m-box-slot">
            <h3 className="m-t-title">
              슬롯 09
              <span className="mark-lock">잠금 </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>배터리ID </strong> -
              </span>
              <span>
                <strong>페어ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">평균 온도</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOC</div>
              </div>
              <div>
                <div className="cont">-</div>
                <div className="stit">SOH</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
