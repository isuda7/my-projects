import React, { useEffect, useRef, useState } from "react";
import { Popup } from "@progress/kendo-react-popup";
import { GridCustomCellProps } from "@progress/kendo-react-grid";
import GoogleMapsWrapper from "@/components/map/GoogleMapsWrapper.tsx";
import { MapMarkers } from "@/components/map/MapMarkers.tsx";

export default function CustomCellMapMarker(props: GridCustomCellProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ left: 50, top: 50 });

  const handleOutsideClick = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };
  const cellClickPopMap = (event: React.MouseEvent) => {
    setPopupPosition({ left: event.clientX, top: event.clientY });
    setShowPopup((currentShowPopup) => !currentShowPopup);
  };
  const { dataItem, tdProps } = props;
  console.log("dataItem", dataItem);
  const location = [
    {
      lat: dataItem.lat,
      lng: dataItem.lat,
    },
  ];
  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopup]);

  return (
    <td
      {...tdProps}
      onClick={(e) => cellClickPopMap(e)}
      style={{ textAlign: "center" }}
    >
      <img
        src="/src/assets/image/ico-map-marker-alert.svg"
        alt=""
        style={{ width: "25px", height: "25px" }}
      />
      {showPopup && (
        <div ref={popupRef}>
          <Popup offset={popupPosition} show={showPopup}>
            <p style={{ width: 200, height: 150 }}>
              <GoogleMapsWrapper>
                <MapMarkers locations={location} />
              </GoogleMapsWrapper>
            </p>
          </Popup>
        </div>
      )}
    </td>
  );
}
