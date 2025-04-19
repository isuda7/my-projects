import { useEffect, useRef } from "react";

const DEFAULT_CENTER = { lng: 126.927107, lat: 37.5266537 };
const DEFAULT_ZOOM = 1;

interface MapProp {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  size?: {
    width: string;
    height: string;
  };
}

export const addMarkers = ({
  locations,
  map,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  map: google.maps.Map | null | undefined;
}) => {
  // map?.setZoom(6);
  const bounds = new google.maps.LatLngBounds(); // 지도 범위 바꾸기 위한 것
  locations.forEach((position) => {
    const marker = new google.maps.Marker({
      position,
      map,
      icon: "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png", // 마커 아이콘 변경 (생략가능)
    });
    bounds.extend(position); // 추가 마커에 대한 지도 범위 추가
  });
  map?.fitBounds(bounds); // 모든 마커가 볼 수 있게 지도 범위 확장
};

export function MapMarkers({ locations, size }: MapProp) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Display the map
    if (ref.current) {
      const map = new google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        disableDefaultUI: true,
      });
      addMarkers({ locations, map }); // 일반 마커 표시
    }
  }, [ref, locations]);

  return <div ref={ref} style={size} />; // 스타일 설정
}

MapMarkers.defaultProps = {
  size: { width: "auto", height: "300px" },
};
