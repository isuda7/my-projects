/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

/* Common */
import SubHeader from "../common/SubHeader";
import StationSearchBox from "./components/StationSearchBox";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService";

/* Types */
import { StationInfoDto } from "@/utils/apiService/type/station/StationInfoDto";
import StationInfoSummary from "./components/StationInfoSummary";

export default function MobileStationList() {
  const {t} = useTranslation();
  const location = useLocation();
  const { generation, stationStatus } = location.state;

  const [stationList, setStationList] = useState<StationInfoDto[]>([])
  const [dataLength, setDataLength] = useState<number>(0)

  const onSearch = async(params: any) => {
    params = {
      ...params,
      generation,
    }
    const res: any = await DashboardApiService().getStationList(params);
    setStationList(res.data);
    setDataLength(res.data.length)
  }

  return (
    <>
      {/* '스테이션 목록' */}
      <SubHeader title={t('station.station_list')} />

      <div className="m-content">

        <StationSearchBox 
          onSearch={onSearch}
          initStatus={stationStatus}
        />

        <section className="section">
          <div className="sort-group type-dark">
            <div className="sort-group__counter">
              <span className="total">
                {t('common.total') /* 전체  */}
                <span> {dataLength}</span>
              </span>
            </div>
          </div>
          <div className="m-list">
            <ul>
              {
                stationList.map((v, i) => <StationInfoSummary key={i} {...v} stationFlag={true}/>)
              }
            </ul>
            {
              stationList.length === 0 &&
              <div style={{color: 'white'}}>{t('common.no_search_results')}</div>
            }
          </div>
        </section>
      </div>
    </>
  );
}
