
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function StationInfoSummary(props: any) {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const {
    stationId, 
    generation, 
    stationName, 
    address, 
    possibleSlot, 
    totSlot, 
    stationStatus,
    stationFlag=false,
  } = props;
  
  let statClassName;
  let statName;

  if(stationFlag) {
    statClassName = stationStatus === 'LOCKED'? 'lock' : 'error';
    statName = stationStatus === 'LOCKED'? t('dashboard.station-status.all-lock') : t('dashboard.station-status.error');
  }

  const moveToStationDetail = () => {
    console.log('moveToStationDetail generation', generation)
    navigate(`/dashboard/station/detail/${stationId}`, {state:{generation}})
  }

  // <span className="state-lock">전체잠금</span>
  // <span className="state-error">오류발생</span>
  
  //status 여부로 Dashboard 리스트인지, StationId 리스트인지 구분함

  return (
    <li role="button" key={stationId} onClick={moveToStationDetail}>
      <div className="part-1">
        <span className={generation === '1'? "flag-1" : "flag-2"}>{generation}</span>
      </div>
      <div className="part-2">
        <span className="txt-bold">{stationName}</span>
        <span>{address}</span>
      </div>
      <div className="part-3">
        {
          stationFlag? 
          <>
            {/* <span className="state-lock">전체잠금</span> */}
            <span className={`state-${statClassName}`}>{statName}</span>
          </>
          :
          <>
            <strong>{possibleSlot}</strong> / {totSlot}
          </>
        }
      </div>
    </li>
  );
}
