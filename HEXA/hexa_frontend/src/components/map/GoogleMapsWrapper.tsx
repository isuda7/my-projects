import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export default function GoogleMapsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_KEY;

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey} libraries={["marker"]}>{children}</Wrapper>;
}
