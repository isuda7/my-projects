import * as React from "react";
import {useEffect, useRef, useState} from "react";
import GoogleMapsWrapper from "@/components/map/GoogleMapsWrapper.tsx";
import {StationGoogleMarker} from "@/new_components/dashboard/main/StationGoogleMarker.tsx";
import {Station} from "@/utils/apiService/type/dashboard/DashboardStation.ts";


export interface CustomMarker {
  stationId: string;
  marker: google.maps.marker.AdvancedMarkerElement;
}

interface Props {
  setStationList?: React.Dispatch<React.SetStateAction<Station[]>>;
  stationList: Station[];
  station: Station;
  setStationId: React.Dispatch<React.SetStateAction<string>>;
}


const StationGoogleMap = ({stationList, setStationList, station, setStationId}: Props) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [showStationList, setShowStationList] = useState<Station[]>(stationList);
  const [genFilter, setGenFilter] = useState("");
  const [makers, setMakers] = useState<CustomMarker[]>([]);

  const [selectGen, setSelectGen] = useState({'1': true, '2': true});

  const updateMapCenter = (position: google.maps.LatLngLiteral) => {
    if (mapRef.current) {
      mapRef.current.setCenter(position);
    }
  };

  const onClickGen = (e: any, gen: string) => {
    setSelectGen((prevState) => ({
      ...prevState,
      [gen]: !prevState[gen]
    }));

  }

  useEffect(() => {
    let filterList: Station[];
    // let filterValue: string;
    const selectedGens = Object.keys(selectGen).filter(key => selectGen[key]);
    if (selectedGens.length === 0) {
      filterList = [];
      // filterValue = "";
    } else {
      // filterValue = gen;
      filterList = stationList.filter(station => selectedGens.includes(station.generation));
    }
    // setGenFilter(filterValue);
    setShowStationList(filterList);
  }, [selectGen]);

  useEffect(() => {
    setShowStationList(stationList);
  }, [stationList]);

  useEffect(() => {
    if (station) {
      const position: google.maps.LatLngLiteral = {lat: Number(station.lat), lng: Number(station.lng)};
      updateMapCenter(position);
      setMakers((prevList) => {
        return prevList.map(m => {
          m.stationId === station.stationId ? m.marker.zIndex = 1 : m.marker.zIndex = 0;
          return m;
        })
      });
    }
  }, [station]);

  return (
    <div className="box type-map">
      <div className="type-map-state">교환 가능 / 전체</div>
      <div className="map-area">
        <GoogleMapsWrapper>
          <StationGoogleMarker
            stationList={showStationList}
            mapRef={mapRef}
            setStationId={setStationId}
            setMakers={setMakers}
            makers={makers}
          />
        </GoogleMapsWrapper>
        <div className="map-head">
          <span className={`type-1${selectGen[1] ? '' : ' filter'}`} onClick={(e) => onClickGen(e, "1")}>1세대</span>
          <span className={`type-2${selectGen[2] ? '' : ' filter'}`} onClick={(e) => onClickGen(e, "2")}>2세대</span>
        </div>
      </div>
    </div>
  )
}

export default StationGoogleMap;