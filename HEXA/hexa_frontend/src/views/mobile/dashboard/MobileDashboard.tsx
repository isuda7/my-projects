/* React */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/* Common */
import MainHeader from "../common/MainHeader";
import SearchBox from "./components/SearchBox";
import StationInfoSummary from "./components/StationInfoSummary";
import StationOverview from "./components/StationOverview";
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService";
import useAlert from "@/hooks/useAlert";

/* Types */
import { DashboardStaionRequestDto, Station } from "@/utils/apiService/type/dashboard/DashboardStation";

export default function MobileDashboard() {
  const {t} = useTranslation();
  const showAlert = useAlert()
  const [stationList, setStationList] = useState<Station[]>([])

  const onSearch = async(params: DashboardStaionRequestDto) => {
    const result = await DashboardApiService().getStationList(params);
    setStationList(result.data);
  }

  useEffect(() => {
    onSearch({
      cityCode: '',
      idCodeTsid: '',
      searchKeyword: '',
    })
  }, [])

  // useEffect(() => {
  //   if(stationList.length === 0) {
  //     showAlert({message: t('common.no_search_results')})
  //   }
  // }, [stationList])

  return (
    <>
      <MainHeader />

      <div className="m-content">
        <h2 className="m-t-header">Dashboard</h2>

        <StationOverview />

        <SearchBox 
          onSearch={onSearch}
        />

        <section className="section">
          <div className="sort-group type-dark">
            <div className="sort-group__counter">
              <span className="total">
                {t('common.total') /* 전체  */}
                <span>{" " + stationList.length}</span>
              </span>
            </div>
          </div>
          <div className="m-list">
            <ul>
              {
                stationList.map((v, i) => <StationInfoSummary key={i} {...v} />)
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
