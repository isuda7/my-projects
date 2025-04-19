import {Marker} from "@react-google-maps/api";
import {useEffect, useRef, useState} from "react";
import * as React from "react";
import {Station} from "@/utils/apiService/type/dashboard/DashboardStation.ts";
import MapMouseEvent = google.maps.MapMouseEvent;
import {CustomMarker} from "@/new_components/dashboard/main/StationGoogleMap.tsx";
import {useTranslation} from "react-i18next";
import {station_status} from "@/utils/apiService/type/dashboard/LedStatusEnum.ts";


const DEFAULT_CENTER = { lng: 126.927107, lat: 37.5266537 };
const DEFAULT_ZOOM = 20;


interface MapProp {
  stationList: ReadonlyArray<Station>;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  setStationId: React.Dispatch<React.SetStateAction<string>>;
  makers: CustomMarker[];
  setMakers: React.Dispatch<React.SetStateAction<CustomMarker[]>>;
}


export function StationGoogleMarker({stationList, mapRef, setStationId, makers, setMakers}: MapProp) {
  const {t} = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);

  const addMarkers = async ({stationList, map}: {
    stationList: ReadonlyArray<Station>;
    map: google.maps.Map | null | undefined;
  }) => {

    function buildContent(station: Station) {
      const content = document.createElement("div");
      const str = station.isDisconnect ? 'DISCONNECTION' : station.stationStatus;
      content.className = `custom-marker g-${station.generation} state-${station_status[str]}`;
      content.innerHTML = `             
             <p class="tit">                
               <span>${station.stationName}</span>                
               <span>                   
                 <strong>${station.possibleSlot ?? 0}</strong>/${station.totSlot}                
               </span>             
             </p>             
             <p class="con">${t(`dashboard.bss-status.${str}`)}</p>          `;
      return content;
    }

    const bounds = new google.maps.LatLngBounds(); // 지도 범위 바꾸기 위한 것

    stationList.forEach((station) => {
      const position: google.maps.LatLngLiteral = {lat: Number(station.lat), lng: Number(station.lng)};
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        title: station.stationId,
        position: position,
        content: buildContent(station),
        zIndex: 0,
      });

      marker.addListener('click', () => {
        setMakers((prevList) => {
          return prevList.map(m => {
            m.marker === marker ? m.marker.zIndex = 1 : m.marker.zIndex = 0;
            return m;
          })
        });

        mapRef?.current?.setCenter(position);
        setStationId(station.stationId);
      });
      const customMarker: CustomMarker = {stationId: station.stationId, marker: marker};

      setMakers(prevMarkers => [...prevMarkers, customMarker]);
      bounds.extend(position);
    });
  };
  const removeMarkers = () => {
    makers.forEach(m => m.marker.map = null);
    setMakers(prevList => prevList.map(m => {
      m.marker.map = null;
      return m;
    }));
    setMakers([]);
  }

  useEffect(() => {    // Display the map
    if (ref.current) {
      const map = new google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        disableDefaultUI: true,
        mapId: import.meta.env.VITE_GOOGLE_MAP_ID
      });
      mapRef.current = map;
      addMarkers({stationList, map}); // 커스텀 마커 표시
    }
  }, [ref]);

  useEffect(() => {
    if (mapRef.current) {
      removeMarkers();
      addMarkers({stationList, map: mapRef.current});
    }
  }, [stationList]);
  return <div ref={ref} style={{width: "100%", height: "100%"}}/>;
  // 스타일 설정
}
