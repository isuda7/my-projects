import { useEffect, useRef } from "react";

const DEFAULT_CENTER = { lng: 126.927107, lat: 37.5266537 };
const DEFAULT_ZOOM = 15;

interface MapProp {
  address: string;
}

export function codeAddress({
  map,
  address,
}: {
  map: google.maps.Map;
  address: string;
}) {
  const infowindow = new google.maps.InfoWindow({
    content: "text",
    ariaLabel: "zzz",
  });
  const geocoder = new google.maps.Geocoder();
  // const address = document.getElementById("address").value;
  geocoder.geocode({ address }, (results, status) => {
    if (status === "OK" && results !== null) {
      map.setCenter(results[0].geometry.location);
      const marker = new google.maps.Marker({
        map,
        position: results[0].geometry.location,
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
    } else {
      // alert(`Geocode was not successful for the following reason: ${status}`);
      console.log(
        `Geocode was not successful for the following reason: ${status}`,
      );
    }
  });
}

export function MapAddress({ address }: MapProp) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Display the map
    if (ref.current) {
      const map = new google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        disableDefaultUI: true,
      });

      codeAddress({ map, address }); // 주소로 지도에 위치 표시
    }
  }, [ref, address]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
