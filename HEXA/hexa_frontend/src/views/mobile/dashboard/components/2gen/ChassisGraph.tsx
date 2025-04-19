import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/* Common */

export default function ChassisGraph(props: any) {
  const {t} = useTranslation()
  const { data } = props;

  return (
    <div className="m-info">
      <h2 className="m-t-header">
        {t('dashboard.device.title')/* 함체 정보 */}
      </h2>
      <div className="m-box-graph">
        {/* 온도 */}
        <div className="box-graph type-tem">
          <div className="graph"></div>
          <div className="stit">
            {t('dashboard.temperature')/* 온도 */}
          </div>
          <div className="cont">
          {data.chassisTemperature || '-'}<span>℃</span>
          </div>
        </div>

        {/* 습도 */}
        <div className="box-graph type-hu">
          <div className="graph"></div>
          <div className="stit">
            {t('dashboard.humid') /* 습도 */}
          </div>
          <div className="cont">
            {data.chassisHumidity || '-'}<span>%</span>
          </div>
        </div>

        {/* 이산화탄소 */}
        <div className="box-graph type-co2">
          <div className="graph"></div>
          <div className="stit">
            {t('dashboard.co2')/* 이산화탄소 */}
          </div>
          <div className="cont">
            {data.chassisCO2 || '-'}<span>ppm</span>
          </div>
        </div>

        {/* 침수여부 */}
        <div className="box-graph type-water">
          <div className="graph"></div>
          <div className="stit">
            {t('dashboard.flood') /* 침수 */}
          </div>
          <div className="cont">{data.floodStatus? 'Y': 'N'}</div>
        </div>
      </div>
    </div>
  );
}
