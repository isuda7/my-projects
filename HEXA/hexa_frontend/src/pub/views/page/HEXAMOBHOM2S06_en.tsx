// HEXAMOBHOM2S06 : 대시보드 상세_2세대 en

import * as React from "react";
import { Button } from "@progress/kendo-react-buttons";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";

export default function HEXAMOBHOM2S06() {
  React.useEffect(() => {
    document.documentElement.lang = "en"; // 퍼블 확인용
  }, []);

  // tab
  const [selected, setSelected] = React.useState<number>(0);
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
          GS25 Gangnam branch{" "}
          <span className="tit-state-disconnection">
            Communication Disconnection
          </span>
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
        <div className="m-tab">
          <TabStrip selected={selected} onSelect={handleSelect}>
            <TabStripTab title="Enclosure 01">
              <div className="m-info">
                <h2 className="m-t-header">Enclosure Information</h2>
                <div className="m-box-graph">
                  {/* 온도 */}
                  <div className="box-graph type-tem">
                    <div className="graph"></div>
                    <div className="stit">Temperature</div>
                    <div className="cont">
                      23<span>℃</span>
                    </div>
                  </div>

                  {/* 습도 */}
                  <div className="box-graph type-hu">
                    <div className="graph"></div>
                    <div className="stit">Humidity</div>
                    <div className="cont">
                      60<span>%</span>
                    </div>
                  </div>

                  {/* 이산화탄소 */}
                  <div className="box-graph type-co2">
                    <div className="graph"></div>
                    <div className="stit">Carbon Dioxide</div>
                    <div className="cont">
                      2<span>ppm</span>
                    </div>
                  </div>

                  {/* 침수여부 */}
                  <div className="box-graph type-water">
                    <div className="graph"></div>
                    <div className="stit">Flooding Status</div>
                    <div className="cont">N</div>
                  </div>
                </div>
              </div>

              <div className="m-box-slot">
                <h3 className="m-t-title">
                  Slot 01
                  <span className="mark-normal">Available for Exchange</span>
                </h3>
                <p className="m-t-txt">
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">40V</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">40V</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">40V</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  Slot 10
                  <span className="mark-lock">Locked </span>
                </h3>
                <p className="m-t-txt">
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
            </TabStripTab>
            <TabStripTab title="Enclosure 02">
              <div className="m-info">
                <h2 className="m-t-header">Enclosure Information</h2>
                <div className="m-box-graph">
                  {/* 온도 */}
                  <div className="box-graph type-tem">
                    <div className="graph"></div>
                    <div className="stit">Temperature</div>
                    <div className="cont">
                      23<span>℃</span>
                    </div>
                  </div>

                  {/* 습도 */}
                  <div className="box-graph type-hu">
                    <div className="graph"></div>
                    <div className="stit">Humidity</div>
                    <div className="cont">
                      60<span>%</span>
                    </div>
                  </div>

                  {/* 이산화탄소 */}
                  <div className="box-graph type-co2">
                    <div className="graph"></div>
                    <div className="stit">Carbon Dioxide</div>
                    <div className="cont">
                      2<span>ppm</span>
                    </div>
                  </div>

                  {/* 침수여부 */}
                  <div className="box-graph type-water">
                    <div className="graph"></div>
                    <div className="stit">Flooding Status</div>
                    <div className="cont">N</div>
                  </div>
                </div>
              </div>

              <div className="m-box-slot">
                <h3 className="m-t-title">
                  Slot 01
                  <span className="mark-normal">Available for Exchange</span>
                </h3>
                <p className="m-t-txt">
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">40V</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">40V</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">40V</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  Slot 10
                  <span className="mark-lock">Locked </span>
                </h3>
                <p className="m-t-txt">
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
            </TabStripTab>
            <TabStripTab title="Enclosure 03">
              <div className="m-info">
                <h2 className="m-t-header">Enclosure Information</h2>
                <div className="m-box-graph">
                  {/* 온도 */}
                  <div className="box-graph type-tem">
                    <div className="graph"></div>
                    <div className="stit">Temperature</div>
                    <div className="cont">
                      23<span>℃</span>
                    </div>
                  </div>

                  {/* 습도 */}
                  <div className="box-graph type-hu">
                    <div className="graph"></div>
                    <div className="stit">Humidity</div>
                    <div className="cont">
                      60<span>%</span>
                    </div>
                  </div>

                  {/* 이산화탄소 */}
                  <div className="box-graph type-co2">
                    <div className="graph"></div>
                    <div className="stit">Carbon Dioxide</div>
                    <div className="cont">
                      2<span>ppm</span>
                    </div>
                  </div>

                  {/* 침수여부 */}
                  <div className="box-graph type-water">
                    <div className="graph"></div>
                    <div className="stit">Flooding Status</div>
                    <div className="cont">N</div>
                  </div>
                </div>
              </div>

              <div className="m-box-slot">
                <h3 className="m-t-title">
                  Slot 01
                  <span className="mark-normal">Available for Exchange</span>
                </h3>
                <p className="m-t-txt">
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">40V</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">40V</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">40V</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> 24100212345
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
                  Slot 10
                  <span className="mark-lock">Locked </span>
                </h3>
                <p className="m-t-txt">
                  <strong>Battery ID </strong> -
                </p>
                <div className="box-slot">
                  <div>
                    <div className="cont">-</div>
                    <div className="stit">Pack Voltage</div>
                  </div>
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
            </TabStripTab>
          </TabStrip>
        </div>
      </div>
    </>
  );
}
