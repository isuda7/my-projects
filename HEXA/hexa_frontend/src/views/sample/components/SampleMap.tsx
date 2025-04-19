import { useState } from "react";
import GoogleMapsWrapper from "@/components/map/GoogleMapsWrapper";
import { MapMarkers } from "@/components/map/MapMarkers";
import { MapAddress } from "@/components/map/MapAddress";
import { MapCurrent } from "@/components/map/MapCurrent";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";

export const LOCATIONS = [
  { lat: 48.8566, lng: 2.3522 },
  { lat: 47.1533, lng: 2.9123 },
  { lat: 37.5665, lng: 126.978 },
];

export default function SampleMap() {
  const [count] = useState(LOCATIONS);
  const [text, setText] = useState(false);
  const check = text;
  return (
    <div>
      <button type="button" onClick={() => setText(!check)}>
        show map
      </button>
      <br />
      <br />
      {text && (
        <GoogleMapsWrapper>
          <MapMarkers locations={count} />
          <GridLayout 
            rows={[{ height: "500px" }, { height: "500px" }]} // 행의 높이를 지정
            cols={[{ width: "50%" }, { width: "50%" }]} // 열의 너비를 지정
          >
            <GridLayoutItem row={1} col={1}>
              <MapAddress address="서울시" />
            </GridLayoutItem>
            <GridLayoutItem row={1} col={2}>
              <MapCurrent />
            </GridLayoutItem>
          </GridLayout>
        </GoogleMapsWrapper>
      )}
    </div>
  );
}
