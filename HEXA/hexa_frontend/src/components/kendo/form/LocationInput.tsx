import GoogleMapsWrapper from "@/components/map/GoogleMapsWrapper.tsx";
import LocationComponent from "@/components/kendo/form/LocationComponent.tsx";

export interface LocationInputProps {
  formRenderProps: any;
  name: string;
  onChange: (e: any) => void;
  value?: string | number;
}

function LocationInput({
  formRenderProps,
  name,
  onChange,
  value,
}: LocationInputProps) {
  const valueCheck = value !== undefined ? value : "";
  return (
    <GoogleMapsWrapper>
      <LocationComponent
        formRenderProps={formRenderProps}
        name={name}
        onChange={onChange}
        value={valueCheck}
      />
    </GoogleMapsWrapper>
  );
}

export default LocationInput;

LocationInput.defaultProps = {
  value: "",
};
