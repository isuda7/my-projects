// HEXAMOBHOM2S06 : 대시보드 상세_2세대

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

/* Common */
import DashboardApiService from "@/utils/apiService/dashboard/DashboardApiService";
import SubHeader from "../common/SubHeader";
import Detail2GenMain from "./components/2gen/Detail2GenMain";
import Detail1GenMain from "./components/1gen/Detail1GenMain";
import AlertPopup from "../popup/AlertPopup";

/* Types */
import { DashboardStationDto, Station } from "@/utils/apiService/type/dashboard/DashboardStation";

export default function MobileStationDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { generation } = location.state;
  const navigate = useNavigate();


  const [alertModalObj, setAlertModalObj] = useState<any>({
    open: false,
    message: '',
  })

  const [stationInfo, setStationInfo] = useState<Station>()
  const getStationInfo = async () => {
    //HX0124001A1
    try {
      let result;
      if(generation === '1') {
        result = await DashboardApiService().getGenStation(id as string);
      }
      else {
        result = await DashboardApiService().getStation(id as string);
      }
      console.log('getStationInfo', result)
      setStationInfo(result.data)
    } 
    catch (error: any) {
      const message = error.data.message;
      console.log('message', message)
      setAlertModalObj({
        open: true,
        message,
      })
    }
    //const result = await DashboardApiService().getStation('HX0104001A1');
  }


  useEffect(() => {
    getStationInfo();
  }, [])

  useEffect(() => {
    console.log('stationInfo', stationInfo)
  }, [stationInfo])

    // const status = station?.disconnectionCnt !== 0 ? 'DISCONNECTION' : station.stationStatus;
  // setTitle(t(`dashboard.bss-status.${status}`));
  // setTitleClass(`tit-state-${station_status[status]}`);

  return (
    <>
      <SubHeader
        title={stationInfo?.stationName}
        status={stationInfo?.isDisconnect ? 'DISCONNECTION' : stationInfo?.stationStatus}
      />
      <div className="m-content">
        {
          stationInfo?.generation === '1'?
          <Detail1GenMain 
            data = {stationInfo}
          />
          :
          stationInfo?.generation === '2'?
          <Detail2GenMain 
            data = {stationInfo}
          />
          :
          <></>
        }
      </div>
      {
        alertModalObj.open &&
        <AlertPopup
          message={alertModalObj.message}
          onClose={() => setAlertModalObj({open: false, message: ''})} 
        />
      }
    </>
  );
}
