import { useEffect, useRef } from "react";

const DEFAULT_CENTER = { lng: 126.927107, lat: 37.5266537 };
const DEFAULT_ZOOM = 15;

export function currentPosition({ map }: { map: google.maps.Map }) {
  const marker = new google.maps.Marker({
    map,
  });
  const infowindow = new google.maps.InfoWindow({
    // ariaLabel: "",
  });
  const geocoder = new google.maps.Geocoder();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        marker.setPosition(pos); // 현재 위치에 마커 표시
        map.setCenter(pos); // 현재 위치로 지도 센터 변경

        geocoder
          .geocode({ location: pos }) // 현재 위치에 좌표로 주소 얻기
          .then((response) => {
            if (response.results[0]) {
              infowindow.setContent(response.results[0].formatted_address); // 현재 주소를 창을 표시하기
              infowindow.open(map, marker);
            } else {
              window.alert("No results found");
            }
          })
          .catch((e) => window.alert(`Geocoder failed due to: ${e}`));
      },
      () => {}
    );
  }
}

export function MapCurrent() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Display the map
    if (ref.current) {
      const map = new google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        disableDefaultUI: true,
      });

      currentPosition({ map }); // 내 현재 위치 표시
    }
  }, [ref]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
