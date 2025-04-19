import { useEffect, useState } from "react";
import { Field, FieldWrapper } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { LocationInputProps } from "@/components/kendo/form/LocationInput.tsx";
import {
  defaultInput,
  inputValidator,
} from "@/components/kendo/form/FormInnerComponent.tsx";

function LocationComponent({
  formRenderProps,
  name,
  onChange,
  value = "",
}: LocationInputProps) {
  const [address, setAddress] = useState<string | number>(value);
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    error: { message: "" },
  });

  const onSuccess = (position: {
    coords: { latitude: any; longitude: any };
  }) => {
    const { latitude, longitude } = position.coords;

    setLocation({
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
      error: { message: "" },
    });

    const pos = {
      lat: latitude,
      lng: longitude,
    };

    const geocoder = new google.maps.Geocoder();

    geocoder
      .geocode({ location: pos }) // 현재 위치에 좌표로 주소 얻기
      .then((response) => {
        if (response.results[0]) {
          setAddress(response.results[0].formatted_address);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert(`Geocoder failed due to: ${e}`));
  };

  const onError = (error: { message: string }) => {
    setLocation({
      coordinates: { lat: "0", lng: "0" },
      loaded: true,
      error,
    });
  };

  const handleLocationClick = () => {
    if (!("geolocation" in navigator)) {
      onError({
        message: "Geolocation not supported",
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  useEffect(() => {
    formRenderProps.onChange(name, {
      value: address,
    });
    onChange(address);
  }, [address]);

  return (
    <div className="location-view">
      <FieldWrapper>
        <Field
          name={name}
          component={defaultInput}
          validator={inputValidator}
          value={address}
          location={location}
          onChange={(e) => {
            setAddress(e.value);
          }}
        />
        <Button
          type="button"
          size="small"
          fillMode="flat"
          className="btn-location"
          onClick={handleLocationClick}
        />
      </FieldWrapper>
    </div>
  );
}

export default LocationComponent;
