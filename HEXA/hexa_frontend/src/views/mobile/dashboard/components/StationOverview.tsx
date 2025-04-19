/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/* Common */
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService";

/* Types */

interface MobileDashboardOverview {
  gen1Locked?: number;//1세대 전체잠금
  gen1Error?: number;//1세대 오류발생
  gen2Locked?: number;//1세대 전체잠금
  gen2Error?: number;//1세대 오류발생
}

const initialData: MobileDashboardOverview = {
  gen1Locked: 0,
  gen1Error: 0,
  gen2Locked: 0,
  gen2Error: 0,
};

export default function StationOverview() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [data, setData] = useState<MobileDashboardOverview>(initialData);

  const onClickBox = (generation: string, stationStatus: string) => {
    navigate('/dashboard/station', {state: {generation, stationStatus}})
  }

  useEffect(() => {
    getStationStatusCnt();
  }, [])

  const getStationStatusCnt = async () => {
		const gen1Result = await DashboardApiService().get1stStationStatusCnt();
		const gen2Result = await DashboardApiService().getStationStatusCnt();
    
    const newData:MobileDashboardOverview = {};
    if(gen1Result && gen1Result?.data) {
      newData.gen1Locked = gen1Result.data?.find((d: any) => d.bssSts === 'LOCKED')?.cnt || 0;
      newData.gen1Error = gen1Result.data?.find((d: any) => d.bssSts === 'ERROR')?.cnt || 0;
    }
    if(gen2Result && gen2Result?.data) {
      newData.gen2Locked = gen2Result.data?.find((d: any) => d.status === 'LOCKED')?.count || 0;
      newData.gen2Error = gen2Result.data?.find((d: any) => d.status === 'ERROR')?.count || 0;
    }
		setData(newData);
	}

  return (
    <section className="section">
      {/* 1세대 */}
      <div className="m-box">
        <span className="flag-1">
          {t('dashboard.1st-generation') /* 1세대 */}
        </span>
        <div className="card-exchange">
          <div 
            role="button" 
            className="m-btn-box"
            onClick={() => onClickBox('1', 'LOCKED')}    
          >
            <div className="tit">
              <span className="mark-lock">
                {t('dashboard.station-status.all-lock') /* 전체잠금 */}
              </span>
            </div>
            <div className="con">{data?.gen1Locked}</div>
          </div>
          <div 
            role="button" 
            className="m-btn-box"
            onClick={() => onClickBox('1', 'ERROR')}    
          >
            <div className="tit">
              <span className="mark-error">
                {t('dashboard.station-status.error') /* 오류발생 */}
              </span>
            </div>
            <div className="con">{data?.gen1Error}</div>
          </div>
        </div>
      </div>

      {/* 2세대 */}
      <div className="m-box">
        <span className="flag-2">
          {t('dashboard.2nd-generation') /* 2세대 */}
        </span>
        <div className="card-exchange">
          <div 
            role="button" 
            className="m-btn-box"
            onClick={() => onClickBox('2', 'LOCKED')}    
          >
            <div className="tit">
              <span className="mark-lock">
                {t('dashboard.station-status.all-lock') /* 전체잠금 */}
              </span>
            </div>
            <div className="con">{data?.gen2Locked}</div>
          </div>
          <div 
            role="button" 
            className="m-btn-box"
            onClick={() => onClickBox('2', 'ERROR')}    
          >
            <div className="tit">
              <span className="mark-error">
                {t('dashboard.station-status.error') /* 오류발생 */}
              </span>
            </div>
            <div className="con">{data?.gen2Error}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
