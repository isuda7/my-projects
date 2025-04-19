// HEXAMOBHOM2S07 : 대시보드 상세_1세대 en

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

export default function HEXAMOBHOM2S07() {
  React.useEffect(() => {
    document.documentElement.lang = "en"; // 퍼블 확인용
  }, []);

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
          GS25 Gangnam branch <span className="tit-state-normal">Normal</span>
          {/* 
            <span className="tit-state-normal">Normal</span>
            <span className="tit-state-disconnection">Communication Disconnection</span>
            <span className="tit-state-lock">Fully Locked</span>
            <span className="tit-state-unable">Not Available for Exchange</span>
            <span className="tit-state-error">Error Occurred</span> 
            <span className="tit-state-reset">초기화중</span> 
          */}
        </h1>
      </header>

      <div className="m-content">
        <section className="section mt1.5">
          <div className="m-box-slot">
            <h3 className="m-t-title">
              Slot 01
              <span className="mark-normal">Available for Exchange</span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>Battery ID </strong> 24100212345
              </span>
              <span>
                <strong>Pair ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">23℃</div>
                <div className="stit">Average Temp.</div>
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
              Slot 02
              <span className="mark-reservation">Reserved</span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>Battery ID </strong> 24100212345
              </span>
              <span>
                <strong>Pair ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">23℃</div>
                <div className="stit">Average Temp.</div>
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
              Slot 03
              <span className="mark-charging">Charging </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>Battery ID </strong> 24100212345
              </span>
              <span>
                <strong>Pair ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">23℃</div>
                <div className="stit">Average Temp.</div>
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
              Slot 04
              <span className="mark-blank">Empty Slot </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>Battery ID </strong> 24100212345
              </span>
              <span>
                <strong>Pair ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">Average Temp.</div>
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
              Slot 05
              <span className="mark-lock">Locked </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>Battery ID </strong> -
              </span>
              <span>
                <strong>Pair ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">Average Temp.</div>
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
              Slot 06
              <span className="mark-lock">Locked </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>Battery ID </strong> -
              </span>
              <span>
                <strong>Pair ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">Average Temp.</div>
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
              Slot 07
              <span className="mark-lock">Locked </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>Battery ID </strong> -
              </span>
              <span>
                <strong>Pair ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">Average Temp.</div>
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
              Slot 08
              <span className="mark-lock">Locked </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>Battery ID </strong> -
              </span>
              <span>
                <strong>Pair ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">Average Temp.</div>
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
              Slot 09
              <span className="mark-lock">Locked </span>
            </h3>
            <p className="m-t-txt">
              <span>
                <strong>Battery ID </strong> -
              </span>
              <span>
                <strong>Pair ID </strong> 2401250013
              </span>
            </p>
            <div className="box-slot">
              <div>
                <div className="cont">-</div>
                <div className="stit">Average Temp.</div>
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
